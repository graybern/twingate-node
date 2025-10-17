// src/utils/fetchAllPages.js

import { withRetries } from "./withRetries.js";
import { randomUUID } from "crypto";
import { performance } from "perf_hooks";
import { createWriteStream } from "./streamUtils.js";
import fs from "fs";
import path from "path";
import os from "os";

export async function fetchAllPages(
  TwingateClient,
  query,
  queryName,
  variables = {},
  callOptions = {}
) {
  const operationId = callOptions.resumeOperationId || randomUUID();
  const operationLogger = TwingateClient.logger.child({
    operationId,
    functionName: "fetchAllPages",
  });
  const { options } = TwingateClient;

  // Merge options with call-specific options
  const fetchOptions = {
    // Client defaults for pagination
    maxPageSize: options.maxPageSize || 50,
    readRateLimitPerMinute: options.readRateLimitPerMinute || 60,

    // Checkpointing
    enableCheckpointing: options.bulkCheckpointing !== false,
    checkpointInterval: options.bulkCheckpointInterval || 5, // Check every 5 pages
    checkpointDir:
      options.bulkCheckpointDir ||
      path.join(os.homedir(), "twingate-node-cache", "operations"),

    // Streaming options
    streamToFile: options.streamToFile || false,
    streamToFilePath: options.streamToFilePath || null,
    maxFileSize: options.maxFileSize || 100 * 1024 * 1024, // 100MB
    maxFiles: options.maxFiles || 5,

    // Rate limiting
    rateLimitStrategy: options.rateLimitStrategy || "pacing",

    // Override with call-specific options
    ...callOptions,
  };

  // Create base operation directory
  const operationDir = path.join(fetchOptions.checkpointDir, operationId);
  if (!fs.existsSync(operationDir)) {
    fs.mkdirSync(operationDir, { recursive: true });
  }

  const checkpointFilePath = path.join(operationDir, "fetch-checkpoint.json");
  const summaryPath = path.join(operationDir, "operation-summary.json");

  // Determine results file path
  const resultsDir =
    fetchOptions.streamToFilePath || path.join(operationDir, "results");
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const dataFilePath = path.join(resultsDir, "fetched-data.jsonl");

  // Initialize state
  let state = {
    operationId,
    currentCursor: null,
    pagesFetched: 0,
    recordsFetched: 0,
    hasNextPage: true,
    startTime: Date.now(),
    lastCheckpointTime: Date.now(),
    metadata: {
      operationType: "fetch_all_pages",
      queryName,
      timestamp: new Date().toISOString(),
    },
  };

  // Resume from checkpoint if available
  if (
    fetchOptions.enableCheckpointing &&
    callOptions.resumeOperationId &&
    fs.existsSync(checkpointFilePath)
  ) {
    try {
      const savedState = JSON.parse(
        fs.readFileSync(checkpointFilePath, "utf8")
      );
      state = {
        ...savedState,
        resumedAt: Date.now(),
      };
      operationLogger.info(
        `Resuming fetch from checkpoint with cursor: ${
          state.currentCursor || "START"
        }`
      );
      operationLogger.info(
        `Previously fetched ${state.pagesFetched} pages and ${state.recordsFetched} records`
      );
    } catch (err) {
      operationLogger.warn(`Failed to load checkpoint file: ${err.message}`);
    }
  }

  // Save checkpoint function
  const saveCheckpoint = () => {
    if (!fetchOptions.enableCheckpointing) return;

    try {
      fs.writeFileSync(
        checkpointFilePath,
        JSON.stringify(
          {
            ...state,
            lastCheckpointTime: Date.now(),
          },
          null,
          2
        )
      );
      operationLogger.debug(
        `Saved checkpoint after ${state.pagesFetched} pages, ${state.recordsFetched} records`
      );
    } catch (err) {
      operationLogger.warn(`Failed to save checkpoint: ${err.message}`);
    }
  };

  // Prepare result containers
  let allItems = [];
  let lastResponse = null;
  let dataStream = null;

  // Setup streaming if enabled
  if (fetchOptions.streamToFile) {
    operationLogger.info(`Results will be streamed to: ${dataFilePath}`);

    // Create write stream
    dataStream = createWriteStream(dataFilePath, operationLogger);

    // Write header/metadata
    dataStream.write(
      JSON.stringify({
        type: "metadata",
        operationId,
        queryName,
        timestamp: new Date().toISOString(),
      }) + "\n"
    );
  }

  // --- 1. Initial call to get total count if not resuming ---
  let totalCount = null;
  let totalPages = null;
  let estimatedTimeInfo = "N/A";

  if (!callOptions.resumeOperationId || !state.totalCount) {
    try {
      // Make initial request to get total count
      const initialData = await TwingateClient.request(
        query,
        {
          ...variables,
          first: 1,
          after: null,
        },
        operationLogger
      );

      totalCount = initialData[queryName]?.totalCount;

      if (totalCount === undefined) {
        operationLogger.warn(
          "Could not determine total count for pagination. Will proceed without estimates."
        );
      } else {
        totalPages = Math.ceil(totalCount / fetchOptions.maxPageSize);

        // Estimate completion time
        const estimatedNetworkTimePerPage = 900; // ms
        const estimatedTotalNetworkTime =
          estimatedNetworkTimePerPage * totalPages;

        let estimatedTotalWaitTime = 0;
        if (
          fetchOptions.rateLimitStrategy === "pacing" &&
          fetchOptions.readRateLimitPerMinute > 0 &&
          totalPages > 1
        ) {
          estimatedTotalWaitTime =
            ((totalPages - 1) * 60000) / fetchOptions.readRateLimitPerMinute;
        }

        const totalEstimatedTime =
          (estimatedTotalNetworkTime + estimatedTotalWaitTime) / 1000;
        estimatedTimeInfo = `~${totalEstimatedTime.toFixed(2)}s`;

        // Update state
        state.totalCount = totalCount;
        state.totalPages = totalPages;

        operationLogger.info(
          `[START] Fetching ${totalCount} records across ${totalPages} pages. Estimated time: ${estimatedTimeInfo}`
        );
        operationLogger.info(
          `Using max page size of ${fetchOptions.maxPageSize} with ${fetchOptions.rateLimitStrategy} rate limiting (${fetchOptions.readRateLimitPerMinute}/min)`
        );
      }
    } catch (error) {
      operationLogger.warn(
        `Could not perform initial count request: ${error.message}. Will proceed without count information.`
      );
    }
  } else {
    // Use count from checkpoint
    totalCount = state.totalCount;
    totalPages = state.totalPages;

    if (totalCount && totalPages) {
      operationLogger.info(
        `[RESUME] Continuing fetch of ${totalCount} records. ${
          state.recordsFetched
        } already fetched, ${totalCount - state.recordsFetched} remaining.`
      );
    }
  }

  // Pagination logic
  const paginationVariables = {
    ...variables,
    first: fetchOptions.maxPageSize,
    after: state.currentCursor,
  };

  // Track performance
  const fetchStartTime = performance.now();
  let lastPageTime = fetchStartTime;

  while (state.hasNextPage) {
    try {
      // Calculate page numbers for logging
      const currentPage = state.pagesFetched + 1;
      const pageDisplay = totalPages
        ? `${currentPage}/${totalPages}`
        : currentPage;

      operationLogger.info(
        `Fetching page ${pageDisplay}, cursor: ${
          state.currentCursor || "START"
        }`
      );

      // Apply rate limiting if needed
      if (
        state.pagesFetched > 0 &&
        fetchOptions.readRateLimitPerMinute > 0 &&
        fetchOptions.rateLimitStrategy === "pacing"
      ) {
        const waitTime = 60000 / fetchOptions.readRateLimitPerMinute;
        operationLogger.debug(
          `[Pacing at ${
            fetchOptions.readRateLimitPerMinute
          }/min] Waiting ${waitTime.toFixed(0)}ms before next request`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }

      const pageStartTime = performance.now();

      // Make API request with retries
      const response = await TwingateClient.request(
        query,
        paginationVariables,
        operationLogger
      );

      lastResponse = response;

      // Calculate time taken for this page
      const pageTime = performance.now() - pageStartTime;

      // Process the results
      const edges = response[queryName].edges || [];
      const pageInfo = response[queryName].pageInfo || {};

      // Update state
      state.pagesFetched++;
      state.recordsFetched += edges.length;
      state.currentCursor = pageInfo.endCursor;
      state.hasNextPage = pageInfo.hasNextPage;

      // Process items
      if (fetchOptions.streamToFile && dataStream) {
        // Stream each item to file
        edges.forEach((edge) => {
          dataStream.write(
            JSON.stringify({
              ...edge.node,
              __cursor: edge.cursor,
            }) + "\n"
          );
        });
      } else {
        // Keep in memory
        allItems.push(...edges.map((edge) => edge.node));
      }

      // Update cursor for next page
      paginationVariables.after = state.currentCursor;

      // Calculate elapsed and estimated remaining time
      const elapsedTime = (performance.now() - fetchStartTime) / 1000;
      let remainingEstimate = "unknown";

      if (totalPages && currentPage < totalPages) {
        const avgTimePerPage = elapsedTime / currentPage;
        const pagesRemaining = totalPages - currentPage;
        remainingEstimate = (avgTimePerPage * pagesRemaining).toFixed(1) + "s";
      }

      // Log progress with detailed information
      const progressInfo = [
        `Page ${pageDisplay} complete in ${(pageTime / 1000).toFixed(2)}s`,
        `${edges.length} records fetched`,
        `Total so far: ${state.recordsFetched}${
          totalCount ? `/${totalCount}` : ""
        } records`,
        `Elapsed: ${elapsedTime.toFixed(1)}s${
          totalPages ? `, Est. remaining: ${remainingEstimate}` : ""
        }`,
      ];

      operationLogger.info(progressInfo.join(", "));

      // Save checkpoint periodically
      if (state.pagesFetched % fetchOptions.checkpointInterval === 0) {
        saveCheckpoint();
        operationLogger.debug(`Checkpoint saved at ${checkpointFilePath}`);
      }

      lastPageTime = performance.now();
    } catch (error) {
      // Save checkpoint on error to allow resuming
      saveCheckpoint();

      // Close stream if we have one
      if (dataStream) {
        dataStream.end();
      }

      operationLogger.error(`Error fetching page: ${error.message}`);

      // Attach operation ID to error for resumption
      error.operationId = operationId;
      error.checkpointFile = checkpointFilePath;
      throw error;
    }
  }

  // Close data stream if we have one
  if (dataStream) {
    dataStream.end();
  }

  // Final checkpoint when complete
  saveCheckpoint();

  // Calculate duration
  const duration = (performance.now() - fetchStartTime) / 1000;

  // Create final summary
  let result;
  if (fetchOptions.streamToFile) {
    // Calculate line count (subtract header)
    const lineCount = countLinesInFile(dataFilePath) - 1;

    result = {
      operationId,
      operationDir,
      queryName,
      count: state.recordsFetched,
      pagesFetched: state.pagesFetched,
      duration,
      filePath: dataFilePath,
      checkpointFilePath: fetchOptions.enableCheckpointing
        ? checkpointFilePath
        : null,
      summaryFilePath: summaryPath,
      streamToFile: true,
    };
  } else {
    // Memory result
    result = allItems;
    Object.defineProperties(result, {
      count: { value: allItems.length },
      pagesFetched: { value: state.pagesFetched },
      duration: { value: duration },
      operationId: { value: operationId },
      operationDir: { value: operationDir },
    });
  }

  // Save final summary
  fs.writeFileSync(
    summaryPath,
    JSON.stringify(
      {
        operationId,
        queryName,
        count: state.recordsFetched,
        pagesFetched: state.pagesFetched,
        duration,
        hasStreamedOutput: fetchOptions.streamToFile,
        outputFilePath: fetchOptions.streamToFile ? dataFilePath : null,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  );

  // Detailed completion log
  operationLogger.info(
    `[COMPLETE] Fetched ${state.recordsFetched} records across ${
      state.pagesFetched
    } pages in ${duration.toFixed(2)}s`
  );

  // Performance metrics
  const avgTimePerPage = duration / state.pagesFetched;
  const avgRecordsPerSecond = state.recordsFetched / duration;

  operationLogger.info(
    `Performance metrics: ${avgTimePerPage.toFixed(2)}s per page, ${Math.round(
      avgRecordsPerSecond
    )} records/second`
  );

  if (fetchOptions.streamToFile) {
    operationLogger.info(`Results saved to: ${dataFilePath}`);
  }

  // Determine if we should keep the checkpoint file
  const shouldKeepCheckpoint =
    // Explicitly set by user
    callOptions.keepCheckpoint ??
    // OR automatically keep when streaming is enabled or for large operations
    (fetchOptions.streamToFile || state.recordsFetched >= 1000);

  if (fetchOptions.enableCheckpointing && !shouldKeepCheckpoint) {
    try {
      fs.unlinkSync(checkpointFilePath);
    } catch (err) {
      // Ignore deletion errors
    }
  } else if (fetchOptions.enableCheckpointing) {
    operationLogger.info(`Checkpoint preserved at: ${checkpointFilePath}`);
    operationLogger.info(
      `To resume this operation if needed, use: { resumeOperationId: '${operationId}' }`
    );
  }

  return result;
}

function countLinesInFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return 0;
    const content = fs.readFileSync(filePath, "utf8");
    return content.split("\n").filter((line) => line.trim()).length;
  } catch (err) {
    return 0;
  }
}

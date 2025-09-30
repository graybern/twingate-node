// src/utils/fetchAllPages.js

import { withRetries } from "./withRetries.js";
import { performance } from "perf_hooks";
import { randomUUID } from "crypto";
//import { createLogger } from "./logger.js";
import { createWriteStream, JsonStream } from "./streamUtils.js";
import os from "os";
import path from "path";

const RATE_LIMIT_WINDOW_MS = 60000; // 60 seconds in milliseconds

// Function to fetch all pages of a paginated GraphQL query
// TwingateClient: instance of TwingateClient
// query: GraphQL query document
// queryName: name of the query field to extract data from the response
// variables: additional variables for the query (excluding pagination variables)
// callOptions: options for this specific call (like streamToFile, streamToFilePath)

export async function fetchAllPages(
  TwingateClient,
  query,
  queryName,
  variables = {},
  callOptions = {}
) {
  const operationId = randomUUID();
  // Use the client's logger instead of the global logger
  const operationLogger = TwingateClient.logger.child({
    operationId,
    functionName: "fetchAllPgs",
  });
  const { options } = TwingateClient;

  // Determine if streaming is enabled, preferring call-specific options
  const streamToFile = callOptions.streamToFile ?? options.streamToFile;

  // Determine the output file path
  let outputFilePath;

  if (
    callOptions.streamToFilePath &&
    typeof callOptions.streamToFilePath === "string"
  ) {
    // Use the call-specific path if provided
    outputFilePath = callOptions.streamToFilePath;
  } else if (
    options.streamToFilePath &&
    typeof options.streamToFilePath === "string"
  ) {
    // Use the client's configured path if provided
    outputFilePath = options.streamToFilePath;
  } else if (streamToFile) {
    // Generate a dynamic filename based on operationId and queryName
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const sanitizedQueryName = queryName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const shortOperationId = operationId.split("-")[0]; // First 8 characters of UUID
    outputFilePath = path.join(
      os.homedir(),
      "twingate-node-cache",
      `${sanitizedQueryName}-${shortOperationId}-${timestamp}.json`
    );
  }

  let jsonStream;

  // If streaming is enabled and we have a valid path, set up the stream
  if (streamToFile && outputFilePath) {
    const streamOptions = {
      maxFileSize:
        callOptions.maxFileSize || options.maxFileSize || 100 * 1024 * 1024, // 100MB default
      maxFiles: callOptions.maxFiles || options.maxFiles || 5, // Keep 5 files by default
    };

    jsonStream = new JsonStream(outputFilePath, operationLogger, streamOptions);
    operationLogger.info(
      `Streaming results to ${outputFilePath} (max size: ${(
        streamOptions.maxFileSize /
        1024 /
        1024
      ).toFixed(1)}MB per file)`
    );
  }

  //operationLogger.info({ options }, "[START] Starting paginated fetch operation");

  // --- 1. Initial call to get total count and estimate work ---
  // We make a separate, direct request to get the total count for planning.
  const initialData = await TwingateClient.client.request(query, {
    ...variables,
    first: 1,
    after: null,
  });

  const totalCount = initialData[queryName]?.totalCount;
  if (totalCount === undefined) {
    operationLogger.error("Could not determine total count for pagination.");
    throw new Error(
      `Field 'totalCount' was not found on the response for query '${queryName}'.`
    );
  }

  const totalPages = Math.ceil(totalCount / options.maxPageSize);
  let estimatedTimeInfo = "N/A";

  // Estimate total network time using a fixed 900ms per request
  const estimatedTotalNetworkTime = 900 * totalPages;
  let estimatedTotalWaitTime = 0;

  if (
    options.rateLimitStrategy === "pacing" &&
    options.readRateLimitPerMinute > 0 &&
    totalPages > 1
  ) {
    // Calculate the total wait time. There are `totalPages - 1` waits.
    estimatedTotalWaitTime =
      ((totalPages - 1) * RATE_LIMIT_WINDOW_MS) /
      options.readRateLimitPerMinute;
  }

  const totalEstimatedTime =
    (estimatedTotalNetworkTime + estimatedTotalWaitTime) / 1000;
  estimatedTimeInfo = `~${totalEstimatedTime.toFixed(2)}s`;

  operationLogger.info(
    { options },
    `[START] Fetching ${totalCount} records across ${totalPages} pages. Estimated time: ${estimatedTimeInfo}`
  );

  if (totalCount === 0) {
    operationLogger.info("No records to fetch.");
    if (jsonStream) {
      jsonStream.end();
      await new Promise((resolve) => jsonStream.on("finish", resolve));
      return {
        success: true,
        count: 0,
        filePath: outputFilePath,
        duration: "0.00",
      };
    }
    return [];
  }

  // --- 2. Main fetch loop ---
  const startTime = performance.now();
  let allResults = [];
  let hasNextPage = true;
  let after = null;
  let currentPage = 0;
  let requestsInWindow = 0;
  let windowStartTime = performance.now();

  // --- Main loop to fetch all pages ---
  while (hasNextPage) {
    try {
      // Rate limiting logic applied BEFORE the request
      if (options.readRateLimitPerMinute) {
        if (options.rateLimitStrategy === "bursting") {
          const now = performance.now();
          if (now - windowStartTime > RATE_LIMIT_WINDOW_MS) {
            // Reset window if a minute has passed
            windowStartTime = now;
            requestsInWindow = 0;
          }

          if (requestsInWindow >= options.readRateLimitPerMinute) {
            const timeToWait = RATE_LIMIT_WINDOW_MS - (now - windowStartTime);
            if (timeToWait > 0) {
              operationLogger.info(
                `Burst limit reached. Waiting ${timeToWait.toFixed(
                  0
                )}ms for window to reset.`
              );
              await new Promise((resolve) => setTimeout(resolve, timeToWait));
            }
            // Reset for the new window
            windowStartTime = performance.now();
            requestsInWindow = 0;
          }
        }
      }

      // Pass the child logger instance
      const data = await TwingateClient.request(
        query,
        {
          ...variables,
          first: options.maxPageSize,
          after,
        },
        operationLogger
      );

      // Accumulate results
      const pageResults = data[queryName];
      //console.log(pageResults);

      // Determine the correct data structure
      let resultsArray = [];

      // Handle paginated responses (edges)
      if (Array.isArray(pageResults?.edges)) {
        resultsArray = pageResults.edges.map((edge) => edge.node);
      }
      // Handle flat array responses (non-paginated, flat array of objects)
      else if (Array.isArray(pageResults)) {
        resultsArray = pageResults;
      }
      // Future edge case - alternative structure for page results
      //else if (Array.isArray(pageResults?.nodes)) {
      //resultsArray = pageResults.nodes; // Another alternative structure
      //}
      else {
        operationLogger.warn(
          { queryName },
          `[fetchAllPages] Unexpected structure for query: ${queryName}`,
          pageResults
        );
      }

      // If streaming, write to file. Otherwise, accumulate in memory.
      if (jsonStream) {
        for (const item of resultsArray) {
          jsonStream.write(item);
        }
      } else {
        allResults = allResults.concat(resultsArray);
      }

      // Log progress
      /*const pageProgress = `[Page ${String(currentPage + 1).padStart(
        3,
        "0"
      )}/${String(totalPages).padStart(3, "0")}]`;*/

      const pageProgress = `[Page ${currentPage + 1}/${totalPages}]`;

      const totalSoFar = jsonStream
        ? (currentPage + 1) * options.maxPageSize
        : allResults.length;

      operationLogger.info(
        `${pageProgress} Fetched ${
          resultsArray.length
        } records. Total so far: ${Math.min(totalSoFar, totalCount)}.`
      );

      // Check if pageInfo exists before accessing hasNextPage and after
      const pageInfo = pageResults?.pageInfo;
      hasNextPage = pageInfo?.hasNextPage ?? false;
      after = pageInfo?.endCursor || null; // Set 'after' to null if no pagination exists
      currentPage++;
      if (options.rateLimitStrategy === "bursting") {
        requestsInWindow++;
      }

      // Rate limiting - only wait if there is another page to fetch (Pacing Strategy)
      if (
        options.rateLimitStrategy === "pacing" &&
        options.readRateLimitPerMinute &&
        hasNextPage
      ) {
        const waitTime = RATE_LIMIT_WINDOW_MS / options.readRateLimitPerMinute; // Wait time between requests: 60000ms / 60rpm = 1000ms
        operationLogger.debug(
          `[Pacing at ${
            options.readRateLimitPerMinute
          }rpm] Waiting ${waitTime.toFixed(0)}ms before next request.`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    } catch (error) {
      operationLogger.error(
        `Failed to fetch page ${currentPage + 1}: ${error.message}`
      );
      throw error; // Re-throw the error to stop the process
    }
  }

  // --- 3. Final summary ---
  const endTime = performance.now();
  const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);

  if (jsonStream) {
    jsonStream.end();
    await new Promise((resolve) => jsonStream.on("finish", resolve)); // Wait for stream to finish

    const filePaths = jsonStream.getFilePaths();
    const totalFiles = filePaths.length;

    operationLogger.info(
      `[END] Finished streaming ${totalCount} records to ${totalFiles} file(s) in ${durationSeconds} seconds.`
    );

    // Add a small delay to ensure log message is flushed
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Return a summary instead of the full dataset
    return {
      success: true,
      count: totalCount,
      filePaths: filePaths, // Return array of all created files
      totalFiles: totalFiles,
      duration: durationSeconds,
    };
  }

  operationLogger.info(
    `[END] Fetched all ${allResults.length} records via ${totalPages} API calls in ${durationSeconds} seconds.`
  );

  return allResults;
}

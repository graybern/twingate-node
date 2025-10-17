import { randomUUID } from "crypto";
import PQueue from "p-queue";
import fs from "fs";
import path from "path";
import os from "os";
import { createWriteStream } from "./streamUtils.js";

export async function processBulkMutations(
  client,
  mutationFn,
  items,
  callOptions = {}
) {
  const operationId = callOptions.resumeOperationId || randomUUID();
  const operationLogger = client.logger.child({
    operationId,
    functionName: "bulkMutation",
  });

  // Merge client options with call-specific options
  const options = {
    // Client defaults
    concurrency: client.options.bulkConcurrency || 5,
    batchSize: client.options.bulkBatchSize || 1,
    continueOnError: client.options.bulkContinueOnError || true,
    writeRateLimitPerMinute: client.options.writeRateLimitPerMinute || 20,

    // Checkpointing for recovery
    enableCheckpointing: client.options.bulkCheckpointing !== false,
    checkpointInterval: client.options.bulkCheckpointInterval || 20,
    checkpointDir:
      client.options.bulkCheckpointDir ||
      path.join(os.homedir(), "twingate-node-cache", "operations"),

    // Streaming options
    streamToFile: client.options.streamToFile || false,
    streamToFilePath: client.options.streamToFilePath || null,
    maxFileSize: client.options.maxFileSize || 100 * 1024 * 1024, // 100MB
    maxFiles: client.options.maxFiles || 5,

    // Override with call-specific options
    ...callOptions,
  };

  // Create base operation directory
  const operationDir = path.join(options.checkpointDir, operationId);
  if (!fs.existsSync(operationDir)) {
    fs.mkdirSync(operationDir, { recursive: true });
  }

  const checkpointFilePath = path.join(operationDir, "checkpoint.json");

  // Determine file paths
  const resultsDir =
    options.streamToFilePath || path.join(operationDir, "results");
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const successfulFilePath = path.join(
    resultsDir,
    "successful-operations.jsonl"
  );
  const failedFilePath = path.join(resultsDir, "failed-operations.jsonl");
  const summaryPath = path.join(operationDir, "operation-summary.json");

  // Setup file streams if streaming is enabled
  let successStream = null;
  let failedStream = null;

  if (options.streamToFile) {
    operationLogger.info(`Results will be streamed to: ${resultsDir}`);

    // Create write streams
    successStream = createWriteStream(successfulFilePath, operationLogger);
    failedStream = createWriteStream(failedFilePath, operationLogger);

    // Add headers or metadata to stream
    successStream.write(
      JSON.stringify({
        type: "metadata",
        operationId,
        timestamp: new Date().toISOString(),
        recordType: "successful_operations",
      }) + "\n"
    );

    failedStream.write(
      JSON.stringify({
        type: "metadata",
        operationId,
        timestamp: new Date().toISOString(),
        recordType: "failed_operations",
      }) + "\n"
    );
  }

  // Initialize or load state
  let state = {
    operationId,
    totalItems: items.length,
    processedIndexes: [],
    successful: [],
    failed: [],
    inProgress: false,
    startTime: Date.now(),
    lastCheckpointTime: Date.now(),
    metadata: {
      operationType: callOptions.operationType || "bulk_mutation",
      description: callOptions.description || "",
      timestamp: new Date().toISOString(),
    },
  };

  // Resume from checkpoint if available
  if (options.enableCheckpointing && fs.existsSync(checkpointFilePath)) {
    try {
      const savedState = JSON.parse(
        fs.readFileSync(checkpointFilePath, "utf8")
      );
      state = {
        ...savedState,
        inProgress: true, // Mark as in progress again
        lastCheckpointTime: Date.now(),
      };

      // When resuming, we only keep counters from previous run but not the full arrays
      // This prevents memory issues with very large operations
      if (options.streamToFile) {
        state.successful = [];
        state.failed = [];
      }

      operationLogger.info(
        `Resuming operation from checkpoint: ${state.processedIndexes.length}/${items.length} items already processed`
      );
    } catch (err) {
      operationLogger.error(`Failed to load checkpoint: ${err.message}`);
    }
  }

  // Save checkpoint function
  const saveCheckpoint = () => {
    if (!options.enableCheckpointing) return;

    try {
      // When streaming, don't include the full arrays in the checkpoint
      const checkpointState = { ...state };
      if (options.streamToFile) {
        checkpointState.successful = [];
        checkpointState.failed = [];
      }

      fs.writeFileSync(
        checkpointFilePath,
        JSON.stringify(
          {
            ...checkpointState,
            lastCheckpointTime: Date.now(),
          },
          null,
          2
        )
      );

      operationLogger.debug(
        `Checkpoint saved: ${state.processedIndexes.length}/${items.length} items processed`
      );
    } catch (err) {
      operationLogger.error(`Failed to save checkpoint: ${err.message}`);
    }
  };

  // Process with controlled concurrency
  const queue = new PQueue({ concurrency: options.concurrency });
  state.inProgress = true;

  // Skip already processed items
  const pendingItems = [];
  for (let i = 0; i < items.length; i++) {
    if (!state.processedIndexes.includes(i)) {
      pendingItems.push({ index: i, item: items[i] });
    }
  }

  operationLogger.info(
    `Processing ${pendingItems.length} remaining items with concurrency ${options.concurrency}`
  );

  // Add pending items to queue
  let checkpointCounter = 0;

  for (const { index, item } of pendingItems) {
    queue.add(async () => {
      try {
        // Apply rate limiting
        if (options.writeRateLimitPerMinute > 0) {
          const waitTime = 60000 / options.writeRateLimitPerMinute;
          operationLogger.info(
            `[Processing ${index + 1}/${
              items.length
            }] Applying write rate limit: waiting ${waitTime}ms`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }

        // Process the item (mark as write operation)
        const response = await mutationFn([item], true); // Pass isWriteOperation = true

        // Create success record
        const successRecord = {
          index,
          item,
          response,
          timestamp: new Date().toISOString(),
        };

        // Stream to file or keep in memory
        if (options.streamToFile && successStream) {
          successStream.write(JSON.stringify(successRecord) + "\n");
        } else {
          state.successful.push(successRecord);
        }

        operationLogger.info(
          `[${index + 1}/${items.length}] Successfully processed item: ${
            item.id || item.name || "item"
          }`
        );
      } catch (error) {
        // Group errors by type
        const errorType = categorizeError(error);

        // Create failure record
        const failureRecord = {
          index,
          item,
          error: error.message,
          errorType,
          details: extractErrorDetails(error),
          timestamp: new Date().toISOString(),
        };

        // Stream to file or keep in memory
        if (options.streamToFile && failedStream) {
          failedStream.write(JSON.stringify(failureRecord) + "\n");
        } else {
          state.failed.push(failureRecord);
        }

        operationLogger.error(
          `[${index + 1}/${items.length}] Failed to process item: ${
            error.message
          }`
        );

        // Stop processing if continueOnError is false
        if (!options.continueOnError) {
          queue.clear();
          throw error;
        }
      } finally {
        // Track processed items regardless of outcome
        state.processedIndexes.push(index);

        // Update progress and save checkpoint periodically
        checkpointCounter++;
        if (checkpointCounter >= options.checkpointInterval) {
          const progress = Math.round(
            (state.processedIndexes.length / items.length) * 100
          );
          operationLogger.info(
            `Progress: ${progress}% (${state.processedIndexes.length}/${items.length})`
          );

          saveCheckpoint();
          checkpointCounter = 0;
        }
      }
    });
  }

  try {
    // Wait for all operations to complete
    await queue.onIdle();
    state.inProgress = false;

    // Close streams
    if (options.streamToFile) {
      if (successStream) successStream.end();
      if (failedStream) failedStream.end();
    }

    // Final checkpoint
    saveCheckpoint();

    // Gather results
    let results;

    if (options.streamToFile) {
      // Count results from files if streaming was used
      const successCount = countLinesInFile(successfulFilePath) - 1; // Subtract header
      const failedCount = countLinesInFile(failedFilePath) - 1; // Subtract header

      results = {
        operationId,
        operationDir,
        total: items.length,
        successful: { count: successCount, filePath: successfulFilePath },
        failed: { count: failedCount, filePath: failedFilePath },
        streamToFile: true,
      };

      // Analyze errors from failed file
      if (failedCount > 0) {
        results.errorSummary = analyzeErrorsFromFile(failedFilePath);
      }
    } else {
      // Use in-memory results
      results = analyzeResults(state, items);
      results.operationId = operationId;
      results.operationDir = operationDir;
    }

    // Save final summary
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

    const duration = (Date.now() - state.startTime) / 1000;

    operationLogger.info(`Operation completed in ${duration.toFixed(2)}s`);

    if (options.streamToFile) {
      operationLogger.info(
        `Success: ${results.successful.count}, Failed: ${results.failed.count}`
      );
      operationLogger.info(`Results saved to: ${resultsDir}`);
    } else {
      operationLogger.info(
        `Success: ${results.successful.length}, Failed: ${results.failed.length}`
      );
    }

    if (results.errorSummary && Object.keys(results.errorSummary).length > 0) {
      operationLogger.info(
        `Error summary: ${JSON.stringify(results.errorSummary)}`
      );
    }

    return results;
  } catch (error) {
    state.inProgress = false;
    saveCheckpoint();

    // Close streams on error
    if (options.streamToFile) {
      if (successStream) successStream.end();
      if (failedStream) failedStream.end();
    }

    error.operationId = operationId;
    error.checkpointFile = checkpointFilePath;

    operationLogger.error(`Bulk operation failed: ${error.message}`);
    throw error;
  }
}

// Helper functions

function categorizeError(error) {
  if (error.response?.errors?.[0]?.extensions?.code) {
    return error.response.errors[0].extensions.code;
  }

  if (error.message?.includes("validation")) return "VALIDATION_ERROR";
  if (error.message?.includes("not found")) return "NOT_FOUND";
  if (error.message?.includes("permission")) return "PERMISSION_ERROR";
  if (error.response?.status === 429) return "RATE_LIMIT";

  return "UNKNOWN_ERROR";
}

function extractErrorDetails(error) {
  if (error.response?.errors?.[0]) {
    return error.response.errors[0];
  }
  return { message: error.message };
}

function analyzeResults(state, items) {
  const results = {
    total: items.length,
    successful: state.successful,
    failed: state.failed,
    errorSummary: {},
    metadata: state.metadata,
  };

  // Group errors by type for analysis
  state.failed.forEach((failure) => {
    const type = failure.errorType;
    if (!results.errorSummary[type]) {
      results.errorSummary[type] = 0;
    }
    results.errorSummary[type]++;
  });

  return results;
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

function analyzeErrorsFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {};

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n").filter((line) => line.trim());
    const errorSummary = {};

    // Skip first line (header)
    for (let i = 1; i < lines.length; i++) {
      try {
        const failure = JSON.parse(lines[i]);
        const type = failure.errorType || "UNKNOWN_ERROR";
        errorSummary[type] = (errorSummary[type] || 0) + 1;
      } catch {
        // Skip invalid JSON
      }
    }

    return errorSummary;
  } catch (err) {
    return {};
  }
}

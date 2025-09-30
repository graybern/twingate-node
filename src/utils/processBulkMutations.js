import { randomUUID } from "crypto";
import PQueue from "p-queue";
import fs from "fs";
import path from "path";
import os from "os";

export async function processBulkMutations(
  client,
  mutationFn,
  items,
  callOptions = {}
) {
  const operationId = randomUUID();
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
    enableCheckpointing: client.options.bulkCheckpointing || true,
    checkpointInterval: client.options.bulkCheckpointInterval || 50, // Items between checkpoints
    checkpointDir:
      client.options.bulkCheckpointDir ||
      path.join(os.homedir(), "twingate-node-cache", "checkpoints"),

    // Override with call-specific options
    ...callOptions,
  };

  // Create checkpoint directory if needed
  if (options.enableCheckpointing && !fs.existsSync(options.checkpointDir)) {
    fs.mkdirSync(options.checkpointDir, { recursive: true });
  }

  const checkpointFilePath = path.join(
    options.checkpointDir,
    `bulk-op-${operationId}.json`
  );

  // Initialize state
  const state = {
    operationId,
    totalItems: items.length,
    processedIndexes: [],
    successful: [],
    failed: [],
    inProgress: false,
    startTime: Date.now(),
    lastCheckpointTime: Date.now(),
  };

  // Check for resumable operation
  let resumeFrom = 0;
  if (options.resumeOperationId && options.enableCheckpointing) {
    const resumeFilePath = path.join(
      options.checkpointDir,
      `bulk-op-${options.resumeOperationId}.json`
    );
    if (fs.existsSync(resumeFilePath)) {
      try {
        const savedState = JSON.parse(fs.readFileSync(resumeFilePath, "utf8"));
        state.processedIndexes = savedState.processedIndexes;
        state.successful = savedState.successful;
        state.failed = savedState.failed;
        resumeFrom = Math.max(...state.processedIndexes, 0) + 1;

        operationLogger.info(
          `Resuming operation from item ${resumeFrom}/${items.length}`
        );
      } catch (err) {
        operationLogger.error(`Failed to load checkpoint: ${err.message}`);
      }
    }
  }

  // Save checkpoint function
  const saveCheckpoint = () => {
    if (!options.enableCheckpointing) return;

    try {
      fs.writeFileSync(
        checkpointFilePath,
        JSON.stringify({
          ...state,
          lastCheckpointTime: Date.now(),
        })
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

  // Add each item to the queue
  let checkpointCounter = 0;

  // Create tasks for remaining items
  for (let i = resumeFrom; i < items.length; i++) {
    const index = i;

    // Skip already processed items (from a previous run)
    if (state.processedIndexes.includes(index)) continue;

    queue.add(async () => {
      try {
        // Apply rate limiting if needed
        if (options.writeRateLimitPerMinute > 0) {
          const waitTime = 60000 / options.writeRateLimitPerMinute;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }

        // Process the item
        const item = items[index];
        const response = await mutationFn([item]); // Use the provided mutation function

        // Record success
        state.successful.push({
          index,
          item,
          response,
        });

        operationLogger.debug(`Processed item ${index + 1}/${items.length}`);
      } catch (error) {
        // Group errors by type for easier troubleshooting
        const errorType = categorizeError(error);

        // Record failure with detailed information
        state.failed.push({
          index,
          item: items[index],
          error: error.message,
          errorType,
          details: extractErrorDetails(error),
        });

        operationLogger.error(
          `Failed to process item ${index + 1}/${items.length}: ${
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

  // Wait for all operations to complete
  try {
    await queue.onIdle();
    state.inProgress = false;

    // Final checkpoint
    saveCheckpoint();

    // Organize results for better analysis
    const results = analyzeResults(state, items);
    const duration = (Date.now() - state.startTime) / 1000;

    // Log summary
    operationLogger.info(`Operation completed in ${duration.toFixed(2)}s`);
    operationLogger.info(
      `Success: ${results.successful.length}, Failed: ${results.failed.length}`
    );

    if (results.failed.length > 0) {
      operationLogger.info(
        `Error breakdown: ${JSON.stringify(results.errorSummary)}`
      );
    }

    // If everything succeeded, clean up the checkpoint
    if (results.failed.length === 0 && options.enableCheckpointing) {
      try {
        fs.unlinkSync(checkpointFilePath);
      } catch (err) {
        operationLogger.warn(
          `Could not clean up checkpoint file: ${err.message}`
        );
      }
    }

    return results;
  } catch (error) {
    state.inProgress = false;
    saveCheckpoint(); // Save checkpoint on unexpected error
    operationLogger.error(`Bulk operation failed: ${error.message}`);
    throw error;
  }
}

// Helper functions for error categorization and analysis
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
    operationId: state.operationId,
    total: items.length,
    successful: state.successful,
    failed: state.failed,
    errorSummary: {},
    checkpointFile: state.enableCheckpointing ? checkpointFilePath : null,
  };

  // Group errors by type for analysis
  state.failed.forEach((failure) => {
    const type = failure.errorType;
    results.errorSummary[type] = (results.errorSummary[type] || 0) + 1;
  });

  return results;
}

// Import the twingate node.js helper
import twingate from "../src/client.js";

// Import dotenv
import dotenv from "dotenv"; // Import and configure dotenv
dotenv.config(); // Load the variables from the .env file

// Access the environment variables
const tenantName = process.env.TWINGATE_API_TENANT;
const apiKey = process.env.TWINGATE_API_KEY;

// Twingate client options
const options = {
  maxPageSize: 50, // Maximum number of items per page for paginated requests
  maxRetries: 5, // Number of retries for failed requests
  backoffFactor: 2, // Factor by which to increase delay between retries for exponential backoff (e.g., 1s, 2s, 4s, 8s...)
  readRateLimitPerMinute: 60, // Read rate limit per minute
  writeRateLimitPerMinute: 20, // Write rate limit per minute
  timeout: 35000, // Timeout for requests in milliseconds
  rateLimitStrategy: "pacing", // 'pacing' or 'bursting'
  streamToFile: false, // If provided, streams results to a file instead of keeping in memory (meant for large datasets)
  streamToFilePath: null, // If provided, streams results to this file path instead of default path.
  maxFileSize: 100 * 1024 * 1024, // 100MB per file default
  maxFiles: 5, // Keep 5 rotated files by default
  logLevel: "info", // Only show warnings/errors, not progress
  bulkConcurrency: 1, // Keep this at 1 to ensure sequential processing
  bulkBatchSize: 1, // Items per mutation request (1 = individual)
  bulkContinueOnError: true, // Continue processing after errors
  bulkCheckpointing: true, // Enable checkpointing for recovery
  bulkCheckpointInterval: 50, // Save progress after every 50 operations
  bulkCheckpointDir: null, // Will default to ~/twingate-node-cache/checkpoints
};

// Twingate client
const client = twingate(tenantName, apiKey, options);

var resourceIds = [];
client.resources
  .getAll()
  .then((results) => {
    // Process results - results is an array of resource objects
    results.forEach((resource) => {
      resourceIds.push(resource.id);
    });
    console.log(`✅ Retrieved ${resourceIds.length} resources.`);
    console.log(`resource[1] id: ${resourceIds[1]}`);
    //var tempResourceIds = [resourceIds[1], resourceIds[2]];
    client.resources
      .deleteBulk(resourceIds)
      .then((deleteResults) => {
        console.log("\n=== BULK DELETE RESULTS ===");
        console.log(`- Total Items: ${deleteResults.total}`);
        console.log(`- Successful: ${deleteResults.successful.length}`);
        console.log(`- Failed: ${deleteResults.failed.length}`);
      })
      .catch((deleteErr) => {
        console.error("❌ Error during bulk delete:", deleteErr);
      });
  })
  .catch((err) => {
    console.error("❌ Error: ", err);

    // Show resume instructions if available
    if (err.operationId) {
      console.log(`\nTo resume this operation:`);
      console.log(
        `client.resources.getAll({ resumeOperationId: '${err.operationId}' })`
      );
    }
  });

// TODO:
// examples/demo.js

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

/*
// Resource Ids to do policy updates
const resourceIds = [
  "UmVzb3VyY2U6MjQxMTk1Mg==", // Test10
  "UmVzb3VyY2U6MjQxMTk1Mw==", // Test11
  "UmVzb3VyY2U6MjQxMTk1NA==", // Test12
  "UmVzb3VyY2U6MjQxMTk1NQ==", // Test13
  "UmVzb3VyY2U6MjQxMTk1Ng==", // Test14
  "UmVzb3VyY2U6MjQxMTk1Nw==", // Test15
  "UmVzb3VyY2U6MjQxMTk1OA==", // Test16
  "UmVzb3VyY2U6MjQxMTk1OQ==", // Test17
  "UmVzb3VyY2U6MjQxMTk2MA==", // Test18
  "UmVzb3VyY2U6MjQxMTk2MQ==", // Test19
];

// Policy to apply
const policy = "U2VjdXJpdHlQb2xpY3k6MjE0MDY5"; // default policy
//const policy = "U2VjdXJpdHlQb2xpY3k6MjE0MjAx"; // restricted policy

const updateResourcesBulk = async () => {
  try {
    // Prepare items for update
    const updateItems = resourceIds.map((id) => ({
      id,
      securityPolicyId: policy,
    }));

    console.log(`Starting bulk update of ${updateItems.length} resources...`);

    const results = await client.resources.updateBulk(updateItems, {
      concurrency: 50, // Process 1 update at a time
      continueOnError: true, // Continue even if some updates fail
      enableCheckpointing: true, // Save progress for recovery
    });

    console.log("\n=== BULK UPDATE RESULTS ===");
    console.log(`- Total Items: ${results.total}`);
    console.log(`- Successful: ${results.successful.length}`);
    console.log(`- Failed: ${results.failed.length}`);

    // If there are failures, handle them
    if (results.failed.length > 0) {
      console.log("\n=== ERROR SUMMARY ===");
      Object.entries(results.errorSummary).forEach(([errorType, count]) => {
        console.log(`- ${errorType}: ${count} items`);
      });

      // Save failed items to file for inspection
      const failedItemsFile = path.join(
        os.homedir(),
        "twingate-failed-updates.json"
      );
      fs.writeFileSync(
        failedItemsFile,
        JSON.stringify(results.failed, null, 2)
      );
      console.log(`\nFailed items saved to: ${failedItemsFile}`);

      // Allow retrying after fixing issues
      const shouldRetry = await promptForRetry();
      if (shouldRetry) {
        console.log("Retrying failed items...");
        const retryResults = await client.resources.retryFailedUpdates(
          results.failed
        );
        console.log(
          `Retry successful for ${retryResults.successful.length} items`
        );
      }
    }
  } catch (err) {
    console.error("❌ Error during bulk update:", err);

    // If we have a checkpoint, offer to resume
    if (err.checkpointFile && fs.existsSync(err.checkpointFile)) {
      console.log(
        `\nOperation can be resumed using checkpoint: ${err.checkpointFile}`
      );
      console.log("To resume, call updateResourcesBulk with the operationId");
    }
  }
};

// Run the function
updateResourcesBulk();
*/

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

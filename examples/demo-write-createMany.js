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

// Configuration - Update these with your actual IDs
const numberOfResources = 10000;
const remoteNetworkId = "UmVtb3RlTmV0d29yazo2OTQ0Mw=="; // Replace with your remote network ID
const securityPolicyId = "U2VjdXJpdHlQb2xpY3k6MjE0MDY5"; // Replace with your security policy ID
const groupIds = ["R3JvdXA6MTg0ODU2"]; // Replace with your group IDs
// group 1 => 1000 resources
// group 2 => 2000 resources
// group 3 => 3000 resources
// ... (manually assigning user to groups)

// Generate resource list
const resourceItems = [];
for (let i = 8001; i <= numberOfResources; i++) {
  const paddedNumber = i.toString().padStart(3, "0");

  resourceItems.push({
    address: `192.168.1.${i}`,
    alias: `bulk-test-resource-${paddedNumber}.int`,
    groupIds: groupIds,
    isBrowserShortcutEnabled: false,
    isVisible: true,
    name: `bulk-test-resource-${paddedNumber}`,
    protocols: {
      allowIcmp: true,
      tcp: {
        policy: "RESTRICTED",
        ports: [
          { start: 22, end: 22 }, // SSH
          { start: 80, end: 80 }, // HTTP
          { start: 443, end: 443 }, // HTTPS
          { start: 3000, end: 3100 }, // Custom range
        ],
      },
      udp: {
        policy: "RESTRICTED",
        ports: [
          { start: 53, end: 53 }, // DNS
        ],
      },
    },
    remoteNetworkId: remoteNetworkId,
    securityPolicyId: securityPolicyId,
    usageBasedAutolockDurationDays: 30,
  });
}

console.log(`🚀 Creating ${numberOfResources} resources...`);
console.log(`📋 Sample resource:`, JSON.stringify(resourceItems[0], null, 2));

// Create resources in bulk
client.resources
  .createBulk(resourceItems)
  .then((results) => {
    console.log("\n🎉 === BULK CREATION RESULTS ===");
    console.log(`📊 Total Items: ${results.total}`);
    console.log(`✅ Successful: ${results.successful.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);

    // Show some successful resources
    if (results.successful.length > 0) {
      console.log("\n✨ Successfully created resources (first 5):");
      results.successful.slice(0, 5).forEach((success, index) => {
        const resourceName =
          success.response?.resourceCreate?.entity?.name || success.item.name;
        const resourceId =
          success.response?.resourceCreate?.entity?.id || "Unknown ID";
        console.log(`   ${index + 1}. ${resourceName} (${resourceId})`);
      });
    }

    // Show failures if any
    if (results.failed.length > 0) {
      console.log("\n⚠️  First 3 failures:");
      results.failed.slice(0, 3).forEach((failure, index) => {
        console.log(`   ${index + 1}. Resource: ${failure.item.name}`);
        console.log(`      Error: ${failure.error}`);
      });
    }
  })
  .catch((err) => {
    console.error("❌ Error during bulk creation:", err);
  });

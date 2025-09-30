import { gql, request, GraphQLClient } from "graphql-request";
import { withRetries } from "./utils/withRetries.js";
import resources from "./resources/_index.js"; // Consolidated import of resources
import { createLogger } from "./utils/logger.js"; // Import the factory function
import os from "os";
import path from "path";

class TwingateClient {
  constructor(tenantName, apiKey, options = {}) {
    if (!tenantName || !apiKey) {
      throw new Error("Both tenantName and apiKey are required.");
    }

    this.tenantName = tenantName;
    this.tenantUrl = `https://${tenantName}.twingate.com/api/graphql/`;
    this.apiKey = apiKey;

    this.options = {
      maxPageSize: 50, // Default value
      maxRetries: 5, // Default value
      backoffFactor: 2, // Default value
      readRateLimitPerMinute: 60, // Default value => readLimit
      writeRateLimitPerMinute: 20, // Default value => writeLimit
      timeout: 35000, // Default value
      rateLimitStrategy: "pacing", // 'pacing' or 'bursting'
      streamToFile: false, // Default value
      streamToFilePath: path.join(
        os.homedir(),
        "twingate-node-cache",
        "responses"
      ), // Will be generated dynamically with operationId
      maxFileSize: 100 * 1024 * 1024, // 100MB per file default
      maxFiles: 5, // Keep 5 rotated files by default
      logLevel: "info", // Default log level
      bulkConcurrency: 5, // Number of concurrent operations
      bulkBatchSize: 1, // Items per mutation request (1 = individual)
      bulkContinueOnError: true, // Continue processing after errors
      bulkCheckpointing: true, // Enable checkpointing for recovery
      bulkCheckpointInterval: 50, // Save state after every 50 operations
      bulkCheckpointDir: path.join(
        os.homedir(),
        "twingate-node-cache",
        "checkpoints"
      ),
      ...options, // Overrides provided by the user
    };

    // Create a new logger instance with the correct log level from options
    const globalLogger = createLogger(this.options.logLevel);

    // Configure the logger for this client instance
    this.logger = globalLogger.child({
      clientId: `tenant-${this.tenantName}`,
    });

    // For verification, you can add a debug log right after initialization
    this.logger.debug("TwingateClient initialized with debug logging enabled.");

    // Initialize GraphQLClient
    this.client = new GraphQLClient(this.tenantUrl, {
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json",
      },
    });

    // Attach resources
    Object.entries(resources).forEach(([key, resource]) => {
      this[key] = resource(this); // Pass the TwingateClient instance to each resource
    });
  }

  // Wrap each request in withRetries function to ensure every
  // query/mutation through the client is protected with retry logic
  async request(
    query,
    variables = {},
    logger = this.logger, // Use client's logger by default
    operationId = null
  ) {
    // Use the client's logger by default instead of global logger
    const executeRequest = async () => this.client.request(query, variables);

    // If the passed logger is a child logger, it will have the operationId in its bindings.
    // Use that as the primary source for the operationId.
    const opId = logger.bindings?.().operationId || operationId;

    return withRetries(executeRequest, {
      ...this.options,
      logger,
      operationId: opId,
    });
  }
}

export default TwingateClient;

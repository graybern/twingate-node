import pino from "pino";
import path from "path";
import os from "os";
import fs from "fs";

const isProduction = process.env.NODE_ENV === "production";

// Log file configuration
const logDir = path.join(os.homedir(), "twingate-node-cache", "logs");
const logFile = path.join(logDir, "twingate-sdk.log");

// Create log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Creates a new Pino logger instance.
 * @param {string} level - The minimum log level (e.g., 'info', 'debug').
 * @returns {pino.Logger} A new pino logger instance.
 */
const createLogger = (level = "info") => {
  const targets = [];

  // Console target (always present in development)
  if (!isProduction) {
    targets.push({
      target: "pino-pretty",
      level: level, // Use the passed-in level
      options: {
        colorize: true,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
        // Only show clientId at debug level
        ignore:
          level === "debug"
            ? "" //"pid,hostname,clientId,operationId,functionName"
            : "pid,hostname,clientId,operationId,functionName",
        messageFormat:
          level === "debug"
            ? "{if operationId}[{operationId}] [{functionName}] {end}{msg}"
            : "{if operationId}[{operationId}] [{clientId}] [{functionName}] {end}{msg}",
      },
    });
  }

  // File target with rotation (always present)
  targets.push({
    target: "pino-roll",
    level: level, // Use the passed-in level
    options: {
      file: logFile,
      frequency: "daily", // Rotate daily
      size: "10M", // Rotate when file exceeds 10MB
      limit: {
        count: 10, // Keep 10 rotated files
      },
    },
  });

  return pino({
    level: level, // Use the passed-in level
    transport: {
      targets: targets,
    },
  });
};

// Export the factory function
export { createLogger };

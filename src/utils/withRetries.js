import { randomUUID } from "crypto";

export async function withRetries(
  fn,
  {
    maxRetries,
    backoffFactor,
    timeout,
    logger,
    operationId: parentOperationId,
  } = {}
) {
  // If an operationId is provided, use it to create/get the logger.
  // Otherwise, create a new operationId and a new child logger.
  const operationId = parentOperationId || randomUUID();
  const operationLogger = logger.child({
    operationId,
    functionName: "withRetries",
  });

  let attempt = 0;
  let metrics = {
    attempts: 0,
    failures: 0,
    success: false,
  };

  while (attempt <= maxRetries) {
    try {
      metrics.attempts++;
      operationLogger.debug(
        `[Attempt ${attempt + 1}/${maxRetries + 1}] Executing request.`
      );
      // Wrap the function call with a timeout
      const result = await Promise.race([
        fn(),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  `[Attempt ${attempt + 1}/${
                    maxRetries + 1
                  }] Request timed out after ${timeout}ms`
                )
              ),
            timeout
          )
        ),
      ]);

      metrics.success = true;
      operationLogger.debug(
        `[Attempt ${attempt + 1}/${maxRetries + 1}] Request succeeded.`
      );
      return result;
    } catch (error) {
      attempt++;
      metrics.failures++;

      // Log errors - these will respect the logger's level
      operationLogger.warn(
        `[Attempt ${attempt + 1}/${maxRetries + 1}] Error executing request: ${
          error.message
        }`
      );

      // Handle 429 Too Many Requests
      if (error.response?.status === 429) {
        const retryAfter =
          parseInt(error.response.headers["retry-after"], 10) || 1000;
        operationLogger.warn(
          `[Attempt ${attempt + 1}/${
            maxRetries + 1
          }] Rate limit reached, retrying after ${retryAfter}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        continue;
      }

      // Handle 500 & 503 server errors
      if ([500, 503].includes(error.response?.status)) {
        operationLogger.warn(
          `[Attempt ${attempt + 1}/${maxRetries + 1}] Server error ${
            error.response.status
          }, retrying...`
        );
      }

      // Stop retrying if we've reached the maximum attempts
      if (attempt > maxRetries) {
        operationLogger.error(
          `[Attempt ${attempt + 1}/${
            maxRetries + 1
          }] Max retries reached. Failed with error: ${error.message}`
        );
        throw error;
      }

      // Handle other errors with exponential backoff
      const waitTime = backoffFactor ** attempt * 100;
      operationLogger.warn(
        `[Attempt ${attempt + 1}/${
          maxRetries + 1
        }] Retrying after ${waitTime}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

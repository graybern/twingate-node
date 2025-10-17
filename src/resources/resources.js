// src/resources/resources.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";
import { processBulkMutations } from "../utils/processBulkMutations.js";

const resources = (client) => {
  const methods = {
    /**
     * Fetches a list of resources
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of resources
     */
    get: async (options = {}) => {
      const query = graphql.queries.resources.listResources;
      // Use the client's logger instead of fallback to console
      const logger = client.logger;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.resources;
      } catch (error) {
        logger.error("[resources][get] Error fetching resources:", error);
        throw error;
      }
    },
    /**
     * Fetches a single resource by its ID
     * @param {String} id - The resource's ID
     * @returns {Promise<Object>} - resource details
     */
    getOne: async (id) => {
      const query = graphql.queries.resources.getResource;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.resource;
      } catch (error) {
        logger.error(
          `[resources][getOne] Error fetching resource with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all resources by automatically paginating through results **(WARNING - Use with caution)**
     * @param {object} [options] - Options for the operation.
     * @param {boolean} [options.streamToFile] - If true, streams results to a file.
     * @param {string} [options.streamToFilePath] - Path for the streamed file.
     * @returns {Promise<Array|object>} A promise that resolves to an array of all resources or a summary object if streaming.
     */
    getAll: async (options = {}) => {
      // Use the client's logger instead of fallback to console
      const logger = client.logger;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.resources.listResources;

        const allresources = await fetchAllPages(
          client,
          query,
          "resources",
          {}, // No variables needed for this specific query
          options // Pass call-specific options like streamToFile
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allresources;
      } catch (error) {
        logger.error(
          "[resources][getAll] Error fetching all resources:",
          error
        );
        throw error;
      }
    },

    /**
     * Return the fragment GQL string
     * @returns {String} - GQL fragment string
     */
    getFragment: () => graphql.fragments,

    /**
     * Return the full query GQL string with fragment included
     * @returns {String} - GQL query string
     */
    getQuery: () => graphql.queries.resources,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new resource
     * @param {Object} args - Arguments to create the new resource
     * @returns {Promise<Object>} - Mutation fields
     */
    create: async (options = {}) => {
      const mutation = graphql.mutations.resources.resourceCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.resourceCreate;
      } catch (error) {
        logger.error("[resources][create] Error creating resource:", error);
        throw error;
      }
    },

    /**
     * Deletes a single resource by its ID
     * @param {String} id - The resource's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      const mutation = graphql.mutations.resources.resourceDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.resourceDelete;
      } catch (error) {
        logger.error(
          `[resources][delete] Error deleting resource with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the resource
     * @param {Object} options - Arguments to create the new resource
     * @returns {Promise<Object>} - Mutation fields
     */
    update: async (options = {}) => {
      const mutation = graphql.mutations.resources.resourceUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.resourceUpdate;
      } catch (error) {
        logger.error("[resources][update] Error updating resource:", error);
        throw error;
      }
    },

    /**
     * Updates details of the resource
     * @param {Object} options - Arguments to create the new resource
     * @returns {Promise<Object>} - Mutation result
     */
    accessAdd: async (options = {}) => {
      const mutation = graphql.mutations.resources.resourceAccessAdd;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, options);
        return response.resourceAccessAdd;
      } catch (error) {
        logger.error(
          `[resources][accessAdd] Error adding access for resource with ID ${options.resourceId}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates details of the resource
     * @param {Object} options - Arguments to create the new resource
     * @returns {Promise<Object>} - Mutation result
     */
    accessSet: async (options = {}) => {
      const mutation = graphql.mutations.resources.resourceAccessSet;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, options);
        return response.resourceAccessSet;
      } catch (error) {
        logger.error(
          `[resources][accessSet] Error setting access for resource with ID ${options.resourceId}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates details of the resource
     * @param {Object} options - Arguments to create the new resource
     * @returns {Promise<Object>} - Mutation result
     */
    accessRemove: async (options = {}) => {
      const mutation = graphql.mutations.resources.resourceAccessRemove;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, options);
        return response.resourceAccessRemove;
      } catch (error) {
        logger.error(
          `[resources][accessRemove] Error removing access for resource with ID ${options.resourceId}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Update multiple resources in bulk with controlled concurrency and error tracking
     * @param {Array<Object>} items - Array of resource update objects
     * @param {Object} options - Options for the bulk operation
     * @returns {Promise<Object>} Results containing successful and failed operations
     */
    updateBulk: async (items = [], options = {}) => {
      const mutation = graphql.mutations.resources.resourceUpdate;
      const logger = client.logger;

      try {
        // Define the mutation function
        const updateResourceFn = async (batch) => {
          if (batch.length === 1) {
            return client.request(mutation, batch[0]);
          } else {
            // For future batch implementation
            throw new Error("Batch size > 1 not supported by the current API");
          }
        };

        // Process bulk update with tracking
        return processBulkMutations(client, updateResourceFn, items, options);
      } catch (error) {
        logger.error(
          "[resources][updateBulk] Error updating resources:",
          error
        );
        throw error;
      }
    },

    /**
     * Delete multiple resources in bulk with controlled concurrency and error tracking
     * @param {Array<String>} ids - Array of resource IDs to delete
     * @param {Object} options - Options for the bulk operation
     * @returns {Promise<Object>} Results containing successful and failed operations
     */
    deleteBulk: async (ids = [], options = {}) => {
      const mutation = graphql.mutations.resources.resourceDelete;
      const logger = client.logger;

      try {
        // Convert IDs to items format expected by processBulkMutations
        const items = ids.map((id) => ({ id }));

        // Define the mutation function
        const deleteResourceFn = async (batch) => {
          if (batch.length === 1) {
            return client.request(mutation, { id: batch[0].id });
          } else {
            // For future batch implementation
            throw new Error("Batch size > 1 not supported by the current API");
          }
        };

        // Process bulk delete with tracking
        return processBulkMutations(client, deleteResourceFn, items, options);
      } catch (error) {
        logger.error(
          "[resources][deleteBulk] Error deleting resources:",
          error
        );
        throw error;
      }
    },

    /**
     * Retry failed items from a previous bulk operation
     * @param {Array} failedItems - Array of failed items from a previous operation
     * @param {Object} options - Options for the retry operation
     * @returns {Promise<Object>} Results of the retry operation
     */
    retryFailedUpdates: async (failedItems = [], options = {}) => {
      const logger = client.logger;

      try {
        // Extract the items to retry from the failed results
        const itemsToRetry = failedItems.map((failure) => failure.item);

        if (itemsToRetry.length === 0) {
          logger.info("No failed items to retry");
          return { successful: [], failed: [], total: 0 };
        }

        logger.info(`Retrying ${itemsToRetry.length} failed updates`);
        return methods.updateBulk(itemsToRetry, options);
      } catch (error) {
        logger.error(
          "[resources][retryFailedUpdates] Error retrying failed updates:",
          error
        );
        throw error;
      }
    },

    /**
     * Retry failed items from a previous bulk delete operation
     * @param {Array} failedItems - Array of failed items from a previous delete operation
     * @param {Object} options - Options for the retry operation
     * @returns {Promise<Object>} Results of the retry operation
     */
    retryFailedDeletes: async (failedItems = [], options = {}) => {
      const logger = client.logger;

      try {
        // Extract the IDs to retry from the failed results
        const idsToRetry = failedItems.map((failure) => failure.item.id);

        if (idsToRetry.length === 0) {
          logger.info("No failed deletes to retry");
          return { successful: [], failed: [], total: 0 };
        }

        logger.info(`Retrying ${idsToRetry.length} failed deletes`);
        return methods.deleteBulk(idsToRetry, options);
      } catch (error) {
        logger.error(
          "[resources][retryFailedDeletes] Error retrying failed deletes:",
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default resources;

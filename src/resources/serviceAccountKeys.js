// src/resources/serviceAccountKeys.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const serviceAccountKeys = (client) => {
  const methods = {
    /**
     * Fetches a list of serviceAccountKeys
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of serviceAccountKeys
     */
    get: async (options = {}) => {
      /* TODO: Delete - only able to fetch one */
      const query = graphql.queries.serviceAccountKeys.listserviceAccountKeys;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.serviceAccountKeys;
      } catch (error) {
        logger.error(
          "[serviceAccountKeys][get] Error fetching serviceAccountKeys:",
          error
        );
        throw error;
      }
    },
    /**
     * Fetches a single connector by its ID
     * @param {String} id - The connector's ID
     * @returns {Promise<Object>} - connector details
     */
    getOne: async (id) => {
      /* TODO: Fetches a single Service Account Key by its ID. */
      const query = graphql.queries.serviceAccountKeys.getServiceAccountKey;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.serviceAccountKey;
      } catch (error) {
        logger.error(
          `[serviceAccountKeys][getOne] Error fetching connector with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all serviceAccountKeys by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All serviceAccountKeys from paginated results
     */
    getAll: async () => {
      /* TODO: Delete - only able to fetch one */
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.serviceAccountKeys.listserviceAccountKeys;

        const allserviceAccountKeys = await fetchAllPages(
          client,
          query,
          "serviceAccountKeys",
          {
            //maxPageSize: ,
            //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
            logger,
          }
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allserviceAccountKeys;
      } catch (error) {
        logger.error(
          "[serviceAccountKeys][getAll] Error fetching all serviceAccountKeys:",
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
    getQuery: () => graphql.queries.serviceAccountKeys,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new connector
     * @param {Object} args - Arguments to create the new connector
     * @returns {Promise<Object>} - Mutation fields
     */
    create: async (options = {}) => {
      const mutation =
        graphql.mutations.serviceAccountKeys.serviceAccountKeyCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.serviceAccountKeyCreate;
      } catch (error) {
        logger.error(
          "[serviceAccountKeys][create] Error creating serviceAccountKey:",
          error
        );
        throw error;
      }
    },

    /**
     * Deletes a single connector by its ID
     * @param {String} id - The connector's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      const mutation =
        graphql.mutations.serviceAccountKeys.serviceAccountKeyDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.serviceAccountKeyDelete;
      } catch (error) {
        logger.error(
          `[serviceAccountKeys][delete] Error deleting serviceAccountKey with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Revokes a single serviceAccountKey by its ID
     * @param {String} id - The serviceAccountKey's ID to revoke
     * @returns {Promise<Object>} - Mutation fields
     */
    revoke: async (id) => {
      const mutation =
        graphql.mutations.serviceAccountKeys.serviceAccountKeyRevoke;
      const logger = client.logger || console;

      try {
        //logger.info(`Revoking serviceAccountKey with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.serviceAccountKeyRevoke;
      } catch (error) {
        logger.error(
          `[serviceAccountKeys][revoke] Error revoking serviceAccountKey with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the connector
     * @param {Object} options - Arguments to create the new connector
     * @returns {Promise<Object>} - Mutation fields
     */
    update: async (options = {}) => {
      const mutation =
        graphql.mutations.serviceAccountKeys.serviceAccountKeyUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.serviceAccountKeyUpdate;
      } catch (error) {
        logger.error(
          "[serviceAccountKeys][update] Error updating serviceAccountKey:",
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default serviceAccountKeys;

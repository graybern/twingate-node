// src/resources/connectors.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const connectors = (client) => {
  const methods = {
    /**
     * Fetches a list of connectors
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of connectors
     */
    get: async (options = {}) => {
      const query = graphql.queries.connectors.listConnectors;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.connectors;
      } catch (error) {
        logger.error("[connectors][get] Error fetching connectors:", error);
        throw error;
      }
    },
    /**
     * Fetches a single connector by its ID
     * @param {String} id - The connector's ID
     * @returns {Promise<Object>} - connector details
     */
    getOne: async (id) => {
      const query = graphql.queries.connectors.getConnector;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.connector;
      } catch (error) {
        logger.error(
          `[connectors][getOne] Error fetching connector with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all connectors by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All connectors from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.connectors.listConnectors;

        const allConnectors = await fetchAllPages(client, query, "connectors", {
          //maxPageSize: ,
          //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
          logger,
        });

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allConnectors;
      } catch (error) {
        logger.error(
          "[connectors][getAll] Error fetching all connectors:",
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
    getQuery: () => graphql.queries.connectors,

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
      const mutation = graphql.mutations.connectors.connectorCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.connectorCreate;
      } catch (error) {
        logger.error("[connectors][create] Error creating connector:", error);
        throw error;
      }
    },

    /**
     * Deletes a single connector by its ID
     * @param {String} id - The connector's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      const mutation = graphql.mutations.connectors.connectorDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.connectorDelete;
      } catch (error) {
        logger.error(
          `[connectors][delete] Error deleting connector with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates details of the connector
     * @param {Object} options - Arguments to create the new connector
     * @returns {Promise<Object>} - Mutation result
     */
    generateTokens: async (connectorId) => {
      const mutation = graphql.mutations.connectors.connectorGenerateTokens;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { connectorId });
        return response.connectorGenerateTokens;
      } catch (error) {
        logger.error(
          `[connectors][generateTokens] Error generating token for connector with ID ${connectorId}:`,
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
      const mutation = graphql.mutations.connectors.connectorUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.connectorUpdate;
      } catch (error) {
        logger.error("[connectors][update] Error updating connector:", error);
        throw error;
      }
    },
  };

  return methods;
};

export default connectors;

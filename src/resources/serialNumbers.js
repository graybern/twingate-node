// src/resources/serialNumbers.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const serialNumbers = (client) => {
  const methods = {
    /**
     * Fetches a list of serialNumbers
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of serialNumbers
     */
    get: async (options = {}) => {
      const query = graphql.queries.serialNumbers.listSerialNumbers;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.serialNumbers;
      } catch (error) {
        logger.error(
          "[serialNumbers][get] Error fetching serialNumbers:",
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
      /* TODO: Does this work? */
      const query = graphql.queries.serialNumbers.getSerialNumber;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.serialNumber;
      } catch (error) {
        logger.error(
          `[serialNumbers][getOne] Error fetching connector with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all serialNumbers by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All serialNumbers from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.serialNumbers.listSerialNumbers;

        const allSerialNumbers = await fetchAllPages(
          client,
          query,
          "serialNumbers",
          {
            //maxPageSize: ,
            //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
            logger,
          }
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allSerialNumbers;
      } catch (error) {
        logger.error(
          "[serialNumbers][getAll] Error fetching all serialNumbers:",
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
    getQuery: () => graphql.queries.serialNumbers,

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
      const mutation = graphql.mutations.serialNumbers.serialNumbersCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.serialNumbersCreate;
      } catch (error) {
        logger.error(
          "[serialNumbers][create] Error creating connector:",
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
      const mutation = graphql.mutations.serialNumbers.serialNumbersDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.serialNumbersDelete;
      } catch (error) {
        logger.error(
          `[serialNumbers][delete] Error deleting connector with ID ${id}:`,
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default serialNumbers;

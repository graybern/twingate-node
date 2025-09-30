// src/resources/remoteNetworks.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const remoteNetworks = (client) => {
  const methods = {
    /**
     * Fetches a list of remoteNetworks
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of remoteNetworks
     */
    get: async (options = {}) => {
      const query = graphql.queries.remoteNetworks.listRemoteNetworks;
      const logger = client.logger || console;

      //console.log(query);

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.remoteNetworks;
      } catch (error) {
        logger.error(
          "[remoteNetworks][get] Error fetching remoteNetworks:",
          error
        );
        throw error;
      }
    },
    /**
     * Fetches a single remoteNetwork by its ID
     * @param {String} id - The remoteNetwork's ID
     * @returns {Promise<Object>} - remoteNetwork details
     */
    getOne: async (id) => {
      const query = graphql.queries.remoteNetworks.getRemoteNetwork;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.remoteNetwork;
      } catch (error) {
        logger.error(
          `[remoteNetworks][getOne] Error fetching remoteNetwork with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all remoteNetworks by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All remoteNetworks from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.remoteNetworks.listRemoteNetworks;

        const allremoteNetworks = await fetchAllPages(
          client,
          query,
          "remoteNetworks",
          {
            //maxPageSize: ,
            //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
            logger,
          }
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allremoteNetworks;
      } catch (error) {
        logger.error(
          "[remoteNetworks][getAll] Error fetching all remoteNetworks:",
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
    getQuery: () => graphql.queries.remoteNetworks,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new remoteNetwork
     * @param {Object} args - Arguments to create the new remoteNetwork
     * @returns {Promise<Object>} - Mutation fields
     */
    create: async (options = {}) => {
      const mutation = graphql.mutations.remoteNetworks.remoteNetworkCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.remoteNetworkCreate;
      } catch (error) {
        logger.error(
          "[remoteNetworks][create] Error creating remoteNetwork:",
          error
        );
        throw error;
      }
    },

    /**
     * Deletes a single remoteNetwork by its ID
     * @param {String} id - The remoteNetwork's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      const mutation = graphql.mutations.remoteNetworks.remoteNetworkDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response;
      } catch (error) {
        logger.error(
          `[remoteNetworks][delete] Error deleting remoteNetwork with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the remoteNetwork
     * @param {Object} options - Arguments to create the new remoteNetwork
     * @returns {Promise<Object>} - Mutation fields
     */
    update: async (options = {}) => {
      const mutation = graphql.mutations.remoteNetworks.remoteNetworkUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.remoteNetworkUpdate;
      } catch (error) {
        logger.error(
          "[remoteNetworks][update] Error updating remoteNetwork:",
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default remoteNetworks;

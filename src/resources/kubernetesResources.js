// src/resources/kubernetesResource.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const kubernetesResources = (client) => {
  const methods = {
    /**
     * Fetches a list of kubernetesResources
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of kubernetesResource
     */
    get: async (options = {}) => {
      /* TODO: Does not exist? */
      const query = graphql.queries.kubernetesResources.listKubernetesResources;
      const logger = client.logger || console;

      //console.log(query);

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.kubernetesResources;
      } catch (error) {
        logger.error(
          "[kubernetesResources][get] Error fetching kubernetesResources:",
          error
        );
        throw error;
      }
    },
    /**
     * Fetches a single group by its ID
     * @param {String} id - The group's ID
     * @returns {Promise<Object>} - group details
     */
    getOne: async (id) => {
      /* TODO: Does not exist? */
      const query = graphql.queries.kubernetesResources.getKubernetesResource;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.group;
      } catch (error) {
        logger.error(
          `[kubernetesResources][getOne] Error fetching group with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all kubernetesResources by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All kubernetesResources from paginated results
     */
    getAll: async () => {
      /* TODO: Does not exist? */
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query =
          graphql.queries.kubernetesResources.listKubernetesResources;

        const allKubernetesResource = await fetchAllPages(
          client,
          query,
          "kubernetesResources",
          {
            //maxPageSize: ,
            //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
            logger,
          }
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allKubernetesResources;
      } catch (error) {
        logger.error(
          "[kubernetesResources][getAll] Error fetching all kubernetesResources:",
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
    getQuery: () =>
      graphql.queries.kubernetesResource /* TODO: Does not exist? */,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new kubernetesResource
     * @param {Object} args - Arguments to create the new group
     * @returns {Promise<Object>} - Mutation fields
     */
    create: async (options = {}) => {
      const mutation =
        graphql.mutations.kubernetesResources.kubernetesResourceCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.kubernetesResourceCreate;
      } catch (error) {
        logger.error(
          "[kubernetesResources][create] Error creating kubernetesResource:",
          error
        );
        throw error;
      }
    },

    /**
     * Deletes a single group by its ID
     * @param {String} id - The group's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      /* TODO: Does not exist? */
      const mutation =
        graphql.mutations.kubernetesResources.kubernetesResourceDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.kubernetesResourceDelete;
      } catch (error) {
        logger.error(
          `[kubernetesResources][delete] Error deleting kubernetesResource with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the group
     * @param {Object} options - Arguments to create the new group
     * @returns {Promise<Object>} - Mutation fields
     */
    update: async (options = {}) => {
      const mutation =
        graphql.mutations.kubernetesResources.kubernetesResourceUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.kubernetesResourceUpdate;
      } catch (error) {
        logger.error(
          "[kubernetesResources][update] Error updating kubernetesResource:",
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default kubernetesResources;

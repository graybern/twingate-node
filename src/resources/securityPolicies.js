// src/resources/securityPolicies.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const securityPolicies = (client) => {
  const methods = {
    /**
     * Fetches a list of securityPolicies
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of securityPolicies
     */
    get: async (options = {}) => {
      const query = graphql.queries.securityPolicies.listSecurityPolicies;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.securityPolicies;
      } catch (error) {
        logger.error(
          "[securityPolicies][get] Error fetching securityPolicies:",
          error
        );
        throw error;
      }
    },
    /**
     * Fetches a single securityPolicy by its ID
     * @param {String} id - The securityPolicy's ID
     * @returns {Promise<Object>} - securityPolicy details
     */
    getOne: async (id) => {
      const query = graphql.queries.securityPolicies.getSecurityPolicy;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.securityPolicy;
      } catch (error) {
        logger.error(
          `[securityPolicies][getOne] Error fetching securityPolicy with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all securityPolicies by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All securityPolicies from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.securityPolicies.listSecurityPolicies;

        const allSecurityPolicies = await fetchAllPages(
          client,
          query,
          "securityPolicies",
          {
            //maxPageSize: ,
            //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
            logger,
          }
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allSecurityPolicies;
      } catch (error) {
        logger.error(
          "[securityPolicies][getAll] Error fetching all securityPolicies:",
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
    getQuery: () => graphql.queries.securityPolicies,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Updates role of the securityPolicy
     * @param {Object} options - Arguments to create the new securityPolicy
     * @returns {Promise<Object>} - Mutation fields
     */
    update: async (options = {}) => {
      const mutation = graphql.mutations.securityPolicies.securityPolicyUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.securityPolicyUpdate;
      } catch (error) {
        logger.error(
          "[securityPolicies][update] Error updating securityPolicy:",
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default securityPolicies;

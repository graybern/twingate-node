// src/resources/accessRequests.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const accessRequests = (client) => {
  const methods = {
    /**
     * Fetches a list of Access Requests
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of access requests
     */
    get: async (options = {}) => {
      const query = graphql.queries.accessRequests.listAccessRequests;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.accessRequests;
      } catch (error) {
        logger.error(
          "[accessRequests][get] Error fetching accessRequests:",
          error
        );
        throw error;
      }
    },
    /**
     * Fetches a single Access Request by its ID
     * @param {String} id - The User's ID
     * @returns {Promise<Object>} - User details
     */
    getOne: async (id) => {
      const query = graphql.queries.accessRequests.getAccessRequest;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.accessRequest;
      } catch (error) {
        logger.error(
          `[accessRequests][getOne] Error fetching accessRequest with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all Access Requests by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All access requests from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.accessRequests.listAccessRequests;

        const allAccessRequests = await fetchAllPages(
          client,
          query,
          "accessRequests",
          {
            //maxPageSize: ,
            //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
            logger,
          }
        );

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allAccessRequests;
      } catch (error) {
        logger.error(
          "[accessRequests][getAll] Error fetching all accessRequests:",
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
    getQuery: () => graphql.queries.accessRequests,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Approves an Access Request
     * @param {String} id - The Access Request's ID
     * @returns {Promise<{ ok: Boolean, entities: Object, error: String }>} - Mutation response
     */
    approve: async (id) => {
      const mutation = graphql.mutations.accessRequests.accessRequestApprove;
      const logger = client.logger || console;

      try {
        //logger.info(`Approving access request with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.accessRequestApprove;
      } catch (error) {
        logger.error(
          `[accessRequests][approve] Error approving access request with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Rejects an Access Request
     * @param {String} id - The Access Request's ID
     * @returns {Promise<{ ok: Boolean, entities: Object, error: String }>} - Mutation response
     */
    reject: async (id) => {
      const mutation = graphql.mutations.accessRequests.accessRequestReject;
      const logger = client.logger || console;

      try {
        //logger.info(`Rejecting access request with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.accessRequestReject;
      } catch (error) {
        logger.error(
          `[accessRequests][reject] Error rejecting access request with ID ${id}:`,
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default accessRequests;

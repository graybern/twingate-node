// src/resources/groups.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const groups = (client) => {
  const methods = {
    /**
     * Fetches a list of groups
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of groups
     */
    get: async (options = {}) => {
      const query = graphql.queries.groups.listGroups;
      const logger = client.logger || console;

      //console.log(query);

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.groups;
      } catch (error) {
        logger.error("[groups][get] Error fetching groups:", error);
        throw error;
      }
    },
    /**
     * Fetches a single group by its ID
     * @param {String} id - The group's ID
     * @returns {Promise<Object>} - group details
     */
    getOne: async (id) => {
      const query = graphql.queries.groups.getGroup;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.group;
      } catch (error) {
        logger.error(
          `[groups][getOne] Error fetching group with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all groups by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All groups from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.groups.listGroups;

        const allgroups = await fetchAllPages(client, query, "groups", {
          //maxPageSize: ,
          //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
          logger,
        });

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allgroups;
      } catch (error) {
        logger.error("[groups][getAll] Error fetching all groups:", error);
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
    getQuery: () => graphql.queries.groups,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new group
     * @param {Object} args - Arguments to create the new group
     * @returns {Promise<Object>} - Mutation fields
     */
    create: async (options = {}) => {
      const mutation = graphql.mutations.groups.groupCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.groupCreate;
      } catch (error) {
        logger.error("[groups][create] Error creating group:", error);
        throw error;
      }
    },

    /**
     * Deletes a single group by its ID
     * @param {String} id - The group's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      const mutation = graphql.mutations.groups.groupDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.groupDelete;
      } catch (error) {
        logger.error(
          `[groups][delete] Error deleting group with ID ${id}:`,
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
      const mutation = graphql.mutations.groups.groupUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.groupUpdate;
      } catch (error) {
        logger.error("[groups][update] Error updating group:", error);
        throw error;
      }
    },
  };

  return methods;
};

export default groups;

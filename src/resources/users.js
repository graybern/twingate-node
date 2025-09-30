// src/resources/queries/users.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const users = (client) => {
  const methods = {
    /**
     * Fetches a list of Users
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of users
     */
    get: async (options = {}) => {
      const query = graphql.queries.users.listUsers;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.users;
      } catch (error) {
        logger.error("[users][get] Error fetching users:", error);
        throw error;
      }
    },
    /**
     * Fetches a single User by its ID
     * @param {String} id - The User's ID
     * @returns {Promise<Object>} - User details
     */
    getOne: async (id) => {
      const query = graphql.queries.users.getUser;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.user;
      } catch (error) {
        logger.error(
          `[users][getOne] Error fetching user with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all Users by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All users from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.users.listUsers;

        const allUsers = await fetchAllPages(client, query, "users", {
          //maxPageSize: ,
          //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
          logger,
        });

        //logger.info(`Fetched ${allUsers.length} users.`);
        return allUsers;
      } catch (error) {
        logger.error("[users][getAll] Error fetching all users:", error);
        throw error;
      }
    },

    /**
     * Return the fragment GQL string
     * @returns {String} - GQL fragment string
     */
    getFragment: () => graphql.fragments.USER_QUERY_FRAGMENT,

    /**
     * Return the full query GQL string with fragment included
     * @returns {String} - GQL query string
     */
    getQuery: () => graphql.queries.users,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new User
     * @param {Object} args - Arguments to create the new user
     * @returns {Promise<Object>} - Mutation fields
     */
    create: async (options = {}) => {
      const mutation = graphql.mutations.users.userCreate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.userCreate;
      } catch (error) {
        logger.error("[users][create] Error creating user:", error);
        throw error;
      }
    },

    /**
     * Deletes a single User by its ID
     * @param {String} id - The User's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    delete: async (id) => {
      const mutation = graphql.mutations.users.userDelete;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.userDelete;
      } catch (error) {
        logger.error(
          `[users][delete] Error deleting user with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates details of the User
     * @param {Object} options - Arguments to create the new user
     * @returns {Promise<Object>} - Mutation result
     */
    detailsUpdate: async (options = {}) => {
      const mutation = graphql.mutations.users.userDetailsUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Updating user details:", options);
        const response = await client.request(mutation, options);
        return response.userDetailsUpdate;
      } catch (error) {
        logger.error(
          "[users][detailsUpdate] Error updating user details:",
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the User
     * @param {Object} options - Arguments to create the new user
     * @returns {Promise<Object>} - Mutation fields
     */
    roleUpdate: async (options = {}) => {
      const mutation = graphql.mutations.users.userRoleUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Updating user details:", options);
        const response = await client.request(mutation, options);
        return response.userRoleUpdate;
      } catch (error) {
        logger.error("[users][roleUpdate] Error updating user role:", error);
        throw error;
      }
    },

    /**
     * Resets MFA of the User
     * @param {Object} id - The User's ID to reset MFA
     * @returns {Promise<Object>} - Mutation fields
     */
    resetMfa: async (id) => {
      const mutation = graphql.mutations.users.userResetMfa;
      const logger = client.logger || console;

      try {
        //logger.info(`Resetting MFA for user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.userResetMfa;
      } catch (error) {
        logger.error(
          `[users][resetMfa] Error resetting MFA for user with ID ${id}:`,
          error
        );
        throw error;
      }
    },
  };

  return methods;
};

export default users;

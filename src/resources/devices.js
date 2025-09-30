// src/resources/devices.js

import graphql from "../graphql/_index.js";
import { gql } from "graphql-request";
import { fetchAllPages } from "../utils/fetchAllPages.js";

const devices = (client) => {
  const methods = {
    /**
     * Fetches a list of devices
     * @param {Object} args - Arguments for pagination (before, after, first, last, filter)
     * @returns {Promise<Array>} - List of devices
     */
    get: async (options = {}) => {
      const query = graphql.queries.devices.listDevices;
      const logger = client.logger || console;

      try {
        //logger.info("Fetching users with pagination options:", options);
        const response = await client.request(query, options);
        //return response.users.edges.map((edge) => edge.node);
        return response.devices;
      } catch (error) {
        logger.error("[devices][get] Error fetching devices:", error);
        throw error;
      }
    },
    /**
     * Fetches a single device by its ID
     * @param {String} id - The device's ID
     * @returns {Promise<Object>} - device details
     */
    getOne: async (id) => {
      const query = graphql.queries.devices.getDevice;
      const logger = client.logger || console;

      try {
        //logger.info(`Fetching user with ID: ${id}`);
        const response = await client.request(query, { id });
        return response.device;
      } catch (error) {
        logger.error(
          `[devices][getOne] Error fetching device with ID ${id}:`,
          error
        );
        throw error;
      }
    },
    /**
     * Fetch all devices by automatically paginating through results **(WARNING - Use with caution)**
     * @param {Object} options - Pagination and query options
     * @returns {Promise<Array>} - All devices from paginated results
     */
    getAll: async () => {
      const logger = client.logger || console;

      try {
        //logger.info("Fetching all users...");
        const query = graphql.queries.devices.listDevices;

        const alldevices = await fetchAllPages(client, query, "devices", {
          //maxPageSize: ,
          //readRateLimitPerMinute: client.options.readRateLimitPerMinute,
          logger,
        });

        //logger.info(`Fetched ${allUsers.length} users.`);
        return alldevices;
      } catch (error) {
        logger.error("[devices][getAll] Error fetching all devices:", error);
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
    getQuery: () => graphql.queries.devices,

    /**
     * Dynamically generate the list of available methods
     * @returns {Array} - List of available method names
     */
    getAvailableMethods: () => Object.keys(methods),

    /**
     * Creates a new device
     * @param {Object} args - Arguments to create the new device
     * @returns {Promise<Object>} - Mutation fields
     */
    archive: async (id) => {
      const mutation = graphql.mutations.devices.deviceArchive;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.deviceArchive;
      } catch (error) {
        logger.error(
          `[devices][archive] Error archiving device with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Deletes a single device by its ID
     * @param {String} id - The device's ID to delete
     * @returns {Promise<Object>} - Mutation fields
     */
    block: async (id) => {
      const mutation = graphql.mutations.devices.deviceBlock;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.deviceBlock;
      } catch (error) {
        logger.error(
          `[devices][block] Error blocking device with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates details of the device
     * @param {Object} options - Arguments to create the new device
     * @returns {Promise<Object>} - Mutation result
     */
    unarchive: async (id) => {
      const mutation = graphql.mutations.devices.deviceUnarchive;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.deviceUnarchive;
      } catch (error) {
        logger.error(
          `[devices][unarchive] Error unarchive device with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the device
     * @param {Object} options - Arguments to create the new device
     * @returns {Promise<Object>} - Mutation fields
     */
    unblock: async (id) => {
      const mutation = graphql.mutations.devices.deviceUnblock;
      const logger = client.logger || console;

      try {
        //logger.info(`Deleting user with ID: ${id}`);
        const response = await client.request(mutation, { id });
        return response.deviceUnblock;
      } catch (error) {
        logger.error(
          `[devices][unblock] Error unblock device with ID ${id}:`,
          error
        );
        throw error;
      }
    },

    /**
     * Updates role of the device
     * @param {Object} options - Arguments to create the new device
     * @returns {Promise<Object>} - Mutation fields
     */
    update: async (options = {}) => {
      const mutation = graphql.mutations.devices.deviceUpdate;
      const logger = client.logger || console;

      try {
        //logger.info("Creating a new user:", options);
        //logger.info("Using mutation:", mutation); // Log mutation
        const response = await client.request(mutation, options);
        return response.deviceUpdate;
      } catch (error) {
        logger.error("[devices][update] Error updating device:", error);
        throw error;
      }
    },
  };

  return methods;
};

export default devices;

// examples/testAccessRequests.js

// Import the twingate node.js helper
import twingate from "../src/client.js";

// Import dotenv
import dotenv from "dotenv"; // Import and configure dotenv
dotenv.config(); // Load the variables from the .env file

// Access the environment variables
const tenantName = process.env.TWINGATE_API_TENANT;
const apiKey = process.env.TWINGATE_API_KEY;
const timeout = parseInt(process.env.TWINGATE_API_TIMEOUT, 10) || 5000;

// Twingate client
const client = twingate(
  tenantName,
  apiKey //{
  //maxPageSize: 25, // Overrides default of 50
  //retries: 5, // Overrides default of 3
  //customOption: true, // Adds a new option
  //}
);

// get()
/*
client.resources
  .get({ first: 5 })
  .then((resources) => {
    console.log(
      "resources.get(): ",
      resources.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.resources
  .getOne("UmVzb3VyY2U6MjM3ODUwMg==")
  .then((resources) => {
    console.log("resources.getOne(): ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// getAll()
client.resources
  .getAll()
  .then((resources) => {
    console.log("resources.getAll(): ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
/*
// accessAdd()
const resourceAccessAddOptions = {
  resourceId: "UmVzb3VyY2U6MjQxMTk0Mg==",
  access: [
    {
      principalId: "R3JvdXA6MTg0ODU2",
      expiresAt: "2025-02-15T17:26:21.578557+00:00",
      securityPolicyId: "U2VjdXJpdHlQb2xpY3k6MjE0MjAx",
      usageBasedAutolockDurationDays: 5,
    },
  ],
};
client.resources
  .accessAdd(resourceAccessAddOptions)
  .then((resources) => {
    console.log("resources.accessAdd(): ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// accessRemove()
const resourceAccessRemoveOptions = {
  resourceId: "UmVzb3VyY2U6MjQxMTk0Mg==",
  principalIds: ["R3JvdXA6MTg0ODU2"],
};
client.resources
  .accessRemove(resourceAccessRemoveOptions)
  .then((resources) => {
    console.log("resources.accessRemove: ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// accessSet() => overrides all existing access (CAREFUL)
const resourceAccessSetOptions = {
  resourceId: "UmVzb3VyY2U6MjQxMTk0Mg==",
  access: [
    {
      principalId: "R3JvdXA6MTg0ODU2",
      expiresAt: "2025-02-15T17:26:21.578557+00:00",
      securityPolicyId: "U2VjdXJpdHlQb2xpY3k6MjE0MjAx",
      usageBasedAutolockDurationDays: 5,
    },
  ],
};
client.resources
  .accessSet(resourceAccessSetOptions)
  .then((resources) => {
    console.log("resources.accessSet: ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// create()
const resourceCreateOptions = {
  address: "bluebeartest.int",
  alias: "alias.int",
  groupIds: ["R3JvdXA6MTg0ODU2"],
  isBrowserShortcutEnabled: false,
  isVisible: true,
  name: "Blue Bear Test",
  protocols: {
    allowIcmp: true,
    tcp: {
      policy: "RESTRICTED",
      ports: [
        {
          start: 22,
          end: 22,
        },
        {
          start: 4000,
          end: 41000,
        },
      ],
    },
    udp: {
      policy: "ALLOW_ALL",
    },
  },
  remoteNetworkId: "UmVtb3RlTmV0d29yazo2OTQ0Mw==",
  securityPolicyId: "U2VjdXJpdHlQb2xpY3k6MjE0MjAx",
  usageBasedAutolockDurationDays: 5,
};
client.resources
  .create(resourceCreateOptions)
  .then((resources) => {
    console.log("resources.create: ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// delete()
client.resources
  .delete("UmVzb3VyY2U6MjcyOTg5MQ==")
  .then((resources) => {
    console.log("resources.delete: ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// update()
const resourceUpdateOptions = {
  //addedGroupIds: [""],           // Adds groups to existing group mappings
  address: "test2.int",
  alias: "testalias.int",
  groupIds: ["R3JvdXA6MTYwMTcy"], // Overrides existing group mappings (CAREFUL)
  id: "UmVzb3VyY2U6MjQxMTk0Mg==",
  isActive: true,
  isBrowserShortcutEnabled: false,
  isVisible: true,
  name: "test3resource",
  protocols: {
    allowIcmp: false,
    tcp: {
      policy: "RESTRICTED",
      ports: [{ start: 3000, end: 3100 }],
    },
    udp: {
      policy: "RESTRICTED",
      ports: [{ start: 53, end: 53 }],
    },
  },
  remoteNetworkId: "UmVtb3RlTmV0d29yazo2OTQ0Mw==",
  //removedGroupIds: [""],        // Removes groups from existing group mappings
  securityPolicyId: "U2VjdXJpdHlQb2xpY3k6MjE0MjAx",
  usageBasedAutolockDurationDays: 5,
};
client.resources
  .update(resourceUpdateOptions)
  .then((resources) => {
    console.log("resources.update: ", resources);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/

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
/*
// get()
client.groups
  .get({ first: 5 })
  .then((groups) => {
    console.log(
      "groups.get(): ",
      groups.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.groups
  .getOne("R3JvdXA6MTY2Njg4")
  .then((groups) => {
    console.log("groups.getOne(): ", groups);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.groups
  .getAll()
  .then((groups) => {
    console.log("groups.getAll(): ", groups);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// create()
const createGroupOptions = {
  name: "createGroupTest",
  resourceIds: [],
  securityPolicyId: "",
  userIds: [],
};
client.groups
  .create(createGroupOptions)
  .then((groups) => {
    console.log("groups.create(): ", groups);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// update()
const updateGroupOptions = {
  id: "R3JvdXA6MzE2NzU2",
  isActive: false,
};
client.groups
  .update(updateGroupOptions)
  .then((groups) => {
    console.log("groups.update(): ", groups);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

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
client.securityPolicies
  .get({ first: 5 })
  .then((securityPolicies) => {
    console.log(
      "securityPolicies.get(): ",
      securityPolicies.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
/*
// getOne()
client.securityPolicies
  .getOne("RGV2aWNlOjE0NzE1NzM=")
  .then((securityPolicies) => {
    console.log("securityPolicies.getOne(): ", securityPolicies);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.securityPolicies
  .getAll()
  .then((securityPolicies) => {
    console.log("securityPolicies.getAll(): ", securityPolicies);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// update()
const securityPolicyUpdateOptions = {
  id: "RGV2aWNlOjE1NTA3OTg=", // id of securityPolicy
  addedGroupIds: [""], // adds groups to existing
  groupIds: [""], // overrides existing groups 
  removedGroupIds: [""], // remove groups from existing
};
client.securityPolicies
  .update(securityPolicyUpdateOptions)
  .then((securityPolicies) => {
    console.log("securityPolicies.update: ", securityPolicies);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/

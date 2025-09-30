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
client.serviceAccounts
  .get({ first: 5 })
  .then((serviceAccounts) => {
    console.log(
      "serviceAccounts.get(): ",
      serviceAccounts.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.serviceAccounts
  .getOne("RGV2aWNlOjE0NzE1NzM=")
  .then((serviceAccounts) => {
    console.log("serviceAccounts.getOne(): ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.serviceAccounts
  .getAll()
  .then((serviceAccounts) => {
    console.log("serviceAccounts.getAll(): ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// archive()
client.serviceAccounts
  .archive("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccounts) => {
    console.log("serviceAccounts.archive(): ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// block()
client.serviceAccounts
  .block("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccounts) => {
    console.log("serviceAccounts.block: ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
// unarchive()
client.serviceAccounts
  .unarchive("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccounts) => {
    console.log("serviceAccounts.unarchive: ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// unblock()
client.serviceAccounts
  .unblock("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccounts) => {
    console.log("serviceAccounts.unblock: ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// update()
const serviceAccountUpdateOptions = {
  id: "RGV2aWNlOjE1NTA3OTg=",
  isTrusted: true,
};
client.serviceAccounts
  .update(serviceAccountUpdateOptions)
  .then((serviceAccounts) => {
    console.log("serviceAccounts.update: ", serviceAccounts);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

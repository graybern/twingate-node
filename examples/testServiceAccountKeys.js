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
client.serviceAccountKeys
  .get({ first: 5 })
  .then((serviceAccountKeys) => {
    console.log(
      "serviceAccountKeys.get(): ",
      serviceAccountKeys.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.serviceAccountKeys
  .getOne("RGV2aWNlOjE0NzE1NzM=")
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.getOne(): ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.serviceAccountKeys
  .getAll()
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.getAll(): ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// archive()
client.serviceAccountKeys
  .archive("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.archive(): ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// block()
client.serviceAccountKeys
  .block("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.block: ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
// unarchive()
client.serviceAccountKeys
  .unarchive("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.unarchive: ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// unblock()
client.serviceAccountKeys
  .unblock("RGV2aWNlOjE1NTA3OTg=")
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.unblock: ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// update()
const serviceAccountKeyUpdateOptions = {
  id: "RGV2aWNlOjE1NTA3OTg=",
  isTrusted: true,
};
client.serviceAccountKeys
  .update(serviceAccountKeyUpdateOptions)
  .then((serviceAccountKeys) => {
    console.log("serviceAccountKeys.update: ", serviceAccountKeys);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

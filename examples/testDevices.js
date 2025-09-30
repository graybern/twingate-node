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
client.devices
  .get({ first: 5 })
  .then((devices) => {
    console.log(
      "devices.get(): ",
      devices.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.devices
  .getOne("RGV2aWNlOjE0NzE1NzM=")
  .then((devices) => {
    console.log("devices.getOne(): ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.devices
  .getAll()
  .then((devices) => {
    console.log("devices.getAll(): ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// archive()
client.devices
  .archive("RGV2aWNlOjE1NTA3OTg=")
  .then((devices) => {
    console.log("devices.archive(): ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// block()
client.devices
  .block("RGV2aWNlOjE1NTA3OTg=")
  .then((devices) => {
    console.log("devices.block: ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// unarchive()
client.devices
  .unarchive("RGV2aWNlOjE1NTA3OTg=")
  .then((devices) => {
    console.log("devices.unarchive: ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// unblock()
client.devices
  .unblock("RGV2aWNlOjE1NTA3OTg=")
  .then((devices) => {
    console.log("devices.unblock: ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// update()
const deviceUpdateOptions = {
  id: "RGV2aWNlOjE1NTA3OTg=",
  isTrusted: true,
};
client.devices
  .update(deviceUpdateOptions)
  .then((devices) => {
    console.log("devices.update: ", devices);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/

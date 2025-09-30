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
client.accessRequests
  .get({ first: 5 })
  .then((accessRequests) => {
    console.log(
      "accessRequests.get(): ",
      accessRequests.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.accessRequests
  .getOne("QWNjZXNzUmVxdWVzdDoyMjc3")
  .then((accessRequests) => {
    console.log("accessRequests.getOne(): ", accessRequests);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.accessRequests
  .getAll()
  .then((accessRequests) => {
    console.log("accessRequests.getAll(): ", accessRequests);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// approve()
client.accessRequests
  .approve("QWNjZXNzUmVxdWVzdDoyMjc3")
  .then((accessRequests) => {
    console.log("accessRequests.approve: ", accessRequests);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// reject()
client.accessRequests
  .reject("QWNjZXNzUmVxdWVzdDoyMjc3")
  .then((accessRequests) => {
    console.log("accessRequests.reject: ", accessRequests);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

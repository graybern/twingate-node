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
client.serialNumbers
  .get({ first: 5 })
  .then((serialNumbers) => {
    console.log(
      "serialNumbers.get(): ",
      serialNumbers.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.serialNumbers
  .getOne("RGV2aWNlOjE0NzE1NzM=")
  .then((serialNumbers) => {
    console.log("serialNumbers.getOne(): ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.serialNumbers
  .getAll()
  .then((serialNumbers) => {
    console.log("serialNumbers.getAll(): ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// archive()
client.serialNumbers
  .archive("RGV2aWNlOjE1NTA3OTg=")
  .then((serialNumbers) => {
    console.log("serialNumbers.archive(): ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// block()
client.serialNumbers
  .block("RGV2aWNlOjE1NTA3OTg=")
  .then((serialNumbers) => {
    console.log("serialNumbers.block: ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
// unarchive()
client.serialNumbers
  .unarchive("RGV2aWNlOjE1NTA3OTg=")
  .then((serialNumbers) => {
    console.log("serialNumbers.unarchive: ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// unblock()
client.serialNumbers
  .unblock("RGV2aWNlOjE1NTA3OTg=")
  .then((serialNumbers) => {
    console.log("serialNumbers.unblock: ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// update()
const serialNumberUpdateOptions = {
  id: "RGV2aWNlOjE1NTA3OTg=",
  isTrusted: true,
};
client.serialNumbers
  .update(serialNumberUpdateOptions)
  .then((serialNumbers) => {
    console.log("serialNumbers.update: ", serialNumbers);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

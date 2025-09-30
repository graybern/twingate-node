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
client.connectors
  .get({ first: 5 })
  .then((connectors) => {
    console.log(
      "connectors.get(): ",
      connectors.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.connectors
  .getOne("Q29ubmVjdG9yOjE2NDc3Ng==")
  .then((connectors) => {
    console.log("connectors.getOne(): ", connectors);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.connectors
  .getAll()
  .then((connectors) => {
    console.log("connectors.getAll(): ", connectors);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/

// create()
const connectorCreateOptions = {
  remoteNetworkId: "UmVtb3RlTmV0d29yazo5MDQwNw==",
  name: "yello-sharktank",
  hasStatusNotificationsEnabled: true,
};
client.connectors
  .create(connectorCreateOptions)
  .then((connectors) => {
    console.log("connectors.create: ", connectors);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
/*
// delete()
client.connectors
  .delete("Q29ubmVjdG9yOjQzMTE2Ng==")
  .then((connectors) => {
    console.log("connectors.delete: ", connectors);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// generateTokens()
client.connectors
  .generateTokens("Q29ubmVjdG9yOjQzMTE2Nw==")
  .then((connectors) => {
    console.log("connectors.generateTokens: ", connectors);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
  */

// update()
const connectorUpdateOptions = {
  id: "Q29ubmVjdG9yOjQzMTE2Nw==",
  hasStatusNotificationsEnabled: true,
  name: "test2!",
};
client.connectors
  .update(connectorUpdateOptions)
  .then((connectors) => {
    console.log("connectors.update: ", connectors);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

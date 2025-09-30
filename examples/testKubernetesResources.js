// TODO:
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
client.remoteNetworks
  .get({ first: 5 })
  .then((remoteNetworks) => {
    console.log(
      "remoteNetworks.get(): ",
      remoteNetworks.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.remoteNetworks
  .getOne("UmVtb3RlTmV0d29yazo2OTQ0Mw==")
  .then((remoteNetworks) => {
    console.log("remoteNetworks.getOne(): ", remoteNetworks);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.remoteNetworks
  .getAll()
  .then((remoteNetworks) => {
    console.log("remoteNetworks.getAll(): ", remoteNetworks);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// create()
const createRemoteNetworkOptions = {
  isActive: true,
  location: "GOOGLE_CLOUD",
  name: "TestingNetwork",
  networkType: "REGULAR",
};
client.remoteNetworks
  .create(createRemoteNetworkOptions)
  .then((remoteNetworks) => {
    console.log("remoteNetworks.create(): ", remoteNetworks);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// update()
const updateRemoteNetworkOptions = {
  isActive: true,
  location: "GOOGLE_CLOUD",
  name: "TestingNetwork2",
  id: "UmVtb3RlTmV0d29yazoxNjgwNzk=",
};
client.remoteNetworks
  .update(updateRemoteNetworkOptions)
  .then((remoteNetworks) => {
    console.log("remoteNetworks.update(): ", remoteNetworks);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// delete()
client.remoteNetworks
  .delete("UmVtb3RlTmV0d29yazoxNjgwNzk=")
  .then((remoteNetworks) => {
    console.log("remoteNetworks.delete(): ", remoteNetworks);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

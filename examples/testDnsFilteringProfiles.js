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
client.dnsFilteringProfiles
  .get()
  .then((dnsFilteringProfiles) => {
    console.log(
      "dnsFilteringProfiles.get(): ",
      dnsFilteringProfiles.map((profiles) => profiles)
      //dnsFilteringProfiles.edges.map((edge) => edge.node)
    );
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.dnsFilteringProfiles
  .getOne("RG5zRmlsdGVyaW5nUHJvZmlsZTphYWU3MzllMzZi")
  .then((dnsFilteringProfiles) => {
    console.log("dnsFilteringProfiles.getOne(): ", dnsFilteringProfiles);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.dnsFilteringProfiles
  .getAll()
  .then((dnsFilteringProfiles) => {
    console.log("dnsFilteringProfiles.getAll(): ", dnsFilteringProfiles);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// create()
const createDnsFilteringProfilesOptions = {
  name: "Testing1",
};
client.dnsFilteringProfiles
  .create("testng1")
  .then((dnsFilteringProfiles) => {
    console.log("dnsFilteringProfiles.create(): ", dnsFilteringProfiles);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// delete()
client.dnsFilteringProfiles
  .delete("RG5zRmlsdGVyaW5nUHJvZmlsZTpiMjFlOTkzYjMy")
  .then((dnsFilteringProfiles) => {
    console.log("dnsFilteringProfiles.delete: ", dnsFilteringProfiles);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
*/
// update()
const dnsFilteringProfileUpdateOptions = {
  id: "RG5zRmlsdGVyaW5nUHJvZmlsZTo2YjllOTkyOTQy",
  allowedDomains: ["lego.com"],
  deniedDomains: ["facebook.com"],
  groups: ["R3JvdXA6MjQ5NDk5"],
  // contentCategoryConfig,
  // fallbackMethod,
  // name,
  // priority,
  // privacyCategoryConfig,
  // securityCategoryConfig
};
client.dnsFilteringProfiles
  .update(dnsFilteringProfileUpdateOptions)
  .then((dnsFilteringProfiles) => {
    console.log("dnsFilteringProfiles.update: ", dnsFilteringProfiles);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// examples/listUsers.js

// Import the twingate node.js helper
import twingate from "../src/client.js";

// Import dotenv
import dotenv from "dotenv"; // Import and configure dotenv
dotenv.config(); // Load the variables from the .env file

// Access the environment variables
const tenantName = process.env.TWINGATE_API_TENANT;
const apiKey = process.env.TWINGATE_API_KEY;
const timeout = parseInt(process.env.TWINGATE_API_TIMEOUT, 10) || 5000;

// Example usage
//console.log("Tenant Name:", tenantName);
//console.log("API Key:", apiKey);
//console.log("Timeout:", timeout);

//
//
//
//
//
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
client.users
  .get({ first: 5 })
  .then((users) => {
    console.log("users.get(): ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getOne()
client.users
  .getOne("VXNlcjo1NjQ3NzM=")
  .then((users) => {
    console.log("users.getOne(): ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getAll()
client.users
  .getAll()
  .then((users) => {
    console.log("users.getAll(): ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// delete()
client.users
  .delete("VXNlcjo3MzYzNTQ=")
  .then((users) => {
    console.log("users.delete: ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// getFragment()
console.log("users.getFragment:", client.users.getFragment());

// getQuery()
console.log("users.getQuery:", client.users.getQuery());

// getAvailableMethods()
console.log("users.getAvailableMethods:", client.users.getAvailableMethods());

// create()
const userCreateOptions = {
  email: "user7@example.com",
  shouldSendInvite: false,
};
client.users
  .create(userCreateOptions)
  .then((users) => {
    console.log("users.create: ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// delete()
client.users
  .delete("VXNlcjo3MzYzNTQ=")
  .then((users) => {
    console.log("users.delete: ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
// detailsUpdate()
const userDetailsUpdateOptions = {
  id: "VXNlcjo3MzY2NDE=",
  firstName: "Jerry",
  lastName: "Seinfeld",
  state: "DISABLED",
};
client.users
  .detailsUpdate(userDetailsUpdateOptions)
  .then((users) => {
    console.log("users.detailsUpdate: ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

// roleUpdate()
const userRoleUpdateOptions = {
  id: "VXNlcjo3MzY2NDE=",
  role: "SUPPORT",
};
client.users
  .roleUpdate(userRoleUpdateOptions)
  .then((users) => {
    console.log("users.roleUpdate: ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
// resetMfa()
client.users
  .resetMfa("VXNlcjo3MzY2NDE=")
  .then((users) => {
    console.log("users.resetMfa: ", users);
  })
  .catch((err) => {
    console.error("Error: ", err);
  });
/*
//const allUsers = await client.resources.users.getAll({
//  maxPageSize: 25, // Overrides maxPageSize
//  retries: 5, // Overrides retries
//  backoffFactor: 3, // Overrides backoffFactor
//  readRateLimitPerMinute: 30, // Overrides rate limit
//});
*/

/* Frontend Integration with Electron

Pass a custom logger that feeds logs to your Electron app’s frontend via IPC or another communication channel.

const electronLogger = {
  info: (msg) => ipcRenderer.send("log-info", msg),
  warn: (msg) => ipcRenderer.send("log-warn", msg),
  error: (msg) => ipcRenderer.send("log-error", msg),
};

const client = new TwingateClient(tenantName, apiKey, { logger: electronLogger });
*/

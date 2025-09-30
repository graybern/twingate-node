// src/client.js

//const TwingateClient = require("./TwingateClient"); // Import the class
import TwingateClient from "./TwingateClient.js";

const twingate = (tenantName, apiKey, options = {}) =>
  new TwingateClient(tenantName, apiKey, options);

export default twingate;

/*
module.exports = (tenantName, apiKey, options = {}) => {
  if (!tenantName) {
    throw new Error("Tenant name is required to initialize TwingateClient.");
  }
  if (!apiKey) {
    throw new Error("API key is required to initialize TwingateClient.");
  }

  // You can extend this to handle more custom initialization logic.
  return new TwingateClient(tenantName, apiKey, options); // Return a new instance
};
*/

// Alternatively - if you want to keep the old constructor-style
// usage (new TwingateClient()), you can export both the class and
// the factory function

//const factory = (apiKey, options = {}) => {
//  if (!apiKey)
//    throw new Error("API key is required to initialize TwingateClient.");
//  return new TwingateClient(apiKey, options);
//};

//module.exports = factory;
//module.exports.TwingateClient = TwingateClient;

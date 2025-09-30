// src/resources/index.js

import accessRequests from "./accessRequests.js";
import connectors from "./connectors.js";
import devices from "./devices.js";
import dnsFilteringProfiles from "./dnsFilteringProfiles.js";
import groups from "./groups.js";
import kubernetesResources from "./kubernetesResources.js";
import remoteNetworks from "./remoteNetworks.js";
import resources from "./resources.js";
import securityPolicies from "./securityPolicies.js";
import serialNumbers from "./serialNumbers.js";
import serviceAccountKeys from "./serviceAccountKeys.js";
import serviceAccounts from "./serviceAccounts.js";
import users from "./users.js";

export default {
  accessRequests,
  connectors,
  devices,
  dnsFilteringProfiles,
  groups,
  kubernetesResources,
  remoteNetworks,
  resources,
  securityPolicies,
  serialNumbers,
  serviceAccountKeys,
  serviceAccounts,
  users,
};

/*

resource.get()                  = Fetch paginated data
resource.getOne()               = Fetch a single record by ID or key
resource.getAll()               = Fetch all results without pagination

resource.create()               = Create Resource	Create a resource
resource.update()               = Update Resource	Update a resource
resource.delete()               = Delete Resource	Delete a resource


resource.getFragment()          = Return the GraphQL fragment as a string
resource.getQuery()             = Return the full GraphQL query as a string
resource.getAvailableMethods()  = Return a list of available methods for the resource


resource.list() => fetch paginated results
resource.get() => fetch single result
resource.getById()
resource.getAll() => Fetch all results (non-paginated)
resource.getFragment() => Return GQL fragment string
resource.getQuery() => Return full GQL query string
resource.getAvailableMethods() => Return available methods for this resource

client.schema() => provide introspection for all resources, queries, mutations, and fragments


// Example access
console.log(client.users.queryFragment());
console.log(client.users.queryFull());
console.log(client.graphql.schema);

// Output example:
{
  queries: { users: ['list', 'get'], groups: ['list', 'get']},
  mutations: { users: ['create', 'update'], groups: ['add', 'remove']},
  fragments: ['UserFields', 'GroupFields']
}
// Dynamically call a query or mutation
const queryName = "list";
client.graphql.queries.users[queryName];














*/

//

//

//

//
// src/resources/queries/index.js
//const users = require("./users");
//import users from "./users.js";

/*export default function loadQueryResources(client) {
  // Dynamically add resources to the client
  client.users = users(client);
}*/

//export default (clientInstance) => {
// Attach resource modules
//  clientInstance.users = users(clientInstance.client);

// Add other resources here as needed, e.g.:
// clientInstance.serviceAccounts = require('./serviceAccounts')(clientInstance.client);
//};

/*export const loadQueryResources = (client) => ({
  users: {
    list: async ({ first = 10 }) => {
      const USERS_QUERY = `
        query ListUsers($first: Int!) {
          users(first: $first) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `;
      const data = await client.request(USERS_QUERY, { first });
      return data.users.edges;
    },
  },
});*/

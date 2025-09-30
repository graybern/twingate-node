import { GraphQLClient } from "graphql-request";

// Utility function for making GraphQL requests
const fetchGraphQL = async ({ query, variables, apiKey }) => {
  const client = new GraphQLClient("https://api.twingate.com/graphql", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  try {
    const data = await client.request(query, variables);
    return data; // Return the response
  } catch (error) {
    console.error("GraphQL Request Failed:", error);
    throw new Error("Failed to fetch data from Twingate");
  }
};

module.exports = fetchGraphQL;

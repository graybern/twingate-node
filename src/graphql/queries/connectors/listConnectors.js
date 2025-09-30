import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getConnectors = gql`
  query GetConnectors(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: ConnectorFilterInput
  ) {
    connectors(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...ConnectorFields
        }
      }
      totalCount
    }
  }
  ${fragments.CONNECTOR_QUERY_FRAGMENT}
`;

export default getConnectors;

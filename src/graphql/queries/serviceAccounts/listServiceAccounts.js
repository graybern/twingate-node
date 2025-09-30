import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listServiceAccounts = gql`
  query ListServiceAccounts(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: ServiceAccountFilterInput
  ) {
    serviceAccounts(
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
          ...ServiceAccountFields
        }
      }
      totalCount
    }
  }
  ${fragments.SERVICE_ACCOUNT_QUERY_FRAGMENT}
`;

export default listServiceAccounts;

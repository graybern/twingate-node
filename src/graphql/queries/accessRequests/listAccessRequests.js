import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listAccessRequests = gql`
  query ListAccessRequests(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: AccessRequestFilterInput
  ) {
    accessRequests(
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
          ...AccessRequestFields
        }
      }
      totalCount
    }
  }
  ${fragments.ACCESS_REQUEST_QUERY_FRAGMENT}
`;

export default listAccessRequests;

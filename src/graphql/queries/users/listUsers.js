import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listUsers = gql`
  query ListUsers(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: UserFilterInput
  ) {
    users(
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
          ...UserFields
        }
      }
      totalCount
    }
  }
  ${fragments.USER_QUERY_FRAGMENT}
`;

export default listUsers;

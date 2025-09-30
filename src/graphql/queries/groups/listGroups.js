import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listGroups = gql`
  query ListGroups(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: GroupFilterInput
  ) {
    groups(
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
          ...GroupFields
        }
      }
      totalCount
    }
  }
  ${fragments.GROUP_QUERY_FRAGMENT}
`;

export default listGroups;

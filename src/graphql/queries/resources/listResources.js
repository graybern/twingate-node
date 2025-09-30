import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listResources = gql`
  query ListResources(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: ResourceFilterInput
  ) {
    resources(
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
          ...ResourceFields
        }
      }
      totalCount
    }
  }
  ${fragments.RESOURCE_QUERY_FRAGMENT}
`;

export default listResources;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listSerialNumbers = gql`
  query ListSerialNumbers(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: SerialNumberFilterInput
  ) {
    serialNumbers(
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
          ...SerialNumberFields
        }
      }
      totalCount
    }
  }
  ${fragments.SERIAL_NUMBER_QUERY_FRAGMENT}
`;

export default listSerialNumbers;

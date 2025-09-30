import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listDevices = gql`
  query ListDevices(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: DeviceFilterInput
  ) {
    devices(
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
          ...DeviceFields
        }
      }
      totalCount
    }
  }
  ${fragments.DEVICE_QUERY_FRAGMENT}
`;

export default listDevices;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listRemoteNetworks = gql`
  query ListRemoteNetworks(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: RemoteNetworkFilterInput
  ) {
    remoteNetworks(
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
          ...RemoteNetworkFields
        }
      }
      totalCount
    }
  }
  ${fragments.REMOTE_NETWORK_QUERY_FRAGMENT}
`;

export default listRemoteNetworks;

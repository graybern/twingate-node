import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getRemoteNetwork = gql`
  query GetRemoteNetwork($id: ID!, $name: String) {
    remoteNetwork(id: $id, name: $name) {
      ...RemoteNetworkFields
    }
  }
  ${fragments.REMOTE_NETWORK_QUERY_FRAGMENT}
`;

export default getRemoteNetwork;

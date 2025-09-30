import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const remoteNetworkDelete = gql`
  mutation RemoteNetworkDelete($id: ID!) {
    remoteNetworkDelete(id: $id) {
      ...RemoteNetworkDeleteFields
    }
  }
  ${fragments.REMOTE_NETWORK_DELETE_MUTATION_FRAGMENT}
`;

export default remoteNetworkDelete;

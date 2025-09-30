import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const remoteNetworkUpdate = gql`
  mutation RemoteNetworkUpdate(
    $id: ID!
    $isActive: Boolean
    $location: RemoteNetworkLocation
    $name: String
  ) {
    remoteNetworkUpdate(
      id: $id
      isActive: $isActive
      location: $location
      name: $name
    ) {
      ...RemoteNetworkUpdateFields
    }
  }
  ${fragments.REMOTE_NETWORK_UPDATE_MUTATION_FRAGMENT}
`;

export default remoteNetworkUpdate;

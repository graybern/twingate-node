import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const remoteNetworkCreate = gql`
  mutation RemoteNetworkCreate(
    $isActive: Boolean
    $location: RemoteNetworkLocation
    $name: String!
    $networkType: RemoteNetworkType
  ) {
    remoteNetworkCreate(
      isActive: $isActive
      location: $location
      name: $name
      networkType: $networkType
    ) {
      ...RemoteNetworkCreateFields
    }
  }
  ${fragments.REMOTE_NETWORK_CREATE_MUTATION_FRAGMENT}
`;

export default remoteNetworkCreate;

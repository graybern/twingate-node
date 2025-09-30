import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const resourceCreate = gql`
  mutation ResourceCreate(
    $address: String!
    $alias: String
    $groupIds: [ID]
    $isBrowserShortcutEnabled: Boolean
    $isVisible: Boolean
    $name: String!
    $protocols: ProtocolsInput
    $remoteNetworkId: ID!
    $securityPolicyId: ID
    $usageBasedAutolockDurationDays: Int
  ) {
    resourceCreate(
      address: $address
      alias: $alias
      groupIds: $groupIds
      isBrowserShortcutEnabled: $isBrowserShortcutEnabled
      isVisible: $isVisible
      name: $name
      protocols: $protocols
      remoteNetworkId: $remoteNetworkId
      securityPolicyId: $securityPolicyId
      usageBasedAutolockDurationDays: $usageBasedAutolockDurationDays
    ) {
      ...ResourceCreateFields
    }
  }
  ${fragments.RESOURCE_CREATE_MUTATION_FRAGMENT}
`;

export default resourceCreate;

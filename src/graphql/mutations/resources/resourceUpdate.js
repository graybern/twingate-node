import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const resourceUpdate = gql`
  mutation ResourceUpdate(
    $addedGroupIds: [ID]
    $address: String
    $alias: String
    $groupIds: [ID]
    $id: ID!
    $isActive: Boolean
    $isBrowserShortcutEnabled: Boolean
    $isVisible: Boolean
    $name: String
    $protocols: ProtocolsInput
    $remoteNetworkId: ID
    $securityPolicyId: ID
    $usageBasedAutolockDurationDays: Int
  ) {
    resourceUpdate(
      addedGroupIds: $addedGroupIds
      address: $address
      alias: $alias
      groupIds: $groupIds
      id: $id
      isActive: $isActive
      isBrowserShortcutEnabled: $isBrowserShortcutEnabled
      isVisible: $isVisible
      name: $name
      protocols: $protocols
      remoteNetworkId: $remoteNetworkId
      securityPolicyId: $securityPolicyId
      usageBasedAutolockDurationDays: $usageBasedAutolockDurationDays
    ) {
      ...ResourceUpdateFields
    }
  }
  ${fragments.RESOURCE_UPDATE_MUTATION_FRAGMENT}
`;

export default resourceUpdate;

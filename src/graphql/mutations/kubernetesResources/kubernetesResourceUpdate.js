import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const kubernetesResourceUpdate = gql`
  mutation KubernetesResourceUpdate(
    $addedGroupIds: [ID]
    $address: String
    $alias: String
    $approvalMode: AccessApprovalMode
    $certificateAuthorityCert: String
    $groupIds: [ID]
    $id: ID!
    $isActive: Boolean
    $isVisible: Boolean
    $name: String
    $protocols: ProtocolsInput
    $proxyAddress: String
    $remoteNetworkId: ID
    $removedGroupIds: [ID]
    $securityPolicy: ID
    $tags: [TagInput!]
    $usageBasedAutolockDurationDays: Int
  ) {
    kubernetesResourceUpdate(
      addedGroupIds: $addedGroupIds
      address: $address
      alias: $alias
      approvalMode: $approvalMode
      certificateAuthorityCert: $certificateAuthorityCert
      groupIds: $groupIds
      id: $id
      isActive: $isActive
      isVisible: $isVisible
      name: $name
      protocols: $protocols
      proxyAddress: $proxyAddress
      remoteNetworkId: $remoteNetworkId
      removedGroupIds: $removedGroupIds
      securityPolicy: $securityPolicy
      tags: $tags
      usageBasedAutolockDurationDays: $usageBasedAutolockDurationDays
    ) {
      ...KubernetesResourceUpdateFields
    }
  }
  ${fragments.KUBERNETES_RESOURCE_UPDATE_FRAGMENT}
`;

export default kubernetesResourceUpdate;

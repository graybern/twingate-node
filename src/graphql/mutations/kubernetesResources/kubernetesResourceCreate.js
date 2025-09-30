import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const kubernetesResourceCreate = gql`
  mutation KubernetesResourceCreate(
    $address: String!
    $alias: String
    $approvalMode: AccessApprovalMode
    $certificateAuthorityCert: String!
    $groupIds: [ID]
    $isVisible: Boolean
    $name: String!
    $protocols: ProtocolsInput
    $proxyAddress: String!
    $remoteNetworkId: ID!
    $securityPolicy: ID
    $tags: [TagInput!]
    $usageBasedAutolockDurationDays: Int
  ) {
    kubernetesResourceCreate(
      address: $address
      alias: $alias
      approvalMode: $approvalMode
      certificateAuthorityCert: $certificateAuthorityCert
      groupIds: $groupIds
      isVisible: $isVisible
      name: $name
      protocols: $protocols
      proxyAddress: $proxyAddress
      remoteNetworkId: $remoteNetworkId
      securityPolicy: $securityPolicy
      tags: $tags
      usageBasedAutolockDurationDays: $usageBasedAutolockDurationDays
    ) {
      ...KubernetesResourceCreateFields
    }
  }
  ${fragments.KUBERNETES_RESOURCE_CREATE_FRAGMENT}
`;

export default kubernetesResourceCreate;

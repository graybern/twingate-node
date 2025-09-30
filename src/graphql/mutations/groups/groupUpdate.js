import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const groupUpdate = gql`
  mutation GroupUpdate(
    $addedResourceIds: [ID]
    $addedUserIds: [ID]
    $id: ID!
    $isActive: Boolean
    $name: String
    $removedResourceIds: [ID]
    $removedUserIds: [ID]
    $resourceIds: [ID]
    $securityPolicyId: ID
    $userIds: [ID]
  ) {
    groupUpdate(
      addedResourceIds: $addedResourceIds
      addedUserIds: $addedUserIds
      id: $id
      isActive: $isActive
      name: $name
      removedResourceIds: $removedResourceIds
      removedUserIds: $removedUserIds
      resourceIds: $resourceIds
      securityPolicyId: $securityPolicyId
      userIds: $userIds
    ) {
      ...GroupUpdateFields
    }
  }
  ${fragments.GROUP_UPDATE_MUTATION_FRAGMENT}
`;

export default groupUpdate;

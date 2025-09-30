import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const groupCreate = gql`
  mutation GroupCreate(
    $name: String!
    $resourceIds: [ID]
    $securityPolicyId: ID
    $userIds: [ID]
  ) {
    groupCreate(
      name: $name
      resourceIds: $resourceIds
      securityPolicyId: $securityPolicyId
      userIds: $userIds
    ) {
      ...GroupCreateFields
    }
  }
  ${fragments.GROUP_CREATE_MUTATION_FRAGMENT}
`;

export default groupCreate;

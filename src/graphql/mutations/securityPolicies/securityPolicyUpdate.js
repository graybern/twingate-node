import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const securityPolicyUpdate = gql`
  mutation SecurityPolicyUpdate(
    $addedGroupIds: [ID]
    $groupIds: [ID]
    $id: ID!
    $removedGroupIds: [ID]
  ) {
    securityPolicyUpdate(
      addedGroupIds: $addedGroupIds
      groupIds: $groupIds
      id: $id
      removedGroupIds: $removedGroupIds
    ) {
      ...SecurityPolicyUpdateFields
    }
  }
  ${fragments.SECURITY_POLICY_UPDATE_MUTATION_FRAGMENT}
`;

export default securityPolicyUpdate;

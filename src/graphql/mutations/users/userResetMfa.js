import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const userResetMfa = gql`
  mutation UserResetMfa($id: ID!) {
    userResetMfa(id: $id) {
      ...UserResetMfaFields
    }
  }
  ${fragments.USER_RESET_MFA_MUTATION_FRAGMENT}
`;

export default userResetMfa;

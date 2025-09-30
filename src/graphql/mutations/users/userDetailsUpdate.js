import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const userDetailsUpdate = gql`
  mutation UserDetailsUpdate(
    $firstName: String
    $id: ID!
    $lastName: String
    $state: UserStateUpdateInput
  ) {
    userDetailsUpdate(
      firstName: $firstName
      id: $id
      lastName: $lastName
      state: $state
    ) {
      ...UserDetailsUpdateFields
    }
  }
  ${fragments.USER_DETAILS_UPDATE_MUTATION_FRAGMENT}
`;

export default userDetailsUpdate;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const userCreate = gql`
  mutation UserCreate(
    $email: String!
    $firstName: String
    $lastName: String
    $role: UserRole
    $shouldSendInvite: Boolean
  ) {
    userCreate(
      email: $email
      firstName: $firstName
      lastName: $lastName
      role: $role
      shouldSendInvite: $shouldSendInvite
    ) {
      ...UserCreateFields
    }
  }
  ${fragments.USER_CREATE_MUTATION_FRAGMENT}
`;

export default userCreate;

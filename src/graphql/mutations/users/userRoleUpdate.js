import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const userRoleUpdate = gql`
  mutation UserRoleUpdate($id: ID!, $role: UserRole!) {
    userRoleUpdate(id: $id, role: $role) {
      ...UserRoleUpdateFields
    }
  }
  ${fragments.USER_ROLE_UPDATE_MUTATION_FRAGMENT}
`;

export default userRoleUpdate;

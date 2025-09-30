import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const userDelete = gql`
  mutation UserDelete($id: ID!) {
    userDelete(id: $id) {
      ...UserDeleteFields
    }
  }
  ${fragments.USER_DELETE_MUTATION_FRAGMENT}
`;

export default userDelete;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const groupDelete = gql`
  mutation GroupDelete($id: ID!) {
    groupDelete(id: $id) {
      ...GroupDeleteFields
    }
  }
  ${fragments.GROUP_DELETE_MUTATION_FRAGMENT}
`;

export default groupDelete;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const resourceDelete = gql`
  mutation ResourceDelete($id: ID!) {
    resourceDelete(id: $id) {
      ...ResourceDeleteFields
    }
  }
  ${fragments.RESOURCE_DELETE_MUTATION_FRAGMENT}
`;

export default resourceDelete;

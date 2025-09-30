import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountDelete = gql`
  mutation ServiceAccountDelete($id: ID!) {
    serviceAccountDelete(id: $id) {
      ...ServiceAccountDeleteFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_DELETE_MUTATION_FRAGMENT}
`;

export default serviceAccountDelete;

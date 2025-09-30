import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountKeyDelete = gql`
  mutation ServiceAccountKeyDelete($id: ID!) {
    serviceAccountKeyDelete(id: $id) {
      ...ServiceAccountKeyDeleteFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_KEY_DELETE_MUTATION_FRAGMENT}
`;

export default serviceAccountKeyDelete;

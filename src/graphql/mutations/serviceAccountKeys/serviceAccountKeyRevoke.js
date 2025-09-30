import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountKeyRevoke = gql`
  mutation ServiceAccountKeyRevoke($id: ID!) {
    serviceAccountKeyRevoke(id: $id) {
      ...ServiceAccountKeyRevokeFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_KEY_REVOKE_MUTATION_FRAGMENT}
`;

export default serviceAccountKeyRevoke;

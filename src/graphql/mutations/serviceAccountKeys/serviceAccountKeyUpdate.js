import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountKeyUpdate = gql`
  mutation ServiceAccountKeyUpdate($id: ID!, $name: String!) {
    serviceAccountKeyUpdate(id: $id, name: $name) {
      ...ServiceAccountKeyUpdateFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_KEY_UPDATE_MUTATION_FRAGMENT}
`;

export default serviceAccountKeyUpdate;

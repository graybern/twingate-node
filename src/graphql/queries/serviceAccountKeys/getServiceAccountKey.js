import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";
import getServiceAccount from "../serviceAccounts/getServiceAccount.js";

const getServiceAccountKey = gql`
  query GetServiceAccountKey($id: ID!, $name: String) {
    serviceAccountKey(id: $id, name: $name) {
      ...ServiceAccountKeyFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_KEY_QUERY_FRAGMENT}
`;

export default getServiceAccountKey;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getServiceAccount = gql`
  query GetServiceAccount($id: ID!) {
    serviceAccount(id: $id) {
      ...ServiceAccountFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_QUERY_FRAGMENT}
`;

export default getServiceAccount;

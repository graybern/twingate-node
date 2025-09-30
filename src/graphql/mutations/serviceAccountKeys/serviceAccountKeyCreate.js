import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountKeyCreate = gql`
  mutation ServiceAccountKeyCreate(
    $expirationTime: Int!
    $name: String
    $serviceAccountId: ID!
  ) {
    serviceAccountKeyCreate(
      expirationTime: $expirationTime
      name: $name
      serviceAccountId: $serviceAccountId
    ) {
      ...ServiceAccountKeyCreateFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_KEY_CREATE_MUTATION_FRAGMENT}
`;

export default serviceAccountKeyCreate;

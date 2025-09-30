import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountCreate = gql`
  mutation ServiceAccountCreate($name: String!, $resourceIds: [ID]) {
    serviceAccountCreate(name: $name, resourceIds: $resourceIds) {
      ...ServiceAccountCreateFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_CREATE_MUTATION_FRAGMENT}
`;

export default serviceAccountCreate;

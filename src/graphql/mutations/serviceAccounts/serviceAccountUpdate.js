import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serviceAccountUpdate = gql`
  mutation ServiceAccountUpdate(
    $addedResourceIds: [ID]
    $id: ID!
    $name: String
    $removedResourceIds: [ID]
    $resourceIds: [ID]
  ) {
    serviceAccountUpdate(
      addedResourceIds: $addedResourceIds
      id: $id
      name: $name
      removedResourceIds: $removedResourceIds
      resourceIds: $resourceIds
    ) {
      ...ServiceAccountUpdateFields
    }
  }
  ${fragments.SERVICE_ACCOUNT_UPDATE_MUTATION_FRAGMENT}
`;

export default serviceAccountUpdate;

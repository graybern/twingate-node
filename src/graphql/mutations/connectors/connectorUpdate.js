import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const connectorUpdate = gql`
  mutation ConnectorUpdate(
    $hasStatusNotificationsEnabled: Boolean
    $name: String
    $id: ID!
  ) {
    connectorUpdate(
      hasStatusNotificationsEnabled: $hasStatusNotificationsEnabled
      name: $name
      id: $id
    ) {
      ...ConnectorUpdateFields
    }
  }
  ${fragments.CONNECTOR_UPDATE_MUTATION_FRAGMENT}
`;

export default connectorUpdate;

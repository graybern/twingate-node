import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const connectorCreate = gql`
  mutation ConnectorCreate(
    $hasStatusNotificationsEnabled: Boolean
    $name: String
    $remoteNetworkId: ID!
  ) {
    connectorCreate(
      hasStatusNotificationsEnabled: $hasStatusNotificationsEnabled
      name: $name
      remoteNetworkId: $remoteNetworkId
    ) {
      ...ConnectorCreateFields
    }
  }
  ${fragments.CONNECTOR_CREATE_MUTATION_FRAGMENT}
`;

export default connectorCreate;

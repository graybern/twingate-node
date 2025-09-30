import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const connectorDelete = gql`
  mutation ConnectorDelete($id: ID!) {
    connectorDelete(id: $id) {
      ...ConnectorDeleteFields
    }
  }
  ${fragments.CONNECTOR_DELETE_MUTATION_FRAGMENT}
`;

export default connectorDelete;

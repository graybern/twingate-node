import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getConnector = gql`
  query GetConnector($id: ID!) {
    connector(id: $id) {
      ...ConnectorFields
    }
  }
  ${fragments.CONNECTOR_QUERY_FRAGMENT}
`;

export default getConnector;

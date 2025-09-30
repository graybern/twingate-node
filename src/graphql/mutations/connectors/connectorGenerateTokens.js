import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const connectorGenerateTokens = gql`
  mutation ConnectorGenerateTokens($connectorId: ID!) {
    connectorGenerateTokens(connectorId: $connectorId) {
      ...ConnectorGenerateTokensFields
    }
  }
  ${fragments.CONNECTOR_GENERATE_TOKENS_MUTATION_FRAGMENT}
`;

export default connectorGenerateTokens;

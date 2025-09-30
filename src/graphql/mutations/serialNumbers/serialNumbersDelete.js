import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serialNumbersDelete = gql`
  mutation SerialNumbersDelete($serialNumbers: [String!]!) {
    serialNumbersDelete(serialNumbers: $serialNumbers) {
      ...SerialNumbersDeleteFields
    }
  }
  ${fragments.SERIAL_NUMBERS_DELETE_MUTATION_FRAGMENT}
`;

export default serialNumbersDelete;

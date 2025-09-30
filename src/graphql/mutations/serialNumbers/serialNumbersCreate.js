import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const serialNumbersCreate = gql`
  mutation SerialNumbersCreate($serialNumbers: [String!]!) {
    serialNumbersCreate(serialNumbers: $serialNumbers) {
      ...SerialNumbersCreateFields
    }
  }
  ${fragments.SERIAL_NUMBERS_CREATE_MUTATION_FRAGMENT}
`;

export default serialNumbersCreate;

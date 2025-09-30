import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const deviceUnarchive = gql`
  mutation DeviceUnarchive($id: ID!) {
    deviceUnarchive(id: $id) {
      ...DeviceUnarchiveFields
    }
  }
  ${fragments.DEVICE_UNARCHIVE_MUTATION_FRAGMENT}
`;

export default deviceUnarchive;

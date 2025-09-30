import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const deviceUnblock = gql`
  mutation DeviceUnblock($id: ID!) {
    deviceUnblock(id: $id) {
      ...DeviceUnblockFields
    }
  }
  ${fragments.DEVICE_UNBLOCK_MUTATION_FRAGMENT}
`;

export default deviceUnblock;

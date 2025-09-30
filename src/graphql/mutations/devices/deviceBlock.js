import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const deviceBlock = gql`
  mutation DeviceBlock($id: ID!) {
    deviceBlock(id: $id) {
      ...DeviceBlockFields
    }
  }
  ${fragments.DEVICE_BLOCK_MUTATION_FRAGMENT}
`;

export default deviceBlock;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const deviceUpdate = gql`
  mutation DeviceUpdate($id: ID!, $isTrusted: Boolean!) {
    deviceUpdate(id: $id, isTrusted: $isTrusted) {
      ...DeviceUpdateFields
    }
  }
  ${fragments.DEVICE_UPDATE_MUTATION_FRAGMENT}
`;

export default deviceUpdate;

import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getDevice = gql`
  query GetDevice($id: ID!) {
    device(id: $id) {
      ...DeviceFields
    }
  }
  ${fragments.DEVICE_QUERY_FRAGMENT}
`;

export default getDevice;

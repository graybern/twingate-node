import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const deviceArchive = gql`
  mutation DeviceArchive($id: ID!) {
    deviceArchive(id: $id) {
      ...DeviceArchiveFields
    }
  }
  ${fragments.DEVICE_ARCHIVE_MUTATION_FRAGMENT}
`;

export default deviceArchive;

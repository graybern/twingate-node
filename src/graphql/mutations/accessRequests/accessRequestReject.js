import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const accessRequestReject = gql`
  mutation AccessRequestReject($id: ID!) {
    accessRequestReject(id: $id) {
      ...AccessRequestRejectFields
    }
  }
  ${fragments.ACCESS_REQUEST_REJECT_MUTATION_FRAGMENT}
`;

export default accessRequestReject;

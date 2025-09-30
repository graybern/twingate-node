import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const accessRequestApprove = gql`
  mutation AccessRequestApprove($id: ID!) {
    accessRequestApprove(id: $id) {
      ...AccessRequestApproveFields
    }
  }
  ${fragments.ACCESS_REQUEST_APPROVE_MUTATION_FRAGMENT}
`;

export default accessRequestApprove;

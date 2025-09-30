import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getAccessRequest = gql`
  query GetAccessRequest($id: ID!) {
    accessRequest(id: $id) {
      ...AccessRequestFields
    }
  }
  ${fragments.ACCESS_REQUEST_QUERY_FRAGMENT}
`;

export default getAccessRequest;

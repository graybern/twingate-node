import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getResource = gql`
  query GetResource($id: ID!) {
    resource(id: $id) {
      ...ResourceFields
    }
  }
  ${fragments.RESOURCE_QUERY_FRAGMENT}
`;

export default getResource;

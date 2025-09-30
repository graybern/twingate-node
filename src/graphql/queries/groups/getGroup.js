import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getGroup = gql`
  query GetGroup($id: ID!) {
    group(id: $id) {
      ...GroupFields
    }
  }
  ${fragments.GROUP_QUERY_FRAGMENT}
`;

export default getGroup;

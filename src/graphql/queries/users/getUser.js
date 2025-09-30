import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getUser = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
  ${fragments.USER_QUERY_FRAGMENT}
`;

export default getUser;

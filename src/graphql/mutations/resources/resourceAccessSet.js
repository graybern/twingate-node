import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const resourceAccessSet = gql`
  mutation ResourceAccessSet($access: [AccessInput!]!, $resourceId: ID!) {
    resourceAccessSet(access: $access, resourceId: $resourceId) {
      ...ResourceAccessSetFields
    }
  }
  ${fragments.RESOURCE_ACCESS_SET_MUTATION_FRAGMENT}
`;

export default resourceAccessSet;

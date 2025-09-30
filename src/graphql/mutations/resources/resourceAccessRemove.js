import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const resourceAccessRemove = gql`
  mutation ResourceAccessRemove($principalIds: [ID!]!, $resourceId: ID!) {
    resourceAccessRemove(principalIds: $principalIds, resourceId: $resourceId) {
      ...ResourceAccessRemoveFields
    }
  }
  ${fragments.RESOURCE_ACCESS_REMOVE_MUTATION_FRAGMENT}
`;

export default resourceAccessRemove;

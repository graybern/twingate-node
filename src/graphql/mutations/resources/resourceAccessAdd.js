import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const resourceAccessAdd = gql`
  mutation ResourceAccessAdd($access: [AccessInput!]!, $resourceId: ID!) {
    resourceAccessAdd(access: $access, resourceId: $resourceId) {
      ...ResourceAccessAddFields
    }
  }
  ${fragments.RESOURCE_ACCESS_ADD_MUTATION_FRAGMENT}
`;

export default resourceAccessAdd;

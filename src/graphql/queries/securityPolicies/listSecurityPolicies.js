import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const listSecurityPolicies = gql`
  query ListSecurityPolicies(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: SecurityPolicyFilterField
  ) {
    users(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...SecurityPolicyFields
        }
      }
      totalCount
    }
  }
  ${fragments.SECURITY_POLICY_QUERY_FRAGMENT}
`;

export default listSecurityPolicies;

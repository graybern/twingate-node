import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getSecurityPolicy = gql`
  query GetSecurityPolicy($id: ID!, $name: String) {
    securityPolicy(id: $id, name: $name) {
      ...SecurityPolicyFields
    }
  }
  ${fragments.SECURITY_POLICY_QUERY_FRAGMENT}
`;

export default getSecurityPolicy;

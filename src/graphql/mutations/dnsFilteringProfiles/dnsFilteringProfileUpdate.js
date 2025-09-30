import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const dnsFilteringProfileUpdate = gql`
  mutation DnsFilteringProfileUpdate(
    $allowedDomains: [String!]
    $contentCategoryConfig: ContentCategoryConfigInput
    $deniedDomains: [String!]
    $fallbackMethod: DohFallbackMethod
    $groups: [String!]
    $id: ID!
    $name: String
    $priority: Float
    $privacyCategoryConfig: PrivacyCategoryConfigInput
    $securityCategoryConfig: SecurityCategoryConfigInput
  ) {
    dnsFilteringProfileUpdate(
      allowedDomains: $allowedDomains
      contentCategoryConfig: $contentCategoryConfig
      deniedDomains: $deniedDomains
      fallbackMethod: $fallbackMethod
      groups: $groups
      id: $id
      name: $name
      priority: $priority
      privacyCategoryConfig: $privacyCategoryConfig
      securityCategoryConfig: $securityCategoryConfig
    ) {
      ...DnsFilteringProfileUpdateFields
    }
  }
  ${fragments.DNS_FILTERING_PROFILE_UPDATE_MUTATION_FRAGMENT}
`;

export default dnsFilteringProfileUpdate;

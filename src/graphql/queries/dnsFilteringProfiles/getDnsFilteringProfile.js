import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const getDnsFilteringProfile = gql`
  query GetDnsFilteringProfile($id: ID!) {
    dnsFilteringProfile(id: $id) {
      ...DnsFilteringProfileFields
    }
  }
  ${fragments.DNS_FILTERING_PROFILE_QUERY_FRAGMENT}
`;

export default getDnsFilteringProfile;

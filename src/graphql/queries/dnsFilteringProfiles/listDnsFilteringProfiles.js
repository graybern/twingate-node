import { gql } from "graphql-request";
//import { DNS_FILTERING_PROFILE_QUERY_FRAGMENT } from "../../fragments.js";

const listDnsFilteringProfiles = gql`
  query ListDnsFilteringProfiles {
    dnsFilteringProfiles {
      name
      id
      priority
    }
  }
`;

export default listDnsFilteringProfiles;

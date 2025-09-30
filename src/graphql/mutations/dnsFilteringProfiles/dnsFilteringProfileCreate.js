import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const dnsFilteringProfileCreate = gql`
  mutation DnsFilteringProfileCreate($name: String!) {
    dnsFilteringProfileCreate(name: $name) {
      ...DnsFilteringProfileCreateFields
    }
  }
  ${fragments.DNS_FILTERING_PROFILE_CREATE_MUTATION_FRAGMENT}
`;

export default dnsFilteringProfileCreate;

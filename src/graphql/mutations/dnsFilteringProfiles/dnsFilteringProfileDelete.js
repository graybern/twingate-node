import { gql } from "graphql-request";
import { fragments } from "../../fragments.js";

const dnsFilteringProfileDelete = gql`
  mutation DnsFilteringProfileDelete($id: ID!) {
    dnsFilteringProfileDelete(id: $id) {
      ...DnsFilteringProfileDeleteFields
    }
  }
  ${fragments.DNS_FILTERING_PROFILE_DELETE_MUTATION_FRAGMENT}
`;

export default dnsFilteringProfileDelete;

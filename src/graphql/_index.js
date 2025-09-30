// src/graphql/index

import { fragments } from "./fragments.js";
/****************************************************/
/**
 * CHANGELOG - Available Queries
 * Last Update: 2025-01-22
 */
/****************************************************/

// accessRequests
// accessRequest
// serialNumbers
// dnsFilteringProfile
// dnsFilteringProfiles
// serviceAccountKey
// serviceAccount
// serviceAccounts
// securityPolicies
// securityPolicy
// connectors
// connector
// devices
// device
// users
// user
// resources
// resource
// remoteNetworks
// remoteNetwork
// groups
// group

// Query Imports
import * as accessRequestQueries from "./queries/accessRequests/_index.js"; // accessRequest & accessRequests
import * as connectorQueries from "./queries/connectors/_index.js"; // connector & connectors
import * as deviceQueries from "./queries/devices/_index.js"; // device & devices
import * as dnsFilteringProfileQueries from "./queries/dnsFilteringProfiles/_index.js"; // dnsFilteringProfile & dnsFilteringProfiles
import * as groupQueries from "./queries/groups/_index.js"; // group & groups
import * as remoteNetworkQueries from "./queries/remoteNetworks/_index.js"; // remoteNetwork & remoteNetworks
import * as resourceQueries from "./queries/resources/_index.js"; // resource & resources
import * as securityPolicyQueries from "./queries/securityPolicies/_index.js"; // securityPolicy & securityPolicies
import * as serialNumberQueries from "./queries/serialNumbers/_index.js"; // serialNumbers
import * as serviceAccountKeyQueries from "./queries/serviceAccountKeys/_index.js"; // serviceAccountKey
import * as serviceAccountQueries from "./queries/serviceAccounts/_index.js"; // serviceAccount & serviceAccounts
import * as userQueries from "./queries/users/_index.js"; // user & users

/****************************************************/
/**
 * CHANGELOG - Available Mutations
 * Last Update: 2025-01-22
 */
/****************************************************/

// accessRequestApprove
// accessRequestReject
// serialNumbersCreate
// serialNumbersDelete
// dnsFilteringProfileCreate
// dnsFilteringProfileDelete
// dnsFilteringProfileUpdate
// serviceAccountKeyCreate
// serviceAccountKeyUpdate
// serviceAccountKeyRevoke
// serviceAccountKeyDelete
// serviceAccountCreate
// serviceAccountUpdate
// serviceAccountDelete
// securityPolicyUpdate
// deviceUpdate
// deviceArchive
// deviceUnarchive
// deviceBlock
// deviceUnblock
// remoteNetworkCreate
// remoteNetworkUpdate
// remoteNetworkDelete
// connectorCreate
// connectorUpdate
// connectorDelete
// connectorGenerateTokens
// userCreate
// userDetailsUpdate
// userRoleUpdate
// userDelete
// userResetMfa
// resourceCreate
// resourceUpdate
// resourceDelete
// resourceAccessAdd
// resourceAccessSet
// resourceAccessRemove
// groupCreate
// groupUpdate
// groupDelete

// Mutation Imports
import * as accessRequestMutations from "./mutations/accessRequests/_index.js"; // accessRequestApprove, accessRequestReject
import * as connectorMutations from "./mutations/connectors/_index.js"; // connectorCreate, connectorUpdate, connectorDelete, connectorGenerateTokens
import * as deviceMutations from "./mutations/devices/_index.js"; // deviceUpdate, deviceArchive, deviceUnarchive, deviceBlock, deviceUnblock
import * as dnsFilteringProfileMutations from "./mutations/dnsFilteringProfiles/_index.js"; // dnsFilteringProfileCreate, dnsFilteringProfileDelete, dnsFilteringProfileUpdate
import * as groupMutations from "./mutations/groups/_index.js"; // groupCreate, groupUpdate, groupDelete
import * as kubernetesResourceMutations from "./mutations/kubernetesResources/_index.js"; // kubernetesResourceCreate, kubernetesResourceUpdate, kubernetesResourceDelete
import * as remoteNetworkMutations from "./mutations/remoteNetworks/_index.js"; // remoteNetworkCreate, remoteNetworkUpdate, remoteNetworkDelete
import * as resourceMutations from "./mutations/resources/_index.js"; // resourceCreate, resourceUpdate, resourceDelete, resourceAccessAdd, resourceAccessSet, resourceAccessRemove
import * as securityPolicyMutations from "./mutations/securityPolicies/_index.js"; // securityPolicyUpdate
import * as serialNumberMutations from "./mutations/serialNumbers/_index.js"; // serialNumbersCreate, serialNumbersDelete
import * as serviceAccountKeyMutations from "./mutations/serviceAccountKeys/_index.js"; // serviceAccountKeyCreate, serviceAccountKeyUpdate, serviceAccountKeyRevoke, serviceAccountKeyDelete
import * as serviceAccountMutations from "./mutations/serviceAccounts/_index.js"; // serviceAccountCreate, serviceAccountUpdate, serviceAccountDelete
import * as userMutations from "./mutations/users/_index.js"; // userCreate, userDetailsUpdate, userRoleUpdate, userDelete, userResetMfa

// Build schema object for dynamic access to queries and mutations
const schema = {
  queries: {
    accessRequests: Object.keys(accessRequestQueries), // ['get', 'getOne']
    connectors: Object.keys(connectorQueries), // ['get', 'getOne']
    devices: Object.keys(deviceQueries), // ['get', 'getOne']
    dnsFilteringProfiles: Object.keys(dnsFilteringProfileQueries), // ['get', 'getOne']
    groups: Object.keys(groupQueries), // ['get', 'getOne']
    remoteNetworks: Object.keys(remoteNetworkQueries), // ['get', 'getOne']
    resources: Object.keys(resourceQueries), // ['get', 'getOne']
    securityPolicies: Object.keys(securityPolicyQueries), // ['get', 'getOne']
    serialNumbers: Object.keys(serialNumberQueries), // ['get', 'getOne']
    serviceAccountKeys: Object.keys(serviceAccountKeyQueries), // ['get', 'getOne']
    serviceAccounts: Object.keys(serviceAccountQueries), // ['get', 'getOne']
    users: Object.keys(userQueries), // ['get', 'getOne']
  },
  mutations: {
    accessRequests: Object.keys(accessRequestMutations), // ['approve', 'reject']
    connectors: Object.keys(connectorMutations), // ['create', 'delete', 'generateTokens', 'update']
    devices: Object.keys(deviceMutations), // ['archive', 'block', 'unblock', 'unarchive', 'update']
    dnsFilteringProfiles: Object.keys(dnsFilteringProfileMutations), // ['create', 'delete', 'update']
    groups: Object.keys(groupMutations), // ['create', 'delete', 'update']
    kubernetesResources: Object.keys(kubernetesResourceMutations), // ['create', 'delete', 'update']
    remoteNetworks: Object.keys(remoteNetworkMutations), // ['create', 'delete', 'update']
    resources: Object.keys(resourceMutations), // ['accessAdd', 'accessRemove', 'accessSet', 'create', 'delete', 'update']
    securityPolicies: Object.keys(securityPolicyMutations), // ['update']
    serialNumbers: Object.keys(serialNumberMutations), // ['create', 'delete']
    serviceAccountKeys: Object.keys(serviceAccountKeyMutations), // ['create', 'delete', 'revoke', 'update']
    serviceAccounts: Object.keys(serviceAccountMutations), // ['create', 'delete', 'update']
    users: Object.keys(userMutations), // ['create', 'delete', 'detailsUpdate', 'resetMfa', 'roleUpdate']
  },
  //fragments: fragments, //Object.keys(fragments), // ['accessRequestsQueryFields']
};

// GraphQL Export
export default {
  queries: {
    accessRequests: accessRequestQueries,
    connectors: connectorQueries,
    devices: deviceQueries,
    dnsFilteringProfiles: dnsFilteringProfileQueries,
    groups: groupQueries,
    remoteNetworks: remoteNetworkQueries,
    resources: resourceQueries,
    securityPolicies: securityPolicyQueries,
    serialNumbers: serialNumberQueries,
    serviceAccountKeys: serviceAccountKeyQueries,
    serviceAccounts: serviceAccountQueries,
    users: userQueries,
  },
  mutations: {
    accessRequests: accessRequestMutations,
    connectors: connectorMutations,
    devices: deviceMutations,
    dnsFilteringProfiles: dnsFilteringProfileMutations,
    groups: groupMutations,
    kubernetesResources: kubernetesResourceMutations,
    remoteNetworks: remoteNetworkMutations,
    resources: resourceMutations,
    securityPolicies: securityPolicyMutations,
    serialNumbers: serialNumberMutations,
    serviceAccountKeys: serviceAccountKeyMutations,
    serviceAccounts: serviceAccountMutations,
    users: userMutations,
  },
  fragments,
  schema,
};

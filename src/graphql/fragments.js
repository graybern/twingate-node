// src/graphql/fragments.js

import { gql } from "graphql-request";

//////////////////////////////////////////////////////
// QUERIES
//////////////////////////////////////////////////////

export const fragments = {
  ACCESS_REQUEST_QUERY_FRAGMENT: gql`
    fragment AccessRequestFields on AccessRequest {
      id
      reason
      requestedAt
      user {
        id
        email
        # expand as needed
      }
      resource {
        id
        name
        # expand as needed
      }
    }
  `,

  SERIAL_NUMBER_QUERY_FRAGMENT: gql`
    fragment SerialNumberFields on SerialNumber {
      id
      createdAt
      serialNumber
      matchedDevices(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
    }
  `,

  DNS_FILTERING_PROFILE_QUERY_FRAGMENT: gql`
    fragment DnsFilteringProfileFields on DnsFilteringProfile {
      id
      name
      priority
      fallbackMethod
      groups(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
      allowedDomains
      deniedDomains
      contentCategoryConfig {
        blockGambling
        blockDating
        blockAdultContent
        blockSocialMedia
        blockGames
        blockStreaming
        blockPiracy
        enableYoutubeRestrictedMode
        enableSafeSearch
      }
      securityCategoryConfig {
        enableThreatIntelligenceFeeds
        enableGoogleSafeBrowsing
        blockCryptojacking
        blockIdnHomographs
        blockTyposquatting
        blockDnsRebinding
        blockNewlyRegisteredDomains
        blockDomainGenerationAlgorithms
        blockParkedDomains
      }
      privacyCategoryConfig {
        blockAffiliate
        blockDisguisedTrackers
        blockAdsAndTrackers
      }
    }
  `,

  DNS_FILTERINGPROFILES_QUERY_FRAGMENT: gql`
    fragment DnsFilteringProfilesFields on DnsFilteringProfileMetadata {
      id
      name
      priority
      fallbackMethod
    }
  `,

  SERVICE_ACCOUNT_KEY_QUERY_FRAGMENT: gql`
    fragment ServiceAccountKeyFields on ServiceAccountKey {
      createdAt
      id
      name
      expiresAt
      revokedAt
      updatedAt
      status
      serviceAccount {
        id
        name
        # expand as needed
      }
    }
  `,

  SERVICE_ACCOUNT_QUERY_FRAGMENT: gql`
    fragment ServiceAccountFields on ServiceAccount {
      id
      createdAt
      updatedAt
      name
      resources(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
      keys(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
    }
  `,

  SECURITY_POLICY_QUERY_FRAGMENT: gql`
    fragment SecurityPolicyFields on SecurityPolicy {
      id
      createdAt
      updatedAt
      name
      policyType
      groups(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
    }
  `,

  CONNECTOR_QUERY_FRAGMENT: gql`
    fragment ConnectorFields on Connector {
      id
      createdAt
      updatedAt
      name
      lastHeartbeatAt
      hostname
      remoteNetwork {
        name
        id
        networkType
        location
        isActive
      }
      state
      hasStatusNotificationsEnabled
      version
      publicIP
      privateIPs
    }
  `,

  DEVICE_QUERY_FRAGMENT: gql`
    fragment DeviceFields on Device {
      id
      name
      lastFailedLoginAt
      lastSuccessfulLoginAt
      osVersion
      hardwareModel
      hostname
      username
      serialNumber
      user {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
      }
      osName
      deviceType
      activeState
      isTrusted
      clientVersion
      manufacturerName
      internetSecurityConfiguration
    }
  `,

  USER_QUERY_FRAGMENT: gql`
    fragment UserFields on User {
      id
      createdAt
      updatedAt
      firstName
      lastName
      email
      avatarUrl
      state
      role
      type
      groups(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
    }
  `,

  RESOURCE_QUERY_FRAGMENT: gql`
    fragment ResourceFields on Resource {
      id
      createdAt
      updatedAt
      name
      address {
        type
        value
      }
      alias
      protocols {
        allowIcmp
        tcp {
          policy
          ports {
            start
            end
          }
        }
        udp {
          policy
          ports {
            start
            end
          }
        }
      }
      isActive
      remoteNetwork {
        id
        createdAt
        updatedAt
        name
        # expand as needed
      }
      access(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            ... on Group {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
            ... on ServiceAccount {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
          }
          cursor
          securityPolicy {
            id
            createdAt
            updatedAt
            name
            # expand as needed
          }
          expiresAt
          usageBasedAutolockDurationDays
        }
        totalCount
      }
      isVisible
      isBrowserShortcutEnabled
      securityPolicy {
        id
        createdAt
        updatedAt
        name
        # expand as needed
      }
      usageBasedAutolockDurationDays
    }
  `,

  REMOTE_NETWORK_QUERY_FRAGMENT: gql`
    fragment RemoteNetworkFields on RemoteNetwork {
      id
      createdAt
      updatedAt
      name
      networkType
      location
      isActive
      resources(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
      connectors(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
    }
  `,

  GROUP_QUERY_FRAGMENT: gql`
    fragment GroupFields on Group {
      id
      createdAt
      updatedAt
      name
      originId
      isActive
      type
      users(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            createdAt
            updatedAt
            firstName
            lastName
            email
            # expand as needed
          }
          cursor
        }
        totalCount
      }
      resources(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
      securityPolicy {
        id
        createdAt
        updatedAt
        name
        policyType
        # expand as needed
      }
    }
  `,

  //////////////////////////////////////////////////////
  // MUTATIONS
  //////////////////////////////////////////////////////

  ACCESS_REQUEST_APPROVE_MUTATION_FRAGMENT: gql`
    fragment AccessRequestApproveFields on AccessRequestApproveMutation {
      ok
      error
    }
  `,

  ACCESS_REQUEST_REJECT_MUTATION_FRAGMENT: gql`
    fragment AccessRequestRejectFields on AccessRequestRejectMutation {
      ok
      error
    }
  `,

  SERIAL_NUMBERS_CREATE_MUTATION_FRAGMENT: gql`
    fragment SerialNumbersCreateFields on SerialNumbersCreateMutation {
      ok
      error
      entities {
        createdAt
        serialNumber
        id
        matchedDevices
      }
    }
  `,

  SERIAL_NUMBERS_DELETE_MUTATION_FRAGMENT: gql`
    fragment SerialNumbersDeleteFields on SerialNumbersDeleteMutation {
      ok
      error
    }
  `,

  DNS_FILTERING_PROFILE_CREATE_MUTATION_FRAGMENT: gql`
    fragment DnsFilteringProfileCreateFields on DnsFilteringProfileCreateMutation {
      ok
      error
      entity {
        name
        id
        priority
        fallbackMethod
        groups(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        allowedDomains
        deniedDomains
        contentCategoryConfig {
          blockGambling
          blockDating
          blockAdultContent
          blockSocialMedia
          blockGames
          blockStreaming
          blockPiracy
          enableYoutubeRestrictedMode
          enableSafeSearch
        }
        securityCategoryConfig {
          enableThreatIntelligenceFeeds
          enableGoogleSafeBrowsing
          blockCryptojacking
          blockIdnHomographs
          blockTyposquatting
          blockDnsRebinding
          blockNewlyRegisteredDomains
          blockDomainGenerationAlgorithms
          blockParkedDomains
        }
        privacyCategoryConfig {
          blockAffiliate
          blockDisguisedTrackers
          blockAdsAndTrackers
        }
      }
    }
  `,

  DNS_FILTERING_PROFILE_DELETE_MUTATION_FRAGMENT: gql`
    fragment DnsFilteringProfileDeleteFields on DnsFilteringProfileDeleteMutation {
      ok
      error
    }
  `,

  DNS_FILTERING_PROFILE_UPDATE_MUTATION_FRAGMENT: gql`
    fragment DnsFilteringProfileUpdateFields on DnsFilteringProfileUpdateMutation {
      ok
      error
      entity {
        name
        id
        priority
        fallbackMethod
        groups(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        allowedDomains
        deniedDomains
        contentCategoryConfig {
          blockGambling
          blockDating
          blockAdultContent
          blockSocialMedia
          blockGames
          blockStreaming
          blockPiracy
          enableYoutubeRestrictedMode
          enableSafeSearch
        }
        securityCategoryConfig {
          enableThreatIntelligenceFeeds
          enableGoogleSafeBrowsing
          blockCryptojacking
          blockIdnHomographs
          blockTyposquatting
          blockDnsRebinding
          blockNewlyRegisteredDomains
          blockDomainGenerationAlgorithms
          blockParkedDomains
        }
        privacyCategoryConfig {
          blockAffiliate
          blockDisguisedTrackers
          blockAdsAndTrackers
        }
      }
    }
  `,

  SERVICE_ACCOUNT_KEY_CREATE_MUTATION_FRAGMENT: gql`
    fragment ServiceAccountCreateFields on ServiceAccountKeyCreateMutation {
      ok
      error
      entity {
        createdAt
        id
        name
        expiresAt
        revokedAt
        updatedAt
        status
        serviceAccount
      }
      token
    }
  `,

  SERVICE_ACCOUNT_KEY_UPDATE_MUTATION_FRAGMENT: gql`
    fragment ServiceAccountKeyUpdateFields on ServiceAccountKeyUpdateMutation {
      ok
      error
      entity {
        createdAt
        id
        name
        expiresAt
        revokedAt
        updatedAt
        status
        serviceAccount
      }
    }
  `,

  SERVICE_ACCOUNT_KEY_REVOKE_MUTATION_FRAGMENT: gql`
    fragment ServiceAccountKeyRevokeFields on ServiceAccountKeyRevokeMutation {
      ok
      error
      entity {
        createdAt
        id
        name
        expiresAt
        revokedAt
        updatedAt
        status
        serviceAccount
      }
    }
  `,

  SERVICE_ACCOUNT_KEY_DELETE_MUTATION_FRAGMENT: gql`
    fragment ServiceAccountKeyDeleteFields on ServiceAccountKeyDeleteMutation {
      ok
      error
    }
  `,

  SERVICE_ACCOUNT_CREATE_MUTATION_FRAGMENT: gql`
    fragment ServiceAccountCreateFields on ServiceAccountCreateMutation {
      ok
      error
      entity {
        id
        name
        createdAt
        updatedAt
        resources(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        keys(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  SERVICE_ACCOUNT_UPDATE_MUTATION_FRAGMENT: gql`
  fragment ServiceAccountUpdateMutationFields on ServiceAccountUpdateMutation {
    ok
    error
    entity {
      id
      name
      createdAt
      updatedAt
      resources(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
      keys(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
  }
`,

  SERVICE_ACCOUNT_DELETE_MUTATION_FRAGMENT: gql`
    fragment ServiceAccountDeleteFields on ServiceAccountDeleteMutation {
      ok
      error
    }
  `,

  SECURITY_POLICY_UPDATE_MUTATION_FRAGMENT: gql`
  fragment SecurityPolicyUpdateFields on SecurityPolicyUpdateMutation {
    ok
    error
    entity {
      id
      createdAt
      updatedAt
      name
      policyType
      groups(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name
            # expand as needed
          }
          cursor
        }
        totalCount
      }
  }
`,

  DEVICE_UPDATE_MUTATION_FRAGMENT: gql`
    fragment DeviceUpdateFields on DeviceUpdateMutation {
      ok
      error
      entity {
        id
        name
        lastFailedLoginAt
        lastSuccessfulLoginAt
        osVersion
        hardwareModel
        hostname
        username
        serialNumber
        user {
          id
          createdAt
          updatedAt
          firstName
          lastName
          email
        }
        osName
        deviceType
        activeState
        isTrusted
        clientVersion
        manufacturerName
        internetSecurityConfiguration
      }
    }
  `,

  DEVICE_ARCHIVE_MUTATION_FRAGMENT: gql`
    fragment DeviceArchiveFields on DeviceArchiveMutation {
      ok
      error
      entity {
        id
        name
        lastFailedLoginAt
        lastSuccessfulLoginAt
        osVersion
        hardwareModel
        hostname
        username
        serialNumber
        user {
          id
          createdAt
          updatedAt
          firstName
          lastName
          email
        }
        osName
        deviceType
        activeState
        isTrusted
        clientVersion
        manufacturerName
        internetSecurityConfiguration
      }
    }
  `,

  DEVICE_UNARCHIVE_MUTATION_FRAGMENT: gql`
    fragment DeviceUnarchiveFields on DeviceUnarchiveMutation {
      ok
      error
      entity {
        id
        name
        lastFailedLoginAt
        lastSuccessfulLoginAt
        osVersion
        hardwareModel
        hostname
        username
        serialNumber
        user {
          id
          createdAt
          updatedAt
          firstName
          lastName
          email
        }
        osName
        deviceType
        activeState
        isTrusted
        clientVersion
        manufacturerName
        internetSecurityConfiguration
      }
    }
  `,

  DEVICE_BLOCK_MUTATION_FRAGMENT: gql`
    fragment DeviceBlockFields on DeviceBlockMutation {
      ok
      error
      entity {
        id
        name
        lastFailedLoginAt
        lastSuccessfulLoginAt
        osVersion
        hardwareModel
        hostname
        username
        serialNumber
        user {
          id
          createdAt
          updatedAt
          firstName
          lastName
          email
        }
        osName
        deviceType
        activeState
        isTrusted
        clientVersion
        manufacturerName
        internetSecurityConfiguration
      }
    }
  `,

  DEVICE_UNBLOCK_MUTATION_FRAGMENT: gql`
    fragment DeviceUnblockFields on DeviceUnblockMutation {
      ok
      error
      entity {
        id
        name
        lastFailedLoginAt
        lastSuccessfulLoginAt
        osVersion
        hardwareModel
        hostname
        username
        serialNumber
        user {
          id
          createdAt
          updatedAt
          firstName
          lastName
          email
        }
        osName
        deviceType
        activeState
        isTrusted
        clientVersion
        manufacturerName
        internetSecurityConfiguration
      }
    }
  `,

  REMOTE_NETWORK_CREATE_MUTATION_FRAGMENT: gql`
    fragment RemoteNetworkCreateFields on RemoteNetworkCreateMutation {
      ok
      error
      entity {
        createdAt
        updatedAt
        name
        id
        networkType
        location
        isActive
        resources(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        connectors(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  REMOTE_NETWORK_UPDATE_MUTATION_FRAGMENT: gql`
    fragment RemoteNetworkUpdateFields on RemoteNetworkUpdateMutation {
      ok
      error
      entity {
        createdAt
        updatedAt
        name
        id
        networkType
        location
        isActive
        resources(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        connectors(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  REMOTE_NETWORK_DELETE_MUTATION_FRAGMENT: gql`
    fragment RemoteNetworkDeleteFields on RemoteNetworkDeleteMutation {
      ok
      error
    }
  `,

  CONNECTOR_CREATE_MUTATION_FRAGMENT: gql`
    fragment ConnectorCreateFields on ConnectorCreateMutation {
      ok
      error
      entity {
        createdAt
        updatedAt
        lastHeartbeatAt
        hostname
        id
        name
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
        }
        state
        hasStatusNotificationsEnabled
        version
        publicIP
        privateIPs
      }
    }
  `,

  CONNECTOR_UPDATE_MUTATION_FRAGMENT: gql`
    fragment ConnectorUpdateFields on ConnectorUpdateMutation {
      ok
      error
      entity {
        createdAt
        updatedAt
        lastHeartbeatAt
        hostname
        id
        name
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
        }
        state
        hasStatusNotificationsEnabled
        version
        publicIP
        privateIPs
      }
    }
  `,

  CONNECTOR_DELETE_MUTATION_FRAGMENT: gql`
    fragment ConnectorDeleteFields on ConnectorDeleteMutation {
      ok
      error
    }
  `,

  CONNECTOR_GENERATE_TOKENS_MUTATION_FRAGMENT: gql`
    fragment ConnectorGenerateTokensFields on ConnectorGenerateTokensMutation {
      ok
      error
      connectorTokens {
        accessToken
        refreshToken
      }
    }
  `,

  USER_CREATE_MUTATION_FRAGMENT: gql`
    fragment UserCreateFields on UserCreateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
        avatarUrl
        state
        isAdmin
        role
        type
        groups(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  USER_DETAILS_UPDATE_MUTATION_FRAGMENT: gql`
    fragment UserDetailsUpdateFields on UserDetailsUpdateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
        avatarUrl
        state
        isAdmin
        role
        type
        groups(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  USER_ROLE_UPDATE_MUTATION_FRAGMENT: gql`
    fragment UserRoleUpdateFields on UserRoleUpdateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
        avatarUrl
        state
        isAdmin
        role
        type
        groups(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  USER_DELETE_MUTATION_FRAGMENT: gql`
    fragment UserDeleteFields on UserDeleteMutation {
      ok
      error
    }
  `,

  USER_RESET_MFA_MUTATION_FRAGMENT: gql`
    fragment UserResetMfaFields on UserResetMFAMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
        avatarUrl
        state
        isAdmin
        role
        type
        groups(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
      }
    }
  `,

  RESOURCE_CREATE_MUTATION_FRAGMENT: gql`
    fragment ResourceCreateFields on ResourceCreateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        address {
          type
          value
        }
        alias
        protocols {
          allowIcmp
          tcp {
            policy
            ports {
              start
              end
            }
          }
          udp {
            policy
            ports {
              start
              end
            }
          }
        }
        isActive
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ... on Group {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
              ... on ServiceAccount {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
            }
            cursor
            securityPolicy {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
            expiresAt
            usageBasedAutolockDurationDays
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        usageBasedAutolockDurationDays
      }
    }
  `,

  RESOURCE_UPDATE_MUTATION_FRAGMENT: gql`
    fragment ResourceUpdateFields on ResourceUpdateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        address {
          type
          value
        }
        alias
        protocols {
          allowIcmp
          tcp {
            policy
            ports {
              start
              end
            }
          }
          udp {
            policy
            ports {
              start
              end
            }
          }
        }
        isActive
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ... on Group {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
              ... on ServiceAccount {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
            }
            cursor
            securityPolicy {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
            expiresAt
            usageBasedAutolockDurationDays
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        usageBasedAutolockDurationDays
      }
    }
  `,

  RESOURCE_DELETE_MUTATION_FRAGMENT: gql`
    fragment ResourceDeleteFields on ResourceDeleteMutation {
      ok
      error
    }
  `,

  RESOURCE_ACCESS_ADD_MUTATION_FRAGMENT: gql`
    fragment ResourceAccessAddFields on ResourceAccessAddMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        address {
          type
          value
        }
        alias
        protocols {
          allowIcmp
          tcp {
            policy
            ports {
              start
              end
            }
          }
          udp {
            policy
            ports {
              start
              end
            }
          }
        }
        isActive
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ... on Group {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
              ... on ServiceAccount {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
            }
            cursor
            securityPolicy {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
            expiresAt
            usageBasedAutolockDurationDays
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        usageBasedAutolockDurationDays
      }
    }
  `,

  RESOURCE_ACCESS_SET_MUTATION_FRAGMENT: gql`
    fragment ResourceAccessSetFields on ResourceAccessSetMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        address {
          type
          value
        }
        alias
        protocols {
          allowIcmp
          tcp {
            policy
            ports {
              start
              end
            }
          }
          udp {
            policy
            ports {
              start
              end
            }
          }
        }
        isActive
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ... on Group {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
              ... on ServiceAccount {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
            }
            cursor
            securityPolicy {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
            expiresAt
            usageBasedAutolockDurationDays
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        usageBasedAutolockDurationDays
      }
    }
  `,

  RESOURCE_ACCESS_REMOVE_MUTATION_FRAGMENT: gql`
    fragment ResourceAccessRemoveFields on ResourceAccessRemoveMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        address {
          type
          value
        }
        alias
        protocols {
          allowIcmp
          tcp {
            policy
            ports {
              start
              end
            }
          }
          udp {
            policy
            ports {
              start
              end
            }
          }
        }
        isActive
        remoteNetwork {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ... on Group {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
              ... on ServiceAccount {
                id
                createdAt
                updatedAt
                name
                # expand as needed
              }
            }
            cursor
            securityPolicy {
              id
              createdAt
              updatedAt
              name
              # expand as needed
            }
            expiresAt
            usageBasedAutolockDurationDays
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          # expand as needed
        }
        usageBasedAutolockDurationDays
      }
    }
  `,

  GROUP_CREATE_MUTATION_FRAGMENT: gql`
    fragment GroupCreateFields on GroupCreateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        originId
        isActive
        type
        users(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              createdAt
              updatedAt
              firstName
              lastName
              email
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        resources(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          policyType
        }
      }
    }
  `,

  GROUP_UPDATE_MUTATION_FRAGMENT: gql`
    fragment GroupUpdateFields on GroupUpdateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        originId
        isActive
        type
        users(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              createdAt
              updatedAt
              firstName
              lastName
              email
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        resources(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          policyType
        }
      }
    }
  `,

  GROUP_DELETE_MUTATION_FRAGMENT: gql`
    fragment GroupDeleteFields on GroupDeleteMutation {
      ok
      error
    }
  `,

  KUBERNETES_RESOURCE_CREATE_FRAGMENT: gql`
    fragment KubernetesResourceCreateFields on KubernetesResourceCreateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        tags
        addressalias
        protocols
        isActive
        remoteNetwork
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          policyType
        }
        usageBasedAutolockDurationDays
        approvalMode
        proxyAddress
        certificateAuthorityCert
      }
    }
  `,

  KUBERNETES_RESOURCE_UPDATE_FRAGMENT: gql`
    fragment KubernetesResourceUpdateFields on KubernetesResourceUpdateMutation {
      ok
      error
      entity {
        id
        createdAt
        updatedAt
        name
        tags
        addressalias
        protocols
        isActive
        remoteNetwork
        access(first: 100) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              # expand as needed
            }
            cursor
          }
          totalCount
        }
        isVisible
        isBrowserShortcutEnabled
        securityPolicy {
          id
          createdAt
          updatedAt
          name
          policyType
        }
        usageBasedAutolockDurationDays
        approvalMode
        proxyAddress
        certificateAuthorityCert
      }
    }
  `,
};

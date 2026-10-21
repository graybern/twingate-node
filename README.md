# Twingate Node.js Client

## ⚠️ Experimental and Unofficial

This repository contains an **unofficial** Node.js client for interacting with the [Twingate GraphQL API](https://www.twingate.com/docs/api-overview). It is intended as an **experimental project** and should not be considered production-ready.

---

## 🚨 Disclaimer

- **No Official Support**: As this is an unofficial project, Twingate will not provide support for issues encountered while using this library.
- **Experimental Status**: This library is not feature-complete and may contain bugs.
- **Contributions**: Bug reports, feature requests, and pull requests are **not currently being accepted**.

---

## ✨ Features

- Simplifies interaction with Twingate's GraphQL API.
- Provides a convenient interface for making queries and mutations.
- Built with scalability and flexibility in mind.

---

## Project Directory Structure

```bash
twingate-node/
├── src/
│   ├── client.js               # Factory: twingate(tenantName, apiKey, options)
│   ├── TwingateClient.js       # Client class (GraphQL client, options, logger, request wrapper)
│   ├── graphql/
│   │   ├── _index.js           # Aggregates queries + mutations
│   │   ├── fragments.js        # Reusable GraphQL fragments
│   │   ├── queries/<entity>/   # Query definitions per entity
│   │   └── mutations/<entity>/ # Mutation definitions per entity
│   ├── resources/              # One module per entity (users, groups, resources, ...)
│   └── utils/
│       ├── withRetries.js      # Retry, exponential backoff and rate limiting
│       ├── fetchAllPages.js    # Cursor pagination with checkpoint/resume + streaming
│       ├── processBulkMutations.js # Bulk create/update/delete with checkpointing
│       ├── streamUtils.js      # JSONL streaming to rotated files
│       ├── fetchWrapper.js
│       └── logger.js           # pino logger factory
├── __tests__/                  # Jest tests (currently stale, see TODO.md)
├── examples/                   # Example scripts + .env.example
├── PLANNING.md                 # Longer-term design notes (CLI, explorer, visualizer)
└── TODO.md                     # Known issues and next steps
```

---

## 🛠️ Installation

Not published to npm. Clone the repo and install dependencies:

```bash
git clone https://github.com/graybern/twingate-node.git
cd twingate-node
npm install
cp examples/.env.example .env   # then fill in TWINGATE_API_TENANT and TWINGATE_API_KEY
```

---

## 🚀 Usage

The library is ESM (`"type": "module"`).

### Basic Setup

```javascript
import twingate from "./src/client.js";
import dotenv from "dotenv";
dotenv.config();

const client = twingate(
  process.env.TWINGATE_API_TENANT, // "acme" for https://acme.twingate.com
  process.env.TWINGATE_API_KEY,
  { logLevel: "info" }
);

const groups = await client.groups.getAll();
console.log(groups.map((g) => `${g.name} = ${g.id}`));
```

See `examples/demo.js` and `examples/test<Entity>.js` for more.

### Configuration Options

`twingate(tenantName, apiKey, options)` — `tenantName` and `apiKey` are required. Defaults live in `src/TwingateClient.js`.

| Option                    | Default                              | Description                                                                  |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| `tenantBaseUrl`           | `https://<tenantName>.twingate.com`  | Override the API host (e.g. non-production). `/api/graphql/` is appended.    |
| `maxPageSize`             | `50`                                 | Items per page for paginated reads.                                          |
| `maxRetries`              | `5`                                  | Retries for failed requests.                                                 |
| `backoffFactor`           | `2`                                  | Exponential backoff multiplier (1s, 2s, 4s, ...).                            |
| `readRateLimitPerMinute`  | `60`                                 | Client-side read rate limit.                                                 |
| `writeRateLimitPerMinute` | `20`                                 | Client-side write rate limit.                                                |
| `timeout`                 | `35000`                              | Request timeout (ms).                                                        |
| `rateLimitStrategy`       | `"pacing"`                           | `"pacing"` or `"bursting"`.                                                  |
| `streamToFile`            | `false`                              | Stream `getAll` results to JSONL files instead of memory.                    |
| `streamToFilePath`        | generated                            | Output path when streaming.                                                  |
| `maxFileSize` / `maxFiles`| `100MB` / `5`                        | Rotation settings for streamed files.                                        |
| `logLevel`                | `"info"`                             | pino log level.                                                              |
| `bulkConcurrency`         | `5`                                  | Concurrent operations for bulk mutations.                                    |
| `bulkBatchSize`           | `10`                                 | Items per bulk batch.                                                        |
| `bulkContinueOnError`     | `true`                               | Keep going after a failed item.                                              |
| `bulkCheckpointing`       | `true`                               | Persist progress so bulk runs can resume.                                    |
| `bulkCheckpointInterval`  | `50`                                 | Save state every N operations.                                               |
| `bulkCheckpointDir`       | `~/twingate-node-cache/checkpoints`  | Checkpoint directory.                                                        |

All requests go through `withRetries`, which applies retry/backoff, honors `Retry-After` on 429s, and enforces the read/write rate limits. Requests send a `User-Agent` of `twingate-node/<version>`.

---

## 📚 API Reference

Entities: `accessRequests`, `connectors`, `devices`, `dnsFilteringProfiles`, `groups`, `kubernetesResources`, `remoteNetworks`, `resources`, `securityPolicies`, `serialNumbers`, `serviceAccountKeys`, `serviceAccounts`, `users`.

Every entity supports:

| Method                  | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `get(options)`          | Fetch one page of results                       |
| `getOne(id)`            | Fetch a single record by ID                     |
| `getAll(options)`       | Fetch all results by paginating automatically   |
| `getFragment()`         | Return the GraphQL fragment as a string         |
| `getQuery()`            | Return the full GraphQL query as a string       |
| `getAvailableMethods()` | List the methods available on the entity        |

Entity-specific mutations include `create` / `update` / `delete` (most entities), `accessRequests.approve/reject`, `connectors.generateTokens`, `devices.archive/unarchive/block/unblock`, `serviceAccountKeys.revoke`, `users.detailsUpdate/roleUpdate/resetMfa`, and `resources.accessAdd/accessSet/accessRemove`.

> `getAll(options)` accepting `streamToFile` / `resumeOperationId` is currently wired up for `resources` and `groups` only (see TODO.md).

### Bulk operations (`resources`)

```javascript
const results = await client.resources.createBulk(items); // items: array of resourceCreate variables
// results => { total, successful: [...], failed: [...] }

await client.resources.updateBulk(items);
await client.resources.deleteBulk(ids);
await client.resources.retryFailedUpdates(results.failed);
await client.resources.retryFailedDeletes(results.failed);
```

See `examples/demo-write-createMany.js` and `examples/demo-write-deleteAll.js`.

## 🛠️ Contribution Policy

Currently, this repository is **not open for contributions** or feature requests. If you encounter issues, feel free to fork the repository and experiment as needed.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Special thanks to the Twingate team for their comprehensive API documentation. This library is based on their public GraphQL API, which you can explore at [twingate.com/docs/api](https://www.twingate.com/docs/api).

---

## Cache Directory Structure

For operations that involve fetching or modifying data, the client caches the results to optimize performance and reduce API calls. The cache directory is structured as follows:

```bash
~/twingate-node-cache/operations/
└── [operation-id]/
    ├── checkpoint.json
    ├── operation-summary.json
    └── results/
        ├── fetched-data.jsonl           (for read operations)
        ├── successful-operations.jsonl  (for write operations)
        └── failed-operations.jsonl      (for write operations)
```

- **checkpoint.json**: Stores the last checkpoint (current cursor and counts) for resumable operations.
- **operation-summary.json**: Contains a summary of the operation, including status and metadata.
- **results/**: A directory containing the results of the operation, stored in JSON Lines format. Separate files are used for successful and failed operations to facilitate easier processing and retrying of failed operations.

1. For Read Operations (fetchAllPages):

- checkpoint.json - Contains the current cursor and counts
- fetched-data.jsonl - Contains the actual fetched data
- operation-summary.json - Contains operation statistics

2. For Write Operations (processBulkMutations):

- checkpoint.json - Contains processed indices and counts
- successful-operations.jsonl - Records successful updates
- failed-operations.jsonl - Records failed updates
- operation-summary.json - Contains operation statistics

### Resuming an Operation

To resume an interrupted operation:

```javascript
// For reading resources
client.resources.getAll({
  resumeOperationId: "previous-operation-id",
});

// For updating resources
client.resources.updateBulk(items, {
  resumeOperationId: "previous-operation-id",
});
```


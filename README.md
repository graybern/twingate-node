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
│   ├── client.js               # Main client logic
│   ├── graphql/
│   │   ├── queries.js          # GraphQL query definitions
│   │   ├── mutations.js        # GraphQL mutation definitions
│   │   └── fragments.js        # Common reusable GraphQL fragments
│   ├── resources/              # Higher-level abstractions
│   │   ├── serviceAccounts.js
│   │   ├── networkResources.js
│   │   ├── users.js
│   │   └── ...
│   └── utils/
│       ├── retry.js            # Retry and exponential backoff logic
│       ├── pagination.js       # Helper functions for pagination
│       └── fetchWrapper.js     # Abstraction for fetch requests
├── tests/                      # Tests for the library
├── examples/                   # Example usage scripts
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
├── package.json                # npm package configuration
├── README.md                   # Documentation for usage
└── LICENSE                     # License file
```

---

## 🛠️ Installation

To install the library, use `npm` or `yarn`:

```bash
npm install twingate-node
# or
yarn add twingate-node
```

---

## 🚀 Usage

### Basic Setup

```javascript
const { TwingateClient } = require("twingate-node");

const client = new TwingateClient({
  apiKey: "your-api-key-here", // Replace with your Twingate API key
});

// Example: Fetch all service accounts
client.serviceAccounts
  .list()
  .then((response) => {
    console.log("Service Accounts:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### Configuration Options

When initializing the `TwingateClient`, you can provide the following options:

| Option    | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| `apiKey`  | String | Your Twingate API key (required).                                            |
| `baseUrl` | String | The base URL for Twingate API (default: `https://api.twingate.com/graphql`). |
| `timeout` | Number | Timeout for API requests in milliseconds (default: `5000`).                  |
| `retries` | Number | Number of retries for failed requests (default: `3`).                        |

Centralized Retry Logic:

Wrapping all requests with withRetries ensures that every query and mutation benefits from the same retry logic.
Customizable Options:

The retry count, backoff factor, and timeout are configurable, making the client versatile for different use cases.
Rate Limit Handling:

The use of the Retry-After header for 429 responses ensures graceful handling of rate limits.

---

## 📚 API Reference

The client provides methods for interacting with Twingate resources, including:

| **Method**                | **Purpose**                                         | **Name Recommendation**          |
| ------------------------- | --------------------------------------------------- | -------------------------------- |
| **Get Paginated Results** | Fetch paginated data                                | `resource.get()`                 |
| **Get Single Result**     | Fetch a single record by ID or key                  | `resource.getOne()`              |
| **Get All Results**       | Fetch all results without pagination                | `resource.getAll()`              |
| **Get GQL Fragment**      | Return the GraphQL fragment as a string             | `resource.getFragment()`         |
| **Get Full GQL Query**    | Return the full GraphQL query as a string           | `resource.getQuery()`            |
| **Get Available Methods** | Return a list of available methods for the resource | `resource.getAvailableMethods()` |
| **Update Resource**       | Update a resource                                   | `resource.update()`              |
| **Create Resource**       | Create a resource                                   | `resource.create()`              |
| **Delete Resource**       | Delete a resource                                   | `resource.delete()`              |

---

### **Examples of Usage**

#### Fetch Paginated Results:

```javascript
const users = await client.users.get({ page: 1, size: 20 });
```

#### Fetch a Single Record:

```javascript
const user = await client.users.getOne(userId);
```

#### Fetch All Results:

```javascript
const allUsers = await client.users.getAll();
```

#### Fetch GQL Fragment:

```javascript
const fragment = client.users.getFragment();
```

#### Fetch Full GQL Query:

```javascript
const query = client.users.getQuery();
```

#### Fetch Available Methods:

```javascript
const methods = client.users.getAvailableMethods();
```

#### Update a Resource:

```javascript
await client.users.update(userId, userData);
```

#### Create a Resource:

```javascript
await client.users.create(newUser);
```

#### Delete a Resource:

```javascript
await client.users.delete(userId);
```

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

---

Let me know if you’d like further refinements or additional sections!

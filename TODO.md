# TODO

Known issues and next steps. Longer-term design ideas (CLI, API explorer/visualizer) live in `PLANNING.md`.

## Bugs / cleanup

- [ ] **Tests don't run.** `npm test` fails on all 3 suites: Jest isn't configured for ESM (`"type": "module"`) and the tests import stale paths (e.g. `src/resources/queries/users.js`). Fix with `NODE_OPTIONS=--experimental-vm-modules jest` (or a babel transform) and update imports.
- [ ] **`getAll()` passes `{ logger }` as GraphQL variables** in every entity except `resources` and `groups`. Port the `groups.getAll(options)` pattern (`fetchAllPages(client, query, name, {}, options)`) to: accessRequests, connectors, devices, dnsFilteringProfiles, kubernetesResources, remoteNetworks, securityPolicies, serialNumbers, serviceAccountKeys, serviceAccounts, users.
- [ ] License mismatch: `LICENSE`/README say MIT, `package.json` says ISC.
- [ ] `package.json` `main` points to `index.js`, which doesn't exist (entry is `src/client.js`).
- [ ] `.env.example` lists `TWINGATE_API_READ_LIMIT`, `_WRITE_LIMIT`, `_TIMEOUT`, `_RETRIES`, `TWINGATE_DEBUG`, but nothing reads them; examples hardcode options.

## Features

- [ ] Bulk create/update/delete for entities other than `resources` (groups, users, remote networks, ...).
- [ ] True batched mutations (`bulkBatchSize > 1` currently throws in `createBulk`).
- [ ] Filtering for `getAll`.
- [ ] Auto-generated method docs (see PLANNING.md).

## Release

- [ ] GitHub Actions: run tests on PR; release + publish to npm on tag. (No workflows exist yet.)

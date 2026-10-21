# CLAUDE.md

Unofficial, experimental Node.js client for the Twingate GraphQL API. Public repo (github.com/graybern/twingate-node) — don't commit tenant-specific IDs, API keys, or internal/staging hostnames.

## Layout

- `src/client.js` — `twingate(tenantName, apiKey, options)` factory (default export).
- `src/TwingateClient.js` — options/defaults, pino logger, `GraphQLClient`, `request()` wrapped in `withRetries`.
- `src/resources/<entity>.js` — one module per entity, registered in `src/resources/_index.js` and attached as `client.<entity>`.
- `src/graphql/{queries,mutations}/<entity>/` — GraphQL documents; `fragments.js` for shared fields.
- `src/utils/` — `withRetries` (retry/backoff/rate limit), `fetchAllPages` (pagination, streaming, checkpoint/resume), `processBulkMutations` (bulk writes with checkpointing).

## Conventions

- ESM only (`import`/`export`, `.js` extensions in imports).
- Each entity exposes `get`, `getOne`, `getAll`, `getFragment`, `getQuery`, `getAvailableMethods`, plus its mutations.
- Use `client.logger` (pino), not `console`, inside `src/`.
- Writes must pass `isWriteOperation = true` to `client.request` so the write rate limit applies.
- `getAll(options)` should call `fetchAllPages(client, query, "<name>", {}, options)` — see `src/resources/groups.js`.

## Running

- `cp examples/.env.example .env`, set `TWINGATE_API_TENANT` and `TWINGATE_API_KEY`, then `node examples/demo.js`.
- `npm test` is currently broken (ESM + stale imports) — see `TODO.md`.
- No CI/GitHub Actions workflows.

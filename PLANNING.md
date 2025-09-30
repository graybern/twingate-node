- write to file for fetchAll so its not all in memory? gracefully handle disaster recovery for large data sets - file write stream vs memory? SDK or CLI? Include functionality for filtering fetchAll data?
- confirm debug is the right approach for logging
- pushAll function to handle array of object data (mutation requests) - either batching/looping with same exact functionality as fetchAll (rate limiting, exponential backoff, writing progress to file for failure recovery, etc.). Filtering? Have it check potential changes before pushing or have CLI do that?

### CLI Checkpointing and Disaster Recovery Strategy

For long-running `fetchAll` operations (e.g., exporting thousands of records), the CLI should support checkpointing to allow resuming from a failure without starting over. The SDK's `streamToFile` provides the foundation, and the CLI will manage the state.

**Proposed Workflow:**

1.  **Initiating an Export:**

    - When a user runs `twingate-cli export resources`, the CLI will generate a unique `exportId` for the operation.
    - It will create two files:
      - `twingate-exports/resources-export-<timestamp>.json` (the main data file).
      - `twingate-exports/resources-export-<timestamp>.state.json` (the state file).

2.  **State File Content:**

    - The state file will be a simple JSON object tracking the export's progress.
    - Initially, it will look like this:
      ```json
      {
        "exportId": "...",
        "status": "in-progress",
        "lastCompletedPageCursor": null,
        "recordsFetched": 0
      }
      ```

3.  **SDK Interaction:**

    - The CLI will call the SDK's `getAll()` method in a loop, fetching one page at a time, instead of letting `fetchAllPages` run its full course.
    - After successfully fetching a page and writing its contents to the `.json` file, the CLI will update the `.state.json` file with the `endCursor` from that page's `pageInfo`.
      ```json
      {
        "exportId": "...",
        "status": "in-progress",
        "lastCompletedPageCursor": "endCursorOfLastPage",
        "recordsFetched": 50
      }
      ```

4.  **Handling Failures & Resuming:**

    - If the process fails (network error, etc.), the state file remains.
    - When the user re-runs the same export command, the CLI will detect the `.state.json` file.
    - It will read the `lastCompletedPageCursor` and pass it as the `after` variable to the SDK's `get()` method (for a single page) to resume fetching from where it left off.
    - The CLI will append new results to the existing `.json` file.

5.  **Completion:**
    - Once the final page is fetched, the CLI updates the state file to `status: "completed"` and deletes it, leaving only the final JSON output.

This approach keeps the SDK stateless and delegates the responsibility of state management to the higher-level CLI tool, which is a clean separation of concerns.

fetch vs push => get vs post (in memory)
export vs import => fetchAll to memory to file(s) vs from file(s) to memory to pushAll

1. Build tests
2. Ensure documentation automation works for each method
3. Create github workflow based on PR to create a release and push to npm
4. Test local npm dependency for CLI use
5. Features:

- updateList (mutation)
- deleteList (mutation)
- createList (mutation)
- revokeList (mutation) - wrap in FetchAll?
- filtering ()

TODO:

- SCHEMAS NEEDED:
- - Per Query
-      - get()              => fetch single
-      - list()             => fetch up to max page size
-      - listAll()          => paginated fetch
-      - queryFragment()    => fragment used for specific query
-      - queryFull()        => full query with fragment included
- - Per Mutation
-      - update()           => update single
-      - updateMultiple()   => paginated update or batch update?
-      - mutationFragment() => fragment used for specific mutation
-      - mutationFull()     => full mutation with fragment included

/\*\*

- API VISUALIZER
- ===================
- - Fetch: fetchAll for specific sheets and save to database (user selects sheets to fetch => saves to database)
- - Push: pushAll for specific sheets from database (user selects sheets to push via diff check => pushes to Twingate)
- - Export:
-      - From app to file (local) => exports to file from database
-      - From Twingate (remote) to app => select sheets to fetch from Twingate to app, fetches all to database
-      - From Twingate (remote) to file => select sheets to fetch from Twingate to app, fetches all to database, exports database to file
- - Import: pushAll from specific sheets from file (to database, to Twingate => still uses database like import + push)
-      - From file to app (local) => import to database from file
-      - From app to Twingate (remote) => select sheets to push to Twingate from app, pushes to Twingate
-      - From file to Twingate (remote) => import to database from file, select sheets to push to Twingate from app, pushes to Twingate
- ===================
- -
-
- API EXPLORER
- ===================
- - specify variable inputs
- - make query call and receive response in JSON
- - get query gql (supports variables, displaying query)
- - get fragment gql (used for batch queries)
- ===================
- - get() => get specific data
- - list() => get a list of data
- - listAll() => paginate to retrieve all data
- - queryFragment() => return the fragment being used for the query
- - queryFull() => return the full query with fragment included
- - queries/mutations/schema => schema returns list of available queries and mutations to be used as reference
    \*/

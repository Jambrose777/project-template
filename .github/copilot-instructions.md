# Copilot Instructions — project-template

## Project overview

`project-template` is a baseplate for spinning up new local, single-user
applications: a pnpm workspace with a working Next.js frontend, an Express +
SQLite/Drizzle backend behind an OpenAPI-first contract, and an Electron desktop
shell with multi-laptop cloud-sync support already scaffolded end to end.

**Status:** the scaffolding is implemented and working (`GET /health` round-trips
through the full stack, desktop packaging builds successfully). When starting a new
project from this template, replace the product vision in
[docs/planning.md](../docs/planning.md) and add real stories; update this file if the
stack changes.

## Stack

- **Repository:** pnpm workspace — `apps/{backend,frontend,desktop}` and
  `packages/{shared,api-contract}`
- **Frontend:** React (Next.js, App Router) with TypeScript, styled with Tailwind CSS
- **Frontend icons:** Lucide React (`lucide-react`)
- **Backend:** Node.js (Express) with TypeScript
- **API:** REST with an OpenAPI-first contract
  ([packages/api-contract/openapi.yaml](../packages/api-contract/openapi.yaml)),
  validated at runtime with `express-openapi-validator` and consumed by the frontend
  through a typed `openapi-fetch` client
  ([apps/frontend/src/lib/api/client.ts](../apps/frontend/src/lib/api/client.ts))
- **Database:** SQLite with Drizzle ORM
  ([apps/backend/src/database/schema.ts](../apps/backend/src/database/schema.ts));
  migrations live under `apps/backend/drizzle/` and are generated with
  `pnpm --filter @project-template/backend db:generate`
- **Deployment:** local single-user application without authentication
- **Mutation idempotency:** a generic `mutation_idempotency` table plus
  lookup/save/prune helpers
  ([apps/backend/src/idempotency/mutationIdempotency.ts](../apps/backend/src/idempotency/mutationIdempotency.ts))
  let a client retry a mutation with the same idempotency key and safely replay the
  original response instead of repeating the effect.
- **Desktop packaging:** Electron + `electron-builder` in `apps/desktop` — bundles the
  frontend's production build and the backend as two managed local child processes,
  producing unsigned/unnotarized macOS `.dmg` and Windows NSIS installer builds with
  no auto-updater. See [apps/desktop/src/main.ts](../apps/desktop/src/main.ts) for the
  Electron main process and
  [apps/desktop/scripts/prepare-package.mjs](../apps/desktop/scripts/prepare-package.mjs)
  for the packaging build (production `pnpm deploy --legacy` staging +
  `@electron/rebuild` for `better-sqlite3`).
  - `apps/desktop`'s own main/preload code is bundled with esbuild
    ([apps/desktop/scripts/build.mjs](../apps/desktop/scripts/build.mjs)) instead of
    plain `tsc`, so `apps/desktop/package.json` has zero runtime `dependencies` (all
    moved to `devDependencies`) — this prevents electron-builder's automatic
    node-modules dependency collector from attempting a destructive, unscoped
    `pnpm install --production` across the whole pnpm workspace.
  - Both child processes (`apps/desktop/src/processes/backendProcess.ts` and
    `frontendProcess.ts`) set `ELECTRON_RUN_AS_NODE: '1'` in their spawned `env`,
    since a packaged/branded Electron executable always relaunches itself as the
    full app rather than running as plain Node when given a script path via argv —
    unlike the unpacked dev Electron binary, where that heuristic works implicitly.
  - See [docs/stories/ready-for-dev/0001-decide-desktop-app-inclusion.md](../docs/stories/ready-for-dev/0001-decide-desktop-app-inclusion.md)
    for deciding early whether a given project keeps this app at all.
- **Release automation:** [.github/workflows/release.yml](workflows/release.yml)
  builds the macOS `.dmg` and Windows NSIS installer in CI and uploads them as assets
  on the matching GitHub Release. Disabled by default in this template — the `push`
  tag trigger is commented out, so it currently only runs via manual
  `workflow_dispatch` against an existing tag, until
  [docs/stories/ready-for-dev/0003-enable-and-test-release-workflow.md](../docs/stories/ready-for-dev/0003-enable-and-test-release-workflow.md)
  verifies the packaged installers and re-enables the `push` trigger.
  `apps/desktop/package.json`'s
  `build.mac.artifactName`/`build.nsis.artifactName` fix each installer's filename (no
  embedded version number) so the root [README.md](../README.md)'s
  `releases/latest/download/<filename>` links keep resolving to the newest build.
- **Multi-laptop data sync:** the backend owns all of it — an
  `APP_LOCAL_STATE_DIRECTORY` env var (`config.localStateDirectory`) names a
  fixed, always-local directory (Electron passes `app.getPath('userData')`, kept
  separate from the user-configurable, possibly cloud-synced
  `APP_DATA_DIRECTORY`) for rotating backup snapshots
  ([apps/backend/src/sync/backupSnapshots.ts](../apps/backend/src/sync/backupSnapshots.ts),
  which zips the raw SQLite file plus the local files directory) and the
  `.sync-lock.json` machine/timestamp marker
  ([apps/backend/src/sync/syncMarker.ts](../apps/backend/src/sync/syncMarker.ts),
  [directoryState.ts](../apps/backend/src/sync/directoryState.ts)). Before opening
  the database, [server.ts](../apps/backend/src/server.ts)'s async `main()`
  evaluates directory/marker state and, if launch-time confirmation is needed, runs
  a temporary pre-database Express app exposing `GET /startup/status`/
  `POST /startup/confirm` ([routes/startup.ts](../apps/backend/src/routes/startup.ts))
  — the real app mounts the same two routes (always reporting no confirmation
  pending) so a caller can poll one consistent endpoint pair throughout startup.
  Quitting calls `POST /maintenance/prepare-shutdown`
  ([routes/shutdown.ts](../apps/backend/src/routes/shutdown.ts): backup, WAL
  `checkpoint()`, close, `process.exit(0)`) rather than relying on
  `ChildProcess.kill()` alone, since that's not a reliably catchable signal on
  Windows; [apps/desktop/src/main.ts](../apps/desktop/src/main.ts) awaits it before
  falling back to killing the child process directly, and
  [backendProcess.ts](../apps/desktop/src/processes/backendProcess.ts)'s launch
  polling handles the `/startup/status` confirmation handshake via a native
  `dialog.showMessageBox` prompt. The user's chosen data-directory override is
  set via the frontend's `/settings` page (Electron-only —
  [apps/frontend/src/app/settings/page.tsx](../apps/frontend/src/app/settings/page.tsx))
  through an IPC bridge (`window.__DESKTOP_SETTINGS__`,
  [preload.cts](../apps/desktop/src/preload.cts)) and persisted to
  [apps/desktop/src/desktopSettings.ts](../apps/desktop/src/desktopSettings.ts)'s
  `desktop-settings.json`, applying on the next relaunch.
- If you introduce a new dependency or architectural decision, record it in
  [docs/planning.md](../docs/planning.md) and keep this file in sync.

## Working conventions

- Planning and requirements live in [docs/](../docs). Check
  [docs/planning.md](../docs/planning.md) before starting new work — it holds the
  product vision, tech stack, and definition of done.
- Stories live one-per-file under [docs/stories/](../docs/stories/), in three bucket
  folders: `needs-refinement/`, `ready-for-dev/`, and `completed/`. The index at
  [docs/stories/README.md](../docs/stories/README.md) lists every story file and its
  current bucket — check it, and the active story's file, before starting new work.
- The story-derived endpoint index is [docs/api-endpoints.md](../docs/api-endpoints.md).
  Keep it synchronized with explicitly defined routes in the story files under
  `docs/stories/`; [packages/api-contract/openapi.yaml](../packages/api-contract/openapi.yaml)
  remains the implementation source of truth.
- The story-derived object and property index is [docs/data-types.md](../docs/data-types.md).
  Keep it synchronized with confirmed data-model decisions in the story files under
  `docs/stories/`; do not treat fields marked **TBD** as implemented contracts.
- When continuing the story technical-requirements interview, follow
  [docs/story-requirements-workflow.md](../docs/story-requirements-workflow.md) for the
  one-question workflow, current stopping point, and unresolved decisions.
- Project coding conventions live in
  [.github/instructions/coding-conventions.instructions.md](instructions/coding-conventions.instructions.md).
  Apply them whenever writing, reviewing, or refactoring application code.
- Always add helpful comments to code blocks, especially to explain their purpose,
  control flow, and non-obvious implementation decisions.
- Prefer small, incremental changes. Add new stories as new files in
  `docs/stories/needs-refinement/` (updating the index at
  [docs/stories/README.md](../docs/stories/README.md)) unless the user specifies a
  different bucket.
- Run `pnpm format` after repository edits that Prettier supports; use
  `pnpm format:check` for non-mutating formatting verification. Run
  `pnpm typecheck`, `pnpm lint`, and `pnpm test` before considering a change done.
- Keep this file up to date as the project evolves — it is the primary onboarding doc
  for AI coding agents working in this repo.

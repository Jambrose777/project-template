# Project Planning — Project Template

This doc is the starting point for planning and tracking development. Update it as the
product direction and backlog evolve for the project built from this template.

## Product vision

TBD. Replace this section with the new project's actual product vision once decided.

## Tech stack

- Frontend: React (Next.js)
- Frontend styling: Tailwind CSS
- Backend: Node.js (Express)
- Language: TypeScript
- API: REST with an OpenAPI-first contract (`packages/api-contract`)
- Database: SQLite with Drizzle ORM
- Authentication: None for the initial local single-user version
- Hosting: Local machine for the initial version
- Desktop packaging: Electron + `electron-builder`, bundling the Next.js frontend and
  Express backend as two managed local child processes in `apps/desktop`;
  unsigned/unnotarized macOS `.dmg`/Windows NSIS installer builds, no auto-updater.
  `apps/desktop`'s own main/preload code is bundled with esbuild
  (`apps/desktop/scripts/build.mjs`) rather than plain `tsc`, so its `package.json`
  carries zero runtime `dependencies` — this keeps electron-builder's automatic
  node-modules dependency collector from finding anything to resolve, which otherwise
  risks triggering a destructive, unscoped `pnpm install --production` across the
  whole workspace in this pnpm monorepo. Both the backend and frontend child processes
  are spawned with `ELECTRON_RUN_AS_NODE: '1'` in their `env`, since a packaged/branded
  Electron executable (unlike the unpacked dev binary) always relaunches itself as the
  full app rather than running as plain Node when given a script path via argv. See
  the early backlog story deciding whether to keep the desktop app at all for a given
  project built from this template.
- Release automation: [.github/workflows/release.yml](../.github/workflows/release.yml)
  builds the macOS `.dmg` and Windows NSIS installer in CI (on `macos-latest`/
  `windows-latest` GitHub-hosted runners) and uploads them as assets on the matching
  GitHub Release. Disabled by default in this template — the `push` tag trigger is
  commented out, so it currently only runs via manual `workflow_dispatch` against an
  existing tag, until the early backlog story for enabling/testing this workflow
  verifies the packaged installers and re-enables the `push` trigger.
  `apps/desktop/package.json`'s `build.mac.artifactName`/
  `build.nsis.artifactName` fix each installer's filename (no embedded version number),
  so the root [README.md](../README.md)'s `releases/latest/download/<filename>` links
  keep resolving to the newest build across releases.
- Multi-laptop data sync: a settings-screen folder picker lets the user point the
  existing `APP_DATA_DIRECTORY` at a folder managed by a consumer cloud-sync client
  (Dropbox/iCloud Drive/OneDrive/Google Drive, handled provider-agnostically). The app
  checkpoints and cleanly closes SQLite's WAL on quit so a single self-contained `.db`
  file is left for the sync client to pick up, tracks a `.sync-lock.json` marker to
  warn (advisory only) when another laptop recently had the data open or the directory
  looks mid-sync, and automatically writes a rotating local (non-synced) backup
  snapshot before any risky operation. This remains local-first with no hosted server
  or real-time concurrent editing — only one laptop is expected to have the app open
  at a time.

## Story backlog

Stories live one-per-file under [docs/stories/](stories/), organized into three bucket
folders: [`completed/`](stories/completed/), [`ready-for-dev/`](stories/ready-for-dev/),
and [`needs-refinement/`](stories/needs-refinement/). The index at
[docs/stories/README.md](stories/README.md) lists every story file and its current
bucket — check it, and the active story's file, before starting new work.

Each story file keeps behavioral outcomes under a `#### Acceptance criteria` heading and
implementation, API, storage, and testing choices under a separate `#### Technical
requirements` heading, defined as decisions are made.

Each story file also carries a `**Status:**` marker of `Not started`, `In progress`, or
`Done`, tracking implementation progress in place. This is independent from the
requirements-writing bucket (which folder the file lives in) and from the
requirements-writing progress tracked in
[story-requirements-workflow.md](story-requirements-workflow.md); a story can have
complete acceptance criteria and technical requirements (i.e. live in
`ready-for-dev/`) while its status is still `Not started`. Update the marker in place
as work progresses. When a story becomes `Done`, append the completion date and time in
parentheses, e.g. `Done (2026-08-17 12:00 EDT)`, move its file into
[`completed/`](stories/completed/), and update the row in
[docs/stories/README.md](stories/README.md).

Add new stories as new files in [`needs-refinement/`](stories/needs-refinement/),
following the same format, starting with `**Status:** Not started` and `TBD`
acceptance criteria and technical requirements, then add a row to
[docs/stories/README.md](stories/README.md). Skip straight to
[`ready-for-dev/`](stories/ready-for-dev/) only when the story's requirements are
already fully known.

## Definition of done (draft)

- Story's acceptance criteria are all met.
- No console errors/warnings introduced.
- Basic tests added/updated if a test setup exists.
- The story's `**Status:**` marker is updated to `Done`, its file is moved from
  `ready-for-dev/` into [`completed/`](stories/completed/), and
  [docs/stories/README.md](stories/README.md) is updated to match.

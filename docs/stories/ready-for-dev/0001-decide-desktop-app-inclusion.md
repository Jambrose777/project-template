# 1. Decide whether to keep the desktop app

**Status:** Not started

#### Acceptance criteria

- Early in a new project built from this template, a decision is made and recorded
  (in this story and in [docs/planning.md](../../planning.md)) on whether the project
  needs the Electron desktop app (`apps/desktop`), the multi-laptop cloud-sync
  handshake (`apps/backend/src/sync/`, `routes/startup.ts`, `routes/shutdown.ts`), and
  the desktop `/settings` page (`apps/frontend/src/app/settings/`).
- If the project does not need a desktop app, `apps/desktop`, the sync/startup/shutdown
  backend pieces, the `/settings` frontend page, the `/startup/*` and
  `/maintenance/prepare-shutdown` OpenAPI paths, and
  [.github/workflows/release.yml](../../../.github/workflows/release.yml) are removed,
  and the backend is simplified back to a plain `app.listen()` with signal-based
  shutdown (no launch-time confirmation gate, no backup snapshots).
- If the project does need a desktop app, this story is marked done as-is with no
  removal needed, since the template already ships the full desktop/sync scaffolding
  working end to end.

#### Technical requirements

- No new technical requirements beyond the removal steps above, since this story is a
  scoping decision rather than new functionality.

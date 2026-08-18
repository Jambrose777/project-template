# 3. Review the overall architecture and decide on changes

**Status:** Not started

#### Acceptance criteria

- Once the product vision (story 2) is written, the starting architecture described
  in [docs/planning.md](../../planning.md)'s `## Tech stack` section and the
  [README.md](../../../README.md) architecture table/diagram is reviewed against the
  new product's actual needs, covering at minimum:
  - Whether the REST + OpenAPI-first contract, SQLite/Drizzle, and Express/Next.js
    stack still fit, or whether the product needs something the template doesn't
    provide (e.g. a different database engine, background jobs, external
    integrations, file storage beyond local files).
  - Whether "no authentication, local single-user only" still holds, or the product
    needs auth/multi-user support.
  - Whether "local machine" hosting still holds, or the product needs to be deployed
    somewhere.
- As part of this same review, every workspace dependency (root and each
  `apps/*`/`packages/*` package.json, plus the pinned Node.js/pnpm versions in the
  README's prerequisites) is checked against its latest available version, and
  upgraded where a newer version is available and compatible with the rest of the
  stack:
  - Each candidate upgrade is checked for breaking changes (changelog/release notes)
    before applying it, and the workspace's `pnpm typecheck`, `pnpm lint`, and
    `pnpm test` are run afterward to confirm nothing regressed.
  - Any dependency that can't be safely upgraded yet (e.g. a breaking major version
    the codebase isn't ready for) is left as-is with a note recorded in this story
    explaining why, rather than forcing an incompatible upgrade.
- As part of this same review, a decision is made and recorded in this story on
  whether the project needs the Electron desktop app (`apps/desktop`), the
  multi-laptop cloud-sync handshake (`apps/backend/src/sync/`, `routes/startup.ts`,
  `routes/shutdown.ts`), and the desktop `/settings` page
  (`apps/frontend/src/app/settings/`):
  - If the project does not need a desktop app, `apps/desktop`, the
    sync/startup/shutdown backend pieces, the `/settings` frontend page, the
    `/startup/*` and `/maintenance/prepare-shutdown` OpenAPI paths, and
    [.github/workflows/release.yml](../../../.github/workflows/release.yml) are
    removed, and the backend is simplified back to a plain `app.listen()` with
    signal-based shutdown (no launch-time confirmation gate, no backup snapshots) —
    [docs/planning.md](../../planning.md) is updated to match, since this is a real
    change.
  - If the project does need a desktop app, the scaffolding is kept as-is, since the
    template already ships the full desktop/sync scaffolding working end to end —
    no `docs/planning.md` edit is needed for this outcome.
- The design system review (story 4) is treated as a separate, sibling story and is
  not duplicated here.
- For each area reviewed, the decision is recorded in this story file. Only areas
  that actually change are also reflected in
  [docs/planning.md](../../planning.md) (updating the relevant tech-stack bullet) —
  a "kept as-is" decision doesn't need a corresponding planning.md edit, since
  planning.md already describes the as-shipped default and restating "unchanged"
  there would just be noise.
- Any change that requires actual implementation work (not just a doc update or the
  desktop-app removal above) is captured as one or more new story files in
  [docs/stories/needs-refinement/](../needs-refinement/), with the index at
  [docs/stories/README.md](../README.md) updated to match, rather than being
  implemented inline as part of this review.
- If no changes are needed anywhere (including keeping the desktop app as-is), this
  story is marked done with a note in its own file confirming the architecture was
  reviewed and kept as-is.

#### Technical requirements

- No new technical requirements beyond the review/decision/removal steps above,
  since this story is a scoping pass — any resulting technical requirements belong
  to the new story file(s) it spins off.

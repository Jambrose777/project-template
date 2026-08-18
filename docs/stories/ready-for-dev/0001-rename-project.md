# 1. Rename the project from `project-template`

**Status:** Not started

#### Acceptance criteria

- A real project name (and matching pnpm workspace package scope, e.g.
  `@my-app/shared`) is chosen and recorded in
  [docs/planning.md](../../planning.md).
- Every occurrence of the `project-template` name and the `@project-template/*`
  package scope is replaced with the new name/scope throughout the repository,
  including at minimum:
  - The root `"name"` field in [package.json](../../../package.json) and every
    `--filter @project-template/*` script in it.
  - The `"name"` field and `@project-template/*` workspace dependencies in each
    app/package's own `package.json`
    (`apps/backend`, `apps/frontend`, `apps/desktop`, `packages/api-contract`,
    `packages/shared`).
  - Every `@project-template/*` import specifier in application source
    (e.g. `apps/backend/src/**`, `apps/desktop/src/**`,
    `apps/frontend/src/lib/api/client.ts`) and the Jest module-name-mapper entries
    that resolve that scope (`apps/backend/jest.config.mjs`,
    `apps/frontend/jest.config.mjs` if present).
  - The `artifactName` values in
    [apps/desktop/package.json](../../../apps/desktop/package.json)
    (`build.mac.artifactName`/`build.nsis.artifactName`), and comment references to
    the scope in `apps/desktop/scripts/build.mjs` and
    `apps/desktop/scripts/prepare-package.mjs`.
  - The `pnpm --filter @project-template/desktop package:mac`/`package:win` commands
    in [.github/workflows/release.yml](../../../.github/workflows/release.yml).
  - The root [README.md](../../../README.md) title, description, and the GitHub
    Releases download links (org/repo name and asset filenames), updated to match
    the project's actual GitHub repository once it's renamed or created.
  - The title in [.github/copilot-instructions.md](../../../.github/copilot-instructions.md)
    and the `project-template` mentions in
    [.github/agents/developer.agent.md](../../../.github/agents/developer.agent.md),
    [.github/agents/product-owner.agent.md](../../../.github/agents/product-owner.agent.md),
    and
    [.github/instructions/styling.instructions.md](../../../.github/instructions/styling.instructions.md).
- If the GitHub repository itself is also renamed (or the project is moved to a new
  repository), the README's download links and any other hard-coded repository URLs
  are updated to match — this is a manual step outside the codebase and is called
  out explicitly rather than assumed.
- After the rename, `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, and
  `pnpm --filter <new-desktop-scope> package:mac`/`package:win` (or at least a dry
  run/build) all succeed, confirming no stale `@project-template/*` reference was
  missed.

#### Technical requirements

- No new technical requirements beyond the mechanical rename steps above, since this
  story does not change behavior — it only renames identifiers and prose.

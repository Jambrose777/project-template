# 2. Write the product vision and update the top-level docs

**Status:** Not started

#### Acceptance criteria

- The `## Product vision` section in [docs/planning.md](../../planning.md) is
  rewritten from its `TBD` placeholder to describe the new project's actual purpose:
  what it does, who it's for, and the key problem(s) it solves.
- The top description in the root [README.md](../../../README.md) (the introductory
  paragraph(s) before the "Download"/"Architecture" sections) is rewritten to
  describe the new project itself rather than the template — while still crediting
  this repository as the starting template if desired.
- Any other prose in the repo that still describes the generic template purpose
  instead of the actual product is identified and updated to match, or explicitly
  left as a follow-up TBD if out of scope for this pass. Found so far (re-check for
  drift before relying on this list, since it was captured at one point in time):
  - The frontend header's brand text and its test assertion:
    [AppHeader.tsx](../../../apps/frontend/src/shared/navigation/AppHeader.tsx)'s
    `"Project Template"` link text and
    [AppHeader.test.tsx](../../../apps/frontend/tests/shared/navigation/AppHeader.test.tsx)'s
    matching assertion.
  - The desktop app's window title and packaging identity (only relevant if story 3
    keeps the desktop app): [main.ts](../../../apps/desktop/src/main.ts)'s
    `BrowserWindow` `title`, and
    [apps/desktop/package.json](../../../apps/desktop/package.json)'s
    `build.productName`/`build.appId`.
  - [docs/planning.md](../../planning.md)'s own top-level heading
    (`# Project Planning — Project Template`).
  - [.github/copilot-instructions.md](../../../.github/copilot-instructions.md)'s
    title and `## Project overview` section, which currently describes the generic
    "baseplate for spinning up new local, single-user applications" purpose rather
    than the actual product.
  - Renaming the `@project-template/*` package scope itself, and the
    `project-template` mentions in `.github/agents/*.agent.md` and
    `.github/instructions/styling.instructions.md`, is mechanical and already
    covered by story 1 — not duplicated here.
- This story does not itself decide the desktop app's fate, the design system, or
  the wider architecture — those are covered by the sibling architecture-review
  story (story 3) in this bucket.

#### Technical requirements

- No new technical requirements beyond the documentation updates above, since this
  story is a content pass rather than new functionality.

# 5. Enable and test the release workflow

**Status:** Not started

#### Acceptance criteria

- [.github/workflows/release.yml](../../../.github/workflows/release.yml) is disabled
  by default in this template — its `push` tag trigger is commented out, so it only
  runs via manual `workflow_dispatch` against an existing tag. This story is about
  turning it back on for a real project, once the desktop app decision (story 3) has
  been made to keep `apps/desktop`.
- The macOS build (`pnpm --filter @project-template/desktop package:mac`) and Windows
  build (`pnpm --filter @project-template/desktop package:win`) are each run at least
  once — via manual `workflow_dispatch` against a real tag — and the resulting
  installer from each platform is downloaded and actually launched/exercised on that
  platform to confirm the packaged executable works (not just that the build step
  succeeds), before relying on the workflow for real releases.
- Once both installers have been verified, the `push` tag trigger in `release.yml` is
  uncommented so pushing a `v*.*.*` tag resumes triggering automatic releases.
- If the project decided in story 3 not to keep the desktop app, this story is marked
  done as not-applicable instead, since `release.yml` is removed as part of that
  decision.

#### Technical requirements

- No new technical requirements beyond the verification/re-enabling steps above.

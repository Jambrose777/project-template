# 4. Review and adjust the design system for this project

**Status:** Not started

#### Acceptance criteria

- Early in a new project built from this template, the starting design system —
  the `@theme` tokens in
  [globals.css](../../../apps/frontend/src/app/globals.css), the conventions in
  [styling.instructions.md](../../../.github/instructions/styling.instructions.md),
  and the `/style-guide` reference page
  (`apps/frontend/src/app/style-guide/page.tsx`) — is reviewed against the new
  project's actual product and adjusted as needed: color palette, typography scale,
  spacing/breakpoint/radius tokens, and any of the documented interactive-component
  conventions (modals, toasts, tooltips, forms, drag-and-drop, virtualization).
- Any token or convention that changes is updated consistently in all three places
  above (tokens, written conventions, and the visual reference page) so they never
  drift out of sync.
- The project's actual dependencies match what `/style-guide` documents: if a
  pattern's dependency (`@dnd-kit/*`, `@tanstack/react-virtual`, etc.) is adopted,
  it's added to `apps/frontend/package.json`; if a documented pattern is removed
  instead, no unused dependency is added for it.

#### Technical requirements

- No new technical requirements beyond the review/adjustment steps above, since this
  story is a scoping and consistency pass rather than new functionality.

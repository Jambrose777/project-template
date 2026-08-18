---
description: 'Use when writing, reviewing, or refactoring frontend UI code. Defines the visual design system and styling conventions for project-template.'
applyTo: 'apps/frontend/**'
---

# Styling Conventions

This file records the agreed visual design system for the frontend, built incrementally
during the "Create styling documentation" story (see `docs/planning.md`). It is updated
in place as more decisions are made — check back as it grows, and do not treat missing
sections as decided.

## Styling method

- Tailwind CSS v4 is the only styling approach for the frontend. Do not add CSS-in-JS
  or a component/utility library other than Tailwind.
- Design tokens are defined once in the CSS-first `@theme` block in
  `apps/frontend/src/app/globals.css` and consumed everywhere else through the Tailwind
  utility classes they generate (e.g. `bg-primary`, `text-heading`, `font-bold`,
  `rounded-standard`). Do not hardcode hex colors, font sizes, font weights, or border
  radii in component code — add or reuse a token instead.
- Interactive components (modals, toasts, comboboxes, etc.) are built fully custom. Do
  not add a headless/component UI library (e.g. Radix, shadcn) for dialog semantics,
  focus trapping, or similar behavior — implement it directly.
- A living visual reference of every token and documented UI pattern renders at the
  `/style-guide` route (`apps/frontend/src/app/style-guide/page.tsx`). It's the same
  starting basis for every project built from this template — keep it in sync
  whenever tokens or conventions change, and see the early backlog story for
  reviewing/adjusting it for a specific project's needs.

## Color palette

- Background: `--color-background` (`#1D2731`).
- Surface, for elevated panels/cards/modals: `--color-surface` (`#0B3C5D`).
- Primary accent: `--color-primary` (`#328CC1`).
- Secondary accent: `--color-secondary` (`#D9B310`).
- Semantic: `--color-success` (`#3FA34D`), `--color-error` (`#D6483D`),
  `--color-warning` (`#8A94A6`).
- Neutral scale (blue-slate hued, not true gray): `--color-neutral-900` through
  `--color-neutral-100`.
- The app is dark-theme only; there is no light theme and no
  `prefers-color-scheme` branching.
- Primary-colored text/links on the background sit close to the WCAG AA text-contrast
  threshold (~4.1:1). Prefer the primary color for large/bold text, icons, and filled
  buttons; avoid it for small body text directly on the background color.

## Typography

- Font family: Inter, loaded via `next/font/google` in `layout.tsx` as `--font-inter`,
  referenced by the Tailwind `--font-sans` theme variable.
- Exactly 4 type steps exist project-wide (Tailwind's default font-size scale is reset
  so no other sizes are available): `text-heading` (2rem), `text-subheading`
  (1.25rem), `text-body` (1rem), `text-caption` (0.85rem).
- Exactly 2 font weights exist project-wide (Tailwind's default font-weight scale is
  reset): `font-regular` (400) and `font-bold` (700).
- Bare `h1`/`h2`/`h3`/`small` elements are already styled with these tokens by default
  in `globals.css`; only add explicit utility classes when overriding that default.

## Spacing

- No custom spacing tokens — use Tailwind's default numeric spacing scale directly
  (`p-2`, `gap-4`, `m-6`, `w-8`, etc.). It already lands on the agreed 8px-based steps:
  `2`=8px, `4`=16px, `6`=24px, `8`=32px, `12`=48px, `16`=64px, `24`=96px. Prefer these
  values over arbitrary/one-off spacing.

## Breakpoints & layout

- Tailwind's default breakpoint scale is reset; the only breakpoint is `desktop`
  (`1024px`), matching the supported desktop-only viewport. Do not add
  `sm:`/`md:`/`lg:`/`xl:`/`2xl:` variants.
- Page content has no max-width container and fills the full viewport width.

## Border radius

- Tailwind's default radius scale is reset to exactly two values:
  - `rounded-standard` (8px) — the default for buttons, panels, inputs, modals, and
    cards.
  - `rounded-full` — reserved for pills/circular shapes (e.g. icon buttons, badges).

## File organization

- Shared, reusable UI components live under `src/shared/`, organized by _type_
  (not by feature/domain), e.g. `src/shared/buttons/`, `src/shared/modals/`,
  `src/shared/forms/`, `src/shared/feedback/`.
- One component per file, named after the component in PascalCase, e.g.
  `src/shared/modals/ConfirmationModal.tsx`.
- Components used by only a single route stay colocated in that route's folder
  using Next.js's private `_components/` convention, e.g.
  `src/app/settings/_components/SettingsForm.tsx` — do not put
  single-use components in `src/shared/`.
- Keep any piece of code (components, types, hooks, etc.) colocated with the one
  place that uses it. Only promote it to a shared location once a second place
  actually needs it — e.g. a type used by one route stays colocated there; once a
  second consumer needs it, move it to `src/shared/types/`.
- Tests live in a top-level `tests/` directory that mirrors the `src/` tree,
  rather than being colocated next to the source file. For example,
  `src/shared/modals/ConfirmationModal.tsx` is tested by
  `tests/shared/modals/ConfirmationModal.test.tsx`.

## Interactive states

- **Hover** on buttons/links: slightly lighten the element (e.g. a `brightness`
  increase) rather than swapping to a different token color, so the same treatment
  works consistently regardless of the element's base color.
- **Cursor**: `<button>` elements get an explicit `cursor-pointer` — browsers
  render native buttons with `cursor: default`, not a pointer, unlike `<a>`
  tags (which already default to a pointer and don't need the class).
- **Disabled**: reduced opacity (e.g. `opacity-50`) plus `cursor-not-allowed`,
  applied consistently across buttons and inputs.
- **Hover-revealed actions** (e.g. row/list-item controls): hidden by default, then
  slide in/out — as if emerging from behind the parent element — on mouse hover over
  it, with a short/snappy transition (~150ms, ease-out).

## Iconography

- Icons come from `lucide-react` exclusively. Use its default stroke width (`2`) —
  don't override it per icon.
- Icons inherit color from the surrounding text via `currentColor` (lucide's
  default) rather than being given an explicit fill/stroke color; set color on a
  wrapping/parent element instead.
- Exactly 5 icon sizes, matching Tailwind's default `size-*` scale (no custom
  tokens needed):
  - `size-4` (16px) — inline alongside `text-caption`/`text-body`, small
    indicators.
  - `size-5` (20px) — default for buttons and most standalone UI icons.
  - `size-6` (24px) — larger/prominent icons (headers, empty-state
    illustrations).
  - `size-8` (32px) — prominent standalone icons needing more visual weight
    than `size-6` (e.g. a page's own loading spinner).
  - `size-10` (40px) — the largest available; the most prominent
    standalone icon placements (e.g. a full list/page's own loading state).

## Elevation & surfaces

- Elevation is communicated with both the `--color-surface` background (see Color
  palette) and a drop shadow. Tailwind's default shadow scale is reset to exactly 2
  steps, defined in `globals.css`:
  - `shadow-panel` — a subtle lift for cards and flat panels (e.g. the unplaced-cards
    panel, notes panel).
  - `shadow-modal` — a stronger lift for anything that floats above the page (modals,
    dropdowns, popovers).
- Modals show a dimmed backdrop behind them, covering the rest of the page — a
  slightly-darkened overlay (e.g. `bg-black/40`), not a heavy/near-opaque one.

## Forms & inputs

- Text inputs, selects, and textareas use a filled style: a `neutral-800`
  background with no visible border by default (`border-transparent`), rather
  than an outlined style with a visible resting border.
- Focus: the border becomes `primary`-colored (`focus:border-primary`); pair
  with `focus:outline-none` since the filled border is the indicator.
- Error/validation state: the border, background, and an outer ring are all
  tinted with `--color-error` (e.g. `border-error bg-error/10 ring-2 ring-error`),
  and any error message rendered below the field also uses `text-error`.
- Checkboxes and radios are custom-styled to match the app (not left as
  browser-default controls): use `appearance-none` plus the native `checked:`
  state directly on the input (no extra JS needed) — `checked:bg-primary
checked:border-primary`, `rounded-standard` for checkboxes and
  `rounded-full` for radios. Checkboxes also show a checkmark icon
  (`lucide-react`'s `Check`) layered over the box, revealed via a `peer`/
  `peer-checked:opacity-100` pairing so it only appears once checked.

## Modals

- Every modal is a fully custom dialog (no headless UI library, per the "Styling
  method" section above): one `fixed inset-0` element serves as both the dimmed
  backdrop (`bg-black/40`, centered flex layout, `onClick` closes the modal) and the
  stacking layer for the dialog panel inside it, rather than two separately-layered
  elements. The panel itself (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`
  pointing at the modal's own heading, `rounded-standard bg-surface shadow-modal`)
  stops click propagation so clicking inside it doesn't trigger the backdrop's close
  handler.
- Focus management is centralized in the shared `useModalFocusTrap` hook
  (`src/shared/hooks/useModalFocusTrap.ts`): on mount it captures whatever element had
  focus immediately before the modal opened and restores it on unmount, and it returns
  a `handleTabTrap` keydown handler that keeps `Tab`/`Shift+Tab` cycling within the
  dialog panel's own focusable elements. Call it with a `ref` on the dialog panel, and
  wire its `handleTabTrap` into the panel's own `onKeyDown` after handling any keys the
  modal needs to intercept itself first (e.g. `Escape` - callers handle that directly,
  since a modal with nested pending state, like an unsaved-changes confirmation, often
  needs `Escape` to dismiss that nested state before closing the modal itself).
- A confirmation dialog opened from inside an already-open modal (e.g. a delete
  confirmation launched from a "manage entries" modal) stacks above it using the
  `z-[60]` layer documented in "Z-index / layering" below, and relies on the outer
  modal's own `Escape` handling rather than adding a second listener.

## Tooltips

- The shared `Tooltip` component (`src/shared/feedback/Tooltip.tsx`) wraps a single
  interactive trigger - typically an icon-only button - and shows a small dark bubble
  on hover/focus. Use it instead of the native `title` attribute, whose ~1.5-2s
  browser-default hover delay makes icon-only controls feel unresponsive; this
  component fades in instantly (~75ms, no start delay).
- The bubble renders through a portal into `document.body`, positioned with `fixed`
  coordinates computed from the trigger's own `getBoundingClientRect()`, rather than
  being absolutely positioned as a DOM sibling - this keeps it from being clipped by
  whatever scrollable ancestor (e.g. a panel's own `overflow-y-auto`) the trigger sits
  inside.
- `align` (`'center'` default, `'start'`, `'end'`) sets the bubble's preferred
  horizontal anchor relative to the trigger, but it's always clamped back on-screen if
  that preference would otherwise overflow the viewport.
- The trigger keeps its own `aria-label` for its accessible name; the tooltip's label
  is presentational only (`aria-hidden`), not read twice by screen readers.

## Toast notifications

There are exactly 3 toast states — `saving`, `saved`, and `failed`. There is no
"warning" toast type; don't invent one.

- Position: bottom-right of the viewport. Concurrent toasts (one per mutation)
  stack vertically with a small gap between them.
- Shape: every toast uses `rounded-standard` and `shadow-panel` (the subtler
  of the two elevation steps) — not the stronger `shadow-modal`.
- Color signal is the toast's own background color (not just its icon/text,
  and not a border accent), with light (`text-neutral-100`) icon/text on top
  for contrast:
  - `saving` — `bg-warning` (in progress, neither success nor failure);
    remains visible until replaced by `saved` or `failed`.
  - `saved` — `bg-success`; auto-dismisses after 3 seconds (`SAVED_TOAST_DURATION_MS`
    in the shared `defaults.ts`).
  - `failed` — `bg-error`; includes the backend's error detail and an X
    button; remains visible until the user manually dismisses it.

Non-blocking warnings that aren't tied to a save operation render as an inline
element within the relevant modal/form, styled with `text-warning`, rather than as
a toast.

## Loading spinner

- Icon: `lucide-react`'s `Loader2` with `animate-spin`. There is no separate
  spinner component/SVG — reuse this same icon everywhere a spinner is needed.
- Sizing: reuse the standard icon size scale (`size-4`/`size-5`/`size-6`/
  `size-8`/`size-10`); the spinner does not get its own dedicated size
  tokens. Prefer `size-8`/`size-10` for a page or list's own prominent
  content-loading state.
- Placement depends on what's loading, not a single fixed rule:
  - Actions that save/mutate data (most buttons) use the shared `saving` toast
    (see Toast notifications above) rather than an inline spinner on the
    button itself.
  - Content that's being fetched/loaded shows the spinner centered within the
    content area/panel that will eventually hold that content, in place of the
    content until it's ready.
- Color: inherits `currentColor` like other icons; a standalone content-loading
  spinner (not paired with colored text) defaults to `text-neutral-500`, the
  same muted tone used for other secondary/placeholder content.

## Z-index / layering

Tailwind v4's `z-*` utilities are a fixed numeric scale, not a `@theme` token
namespace, so there's no named `z-modal`/`z-toast` class the way there is for
colors or radii. Instead, use this documented convention: always use the same
numeric step for the same layer, low to high:

- Page content — no explicit `z-*` (default stacking).
- Sticky headers — `z-10`.
- Dropdowns (comboboxes, menus, popovers) — `z-20`.
- Modal — `z-50`. The backdrop and the dialog panel share a single wrapping
  `fixed inset-0` element (see "Modals" above) rather than being layered as two
  separate `z-*` steps.
- Toasts — `z-50`, same step as a modal. `ToastViewport` mounts once at the app
  root and renders after any open modal in the DOM, so it still paints on top via
  DOM order; don't rely on `z-*` alone to keep toasts above modals if you move where
  toasts are rendered from.
- A confirmation dialog nested above an already-open modal (e.g. a delete
  confirmation launched from within another modal) — the arbitrary `z-[60]` value,
  one step above the standard modal/toast layer.

## Virtualized lists & grids (TanStack Virtual, when adopted by a project)

If/when a project adds `@tanstack/react-virtual` for a long list/grid, use its
`useVirtualizer` — the only virtualization approach documented here; don't reach
for a different windowing library.

- Convention: a `ref`-tracked scrollable container passed as `getScrollElement`, a
  fixed `estimateSize` per row (a grid groups multiple items into one virtualized
  "row"), and `overscan: 5` so a handful of off-screen rows stay rendered to reduce
  scroll-triggered pop-in.
- Rows render absolutely positioned inside a container sized to the virtualizer's
  total height, each translated into place via a `transform:
translateY(${virtualRow.start}px)` inline style.
- When an item needs to be revealed programmatically (e.g. after undo/redo, or a
  newly-created item), call the virtualizer's own `scrollToIndex`, rather than
  scrolling the container manually.

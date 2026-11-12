---
name: desktop-view
description: Build the desktop version of an existing mobile page from a Figma desktop frame, switching views with useIsDesktop instead of making the page responsive. Use when the user references a page/component (e.g. "ScheduleProvider") and asks for its desktop screen, desktop version or desktop layout from Figma.
argument-hint: <PageComponent> [figma-url]
---

# Desktop view from Figma

Target: `$ARGUMENTS` — the page component to adapt (e.g. `ScheduleProvider`) and, optionally, the Figma URL of its desktop frame.

Screens in this project are **not** fluid-responsive. Each page renders a separate mobile or desktop tree, chosen by `useIsDesktop()` (`src/hooks/useMedia.tsx`, `lg` = 64rem) — the same switch `ProtectedRoute` uses for `DesktopLayout` (sidebar + header) vs `MobileLayout`.

Talk to the user in Portuguese (pt-BR). Keep code identifiers and comments in English.

## Phase 1 — Study (read-only, no edits)

1. **Inputs.** Resolve the component file under `src/pages/**`. If no Figma URL was given, ask for it and stop.
2. **Figma.** Load the `figma:figma-design-to-code` skill, then `create_session` and `get_design_context` on the frame (with screenshot).
   - **Sanity check:** if the frame's title/content clearly isn't this page (e.g. "Serviços e preços" for an agenda page), stop and confirm the link before going further.
3. **Code.** Read the mobile page and everything it renders: child components (`src/components/pages/<domain>/`), hooks (`src/hooks/<domain>/`), services (`src/services/<domain>/`), API types (`src/api/<domain>/`). Also check:
   - shared components in `src/components/commons/` and `src/components/ui/`
   - tokens in `src/App.css` (`sich-*`, `--sich-*`, `shadow-sich-*`, `bg-sich-gradient`, `sidebar` tokens)
   - `src/routes/ProtectedRoute.tsx` (`DesktopLayout` / `DesktopHeader`)
4. **Map every Figma block** to the mobile page:
   - **Global chrome** (sidebar, top header) belongs to `DesktopLayout`, not the page. The header holds only the notification bell — no search bar, status text or chat icon. Ignore these in the page unless the layout is missing something.
   - **Exists on mobile** → adapt it (reuse the component, re-layout for desktop).
   - **Desktop-only** (no mobile equivalent, or needs data/endpoints that don't exist) → list it as a decision for the user. **Never assume build or ignore.**
   - **States/data that don't exist in the domain** (e.g. a status the backend doesn't have) → flag them.
5. **Measure the gutter** from the frame: content width = frame width − sidebar width; page padding (left edge of content − sidebar width); column widths and the gap between columns/cards. Convert to Tailwind: padding/gap utilities and an `fr` ratio grid (e.g. 712/360 with 24px gap → `grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6`).

## Phase 2 — Questions (mandatory, then STOP)

Present a short study and wait for answers before editing anything:

- A table: **Figma block | mobile equivalent | proposed action**.
- The gutter/layout translation you intend to use.
- Numbered questions. **Always include:**
  1. **Desktop-only components:** list each one and ask whether to **build** it (and with what data source) or **ignore** it. One item per block, no default assumed.
  2. Any block whose desktop form differs structurally from mobile (e.g. a week grid vs a single-day list) — offer concrete options with a recommendation.
  3. Behaviour of controls that exist on both (toggles, filters): does desktop change more than mobile does?
  4. Duplicated actions in the frame (same link/button in two places): keep one or both?
  5. Small new derived info shown on desktop (counts, summaries): include? Also on mobile?
- Add page-specific questions only when the answer changes what you build.

## Phase 3 — Implementation

### File structure

| File | Role |
|---|---|
| `src/hooks/<domain>/use<Page>.tsx` | All state, data and derived values. Exports `type <Page>State = ReturnType<typeof use<Page>>`. Includes `animationClass` from `usePreviousRoute` when the page animates. |
| `src/pages/<domain>/<Page>.tsx` | Calls `useIsDesktop()` and `use<Page>()`, renders `<Page>Desktop` or `<Page>Mobile` with `state`, keeps `<Toaster />`. |
| `src/pages/<domain>/<Page>Mobile.tsx` | The previous markup, moved as-is and reading from `state`. Mobile must look the same unless the user asked for a backport. |
| `src/pages/<domain>/<Page>Desktop.tsx` | The new desktop tree. |

- Extract anything both views use (lists with empty states, style maps, legends) into `src/components/pages/<domain>/`. Don't duplicate markup between Mobile and Desktop.
- Pure derivations (labels, counts, timelines) go in `src/services/<domain>/`. Fetching stays in hooks. Prefer deriving from data already loaded over adding requests.

### Layout rules

- **No absolute positioning or fixed coordinates** from the Figma output. Use flex/grid only.
- Page wrapper: `flex w-full flex-col gap-6 px-10 py-8` (adjust to the measured gutter).
- Columns: `grid` with `minmax(0, Nfr)` tracks and `items-start`; stacks inside a column use `flex flex-col gap-6`.
- Grids that encode data (calendars, tables) use CSS Grid tracks and `grid-row`/`grid-column` spans. Inline `style` is fine only for these dynamic values.

### Design rules

- Follow the **mobile design language**, not Figma's literal styling: reuse `Card`, `Title`, `SubTitle`, `MobileLink`, `LabelLink`, `SichText`, `SlideToggle`, `DataPicker`, etc., and the `sich-*` tokens. Don't paste Figma hex values when a token exists.
- **Icons: always the lucide icons already used on mobile.** Never swap them for Figma emojis, never add colored containers or squares around them.
- Desktop chrome uses the sidebar tokens (`bg-sidebar`, `border-sidebar-border`) so the header matches the sidebar.
- Sub-pages with a back button keep using `PageHeader`: it already switches by itself (on desktop it blends into the page background, with the back button and a large dark title, default `px-6`). Pass `className="px-10"` when the page content uses the desktop `px-10` gutter. Never move the back action into the global header.
- Shared copy (tooltips, notices) lives in one constant used by both views, so mobile and desktop never drift apart.
- To override classes on a shared component that concatenates strings, convert it to `cn()` (`src/lib/utils`) and report the side effects on other callers.
- Don't download Figma assets unless the frame has real images that the page needs (emojis are not assets).

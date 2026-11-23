---
name: mobile-view
description: Build a mobile page from scratch from a Figma mobile frame, starting only from the Figma link and, if it exists, the base page component (e.g. a stub like "Financial"). Studies the codebase patterns first, proposes reusable components and shadcn components (via MCP) in a mandatory question round, and only installs or builds after the user answers. Use when the user asks to build/create/implement a mobile screen, mobile page or mobile layout from Figma.
argument-hint: <figma-url> [PageComponent]
---

# Mobile view from Figma (from scratch)

Target: `$ARGUMENTS` — the Figma URL of the mobile frame and, optionally, the base page component (e.g. `Financial`, a stub under `src/pages/**`).

Screens in this project are **not** fluid-responsive. Mobile is the primary tree; a desktop tree may be added later with the `desktop-view` skill, switched by `useIsDesktop()` (`src/hooks/useMedia.tsx`). Build the mobile page so that this split is cheap later (state in a hook, markup reading from `state`).

Talk to the user in Portuguese (pt-BR). Keep code identifiers and comments in English.

## Phase 1 — Study (read-only, no edits, no installs)

1. **Inputs.** If no Figma URL was given, ask for it and stop. If a base component was given, resolve it under `src/pages/**`; if it doesn't exist, plan a new page and its route.
2. **Figma.** Load the `figma:figma-design-to-code` skill, then `create_session` and `get_design_context` on the frame (with screenshot).
   - **Sanity check:** if the frame's title/content clearly isn't this page, stop and confirm the link.
   - If the frame is clearly a desktop frame (wide, with sidebar), stop and suggest `desktop-view`.
3. **Codebase analysis.** Before proposing anything, read enough to describe the house style. Read at least 2 recent, complete pages and their pieces (e.g. `src/pages/products/Products*.tsx`, `src/pages/schedule/ScheduleProvider*.tsx`, `src/pages/home/HomeProvider*.tsx`) and record:
   - **Code patterns:** page skeleton (`useHead`, `usePreviousRoute` animation class, `<Toaster />`), default exports vs named, import order/aliases (`@/` vs relative), prop typing (`type XProps`), JSDoc one-liners, early returns.
   - **Component architecture:**
     - `src/pages/<domain>/<Page>.tsx` — page entry.
     - `src/components/pages/<domain>/` — page-specific pieces (`<Domain><Thing>.tsx`, `*Empty.tsx`, `*Skeleton.tsx`).
     - `src/components/commons/` — shared app components (`Card`, `Title`, `SubTitle`, `PageHeader`, `SichText`, `MobileLink`, `LabelLink`, `SummaryCard`, `StatsSummary`, badges…).
     - `src/components/form/` — form wrappers (`Input`, `Select`, `MoneyInput`, `SlideToggle`…).
     - `src/components/ui/` — shadcn primitives (base-ui, style `base-nova`). Never edit these for page-specific needs; wrap them.
     - `src/hooks/<domain>/use<Page>.tsx` — state, fetching (`useFetch`), derived values; exports `type <Page>State = ReturnType<typeof use<Page>>`.
     - `src/services/<domain>/` — pure derivations, copy constants. `src/api/<domain>/` — endpoint builders + request/response types.
   - **Styling:** Tailwind v4 tokens in `src/App.css` (`sich-*`, `--sich-*`, `shadow-sich-*`, `bg-sich-gradient`), `cn()` from `src/lib/utils`, animation classes (`animateLeft`/`animateRight`), typical mobile gutters (`px-5`/`px-6`, `py-4`, `gap-3`/`gap-5`), lucide icons only.
   - **Data:** does an endpoint/type in `src/api/**` already serve what the frame shows? If not, flag it.
4. **Map every Figma block** to a decision:
   - **Global chrome** (bottom nav, top bar provided by `MobileLayout` in `src/routes/ProtectedRoute.tsx`) → not part of the page.
   - **Existing component fits as-is** → reuse.
   - **Existing component is similar** (needs a prop/variant) → propose reuse + the change, and list its other callers.
   - **No equivalent, a shadcn primitive fits** → search the shadcn registry via the shadcn MCP (`search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`). If the MCP isn't available, load the `shadcn` skill. **Do not install yet.**
   - **Nothing fits** → new component in `src/components/pages/<domain>/` (or `commons/` if clearly shared).
   - **Data/states that don't exist in the domain** → flag.

## Phase 2 — Questions (mandatory, then STOP)

Present a short study and wait for answers before editing or installing anything:

- **Codebase summary** (5–8 bullets): the patterns you will follow (file layout, hook/state shape, styling tokens, gutters).
- A table: **Figma block | proposed component | source (existing / adapt existing / shadcn / new) | notes**.
- Numbered questions. **Always include:**
  1. **Reuse suggestions:** for each similar existing component, ask whether to reuse it (with the needed change) or build a new one. Name the file and the diff in one line.
  2. **shadcn components:** list each candidate with the exact install command (`npx shadcn@latest add <item>`, from `get_add_command_for_items`) and ask permission per item. Never install without a yes. Mention components already in `src/components/ui/` so nothing is reinstalled.
  3. **Data source:** for each block with dynamic data — existing endpoint, new endpoint (outside scope?), or static/mock for now?
  4. **Route & navigation:** path, whether it enters the bottom nav (`navItems.ts`), and the back target if it uses `PageHeader`.
  5. **States:** loading (skeleton?), empty, error — which ones does the frame define, and what to do with the missing ones.
- Add any other doubt (ambiguous copy, interactions not visible in a static frame, icons without a lucide equivalent) as extra questions. Ask instead of assuming.

## Phase 3 — Implementation

1. **Install approved shadcn items only**, with the approved command. After installing, check the generated file in `src/components/ui/` matches the project style (base-ui, `cn`) and report any file it overwrote or modified.
2. **Build in this order:** api types/builders (if approved) → service (pure derivations, copy) → hook → page-specific components → page → route.

### File structure

| File | Role |
|---|---|
| `src/hooks/<domain>/use<Page>.tsx` | State, fetching via `useFetch`, derived values, `animationClass`. Exports `type <Page>State`. |
| `src/pages/<domain>/<Page>.tsx` | `useHead(...)`, calls `use<Page>()`, renders `<Page>Mobile state={state} />` and `<Toaster />`. |
| `src/pages/<domain>/<Page>Mobile.tsx` | The mobile tree, reading everything from `state`. |
| `src/components/pages/<domain>/*` | Page pieces, plus `*Empty` / `*Skeleton` when those states exist. |

- Replace the base component's stub content; keep its `useHead` title/description unless the user says otherwise.
- If the page is new, register it in `src/routes/routes.tsx` following the existing nesting.

### Layout rules

- **No absolute positioning or fixed coordinates** from the Figma output. Flex/grid only.
- Gutters and spacing follow the existing mobile pages, not Figma's literal pixel values, unless the difference is intentional.
- Horizontal scrollers follow the existing pattern (snap + hidden scrollbar, see `src/pages/customer/Search.tsx`).

### Design rules

- Follow the **project's design language**: reuse `commons/` and `form/` components and `sich-*` tokens. Never paste Figma hex values when a token exists; if a needed color has no token, ask before adding one to `App.css`.
- **Icons: lucide only.** Never use Figma emojis; no colored containers around icons unless existing components do it.
- To override classes on a shared component that concatenates strings, convert it to `cn()` and report side effects on other callers.
- Shared copy (tooltips, notices, labels reused in several places) lives in one constant in `src/services/<domain>/` or a `<page>Copy.ts` next to the page.
- Don't download Figma assets unless the frame has real images the page needs.

### Finish

- Run `npm run lint` and `npx tsc -b`; fix what you introduced.
- Report: files created/changed, shadcn items installed, changes to shared components (and affected callers), and what was left as mock/TODO per the user's answers.

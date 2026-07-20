# v5 A11Y Level-A criticals — plan

Date: 2026-07-20. Type: `fix(a11y)` batch. Caveman form.

## Identity

- Plan: `project/2026-07-20-v5-a11y-level-a-plan.md`
- Branch: `v5-a11y-level-a` (off `v5` @ `b22d1ba`, the merged #181 tip)
- Target: `v5` (long-lived integration branch; draft PR at finish, merge-commit like #180/#181)
- PR: none yet
- Parent roadmap: `project/2026-07-18-v5-production-readiness-roadmap.md` item #15 (P2 A11Y Level-A batch 1)
- Prior merged plans (history): `2026-07-19-pr-181-v5-api-consolidation-plan.md` (#181), roadmap #180

## Goal

Fix the WCAG 2.1/2.2 **Level A** failures in core widgets so the uzh public-sector (eCH-0059) target is reachable. Scope = roadmap #15: A11Y-1 Table, A11Y-2 Checkbox, A11Y-3 forms error pattern, A11Y-4 Navigation, +A11Y-9 required/id.

## Non-goals

- A11Y-5/A11Y-12 uzh contrast (Critical but **D4-gated**, design ruling) — excluded.
- A11Y-6/7/8 (Workflow, StepProgress, ColorPicker) = batch 2, next milestone.
- A11Y-10/11/13/14 (reduced-motion, live regions, RTL, axe keyboard specs) — later.
- TEST-4 a11y CI re-enable/triage — separate slice.
- No npm release (HELD). No back-compat shims. Keep all composites.

## Decisions made on user's behalf (veto-able)

| # | Decision | Choice | Why |
| --- | --- | --- | --- |
| DA | A11Y-9 required forwarding | `aria-required="true"` only, **not** native `required` | Native `required` triggers browser validation → would change submit behaviour in klicker's 88 Formik fields + RHF consumers. `aria-required` satisfies WCAG (programmatically-determinable required state) with zero behaviour change. |
| DB | A11Y-4 `ariaLabel` on icon-only Navigation | **required** on `IconOnly*` prop types (breaking, TS-only) | Point of the fix: an icon-only control cannot ship unnamed. Breaking changes allowed pre-GA (roadmap P1/P2). Optional on combined label+icon variants. |
| DC | A11Y-2 Checkbox id fallback | `useId()` when `id` omitted | Association must not depend on the optional `id`. Same theme as A11Y-9 id-derivation. |

## Research

- **R1 (blocks S2):** Radix Checkbox is a `<button role="checkbox">`. Confirm the reliable accessible-name path: `@radix-ui/react-label` (`<label htmlFor>`) click-redispatch + whether name resolves via `htmlFor` alone or needs `aria-labelledby`. Verify via Context7 (`@radix-ui/react-checkbox` + `react-label`) AND the browser accessibility tree / axe on the Checkbox story. Switch already uses `FormLabel`→`Label` but passes no `id` → currently unassociated too; do better than Switch (actually associate).

## Verification path

- Fast: `pnpm --filter @uzh-bf/design-system check` (tsc) + `lint` + `format:check` per slice.
- Browser (primary a11y proof): `pnpm dev` (Ladle serve, :61000) via preview tools. Per widget: keyboard reach (Tab/Enter/Space), accessible name in the a11y tree (`read_page` / axe), `aria-sort`/`aria-required`/`aria-describedby` present. Axe alone is structurally blind here (A11Y-14: default-state scans, `div onClick` isn't a violation) → manual keyboard + a11y-tree checks are the real gate.
- Build: `pnpm build` clean (fonts 6/6) before PR.
- Optional: `pnpm test:a11y` local axe sweep on affected stories.

## Slices

### S1 — A11Y-1 Table sortable header: real button + aria-sort + scope

- Problem: `<th onClick>` (Table.tsx:200-231) = no keyboard, no `aria-sort`, no `scope`, icon-only signal. Level A fail in the core admin widget.
- Do: sortable `<th scope="col" aria-sort={active ? (asc?'ascending':'descending') : 'none'}>` wrapping a real `<button onClick=sort>` (icon+label inside). Non-sortable: `<th scope="col">label</th>`, no button, no `aria-sort`. Move the `cursor-pointer`/hover to the button; keep visual output identical.
- Files: `src/Table.tsx`.
- Check: browser Table story — Tab lands on each sortable header button, Enter/Space sorts, `aria-sort` flips asc/desc/none, `scope="col"` present, non-sortable headers inert. tsc/lint/format clean.
- Commit: `fix(a11y): keyboard-accessible sortable table headers with aria-sort`

### S2 — A11Y-2 Checkbox: associated label + toggle-on-click + id fallback

- Problem: `label` renders a bare `<div>` (Checkbox.tsx:112-123) → no accessible name, label click doesn't toggle.
- Do (pending R1): render label via `@radix-ui/react-label` `<label htmlFor={inputId}>` (click redispatch toggles), `inputId = id ?? useId()`, ensure the Radix checkbox resolves the name (htmlFor, add `aria-labelledby` if R1 shows htmlFor insufficient for `role=checkbox`). Preserve `ReactNode` label + styling.
- Files: `src/Checkbox.tsx`.
- Check: browser — a11y tree shows checkbox with the label as accessible name; clicking the label toggles `checked`; keyboard Space toggles. tsc/lint/format clean.
- Commit: `fix(a11y): associate Checkbox label for accessible name and click-to-toggle`

### S3 — A11Y-4 Navigation: accessible names for icon-only items

- Problem: icon-only button/dropdown render a bare `<FontAwesomeIcon>` in `MenubarTrigger` (Navigation.tsx:131-138, 326-333); prop types expose no aria field → consumer cannot name them.
- Do: add `ariaLabel: string` (required) to `IconOnlyButtonProps` + `IconOnlyDropdownProps`; optional `ariaLabel?` on `BaseNavigation*`/combined. Pass `aria-label={ariaLabel}` to `MenubarTrigger`. Update jsdoc.
- Files: `src/Navigation.tsx`.
- Check: browser — icon-only trigger exposes the accessible name; combined/label variants unaffected. tsc (breaking type surfaces at call sites in stories → fix stories). lint/format clean.
- Commit: `fix(a11y)!: require ariaLabel on icon-only Navigation items`

### S4 — A11Y-9 + A11Y-3 Forms: id/required + error semantics (5 base fields)

- Problem: (A11Y-9) `required` renders visual `*` only, never reaches the input; label↔input association breaks when optional `id` omitted. (A11Y-3) error text lives only in an icon tooltip — no `aria-describedby`, no `role=alert`; some fields pass no accessible name.
- Files: `src/forms/{TextField,NumberField,TextareaField,SelectField,AlphaNumericPinField}.tsx` (the 5 base fields carrying `faCircleExclamation` + `FormLabel`). Formik* wrappers inherit the fix.
- Do (uniform per field):
  - `inputId = id ?? name` fallback → pass to both `FormLabel id` and the input `id` (fixes silent association break).
  - `aria-required={required || undefined}` on the input (DA: aria only, not native `required`).
  - Error: stable `errorId = ${inputId}-error`; render a `role="alert"` element carrying the error text (keep the icon+tooltip visual); set `aria-describedby={error && isTouched ? errorId : undefined}` on the input.
  - Add missing `ariaLabel`/accessible name where a field passes none (finding: 4 of 7 don't).
- Split rule: if per-field structure diverges too much (SelectField uses Select not Input; pickers differ), split into S4a (TextField/NumberField/TextareaField/AlphaNumericPin — Input-based) + S4b (SelectField + any picker). Decide when editing.
- Check: browser — input has `aria-required`, `aria-describedby`→error text on touch, label click focuses input (association via derived id), error announced (role=alert). tsc/lint/format clean; `build:ladle` clean (story imports resolve).
- Commit(s): `fix(a11y): forward required + derive field id fallback` / `fix(a11y): expose form field errors via aria-describedby + role=alert`

## Cadence

Per `$rs-sliced-development-workflow`: one slice at a time — implement, fast verify, browser a11y proof, native review + simplify subagents on the exact diff, integrate, re-verify, update Progress, conventional commit. Main agent implements (agy delegation OFF). Finish gate at end: security review (`$security-review`), thermo-nuclear maintainability, independent branch review, then draft PR via `$rs-mr-description-writer`. npm HELD.

## Progress

- 2026-07-20: #181 merged into `v5` (merge commit `b22d1ba`), local synced, branch `v5-a11y-level-a` cut. Affected components scoped and read (Table, Checkbox, Switch/FormLabel/forms Label, TextField, Navigation). Base forms field set = 5 confirmed. Plan written. Next: commit plan, then S1 (Table).

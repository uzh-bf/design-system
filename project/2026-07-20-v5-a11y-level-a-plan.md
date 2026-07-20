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

### S2b — Switch label association (review-discovered; same defect class as A11Y-2)

- Problem: the S2 review found `src/Switch.tsx` has the identical A11Y-2 defect the roadmap assumed it was FREE of: Switch renders `<FormLabel label=... />` (Switch.tsx:112-123, 160-168) without passing `id`, so `FormLabel`→`Label` gets no `forId`/own id → the `<button role="switch">` has no associated accessible name (WCAG 4.1.2 Level A). The roadmap's A11Y-2 action ("wire like Switch") was based on a false premise.
- Do: `inputId = id ?? useId()`; pass `id={inputId}` to `RadixSwitch.Root`; give `FormLabel` an own label id + `forId` so the label associates, and add `aria-labelledby` on the switch (same belt-and-suspenders as Checkbox, since it's a button not a native input). Verify accessible name + no double-toggle.
- Files: `src/Switch.tsx` (+ `FormLabel`/`Label` only if a label-own-id passthrough is missing).
- Check: browser Switch story — switch exposes the label as accessible name; label click toggles once; disabled no-op. tsc/lint/format clean.
- Commit: `fix(a11y): associate Switch label for accessible name`

## Cadence

Per `$rs-sliced-development-workflow`: one slice at a time — implement, fast verify, browser a11y proof, native review + simplify subagents on the exact diff, integrate, re-verify, update Progress, conventional commit. Main agent implements (agy delegation OFF). Finish gate at end: security review (`$security-review`), thermo-nuclear maintainability, independent branch review, then draft PR via `$rs-mr-description-writer`. npm HELD.

## Progress

- 2026-07-20: #181 merged into `v5` (merge commit `b22d1ba`), local synced, branch `v5-a11y-level-a` cut. Affected components scoped and read (Table, Checkbox, Switch/FormLabel/forms Label, TextField, Navigation). Base forms field set = 5 confirmed. Plan written + committed (`8ba26dc`).
- 2026-07-20: **S1 (A11Y-1) — DONE.** `src/Table.tsx`: sortable `<th onClick>` → `<th scope="col" aria-sort={asc?ascending:descending|none}>` wrapping a real `<button type="button" onClick>`; non-sortable → `<th scope="col">label</th>` (inert, no aria-sort). Native review + simplify integrated: (a) flattened the nested aria-sort ternary into `sortAriaValue`; (b) restored the full-cell click target the first cut shrank — padding moved onto the button (`w-full px-4 py-3`), th padding made conditional (`!col.sortable && 'px-4 py-3'`). Safe because the custom `Table` composite has **0** consumers (D3 audit: klicker/gbl route 100% of tables through raw `ShadcnTable`). Verified: tsc/lint/format clean; browser (Ladle `table--combined`, real layout) — button fills the cell (82×40 vs th 82×41), `aria-sort` none→ascending on click, non-sortable header has no button/no aria-sort, `scope="col"` present. Keyboard operability = native `<button>` (platform guarantee; CDP key input unverifiable here — Ladle preview tab renders headless 0×0, so DOM-level + click-path verification used instead). Next: S2 (Checkbox).
- 2026-07-20: **S3 (A11Y-4 Navigation) — DONE.** `src/Navigation.tsx`: icon-only button/dropdown triggers rendered a bare `<FontAwesomeIcon>` inside `<MenubarTrigger>` (a `<button role="menuitem">`) → nameless control (WCAG 4.1.2). Added `ariaLabel?: string` to `BaseNavigation{Button,Dropdown}Props`, narrowed to **required** `ariaLabel: string` on `IconOnly{Button,Dropdown}Props` (breaking TS-only, decision DB — allowed pre-GA), and pass `aria-label={!label ? ariaLabel : undefined}` to both `MenubarTrigger`s (MenubarTrigger spreads props → Radix Trigger → the button). `Navigation.stories.mdx`: added `ariaLabel` to all 6 icon-only usages (4 rendered: IconTrigger/Complex/Disabled + 2 prose examples). Native review + simplify integrated: reviewer independently type-checked 6 bypass paths (union, item-union, intermediate var/array) — all correctly rejected, narrowing empirically unbypassable; its nit (unconditional `aria-label={ariaLabel}` vs the guarded Checkbox/Switch form) was integrated as `!label ? ariaLabel : undefined` — removes the footgun, matches the batch, and avoids a WCAG 2.5.3 (Label-in-Name) risk if a visible label were overridden. Simplifier "clean, no change." Verified: tsc/lint/format clean; **navigation axe 20/20** both themes; Playwright ariaSnapshot on navigation--icon-trigger post-fix = `- menuitem "Support"` (name resolves via aria-label, text empty); pre-fix = nameless `menuitem` (axe blind — role=menuitem not button, so button-name rule never fired). Next: S4 (A11Y-9 + A11Y-3 forms).
- 2026-07-20: **S4a (A11Y-9 + A11Y-3, native-input fields) — DONE.** `src/forms/{TextField,NumberField,TextareaField}.tsx`: three defects fixed — (1) `required` rendered only a visual `*` in `FormLabel`, never reaching the input; (2) the label↔input association silently broke when the optional `id` was omitted (both `FormLabel` and the input got `id={undefined}`); (3) the error message lived **only** inside a hover/focus Tooltip on the warning icon, with no programmatic tie to the input. Fix extracted into two shared modules: `src/forms/useFieldError.ts` (`{id,error,isTouched,hideError}` → `{inputId = id ?? useId(), showError, errorId}`) and `src/forms/FieldErrorIndicator.tsx` (the Tooltip+icon + a persistent visually-hidden `<span id={errorId} role="alert" class="sr-only">{error}</span>`). Each field now passes `id={inputId}` to both `FormLabel` and the input(s), `aria-required={required || undefined}` (decision DA — aria only, **not** native `required`, so Formik/RHF submit behavior is unchanged), and `aria-describedby={showError ? errorId : undefined}`. Native review + simplify integrated: **dropped the `name` from the id fallback** (was `id ?? name ?? useId()`) → `id ?? useId()` uniform across all fields — both agents flagged `name` as neither unique (two same-named Formik fields on one page collide on DOM id) nor colon/bracket-safe, while `useId()` is stable-per-instance and globally unique; **extracted the ~19-line block now** (simplify: turns the 3 copies — 5 by end of S4b — into one module, and unifies the Tooltip `ariaLabel={error}` that had already drifted between NumberField and the other two). Hook split into its own file because the repo's `react-refresh/only-export-components` rule (`--max-warnings 0`) forbids exporting a hook + a component from one file. Corrected a prior assumption: the Radix Tooltip trigger is a focusable `<button>` that opens on **focus** (not just hover), so sighted keyboard users already reach the visible error — the sr-only `role=alert` is the assistive-tech path (WCAG 3.3.1 Level A via aria-describedby; role=alert a 4.1.3 bonus), not a "can't-see-it" gap. Verified: tsc/lint/format clean; new persisted `tests/a11y/field-labeling.spec.ts` — **6/6** deterministic attribute assertions (label `for`===derived input id for all 3 families; `aria-required="true"` on required stories; `aria-describedby`→`role=alert` node with the exact error text) pass. **No axe regression, proven against baseline:** stashed S4a → rebuilt Ladle at the S3-committed state → field-family axe = **112/112 at `--workers=1`**; restored S4a → rebuilt → **112/112 at `--workers=1`**. The 13–18 failures seen at 9-worker parallel load are pre-existing color-contrast/async-mount-race flakiness present **equally** in both states (different stories fail each run), not deterministic defects. Next: S4b (SelectField — `aria-labelledby` on the Radix Select trigger; AlphaNumericPinField — InputOTP association), reusing `useFieldError`/`FieldErrorIndicator`.
- 2026-07-20: **S2b (Switch) — DONE.** `src/Switch.tsx`: `RadixSwitch.Root` (a `<button role="switch">`) got `id={inputId = id ?? useId()}` and both mutually-exclusive `FormLabel` branches (labelLeft/right) got `id={inputId}` → `FormLabel` forwards `id`→`Label forId`→`<label htmlFor={inputId}>`, associating the label. Added an `ariaLabel?` escape-hatch prop + `aria-label={!label ? ariaLabel : undefined}` for the label-less case (review finding; mirrors Checkbox S2). **No `aria-labelledby` needed** — unlike Checkbox (ReactNode label), Switch's label is a plain string and native `<label for>` on the labelable button resolves the name (empirically: Playwright `ariaSnapshot` post-fix = `- switch "Unchecked"`; pre-fix = `- switch`, unnamed). Native review + simplify integrated: reviewer approve-with-nits → the one nit (missing `ariaLabel` escape hatch, same gap Checkbox closed) was integrated; simplifier "clean, no change" (both confirm the two-line `generatedId`/`inputId` is *required* — `id ?? useId()` would call the hook conditionally, violating Rules of Hooks; no story needs the prop since every Switch story passes `label=`). Verified: tsc/lint/format clean; browser (Playwright) — accessible name resolves from native `<label for>`, label click toggles aria-checked false→true (single toggle, no double-fire), disabled label click no-op; **switch axe suite 16/16** both themes (2 transient color-contrast fails on switch--error/tooltip were flaky under 9-worker parallel load — font/contrast timing, `gotoStory` deliberately skips `document.fonts.ready`; re-ran green twice, pre-fix build also 16/16, diff touches no styling). Next: S3 (A11Y-4 Navigation).
- 2026-07-20: **S2 (A11Y-2) — DONE.** `src/Checkbox.tsx`: label `<div>` → `<RadixLabel.Root id={labelId} htmlFor={inputId}>`; `RadixCheckbox.Root` gets `id={inputId = id ?? useId()}` + `aria-labelledby={label ? labelId : undefined}` + `aria-label={!label ? ariaLabel : undefined}`. Added an `ariaLabel?` escape-hatch prop for label-less checkboxes (review finding 3) + gave the `Default` story an `ariaLabel`. Native review + simplify integrated: simplifier "clean, no change" (validated two-line `useId` avoids conditional-hook risk, `aria-labelledby` needed since the control is a `<button>` not native input, disabled cursor on label necessary); reviewer confirmed single toggle path (native `<label for>` on a labelable `<button>`, no added onClick, no double-fire), no layout regression, and surfaced (a) the label-less name gap — CLOSED via `ariaLabel`, and (b) Switch shares the identical defect → new slice S2b. Verified: tsc/lint/format clean; browser (Ladle) — `labelled`: accessible name via aria-labelledby + label click toggles aria-checked false→true; `disabled`: label click no-op, cursor not-allowed; `default` (label-less): `aria-label="Accept terms"` present, no aria-labelledby; **axe suite `-g checkbox` = 12/12 pass** both themes (was tripping WCAG 4.1.2 on `checkbox--default` pre-fix). Next: S2b (Switch), then S3 (Navigation).

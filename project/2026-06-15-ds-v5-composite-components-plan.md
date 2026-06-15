# Plan: composite components + doc-gap stories for DS v5

- Plan path: `project/2026-06-15-ds-v5-composite-components-plan.md`
- Branch: `v5` — target `main` (PR #179)
- Related: [a11y/Playwright plan](2026-06-15-ladle-a11y-playwright-testing-plan.md),
  [ADR keep Ladle](2026-06-15-adr-storybook-vs-ladle.md),
  [VRT plan](2026-06-15-ladle-visual-regression-testing-plan.md)
- Status: PLANNED — approved scope, awaiting execution go.

## Goal
Close the remaining COMPOSITE-component holes in the DS (vs shadcn recipes) and
document the 4 components that ship without a Ladle story. Net result: every
shipped component is visualized; the three missing composed patterns exist.

## Non-goals
- NO Data Table (TanStack). Bigger lift + new heavy dep (`@tanstack/react-table`).
  Deferred by decision — recorded as open follow-up.
- NO bare `Input`/`Textarea` primitives (DS deliberately wraps as `TextField`/`InputGroup`).
- NO new runtime deps. All three composites reuse existing primitives
  (`Command`, `Popover`, `Button`, `Calendar`, `Tag`) + existing `date-fns`/`react-day-picker`.
- NOT re-opening the a11y CI gate (still smoke-only); but new comps MUST stay axe-clean.

## Grounded facts (from inventory + capability probe)
- shadcn primitive parity = COMPLETE (incl. late-2025 batch: button-group/empty/field/
  input-group/item/spinner/kbd). No atomic primitive missing.
- Composite holes confirmed:
  - Combobox/Autocomplete: ABSENT. `Command.tsx`+`Popover.tsx` never composed.
  - Multi-Select/Tags: ABSENT. `Select.tsx` is single-value (`onChange:(string)`), no `multiple`.
  - DateRangePicker: ABSENT. `DatePicker.tsx:173` + `DatetimePicker.tsx:809` hardcode
    `mode="single"`; `ui/calendar.tsx` already STYLES range mode — only the wrapper is missing.
  - Command palette ⌘K: PRESENT (`CommandDialog` `ui/command.tsx:32`). Not a gap.
- Gap-A (exported, NO `*.stories.mdx`): `ThemeProvider`, `Chart`, `Form`, `FormLabel`.
  - `Chart.tsx` = recharts wrapper (`ChartContainer/ChartTooltip/ChartLegend/...`).
  - `Form.tsx` = RHF shadcn Form (`FormField/FormItem/FormControl/FormMessage/...`).
- Story sweep is automatic: Playwright smoke + a11y read `build/meta.json`, so any new
  `*.stories.mdx` is covered with zero test wiring.

## Component conventions (apply to every new component)
- Files: DS wrapper `src/<Name>.tsx` (+ shadcn primitive under `src/ui/<name>.tsx` only if
  a new low-level primitive is needed; the three composites reuse existing primitives).
- Story: `src/<Name>.stories.mdx`.
- Export from `src/index.ts` AND `src/ui.ts` (composites are UI, not forms). Formik variants
  (if any) deferred — not in this round.
- Theme: token classes ONLY (no hardcoded `uzh-*`); must render in neutral AND uzh.
- a11y FROM THE START: icon-only / remove / trigger buttons need an accessible name
  (`aria-label`), inputs need associated labels. This is exactly what produced the CI
  a11y backlog (button-name/label) — do NOT add to it. Verify with local axe per slice.
- `types/` is a tracked generated twin — regenerate at Final, not per-slice.

## Skill routing
- Per slice: review subagent (`caveman:cavecrew-reviewer`) + separate simplification subagent.
- Final: `$security-review` subagent (low surface — UI only, no secrets/runtime), then
  `$df-mr-description-writer` for whole-branch PR #179 update.

---

## Slices

### C0 — plan commit
- Commit this plan alone. (docs only)
- Commit: `docs(project): composite-components + doc-gap plan for v5`

### C1 — Combobox (tracer)
- Do: `src/Combobox.tsx` = `Popover` (trigger `Button`, `role="combobox"`, accessible name =
  selected label or placeholder) + `Command` (`CommandInput`/`CommandList`/`CommandEmpty`/
  `CommandGroup`/`CommandItem`, check mark on selected). Props: `items:{value,label,disabled?}[]`,
  `value?`, `onChange(value)`, `placeholder`, `searchPlaceholder`, `emptyText`, `disabled`,
  `className`. Export in `index.ts`+`ui.ts`. `Combobox.stories.mdx` (default / preselected /
  disabled / long-list).
- Check: build + lint/format/check green; Ladle renders story neutral+uzh; smoke picks it up;
  axe clean (no button-name/label) on the new story both themes.
- Review + simplify. Commit: `feat(ds): add Combobox (searchable single-select)`

### C2 — DateRangePicker
- Do: `src/DateRangePicker.tsx` = `Popover` + `Button` trigger (formatted `from – to` via
  `date-fns`, accessible name) + `Calendar` `mode="range"` `numberOfMonths={2}`. Props:
  `value?:{from?:Date,to?:Date}` (react-day-picker `DateRange`), `onChange`, `numberOfMonths`,
  `placeholder`, `disabled`, `className`. Export `index.ts`+`ui.ts`. `DateRangePicker.stories.mdx`.
- Check: same gate as C1; verify range selection + 2-month layout render both themes.
- Review + simplify. Commit: `feat(ds): add DateRangePicker (range mode over Calendar)`

### C3 — MultiSelect
- Do: `src/MultiSelect.tsx` built on the C1 composition but multiple selection; selected values
  render as removable chips (style on `Tag` + an X button with `aria-label="Remove {label}"`).
  Props: `items`, `value:string[]`, `onChange(string[])`, `placeholder`, `disabled`, `maxDisplay?`,
  `className`. Export `index.ts`+`ui.ts`. `MultiSelect.stories.mdx` (empty / some-selected / many /
  disabled).
- Check: same gate; SPECIAL a11y focus — every chip remove button has an accessible name; the
  trigger has a name when empty. axe clean both themes.
- Review + simplify. Commit: `feat(ds): add MultiSelect (multi-value combobox with chips)`

### C4 — doc-gap stories (no new components)
- Do: `ThemeProvider.stories.mdx` (wrap children; show neutral vs uzh — lean on the Ladle theme
  toggle, demo a themed component inside). `Chart.stories.mdx` (minimal bar+line via
  `ChartContainer`/`ChartTooltip`/`ChartLegend` + sample data/config; theme via chart CSS vars).
  `Form.stories.mdx` (RHF: `useForm` + `Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/
  `FormMessage` + an input + submit — also documents `FormLabel`). If strict per-file coverage is
  wanted for `FormLabel`, add a tiny `FormLabel` section/story.
- Check: build green; all 3 (4) stories render neutral+uzh; smoke covers them; axe clean.
  Re-run inventory mentally: gap-A → 0.
- Review + simplify. Commit: `docs(ds): stories for ThemeProvider, Chart, Form (close doc gap)`

### Final
- Regenerate `types/` (`pnpm build`), commit the generated drift:
  `chore(ds): regenerate type declarations for new composite components`.
- Run `test:smoke` (must stay green) + `test:a11y` locally; confirm NEW stories add 0 serious/
  critical findings (record counts). Do NOT re-add a11y to CI here.
- `$security-review` subagent (scope: new UI components, no secrets/runtime/CI change).
- `$df-mr-description-writer`: update PR #179 whole-branch (now incl. composites + doc stories).
- `Next Steps`: Data Table (TanStack) decision; Formik variants of the new composites if consumers
  need them; a11y backlog triage (separate track).

## Risks / mitigations
- **a11y regress** (new interactive comps = the button-name/label risk class) → build with
  `aria-label`s + label associations from the start; local axe gate per slice; chips/triggers explicit.
- **Theme leakage** (hardcoded color) → token classes only; eyeball neutral+uzh per story.
- **Scope creep into Data Table** → explicitly out; no `@tanstack` dep this round.
- **PR #179 bloat** → folding in by decision; mr-description-writer covers whole branch so review
  stays navigable.
- **Generated `types/` churn** → regenerate once at Final from HEAD source (same discipline as the
  last types commit).

## Progress
- 2026-06-15 PLAN written. Scope approved: Combobox + DateRangePicker + MultiSelect + 4 doc-gap
  stories; on v5/PR #179; Data Table deferred. C0 committed (`429b02a`).
- 2026-06-15 **C1 DONE** — `Combobox` (searchable single-select) composing `ui/button`+`ui/popover`+
  `ui/command`. Exported in `index.ts`+`ui.ts`; `Combobox.stories.mdx` (Default/Preselected/Disabled).
  cmdk search via `value`+`keywords` (string labels) / rendered text (ReactNode). Gate GREEN: tsc,
  eslint, prettier, `build:ladle`, Playwright smoke + axe (neutral+uzh) on all 4 entries, manual
  browser check (open/filter/select; UZH-blue primary highlight + checkmark).
  - **a11y design (review-driven):** trigger is a disclosure `Button` with `aria-haspopup="listbox"`
    + `aria-expanded` (NOT `role="combobox"` — cmdk's `CommandInput` is the real combobox; two
    role=combobox elements is wrong). Plain button → accessible name from visible content
    (selected label / placeholder); `ariaLabel` optional override. axe caught the original missing
    name (`aria-input-field-name`) before this fix landed.
  - Review (cavecrew) + simplification subagents: applied the a11y restructure + dropped redundant
    `disabled:opacity-70` (Button owns `disabled:opacity-50`) + README accuracy. **Deferred:** native
    form `name`/hidden-input (YAGNI; tracked in Next Steps as FormikCombobox). Declined: `React.ReactNode`
    import (matches `Select.tsx`), CommandInput aria-label removal (real a11y safeguard).
- 2026-06-15 **C2 DONE** — `DateRangePicker` (from–to) composing `ui/popover` + `ui/calendar`
  (`mode="range"`, 2 months), modeled on `DatePicker`. Exported index+ui; stories Default/Preselected/
  Disabled. dayjs `DD.MM.YYYY` trigger label. Gate GREEN: tsc, eslint, prettier, build, smoke + axe
  (neutral+uzh), manual browser (two-month range, UZH-blue endpoints in uzh). Review+simplify applied:
  removed duplicate `id` on Calendar (DOM uniqueness), `defaultMonth={from ?? to}` (to-only seed),
  extracted `toLabel`, dropped explicit `aria-haspopup` (verified Radix `PopoverTrigger` injects
  `aria-haspopup="dialog"`+`aria-expanded` via asChild), story month-index comment. Declined: redundant
  `disabled` on PopoverTrigger+Button (matches DatePicker), verbose captionLayout type (DS convention).
- 2026-06-15 **C3 DONE** — `MultiSelect` (searchable multi-value) composing `ui/popover` + `ui/command`,
  sibling to Combobox. Removable chips render BELOW the trigger (outside the button) so chip remove
  buttons are not `nested-interactive`; each has `aria-label="Remove {label}"`. Popover stays open on
  toggle. Exported index+ui; stories Default/Preselected/Disabled. Gate GREEN: tsc, eslint, prettier,
  build, smoke + axe (neutral+uzh) incl. Preselected (chips visible → axe clean, no nested-interactive/
  button-name), manual browser (chips + checkmarks; UZH-blue chips in uzh). Review+simplify: simplifiers
  found nothing actionable ("already minimal"); added JSDoc notes (chip order = items order; ReactNode
  search caveat). **Verified cmdk 1.1.1 `useValue`**: an explicit `value` prop wins over children, so
  ReactNode labels are matched only against `value` (not rendered text) → corrected the Combobox README
  too. Declined: root width slot (parity w/ Combobox), `useState<string[]>` in stories (demo, not
  tsc-checked), `primary-40` token (confirmed exists in themes.css).

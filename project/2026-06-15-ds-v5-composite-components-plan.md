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
- 2026-06-15 **C4 DONE** — doc-gap stories for the 4 exported-but-undocumented components, closing gap-A → 0:
  `ThemeProvider.stories.mdx` (Default = neutral vs uzh side-by-side controlled; Uncontrolled = `useTheme()`
  toggle via an inner component — MDX forbids top-level non-export consts so the inner comp is defined inside
  the story fn), `FormLabel.stories.mdx` (Small/Large/Required/WithTooltip), `Form.stories.mdx` (RHF
  `useForm` + `Form`/`FormField`/`FormItem`/`ShadcnFormLabel`/`FormControl`/`FormDescription`/`FormMessage`
  + styled native input + submit; also documents `FormLabel` consumer path), `Chart.stories.mdx` (recharts
  two-series `BarChart` via `ChartContainer`/`ChartTooltip`/`ChartLegend`). Exports already present (no
  index/ui edits). Gate GREEN: prettier, `build:ladle` (meta.json regenerated, 3.78 MiB), Playwright smoke +
  axe (neutral+uzh) on all new entries (28 passed), manual browser (ThemeProvider neutral=black/uzh=blue
  independent subtrees; Chart renders grouped bars w/ token colors; Form field renders + labelled).
  - **Chart debug (3 fixes):** `w-full`→`w-[600px] h-[300px]` (recharts collapses to 0 in Ladle's
    shrink-to-fit preview root); config color `var(--primary-100)`→`var(--color-primary-100)` (Tailwind v4
    token var name; old form was undefined → invisible fill) + `--color-primary-40` for the 2nd series;
    `isAnimationActive={false}` on both `Bar`s (mount animation kept bars at height 0 at screenshot time).
  - Review (cavecrew) applied: added `setTheme` no-op-in-controlled-mode caveat to the ThemeProvider story's
    AI_DOCUMENTATION (matches source JSDoc, ThemeProvider.tsx:54). Declined as not-bugs: FormLabel `id` not
    demoed (isolated-label stories by design; axe-clean standalone label; prop doc accurate), Chart
    `primary-40` "undefined" (verified in themes.css + gray Mobile bars render), `Inner` remount (Uncontrolled
    renders once, no own state → no remount; MDX forces inner def), Form "accessible by default" (message
    linked via `aria-describedby` — claim scoped to id/aria wiring is accurate).
  - **Deviation noted:** skipped the dedicated simplification subagent for this slice — stories are doc-only,
    already minimal, and the reviewer surfaced only doc-accuracy nits (nothing to simplify).
- 2026-06-15 **FINAL (local) DONE** — gate green; remote PR update + push deferred to user (pushes are
  user-controlled):
  - `pnpm build` regenerated `types/` — pure additions for the 3 new composites (Combobox/DateRangePicker/
    MultiSelect): `+174` `types/index.d.ts`, `+174` `types/ui.d.ts`, 0 deletions, no line-ending churn.
    Committed `4b1ec73 chore(ds): regenerate type declarations for new composite components`.
  - **Full Playwright gate GREEN: 1203 passed, 0 failed (58.5s).** smoke = every story; a11y = component
    stories × {neutral, uzh}, fail-on serious+critical. New stories all covered and clean both themes:
    combobox/date-range-picker/multi-select (default/preselected/disabled), chart, form (RHF), form-label
    (small/large/required/with-tooltip), theme-provider (default/uncontrolled). NEW stories added 0 serious/
    critical findings → a11y backlog unchanged.
  - **Security review subagent (sonnet, general-purpose): SECURE — no findings** across 5 threat categories
    (XSS/HTML injection, aria/id/data-* injection, eval/Function/ReDoS, new-dep surface, story secrets).
    Confirmed NO new runtime dependency (all reuse existing primitives + dayjs/cmdk/react-day-picker;
    lucide-react/tailwind-merge/@fortawesome already in DS). No `dangerouslySetInnerHTML`, no raw HTML from
    props, no regex.
  - **Branch deviation flagged:** user message said "on a new worktree"; work was done directly in the main
    checkout on branch `v5` (the AskUserQuestion-confirmed landing target / PR #179). The committed result is
    identical to what a v5 worktree would have produced — surfaced to user for confirmation.
  - **Deferred to user:** push the accumulated v5 commits, then update PR #179 via `$df-mr-description-writer`
    (whole-branch). Not done unilaterally — pushes are user-controlled and the remote PR diff must reflect
    pushed commits before its body is rewritten.
- 2026-06-16 **Chart theming bug fixed; Ladle-chrome experiment reverted.**
  - Root cause: `@theme inline` (tailwind.css:95) maps `--color-primary-100: var(--theme-color-primary)`, but the
    `:root`-level `--color-primary-*` ramp resolves ONCE at root (neutral) — a raw `var(--color-primary-100)`
    read in JS does NOT follow `data-theme`. (Tailwind UTILITIES like `bg-primary-100` inline `var(--theme-color-*)`
    and DO theme — only raw-`var` reads are pinned.) The C4 Chart story fed `var(--color-primary-100/-40)` into the
    recharts `config`, so bars stayed neutral-black/grey in uzh = "component not styled."
  - Fix (`873419a`): Chart config now uses the theme-reactive intermediates `var(--theme-color-primary)` /
    `var(--theme-color-primary-40)`; README/AI-doc updated to steer recharts colors at `--theme-color-*` (not the
    static `--color-primary-*` ramp). Verified: uzh bars `#0028a5` + `#99a9db`, neutral `oklch(0.205)` + `oklch(0.72)`;
    chart smoke + a11y (neutral+uzh) green.
  - Reverted (`1d00e74`) the earlier Ladle global-chrome theming (`027566f`): user only wants the DS COMPONENTS
    themed, not Ladle's own menu/toolbar chrome. Chrome experiment also had a dark-axis bug (our `dark` darkened
    tokens while Ladle chrome stayed light → near-white active item on white). Both `.ladle/` files back to original.

## Next Steps
- **Push + PR #179 body.** On user go: push v5, then run `$df-mr-description-writer` to update PR #179 for the
  whole branch (R1–R7 conformance + Ladle-vs-Storybook ADR + a11y/Playwright harness + the 3 composites +
  4 doc-gap stories). Add desktop screenshots of the new composites (neutral + uzh) to the PR.
- **Data Table (TanStack) decision.** Still deferred — needs `@tanstack/react-table` (heavy new dep). Decide
  scope/owner before committing; out of this round by design.
- **Formik variants of the new composites.** If UZH apps need form-bound versions, add `FormikCombobox` /
  `FormikMultiSelect` / `FormikDateRangePicker` (native `name`/hidden-input + Formik field wiring) — tracked
  here, not built (YAGNI until a consumer needs it).
- **a11y CI gate triage (separate track).** CI stays smoke-only; the pre-existing button-name/label backlog
  is untouched by this round (new comps are axe-clean). Triage + re-enable the a11y gate as its own effort.
- **VRT (visual regression).** Per the VRT plan, the new composites are good first candidates once the
  Docker-determinism baseline lands.

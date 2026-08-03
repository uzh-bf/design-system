# W2 — selector rollout completion (v5)

Branch: `rs/v5-selector-rollout` · Worktree: `trees/rs-v5-selector-rollout`
Base: `v5` at `2fc8f915` (merge of [PR #190](https://github.com/uzh-bf/design-system/pull/190), W1)
Plan owner: this file. Roadmap: `project/2026-08-02-v5-post-a3-next-roadmap.md`.

## Why this slice is smaller than the roadmap predicted

W2 was scoped as an "inventory-backed rollout" that would migrate remaining
`dataAttributes`, `dataX`, and `Record<string, string>` selector forms onto the
v5 `{ cy?: string; test?: string }` shape. A full inventory taken at `2fc8f915`
shows that migration is already complete:

| Shape | Components | Notes |
| --- | --- | --- |
| Unified `data` prop only | 22 | Includes `Table` and `Workflow` from W1 |
| Named per-element `dataX` props only | 5 | `Calendar`, `ColorPicker`, `DatePicker`, `DateRangePicker`, `DatetimePicker` |
| Both `data` and per-element props | 3 | `Modal`, `Slider`, `Tooltip` |
| No selector prop at all | 37 | `Card`, `Popover`, `Sidebar`, `Accordion`, and similar |
| Legacy or deviant value shape | 0 | No `dataAttributes`, no attribute record, nothing permitting `data-testid` |

That table counts the 67 top-level `src/*.tsx` components only, resolving
inherited props through `src/ui/*.tsx`. The 17 `src/forms/*.tsx` components were
inventoried separately and also carry no deviant value shapes.
`src/original/*.tsx` is dead code, imported by nothing in `src` or `tests`, and
is excluded throughout.

Every selector prop in shipped source already carries the exact v5 shape, and no
`.tsx` file under `src` contains `data-testid`. `Table` was the last holdout and
W1 closed it. So W2 is not a type migration. What remains is one wiring defect,
an API asymmetry, and a documentation corpus that still teaches the pre-v5
shape.

## Rulings that scope this slice

Ruled by the user on 2026-08-03, before implementation:

1. **Root `data` on the five per-element-only components: yes.** `Calendar`,
   `ColorPicker`, `DatePicker`, `DateRangePicker`, and `DatetimePicker` gain a
   component-level `data` prop, matching `Modal`, `Slider`, and `Tooltip`, which
   already expose both. Purely additive; no existing call site breaks.
2. **Blanket retrofit of the 37 selectorless components: no.** They stay as
   they are. Role- and label-based queries already address them, and a component
   gains `data` later when a real consumer needs it.

Decided by the agent during plan review, subject to the user's veto:

3. **`FormikColorPicker` gets the root pass-through.** See W2.2 and boundary 5.

## Work packages

### W2.1 — fix the ColorPicker selector wiring defect

`src/ColorPicker.tsx:253` renders `data-text={dataHexInput?.test}`. The attribute
name is misspelled, so a correctly typed `dataHexInput.test` value never reaches
the DOM. The declared type at `src/ColorPicker.tsx:52` is correct, which is why
no type check catches it.

Fix the attribute to `data-test`. The misspelling entered at `f7cd6d65` (PR #56,
2023-06-15) with the component itself, so it has shipped in every release since;
`557b339e` only relocated the file during the monorepo transform, which is why a
path-scoped history search without `--follow` appears to stop there. `data-text`
appears in no documented
contract and was already logged as known debt in
`project/2026-07-20-pr-182-v5-a11y-level-a-plan.md:208`. Treat it as a defect
fix, and note it in `MIGRATION.md` under W2.6 since it is the one place a real
Cypress assertion could break.

### W2.2 — add root `data` to the five per-element-only components

Add an optional `data?: { cy?: string; test?: string }` to each, rendered as
`data-cy` / `data-test`. Do not follow "the Modal pattern": `Modal` and `Tooltip`
render their root selector on the *trigger*, `Slider` on the component root, so
there is no single established precedent. On the pickers the trigger element is
already occupied by `dataTrigger` (`src/DatePicker.tsx:146`,
`src/DateRangePicker.tsx:139`, `src/DatetimePicker.tsx:771`), and a second
`data-cy` on the same JSX element is a TypeScript error.

Exact target element per component:

| Component | Target element | Note |
| --- | --- | --- |
| `ColorPicker` | outer `<div>` at `src/ColorPicker.tsx:135` | always mounted |
| `DatePicker` | wrapper `<div>` at `src/DatePicker.tsx:112` | inside `<Popover>`, outside `<PopoverContent>`, so mounted when closed |
| `DateRangePicker` | wrapper `<div>` at `src/DateRangePicker.tsx:110` | same structure |
| `DatetimePicker` | wrapper `<div>` at `src/DatetimePicker.tsx:737` | same structure |
| `Calendar` | `<DayPicker>` root at `src/ui/calendar.tsx:33` | declared alongside the existing props at `src/ui/calendar.tsx:27-28` |

The root `data` must not land on a trigger `<Button>`; `dataTrigger` owns that
element. Do not touch the existing per-element props: their shapes conform, and
collapsing a multi-control API into one ambiguous selector is forbidden by
boundary 4.

Two prop-forwarding traps, both of which produce a wrong-looking DOM rather than
a compile error:

- `src/ui/calendar.tsx` spreads `{...props}` into `<DayPicker>` at line 186, and
  its props type is `React.ComponentProps<typeof DayPicker> & {...}`. The new
  `data` prop must be destructured out, or React forwards it as an
  object-valued DOM attribute.
- `DatePicker` and `DatetimePicker` spread `{...props}` into `<Calendar>`
  (`src/DatePicker.tsx:198`, `src/DatetimePicker.tsx:857`). Once `data` exists on
  their interfaces, an undestructured `data` lands on the calendar inside the
  popover instead of the component root. Destructure it in the signature.

`FormikDatePicker` and `FormikDatetimePicker` extend their base props and forward
`{...props}`, so they inherit the new prop automatically.
`src/forms/FormikColorPicker.tsx:8` declares a standalone interface with a closed
prop list, so it inherits nothing. Add the root `data` pass-through there too,
under the narrow exception in boundary 5, so the Formik path does not ship a
selector on two of three pickers for no stated reason.

### W2.3 — correct the story documentation corpus

Story files document the pre-v5 attribute-record shape, for example
`data={{ 'data-cy': 'x', 'data-testid': 'y' }}` where the supported form is
`data={{ cy: 'x', test: 'y' }}`. None of it type-checks, because MDX prose and
code fences are not compiled. Every affected line sits inside a ```tsx fence, so
this package is DOM-neutral.

Top-level stories, 22 code lines plus 2 prose lines across 10 files:

| File | Defect |
| --- | --- |
| `DatePicker.stories.mdx` | 4 code lines, plus a prose claim of "both data-cy and data-testid" support |
| `DatetimePicker.stories.mdx` | 4 code lines |
| `Tabs.stories.mdx` | 4 code lines |
| `Navigation.stories.mdx` | 2 code lines |
| `Slider.stories.mdx` | 2 code lines |
| `Tooltip.stories.mdx` | 2 code lines |
| `Header.stories.mdx` | 1 code line carrying both keys |
| `NotificationBadgeWrapper.stories.mdx` | 1 code line, plus the same prose claim |
| `Select.stories.mdx` | 1 code line |
| `Switch.stories.mdx` | 1 code line |

Forms stories, 9 further code lines across 5 files: `TextField.stories.mdx`,
`TextareaField.stories.mdx`, `NumberField.stories.mdx`,
`SelectField.stories.mdx`, `Label.stories.mdx`. These five components carry no
`@deprecated` marker, are exported from `src/index.ts`, and already declare the
correct v5 shape, so the roadmap's carve-out for "deprecated Formik components"
does not reach them.

Deliberately excluded: the 8 `Formik*.stories.mdx` files, holding 28 further
record-shape lines. They document the frozen, `@deprecated` Formik surface that
the roadmap excludes at line 210. This is a recorded decision, not an oversight.

W1's record listed 8 files because it scanned only for `data-testid`.
`Select.stories.mdx` and `Switch.stories.mdx` use the record shape with `data-cy`
alone, and the entire `src/forms/` tree went unscanned. This plan supersedes that
count.

Rewrite every in-scope example to the supported shape and delete the two prose
claims that the library supports `data-testid`. It does not, at any level.

Trap: `{ cy, test }` in MDX running text is parsed as a JSX expression and breaks
the story at runtime. Use backticked field names in prose. Code fences are safe.

### W2.4 — DOM contracts for the changed surface

Extend `tests/smoke/test-selectors.spec.ts` and the type fixture
`tests/contracts/test-selectors.types.ts` to cover the five new root props and
the corrected `ColorPicker` attribute.

CI runs `tests/smoke` and `tests/a11y` but not `tests/contracts`; type fixtures
are enforced only by their entry in `tsconfig.types.json`. Runtime proof must
live under `tests/smoke` to be gated.

Four of the five are popover-based; `Calendar` renders inline via `<DayPicker>`
and is always mounted. For the four, assert on the closed-state root, which the
target table above places outside `<PopoverContent>`. Additionally assert that
the calendar inside the popover does *not* carry the root selector, so the
prop-forwarding trap in W2.2 cannot pass silently.

Story surface: extend the existing `public-contracts--default` story that
`tests/smoke/test-selectors.spec.ts:5` drives, rather than adding a story id.
Note the consequence: a11y waivers in `tests/a11y/stories.spec.ts` are
story-id-scoped, so markup moved onto a `public-contracts--` story loses the
waiver it had under its own id. If any of the five carries a violation waived
only under `calendar--`, `color-picker--`, `date-picker--`,
`date-range-picker--`, or `datetime-picker--`, the a11y suite goes red. None of
those prefixes appears in a current allowlist entry, so this is expected to be
clean, but it is a stop-and-report condition rather than a licence to widen a
waiver.

### W2.5 — correct the roadmap's stale W2 section

`project/2026-08-02-v5-post-a3-next-roadmap.md` describes migrating
`dataAttributes` and `Record<string, string>` forms that do not exist at
`2fc8f915`. Rewrite that section to match the inventory and record both user
rulings. Preserve its `MIGRATION.md` obligation from line 208 rather than
dropping it with the stale text.

### W2.6 — update MIGRATION.md

The roadmap assigns this to W2 at line 208. Three edits, all of which this slice
makes necessary:

- `MIGRATION.md:288-290` says stale `data-testid` story docs "are being
  corrected". Restate it as what is actually true at the end of W2: the
  top-level and non-deprecated forms stories are corrected; the deprecated
  Formik stories still show the old shape.
- `MIGRATION.md:292-297` describes a taxonomy where composites have *either* one
  `data` prop *or* per-element props. W2.2 breaks that: the pickers will carry
  both. Rewrite it, and while there, correct the `Modal` list, which names
  `dataContent`/`dataCloseButton`/`dataPrimaryAction` but omits
  `dataSecondaryAction`.
- Add a line recording that `ColorPicker`'s `dataHexInput.test` now renders as
  `data-test`, previously the misspelled `data-text`.

## Boundaries

Carried from the roadmap and still binding:

1. `v5` is the only target branch. No merge, rebase, PR, or promotion into
   `main`.
2. No tag, no npm publish, no alpha, no consumer pilot, no GA claim.
3. The supported value shape is exactly `{ cy?: string; test?: string }`. Do not
   introduce `data-testid` anywhere, including docs.
4. Do not collapse a multi-control API into a single ambiguous selector.
5. No refs work, theme changes, visual redesign, bundle changes, export changes,
   or new dependencies. **Named exception:** Formik work is limited to adding the
   inherited root `data` pass-through to `FormikColorPicker`. Nothing else in
   `src/forms/*.tsx` is touched.
6. Do not retrofit the 37 selectorless components. That was ruled out.
7. Do not remove `trees/rs-v5-test-selector-contract` or its branch. Cleanup
   needs a separate explicit request.
8. Scope ambiguity, source drift, or a failed contract is a stop-and-report
   condition, not licence to widen the slice.

## Verification

Run from `packages/design-system` with the `VOLTA_FEATURE_PNPM=1` prefix:

- `pnpm check` — `tsc --noEmit` plus `tsc -p tsconfig.types.json --noEmit`
- `pnpm lint` — `eslint --max-warnings 0`. Note `eslint.config.mjs:22` globally
  ignores `**/ui`, so the `Calendar` edit is covered by `pnpm check` and the
  smoke test only, not by lint.
- `pnpm format:check`
- `pnpm build` — confirm the five new root props reach `dist/index.d.ts`
- `pnpm build:ladle` — required, because this slice changes fifteen story files
- `tests/smoke` plus `tests/contracts` — expect the current 470 to rise by the
  number of added cases
- `tests/a11y` — two separate expectations. The case count stays at 772, because
  the total is `themes x story ids` (`tests/a11y/stories.spec.ts:121-125`) and no
  story id is added or removed. Separately, the suite must stay green; a green
  772 proves the story-id set is unchanged, not that the slice is a11y-neutral.

## Gates before the PR is presented

Per the mandatory review gates: this plan is reviewed read-only before
implementation (done 2026-08-03; seven findings, all verified and folded in);
each slice outcome is reviewed before the next starts; the integrated branch
gets a maintainability gate, a bounded security gate, and an independent branch
review after verification, before the PR is published.

## Progress

- 2026-08-03: Branch and worktree created at `2fc8f915`. Inventory completed and
  verified: 0 deviant shapes, 8 components with per-element props, 37 with none,
  `src/original` confirmed dead. Both scope rulings obtained.
- 2026-08-03: W2.4, W2.5 and W2.6 complete. Full suite green at 1245 tests: 473
  smoke plus contracts (three new selector cases) and 772 a11y, unchanged as
  predicted, so adding the five components to `public-contracts--default` cost
  no story-id waiver.
- 2026-08-03: **`pnpm build:ladle` fails open.** A story importing a missing
  export produced a rollup error, left the previous `build/` in place, and still
  exited 0, so `pnpm test` ran its whole suite against stale content and
  reported green. The three new selector tests failed only because they asserted
  on markup the stale build did not contain; had they been weaker, the slice
  would have looked verified while proving nothing. Anything trusting a green
  local run must confirm `build/` actually contains the markup under test. Worth
  a follow-up slice to make the build exit non-zero. Note `DatetimePicker.tsx`
  has no default export; the component is `DateTimePicker`, capital T.
- 2026-08-03: Plan review gate run. Seven findings, all independently verified
  against source and folded in: the `src/forms/` doc corpus was missing entirely
  (5 in-scope files, 8 excluded), `MIGRATION.md` was dropped despite roadmap line
  208, W2.2's placement instruction was self-contradictory and collided with
  `dataTrigger`, `Calendar` is not popover-based, `FormikColorPicker` inherits
  nothing, two `{...props}` spreads can silently misplace the new prop, and the
  a11y expectation conflated case count with suite health. Story-doc scope
  restated from 8 files to 15 files / 33 lines.

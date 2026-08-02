# Plan — v5 composite refs and Table migration (Stack A3)

## Identity and status

- Date: 2026-08-02
- Status: approved execution plan; implementation not started
- Repository: `/Users/rschlae/Git/df/design-system`
- Worktree: `trees/rs-v5-composite-refs`
- Branch: `rs/v5-composite-refs`
- Target/trunk: `v5`
- Base: `b7d72b5f309594ebfb02261c1fb35e85345a88bd` (merged A2, PR #187)
- Parent layers: A1 PR #186 and A2 PR #187, both merged into `v5`
- PR: none yet; the branch is an empty v5-aligned placeholder
- Release policy: this work may be reviewed and submitted as a draft PR into
  `v5`; it must not target or merge into `main`, tag, publish, or merge
  without a separate explicit authority decision
- Plan owner: primary Codex session; Sol provided the independent inventory
  and implementation recommendation recorded below

This is the execution plan for Stack A3 in the release-readiness roadmap. A1
and A2 are already merged, so A3 is now one standalone review layer rooted at
the current `v5` trunk. It is not a dependent PR targeting either predecessor,
and it is not a reason to create a new native stack topology.

## Goal

Give every applicable v5 composite one honest React 19 `ref` contract aimed at
its meaningful interactive target, and replace Table's bespoke
`forwardedRef` prop with a typed imperative `ref`. Keep behavior, keyboard
interaction, accessibility, styling, exports, and package boundaries stable
except for the intentional breaking ref-contract changes documented for v5.

## Current verified state

| Surface              | Evidence and consequence                                                                                                                                                                                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v5`                 | Local `v5`, `origin/v5`, `rs/v5-composite-refs`, and `origin/rs/v5-composite-refs` all point to `b7d72b5f`; no A3 PR exists.                                                                                                                                                                         |
| `main`               | `origin/main` is a separate release line and is explicitly out of scope. No command in this plan may target it.                                                                                                                                                                                      |
| A1/A2                | PR #186 (`66a3f649`) and PR #187 (`b7d72b5f`) are merged into `v5`; their plans define the React 19 ref-as-prop convention and the `Button asChild` safety boundary.                                                                                                                                 |
| Native stack support | GitHub's native stacks endpoint is available, but A3 has no child layer. Use the existing branch and ordinary/native draft submission mechanics only after the final gates. Never invent a replacement stack, rebase through the trunk, queue, reorder, unstack, delete, or merge without authority. |
| Worktree hygiene     | `trees/` is ignored and the dedicated worktree is clean. The root checkout has unrelated untracked `.pnpm-store/` and roadmap artifacts and must not be used for implementation.                                                                                                                     |
| Package manager      | The repository's `pnpm` wrapper stops at its pinned registry-signature check. Use the installed package binaries for local checks; do not change dependencies or bypass the signature policy.                                                                                                        |
| Browser proof        | Ladle production build and direct Playwright binaries are available. Real story interaction is the validation path for ref placement, focus, keyboard, open/close, and Table reset behavior.                                                                                                         |

## Problem and design contract

The A2 direct-control layer established normal React 19 refs for Button,
fields, and Select/Combobox triggers. A3 must extend the same convention to
composites without exposing wrappers, decorative roots, arbitrary child types,
or stale aliases. The current Table is the only public bespoke alias found by
the source inventory:

- `packages/design-system/src/Table.tsx` accepts `forwardedRef?:
React.Ref<unknown>` and passes it to `useImperativeHandle`.
- `Table.stories.mdx` documents both `ref` and `forwardedRef`, while the
  `ResetTable` story still calls `forwardedRef={ref}`.
- The migration guide explicitly defers Table and composite refs after A2.

Table's new public type is:

```ts
export interface TableRef {
  reset(): void;
}

export interface TableProps<RowType extends BaseRowType> {
  ref?: React.Ref<TableRef>;
  // existing props remain unchanged
}
```

`useImperativeHandle(ref, ...)` must preserve the existing reset semantics.
The ref is an imperative `TableRef`, not an `HTMLTableElement`; the contract
must not claim DOM methods that Table does not expose.

For DOM composites, the public `ref` is a concrete `React.Ref<T>` passed to
the one visible, focusable target. No new `forwardedRef`, `unknown`, wrapper
ref, polymorphic-ref abstraction, or compatibility alias is allowed.

## Sol's independent inventory and decision

Sol reviewed the live v5 source and returned `DONE_WITH_CONCERNS`. The concern
was that a Table-only patch would leave the roadmap's deferred composite-ref
work incomplete, while `DateTimePicker` currently promises a hybrid button/date
object that is not the runtime object returned after object spreading a DOM
button. The recommendation is accepted for this plan: include every listed
composite with one stable meaningful target, and stop rather than preserve an
unverified legacy DateTimePicker pseudo-value handle.

### Included DOM composites

| Component              | Source                               | Ref target and reason                                                     |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| `Checkbox`             | `src/Checkbox.tsx`                   | `HTMLButtonElement`, Radix checkbox root                                  |
| `Switch`               | `src/Switch.tsx`                     | `HTMLButtonElement`, Radix switch root                                    |
| `Slider`               | `src/Slider.tsx`                     | `HTMLSpanElement`, the single focusable Radix thumb                       |
| `Collapsible`          | `src/Collapsible.tsx`                | `HTMLButtonElement`, the Radix trigger                                    |
| `Dropdown`             | `src/Dropdown.tsx`                   | `HTMLButtonElement`, the visible menu trigger                             |
| `MultiSelect`          | `src/MultiSelect.tsx`                | `HTMLButtonElement`, the visible popover trigger                          |
| `SelectField`          | `src/forms/SelectField.tsx`          | `HTMLButtonElement`, delegated through `Select`                           |
| `AlphaNumericPinField` | `src/forms/AlphaNumericPinField.tsx` | `HTMLInputElement`, the underlying `input-otp` input                      |
| `ColorPicker`          | `src/ColorPicker.tsx`                | `HTMLButtonElement`, the palette trigger                                  |
| `DatePicker`           | `src/DatePicker.tsx`                 | `HTMLButtonElement`, the calendar trigger                                 |
| `DateRangePicker`      | `src/DateRangePicker.tsx`            | `HTMLButtonElement`, the calendar trigger                                 |
| `DateTimePicker`       | `src/DatetimePicker.tsx`             | `HTMLButtonElement`, the calendar trigger; remove the pseudo-value object |

The exact prop names, state model, labels, and child content remain unchanged.
Only the ref seam and the documentation/tests needed to prove it are in scope.
For Radix and `input-otp` components, verify the installed declarations before
choosing the target type; if the rendered target differs from this table, stop
and record the mismatch instead of widening the contract.

### Included Table contract

`TableRef` is exported from `src/Table.tsx` through the existing root export.
Remove `forwardedRef` from the public props and from all README, AI-documentation,
story, migration, and test prose. A consumer using `forwardedRef` must fail the
durable type fixture; the supported before/after migration is:

```tsx
// v4 / pre-A3
<Table forwardedRef={tableRef} ... />

// v5
const tableRef = useRef<TableRef>(null)
<Table ref={tableRef} ... />
```

### Explicit exclusions

- Deprecated `Formik*` wrappers: frozen for v5 and removed in v6; do not
  modernize their ref APIs as part of A3.
- `Modal` and `Tooltip`: `asChild` triggers can be arbitrary elements, so a
  single concrete target would be unsound.
- `Navigation`, `Tabs`, `Workflow`, and `StepProgress`: they expose multiple
  independently focusable controls and have no honest singular target.
- `Tag` and `UserNotification`: focus is conditional or secondary rather than
  a stable public control contract.
- Headers, progress/countdown/theme/layout wrappers, and other passive
  composites: ceremonial refs add API without useful imperative leverage.
- Raw primitives under the existing `./primitives` export: their own
  React/Radix contracts already own refs.
- Selector normalization, visual redesign, a11y CI policy changes, Formik
  modernization, polymorphic-ref abstraction, package-export changes, bundle
  work, new dependencies, release/tag/publish, and any `main` operation.

## Decision gates and stop conditions

| Gate                              | Decision/evidence required                                                                                                                | Stop if                                                                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| D1 — base                         | `origin/v5` and the placeholder branch still equal `b7d72b5f`; worktree is clean before implementation                                    | v5 moves or unrelated work appears in the A3 worktree; checkpoint and ask before rebasing or widening                            |
| D2 — target                       | Each included component has exactly one visible interactive target matching the inventory                                                 | A candidate is polymorphic, conditional, multi-target, or lands the ref on a wrapper                                             |
| D3 — DateTimePicker compatibility | No verified consumer requires the old pseudo-ref `.value` property; selected date remains available through controlled `value`/`onChange` | A real consumer depends on `.value`; stop and ask for a compatibility decision rather than silently preserving an unsound object |
| D4 — behavior                     | Focus, keyboard, open/close, selection, Table sorting, reset, and a11y behavior remain green                                              | Any regression in these behaviors or in accessible names/roles                                                                   |
| D5 — declarations                 | Built declarations expose the concrete targets and `TableRef`; no `forwardedRef` remains                                                  | Generated declarations are widened, stale, or retain the alias                                                                   |
| D6 — publication                  | All review, security, maintainability, CI, and description gates pass before a draft PR is submitted                                      | A gate is missing, blocked, or only assumed from a plan file                                                                     |

## Work sequence and commit boundaries

The plan itself travels with the implementation. Each implementation slice is
small enough to review and verify independently, and each slice gets a
current-provider review plus a separate simplification pass before the next
slice. Do not combine generated declaration churn into earlier source commits;
regenerate after the source contract is stable.

### W0 — plan and inventory (first commit)

**Do**

- Add this file as the only staged change on the existing A3 branch.
- Record the live base, worktree, target, topology, Sol result, included and
  excluded inventory, tests, gates, and authority boundaries.

**Check**

- Inspect `git diff --cached` for secrets, credentials, private URLs, PII, and
  unrelated root-worktree files.
- Run Prettier on the plan and confirm the worktree contains only the plan.

**Commit**

`docs(project): add v5 composite refs plan`

### W1 — concrete DOM ref contracts

**Do**

- Add explicit `ref?: React.Ref<T>` props to the twelve included DOM
  composites and destructure/thread them to the exact target in the inventory.
- For `SelectField`, pass the ref through the existing `Select` prop; do not
  expose the `Select` wrapper div.
- For `AlphaNumericPinField`, pass the ref through `InputOTP` to the actual
  input and verify the installed `input-otp` type supports it.
- For `DateTimePicker`, replace the public `React.forwardRef` pseudo-handle
  and `useImperativeHandle` with a normal React 19 ref-as-prop function,
  retain the internal button ref only if needed for local behavior, and expose
  the actual trigger `HTMLButtonElement`. Redefine the exported
  `DateTimePickerRef` compatibility name as `HTMLButtonElement` only if that
  keeps existing type imports useful; document that `.value` is removed.
- Preserve all existing event handlers, controlled state, labels, data
  attributes, Radix composition, and theme classes.

**Check**

- Add `tests/contracts/composite-refs.types.ts` and include it in
  `tsconfig.types.json`. Positive cases use the exact target for every
  component; negative `@ts-expect-error` cases cover a wrong DOM target,
  missing/unsupported aliases, and Table's separate imperative type.
- Use no new abstraction until repeated implementation is proven; direct
  prop threading is preferred.
- Run direct TypeScript, focused ESLint, and Prettier before review.

**Commit**

`feat(refs): expose v5 composite DOM refs`

### W2 — Table imperative ref migration

**Do**

- Add and export `TableRef { reset(): void }`.
- Change `TableProps` from `forwardedRef?: React.Ref<unknown>` to
  `ref?: React.Ref<TableRef>` and pass it to `useImperativeHandle`.
- Keep generic row constraints, sorting state, default sort behavior, and
  reset behavior unchanged.
- Remove every `forwardedRef` source reference from Table implementation and
  public type surfaces.

**Check**

- Extend the durable type fixture with a valid `TableRef` callback/object ref,
  a wrong `HTMLTableElement` ref, and `@ts-expect-error` for `forwardedRef`.
- Add a focused runtime contract for `ref.current.reset()` and a reset from a
  non-default sort state; keep the existing Table keyboard/a11y contract
  (aria-sort none → ascending → descending → ascending) intact.
- Run package type checks and the focused Table contract before review.

**Commit**

`enhance(refs): migrate Table to the typed ref contract`

### W3 — stories, migration, and focused runtime proof

**Do**

- Update `Table.stories.mdx`: remove `forwardedRef` from README and AI docs,
  use `useRef<TableRef>(null)`, call `ref.current?.reset()`, and add a stable
  selector for the reset proof if the existing story lacks one.
- Add or extend a focused composite-ref Ladle story with one deterministic
  focus action per included target. Keep the story accessible in neutral and
  UZH themes; do not create visual redesign work.
- Add `tests/contracts/composite-refs.spec.ts` using the existing Ladle
  helpers. Assert actual `document.activeElement` identity for each target;
  for stateful triggers exercise Enter/open, Escape/close, selection where
  applicable, and focus return. For Slider assert the thumb; for OTP assert
  the underlying input; for Table assert sorting and reset.
- Update `packages/design-system/MIGRATION.md` with the complete component →
  target table, the `forwardedRef` → `ref` Table example, `TableRef`, and the
  DateTimePicker change from the pseudo-value handle to the real button. Tell
  consumers to read the selected date from controlled state.
- Search all package stories/docs/source for `forwardedRef`; only historical
  migration wording describing the removed API may remain, and it must be
  intentional.

**Check**

- Direct changed-file ESLint, Prettier, package type checks, and the focused
  Playwright contract.
- Run the full `tests/a11y` suite separately from the focused proof; preserve
  existing Table keyboard coverage and all A1/A2 behavior.
- Capture neutral/UZH Ladle screenshots for the changed story states if the
  PR evidence path accepts them; if no visual output changed, record that
  rationale in the PR rather than inventing visual snapshots.

**Commit**

`test(refs): prove composite focus and Table reset contracts`

### W4 — generated artifacts, final verification, and progress

**Do**

- Run the package build to regenerate declarations and copied assets; inspect
  the generated `dist` declarations for each concrete ref target,
  `DateTimePickerRef`, `TableRef`, and absence of `forwardedRef`.
- Append verified results, exact commands, and any pre-existing tool warnings
  to this plan's `Progress` section. Do not rewrite prior entries.
- Commit only generated output and progress when source behavior is already
  reviewed.

**Check**

- Run all mandatory gates below and record pass/fail separately; a green
  report is evidence only when the producing build/test actually ran.

**Commit**

`chore(refs): refresh v5 composite declarations`

## Verification matrix

Use repository-native tools and the installed binaries where the pnpm wrapper
is blocked. Run from the A3 worktree; do not run Git or forge commands inside a
container.

| Gate                     | Command/evidence                                                                                              | Required result                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Source type check        | `./node_modules/.bin/tsc --noEmit` from `packages/design-system`                                              | pass                                                                    |
| Durable contract types   | `./node_modules/.bin/tsc -p tsconfig.types.json --noEmit`                                                     | pass with all intended `@ts-expect-error` cases consumed                |
| Changed-file lint        | `./node_modules/.bin/eslint <changed TS/TSX files> --report-unused-disable-directives --max-warnings 0`       | pass                                                                    |
| Formatting               | `./node_modules/.bin/prettier --check <changed files>`                                                        | pass; pre-existing legacy MDX drift recorded, not reformatted wholesale |
| Library build            | package `tsc -b`, Vite build, copy step through direct binaries or `pnpm` if the signature check is available | pass; declarations inspected                                            |
| Ladle                    | `./node_modules/.bin/ladle build` with `LADLE=true`                                                           | pass; changed stories present in metadata                               |
| Focused runtime          | `PWTEST_SKIP_BUILD=1 ./node_modules/.bin/playwright test tests/contracts/composite-refs.spec.ts`              | all target focus/open-close/reset cases pass                            |
| Existing Table behavior  | focused Table keyboard contract                                                                               | aria-sort and keyboard cycle remain green                               |
| Full accessibility       | `PWTEST_SKIP_BUILD=1 ./node_modules/.bin/playwright test tests/a11y` against the built Ladle output           | full suite passes; report neutral/UZH separately if applicable          |
| Security                 | bounded `$security-review` over the exact implementation range                                                | no unverified high-confidence issue; pre-existing findings separated    |
| Maintainability          | mandatory `$thermo-nuclear-code-quality-review` over the exact final range                                    | pass or verified findings resolved                                      |
| Independent final review | opposing provider or `agy` where available; current-provider fallback recorded if unavailable                 | no unresolved blocking finding                                          |
| Forge/CI                 | required checks on the draft PR                                                                               | green before ready-for-review; do not merge in this goal                |

## Review and publication routing

- Review exact commits, not a moving worktree. Commit the plan first and give
  reviewers the exact range for every slice.
- Use the configured current-provider reviewer for W0/W1/W2/W3 and a separate
  simplification pass after each implementation review. Verify every finding
  against the live source before changing code.
- Run the mandatory final security and thermo-nuclear maintainability gates on
  the complete A3 range. Add an independent opposing-provider review at final
  close-out when it can inspect the live range; otherwise record the fallback.
- Once all local gates pass, submit one draft PR targeting `v5` with the
  conventional title `feat(refs): complete v5 composite ref contracts` (or
  the repository's equivalent native-stack title). Update the whole-branch
  description with `$rs-mr-description-writer`, exact test evidence, changed
  public contracts, migration notes, and the explicit no-main boundary.
- Keep the PR draft until the user separately authorizes ready-for-review.
  This goal does not authorize merge, queue, tag, release, package publish,
  worktree cleanup, branch deletion, or any operation involving `main`.

## Risks and mitigations

| Risk                                                           | Mitigation                                                                                                                           |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| A ref lands on a wrapper, portal, or decorative root           | Type each target concretely and assert `document.activeElement` against the visible control.                                         |
| Radix `asChild` creates a polymorphic target                   | Exclude Modal/Tooltip and reject/widen nothing; stop on any target not proven stable.                                                |
| DateTimePicker consumers use `.value` on the old pseudo-handle | Search repository consumers and stop at D3 if a real dependency is found; controlled `value` remains the documented source of truth. |
| Table's imperative handle is mistaken for a DOM ref            | Export `TableRef`, reject HTML element refs, and test `reset()` explicitly.                                                          |
| Composite state or keyboard behavior regresses                 | Run focused open/select/close/focus-return contracts plus the full a11y suite and existing Table keyboard test.                      |
| Broad scope becomes a redesign                                 | Keep changes to prop/ref threading, docs, tests, and generated declarations; defer any visual or structural redesign.                |
| Tooling output is falsely interpreted                          | Read producing logs/counters, separate pnpm signature warnings from test failures, and never call an unrun check green.              |

## Progress (append-only)

- 2026-08-02: Verified `v5`, `origin/v5`, and the A3 placeholder at
  `b7d72b5f`; confirmed A1/A2 PRs #186/#187 merged into `v5`, no A3 PR, clean
  dedicated worktree, ignored `trees/`, and explicit prohibition on `main`.
- 2026-08-02: Sol independently reviewed the live source and returned
  `DONE_WITH_CONCERNS`. The concern and accepted resolution are recorded in
  “Sol's independent inventory and decision”: A3 includes the twelve stable
  DOM composites plus Table, while deprecated, passive, polymorphic, and
  multi-target surfaces remain excluded.
- 2026-08-02: Plan authored as the first A3 branch change. Implementation,
  review, final gates, and draft PR publication remain pending.

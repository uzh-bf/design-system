# Plan — v5 direct-control refs (Stack A2)

## Problem

A1 deliberately rejects `ref` on the strict public contracts while the
underlying React 19 primitives already have concrete ref targets. Consumers
cannot currently focus the public `Button`, single-input fields, or
`Select`/`Combobox` triggers through the component boundary. The public API
needs one React 19 ref-as-prop convention before v5 consumers start relying on
imperative focus.

## Evidence

- `packages/design-system/src/Button.tsx` composes the shadcn button with
  `ComponentPropsWithoutRef`; it renders the interactive button but exposes no
  public `ref` prop.
- `packages/design-system/src/forms/TextField.tsx`, `NumberField.tsx`, and
  `TextareaField.tsx` each render one underlying input or textarea while their
  public props do not name a concrete ref target.
- `packages/design-system/src/Select.tsx` renders a decorative wrapper around
  a `SelectTrigger` button; a ref must land on that trigger, not the wrapper or
  the Radix root.
- `packages/design-system/src/Combobox.tsx` renders a disclosure button through
  `PopoverTrigger`; a ref must land on the visible trigger, not the popover or
  command input.
- The repository uses React `^19.1.0`, and the approved roadmap requires the
  normal React 19 ref-as-prop contract rather than a second `forwardedRef` API.

## Decision

- Add an explicit, concrete `ref` prop to each in-scope public contract:
  `HTMLButtonElement` for `Button` and `Select`/`Combobox` triggers,
  `HTMLInputElement` for `TextField` and `NumberField`, and
  `HTMLTextAreaElement` for `TextareaField`.
- Pass the ref through the existing primitive boundary without introducing a
  wrapper or changing event, keyboard, accessibility, theme, or loading
  behavior. Model `Button` as a discriminated contract: the native-button path
  (`asChild` omitted or `false`) accepts `React.Ref<HTMLButtonElement>`, while
  `asChild: true` rejects `ref` until a sound polymorphic child-target contract
  is designed. Do not claim an `HTMLButtonElement` ref for an arbitrary child.
- Keep `Select` and `Combobox` refs on their visible interactive triggers. Do
  not expose refs to decorative wrappers, portals, command search inputs, or
  internal Radix roots.
- Keep the A2 surface limited to direct controls and single-input field
  wrappers. Deprecated `Formik*` wrappers, OTP/date/color-picker composites,
  passive layout components, and `Table.forwardedRef` remain outside A2; A3
  owns composite ref inventory and the Table migration.
- Do not add a compatibility alias named `forwardedRef`; the v5 breaking-change
  policy permits the normal `ref` contract.

## Risk

- A ref can compile while landing on a wrapper or a non-interactive descendant;
  runtime focus assertions must prove the actual active element for every target
  class.
- `Button` supports `asChild`; claiming an `HTMLButtonElement` ref for an
  arbitrary child would be unsound. Keep the A2 type/runtime proof on the
  native-button path, reject `asChild` plus `ref` in the type fixture, and record
  any child-target need as a follow-up.
- `Select` and `Combobox` have controlled state and portals. Ref wiring must not
  change open/close behavior, keyboard navigation, accessible names, or the
  selected value.
- Existing field variants have Formik and controlled branches. Both branches
  must forward the same concrete ref target without changing validation or
  event ordering.

## Approved stack context

- Stack: A — public component contracts
- Layer: A2 of 3
- Worktree: `trees/rs-v5-direct-control-refs`
- Branch: `rs/v5-direct-control-refs`
- PR: [#187](https://github.com/uzh-bf/design-system/pull/187)
- Target/trunk: `v5` at `4aa021ac2b8fd43cad6076dcc30071feb87d97f6`
- Parent: A1 `rs/v5-prop-contracts` at `8ac3bfadcb44fa008e669ffc8ffdb268ce5f2b90`
- Dependent: A3 `rs/v5-composite-refs`
- Native stack: `trunk: v5`; all branches are local and unqueued. A2 and its
  dependent A3 currently point at this plan commit while A1 remains the parent.
  Never target or merge this stack into `main`.

## Do

1. Add the explicit ref props and thread them to the concrete DOM targets in
   Button, TextField, NumberField, TextareaField, Select, and Combobox.
2. Add durable no-emit type cases covering valid target refs and negative
   wrong-target refs for every in-scope class, including the invalid
   `Button asChild` plus `ref` combination. Keep the fixture in the package's
   normal `check` gate.
3. Add one focused Ladle contract story and Playwright proof. Each story control
   must expose a deterministic action that focuses its ref target; each test
   must assert `document.activeElement` is the visible interactive element. For
   Select and Combobox, activate the focused trigger and exercise the existing
   open, keyboard-select, close, and focus-return path as well as the ref check.
4. Update the migration guide with the concrete ref target map and the rule
   that A2 uses `ref`, not `forwardedRef`. Do not document deferred composite
   or Table migration as completed.

## Check

- Direct package type check plus the durable ref fixture through the existing
  `check` script.
- Direct ESLint on every changed TypeScript file with
  `--report-unused-disable-directives --max-warnings 0`.
- Prettier on changed code, fixture, story, docs, and plan files; preserve the
  known pre-existing formatter drift in legacy MDX stories.
- Mandatory package `tsc`/Vite/font-copy build and Ladle production build.
- Focused Playwright proof for Button, TextField, NumberField, TextareaField,
  Select, and Combobox ref-driven focus plus the Select/Combobox interaction
  contract described above.
- Full repository `tests/a11y` Playwright suite, run separately from the
  focused ref proof, must remain green. Existing stories and non-ref
  interaction behavior remain green; no visual output is intentionally changed.

## Review routing

- Exact-range current-provider plan review before implementation.
- Exact-range implementation review after the implementation commit.
- Separate simplification pass after implementation review.
- Final Stack A security and maintainability gates were required before draft
  publication and are recorded in Progress. PR #187 is now published as a
  draft; no ready-for-review or merge action is included in this slice.

## Progress

- 2026-08-01: A1 Gate 2 was approved. The native no-trunk rebase completed with
  `v5` untouched; recovery refs are recorded under
  `refs/stack-backup/20260801-220941/`.
- 2026-08-01: Exact-range plan review of `8821341` required the sound
  `Button asChild`/`ref` discriminator, the full `tests/a11y` gate, and
  Select/Combobox open-select-close assertions; those requirements are recorded
  above before implementation.
- 2026-08-01: A2 implementation committed as `f1d117b` after the six direct-
  control contracts, durable no-emit fixture, consumer story, interaction proof,
  and migration guidance were verified. Static gates passed: package source
  and public-contract type checks, changed-file ESLint, Prettier, package
  `tsc -b`, Vite build, font/licence extraction, and Ladle production build.
- 2026-08-01: Focused direct-control Playwright proof passed 3/3 tests. The
  first full `tests/a11y` run completed 768/770 and exposed the two
  `modal--trigger` color-contrast findings (neutral and uzh). Exact-range
  implementation review confirmed that the inherited A1 story change was in
  this reviewed stack, so it was corrected in `e9cc32a` by using the public
  `Button` contract while retaining the story's style mapping. The targeted
  Modal a11y proof and the rerun of the complete suite then passed 770/770,
  including both direct-control story entries and the canary.
- 2026-08-01: Simplification review found one documentation follow-up: the
  `ButtonProps` interface-to-union change can affect consumer wrappers that use
  `interface ... extends ButtonProps`; the migration note now shows the
  intersection form. An ADR was suggested as a future governance improvement,
  but is not required to complete this approved A2 slice.
- 2026-08-01: Final exact-range implementation review over
  `4aa021a..7ce1706` passed with no findings. It independently verified the
  `e9cc32a` Modal correction against the rebuilt bundle and the targeted
  neutral/uzh checks (2/2); the complete rerun is recorded above as 770/770.
- 2026-08-01: Native `gh stack rebase --no-trunk` completed after the final
  A2 evidence checkpoint. A3 now bases on the finalized A2 branch, all local
  stack entries report `needsRebase: false`, and `v5`/`origin/v5` remain at
  `4aa021a`. Recovery snapshots for the stack transitions remain under
  `refs/stack-backup/`.
- 2026-08-02: Final Stack A thermo-nuclear maintainability review over
  `4aa021a..65b2bc6` passed with no structural, abstraction, boundary,
  duplication, spaghetti-growth, or file-size findings. The largest changed
  file is `Navigation.tsx` at 531 lines; fresh TypeScript and changed-file
  ESLint checks also passed.
- 2026-08-02: Bounded security review over `4aa021a..65b2bc6` found no
  high-confidence exploitable vulnerabilities. Differential Opengrep found
  zero findings introduced by the stack; its one current finding is
  pre-existing in the `v5` baseline.
- 2026-08-02: Draft [PR #187](https://github.com/uzh-bf/design-system/pull/187)
  was published as the dependent A2 layer on [PR #186](https://github.com/uzh-bf/design-system/pull/186).
  Both PRs target the `v5` release line; the empty A3 placeholder remains
  local and unsubmitted.
- Next: await CI and reviewer feedback on the draft PRs. Keep `main` out of
  the stack and do not merge or queue any branch from this checkpoint.

## Commit boundaries

- `docs(project): add v5 direct-control refs plan` — this plan only.
- `feat(refs): expose v5 direct-control refs` — A2 implementation, durable
  type proof, focused story/test, and migration note after verification.
- `fix(stories): preserve modal trigger contrast` — verified implementation-
  review follow-up for the inherited Modal trigger story.
- Follow-up documentation commits must remain narrowly scoped to verified
  review findings and verification evidence.

## Out of scope / follow-ups

- A3 composite refs, including deprecated Formik wrappers where they require a
  separate migration decision, OTP/date/color-picker composites, and Table's
  `forwardedRef` removal.
- Stack B selector normalization, Stack C bundle boundaries, Stack D VRT, and
  D8 theme override/migration work.
- Repairing the pnpm registry-signature/toolchain issue.

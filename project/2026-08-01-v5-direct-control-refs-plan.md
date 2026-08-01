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
  behavior. The default `Button` native-button path is the A2 target; alternate
  `asChild` element contracts remain a follow-up if their target cannot be
  typed without weakening the concrete ref guarantee.
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
  native-button path and record any child-target need as a follow-up.
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
- Target/trunk: `v5` at `4aa021ac2b8fd43cad6076dcc30071feb87d97f6`
- Parent: A1 `rs/v5-prop-contracts` at `a6610f822869eeca5759699641c68b6d8dc6e908`
- Dependent: A3 `rs/v5-composite-refs`
- Native stack: `trunk: v5`; all branches are local, unqueued, and currently
  aligned at the A1 parent. Never target or merge this stack into `main`.

## Do

1. Add the explicit ref props and thread them to the concrete DOM targets in
   Button, TextField, NumberField, TextareaField, Select, and Combobox.
2. Add durable no-emit type cases covering valid target refs and negative
   wrong-target refs for every in-scope class. Keep the fixture in the package's
   normal `check` gate.
3. Add one focused Ladle contract story and Playwright proof. Each story control
   must expose a deterministic action that focuses its ref target; each test
   must assert `document.activeElement` is the visible interactive element.
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
  Select, and Combobox ref-driven focus.
- Existing stories and focused a11y behavior remain green; no visual output or
  non-ref interaction behavior intentionally changes.

## Review routing

- Exact-range current-provider plan review before implementation.
- Exact-range implementation review after the implementation commit.
- Separate simplification pass after implementation review.
- Final Stack A security and maintainability gates remain required before any
  draft stack publication or ready-for-review decision; no publication is part
  of this A2 slice.

## Progress

- 2026-08-01: A1 Gate 2 was approved. The native no-trunk rebase completed with
  `v5` untouched; recovery refs are recorded under
  `refs/stack-backup/20260801-220941/`.
- Next: commit this plan, obtain exact-range plan review, then implement only
  the six direct-control classes above. No push, PR submission, queue, merge,
  or `main` target is authorized here.

## Commit boundaries

- `docs(project): add v5 direct-control refs plan` — this plan only.
- `feat(refs): expose v5 direct-control refs` — A2 implementation, durable
  type proof, focused story/test, and migration note after verification.
- Follow-up commits must remain narrowly scoped to verified review findings.

## Out of scope / follow-ups

- A3 composite refs, including deprecated Formik wrappers where they require a
  separate migration decision, OTP/date/color-picker composites, and Table's
  `forwardedRef` removal.
- Stack B selector normalization, Stack C bundle boundaries, Stack D VRT, and
  D8 theme override/migration work.
- Repairing the pnpm registry-signature/toolchain issue.

# v5 compound Combobox compatibility

## Approval summary

The existing root Combobox is a searchable single-select with a configuration
API. The pinned official shadcn Radix catalog also supplies a compound Combobox
with editable input, object values, multiple selection, chips and grouped items.
This package adds that composition through `./primitives`, preserving the root
component and its types. It completes one required catalog capability rather
than replacing the form engines or introducing a second complete UI backend.

The implementation will adapt the pinned compound source to our existing
Button, InputGroup, theme tokens and portable icons, with exact
`@base-ui/react@1.9.0` as a library runtime dependency. Every consumer installs
that dependency; unrelated bundled imports must exclude it. A local direction
bridge will connect the existing Radix direction contract to Base UI without
adding Base UI to the shared Direction module. Cross-library popup focus,
dismissal, caller composition and generic value inference are the main risks.

Completion requires compatible exports/types, real keyboard/form/overlay/RTL
journeys, supported-theme browser captures, packed root/RHF/RSC proof, dependency
isolation, package gates and configured reviews at a qualified draft head.
Manual screen-reader, Safari/device and final integrated consumer acceptance
remain GA gates. Formik stays supported through v5; RHF remains optional and
isolated under ADR0002. GBL and Klicker remain unmerged.

Approval mode: **executable batch, proposed**. The current user approval covers
this plan and static-sweep preparation. Implementation approval will authorize
the slices below and one proposed draft layer `rs/v5-combobox-compatibility`
above the existing chart branch, with ordinary non-force delivery. It will not
authorize ready conversion, merging, publication, deployment, consumer writes,
new automation or changes to existing stack membership.

## Execution details

### Working context and authority

- Repository: `uzh-bf/design-system`; eventual release trunk: `v5`.
- Worktree: `trees/rs-v5-uzh-alignment`; artifacts root: `project/`.
- Planning baseline: `fbce4ffcf5819cbbc0fe6d68c5c47431a28dbc0f`, qualified
  [chart draft #224](https://github.com/uzh-bf/design-system/pull/224), branch
  `rs/v5-recharts-compatibility`. Refresh its actual tip before implementation.
- Execution mode: standard; selected main-model identity is not available as an
  allowlisted runtime ID. Main owns architecture, scope, integration and delivery.
- Boundary owner: self. Terminal: one qualified, unmerged draft for the complete
  compound control, its compatibility evidence and migration guidance.

Authority now covers the reviewed plan, static source findings, existing-roadmap
reconciliation and ordinary documentation delivery on the existing task branch.
After implementation approval, authority includes task-branch creation and the
proposed native stack below, dependency/source/test changes within named scope,
configured reviews, commits, ordinary pushes, draft description updates and
reviewed synthetic screenshot attachments in this repository. Host Git/gh owns
forge actions; installs, builds and browser tests use the existing container
workflow. Do not request human reviews or alter provider/tool configuration.

Pause only for a material contract change, an incompatible supported dependency,
a budget/entry isolation failure requiring a new public boundary, unsupported
native topology, or an unresolved cross-library interaction requiring replacement
of existing overlays. Diagnose ordinary failures and continue within scope.
Consumer acceptance and any separately gated release effects retain their own
plans and authority.

### Public contract and primitive impact

No durable product primitive, data owner, policy or persistence model changes.
This extends the shared UI composition surface. Applications own item data,
selection state, validation, async retrieval and submission effects.

[ADR0001](../docs/adr/0001-two-door-public-api.md) owns natural names and retained
root wrappers; [ADR0002](../docs/adr/0002-rhf-subpath-rsc-contract.md) owns RHF/RSC
isolation. ADR0004/0005 own root theme placement and application design;
ADR0006 owns RHF error presentation. These decisions cover this additive adapter;
no new ADR is proposed. A new public entry, changed root API, state ownership or
replacement of a primitive backend would re-arm the ADR and human decision gates.

The primitive entry adds exactly the pinned sixteen public identifiers:
`Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`,
`ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`,
`ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput`,
`ComboboxTrigger`, `ComboboxValue`, and `useComboboxAnchor`. `ComboboxClear` is
an internal implementation detail, as in the pinned export list.

Keep root `Combobox`, `ComboboxItem`, `ComboboxProps` and `ComboboxClassName`
unchanged. Root `ComboboxItem` is a type; the primitive name is a component.
Update the existing migration collision table rather than adding prefixes,
new entries, duplicate wrappers or a root star export of the new module.

Preserve Base UI's generic value/multiple/item inference and discriminated
callback values; avoid broad `any` or casts that erase this public contract.
Keep string and object values, item comparison and display/submission mapping,
controlled/uncontrolled value, input and open state, groups/collection, disabled
items, clear behavior, custom render elements, forwarded refs and caller handlers.
Multiple mode preserves chips, optional removal controls and keyboard editing.
The public scope follows pinned shadcn capabilities, not every unrelated Base UI
feature or a new DS-specific state machine.

Use an internal generic Root wrapper to read existing scoped Radix `useDirection`
and provide that direction to Base UI. Keep `src/ui/direction.tsx` free of Base UI
imports. The application retains HTML `dir` ownership; ensure the portaled popup
gets the resolved direction. Verify nested provider overrides, logical alignment,
chip navigation and portaled content. Direct Base UI providers used outside this
adapter do not become a second DS direction API.

`ComboboxContent` preserves pinned popup/positioner options and anchor handling.
It must work inside existing modal Dialog, Sheet and Vaul Drawer. Verify focus
trap, pointer hit testing, selection, Escape and outside dismissal, focus return,
clipping and scroll. A narrowly scoped optional portal-container pass-through
may expose the underlying Base UI portal target when required for composition;
document its ownership and prove the default and explicit-container cases.
Do not disable a parent focus trap or change overlay defaults to make tests pass.

Forms use the compound public control with existing Field parts and RHF
Controller; no new `RhfCombobox` adapter family is introduced. Link label, help
and error IDs, send blur/ref/value changes to the correct RHF owner, prove reset,
required/disabled, server errors and focus-on-error. Preserve native named form
submission and clear/empty values. Keep the existing root Formik and direct-control
journeys passing. Schemas, resolvers and application fetch logic remain external.

### Research and source identity

Pinned shadcn revision: `3d98900e9b73c45f035f8109e9d41ba6a51685e7`,
`apps/v4/registry/bases/radix/ui/combobox.tsx`, its registry example and
`content/docs/components/radix/combobox.mdx`. The main session inspected its
sixteen exports, InputGroup/Button composition, groups/chips and popup recipes.
Generator aliases, `cn-*` style classes and IconPlaceholder are application
source infrastructure; map them to local helpers, emitted tokens and Lucide icons.
Preserve documented caller class/handler precedence from our approved contracts.

The read-only shadcn 4.22.1 `docs combobox` command currently resolves a Base
catalog URL. This does not change the selected Radix source denominator. Context7
resolved `/mui/base-ui/v1.9.0` and supplied the generic Root, native form and
separate DirectionProvider documentation. Official tagged source at
`ad7ecda5296b0295b41a51ecb01fce6204acd099` verifies the three Root generics and
direction context; registry metadata verifies the published subpath exports,
React 19 compatibility, optional date peers and `sideEffects: false`.

Sources: [Base UI Combobox](https://base-ui.com/react/components/combobox),
[direction](https://base-ui.com/react/utils/direction-provider),
[tagged Root](https://github.com/mui/base-ui/blob/ad7ecda5296b0295b41a51ecb01fce6204acd099/packages/react/src/combobox/root/ComboboxRoot.tsx),
and [pinned shadcn source](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/combobox.tsx).
These sources establish API shape; they do not prove mixed-library runtime
interactions or our emitted type/bundle behavior. The implementation must prove
those seams. This package pins 1.9.0; no additional min/current Base UI matrix is
implied. Existing three Recharts/RHF cells remain intact.

### Proposed topology and package size

One coherent capability needs one draft layer, with however many useful commits
its implementation takes. Propose a new native stack rooted on
`rs/v5-recharts-compatibility`, containing only `rs/v5-combobox-compatibility`.
The existing five-layer stack 221 and earlier stack retain their membership,
bases and published history. The first implementation-branch commit records approval and the active
Progress in this plan, already persisted by the planning package on its base. Refresh host refs and verify native local/remote topology
before creation. No stack sync, cascade rebase, force push, merge or unstack is
part of this package. If native tooling cannot represent the proposed boundary,
report that capability/authority gap before changing existing topology.

Estimated human-authored delta: 700–1,200 lines across 12–20 existing/new paths,
plus generated lockfiles and reviewed visual baselines. This exceeds the 400-line
review diagnostic intentionally: compound APIs, form/overlay integration and
entry isolation are one independently useful control. Splitting exports, tests
or forms into separate PRs would leave incomplete acceptance. Reassess material
scope growth rather than splitting by commit or adding unrelated catalog work.
No human reviewers are requested by the agent.

### Feature-wide verification portfolio

| Consequential risk                                                            | Existing protection                                                                          | Test obligation and primary seam                                                                                                                                                                                                           | Owner/slice             |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| Wrong import door breaks legacy consumers or erases generic values/refs       | Root Combobox direct-control types and browser focus/selection; public contract type fixture | Extend existing public type fixture for exports; add `tests/contracts/combobox.types.tsx` for inferred JSX single/object/multiple callback values and rejected mismatches without explicit generic arguments; retain legacy root/ref tests | Primitive/entry slice   |
| New control loses selection, native submission, reset or validation semantics | Existing Field/RHF and native form seams                                                     | Extend existing contracts with synthetic single/multiple/object/groups/clear/input/open and Controller+Field submit/reset/error/focus behavior                                                                                             | Forms/interaction slice |
| Base UI portal escapes or disrupts existing modal interaction                 | Existing Dialog/Sheet/Drawer and Direction stories                                           | Browser contract for each overlay, keyboard/pointer dismissal and focus return, nested RTL and popup geometry; diagnose minimal failing composition first                                                                                  | Forms/interaction slice |
| New runtime leaks into unrelated imports or server/RHF boundaries             | Packed root/dedicated fixtures, three Recharts/RHF cells and both Next builds                | Extend public packed fixtures and a purpose-named Next Combobox client leaf plus the existing RHF leaf to exercise primitive Combobox with and without RHF; root/primitives remain RHF-free, directives/types preserved                    | Integrated slice        |
| A passing size result omits actual Base UI behavior                           | Existing positive minima/module marker budget runner                                         | Add compound Combobox positive control and root legacy Combobox isolation case; forbid Base UI modules in root/primitives Button and legacy Combobox bundles. Measure before proposing a new limit; existing ceilings remain fixed         | Integrated slice        |
| Tokens, focus or layout fail in supported themes/narrow/RTL states            | Exact axe inventory, packed CSS and pinned visual suite                                      | Register new stories in existing inventory, preserve zero-waiver protocol; extend existing visual/packed CSS seams and capture actual browser interactions at desktop/phone and relevant locales                                           | Integrated slice        |

No prose/content snapshots or tests of demo records. Keep synthetic fixtures
small and test observed state/contracts. Reuse unchanged passing evidence; rerun
checks invalidated by source/dependency/CSS changes. New positive budget values
need measured evidence and a specific ruling before becoming blocking thresholds;
never loosen existing ceilings or disable markers as an implementation shortcut.

### Delegation Map

| Workstream                                           | Owner           | Exclusive writers and dependencies                                                                                                                      | Acceptance                                                                                    |
| ---------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Compound module and public type/story surface        | Native executor | Slice 1 only; UI module, primitive barrel, Combobox story, public-contract export checks and new JSX type fixture. Depends on parent dependency staging | Sixteen exports, inferred JSX types, ref/render contracts and focused browser proof           |
| Form, overlay and direction behavior                 | Main            | Slice 2 only; component-aria contract and RHF story. Starts after slice 1 integration; executor does not edit these files                               | Native/RHF reset/submission, overlays, focus and RTL journeys                                 |
| Dependencies, packed consumers and complete delivery | Main            | Slice 3; package/root/fixture locks, size runner, Next leaves/tests, CSS/a11y/visual registration and docs. Parent alone integrates worker changes      | Entry isolation, complete package gates, archive/screenshots, reviews and exact-head draft CI |

Main stages the dependency before the executor starts, then makes no concurrent
edits to executor-owned paths. No optional second story writer is assigned.
Subsequent corrections return to the same owner unless that owner is terminal.

### Slices, owners and commit boundaries

| Slice                                 | Route and owned paths                                                                                                                                                                                                                                                                                      | Acceptance and commit                                                                                                                                                                                                                                                          |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Compound control and public entry     | One executor owns new `src/ui/combobox.tsx`, existing `src/primitives.ts`, `src/Combobox.stories.mdx` and compound additions in `tests/contracts/public-contracts.types.ts` and new `tests/contracts/combobox.types.tsx`. Parent owns dependency pin/lock and integration; writer boundaries are exclusive | Exact sixteen exports, root collisions absent, generic/ref/render contracts, supported-token styling, local direction bridge and focused selection behavior; one coherent source commit after relevant checks                                                                  |
| Forms, overlay and direction journeys | Main exclusively owns existing `tests/contracts/component-aria.spec.ts` and `src/forms/RhfFields.stories.tsx`; starts after slice 1 is integrated and does not edit executor-owned Combobox stories concurrently                                                                                           | Native form + RHF Controller/Field, multi/object/reset/disabled/error/ref behavior, Dialog/Sheet/Drawer, nested RTL and popup placement pass; commit interaction proof with any narrowly related corrections                                                                   |
| Packed qualification and delivery     | Main owns `.size-limit.cjs`, `scripts/check-package-size.mjs`, existing packed dependency checks/fixtures/lock variants, Next client/tests, package docs, affected theme/visual/a11y registration and project status                                                                                       | Full package type/lint/format/build, behavioral/a11y protocol/VRT/CSS/size gates, three packed/Next cells, exact archive/installed-file proof, reviewed screenshots, simplification and final independent review; ordinary draft push and exact-head CI/feedback qualification |

Implementation source paths above are relative to `packages/design-system/`
unless rooted by `scripts/`, `.size-limit.cjs` or `project/`. The parent owns
`packages/design-system/package.json` and root/fixture locks. New files are
limited to the canonical UI module, `tests/contracts/combobox.types.tsx`, and
`tests/rsc/next-consumer/app/combobox-leaf.tsx` with its dedicated
`tests/rsc/next-consumer/tests/combobox.spec.ts`. The new client leaf contains no
RHF import; the existing `app/rhf-leaf.tsx` and `tests/rhf.spec.ts` own the separate
Controller/Field recipe. This keeps the non-RHF client boundary observable.
Existing `app/page.tsx` mounts both leaves. Prefer existing files elsewhere.
Use existing `visual/curated-boundary.spec.ts`, `playwright.visual.config.ts`,
`tests/a11y/exact-inventory.ts` and `tests/theme-contract/verify-packed-css.mjs`;
do not create a second suite. `MIGRATION.md` documents both import doors, Base UI installation,
form/RTL/portal responsibilities and corrects the earlier RHF timing contradiction.
Update the matrix's Combobox row and current roadmap status with actual evidence.

Use `rs-build-screenshot-gallery` and `rs-mr-description-writer`: neutral-light,
neutral-dark and UZH-light; desktop and 390px phone; default/open, invalid,
disabled, chips and overlay/RTL states. Include en/de where locale changes input
or labeling. Capture provenance and actual interaction results; do not treat a
screenshot or axe as screen-reader/Safari/device acceptance. Preserve package
peer/RSC checks and both Next bundlers. No consumer runtime is resumed.

Start only the exact source-path-resolved DS tooling environment needed for
browser checks; use `rs-local-runtime-lifecycle` once touched and stop/verify it
after the last runtime-dependent check. No broad environment rebuild or teardown.

### Review and delivery gates

The configured planner hardens this frozen plan before implementation approval.
The existing Opus progress discussion supplies reusable architecture advice;
planner review remains distinct. A public-contract change arms the optional
opposing-provider challenge, subject to actual payload authority. During approved
implementation, simplifier and risk-selected reviewer inspect committed slices;
final Claude review covers the complete integrated immutable delta after local
verification. Main verifies every finding. Required CI and review feedback must
qualify the exact draft head with the repository's quiet settle. Keep draft.

No other roadmap package starts as part of this plan. Shared API, Calendar,
layout/toast, messaging and code scope remain assigned to their future plans.
Static sweep findings narrow/clarify this plan but do not authorize those changes.
The upstream Combobox form/custom examples also use missing Card size and Item
`xs` options (`combobox-example.tsx:746,1111`); `component-example` additionally
uses newer AlertDialog parts. Those Shared API dependencies remain separately
owned. Prove the complete compound control using supported shells now, and retain
exact all-example composition acceptance for the later Shared API/Composition
packages. A source example with multiple owners is not a reason to widen this
control's implementation scope.

## Progress

- Planning goal approved on 2026-10-24. This is the proposed executable plan,
  not yet approval to create the implementation layer or change package source.
- Baseline `fbce4ffcf` is synchronized with its remote; main remains the later
  promotion boundary (310 ahead/3 behind). No integration is needed for planning.
- Main owns plan, evidence verification and delivery. Read-only worker Singer
  completed the pinned composition sweep; all identities have explicit static
  dispositions. The worker is closed and no runtime was started.
- Native planner hardening: round1 REVISE, both findings accepted; round2
  APPROVED. Added JSX inference proof and explicit exclusive owners/fixture paths.
  The [static composition assessment](2026-10-24-v5-composition-compatibility-assessment.md)
  accounts for all 118 identities, including actual AI demo/variant bodies.
  Required planning delivery is the reviewed plan, complete static findings and
  coherent roadmap/matrix updates on the existing draft branch. Integrated
  documentation review and delivery remain; implementation approval follows.

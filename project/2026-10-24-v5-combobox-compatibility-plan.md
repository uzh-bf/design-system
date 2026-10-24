# v5 Radix-only Combobox compatibility

## Approval summary

The October 24 user approval adopts [ADR0008](../docs/adr/0008-radix-compatible-shadcn-scope.md):
support official Radix-compatible components and compatible auxiliaries with
documented exceptions. Retain the existing root Combobox's official Radix
Popover/cmdk recipe. The newer Base UI compound API and its parity-only variants
are excluded from mandatory GA scope; no replacement engine or new Combobox
stack layer is required.

Existing `Combobox`, `MultiSelect` and `RhfMultiSelect` behavior, removable chips,
public types, accessibility and form contracts remain required. An exclusion of
upstream API parity cannot retire an existing or separately requested capability.
The previous Base UI dependency, sixteen-export and direction-bridge proposal
remains withdrawn. Shared API gaps discovered in mixed examples remain assigned
to their existing package owners.

Approval mode: **executable batch, documentation only**. Record ADR0008 and
reconcile the existing roadmap, matrix, assessments and this retention record on
the existing draft branch. Completion is consistent source-backed documents,
focused checks, configured final review, ordinary push and draft description
read-back. No component, dependency, new API, stack, consumer, runtime, merge,
release or deployment change is authorized. Shared APIs and Calendar are next
under their own bounded execution plans.

## Binding backend and compatibility contract

ADR0008 owns eligibility, exclusions, mixed composition and reconsideration.
ADR0001/0002 retain the root and primitive doors and optional RHF entry; Formik
remains supported through v5. No product primitive, data owner or persistence
policy changes in this package.

Keep root `Combobox`, `ComboboxItem`, `ComboboxProps` and `ComboboxClassName`.
Preserve existing `MultiSelect` and `RhfMultiSelect`, including multi-selection,
chips, labels, errors, reset and focus behavior. Applications continue owning
item data, selection, async retrieval, validation and submission. Do not expose
the sixteen Base UI identifiers as aliases or promise their props and behavior.

## Verified source and supported foundation

Scope-recording baseline: `2b9e4ad080a9522b1b9bb1842842d92b685f2807`,
[chart draft #224](https://github.com/uzh-bf/design-system/pull/224), branch
`rs/v5-recharts-compatibility`, existing `trees/rs-v5-uzh-alignment` worktree.
Host fetch is current; the task branch matches its upstream. The later main
promotion boundary is separate and does not require integration for this correction.

Pinned shadcn source remains
[`3d98900e9b73c45f035f8109e9d41ba6a51685e7`](https://github.com/shadcn-ui/ui/tree/3d98900e9b73c45f035f8109e9d41ba6a51685e7).
Its [Radix-labelled Combobox](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/combobox.tsx)
imports `{ Combobox as ComboboxPrimitive }` from `@base-ui/react`.
The shadcn 4.22.1 read-only `docs combobox` command resolves the Base UI page;
that default is not evidence of an eligible Radix implementation.

The [official legacy Combobox guide](https://v3.shadcn.com/docs/components/combobox)
and current Context7 lookup describe the classic Popover/Command composition.
This is explicitly an older composition reference, not the current compound API.
The [classic example at the existing catalog pin](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/new-york-v4/examples/combobox-demo.tsx)
and its Radix/cmdk dependencies are verified in ADR0008; no catalog repin is needed.
The [Radix Popover reference](https://www.radix-ui.com/primitives/docs/components/popover)
owns focus, dismissal, positioning and `asChild` contracts. Our local
[`Combobox.tsx`](../packages/design-system/src/Combobox.tsx) already composes
[`ui/popover.tsx`](../packages/design-system/src/ui/popover.tsx) and
[`ui/command.tsx`](../packages/design-system/src/ui/command.tsx).
The selected value is a controlled string, open state is internal, items support
disabled state and search keywords, and the trigger exposes its ref. Preserve
its existing accessible trigger/input distinction instead of copying an older
example's duplicate combobox roles.

## Retained contract and excluded variants

The [static composition assessment](2026-10-24-v5-composition-compatibility-assessment.md)
retains every pinned identity. Its excluded compound portions have a closed scope
disposition under ADR0008, not an implementation pass.

| Capability or composition                                                       | Accepted scope                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Root Combobox search and single selection                                       | Retain the current string-value API, disabled items, search, accessible trigger/input roles and trigger ref. Reuse unchanged proof and verify actual changes.                                                                  |
| Raw Popover/Command composition                                                 | Keep existing public parts. Eligible Shared API gaps remain assigned to that package; this does not create a new compound Combobox contract.                                                                                   |
| Existing MultiSelect and RHF contracts                                          | Preserve multi-selection/chips and accepted field value, error, reset, disabled and focus behavior. These existing capabilities are not excluded by the compound API decision.                                                 |
| New compound editable-input, object-value, multiple-selection and chip variants | Excluded where requested only to match the Base UI compound API. No custom engine, sixteen-part API or automatic GA rewrite requirement. Separately named consumer requirements remain visible for an explicit scope decision. |
| Current compound examples and `preview-02`                                      | Exclude compound Combobox portions while retaining eligible Card, Item, AlertDialog, chart and other Shared API obligations. No full unchanged-example compatibility claim.                                                    |

No new Combobox implementation package is queued. A separately requested
capability, migration blocker or new official Radix route can reopen an item as
specified in ADR0008; it does not silently change the backend or existing API.

## Verification and delivery boundary

This package changes documentation only: ADR0008, the GA and UZH roadmap
pointers, capability matrix, shadcn assessment, composition assessment and this
retention record. Main owns the coupled policy reconciliation. Mechanical edits
stay local because delegation overhead exceeds that work; the completed Astra
and Claude policy advice is reused after the user's approval. The configured
final reviewer checks the complete committed delta. Execution mode remains
standard because no allowlisted runtime model identity is exposed.

Check local links, source-backed claims, formatter scope, exact diff and policy
consistency. Preserve all inventory identities and distinguish eligible gaps,
retained recipes and exclusions. Existing package, browser and archive evidence
remains valid for its recorded source; these edits prove no new runtime behavior.
No application or container startup, new maintained test or screenshot is needed.
The existing draft gallery remains evidence for its recorded chart source.

Later implementing packages qualify their eligible import/dependency closure,
API, keyboard/form/overlay/RTL/theme behavior, emitted CSS and package budgets.
Reuse existing verification tooling; this decision adds no generic resolver or
new enforcement framework. RHF isolation, supported package matrices and separate
manual screen-reader, Safari/device and exact-candidate consumer acceptance
remain protected. Keep the draft unmerged and current stack membership intact.

## Progress

- October 24: user approved the Astra/Claude recommendation to exclude
  incompatible upstream implementations without bespoke replacements.
- ADR0008 records the policy and source-pinned legacy Combobox exception.
  Earlier mandatory advanced-variant rewrite wording is superseded.
- Existing source, dependencies, MultiSelect/RHF/Formik support and runtime are
  unchanged. This is scope recording, not new component acceptance.
- Deliver on existing [draft #224](https://github.com/uzh-bf/design-system/pull/224).
  Shared APIs and Calendar are next; no new Combobox layer is required.

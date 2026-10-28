# Support the Radix-compatible shadcn catalog with documented exceptions

Status: Accepted (2026-10-24)

v5 supports official shadcn Radix implementations, backend-independent components
and compatible auxiliaries. Components or variants requiring Base UI or React
Aria without an accepted official Radix route are excluded from mandatory GA
scope. This trades exact coverage of every current upstream API for a consistent
backend and avoids maintaining bespoke replacements for unsupported controls.
Registry directory names alone do not establish eligibility: inspect actual
imports and the dependency closure before adopting a component or auxiliary.

## Eligibility and acceptance

| Disposition                                          | GA treatment                                                                                                                                                                                                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Official Radix or backend-independent implementation | Required, with relevant API, interaction, theme and package proof. Ordinary missing compatible APIs remain implementation gaps.                                                                                                          |
| Compatible auxiliary                                 | Required where an eligible component uses it. Recharts, DayPicker, cmdk, Sonner, Panels, Shiki and first-party headless packages are not excluded merely because they are not Radix primitives; qualify their dependencies and behavior. |
| Retained official legacy recipe                      | Name and pin the exception, preserve the existing public contract and qualify actual changes. It does not create an obligation to reproduce every newer upstream variant.                                                                |
| Excluded backend or variant                          | Keep its identity and exclusion reason in the inventory; exclude parity-only implementation from GA. Never mark it implemented or require a custom replacement to close the row.                                                         |
| Mixed example or block                               | Identify excluded portions and retain eligible component obligations. Do not claim complete upstream-example compatibility or discard unrelated Shared API gaps.                                                                         |

## Retained Combobox recipe

The existing root Combobox keeps its Radix Popover and cmdk composition. Its
source reference is the [official classic example](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/new-york-v4/examples/combobox-demo.tsx),
with [Radix Popover](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/new-york-v4/ui/popover.tsx)
and [cmdk Command](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/new-york-v4/ui/command.tsx)
at the existing catalog pin `3d98900e9b73c45f035f8109e9d41ba6a51685e7`.
This reference establishes an upstream composition route, not current compound
API compatibility or a requirement to copy older accessibility behavior.

The current [compound Combobox](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/combobox.tsx)
imports Base UI. Its compound API and parity-only editable-input, object-value,
multiple-selection and chip variants are excluded; v5 will not recreate that
engine or its sixteen identifiers. Existing `Combobox`, `MultiSelect` and
`RhfMultiSelect` capabilities remain required, including existing multi-selection
and removable chips. Formik through v5, RHF capability parity, accessible
interaction and the separate consumer-acceptance gates remain in force.

## Consequences and reconsideration

Retain every pinned inventory identity, separating supported, unfinished and
excluded scope. A catalog count is not a count of qualified components. Existing
consumer contracts and separately requested capabilities cannot be retired as
upstream-parity exclusions. A named consumer requirement, a migration blocker or
a new official Radix route can reopen an excluded item through an explicit scope
decision; it does not automatically authorize a backend change or custom engine.

The roadmap and capability matrix apply this policy. Implementing packages must
supply dependency, import and package evidence for their eligible runtime; this
decision does not itself add dependencies, verification tooling or a new public
API. Candidate publication, consumer merges and GA acceptance remain separate.

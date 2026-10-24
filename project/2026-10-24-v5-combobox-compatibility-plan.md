# v5 Radix-only Combobox compatibility

## Approval summary

The October 24 user ruling keeps v5 on Radix variants and rejects Base UI.
This supersedes the earlier proposal to install `@base-ui/react@1.9.0`, expose
sixteen Base UI compound identifiers and add a Radix-to-Base direction bridge.
That proposal was never implemented or approved for implementation. Its planner
and final-review approvals do not qualify this revised direction.

The existing root Combobox already composes our Radix Popover and cmdk Command.
Keep that implementation and its public types. Further composition should reuse
those public primitives and the existing theme, direction and form contracts.
The current upstream file under `registry/bases/radix/ui/combobox.tsx` imports
Base UI despite its directory name; it is a backend exception to assess, not an
installation target. Exact compatibility with its compound API is not promised.

The current package corrects the plan, roadmap, dependency matrix and static
composition assessment. The next execution package must identify which requested
capabilities the existing Radix composition supplies and which require an
explicit Radix adaptation. Multiple selection, editable input, object values and
chips remain visible capability questions; rejecting Base UI does not prove or
silently remove them. GBL and Klicker merges remain held.

Approval mode: **direction-only**. The user has selected the backend and
withdrawn the Base UI proposal. This correction authorizes no component changes,
new dependency, new public API or new stack layer. A bounded Radix execution
contract follows the capability assessment; the rejected implementation is not
started under its former plan or review receipts.

## Binding backend and compatibility contract

- Use Radix variants and existing compatible auxiliaries such as cmdk. Base UI
  and React Aria implementations are outside the selected v5 backend scope.
- Inspect actual imports and dependency closure, not just a registry directory
  or the default URL returned by the CLI. An auxiliary cannot introduce an
  excluded primitive backend through its transitive dependencies.
- Preserve root `Combobox`, `ComboboxItem`, `ComboboxProps` and
  `ComboboxClassName`. Preserve the optional RHF entry, Formik through v5 and the
  existing raw primitive door under ADR0001/0002.
- Reuse `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor` and the
  existing Command parts from `./primitives`. Do not manufacture the sixteen
  Base UI identifiers as aliases or claim their props and behavior are equivalent.
- Keep applications responsible for item data, selection, async retrieval,
  validation and submission. No product primitive, data owner or persistence
  policy changes in this documentation correction.

## Verified source and supported foundation

Planning correction baseline: `786c2474acc703dd1007b0bb3f3a3336f0a8601a`,
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
The [Radix Popover reference](https://www.radix-ui.com/primitives/docs/components/popover)
owns focus, dismissal, positioning and `asChild` contracts. Our local
[`Combobox.tsx`](../packages/design-system/src/Combobox.tsx) already composes
[`ui/popover.tsx`](../packages/design-system/src/ui/popover.tsx) and
[`ui/command.tsx`](../packages/design-system/src/ui/command.tsx).
The selected value is a controlled string, open state is internal, items support
disabled state and search keywords, and the trigger exposes its ref. Preserve
its existing accessible trigger/input distinction instead of copying an older
example's duplicate combobox roles.

## Radix capability assessment before the next execution plan

The [static composition assessment](2026-10-24-v5-composition-compatibility-assessment.md)
retains every pinned identity. The Combobox owner must disposition each affected
recipe without changing the global source pin to conceal a backend mismatch.

| Capability or composition                                   | Current evidence and next acceptance boundary                                                                                                                                                                                                         |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Searchable single selection                                 | Existing root control and Popover/Command foundation; reuse unchanged proof and qualify any actual changes. Preserve current selection and ref behavior.                                                                                              |
| Caller-owned open state, groups and custom item rendering   | Public Popover/Command parts provide composition routes; compile a concrete recipe before claiming compatibility. Root configuration props need not change.                                                                                           |
| Native form and RHF Controller/Field composition            | Applications own value mapping and submission. Prove label/help/error association, reset, disabled state and ref focus using the selected Radix recipe; no new RHF adapter family is assumed.                                                         |
| Editable input, object values, multiple selection and chips | Remain unresolved Radix adaptation requirements. Define observable selection, search, removal and keyboard behavior before choosing a public API. Do not claim that Command selection state alone supplies multi-select or Base UI generic contracts. |
| Current compound examples and `preview-02`                  | Source-level Base UI APIs require application recipe adaptation. Keep exact API compatibility excluded; retain missing user capabilities and Shared API dependencies as explicit gaps until their Radix route is designed and verified.               |

The owner records a capability as supported with proof, covered by a reviewed
Radix adaptation, or an unresolved gap with an owner. A backend exclusion does
not count as completed capability parity. Missing Card size, Item `xs` and newer
AlertDialog parts remain Shared API work rather than expanding this control.

## Verification and delivery boundary

This correction changes project Markdown only. Check local links, source-backed
claims, formatter scope, exact diff and consistency across the five affected
documents. Reuse the existing package, browser and exact-archive evidence for its
recorded source; no new behavior or runtime acceptance follows from these edits.
Main owns documentation and disposition; a read-only explorer audits backend
imports, a planner challenges the revised direction, and the configured final
reviewer checks the immutable committed correction. Execution mode remains
standard because no allowlisted runtime model identity is exposed.

A later Radix execution plan must name its exact source/API scope, owner and
proposed draft topology. It must prove relevant keyboard/search/empty/disabled
and form behavior, focus and dismissal inside Dialog/Sheet/Drawer, nested RTL,
responsive layout and supported themes. New generic value APIs require actual
JSX inference proof. Packed root/primitives imports stay RHF-free; the dedicated
RHF route and supported Next/Recharts/RHF matrix remain protected. Check emitted
CSS, entry budgets and absence of excluded backend runtimes in the resulting
package and consumer dependency closure. Existing limits are not raised by default.
Manual screen-reader, Safari/device and integrated exact-candidate consumer
acceptance remain separate GA gates.

No new stack or implementation branch is created by this correction. The earlier
`rs/v5-combobox-compatibility` layer was proposed for the rejected package and has
no implementation authorization. Keep current stack membership and history.
No readiness conversion, merge, package publication, deployment, consumer writes,
new automation, provider changes or human review request is authorized here.

## Progress

- October 24 user correction: Radix variants only; Base UI proposal withdrawn.
- Revised direction passed planner review. This qualifies the documentation
  correction, not a replacement implementation contract.
- Existing package source, dependencies, lockfile and runtime are unchanged.
- Earlier Base UI implementation requirements and their review approval are
  superseded. Reusable source observations and static identity accounting remain
  evidence for their stated scope, with backend eligibility corrected.
- This package persists the correction on existing [draft #224](https://github.com/uzh-bf/design-system/pull/224). The next source
  package needs the bounded Radix capability contract described above; it must
  not execute the withdrawn compound plan.

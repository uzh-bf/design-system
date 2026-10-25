# v5 pinned composition compatibility assessment

## Scope and meaning

Date: 2026-10-24. DS baseline: `fbce4ffcf5819cbbc0fe6d68c5c47431a28dbc0f`.
Pinned shadcn source: `3d98900e9b73c45f035f8109e9d41ba6a51685e7`.
This is static source accounting of 67 registry examples, 30 official block IDs
and 21 Radix AI pattern pages. It is not a compilation, browser, accessibility
or behavior pass. Every identity below has one primary disposition; additional
package dependencies remain explicit. A primary owner does not absorb unrelated
missing capabilities into its scope.

[ADR0008](../docs/adr/0008-radix-compatible-shadcn-scope.md) records the October24
user-approved Radix-compatible scope and documented exclusions. The current
Radix-labelled compound Combobox imports Base UI; its implementation and
parity-only variants are excluded without a mandatory replacement. Retain the
official classic Radix recipe and existing root, MultiSelect and RHF contracts.
Affected examples and blocks stay in the denominator with excluded portions and
eligible composition gaps; exclusion does not prove parity or discard separately
requested capabilities.

[The capability matrix](2026-10-23-v5-radix-capability-matrix.md) owns individual
component deltas. [The GA roadmap](2026-08-10-v5-ga-readiness-roadmap.md#next-implementation-packages)
owns sequence. Current public routes mean an inspected import/name/prop shape
can map to the DS primitive door after adapting generator aliases. Remaining
shared contract deltas and required runtime proof still apply; a route does not
close a matrix row or certify every variation of the same component.

Source roots at the pinned revision are
[`registry/bases/radix`](https://github.com/shadcn-ui/ui/tree/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix),
[`AI pattern docs`](https://github.com/shadcn-ui/ui/tree/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/content/docs/ai-elements/radix),
and their referenced `apps/v4/examples/radix` bodies. No moving-main source
silently changes this finite denominator. No application code or dependencies
were copied into the library.

## Shared API execution checkpoint

Presentation draft #225 qualifies at `2d8b02a6f`. Interaction draft
[#226](https://github.com/uzh-bf/design-system/pull/226) implements the approved
Popover parts, overlay options, menu insets, Command checks and Select markers
and compact geometry. The draft qualifies at `4d5f60fc6` with complete final
review, hosted CI, native captures and exact packed proof. These close the
approved concrete Shared API gaps; the identity tables below remain the historical static
assessment. They do not become full example or block runtime passes. Calendar draft228 implements its bounded locale/grid contract and passes local
source/package checks; qualification evidence is recorded in that draft. The approved [layout/toast plan](2026-10-24-v5-layout-toast-compatibility-plan.md) has qualified native Panels4 and retained root3 draft [#229](https://github.com/uzh-bf/design-system/pull/229) at88b397d4d, with local/packed proof, complete reviews and hosted CI. Sonner draft [#230](https://github.com/uzh-bf/design-system/pull/230) qualifies at1a2db9391 with options, modes, same-store package proof, final review and hosted CI. Sidebar draft [#232](https://github.com/uzh-bf/design-system/pull/232) qualifies atbe62259b0 with final review and hosted CI. The [October25 native Resizable plan](2026-10-25-v5-resizable-native-v4-plan.md) supersedes root3 retention; unified Resizable [draft #233](https://github.com/uzh-bf/design-system/pull/233) has local browser/package and independent risk-review proof. Final review/CI qualification is recorded in that draft description. Messaging/highlighting and representative integrated compositions
retain their assigned owners. The existing open-menu Ladle-root accessibility
audit residual is tracked in the capability matrix and GA roadmap.

## October25 delivery checkpoint

All approved shared/Calendar/layout/toast/native Resizable layers qualify in
their draft descriptions. [Chat234](https://github.com/uzh-bf/design-system/pull/234)
and [Questionnaire235](https://github.com/uzh-bf/design-system/pull/235) qualify
at48c6b91a6 and2a8d3f401. Code/highlighting and utility source qualification is delivered in
[draft #236](https://github.com/uzh-bf/design-system/pull/236) under its
[approved plan](2026-10-25-v5-code-highlighting-plan.md). These deliveries
close their source/behavior contracts, not every static example/block/pattern
identity below. Integrated application composition retains its own acceptance.

## Registry examples

The [example manifest](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/examples/_registry.ts)
defines these exact 67 identities. Grouped rows list every identity once.

| Primary disposition                                                                 | Exact identities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Count |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Current public route; static shape only, further composition qualification required | `accordion-example`, `aspect-ratio-example`, `breadcrumb-example`, `button-example`, `button-group-example`, `carousel-example`, `checkbox-example`, `command-example`, `context-menu-example`, `dialog-example`, `drawer-example`, `dropdown-menu-example`, `empty-example`, `field-example`, `hover-card-example`, `input-example`, `input-otp-example`, `kbd-example`, `label-example`, `menubar-example`, `native-select-example`, `navigation-menu-example`, `pagination-example`, `radio-group-example`, `scroll-area-example`, `separator-example`, `sidebar-inset-example`, `skeleton-example`, `slider-example`, `spinner-example`, `table-example`, `tabs-example`, `textarea-example`, `toggle-example`, `tooltip-example` | 35    |
| Accepted runtime ownership; direct Recharts composition under ADR0007               | `chart-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1     |
| Scheduled Shared API gap, including child composition                               | `alert-example`, `alert-dialog-example`, `avatar-example`, `badge-example`, `card-example`, `collapsible-example`, `input-group-example`, `item-example`, `popover-example`, `progress-example`, `select-example`, `sheet-example`, `sidebar-example`, `sidebar-icon-example`, `sidebar-floating-example`, `switch-example`, `toggle-group-example`, `demo`                                                                                                                                                                                                                                                                                                                                                                           | 18    |
| Mixed: compound Combobox portions excluded; eligible Shared API gaps remain         | `combobox-example`, `component-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 2     |
| Scheduled Calendar gap; Shared API Card dependency also remains                     | `calendar-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 1     |
| Scheduled layout/toast compatibility                                                | `resizable-example`, `sonner-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 2     |
| Scheduled messaging/clarification surface                                           | `attachment-example`, `bubble-example`, `marker-example`, `message-example`, `message-scroller-example`, `questionnaire-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 6     |
| Scheduled code/highlighting composition; Trace also requires messaging primitives   | `code-block-example`, `trace-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 2     |

Representative concrete seams:

- `alert-example.tsx:10,229` imports/renders missing `AlertAction`;
  `alert-dialog-example.tsx:74,100,184` needs compact Content, Media and action
  variants. Avatar groups/badges and Badge ghost/link variants have analogous
  export/option gaps. These are library Shared API work.
- `card-example.tsx:291,326`, `calendar-example.tsx:216` and
  `combobox-example.tsx:746` use Card size. `combobox-example.tsx:1111` uses
  Item `xs`; local Card/Item lack these options. The Radix-only Combobox
  retention record preserves these separate Shared API gaps. Compound Combobox
  portions are excluded under ADR0008, with no replacement required. Closing
  eligible gaps does not establish full compatibility with the unchanged examples.
- `popover-example.tsx:19` and `input-group-example.tsx:48` import missing
  Popover header/title/description. Switch size, Sheet `showCloseButton` and
  ToggleGroup spacing have separate Shared API obligations. Existing import
  routes for other examples do not waive menu inset, semantic/type, option or
  caller-precedence deltas listed in the matrix.
- `resizable-example.tsx:4,32,136` imports the Panels 4 Layout type and uses
  orientation, percentage sizing and layout callbacks. The subsequent
  [native Resizable migration](2026-10-25-v5-resizable-native-v4-plan.md) moves both
  doors to canonical Panels4.14.8 and shared helpers under ADR0010. Earlier
  root3/native4 proof belongs to the prior candidate; unified candidate acceptance
  is tracked separately.
- Calendar's custom month formatter and day button need consistent locale
  propagation. `CalendarDayButton` and `ChartConfig` are already exported;
  they are not missing-export findings.

## Official blocks and reachable files

The [block manifest](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/blocks/_registry.ts)
defines 30 IDs and 106 declared files; all declared files are present. Block
source and application state remain application-owned. DS owns compatible
public controls and the necessary library runtime dependencies.

| Primary disposition                                                                                                        | Exact identities                                                                                                                                                                                                                                                                                                                                | Count |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Scheduled Shared API gaps                                                                                                  | `preview`                                                                                                                                                                                                                                                                                                                                       | 1     |
| Mixed: compound Combobox portions excluded; eligible Shared API and chart gaps remain                                      | `preview-02`                                                                                                                                                                                                                                                                                                                                    | 1     |
| Scheduled messaging/clarification; code/highlighting and application AI dependencies also apply                            | `preview-03`                                                                                                                                                                                                                                                                                                                                    | 1     |
| Scheduled Calendar compatibility; Shared API and layout acceptance also apply                                              | `sidebar-12`, `sidebar-15`                                                                                                                                                                                                                                                                                                                      | 2     |
| Composition owner; existing public routes require exact type/browser qualification after relevant shared/layout gaps close | `login-01`, `login-02`, `login-03`, `login-04`, `login-05`, `signup-01`, `signup-02`, `signup-03`, `signup-04`, `signup-05`, `dashboard-01`, `sidebar-01`, `sidebar-02`, `sidebar-03`, `sidebar-04`, `sidebar-05`, `sidebar-06`, `sidebar-07`, `sidebar-08`, `sidebar-09`, `sidebar-10`, `sidebar-11`, `sidebar-13`, `sidebar-14`, `sidebar-16` | 25    |

The preview directories contain 80 additional TS/TSX files beyond the three
manifest-owned indexes. Recursive local-import inspection reaches 72 of those
files. Including its index, `preview` reaches 32 of 34 files, `preview-02` reaches
34 of 36, and `preview-03` reaches 9 of 13. The eight unreferenced files are:

| Directory           | Not reached from that block's index                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `blocks/preview`    | `cards/assign-issue.tsx`, `cards/bar-visualizer.tsx`                                                      |
| `blocks/preview-02` | `cards/album-card.tsx`, `cards/catalog-toolbar.tsx`                                                       |
| `blocks/preview-03` | `cards/sources-chat.tsx`, `cards/tool-chat.tsx`, `components/part-source.tsx`, `components/part-tool.tsx` |

These files are accounted source, not extra manifest block IDs. Do not present
unreferenced source as accepted runtime coverage. Reachable cards expose
requirements omitted by the narrow manifests: AvatarGroup and Card/Item sizes
in `preview`; compound Combobox and direct Recharts in `preview-02`; missing
message/scroll surfaces plus `@ai-sdk/react`, `ai`, Markdown and app transport in
`preview-03`. A registry dependency list alone is insufficient installation proof.

## AI patterns

The 21 identities come from the pinned AI `meta.json`. Their MDX pages reference
actual demo/variant TSX bodies in `apps/v4/examples/radix`; those files are present.
All 21 primary bodies and 11 referenced variants were inspected. The source
comparison changes two apparent installation-only routes: Confirmation and
Suggestion actually compose missing Message/Bubble/Trace surfaces. `message`
references `message-pattern.tsx`, not the similarly named unreferenced demo.

| Primary disposition                                                                  | Exact identities                                                                                                                                   | Count |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Current public route; source-comparable, further type/browser qualification required | `context`, `file-tree`, `inline-citation`, `model-selector`                                                                                        | 4     |
| Scheduled messaging/clarification; code/highlighting cross-dependencies remain       | `chain-of-thought`, `chat`, `checkpoint`, `confirmation`, `message`, `plan`, `prompt-input`, `queue`, `reasoning`, `sources`, `suggestion`, `task` | 12    |
| Scheduled code/highlighting; messaging Trace and related parts are prerequisites     | `stack-trace`, `subagent`, `terminal`, `test-results`, `tool`                                                                                      | 5     |

Concrete source observations under `apps/v4/examples/radix`:

- `context-demo.tsx:3,38`, `file-tree-demo.tsx:6,65`,
  `inline-citation-demo.tsx:3,52` and `model-selector-demo.tsx:6,69` compose
  existing Button/HoverCard/Progress, Collapsible or DropdownMenu/InputGroup
  surfaces. Inline citation uses the newly supported Button `xs`. The exact
  interactions and reading order still need representative runtime acceptance.
- `confirmation-demo.tsx:13,127` has a supported Item approval row inside
  missing Message/Bubble/Trace composition. `suggestion-demo.tsx:6,71` also
  imports/renders Bubble and Message despite the page's Button-only install
  snippet. An install declaration does not account for the full demo body.
- `chain-of-thought-demo.tsx:17`, `chat-demo.tsx:23` and
  `prompt-input-demo.tsx:12` need messaging primitives plus CodeBlock or
  Attachment. `checkpoint-demo.tsx:8` needs Marker. Plan/Queue/Reasoning/Sources
  and Task bodies use Trace state/expansion parts. Code/highlighting therefore
  depends on messaging's Trace implementation rather than owning a duplicate.
- Stack trace, subagent, terminal, test results and tool bodies combine Trace
  with CodeBlock sizing/wrapping and status output. Referenced variants cover
  controlled/open/error/running states and tool Sheet/approval composition.
  `questionnaire` remains required catalog scope but is not referenced by these
  21 AI pattern pages.

Generated `@/styles/radix-rhea/ui/*` imports map to public DS primitive names.
AI SDK, transport, Markdown, `motion/react` and message-animation helpers remain
application-owned. All referenced demo sources are present; no absent-source
limitation remains. Source comparison still does not establish TypeScript
assignability, browser behavior, animation, scrolling or accessible interaction.
AI bodies remain application-owned compositions; tool execution approval,
persistence and model policy do not become DS runtime responsibilities.

## Dependency and acceptance ownership

Generator imports such as `@/registry/bases/radix/ui/*` map to public DS
`./primitives` names. `components/example`, IconPlaceholder, create-app helpers,
registry style maps, Markdown and `@/lib/ai` belong to the application/generator;
no published package should retain those aliases. RHF-aware components stay in
the dedicated client entry, with applications owning Controller/resolver policy.

Library packages own eligible Radix compositions, the selected Panels/Sonner
integration and required compatible message-scroller/questionnaire/highlighting
utilities. Base UI and React Aria primitive backends are excluded, including
transitive introduction through an auxiliary. Audit actual imports before
adoption; their presence under a Radix path is insufficient. Applications
directly declare the packages their copied blocks import: Recharts under ADR0007,
TanStack Table, DnD, QR, AI SDK/transport, Markdown, routing and authentication.
Sonner mounting is application-owned even where the DS supplies Toaster styling.
React, icons and styling peers retain their declared ownership.

Static accounting is complete only when every identity appears once and every
concrete gap has an owner. It establishes neither TypeScript assignability nor
browser acceptance. The approved composition package compiles and verifies representative public-entry
dashboard/sidebar/auth, chat and calendar journeys, retaining explicit excluded
portions and a disposition for every pinned identity. Consumers own adaptation
and acceptance of each original example or block; the representative journeys
do not establish TypeScript or runtime parity for every source identity. Calendar, overlay, toast,
resize, reading order and scroll behavior require actual
interaction evidence. Preserve settled visual adaptations with their ADR/plan
rather than replacing them with unverified upstream defaults.


## Representative composition disposition — October25

The finite denominator remains67registryexamples,30officialblockIDs and21AIpatternpages at the pinned source revision. The table gives each identity exactly one primary disposition. A mapping to a representative names the integration seam that was exercised; it does not claim the original upstream source executed. Source-level component gaps delivered in the linked drafts retain their own type/behavior/package evidence. Application-owned services never absorb an eligible missing DS control contract.

| Kind and exact identity | Primary disposition | Evidence reference / remaining obligation |
| --- | --- | --- |
| Example: `accordion-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `aspect-ratio-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `breadcrumb-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `button-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `button-group-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `carousel-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `checkbox-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `command-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `context-menu-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `dialog-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `drawer-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `dropdown-menu-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `empty-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `field-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `hover-card-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `input-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `input-otp-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `kbd-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `label-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `menubar-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `native-select-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `navigation-menu-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `pagination-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `radio-group-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `scroll-area-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `separator-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `sidebar-inset-example` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Example: `skeleton-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `slider-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `spinner-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `table-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `tabs-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `textarea-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `toggle-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `tooltip-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `chart-example` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Example: `alert-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `alert-dialog-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `avatar-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `badge-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `card-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `collapsible-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `input-group-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `item-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `popover-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `progress-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `select-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `sheet-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `sidebar-example` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Example: `sidebar-icon-example` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Example: `sidebar-floating-example` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Example: `switch-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `toggle-group-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `demo` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `combobox-example` | ADR0008 exclusion for compound Base UI Combobox portions; eligible DS parts retain component contracts | ADR0008 and capability matrix; classic Radix Combobox retained. No compound-backend parity claim. |
| Example: `component-example` | ADR0008 exclusion for compound Base UI Combobox portions; eligible DS parts retain component contracts | ADR0008 and capability matrix; classic Radix Combobox retained. No compound-backend parity claim. |
| Example: `calendar-example` | Existing Gregorian contracts plus native Persian recipe representative mapping | calendar-locale.spec.ts and application-compositions--persian-calendar (browser journey verified; see the composition qualification plan); original calendar-example permutations are not all executed. |
| Example: `resizable-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `sonner-example` | Existing public component contract; original registry composition remains application-owned | Pinned capability matrix and existing named component contract/smoke; source-only comparison of this original example is not a runtime pass. Application-specific assembly/behavior remains an explicit obligation. |
| Example: `attachment-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `bubble-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `marker-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `message-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `message-scroller-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `questionnaire-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `code-block-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Example: `trace-example` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Block: `preview` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `preview-02` | ADR0008 exclusion for compound Base UI Combobox portions; eligible DS parts retain component contracts | ADR0008 and capability matrix; classic Radix Combobox retained. No compound-backend parity claim. |
| Block: `preview-03` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| Block: `sidebar-12` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-15` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `login-01` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `login-02` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `login-03` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `login-04` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `login-05` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `signup-01` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `signup-02` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `signup-03` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `signup-04` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `signup-05` | Local RHF auth-form representative mapping | application-compositions--authentication (browser journey verified; see the composition qualification plan); real identity providers, credential handling, remote errors and the original block layout remain app-owned/unexecuted. |
| Block: `dashboard-01` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-01` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-02` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-03` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-04` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-05` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-06` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-07` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-08` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-09` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-10` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-11` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-13` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-14` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| Block: `sidebar-16` | Dashboard/sidebar/chart representative mapping | application-compositions--dashboard (browser journey verified; see the composition qualification plan); existing sidebar/chart contracts protect DS parts. Each original block layout/state remains application-owned/unexecuted. |
| AI pattern: `context` | Existing public component routes; original pattern remains application-owned | Progress/Card contracts and the capability matrix; original pattern-specific hierarchy/state/reading order remain unexecuted composition obligations. No AI-service acceptance is implied. |
| AI pattern: `file-tree` | Existing public component routes; original pattern remains application-owned | Collapsible/Button keyboard contracts and the capability matrix; original pattern-specific hierarchy/state/reading order remain unexecuted composition obligations. No AI-service acceptance is implied. |
| AI pattern: `inline-citation` | Existing public component routes; original pattern remains application-owned | HoverCard/Button contracts and the capability matrix; original pattern-specific hierarchy/state/reading order remain unexecuted composition obligations. No AI-service acceptance is implied. |
| AI pattern: `model-selector` | Existing public component routes; original pattern remains application-owned | DropdownMenu/InputGroup contracts and the capability matrix; original pattern-specific hierarchy/state/reading order remain unexecuted composition obligations. No AI-service acceptance is implied. |
| AI pattern: `chain-of-thought` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `chat` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `checkpoint` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `confirmation` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `message` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `plan` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `prompt-input` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `queue` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `reasoning` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `sources` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `suggestion` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `task` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `stack-trace` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `subagent` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `terminal` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `test-results` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |
| AI pattern: `tool` | Chat/code/questionnaire representative mapping; app-owned orchestration/services | application-compositions--conversation (browser journey verified; see the composition qualification plan); existing chat/code/questionnaire contracts protect DS parts. Original pattern-specific state/services and layout remain application-owned/unexecuted. |

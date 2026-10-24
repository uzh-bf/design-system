# v5 pinned composition compatibility assessment

## Scope and meaning

Date: 2026-10-24. DS baseline: `fbce4ffcf5819cbbc0fe6d68c5c47431a28dbc0f`.
Pinned shadcn source: `3d98900e9b73c45f035f8109e9d41ba6a51685e7`.
This is static source accounting of 67 registry examples, 30 official block IDs
and 21 Radix AI pattern pages. It is not a compilation, browser, accessibility
or behavior pass. Every identity below has one primary disposition; additional
package dependencies remain explicit. A primary owner does not absorb unrelated
missing capabilities into its scope.

The October24 user clarification selects Radix variants only. The current
Radix-labelled Combobox imports Base UI and is excluded as an implementation.
Its affected examples and block remain in this denominator with an open Radix
adaptation owner. Existing Popover/cmdk routes are the supported foundation;
exact compound API compatibility is not claimed. Editable/object/multiple/chip
capabilities remain open until their Radix route is designed and proved.

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

## Registry examples

The [example manifest](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/examples/_registry.ts)
defines these exact 67 identities. Grouped rows list every identity once.

| Primary disposition                                                                 | Exact identities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Count |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Current public route; static shape only, further composition qualification required | `accordion-example`, `aspect-ratio-example`, `breadcrumb-example`, `button-example`, `button-group-example`, `carousel-example`, `checkbox-example`, `command-example`, `context-menu-example`, `dialog-example`, `drawer-example`, `dropdown-menu-example`, `empty-example`, `field-example`, `hover-card-example`, `input-example`, `input-otp-example`, `kbd-example`, `label-example`, `menubar-example`, `native-select-example`, `navigation-menu-example`, `pagination-example`, `radio-group-example`, `scroll-area-example`, `separator-example`, `sidebar-inset-example`, `skeleton-example`, `slider-example`, `spinner-example`, `table-example`, `tabs-example`, `textarea-example`, `toggle-example`, `tooltip-example` | 35    |
| Accepted runtime ownership; direct Recharts composition under ADR0007               | `chart-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1     |
| Scheduled Shared API gap, including child composition                               | `alert-example`, `alert-dialog-example`, `avatar-example`, `badge-example`, `card-example`, `collapsible-example`, `input-group-example`, `item-example`, `popover-example`, `progress-example`, `select-example`, `sheet-example`, `sidebar-example`, `sidebar-icon-example`, `sidebar-floating-example`, `switch-example`, `toggle-group-example`, `demo`                                                                                                                                                                                                                                                                                                                                                                           | 18    |
| Excluded upstream Combobox backend; Radix adaptation and Shared API gaps remain     | `combobox-example`, `component-example`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 2     |
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
  direction retains these separate Shared API gaps. These examples also need
  adaptation away from the excluded Base UI compound API; closing Shared API
  gaps alone cannot establish all-example compatibility.
- `popover-example.tsx:19` and `input-group-example.tsx:48` import missing
  Popover header/title/description. Switch size, Sheet `showCloseButton` and
  ToggleGroup spacing have separate Shared API obligations. Existing import
  routes for other examples do not waive menu inset, semantic/type, option or
  caller-precedence deltas listed in the matrix.
- `resizable-example.tsx:4,32,136` imports the Panels 4 Layout type and uses
  orientation, percentage sizing and layout callbacks. Current DS wrappers own
  Panels 3. Preserve existing props while qualifying the selected adapter.
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
| Excluded upstream Combobox backend; Radix adaptation, Shared API and chart dependencies remain                             | `preview-02`                                                                                                                                                                                                                                                                                                                                    | 1     |
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
browser acceptance. The later Composition package must compile adapted public
examples and qualify representative dashboard/sidebar/auth and AI journeys;
calendar, overlay, toast, resize, reading order and scroll behavior require actual
interaction evidence. Preserve settled visual adaptations with their ADR/plan
rather than replacing them with unverified upstream defaults.

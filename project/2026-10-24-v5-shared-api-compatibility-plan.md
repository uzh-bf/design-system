# v5 Shared API compatibility

## Approval summary

Complete the eligible shadcn Shared API gaps so applications can compose current
alerts, avatars, cards, controls, menus and overlays through our public components.
Reuse the pinned official Radix implementations and existing dependencies. Add
their missing parts and options while retaining the root APIs, omitted-prop
defaults, UZH application geometry, Formik support and optional RHF boundary.

Deliver two coherent draft layers: shared presentation and controls, followed by
overlays and menus. A third layer implements the separate
[Calendar plan](2026-10-24-v5-calendar-compatibility-plan.md). Together they form a
new native stack above the qualified chart branch. The existing five-layer stack
stays intact. Each new tip must pass independently; the top tip does not qualify
its predecessors.

Some upstream differences are retained adaptations rather than rewrites:
accurately typed DOM elements, the accessible span Spinner, generic ItemGroup
semantics, existing portal ownership and CommandDialog's implicit Command wrapper.
These limits must appear in migration guidance and the capability matrix.
Compatibility means the supported catalog with these documented adaptations,
not unchanged copying of every upstream snippet.

Approval mode: **executable batch**. The user approved both linked plans and
the three-layer topology on October 24 and requested execution with a native
goal. Approval covers implementation, configured reviews, synthetic browser and
packed-package proof, ordinary task-branch pushes and three qualified draft PRs.
It excludes merging, readiness conversion, releases, publishing, deployments,
consumer-repository writes, human notifications and new automations.

## Execution details

### Identity, authority and terminal condition

- Repository: `uzh-bf/design-system`; release trunk `v5`, later promotion to `main`.
  Approved stack trunk: `rs/v5-recharts-compatibility`, currently
  `1138e71352225d1d428e9c8b4ec21742f7666daa`, draft
  [#224](https://github.com/uzh-bf/design-system/pull/224).
- Reuse `/Users/rschlae/Git/df/design-system/trees/rs-v5-uzh-alignment`.
  Main owns integration, exports, public decisions and all stack operations.
  Execution mode: standard; ceremony: full path. Boundary owner: self.
- This is a shared, two-phase execution plan: it travels in the first Shared API
  layer and receives Progress updates in the second. Calendar has its own plan.
- Terminal: both Shared API tips independently pass their checks and reviews,
  actual changed-state browser evidence, exact packed proof and forge feedback
  qualification; publish qualified drafts and continue into the approved Calendar
  layer. The combined batch stops after Calendar's qualified draft boundary.
- Pause only for a changed public contract outside this plan, new dependency or
  backend, changed topology, unavailable mandatory capability, or separately
  gated external action. A passing slice or review does not end the batch.

### Evidence and binding decisions

The [capability matrix](2026-10-23-v5-radix-capability-matrix.md) and
[static composition assessment](2026-10-24-v5-composition-compatibility-assessment.md)
define the finite scope. Source authority is shadcn
[`3d98900e9b73c45f035f8109e9d41ba6a51685e7`](https://github.com/shadcn-ui/ui/tree/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui),
with CLI 4.22.1 used only for read-only discovery. Its default documentation
route can select Base UI; use explicit Radix sources and inspect imports.
Do not repin the catalog or copy upstream application aliases, icon placeholders
or unrelated styling. Keep existing scoped Radix packages and local helpers.

[ADR0008](../docs/adr/0008-radix-compatible-shadcn-scope.md) owns backend eligibility
and exclusions; no compound Combobox rewrite is included. ADR0001/0002 retain
public doors and RHF isolation. ADR0005 owns geometry and theme adaptations;
ADR0006 owns RHF error presentation. No new product primitive, data owner or
validation state machine is introduced. The ADR gate is satisfied by these
decisions; a backend, runtime-ownership or incompatible-default change re-arms it.

Research ownership: main compared the pinned source and current public exports;
read-only Ampere audited Item, Empty, Kbd, Spinner, Select, Pagination, menus and
Command. Claude Fable 5.1 advised on retained DOM contracts. Verified findings:
ItemDescription already types and renders a paragraph; Select already has size
and hideIcon; Spinner already has its slot and caller-overridable size class.
ItemGroup's list role was deliberately removed in the accessibility remediation.
These are not missing implementations. Static inspection supplies no new runtime
proof. A whole-plan ChatGPT Browser consultation is ineligible while the complete
draft is unpublished and has no destination-specific disclosure approval.

### Shared presentation and control contract

All source paths below are under `packages/design-system/src/ui/`. Add compatible
parts to `./primitives` and matching existing root re-export modules. Preserve
custom root wrappers where names differ; do not flatten the two API doors.

| Family              | Required delta and retained behavior                                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alert               | Add `AlertAction` with caller props/ref and responsive action placement. Retain all local semantic variants and current default geometry.                                                                                        |
| Avatar              | Add Group, GroupCount and Badge; add explicit `size="default"` for the existing 32px route and data markers. Retain omitted 32px and sm/md/lg 28/40/56px. Badges must remain visible without losing rounded image clipping.      |
| Badge               | Add ghost/link and `data-variant`. Preserve existing tinted default, solid and semantic variants, asChild, focus and caller classes.                                                                                             |
| Card                | Add explicit default/sm size and marker, with compact child layout scoped to sm. Omission retains current padding and density.                                                                                                   |
| Item                | Add xs. Retain default/sm, asChild and existing paragraph description. Keep ItemGroup generic without an automatic list role; demonstrate valid explicit list/listitem composition without changing anchor semantics.            |
| Carousel            | Export the existing `useCarousel` through primitives and the existing root Carousel module. Preserve local scrollTo, selectedIndex, snap state and dots; no new carousel engine or behavior redesign.                            |
| Pagination          | Add upstream `text` alias. Existing `label` wins when both are supplied; empty strings remain intentional. Explicit native aria-label, href, handlers and ref keep precedence.                                                   |
| Switch              | Add default/sm size and data-size; omission/default retain current geometry. Preserve controlled/uncontrolled state, form submission, disabled and root wrapper behavior.                                                        |
| ToggleGroup         | Add spacing and corresponding orientation-aware layout. Omitted spacing remains joined (zero); explicit positive spacing separates items. Forward actual Radix orientation and retain caller style, variant and size precedence. |
| InputOTP            | Default spellCheck to false, with an explicit caller value winning. Preserve controlled values, paste, refs, disabled and existing separator.                                                                                    |
| Empty, Kbd, Spinner | Retain accurate div, kbd and span props/ref contracts. No SVG ref alias, union or cast. Spinner remains a named status with 28px omission default and explicit caller sizing in Button, InputGroup and Item compositions.        |

Button sizes/markers, Tabs variants/orientation, NativeSelect and Direction were
delivered by #223. Verify their unchanged composition evidence; do not reimplement
stale matrix findings. Source-comparable ButtonGroup, Field, InputGroup, Input,
Textarea, Skeleton, Slider, Table and Toggle remain in this layer's accounting.
Preserve their documented local options and reuse applicable passing proof.
Close each row with evidence, a named retained adaptation or a concrete blocker;
no unassigned Shared API row may disappear as polish.

### Overlay and menu contract

| Family                         | Required delta and retained behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AlertDialog                    | Add Media and compact Content size. Action/Cancel accept Button variant/size through safe composition, with existing primary/outline defaults, Radix events/ref and one actual button preserved. Keep current automatic portal/overlay.                                                                                                                                                                                                                                                     |
| Dialog and Sheet               | Add DialogFooter showCloseButton, omitted false; SheetContent showCloseButton, omitted true. Preserve Content close controls, root Modal behavior, selector props and existing caller-managed Dialog portal/overlay ownership.                                                                                                                                                                                                                                                              |
| Popover                        | Add Header/Title/Description. Use div/div/p DOM with matching props/ref types, rather than copying the upstream Title's h2-type/div-render mismatch. Preserve non-portaled Content, explicit portal composition, sizing, focus and caller handlers.                                                                                                                                                                                                                                         |
| Dropdown, ContextMenu, Menubar | Add optional inset and data-inset to all six checkbox/radio parts. Preserve default indicator padding, state, selection, submenus, alignment, placement and root wrappers. Omitted raw Dropdown alignment retains the Radix default; explicit align remains available.                                                                                                                                                                                                                      |
| Command                        | Add the trailing check for explicit data-checked, independent of keyboard data-selected. Suppress it with CommandShortcut. Caller-owned indicators, including the existing root Combobox, remain legacy usage without data-checked; do not inspect arbitrary children or add a new suppression API. Omitted/false data-checked adds no indicator or spacing. Preserve implicit CommandDialog wrapper, close-button default, separator search/alwaysRender and accessible title/description. |
| Select                         | Preserve existing size/hideIcon and popper omission default; prove explicit item-aligned and alignment routes. Add missing upstream data-align-trigger/data-position markers and a real compact size treatment if current size merely labels unchanged geometry. Keep custom root Select defaults and refs.                                                                                                                                                                                 |

Source-comparable Drawer and NavigationMenu also remain owned here: reuse or
extend existing direction, focus, dismissal, submenu and prop/ref proof.
Do not add automatic portals to existing non-portaled parts, change omission
defaults to match upstream, or replace local wrappers wholesale. Native caller
attributes, handlers, controlled state and cancellation must remain effective.

### Proposed stack and ownership

Create a separate three-layer native stack with custom trunk
`rs/v5-recharts-compatibility`. The prerequisite is the current v5 foundation,
including #223's Button/Direction APIs and #224's required peer and packed matrix;
`main` does not contain that foundation. Native stack221 already has five layers.
Do not append three more, share a member branch between stacks, unstack, reorder,
rebase published history or merge prerequisites. Check live local/remote topology
before creation; unexpected divergence is a blocker, not authority to repair it.

| Order / branch                    | Coherent package and reviewer focus                                                                                                                                              | Independent acceptance / size signal                                                                                                                                                                                                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1: `rs/v5-shared-presentation`    | Additive presentation/control composition, root compatibility, native semantics and accurate DOM types. Base: chart branch. Audience: component/API maintainers; judgment-heavy. | Complete active parts and controls, existing composition contracts, types, theme/browser/packed gates. Estimate 600–900 human-authored lines across 20–30 paths plus reviewed generated visual changes. Threshold ruling: one package because it closes the bounded non-overlay composition API; do not create one PR per component. |
| 2: `rs/v5-shared-interactions`    | Overlay/menu API and interaction compatibility, consuming lower control parts. Base: presentation branch. Audience: interaction/accessibility maintainers; judgment-heavy.       | Overlay/menu browser contracts, root wrappers, focus/RTL and all package gates. Estimate 500–800 human-authored lines across 18–25 paths plus reviewed generated visual changes. Threshold ruling: one package around interaction ownership and caller precedence.                                                                   |
| 3: `rs/v5-calendar-compatibility` | Locale-consistent DayPicker and retained picker/form behavior. Base: interactions branch.                                                                                        | Owned by the linked Calendar plan; independently green and reviewed.                                                                                                                                                                                                                                                                 |

All three deliver complete behavior; activation is complete, risk medium. Main is
the sole topology owner. Bounded executors may patch disjoint named UI modules;
main owns public decisions, shared tests/stories, root/primitives exports, docs,
integration and proof. No concurrent writers to manifests, shared exports, test
harnesses or visual baselines. No new dependency is proposed. Later layout/toast,
messaging/highlighting and integrated consumer qualification remain separate.

### Delegation Map

Each slice has one accountable owner. Supporting source patches are bounded
subtasks, not separate tasks or topology owners.

| Slice                        | Owner | Dependency and bounded supporting work                                                                                                                                                                | Acceptance                                                |
| ---------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1: presentation and controls | main  | Chart prerequisite. Dispatch executor for disjoint Alert/Badge/Card, Avatar/Item and Carousel/Pagination/Switch/ToggleGroup/InputOTP patches. Main owns public integration, shared fixtures and docs. | First three portfolio rows and exact integrated diff      |
| 2: qualify presentation      | main  | Slice 1. No source writer during final proof/review; main owns exports, evidence, reviews and draft publication.                                                                                      | Independently green first tip and complete row accounting |
| 3: overlays and menus        | main  | Qualified slice 2. Dispatch executor for disjoint menu inset and AlertDialog/Dialog/Sheet patches; main retains Command/Select/Popover contracts and shared harness integration.                      | Interaction portfolio row and affected legacy root cases  |
| 4: qualify interactions      | main  | Slice 3. Main owns remaining row closure, exact packed proof, reviews and draft publication.                                                                                                          | Independently green second tip, then Calendar handoff     |

The main-owned slices cross coupled public exports, docs and qualification;
critical-path coupling keeps integration local. Dispatch only settled disjoint
source patch groups, and inspect each returned diff before integration.

### Test portfolio and evidence

Paths here are relative to `packages/design-system/`. Extend existing stable
seams, using minimal test-owned synthetic fixtures; never assert prose or entire
demo content. Matrix row closure references the observed contract, not a filename.

| Risk / distinct failure                                                                                       | Obligation and primary seam                                                                                                                                                                                                                                                                                                                                                                                                                                  | Owner              |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| New names/options compile but drop native props/ref or break root imports                                     | Extend `tests/contracts/public-contracts.types.ts` for actual element refs, options, aliases and root/primitive imports. Browser-check forwarded handlers and mounted elements in existing public-contract seam.                                                                                                                                                                                                                                             | Both Shared layers |
| Compact variants or grouped parts change omission geometry or clip content                                    | Add new `tests/contracts/shared-presentation.spec.ts` and `src/SharedPresentation.stories.tsx`. Assert measurable layout and behavior for omission/explicit options, long content, Avatar badges, Spinner overrides and Carousel hook state.                                                                                                                                                                                                                 | Presentation       |
| Native controls stop submitting, paste breaks, aliases lose caller precedence                                 | Extend existing `tests/contracts/direct-control-refs.spec.ts` for affected Switch refs and `tests/contracts/input-editing.spec.ts` for InputOTP paste. New control/native-form/Pagination cases live in shared-presentation.spec.ts against the named SharedPresentation harness.                                                                                                                                                                            | Presentation       |
| Overlay composition duplicates buttons/portals, menu check state follows focus, or Escape loses trigger focus | Add new `tests/contracts/shared-interactions.spec.ts` and `src/SharedInteractions.stories.tsx`, reusing existing direct/composite-ref coverage. Exercise cancel/submit, close flags, explicit portal, nested menu, Select position/size, RTL and caller event cancellation. Command cases separately prove keyboard-selected unchecked, checked without keyboard focus, checked with shortcut, and caller-owned check without data-checked or extra spacing. | Interactions       |
| Package additions leak RHF or change dependency identity, CSS isolation or hydration                          | Test obligation: none for new harnesses; run existing packed root/dedicated and Next fixtures, positive module-marker/size gates, emitted CSS and theme-contract checks; refresh exact archive and installed-file proof after executable changes.                                                                                                                                                                                                            | Each tip           |

The first type/prop row extends existing public-contract types and browser tests;
no new type-test file is needed. Retained/source-comparable rows have obligation
none where existing proof remains applicable. Use the two named Shared story
harnesses for new behavioral and gallery states; do not scatter new fixtures
through all family stories or create additional spec/helper files. Existing
family documentation changes belong only to the options actually added. This
freezes the test allocation before slicing.

Before each substantive commit run relevant container-native type/lint/format
checks and the focused behavioral seam. Build Ladle once per changed source
state, then use `PWTEST_SKIP_BUILD=1` for its tests. Per layer's final source run
the package build/check/lint/format scripts, full behavioral contracts,
accessibility inventory/protocol and relevant visual regression. Account for new
stories in the existing exact inventory; no new waivers or budget increases.

Run both existing packed scripts, `tests/rsc/packed-consumers/scripts/verify.sh`
and `tests/rsc/next-consumer/scripts/verify.sh`, in the existing container tooling
at each qualified layer tip. Retain the three existing cells: Recharts 3.8.0 with
RHF 7.90.0; Recharts 3.10.1 with RHF 7.90.0; Recharts 3.10.1 with RHF 7.59.0.
Use `RECHARTS_VERSION` and `RHF_VERSION`; Next proves both existing bundlers.
Do not create a redundant full cross-product or reuse an older executable
archive as the new candidate. Preserve the existing root/primitives RHF-free
runtime and declaration checks, peer identity, CSS and size ceilings.

Use `$rs-build-screenshot-gallery` for real captures at 390px and 1280px on
neutral-light, neutral-dark and UZH-light. Include opened overlays, checked menus,
compact variants, grouped avatars, long content and applicable RTL. Preserve UZH
geometry; UZH-dark remains unsupported. Assert actual keyboard/focus/selection
behavior independently of screenshots. Publish reviewed synthetic captures in
the corresponding draft description through the forge CLI, with provenance and
limitations; keep manual screen-reader/Safari/device qualification distinct.

### Slices, documentation and delivery

1. **Presentation and controls:** implement the first contract table with its
   tests, named SharedPresentation harness, public re-exports and preserved adaptations.
   Route: executor for disjoint source modules; main for coupled integration.
   Acceptance: presentation/type/native behavior portfolio rows. Commit coherent
   families with conventional `enhance`/`fix` types, not one layer per commit.
2. **Qualify first layer:** complete existing comparable-row evidence, packed and
   browser proof, required simplification/risk/final reviews and independent CI.
   Correct the stale RHF tooltip/touched/submitted paragraph in
   `packages/design-system/MIGRATION.md` to ADR0006 alongside this source work.
   Record exact Shared API progress in this plan, matrix, composition assessment
   and GA roadmap; publish a draft at its verified tip.
3. **Overlays and menus:** implement the second table and its interaction/type
   coverage, named SharedInteractions harness and exports. Route: bounded source executors;
   main owns shared Button/Command/portal contracts and integration. Acceptance:
   interaction portfolio rows plus preserved legacy root behavior.
4. **Qualify second layer:** repeat only changed-source qualification, complete
   remaining Shared API row dispositions, update migration examples and this
   shared plan's Progress, then publish the second qualified draft and proceed
   into Calendar after its prerequisites hold.

Use the configured simplifier and risk reviewer on substantive committed slices;
one integrated final reviewer qualifies each layer's complete incremental scope.
Verify findings before applying them and reuse unchanged proof. Check staged
secrets/personal/production-derived facts, exact diff scope and live remote state
before commits/pushes. Draft descriptions use `$rs-mr-description-writer` and
preserve existing evidence. No human reviewer requests or review replies.

## Progress

- Presentation draft [#225](https://github.com/uzh-bf/design-system/pull/225)
  qualifies at `2d8b02a6f`: complete hosted CI, initial/focused configured final
  review, exact archive/installed-file proof and 18 published captures pass.
  Runtime and browser are stopped. Preserve that lower tip.
- Active layer: `rs/v5-shared-interactions`, based on that qualified tip. Two
  bounded source executors completed the six menu/overlay modules; main owns
  remaining public parts, harness, types and integration. Initial types/lint pass.
  Browser verification is correcting fixture overlap with Ladle controls and
  proving compact Select height under a stretching form row. No dependencies or
  omission defaults change. Initial builds/tests precede slice commit/reviews.
- October 24: user approved both plans and the three-layer topology, including
  ordinary pushes and qualified draft delivery; native goal active.
- Active slice: presentation and controls. Baseline1138e71352225d1d428e9c8b4ec21742f7666daa;
  fresh host fetch shows chart upstream0/0 and main313ahead/3behind. Chart branch
  is the approved prerequisite; no main integration is needed.
- Branch `rs/v5-shared-presentation` created and adopted by native stack tooling in the
  existing worktree. Existing stack221 remains unchanged. Main owns topology.
- Planning and native planner hardening complete. Implementation, configured
  reviews, browser/gallery, exact packed proof, CI and three draft deliveries
  remain. Required delivery layer: qualified drafts; achieved: approved plan.
- Runtime: exact custom tool container `ds-v5-rhf-checks`, source-mounted read-only
  from this worktree, resumed for checks; no consumer runtime touched.
- Presentation implementation integrated: all ten assigned UI modules, root
  exports, three deterministic story states, public types, native/ref/paste and
  composition coverage. Complete browser contracts:136 passed. Types, lint,
  format and Ladle build pass; focused scanner reports zero findings/errors.
- Verified Card regression fixed: compact styles now preserve caller padding
  and nested default density through scoped CSS variables. No dependency change.
- First source tip `bfb0a75d3` published as draft
  [#225](https://github.com/uzh-bf/design-system/pull/225). Three packed/Next
  endpoint cells pass both bundlers; the exact archive matches all268installed
  files. Size/module-marker,704token and336responsive CSS checks pass.
- Simplification and focused risk-review correction pass. AvatarGroupCount
  contrast and custom Pagination accessible names were corrected without waivers;
  new4behavior/6themed axe cases pass. Captures cover18synthetic states across
  neutral-light/dark andUZH-light at390/1280; all native uploads and byte readbacks
  are complete.
- Local full accessibility run:851pass and4mounttimeouts during a concurrent
  fixture rebuild; stable rerun passes all8theme/story cases. Hosted full accessibility/visual gates
  pass at the published source tip; final tip qualification remains pending.
- User authorized the bounded configured Claude reviews for all three layers.
  The first complete review found three compatibility defects, all reproduced
  in the browser: standalone Card parts lost padding, omitted ToggleGroup
  orientation changed arrow-key behavior, and iconless Alert actions indented
  desktop text. Variable fallbacks, unchanged omitted orientation, and action-only
  spacing correct them. All 11 focused cases, types, lint, formatting and Ladle
  build pass. Refreshed package/gallery proof and the focused review remain.
- Hosted CI passes at `2371521dd`. Two subsequent review findings exposed gaps
  in the tests: the compact Switch ref case targeted the default control, and
  Alert placement lacked desktop coverage. The corrected compact target and
  wide/narrow desktop checks pass in an 11-case focused run. Types, lint,
  formatting and Ladle build pass. These fixture/test changes preserve package
  code and rendered appearance; existing packed and screenshot proof is reused.
- Next action: finish correction proof and the configured review's focused pass,
  then qualify the current draft head before advancing to interactions.

### Planning review

Native planner Helmholtz approved both complete plans in round 2 after four
accepted corrections: explicit single-owner delegation maps, implementable
Command checked/shortcut/caller-indicator rules, Calendar omission/default and
class-precedence acceptance, and frozen test/harness destinations. No topology,
architecture or source-scope change occurred during hardening. Main verified each
finding against current code. Local links, new-plan formatting, diff whitespace,
source-only scope and sensitive-data checks pass. No runtime was needed.

The optional AGY rival did not run: automatic approval review rejected disclosure
of the unpublished drafts without payload-specific destination authorization.
This adds no permission to retry; the required native review is complete. Raw
provenance and arbitration are kept in the ignored review directory.

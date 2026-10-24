# v5 layout, toast and Sidebar compatibility

## Approval summary

Qualify the remaining layout and toast auxiliaries used by the pinned official
shadcn Radix recipes. Deliver native Panels 4 primitives, reliable Sonner options
and theme integration, and Sidebar direction/mobile behavior in three independently
qualified draft layers above the completed Calendar draft.

Panels needs an explicit compatibility decision. Retain `react-resizable-panels`
3.0.6 under its existing dependency name for root Resizable components, and add
`react-resizable-panels-v4: npm:react-resizable-panels@4.14.8` for raw primitives.
This preserves the legacy runtime, numeric percentage sizes, callbacks, refs,
custom tags and saved layouts. The raw `./primitives` Resizable family moves to
native v4 contracts: numeric sizes are pixels, percentages use strings, and layout
maps and imperative refs follow v4. Existing primitive consumers must migrate or
choose the retained root family. Native v4 types/ref/persistence helpers are
exposed through the DS, keeping the dependency alias private. Components from the
two families cannot mix.
This uses the official engines; it does not recreate a resizing engine or emulate
the complete v3 API on v4. Applications using both families can include both engines.

Upgrade Sonner to exact 2.0.8, preserving caller overrides without discarding DS
defaults. Preserve Sidebar's existing UZH dimensions and app-owned navigation;
repair direction through its mobile Sheet and verify focus, dismissal and state.
Keep Formik and the optional RHF entry intact. Applications directly using Sonner
must declare the matching 2.0.8 runtime and share its toast store with the DS
Toaster; prove that path in the packed fixture. No consumer repository changes.

Approval mode: **executable batch, approved October24**. Approval covers the dependency and
primitive migration above, the three-layer topology below, implementation,
configured reviews, synthetic browser/package proof, ordinary task-branch pushes
and qualified draft delivery. Stop after all three drafts qualify. Merging,
marking ready, publishing, deployment, consumer writes, human notifications,
provider configuration and new automations require separate authority.

## Execution details

### Baseline, ownership and acceptance

- Repository: `uzh-bf/design-system`; release trunk `v5`. Reuse
  `/Users/rschlae/Git/df/design-system/trees/rs-v5-uzh-alignment`.
- Proposed immediate base: `rs/v5-calendar-compatibility`, qualified draft
  [#228](https://github.com/uzh-bf/design-system/pull/228), frozen at
  `0f7b78ba252e6e0ea201447b78e66242daf1e3ae`. Existing stacks stay intact.
- Execution mode: standard; full path; main is boundary and topology owner.
  The user approved implementation and this topology on October24.
- Terminal: three independently green drafts with completed review dispositions,
  exact packed candidate/installed-file evidence, published synthetic UI captures
  and settled forge feedback. No source qualification implies GA acceptance.
- Pause only for a material departure from these contracts, failure of a required
  capability after its continuity ladder, or separately gated external effects.
  An in-scope test/review correction continues with the same owner.

### Research and decision

Authority for upstream equivalence is the published shadcn catalog at
`3d98900e9b73c45f035f8109e9d41ba6a51685e7`, specifically its Radix
[Resizable](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/resizable.tsx),
[Sonner](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/sonner.tsx)
and [Sidebar](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/sidebar.tsx)
recipes. Retain local helpers, scoped Radix imports and UZH styling adaptations.
No Base UI, React Aria, registry repin or application block ownership is proposed.

Main owns Panels/dependency research and the contract decision. The read-only
mapping worker owns Sonner/Sidebar call sites and existing test seams. Context7
resolved official Panels and Sonner documentation; current/main signatures are
cross-checked against exact published npm 3.0.6/4.14.8/2.0.8 declarations. Both
proposed target versions accept React 19. Repository source remains unchanged.

Panels 4 changes units, layout representation, imperative handles and persistence.
It does not expose all v3 tag, ordering, keyboard-step, drag-state and callback
contracts. A universal v3-on-v4 adapter is rejected because it would approximate
existing capabilities and introduce a maintained facade. Deferring v4 leaves the
required official recipe unresolved. Aliasing v3 while making v4 canonical is
also rejected: a synthetic packed probe found distinct legacy module identities
under npm, although pnpm deduplicated them. Keeping v3 canonical and aliasing v4
preserved the tested legacy identities under both package managers.

The prototype proves module identity in that fixed dependency graph, not browser
behavior or universal deduplication. Native v4 components must come from the same
DS family. Direct application imports of v4 component implementations can be a
different instance under npm; do not claim arbitrary cross-instance composition.
Expose v4 `Layout`, `useDefaultLayout`, `useGroupRef` and `usePanelRef` through
`./primitives` from the same v4 module. This keeps the alias private and gives
applications that retain canonical v3 a supported v4 helper route. Prove the
helpers with the actual native trio in the packed fixture.
Saved root layouts keep their existing v3 format; no automatic conversion to v4.

No product primitive changes: resizing, notifications and navigation are UI
composition surfaces; application content, routing and durable state remain
application-owned. ADR0001 permits distinct root/primitive contracts, but the
primitive major change and retained engine exception require a new accepted
`docs/adr/0009-resizable-engine-compatibility.md` during execution. That record
owns dual-engine rationale, migration and reconsideration; removal in v6 remains
a future decision. ADR0002/0004/0005/0008 remain binding. A new engine, global
provider, storage migration or loss of root capability reopens the decision.

### Binding contracts

| Surface             | Required result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root Resizable      | Keep all existing v3 props and ref behavior, numeric percentages, nested groups, ordering, custom tags, drag callbacks, keyboard steps, autoSaveId/storage and stored layout format. Move the existing v3 wrapper implementation into the existing root `src/Resizable.tsx`; preserve its defaults and styles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Primitive Resizable | Adapt the pinned official Group/Panel/Separator recipe in `src/ui/resizable.tsx` to the exact v4 alias. Keep natural exported names and UZH handle styling. Use native v4 props, units, refs and orientation markers, and re-export the named v4 helpers/types through primitives. Document the pre-GA primitive migration and keep each family internally consistent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Package identity    | Keep canonical v3 and alias v4 as exact direct dependencies, with shared application React. Adapt the existing installed-dependency assertion narrowly for this alias, verifying original package name and exact version. Prove root/primitive graph separation and that unrelated imports do not include both resizing engines.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Toaster options     | Destructure caller className/style/toastOptions/icons before the final spread. Retain DS classes and CSS variables when unrelated options are supplied. Also preserve arbitrary caller classNames in the generic `src/Toast.tsx` trigger, whose current branch replaces them with closeButton only. Merge each existing styled part with caller values last; retain unstyled/new Sonner option keys, per-toast behavior and caller callbacks. Explicit caller theme/style/icon choices win.                                                                                                                                                                                                                                                                                                                                                             |
| Toast appearance    | Keep brand tokens rooted per ADR0004. Preserve current explicit-corner offsets; omission and center positions keep native Sonner placement without new DS offsets. Qualify neutral-light, neutral-dark and UZH-light; no UZH-dark claim. Theme follows explicit Toaster theme, then configured next-themes mode, then the DS root's dark class when a DS root theme is present, then Sonner system behavior. Root-mode changes must update without remounting; avoid new required providers or global theme ownership. Use official equivalent Lucide icons and radius token with caller overrides.                                                                                                                                                                                                                                                     |
| Sidebar             | Keep 15rem desktop geometry, existing mobile/icon widths, variants, tooltip ownership, cookies, controlled/uncontrolled state and toggle contract. Forward explicit dir and caller div attributes/classes/style/ref to the rendered mobile SheetContent, preserving caller override precedence. Desktop controlled open/onOpenChange remains desktop-only; mobile state stays internal. Retain collapsible=none static behavior, cookie write-only behavior and existing shortcut contract; do not introduce cookie restoration, mobile controlled props or portal APIs. Qualify physical left/right placement independently of text direction, dismissal, accessible naming, focus containment/return and breakpoint transitions. Restore the actual opener when the mobile Sheet closes, if it remains mounted, using the existing overlay lifecycle. |

### Approved topology

Create a new native stack with Calendar as its custom trunk. One owner creates
and navigates it in this worktree. Each layer includes its tests/docs and must
pass independently; do not infer lower qualification from the top. This shared
batch plan travels with the first implementation layer and later Progress updates.

| Layer | Proposed branch and base                    | Complete reviewable outcome                                                                                       | Risk and size signal                                                                                                                                                                            |
| ----- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `rs/v5-panels-compatibility` above Calendar | Retained root v3 plus native v4 primitives, migration/ADR, package identity and actual resizing/persistence proof | High public compatibility risk; estimate 300–600 substantive lines across 12–18 paths, excluding locks/project docs. One coherent engine-boundary package; do not split runtime from its proof. |
| 2     | `rs/v5-sonner-compatibility` above layer 1  | Sonner 2, option precedence and theme/interaction proof                                                           | Medium; estimate 180–350 substantive lines across 8–14 paths, excluding locks/project docs.                                                                                                     |
| 3     | `rs/v5-sidebar-compatibility` above layer 2 | Direction through the mobile sheet and preserved navigation/focus contracts                                       | Medium; estimate 120–280 substantive lines across 6–10 paths. Existing source plus meaningful browser proof; no separate tests-only layer.                                                      |

Serialize manifests, all affected frozen fixture lockfiles, exports and shared
test/story integration. No lower-stack rebase or target integration is needed
merely because main differs. Integrate only for an evidenced readiness blocker.

### Test portfolio

Extend existing stories and public contracts. Add one maintained
`tests/contracts/layout-auxiliaries.spec.ts`, growing only with its owning layer.
Each assertion protects the consequential behavior below rather than story prose,
sample values, hashes or incidental DOM ordering. Test-owned fixtures are synthetic.

| Distinct failure                                                 | Test obligation and existing protection                                                                                                                                                                                                                                                                                                                                                                       | Primary seam/owner                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Numeric percentages become pixels; root refs/callbacks disappear | Add new behavioral cases and extend existing public-contract types/Resizable story. Existing demos have no sufficient protection. Cover root numeric sizing, collapse/expand/callbacks/ref API plus native v4 percentage/pixel cases.                                                                                                                                                                         | layout-auxiliaries.spec.ts, existing Resizable story/types; slices 1–2 |
| Storage or component contexts split                              | Extend existing packed scripts/fixtures and add save/remount/custom-storage cases. Prove alias name/version, root group plus matching raw v3 Panel, npm/pnpm identity, and native v4 helper/trio composition. No root format migration.                                                                                                                                                                       | Existing packed fixtures + new browser seam; slices 1–2                |
| Alias validation accidentally weakens ordinary checks            | Extend existing assert-installed-dependencies.test.mjs. Accept the exact alias; reject wrong underlying name and wrong version, retaining existing ordinary dependency rejection.                                                                                                                                                                                                                             | Existing dependency validator and adjacent tests; slice 1              |
| Resizing loses keys, touch or RTL                                | Add new contract cases through the existing Resizable story. Cover horizontal/vertical/nested groups, pointer drag, keyboard bounds/collapse, disabled handle, coarse-pointer resizing, explicit RTL and custom tags.                                                                                                                                                                                         | New contract spec + existing story; slice 2                            |
| Caller toast options discard defaults or other overrides         | Add new native Toaster and generic-trigger cases; extend Toast story/types. Cover unrelated options, partial classNames, style/icon overrides and actual callback effects.                                                                                                                                                                                                                                    | New spec + existing Toast story/types; slice 3                         |
| Toast mode, actions or application store diverge                 | Add new mode/action contract cases and extend the packed Next fixture. Cover explicit theme precedence, both provider contexts, root mode update, supported surfaces, keyboard dismiss/actions and reduced motion. A direct application sonner@2.0.8 toast must appear in the DS Toaster.                                                                                                                     | New spec + packed Next auxiliary leaf; slice 3                         |
| Mobile Sidebar loses direction, caller props, focus or state     | Add new cases and extend Sidebar story/public types. Verify dir, both sides, accessible naming, id/data/aria attributes, caller class/style precedence, and a ref to the rendered mobile content. Cover keyboard open/Escape/backdrop, containment/return to mounted opener, desktop controlled/uncontrolled state, separate internal mobile state, and 767/768px transition. Reuse unchanged Sheet coverage. | New spec + existing Sidebar story/types; slice 4                       |
| New engines fail SSR/hydration or leak into unrelated entries    | Extend existing packed/Next fixtures and entry-graph/package checks. Render both resizing families and v4 persistence/ref helpers in the packed Next client leaf; add toast/store/theme hydration in layer 2. Assert actual interaction and no hydration/page error under both bundlers. Reuse existing React/RHF/CSS/peer/budget gates.                                                                      | Named Next auxiliary leaf/spec below; slices 1, 3 and 5                |

Register only actual new story exports in the exact accessibility inventory.
Keep existing serious/critical inventory semantics and budgets; add no waiver or
threshold adjustment. The earlier UZH empty-error contrast and modal-menu
aria-hidden-focus findings remain separate GA repairs, not silent exclusions.

### Delegation Map and slices

| Slice                                  | Execution owner/route                    | Dependency, owned paths and acceptance                                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1: Panels contract and package seam    | Main / main                              | Approved plan/ruling. Own root/ui Resizable, public exports/types, ADR0009, dependency/locks, alias validator/tests and packed Next auxiliary leaf. Critical public/dependency coupling keeps these local. Acceptance: types, exact installed-dependency tests, graph identities and first meaningful packed sizing/ref/hydration result. |
| 2: Panels behavior proof               | Bounded trusted native worker / executor | Slice 1 settled. Own existing Resizable story, new layout-auxiliaries.spec.ts Panels cases and Next auxiliaries.spec.ts Panels case. Acceptance: declared resize/storage/keyboard/touch cases plus focused packed hydration case. Parent serializes container verification and shared files.                                              |
| 3: Sonner implementation and behavior  | Bounded trusted native worker / executor | Qualified Panels layer. Own ui/sonner.tsx, Toast.tsx, existing Toast story and this layer's contract-spec cases. Acceptance: option/trigger merging, theme precedence/update, native actions and opened-state axe. Main owns dependency/locks, public types and Next leaf/store acceptance integration in this slice.                     |
| 4: Sidebar implementation and behavior | Bounded trusted native worker / executor | Qualified Sonner layer. Own ui/sidebar.tsx, existing Sidebar story and this layer's contract-spec cases. Acceptance: declared mobile caller props/ref, direction, focus and state cases. Main owns export/type integration and shared inventory.                                                                                          |
| 5: Independent layer qualification     | Main / main                              | After slices 1–2, then slice 3, then slice 4. Own exact artifacts, reviews/dispositions, manifests/locks/inventory integration, screenshots, stack/forge actions and final evidence. Acceptance: each layer independently satisfies Verification and delivery. Integration and external effects stay local.                               |

Every numbered slice has one implementation owner. Main integration inside a
worker-owned slice is limited to the disjoint paths named above; it does not
create a second writer. Main dispatches trusted workers with clean context,
owned paths, no delegation and bounded checks. Role/model selection follows the
current routing contract. Reuse the same worker for its one focused correction.

After approval, create the first branch and commit this reviewed shared plan
first, then record ADR0009 before implementing the engine split. Slices 1–2 and
the first qualification produce the Panels draft. Slice 3 and its qualification
produce Sonner; slice 4 and its qualification produce Sidebar. No new plan or
generic approval interrupts this finite approved batch.

The current RHF migration paragraphs already state ADR0006's accepted behavior;
the older roadmap instruction to correct them is stale. Reconcile that status
without another prose rewrite or copy test. Record actual outcomes in this plan,
the capability matrix/composition assessment and GA roadmap with each owning
layer. Hold final verified heads; record final CI/quiet acceptance in descriptions
and the ignored journal rather than restarting CI with status-only commits.

### Verification and delivery

Use existing container tooling for installs/builds/tests and host Git/gh for forge
actions. Named implementation paths are `src/Resizable.tsx`, `src/ui/resizable.tsx`,
`src/ui/sonner.tsx`, `src/Toast.tsx`, `src/ui/sidebar.tsx`, `src/primitives.ts`, their existing stories, public-contract
types, the new contract spec, exact inventory, package manifest/root lock and the
affected existing packed/Next fixture manifests/locks/scripts. Extend existing
entry-boundary scripts only for the declared split. No new module hierarchy.

Extend the existing packed Next fixture at
`tests/rsc/next-consumer/app/page.tsx` with one new client file
`tests/rsc/next-consumer/app/auxiliary-leaf.tsx` and one new browser spec
`tests/rsc/next-consumer/tests/auxiliaries.spec.ts`. Layer 1 renders root v3 and
primitive v4 groups with real ref/default-layout helpers and persistence under
server rendering and hydration. Layer 2 extends that same leaf/spec for a directly
imported matching Sonner runtime and DS Toaster, explicit/root theme hydration
and an actual emitted toast. The library and application must resolve the same
Sonner store; document the matching direct dependency rather than claiming any
second Sonner instance will work. Main serializes the existing Next fixture
manifest and all three lock variants. Both Next bundlers run these cases through
the existing verify.sh; the unchanged Button/Chart/RHF cases alone do not qualify
these new surfaces.

For each independently qualified tip run native types/lint/format/build/Ladle,
its focused behavioral seam, full behavioral/accessibility inventory protocol,
relevant managed visual comparison, emitted CSS/theme/package budgets and
root/primitives/RHF isolation. Inspect actual visual differences; do not regenerate
baselines to hide a regression. Run the existing three packed/Next cells with
both bundlers: Recharts 3.8.0/RHF 7.90.0, Recharts 3.10.1/RHF 7.90.0 and
Recharts 3.10.1/RHF 7.59.0. Each executable tip needs a fresh archive hash and
installed-file/source-copy proof; reuse only unchanged source/environment evidence.

Capture real synthetic 390px/1280px neutral-light, neutral-dark and UZH-light
states through the screenshot skill, including actual drag/keyboard/touch,
toast action/dismiss and Sidebar open/close/focus interactions. Upload to the
same project through host gh, verify image bytes and actual Markdown rendering,
and retain provenance for reused captures. Stop the exact touched runtime after
its final check and verify it stopped. No consumer/pilot runtime is needed.

Manual screen-reader, Safari and physical-device proof and integrated exact
candidate consumer acceptance remain separate GA boundaries. No package release,
deployment, merge or ready conversion is implied by green draft CI.

## Progress

Human approval: the full reviewed batch was approved on October24. Planner
hardening approved round2; execution mode remains standard and the native goal
is active. Merge, ready conversion, publishing, deployment, consumer writes,
provider changes and new automations remain outside this package.

- Panels draft [#229](https://github.com/uzh-bf/design-system/pull/229) qualifies
  at `88b397d4df4ddef3f9f6081ceacdc705b73d9604`: full CI, configured final review,
  risk review, simplification, exact archive/installed proof, eight published
  captures and a quiet feedback check pass. The head is held. Runtime stopped
  and isolated browser closed after that layer's final proof.
- Sonner is active on `rs/v5-sonner-compatibility` above that head; draft [#230](https://github.com/uzh-bf/design-system/pull/230)
  is open in native stack231. Exact2.0.8, eight fixture locks, matching application runtime, public
  declarations, source option/theme merging and packed Next acceptance are
  integrated. Fifteen dependency cases, static checks/build, seven focused
  behavior/opened-axe cases and focused source scanning pass. Full behavior and
  selector runs pass (170 plus9cases), as do881accessibility cases,29pinned
  visual regressions,704theme assertions and unchanged package budgets. All
  three packed cells and12Nextbrowser cases per bundler pass. Exact archive
  `0242f9587a76890f5aea2e2b959dcb5cff7560434c1c26a117d6a901f5f97b36`
  matches270installed files;448tracked package sources match the producing
  container. Twenty-four synthetic captures are inspected. Simplification and risk review
  are complete after the reproduced OS-precedence correction; the refreshed
  full179/881and three packed matrices pass. Configured final review and hosted
  CI pass at `1a2db9391`; the journal and draft description record final
  qualification without moving that held tip. The verified native listener lesson is recorded in
  `docs/solutions/integration/sonner-system-listener-overrides-resolved-mode.md`.
- Three Toast story callers share `tests/_support/toast-root.ts` because MDX
  cannot declare an unexported module helper. These concrete callers justify
  the small test-support file; it is outside public library entries and adds
  no story or product API. Caller-mode and native DOM assumptions were checked
  against actual Sonner2 output; no positioning facade or suppression was added.
- Sidebar implementation follows independently qualified Sonner. Its scope
  remains mobile caller props/direction/focus with existing state and geometry.
- Sidebar source, public types and seven focused browser cases pass, including
  opened mobile accessibility in all three supported theme states. Explicit
  trigger capture fixes the reproduced return-to-previous-focus failure;
  Sheet open/close callbacks cover keyboard and custom opening. Focus bookkeeping
  stays private within the existing provider; both public entries reject access
  to it. Slice risk review and simplification are complete. Native checks,
  186 behavior/selector cases, 883 accessibility cases with fresh inventory
  artifacts, all three packed cells and both Next bundlers pass. Unchanged
  budgets and theme checks pass; 29 visual comparisons are retained alongside
  fresh changed-story checks. Twelve synthetic captures are inspected. Archive
  `c33633da14a1d4d87926ff3c5da0a7d6660cb092514ad0dce542a8935c2c15bd`
  matches all 270 installed files; 448 tracked package sources match the container.
  Configured final review and hosted CI remain before draft qualification.
  The layer is one package despite exceeding its estimate: the small component
  change and its synthetic story/type/browser proof protect the same mobile
  contract. Splitting that proof would leave an incomplete integration point.
- Immediate next action: complete final review and hosted qualification for
  Sidebar above the held Sonner tip. Preserve the verified implementation.

The Sonner layer remains one notification compatibility package: source option
and theme behavior, declarations, store identity and browser/packed proof form
one reviewable contract. Human-authored verification exceeds the estimate; lock
and project-document changes are accounted separately in the execution journal.
Current producing logs, review dispositions, exact hashes and final-tip CI/settle
receipts remain in the ignored execution journal and each draft description;
final green status will not trigger another tracked status commit.

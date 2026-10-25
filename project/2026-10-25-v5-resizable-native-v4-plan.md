# One native Resizable contract for v5

## Approval summary

Use the breaking v5 release to move both public Resizable entry points to the
official shadcn Radix recipe's Panels 4 contract. Replace canonical
`react-resizable-panels@3.0.6` plus its v4 alias with one exact canonical 4.14.8
dependency. Root and primitive components share the existing canonical
`ui/resizable` implementation, its native helpers and its types. Keep the UZH
divider, grip and focus styling.

This deliberately changes the root API as well as the pre-GA primitive API.
Numeric panel size inputs become pixels; percentages require strings. Layout maps
keep numeric percentages. Orientation, imperative
refs, callbacks and persistence use native v4 contracts. Removed v3 features
include custom element tags, ordering, keyboard step configuration and separate
collapse/expand/drag callbacks. Document the supported replacements and gaps;
do not emulate removed APIs or silently convert application-owned saved layouts.
Formik, RHF isolation and other components remain outside this migration.

Approval mode: **executable batch under the user's October25 instruction to
prefer upgrading throughout this breaking major when the shadcn pattern supports
it**. This supersedes the root-v3 preservation choice in the completed October24
batch. Existing standing authority covers implementation, configured reviews,
ordinary task-branch pushes and draft delivery. Preserve published lower heads
and add one coherent migration layer above Sidebar. Stop at a qualified draft;
merging, readiness, publishing, deployment, consumer writes and notifications
remain separate gates. Consumer usage and acceptance are not yet quantified.

Acceptance requires a single installed engine, shared root/primitive component
identity, explicit migration documentation, real resize/ref/persistence behavior,
package-manager composition and SSR/hydration proof, reviewed synthetic captures,
independent reviews and hosted checks on the final draft head.

## Execution details

### Baseline and ownership

Reuse `trees/rs-v5-uzh-alignment` in `uzh-bf/design-system`. The live task target is
Sidebar draft [#232](https://github.com/uzh-bf/design-system/pull/232), branch
`rs/v5-sidebar-compatibility`, at `be62259b034146237bcc875117a405881dff0804`.
Fresh remote refs confirm that task head equals its remote; it is 344 commits
ahead and 3 behind `origin/main`. Main is not this layer's target. No integration
blocker has been identified.

Execution mode: standard, full path. Main owns public contracts, integration,
dependency/lock changes, topology, runtime, verification and delivery. The one
proposed branch is `rs/v5-resizable-native-v4`, above the completed native stack
#231's Sidebar layer. This is a newly requested migration after qualification,
not a correction needed to satisfy the earlier dual-engine contract. Hold
[#229](https://github.com/uzh-bf/design-system/pull/229),
[#230](https://github.com/uzh-bf/design-system/pull/230) and #232's published
heads; ordinary push only. Use native stack tooling without cascading rebases.

Pause only for a new material contract decision, loss of a required review or
verification capability, consumer writes, or separately gated external effects.
The prior native goal is complete; this request does not create a replacement.

### Research and binding decisions

- Verified: shadcn 4.22.1 `docs resizable --base radix` selects the official
  [Radix Resizable recipe](https://ui.shadcn.com/docs/components/radix/resizable).
  Its Group/Panel/Separator wrappers use Panels 4. The local primitive already
  implements this recipe. No Base UI dependency or alternative backend is needed.
- Verified: the exact 4.14.8 declarations support native pixel/percentage sizing,
  orientation, refs, resize callbacks, layout maps and storage helpers. Use these
  declarations rather than copying older 4.0 release snippets. Prefer
  `onLayoutChanged` and `useDefaultLayout({ id, storage, panelIds })` for persistence.
- Verified: root Resizable duplicates the v3 recipe and adds no domain behavior.
  `src/original/resizable.tsx` is included in TypeScript checks; update that
  existing recipe copy to the native contract rather than excluding it.
- Advisor: configured Claude recommends one canonical engine at the major
  boundary and identifies the silent numeric-size change as the principal risk.
  Its approval concern refers to the superseded October24 preservation contract;
  the user's newer request explicitly selects upgrading in breaking v5.
- Limitation: no application usage survey or consumer-repository migration is
  part of this package. Future Klicker/GBL exact-candidate acceptance must use the
  new candidate and include any application-owned saved layout migration.

ADR gate: this durable public/dependency decision supersedes ADR0009. Add
`docs/adr/0010-single-native-resizable-contract.md`, mark ADR0009 superseded and
link the new ruling. ADR0001's two doors retain their exported component names;
both doors now share this native family. Existing brand/form decisions remain.

Primitive impact: reuse the existing Resizable primitive; retire the duplicate
root implementation and the private dependency alias. No durable product entity,
owner, storage service or global provider is introduced. Saved layouts remain
application-owned.

### Contract and migration

Both entries export the same Resizable trio and `useDefaultLayout`, `useGroupRef`,
`usePanelRef`, `Layout`, `GroupImperativeHandle`, `PanelImperativeHandle` and
`PanelSize` from the canonical module. Export only the helpers/types needed by
this family, not unrelated new upstream features. Keep the package's exact
dependency declaration and existing optional peers/entry boundaries.

Migration documentation must call out:

| Existing v3 usage                                         | Native v4 result                                                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `direction`, numeric percentages                          | `orientation`, explicit percentage strings; numeric values mean pixels                                                          |
| React imperative `ref`, positional arrays, `onLayout`     | `groupRef`/`panelRef`, ID-keyed layouts, `onLayoutChange`/`onLayoutChanged`; `elementRef` for DOM                               |
| `onCollapse`/`onExpand`, `onDragging`, `keyboardResizeBy` | Observe native size through `onResize`/imperative methods; no equivalent drag lifecycle or configurable keyboard step           |
| `tagName`, `order`, `hitAreaMargins`                      | Native divs and DOM order; semantic markup inside panels, stable panel IDs; group `resizeTargetMinimumSize` for pointer targets |
| `autoSaveId`/group storage and v3 saved arrays            | `useDefaultLayout`, native maps and explicit SSR-safe storage; no automatic old-data conversion                                 |

Also describe changed imperative method names/results, native double-click reset,
panel className's inner div and orientation selectors. Type checks cannot detect
the number-to-pixel semantic change, so show a minimal before/after size example.
Application direct imports must declare matching 4.14.8 and share a runtime; prove
the bounded fixtures without promising arbitrary installation deduplication.

### Delegation Map and sequence

| Slice                         | Execution owner | Dependencies, bounded assistance and acceptance                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1: complete native migration  | Main            | Planner-approved contract. One trusted native executor assists only on the existing Resizable story and Panels portions of the two browser specs; main owns all disjoint API, package and fixture integration. Acceptance: static and first packed composition plus the native behavior portfolio. Commit only the coherent integrated migration after both path owners finish. |
| 2: qualification and delivery | Main            | Committed migration, with its simplifier and risk review cleared. Own documentation status, final package/screenshot proof, final review, hosted CI and draft delivery.                                                                                                                                                                                                         |

Slice1 includes dependency definitions and existing lock variants for the library,
root-only packed consumer and Next consumer. It updates `src/Resizable.tsx`,
`src/ui/resizable.tsx`, `src/original/resizable.tsx`, public type fixtures,
installed-dependency validator/tests, packed runtime import checks, Next verify
script and `app/auxiliary-leaf.tsx`. Remove alias special handling and protect
canonical name/version plus shared identity. The root-only packed pnpm fixture
asserts root/primitive component and helper identity. Next uses matching direct
application4 components mixed with both DS doors under each bundler. The existing
installed-dependency test covers duplicate-instance rejection; repeat the bounded
npm/pnpm same-version composition probe in the ignored evidence directory.

The executor's entire write scope is `src/Resizable.stories.mdx`, Panels portions
of `tests/contracts/layout-auxiliaries.spec.ts` and
`tests/rsc/next-consumer/tests/auxiliaries.spec.ts`, all relative to
`packages/design-system`. Keep unrelated Sonner/Sidebar cases. Main supplies the
settled Next fixture hooks and owns container execution. Source and acceptance
are coupled: no intermediate commit is claimed independently buildable before
the minimum story/spec migration lands. Additional cases are part of this same
integrated implementation slice.

Main owns ADR0010/0009, `MIGRATION.md`, this plan, the existing GA roadmap,
capability matrix, composition assessment and a historical supersession note in
the completed layout/toast plan. Preserve historical evidence; current guidance
must describe one engine. Run the required simplifier and public-contract/package
risk review together immediately after the committed substantive migration. Then
perform one configured integrated final review after local qualification. Deliver
one draft with exact package, captures and CI evidence; hold its qualified head.

Only the plan and ADR0010 are new tracked documents. Extend existing code, tests
and docs; execution evidence stays under the existing ignored reviews directory.

### Test portfolio and delivery

| Consequential failure                                                | Coverage disposition and owning seam (slice1)                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Numeric sizes silently change meaning; old refs survive incorrectly  | Replace/consolidate v3 type and Ladle cases: percent/pixel sizing, native refs/map callbacks, collapse/expand, Home/End, nonzero collapsedSize and onResize current/previous payloads.                                                                                                                                                                                                                            |
| Context or storage differs between doors or package managers         | Extend existing root-only pnpm runtime checks for identical exports/helpers and validator duplicate rejection. Replace/consolidate Next arrays with native maps, mixed root/primitive/direct matching Panel, custom storage save/reload, and conditional panel sets using matching panelIds. Restore actual sizes for each set; do not assume a flat storage representation. Run bounded npm/pnpm identity probe. |
| Native upgrade loses interaction or styling                          | Replace/consolidate obsolete v3 Ladle cases, retaining pointer, touch, RTL, vertical/nested, disabled and focus protection. Add native double-click reset and layout-ID obligations in the existing story/spec; no parallel duplicate suite for each door.                                                                                                                                                        |
| Installed package or SSR proof tests a stale tree                    | Extend existing exact archive/installed-file proof, both Next bundlers and existing packed React/RHF minimum/current cells; update native dependency and emitted graph checks.                                                                                                                                                                                                                                    |
| Removal widens unrelated entry payloads or accessibility regressions | None new: run existing types/lint/format/build, entry graph, size budgets, theme and a11y inventory/contracts. Preserve thresholds; reuse unaffected Sonner/Sidebar evidence.                                                                                                                                                                                                                                     |

Inspect existing coverage before adding cases. Maintain behavior tests, never prose
or demo content snapshots. Browser captures cover changed root/native compositions
on neutral light/dark and UZH light, desktop/mobile and relevant RTL; inspect real
interaction states and publish through the same project's authenticated CLI under
the existing screenshot policy. No screenshot baseline regeneration or budget
increase. Manual Safari/device/screen-reader and GA acceptance remain separate.

Use the stopped custom `ds-v5-rhf-checks` container when runtime-dependent work
begins; its `/source` task mount is read-only and builds use `/workspace`. Record
actual toolchain versions, copy only intended results back and stop the exact
runtime after the final runtime check. Do not touch retained consumer runtimes.

Read current forge feedback before completion. A supported bounded CI watcher may
own hosted qualification; no new automation. Required human reviews remain human
gates. Record final qualification in the ignored journal and draft description,
avoiding status-only commits that restart green CI.

## Progress

Planning: native planner approved round2 after five verified corrections:
coupled slice acceptance, pixel inputs versus percentage maps, exact fixture
dependencies/identity, concrete persistence/behavior coverage and review timing.
The optional opposing-provider challenge remains pending; it cannot replace the
required planner. Implementation not started.
Planning consultation and exact upstream declarations are retained under
`project/_local/reviews/2026-10-25-resizable-*`.
Required delivery: one qualified draft above #232. Achieved: assessment only.
The existing exact custom container has resumed for implementation verification
(Node24.16.0, pnpm10.30.0). No active writer, CI watcher or new native goal. Next:
commit the reviewed plan, then implement the canonical API and native evidence
within the user's requested v5 upgrade scope.

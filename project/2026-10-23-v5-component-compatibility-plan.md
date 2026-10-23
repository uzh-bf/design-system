# v5 small component compatibility

## Outcome and approval

Close the first pinned Radix API gaps: four Button sizes, Tabs list variants and
vertical layout, native HTML select composition and a public direction context.
Preserve existing component defaults, legacy APIs, both supported themes and
caller class precedence. Existing applications gain additive composition APIs.
Approval mode: executable batch. The user approved this reviewed plan on
2026-10-23, including its native stack layer, verification and draft delivery.

- Repository/target: `uzh-bf/design-system`, release trunk `v5`.
- Prerequisite: the [catalog package](2026-10-23-v5-catalog-compatibility-plan.md)
  and [matrix](2026-10-23-v5-radix-capability-matrix.md) reviewed and delivered.
- Approved delivery: a single component-compatibility draft above the catalog
  layer using native `gh stack`, branch `rs/v5-component-compatibility`, in the
  existing `trees/rs-v5-uzh-alignment` worktree. Parent owns topology. This plan
  records the approved addition; main remains the sole topology owner.
- Execution owner: main session in standard mode; delegate settled disjoint
  implementation to one executor after establishing the compatibility seam.
- Terminal: focused behavior/type/browser/packed checks, synthetic screenshot
  evidence, simplification and independent final review, coherent non-force
  branch push and a qualified draft PR. Leave draft; no merge or publication.
- GBL/Klicker remain unmerged. No consumer writes, runtime resumes, readiness,
  deployments, releases or human notifications. Local DS runtime lifecycle
  applies only if browser verification starts its exact tooling environment.

## Settled contracts

Use [ADR0002](../docs/adr/0002-rhf-subpath-rsc-contract.md),
[ADR0005](../docs/adr/0005-uzh-corporate-design-is-a-reference-not-a-constraint.md)
and the pinned shadcn source
[`3d98900`](https://github.com/shadcn-ui/ui/tree/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix).
No new product primitive is introduced: these are UI composition surfaces.
The public compatibility promise is extended; no data, identity or policy
ownership changes. Existing ADRs cover the change; a breaking default, new
backend, entry-point split or UZH-dark promise re-arms a decision before work.

| Surface      | Proposed behavior                                                                                                           | Compatibility and proof                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button       | Add `xs`, `icon-xs`, `icon-sm`, `icon-lg`; add the 24px rung to existing 32/40/48px geometry with matching icon sizes       | Keep default/sm/lg/icon geometry, variants, asChild, native refs and caller precedence; accessible name and visible focus remain caller/control obligations                                                                                                                                                                                                                                                                                           |
| Tabs         | Export `tabsListVariants`; support explicit `default` and `line`, horizontal and vertical orientation                       | Omitted variant preserves current full-width underline track. Explicit `line` provides that treatment; explicit `default` adds the upstream filled treatment. Keep controlled/default selection, automatic/manual activation, disabled navigation and public wrappers. `tabsListVariants()` without arguments follows the omitted line treatment                                                                                                      |
| NativeSelect | Add `NativeSelect`, `NativeSelectOption`, `NativeSelectOptGroup` with native select props/ref and `sm/default` visual sizes | Preserve native value/defaultValue/name/required/disabled/invalid/multiple behavior; no replacement of existing custom Select or SelectField. `size` stays visual (`sm/default`), numeric native row count is unsupported in this additive API; `className` styles the wrapper as upstream, native `style`/ref reach the select. With `multiple`, omit the dropdown chevron and intrinsic single-line height so native multi-selection remains usable |
| Direction    | Export `DirectionProvider` and `useDirection` with `direction ?? dir` precedence                                            | Use existing scoped Radix direction module directly; context must affect scoped Radix descendants, including nested overrides and portaled controls                                                                                                                                                                                                                                                                                                   |

Propose exact runtime dependency `@radix-ui/react-direction@1.2.0`, verified in
current registry metadata and already transitively installed. Declare it directly;
transitive presence is insufficient. NativeSelect needs no added dependency.
Retain scoped Radix packages and local `cn`; no umbrella or packaged-cn migration.
These choices are unqualified until packed runtime/browser checks pass.

Small targets require special care: keep size names without promising that every
isolated 24px visual control meets every touch-target context. Prove actual hit
areas and spacing in representative dense groups and document usage constraints.
The unsupported UZH-dark posture is unchanged; neutral-light/dark and UZH-light
are the existing theme qualification surfaces.

## Source scope and slices

1. **Button and Tabs compatibility.** Change existing
   `packages/design-system/src/ui/button.tsx`, `ui/tabs.tsx` and their existing
   `Button.stories.mdx`/`Tabs.stories.mdx`. Verify legacy root wrappers before
   changing shared styling. Extend existing public type and interaction seams.
   Commit one coherent controls change after the focused checks.
2. **Native select and direction.** Add only the named canonical
   `src/ui/native-select.tsx` and `src/ui/direction.tsx`; expose through existing
   `src/primitives.ts` and compatible root exports where no legacy collision
   exists. Use existing stories/contracts to demonstrate controlled/uncontrolled
   select and nested LTR/RTL, rather than introducing a second control layer.
   Update `packages/design-system/package.json` and `pnpm-lock.yaml` together.
3. **Integrate and qualify.** Update existing `MIGRATION.md` and stories with
   additive API and Tabs omission semantics; update affected matrix rows and the
   current package plan. Inspect complete diff for simplification, run applicable
   risk review and one final configured review; publish a draft with real gallery.

| Slice                         | Owner and dependency                                               | Exact verification/story scope                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button/Tabs                   | native executor; follows approved plan                             | Existing `src/Button.stories.mdx`, `src/Tabs.stories.mdx`, `tests/contracts/component-aria.spec.ts`, `tests/contracts/public-contracts.types.ts`; preserve root wrapper calls |
| NativeSelect/Direction        | main; after controls and before shared export/manifest integration | New canonical files named above; demonstrate in existing `src/Select.stories.mdx` and `src/PublicContracts.stories.mdx`; update `src/index.ts`/`src/primitives.ts` explicitly |
| Integrated qualification/docs | main; depends on both slices                                       | Existing type/ref/browser/packed/theme/size seams, real synthetic gallery, package docs and independent final review                                                          |

Shared manifests, exports and integration remain parent-owned. The executor owns only the settled Button/Tabs source/story/contract subset;
main owns new canonical controls, shared exports, dependency selection, topology
and integration. No child owns release effects or consumer access.
Keep code comments about component semantics, not planning/reviewer history.

## Test portfolio and acceptance

Test obligation: extend existing for each automated risk below. Use
`tests/contracts/public-contracts.types.ts` for additive props/export signatures,
`tests/contracts/component-aria.spec.ts` for Tabs and native select/direction
interaction, and `tests/contracts/direct-control-refs.{spec.ts,types.ts}` for
actual native control ref focus. Preserve existing tests; do not add a parallel
runner. Packed/theme/visual/a11y gates are existing obligations, extended only
where a new public route needs proof. Screenshots and manual checks add no
maintained test files.

The existing `component-aria.spec.ts` protects Tabs roles and panel linkage;
`button-basic.spec.ts` protects legacy basic layout; public-contract/ref/type
checks protect attribute forwarding and old call sites. Existing packed/Next,
theme-contract, visual and accessibility inventories remain the integration gates.
Extend those seams only for consequential gaps:

| Risk                                        | Obligation and primary seam                                                                                                                                                                                                            | Distinct failure                                                       |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Additive API breaks callers                 | Existing public type contracts: old calls plus all new sizes/list variants; native ref/value props and export availability; reject numeric NativeSelect size with a compile-time expect-error case                                     | New prop unavailable, wrong native target or changed wrapper typing    |
| Orientation/context loses keyboard behavior | Existing browser contract suite: omitted/line/default list styling, no-argument variant helper, vertical arrow movement, horizontal RTL movement, disabled tabs, caller overrides, nested direction override and scoped portal control | Appearance changes while navigation/context remains wrong              |
| Native form behavior or focus fails         | Browser contract: native single/multiple FormData values, wrapper-class versus select-style/ref placement, keyboard choice, disabled exclusion, required/invalid association and programmatic ref focus                                | Wrapper swallows a native prop, value or control ref                   |
| Default styling or compact focus regresses  | Real browser computed bounds, group hit-area/spacing, focus clipping and caller overrides; existing visual/a11y suite                                                                                                                  | API exists but control is unreadable, clipped or inaccessible          |
| Packed CSS or RSC boundary fails            | Existing packed declarations, Next root/primitives fixture, both RHF versions, theme contract and size budgets                                                                                                                         | Source works only with workspace resolution or a client provider leaks |

Use container tooling for installs/builds/tests. Begin with native type checks
and focused Playwright contracts, then existing required CI commands. Do not
repeat unchanged all-family RHF behavior matrices unless shared source changes
invalidate them. Refresh affected packed artifact identity and installed-file
proof after executable changes. Do not weaken budgets or snapshot thresholds.

Use `rs-build-screenshot-gallery` for synthetic horizontal/vertical Tabs, native
select and dense Button states in neutral-light/dark and UZH-light at desktop
and phone widths, with long German labels and LTR/RTL where affected. Exercise
interaction first; screenshots alone do not prove keyboard or native behavior.
Use existing `rs-local-runtime-lifecycle` and stop exact task runtime after checks.
Manual screen-reader, Safari and physical-device proof remain separate GA gates.

## Research and open decisions

Pinned Radix Button/Tabs/NativeSelect/Direction source and current official
[Tabs](https://ui.shadcn.com/docs/components/radix/tabs),
[Native Select](https://ui.shadcn.com/docs/components/radix/native-select) and
[Direction](https://ui.shadcn.com/docs/components/radix/direction) docs establish
composition. The live registry confirms direction1.2.0. No blanket overwrite,
CLI preset switch or general dependency refresh is authorized.

No unresolved product ruling is required by this proposal. Tabs omitted/default
semantics are deliberately distinct to preserve current consumers; approval of
this plan accepts that adaptation. Stop and report a demonstrated incompatibility
that requires changing legacy defaults/exports, adding another backend or public
subpath, weakening acceptance, or changing approved dependency/cost boundaries.
Routine reversible adapters and implementation details remain executor choices.

## Progress

- Approved by the user on 2026-10-23 together with the Recharts plan; full-path package, standard execution mode, project artifacts root `project/`.
- Starting source/base: `1144f6e620588e3872d0dfd21f9e9a69132dfeac`, qualified catalog [draft #222](https://github.com/uzh-bf/design-system/pull/222). Fresh refs: 104 ahead/0 behind `origin/v5`; 288 ahead/3 behind `origin/main`. Target remains v5; no integration blocker exists.
- Branch: `rs/v5-component-compatibility`, existing worktree `trees/rs-v5-uzh-alignment`; native stack 221 addition approved. Reuse completed planner and catalog reviews; no behavior/risk change since approval.
- Active slice: Button/Tabs, executor owns only those two primitives and their existing stories. Main owns native select/direction, shared contract files, dependency/export integration and proof. Route: executor; acceptance: existing type, button and Tabs browser contracts.
- Runtime: resume exact `ds-v5-rhf-checks` tool container, source `/source` bound read-only to this worktree; editable verification copy `/workspace`. It is not DevPod/devrouter managed. Stop after final runtime-dependent proof.
- Test delta: extended existing type, browser, ref and packed/Next seams; seven new stories registered in the existing exact a11y inventory. No separate runner or baseline-debt allowance.
- Controls committed in `f6b76d273`, corrected in `62ec52f58` after measured filled-tab contrast and scoped orientation fixes. New native controls and their direct dependency are implemented; checks and draft delivery continue.
- Source/type/lint, focused13browser cases, fourteen new-story a11y cases, both current packed fixtures and both Next bundlers pass. All-package contracts, minimum RHF, visual/theme/size checks and reviews are tracked in the private verification journal.
- Native select/direction committed in `a85612bb9`; neutral dark Button correction in `78ab4b77a`. [Component draft #223](https://github.com/uzh-bf/design-system/pull/223) is published, with 24 synthetic gallery attachments and passing local verification.
- Final review corrections committed in `1fbd3913d`: ordinary caller classes win for root/list/trigger layout and Button text. Claude correction PASS validates against the canonical schema; prior complete review remains reusable.
- Existing Select outside-dismissal contract now waits for the opened option to receive focus before its forced outside click. This closes an observed readiness race without changing application behavior; ten focused repeats and all 116 contracts pass.
- Local qualification is complete: types/lint/build, focused and full browser contracts, both packed/Next RHF cells, theme/size gates, 29 visual checks and 24 published synthetic captures. Hosted CI on the final tip remains the draft qualification gate; keep that receipt in the journal/body without another status-only commit. Then continue the approved Recharts layer.

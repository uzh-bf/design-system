# Roadmap — Design System v5 GA readiness

The historical Klicker pilot, RHF parity, selected GBL journey, supported Radix components and auxiliaries, Recharts 3 and representative compositions qualify at their recorded draft boundaries. GA remains blocked by dependency advisories and release-age compliance, integrated candidate consumer acceptance, manual qualification and promotion reconciliation. The older qualification layer retains a browser-install CI failure. GBL and Klicker remain unmerged by user ruling.

The native Recharts keyboard tooltip resize counterexample remains an explicit GA/chart gate: an active tooltip can retain its old horizontal position after a390px shrink. Existing immediate overflow checks and previously passing chart contracts do not close that gate. Preserve exact real-consumer and manual accessibility acceptance separately; no dependency source patch or weakened check is permitted.

## Identity and status

- Date: 2026-08-10; current execution index refreshed 2026-10-26
- Status: GA blocked. Input correctness, consumer CSS, durable contract gates,
  UZH Phase 2 and the earlier October 19 dependency remediation are delivered in the unmerged
  draft stack. The historical Klicker pilot now qualifies the recorded candidate;
  the earlier authentication blocker is resolved in its consumer draft.
  Integrated UZH default acceptance, runtime/tooling/fixture advisories,
  dependency maturity, representative consumers and manual accessibility/browser
  checks remain open.
- Repository: `uzh-bf/design-system`
- Release trunk: `v5`
- Current source delivery branch: `rs/v5-composition-proof`; the earlier qualification layer remains `rs/v5-ga-qualification`
- Roadmap worktree:
  `/Users/rschlae/Git/df/design-system/trees/rs-v5-uzh-alignment`
- Current delivery: draft stack [#210](https://github.com/uzh-bf/design-system/pull/210) →
  [#211](https://github.com/uzh-bf/design-system/pull/211) →
  [#213](https://github.com/uzh-bf/design-system/pull/213) →
  [#214](https://github.com/uzh-bf/design-system/pull/214) →
  [#215](https://github.com/uzh-bf/design-system/pull/215) →
  [#216](https://github.com/uzh-bf/design-system/pull/216) →
  [#217](https://github.com/uzh-bf/design-system/pull/217) →
  [#218](https://github.com/uzh-bf/design-system/pull/218), followed by native stack221
  [RHF fields219](https://github.com/uzh-bf/design-system/pull/219) →
  [RHF pickers220](https://github.com/uzh-bf/design-system/pull/220) →
  [catalog222](https://github.com/uzh-bf/design-system/pull/222) →
  [components223](https://github.com/uzh-bf/design-system/pull/223) →
  [Recharts224](https://github.com/uzh-bf/design-system/pull/224).
  Later qualified [Shared API225](https://github.com/uzh-bf/design-system/pull/225),
  [Shared API226](https://github.com/uzh-bf/design-system/pull/226) and
  [Calendar228](https://github.com/uzh-bf/design-system/pull/228) lead into native
  stack231: [Panels229](https://github.com/uzh-bf/design-system/pull/229),
  [Sonner230](https://github.com/uzh-bf/design-system/pull/230),
  [Sidebar232](https://github.com/uzh-bf/design-system/pull/232),
  [unified Resizable233](https://github.com/uzh-bf/design-system/pull/233),
  [chat234](https://github.com/uzh-bf/design-system/pull/234) and
  [Questionnaire235](https://github.com/uzh-bf/design-system/pull/235).
  The [approved CodeBlock/highlighting plan](2026-10-25-v5-code-highlighting-plan.md)
  qualified [draft #236](https://github.com/uzh-bf/design-system/pull/236) at `f654685e6` above the held Questionnaire draft. [Quality draft #237](https://github.com/uzh-bf/design-system/pull/237) qualifies at `059844953`; [composition draft #239](https://github.com/uzh-bf/design-system/pull/239) qualifies at `1eeeca318`. The October26 dependency/consumer review below owns the next roadmap sequence. Merges remain separately gated.
- Audience: maintainers and future execution agents preparing v5 for GA and
  migrating the first production consumers.

## Goal

Move v5 from a registry-proven prototype release to a GA candidate with an
immutable release boundary, enforced package budgets, deterministic visual and
accessibility gates, explicit React Server Components and theme-extension
contracts, approved consumer-owned primary ramps where used, and representative
real-application proof. Before GA, provide every existing Formik field capability
through RHF, retain Formik through v5, support the official Radix-compatible shadcn
catalog and auxiliaries with [ADR0008's documented exceptions](../docs/adr/0008-radix-compatible-shadcn-scope.md),
and verify UZH alignment against current official sources.

## Non-goals

- This roadmap does not authorize a merge, tag, package publication,
  deployment, or consumer delivery.
- PR #195 does not implement the post-P0 work packages.
- GA does not require every known consumer to complete a full migration. It
  requires a current compatibility matrix with no unknown critical break and
  representative VetSim, GBL demo-game, and Klicker evidence.
- Formik exports, runtime support and public types remain through v5. Removal
  belongs to v6 after RHF migration evidence and a consumer inventory.
- No brand ramp, accessibility count, package budget, or visual threshold is
  invented before it is measured or approved.

## Source-of-truth rules

1. This roadmap supersedes the status, ordering, milestones, and GA criteria in
   the historical production-readiness, post-A3, and prototype-readiness
   roadmaps. Those files remain evidence for completed packages and are not
   rewritten to simulate current state.
2. Code, Git history, CI runs, npm registry readback, packed artifacts, and
   consumer builds outrank status prose.
3. Every future Design System or consumer PR receives its own reviewed
   execution plan. This roadmap controls milestone order and gates; it does not
   replace package-level plans.
4. Accepted ADRs own durable public contracts. [ADR 0002](../docs/adr/0002-rhf-subpath-rsc-contract.md)
   partly supersedes [ADR 0001](../docs/adr/0001-two-door-public-api.md): root and
   primitives retain RSC isolation; optional RHF composites use the dedicated
   `./react-hook-form` client entry. [ADR 0003](../docs/adr/0003-uzh-primary-ramp-override-boundary.md)
   and [ADR 0004](../docs/adr/0004-themeprovider-root-sync.md) settle consumer ramp
   ownership and document-root placement. [ADR 0005](../docs/adr/0005-uzh-corporate-design-is-a-reference-not-a-constraint.md)
   owns the application-design posture. Change the applicable ADR before changing
   its contract.
5. PR [#179](https://github.com/uzh-bf/design-system/pull/179) is the existing
   `v5 -> main` promotion boundary. It is not a source branch for feature work
   and is not replaced merely because it is broad or stale.
6. Push, PR creation, PR readiness, merge, tag creation, tag push/publication,
   dist-tag promotion, and deployment remain distinct authority gates.

Historical inputs:

- `project/2026-07-18-v5-production-readiness-roadmap.md`
- `project/2026-08-02-v5-post-a3-next-roadmap.md`
- `project/2026-08-05-v5-prototype-readiness-roadmap.md`
- `project/2026-08-09-v5-rhf-w3-plan.md`
- `project/2026-08-10-pr-195-ci-npm-trusted-publisher-plan.md`
- GBL evidence:
  `/Users/rschlae/Git/gbl/gbl-uzh/trees/rs-v5-alpha-pilot/project/2026-08-09-v5-gbl-w3-plan.md`

## Planning and routing

- The user approved the PR #195 closeout and requested this detailed roadmap.
- `rs-sliced-development-workflow` owns package plans, slice commits,
  verification, review, and PR finish.
- `writing-for-agents` keeps each work package executable without chat history.
- The August planning pass raised RSC export design, brand-ramp ownership and
  accessibility baseline accounting. Accepted ADRs and implemented gates now
  resolve those foundation questions; the current index controls remaining work.
- Security-sensitive release changes, public API rulings, architecture,
  integration, and external side effects remain in the main session. Bounded
  implementation may be delegated only after a package plan fixes its paths,
  behavior, and checks.
- No broad external research was required for P0. The action pins were resolved
  from the upstream Git tag refs. Later packages must use their official tool
  documentation when selecting Size Limit or Playwright configuration.

## Current execution index — 2026-10-23

### Dependency and consumer checkpoint — 2026-10-26

The [complete dependency review](2026-10-26-v5-dependency-compatibility-review.md)
owns the dated inventory, publication cutoff, advisory matches, shadcn crosswalk,
consumer snapshots and toolchain constraints. Opus 5.5 challenged the ordering and
confirmed that dependency ownership and maturity need explicit disposition before
another integrated candidate. This supersedes the unfiltered registry-latest
advice in the October25 drift section.

The cutoff is October 12 at 06:00:49 UTC, exactly 14 days before the assessment.
RHF 7.90.0 is already the mature current cell; 7.91.0 is too young. Native
`@shadcn/react` 0.3.1 and Recharts 3.10.1 are current and mature. CLI 4.22.1 is too
young; 4.21.4 is the mature generator. Retain the pinned Radix-only source scope
and the ergonomic prop contracts. API/source qualification does not establish
release-age compliance: 83 root lock records and 28 in each isolated fixture lock
are immature at this cutoff. Panels 4.14.8 matures November 3; the last current
transitive pin matures November 5. Waiting addresses age only, not advisories.

The successful public-dependency bulk advisory check reproduces 9 unique root
advisories and finds 37 unique across all 9 locks. Next fixtures include critical
matches; root-only audit results never covered them. The mature Next 16.4.0
remains affected, while fixed 16.4.1 is too young until October 28. Preserve this
timing decision explicitly. Prefer verified removal of unused DS runtime Zod;
its separate tooling copy and the size-limit/browser chain require their own
remediation. No advisory waiver, exception or version change is approved here.

Modern consumers broadly declare React 19/Tailwind 4, but the latest integrated
peer contract is not accepted by the old pilots. Klicker locks Recharts 3.0.2 and
GBL 2.15.4, below the required 3.8 floor. Thesis uses FA 7/ReactFA 3 against current
FA 6/ReactFA 0.2 peers. Optional-present RHF must meet the supported minimum.
An allowed peer range and a resolved compatible graph are distinct evidence;
missing direct peers and auto-installed lock tuples are metadata gaps, not
application acceptance. Private consumer snapshots remain in the ignored local
assessment; the public review carries shared acceptance gates without their
versions or commit references.

### Delivered evidence and its limits

October25 checkpoint: all approved Shared API, Calendar, layout/toast, unified
Panels4, chat and Questionnaire packages qualify at their recorded draft heads.
[Chat234](https://github.com/uzh-bf/design-system/pull/234) holds48c6b91a6;
[Questionnaire235](https://github.com/uzh-bf/design-system/pull/235) holds2a8d3f401. Their final reviews,
hosted checks, exact archive proof and feedback settle are complete. Current
[CodeBlock/highlighting and utility compatibility](2026-10-25-v5-code-highlighting-plan.md) qualified in [draft #236](https://github.com/uzh-bf/design-system/pull/236) at `f654685e6`. Quality and representative compositions subsequently qualified in [draft #237](https://github.com/uzh-bf/design-system/pull/237) and [draft #239](https://github.com/uzh-bf/design-system/pull/239) at the recorded heads above.
The dated chart-tip snapshot below remains historical evidence, not today's tip.

Host refs were refreshed on October 24. Release trunk `v5` is
`80d6f229cdf8aa57384246bba0386d730484eecb`; the qualified chart tip is
`43c54a557838528c87b0d2ffc53a8daa0b30f122`, 125 commits ahead of v5 with no
missing v5 commits. Its immediate PR base is `rs/v5-component-compatibility`;
`main=fad87a07e9cf262a3a117c5e815091c7b54fa151` is the later promotion boundary.
Documentation reconciliation does not require integrating main into this stack.

| Workstream                               | Delivered evidence                                                                                                                                                                                                                                                           | Remaining gate                                                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inputs, dependencies and field contracts | Drafts [PR210](https://github.com/uzh-bf/design-system/pull/210), [PR211](https://github.com/uzh-bf/design-system/pull/211) and [PR213](https://github.com/uzh-bf/design-system/pull/213) correct input/reset, disabled-selection, multi-select and transformed-type defects | Preserve these input cases through the expanded catalog; RHF parity is qualified in drafts PR219/220                                          |
| Consumer CSS and UZH tokens/defaults     | [PR214](https://github.com/uzh-bf/design-system/pull/214) through [PR217](https://github.com/uzh-bf/design-system/pull/217) deliver scoped responsive CSS, palette/alias coverage, tokens and defaults                                                                       | Current official-source traceability, deliberate adaptations and new-default consumer proof remain required                                           |
| Library qualification                    | The [completed plan](2026-10-19-v5-ga-qualification-plan.md) records prior source qualification. Current [PR218](https://github.com/uzh-bf/design-system/pull/218) at `afcc2b912` failed browser installation before behavioral tests; later draft tips pass the full gates | Reconcile this lower-layer gate before landing. Six tooling advisories remained in the October 19 audit; refresh their current status before remediation and GA |
| Historical Klicker pilot                 | [Draft PR6652](https://github.com/uzh-bf/klicker-uzh/pull/6652) at `4f6e8c56e36b8ceeaa87ce859d2c736d7c9a71a4` delivers the dev-only Webpack routing repair and consumer acceptance; eight required checks pass, with 997 browser passes and five skips                       | Retained Formik and palette/focus overrides limit this proof. It does not establish RHF parity, full new-default adoption or current-trunk acceptance |
| Promotion                                | Existing [draft PR179](https://github.com/uzh-bf/design-system/pull/179) owns v5-to-main promotion and remains unreconciled                                                                                                                                                  | Qualify the integrated candidate after feature completion; readiness, merge and publication require named authority                                   |

The accepted unpublished candidate was produced from
`0126b42e07da1fd52cbc1c1708f9e2dc9e902077`: file
`uzh-bf-design-system-5.0.0-alpha.5.tgz`, SHA-256
`f4208e6faebade6d775e663e43cebac8f7e27d46b70ab464a9ce2e3a99ec49a9`.
The public registry alpha.5 is a different artifact, SHA-256
`5b6a3c1a5f7963997aedd32ac007eeb9d76b7041b4f49141383684ae0df5df04`.
The consumer delivery records separate installation/build and workflow evidence
for these artifacts. A shared version string does not make them interchangeable;
no candidate publication is implied.

The October 23 review found the retained pilot stopped with unavailable routes.
That is a current environment limitation, not a retraction of recorded passing
journeys. Its previous user retention/pinning ruling remains relevant; refresh
ownership and lifecycle evidence before resuming it. Do not restart or alter it
for this documentation reconciliation. The October24 exact-head commit status still has `final-ai-review` pending.
Keep that current review state distinct from historical passing source/browser
acceptance; its required-gate classification has not been established here.

### Binding v5 GA scope

The October 24 user ruling adopts [ADR0008](../docs/adr/0008-radix-compatible-shadcn-scope.md):
the supported official Radix-compatible shadcn catalog and compatible auxiliaries,
with documented backend exclusions. This narrows the October 23 blanket catalog
requirement. Backend-independent components remain eligible. Base UI/React Aria
implementations without an accepted official Radix route are excluded from
mandatory GA scope; excluded items remain inventoried and are not marked implemented.
Mixed examples retain their eligible requirements. Preserve existing consumer
contracts, Formik/RHF parity, `MultiSelect` and `RhfMultiSelect`; separately named
capabilities require an explicit decision rather than automatic retirement.

| Formik family retained through v5 | Qualified RHF counterpart | Evidence boundary |
| --- | --- | --- |
| Text | `RhfTextField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |
| Number | `RhfNumberField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |
| Select | `RhfSelectField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |
| Textarea | `RhfTextareaField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |
| Switch | `RhfSwitchField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |
| Color picker | `RhfColorPicker` | [Draft PR220](https://github.com/uzh-bf/design-system/pull/220); all-family behavioral/type/packed proof |
| Date picker | `RhfDatePicker` | [Draft PR220](https://github.com/uzh-bf/design-system/pull/220); all-family behavioral/type/packed proof |
| Date/time picker | `RhfDatetimePicker` | [Draft PR220](https://github.com/uzh-bf/design-system/pull/220); all-family behavioral/type/packed proof |
| Numeric PIN | `RhfPinField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |
| Alphanumeric PIN | `RhfAlphaNumericPinField` | [Draft PR219](https://github.com/uzh-bf/design-system/pull/219); all-family behavioral/type/packed proof |

`RhfMultiSelect` is an additional existing RHF control, not a fourth covered
Formik family. Retain and qualify it. Parity covers typed paths/values and
transformed output; defaults, empty values, `reset`, `resetField`, `setValue`
and same-value resets; touched/dirty and validation timing; server errors;
disabled/required state; labels/descriptions/errors; refs and focus-on-error.
It means equivalent user capabilities and documented API routes, not identical
Formik-specific props or a second competing state model. Keep standalone
controlled use available through the appropriate existing controls.

The accepted October 23 interview rulings are recorded in
[ADR0006](../docs/adr/0006-rhf-error-presentation-and-validation-ownership.md):
all RHF adapters default to inline errors, with tooltip opt-in, and show errors
already produced by RHF without an extra touched/submitted gate. This deliberately
changes the four existing adapters as well as the seven new ones. Respect caller
suppression and preserve Formik presentation and validation behavior.

Preserve [ADR0002](../docs/adr/0002-rhf-subpath-rsc-contract.md): RHF adapters and
its retained Form API live in the optional `./react-hook-form` client entry;
root and `./primitives` remain free of RHF runtime/type edges. Reuse the existing
field hook, shell and controls. Keep the supported minimum/current RHF packed
fixtures, including explicit protection for reset behavior that currently uses
RHF's private state subscription. Formik stays supported throughout v5; its
exports, types and runtime dependency are removed only in v6.

The [current shadcn assessment](2026-09-06-v5-shadcn-assessment.md#full-radix-scope-and-release-review--2026-10-23)
owns the pinned source, missing inventory, auxiliary dependencies and coverage
rules. All official Radix capabilities must have a disposition and proof;
shared filenames alone close no rows. Include official recipes, hooks/utilities,
blocks and AI composition patterns in the compatibility inventory. The user's
[chart/block ownership clarification](2026-09-06-v5-shadcn-assessment.md#chart-and-block-ownership--user-clarification-2026-10-23)
keeps blocks application-owned and verifies compatibility with our public
components. Charts retain direct Recharts composition, with our theme, tooltip
and legend support. Upstream styles are visual references; our neutral/UZH themes
remain the delivery surfaces.

[ADR0007](../docs/adr/0007-application-owned-recharts-runtime.md) selects an
application-owned, required Recharts 3 peer, implemented by the chart package with
range `>=3.8.0 <4` and development version 3.10.1. It affects installation for
every consumer, including non-chart applications. Minimum/current packed runtime
identity is qualified; final integrated consumer acceptance remains separate.

The [current UZH review](2026-08-19-v5-uzh-alignment-roadmap.md#official-styleguide-review--2026-10-23)
owns the 2.11.0 delta, palette/type/focus/form traceability and adaptation rules.
Required upstream component variants and integrations belong before GA even when
additive. Earlier blanket 5.1 deferrals no longer exclude these accepted RHF or
Radix requirements. Unrelated additions retain their later horizon.

### RHF and consumer qualification — 2026-10-23

[Draft PR219](https://github.com/uzh-bf/design-system/pull/219) qualifies basic
fields at `cf9549b89a29660993ab312492ad640bba73d13d`.
[Draft PR220](https://github.com/uzh-bf/design-system/pull/220) qualifies pickers
at `fdf4bc6eeead63a1eb33a7821c71032e921f0312`.
[Basic CI](https://github.com/uzh-bf/design-system/actions/runs/39949970459)
and [final picker CI](https://github.com/uzh-bf/design-system/actions/runs/39970120724)
pass, including both RHF versions, accessibility inventory and visual checks.
Independent reviews and the 14:51 UTC quiet settle are complete. The bounded
CI follow-up was deactivated. Formik remains supported through v5.

[GBL draft PR224](https://github.com/uzh-bf/gbl-uzh/pull/224) at
`afeee07fea23165153704e0e213548f6d3808cb0` passes its current CI and the recorded
independent final review. It qualifies the selected synthetic RHF journey
against the exact unpublished RHF candidate. The consumer plan and draft body
own archive/installed-file proof and limitations; its task runtime is stopped.
The [DS plan](2026-10-23-v5-rhf-parity-plan.md#progress) owns the library proof.
These results qualify the recorded candidate, not the later integrated GA
candidate or registry contents. The user explicitly holds GBL and Klicker merges.

### Next implementation packages

The October 26 dependency/consumer review recommends this order. These packages
require their own bounded execution plans; this roadmap update changes no
dependency, lockfile, stack topology or consumer repository.

1. **Advisory and dependency contracts.** Disposition root and isolated fixture
   findings, unused Zod ownership, size-limit/browser paths, peer floors and
   deprecated tools. Name security fixes that conflict with the 14-day cutoff.
2. **Coordinated eligible dependency graph.** Enforce and verify
   `minimumReleaseAge: 20160` for direct/transitive selections in root and all 8
   isolated fixture locks. A coordinated pnpm11 migration is needed for strict
   frozen-lock validation; a root pnpm10 setting alone does not clear that gate.
   Preserve minimum
   RHF/Recharts cells and ADR0010's exact shared Panels contract. A current pin's
   maturity date does not authorize a downgrade or a blanket exception.
3. **Consumer peer reconciliation and exact archive acceptance.** Resolve chart,
   icon and required peer ownership before representative Klicker/GBL/Vet proof.
   Preserve the GBL/Klicker merge holds and historical candidate boundaries.
4. **Required support/toolchain migrations.** Evaluate unsupported ESLint and
   ReactFA, then coupled Vite/SWC/Ladle/declaration tooling. TypeScript 7 conflicts
   with the current mature parser peer range; unrelated legacy-package majors
   remain separate. See the review for Node/pnpm/CI pin coordination.
5. **Manual and promotion gates.** Complete AT/Safari/device and upstream menu
   disposition; reconcile lower CI and [promotion PR179](https://github.com/uzh-bf/design-system/pull/179) before separately authorized
   readiness, merge or publication.

#### Delivered catalog sequence — October24–25

The historical Klicker repair and RHF/GBL package are complete at their draft
boundaries. Do not repeat their unchanged acceptance or reopen those packages.
The approved [catalog planning package](2026-10-23-v5-catalog-compatibility-plan.md)
owns evidence reconciliation, the finite
[Radix capability matrix](2026-10-23-v5-radix-capability-matrix.md) and derived plans.

The first two implementation packages are complete at qualified draft delivery.
[Component draft #223](https://github.com/uzh-bf/design-system/pull/223) qualifies
at `30e0013151f24476f8308aef8dfd6a6affcb1a8e`; [chart draft #224](https://github.com/uzh-bf/design-system/pull/224)
qualifies at `43c54a557838528c87b0d2ffc53a8daa0b30f122` with [passing CI](https://github.com/uzh-bf/design-system/actions/runs/40075381528),
completed independent reviews and the final quiet settle. The [component plan](2026-10-23-v5-component-compatibility-plan.md#progress)
and [chart plan](2026-10-23-v5-recharts-compatibility-plan.md#progress) own their
proof. Recharts covers six plot families and tooltip composition, three
packed/Next version cells and 42 synthetic captures. ChartContainer measures
10.3–11.0 kB; the approved 8 kB positive minimum, 34 kB ceiling and dependency
markers all pass. These completed packages are not queued again.

The October 24 Opus 5.5 discussion, verified findings and subsequent Radix-only
user ruling set the next sequence:

[ADR0008](../docs/adr/0008-radix-compatible-shadcn-scope.md) settles the Combobox
scope disposition. Retain the [official Radix recipe and existing root contract](2026-10-24-v5-combobox-compatibility-plan.md);
exclude the newer Base UI compound implementation and parity-only variants.
No new Combobox engine or draft layer is required. The [static assessment](2026-10-24-v5-composition-compatibility-assessment.md)
retains all example/block/pattern identities, separating excluded portions from
eligible Shared API and chart obligations. Its source accounting is not type or
browser qualification. The delivered sequence and remaining external gates are:

1. **Shared APIs and Calendar.** Assign every concrete matrix delta, including
   menu item options, Item semantics/sizes, Pagination aliases and element types.
   Preserve legacy defaults while exposing compatible upstream routes. Thread
   locale through Calendar formatting/day rendering and prove existing picker,
   reset, keyboard and type contracts. Keep DayPicker 9 unless a verified gap
   requires a separately assessed migration. Disjoint source work may proceed
   after its plans settle; export integration has one owner.
   The approved [Shared API plan](2026-10-24-v5-shared-api-compatibility-plan.md)
   and [Calendar plan](2026-10-24-v5-calendar-compatibility-plan.md) define two
   Shared API draft layers followed by Calendar in a separate native stack above
   the chart branch. The user approved execution and this topology on October24;
   delivery remains qualified drafts without merging. Calendar retains exact DayPicker 9.14.0. The [quality closure plan](2026-10-25-v5-quality-closure-plan.md) owns its retained `yearRange` repair; the application-owned non-Gregorian recipe remains composition work. Locale qualification alone does not close either gate.
   Presentation/control draft [#225](https://github.com/uzh-bf/design-system/pull/225)
   qualifies at `2d8b02a6f`; overlay/menu draft [#226](https://github.com/uzh-bf/design-system/pull/226) qualifies at `4d5f60fc6` with configured final review, complete hosted CI, exact artifact proof and 42 published captures. Calendar draft [#228](https://github.com/uzh-bf/design-system/pull/228) implements locale/grid compatibility with local behavioral, packed and source-review proof. Implementation and local proof are complete, including the supplied-locale Gregorian correction and retained enUS datetime default. Final qualification evidence is recorded in the draft description. An extra open-menu audit reproduces an existing Ladle-root `aria-hidden-focus` result on the lower exact package; keep it in GA accessibility follow-up.
2. **Layout and toast auxiliaries.** The user approved the [three-layer execution plan](2026-10-24-v5-layout-toast-compatibility-plan.md).
   The subsequent [native Resizable migration](2026-10-25-v5-resizable-native-v4-plan.md)
   supersedes ADR0009: use canonical Panels4.14.8 throughout breaking v5, with one
   shared root/primitive contract and explicit migration guidance (ADR0010). Earlier Panels
   draft [#229](https://github.com/uzh-bf/design-system/pull/229) qualifies at
   `88b397d4d` with exact package proof, independent reviews, captures and hosted CI.
   Sonner draft [#230](https://github.com/uzh-bf/design-system/pull/230) qualifies at
   `1a2db9391` with caller-option merging, modes and shared-store proof.
   Sidebar draft [#232](https://github.com/uzh-bf/design-system/pull/232) qualifies
   at `be62259b0` for mobile direction, caller props and focus. Keep all three drafts
   independently qualified and unmerged; serialize manifest/lock changes.
   Unified Resizable [draft #233](https://github.com/uzh-bf/design-system/pull/233)
   implements ADR0010 with local browser/accessibility, exact package and independent
   risk-review proof. Its draft description records final review/CI qualification;
   earlier dual-engine evidence applies only to the earlier candidate.
3. **Messaging/clarification and code/highlighting.** Messaging and Questionnaire
   qualify in the held chat and Questionnaire drafts above. The CodeBlock
   package qualified in [draft #236](https://github.com/uzh-bf/design-system/pull/236) at `f654685e6`, under its [approved plan](2026-10-25-v5-code-highlighting-plan.md).
   Use separate bounded
   packages for the required presentation/scroll/questionnaire surfaces and
   code/highlighting. Their distinct @shadcn/react and Shiki runtime, scrolling,
   copy, SSR/hydration and asset-loading risks need separate acceptance. Prove
   reduced motion, CSS headroom and dependency isolation for unrelated imports;
   keep highlighting lazy. Application blocks and AI transports/state remain
   application-owned.
4. **Composition and integrated GA qualification.** After static disposition,
   verify representative packed dashboard/sidebar/auth and AI compositions.
   Refresh official-source drift, tooling advisories and package/peer metadata
   once at final qualification. Accept one integrated exact candidate, with
   archive and installed-file proof, in representative consumers under their
   own plans. Complete screen-reader, Safari and device evidence, then reconcile
   [promotion PR179](https://github.com/uzh-bf/design-system/pull/179), whose
   current conflicts and older failed checks remain a separate gate.

Each matrix row needs implemented equivalence with proof, an accepted retained
recipe, a scheduled eligible gap with an owner, or an explicit ADR0008 exclusion.
Exclusions are closed scope dispositions, not implementation or parity passes.
Existing rulings remain authoritative; only material unresolved departures need a new decision.
Both current RHF error-presentation paragraphs agree with ADR0006's accepted
behavior; the earlier timing-paragraph correction instruction is superseded.
Distinguish the pinned DayPicker registry install tag from its workspace baseline.
Existing compact Button bounds/spacing and bar contrast checks already pass;
reuse those results instead of adding duplicate tests. Manual and genuinely
different composition evidence remain separate obligations.

This update authorizes no new implementation or topology. Derived execution
plans retain their bounded approval requirement. Lower-layer CI reconciliation,
consumer writes, readiness, merges, publication, deployment and promotion remain
separately gated; neither a green top tip nor this discussion clears them.

### Acceptance and verification ownership

The implementing package owner records the frozen source, dependency versions,
public API/intentional adaptation, test obligation and evidence for each affected
row. Extend existing behavior/type/packed/browser seams for consequential missing
contracts; add no tests that merely pin documentation or sample content. The
integrated owner verifies all rows remain valid together, including root/RHF RSC
isolation and optional-package tree shaking/budgets. Browser checks cover actual
interaction, keyboard/RTL behavior, responsive states, both themes and relevant
locales. Use real synthetic captures for changed UI; keep manual evidence pending
until performed. No runtime is needed to verify this documentation-only update.

## Completed package — Klicker pilot routing and exact-package acceptance

The October 19 priority ruling was followed by a consumer-owned execution plan
and [draft PR6652](https://github.com/uzh-bf/klicker-uzh/pull/6652). The completed
historical pilot preserves authentication semantics, Formik and application
layout while qualifying the exact artifacts described above. The former
instruction to derive that pilot plan and repair its routing is superseded.
Future current-trunk migration, full UZH-default adoption and RHF acceptance are
new evidence boundaries, covered by the next implementation packages.

## Historical milestone state — 2026-08-10

| Milestone                           | Status                                 | Evidence and next gate                                                                                                                                                                                               |
| ----------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v5 engineering through RHF wrappers | Complete                               | PRs #180-#194 are in remote `v5` at `1de22ddc`; alpha.3 contains the four RHF wrappers.                                                                                                                              |
| Alpha.3 publication                 | Complete                               | npm `alpha` resolves to `5.0.0-alpha.3`; `latest` remains `4.1.6`; Trusted Publisher replay run `31364726904` passed.                                                                                                |
| VetSim consumer pilot               | Complete and merged                    | VetSim PR [#18](https://github.com/rschlaefli/vet-platform/pull/18) and hover correction [#19](https://github.com/rschlaefli/vet-platform/pull/19) merged.                                                           |
| GBL demo-game pilot                 | Implementation complete; delivery held | Clean local branch `rs/v5-alpha-pilot` at `9f8c76b`, five commits ahead of `origin/dev`; final verification and review passed.                                                                                       |
| Trusted Publisher PR                | P0 source complete; live CI gate       | PR [#195](https://github.com/uzh-bf/design-system/pull/195) is draft; replay proof is green; action pins, complete prerequisites, dispatch removal, read-only permissions, and required source reviews are complete. |
| Package size gate                   | Not started                            | Size Limit dependencies exist, but no script, configuration, threshold, or CI gate exists.                                                                                                                           |
| Accessibility retirement            | Ratchet active; inventory uncertain    | The allowlist header says 190 serious/critical rule-cases, while its itemized reason counts sum to 159. Re-measure before claiming either count.                                                                     |
| Deterministic VRT                   | Not started                            | Playwright and self-hosted fonts exist; no `tests/visual` suite or committed baseline exists.                                                                                                                        |
| Consumer contracts                  | Decision required                      | VetSim exposed a root-barrel RSC incompatibility and theme-token ownership/cascade friction.                                                                                                                         |
| Brand override and Klicker          | Not started                            | D8 gives a direction, but the complete approved ramp, ownership, profile, and consumer migration do not exist.                                                                                                       |
| GA promotion                        | Held                                   | PR #179 is draft and spans 170 commits and 275 files; its current checks are not fresh GA evidence.                                                                                                                  |

## Historical dependency sequence — 2026-08-10

The graph below records the original foundation plan. Completed foundations are
not queued again; the current execution index and UZH Phase 2 sequence control
the next work. In particular, ADR 0003/0004 supersede P7's original ownership
question and its proposed DS-owned branded profile.

```mermaid
flowchart TD
  P0["P0: close Trusted Publisher PR"]
  P1["P1: enforce package size budget"]
  P2["P2: rule RSC export contract"]
  P3["P3: rule theme extension contract"]
  P4["P4: pin exact accessibility inventory"]
  P5["P5: establish deterministic VRT"]
  P6["P6: retire serious and critical a11y debt"]
  P7["P7: implement brand override profile"]
  R["Explicit candidate alpha publication"]
  P8["P8: migrate Klicker"]
  P9["P9: reconcile remaining consumers"]
  P10["P10: promote v5 GA"]

  P0 --> P1
  P0 --> P2
  P0 --> P3
  P2 --> P4
  P3 --> P4
  P4 --> P5 --> P6
  P3 --> P7
  P5 --> P7
  P1 --> R
  P2 --> R
  P6 --> R
  P7 --> R --> P8 --> P9 --> P10
```

In that original sequence, P1, P2 and P3 could be planned independently after P0,
each in a separate PR. P4 established the accessibility denominator before
repair work; P5 protected later visual fixes. P7 depended on the theme contract
and visual foundation, ahead of a separately authorized candidate for Klicker.
The current P7 acceptance below follows the later ownership ADRs.

## Historical foundation test portfolio

| Consequential risk                                                   | Existing protection                             | Test obligation                                     | Primary seam                                      | Distinct failure caught                                           | Owner |
| -------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- | ----- |
| Privileged release code changes under a mutable tag                  | Successful alpha.3 replay and tag/version guard | Extend existing CI evidence; no new test file       | Workflow action refs and job graph                | Upstream tag retarget or publish despite lint/format failure      | P0    |
| Generic import regresses into heavy dependency graph                 | W3 esbuild/Vite packed-consumer measurements    | Add a hard built-package budget                     | Named root/primitives consumer bundles            | Button import silently absorbs date/chart/carousel code           | P1    |
| Root composite import fails in a Server Component                    | VetSim client wrapper workaround                | Add packed Next App Router integration              | `react-server` resolution of root and RHF entry   | Root resolves client-only RHF symbols                             | P2    |
| Theme or app variables override each other unpredictably             | VetSim aliases and current Ladle themes         | Extend computed-token and consumer fixture coverage | Document-root theme plus app-prefixed variables   | UZH primary/destructive tokens resolve neutral or unreadable      | P3    |
| Accessibility debt count is stale or fail-open                       | Four-shard axe ratchet and harness canary       | Replace broad prose count with exact inventory      | `(rule, story, theme)` report                     | Empty scan or regex waiver absorbs new debt                       | P4    |
| Visual output changes without review                                 | Manual historical screenshots only              | Add deterministic snapshot seam                     | Digest-pinned Playwright container                | Theme/component appearance changes with no diff artifact          | P5    |
| Known serious/critical accessibility defects ship into GA            | Current allowlist                               | Remove every waiver with its owning fix             | Axe plus focused keyboard/label/browser contracts | Known inaccessible semantics survive GA                           | P6    |
| Brand profile applies only one color and breaks focus/sidebar states | D8 direction and VetSim experience              | Extend theme contract and VRT                       | Complete approved profile                         | Primary ramp, ring, sidebar, or contrast diverges                 | P7    |
| Real consumer cannot install/build/run candidate                     | VetSim and GBL proof                            | Extend application-native journeys                  | Klicker package/build/browser boundaries          | Package contract works in fixtures but fails in the main consumer | P8    |
| Older consumers hide a critical compatibility break                  | Historical source audits                        | Extend each consumer's existing build/browser seam  | Per-repository packed-candidate probe             | Unknown critical break remains at GA                              | P9    |
| Promotion uses stale checks or wrong package metadata                | Alpha release guard and registry readback       | Rerun established portfolio; no promotion-only test | PR #179, tag/version mapping, registry dry run    | Wrong commit/version/dist-tag is promoted                         | P10   |

## Foundation work-package reference

These entries retain the original implementation rationale. Consult the current
index before selecting work; completed source and gates supersede their future
tense. P7 below is updated to the accepted ownership contract and remaining
consumer qualification.

### P0 — Close PR #195 safely

- Problem: The publish job has OIDC and package-write permission while using
  mutable action tags, and publication does not wait for lint or formatting.
- Evidence: `.github/workflows/main.yml` grants `id-token: write` and
  `packages: write` to `publish`; `build` currently needs only TypeScript,
  tests, and a11y; live PR review identified the mutable references.
- Decision: Preserve the already-proven v4 behavior and pin only actions inside
  the privileged `publish` job to the exact commits currently selected by
  their upstream v4 tags:
  - `actions/checkout@11d5960a326750d5838078e36cf38b85af677262`
    (`v4.4.0`)
  - `actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020`
    (`v4.4.0`)
  - `pnpm/action-setup@b906affcce14559ad1aafd4ab0e942779e9f58b1`
    (`v4.3.0`, the commit currently selected by `v4`)
  - both `JS-DevTools/npm-publish` uses at
    `0fd2f4369c5d6bcfcde6091a7c527d810b9b5c3f` (`v4.1.5`)
- Decision: Make `build` depend on `lint` and `check-format` as well as
  `check-ts`, `test`, and `a11y`. The publish job continues to depend only on
  `build`, so that job becomes the complete release prerequisite gate.
- Decision: Remove the one-time alpha.3 `workflow_dispatch` path after its
  successful replay. Keep normal version-tag pushes as the only publication
  trigger. Set workflow-level permissions to `contents: read`; let only the
  publish job add OIDC and package-write permissions.
- Risk: Pinning an annotated tag object instead of its peeled commit; changing
  unrelated CI jobs; implying that plan or PR completion authorizes merge.
- Do:
  1. Pin the four privileged-job actions with version comments.
  2. Add lint and formatting to the build prerequisite list.
  3. Remove the one-time manual replay input and branch-dispatch publish path.
  4. Set the workflow-wide read-only permission baseline.
  5. Add this roadmap and close PR #195's execution plan with current GBL and
     registry evidence.
  6. Run required security, maintainability, and integrated final reviews on
     the exact final range.
  7. Push the existing branch, update the draft PR body, and wait for CI.
- Check: YAML parse; full-SHA/action-comment inspection; `git diff --check`;
  no `NPM_TOKEN`; no `workflow_dispatch`; workflow-level `contents: read`;
  publish-only OIDC/package-write; all PR checks green. Do not replay alpha.3
  again because that immutable version is already published.
- Test obligation: Extend existing workflow/CI evidence; no new test file.
- Delivery boundary: Existing branch and draft PR only. Push/update is
  authorized. Merge, readiness, tag, publication, and deployment are held.
- Commit shape: metadata rename; roadmap commit; `ci(release): pin privileged
publish actions`; final progress/review commit.
- Stop: A resolved SHA does not match the documented release; GitHub checks a
  different ref; the fix changes release semantics; any secret value appears.

### P1 — Enforce package-size budgets

- Problem: W3 proved better bundle boundaries, but the installed Size Limit
  tooling is inert and cannot block a regression.
- Evidence: Root `package.json` installs `size-limit` and its big-library
  preset; no repository script or configuration consumes them.
- Decision: Gate public import seams, not generated module count or the total
  package tarball alone. Measure before choosing thresholds and use explicit
  headroom. Avoid execution-time metrics that vary by runner.
- Risk: A webpack-oriented measurement protects a different contract from the
  earlier Vite/esbuild probe; thresholds are copied from historical values;
  heavy positive controls are accidentally optimized away.
- Do: Add the package-level plan, measure root `Button`, primitives `Button`,
  CSS/preflight, and representative Calendar/Chart/Carousel positive controls;
  add configuration and a root script; run it after the package build; wire it
  into CI before publication.
- Check: Current baseline passes; a temporary lower threshold in `/private/tmp`
  fails; generic imports show no date/chart/carousel contribution; positive
  controls retain their intended dependency; packed exports still resolve.
- Test obligation: Add a new built-package budget contract.
- Delivery boundary: One full-path DS PR from current `origin/v5`; no tag or
  publication.
- Commit shape: plan; `build(size): enforce v5 package budgets`; CI wiring;
  final progress/review.
- Stop: No reproducible baseline, undeclared runtime import, package export
  drift, or threshold selected before evidence.

### P2 — Rule and implement the React Server Components contract

- Problem: The root barrel re-exports `Form` and RHF wrappers, so a Server
  Component import can reach React Hook Form's reduced `react-server` export.
  VetSim needed a client wrapper even when importing an unrelated root control.
- Evidence: VetSim PR #18 documents the workaround; root `src/index.ts` exports
  `Form` and `Rhf*`; ADR 0001 deliberately made RHF a required root peer.
- Recommendation: Keep the root server-importable and move RHF integration to
  a dedicated `./react-hook-form` client entry. This supersedes ADR 0001 and is
  a pre-GA breaking change, not a compatibility alias.
- Required ruling: Approve the dedicated subpath, or explicitly accept that
  the v5 root is client-only and every Server Component consumer needs a client
  wrapper. No implementation begins before this decision.
- Risk: Incomplete removal of runtime RHF edges; declarations still pull the
  wrong condition; a type-only fixture misses the real `react-server` resolver;
  consumers migrate to another temporary path.
- Do after ruling: Write/supersede the ADR; add the entry source, build input,
  exports and declarations; move RHF integration exports; update migration
  docs and consumer examples.
- Check: Pack the artifact; build a minimal Next App Router fixture whose
  Server Component imports a non-form root composite and whose client leaf
  imports `./react-hook-form`; verify root runtime/declarations do not resolve
  RHF's client-only symbols.
- Test obligation: Add packed Next/RSC integration; extend existing RHF type
  contracts at the new path.
- Delivery boundary: One full-path DS PR with one intermediate public-contract
  review; candidate alpha publication is separate.
- Commit shape: ADR and plan; export/build split; fixture/docs; final evidence.
- Stop: No user ruling, unplanned compatibility shim, unresolved RSC failure,
  or conflict with an accepted ADR.

### P3 — Rule the theme cascade and extension contract

- Problem: VetSim had to alias generic variables because DS/shadcn tokens and
  application semantic variables shared names and import-order ownership was
  unclear. The proof does not yet distinguish an actual UZH cascade bug from a
  consumer namespace collision.
- Evidence: VetSim PR #18 records aliases for `--primary`, `--accent`, and
  `--destructive`; v5 declares generic shadcn bridge variables and
  `[data-theme='uzh']` mappings.
- Decision: Reproduce before changing CSS. DS owns its documented generic
  shadcn bridge tokens. Applications use an app prefix for their own semantic
  variables. If the minimal fixture proves UZH tokens are neutralized by DS
  source order, fix that cascade in DS rather than documenting an app override.
- Risk: Renaming the whole shadcn token namespace creates unnecessary churn;
  documentation hides a real source-order defect; scoped themes and portals are
  conflated with document-root behavior.
- Do: Build a packed-artifact fixture for neutral and UZH document-root themes;
  record computed variables before/after consumer CSS; rule ownership and
  import order; fix only the reproduced DS defect; document the extension
  contract and app-prefix requirement.
- Check: Computed-token assertions; representative Button/Badge/focus/sidebar
  rendering; neutral and UZH Ladle/browser proof; packed CSS import-order test.
- Test obligation: Extend theme contract tests; add one packed consumer
  cascade fixture only if it catches the reproduced failure.
- Delivery boundary: One DS contract PR; no brand profile yet.
- Commit shape: plan/evidence; minimal CSS or docs contract; fixture; final
  review.
- Stop: Reproduction does not isolate ownership, fix breaks neutral/UZH, or
  profile-specific design is needed.

### P4 — Pin the exact accessibility inventory

- Problem: The blocking ratchet works, but its header claims 190 waived
  serious/critical rule-cases while the itemized reason counts sum to 159.
- Evidence: `packages/design-system/tests/a11y/stories.spec.ts` contains both
  statements; the last complete historical run reported 190.
- Decision: Treat both counts as untrusted until a fresh run emits a complete
  `(rule, story, theme)` inventory. Replace regex-only count prose with an exact
  generated/checked inventory that fails on unexplained drift.
- Risk: Empty-page or incomplete-story output looks green; story-fixture debt
  is mixed with component debt; a broad waiver absorbs new stories.
- Do: Run all four shards against built Ladle; reconcile output to stories and
  themes; persist exact cases in the narrowest maintainable form; retain the
  harness canary; classify fixture versus component ownership.
- Check: Two matching complete runs; expected story/theme cardinality;
  canary proves the scan mounted content; changing one expected case makes the
  inventory check fail.
- Test obligation: Replace/consolidate the broad baseline representation;
  preserve the existing gate.
- Delivery boundary: One test-only full-path PR; no bulk component fixes.
- Commit shape: plan; `test(a11y): pin exact serious-critical baseline`; final
  evidence.
- Stop: Count drift is unexplained, output is empty/partial, or CI and local
  runners enumerate different stories.

### P5 — Establish deterministic visual regression testing

- Problem: Neither theme has automated visual protection.
- Evidence: Playwright and self-hosted fonts exist; the 2026-06-15 VRT plan is
  unimplemented; no `tests/visual` or `toHaveScreenshot` usage exists.
- Decision: Use Playwright native snapshots in a digest-pinned Playwright
  container matching the repository version. Start with report-only CI and
  make it blocking only after repeated zero-diff evidence.
- Risk: Host-generated baselines, dynamic time/animation, binary growth, loose
  thresholds hiding real change, or automatic baseline updates.
- Do: Resolve and record the container digest; add a two-theme Button canary;
  run it twice with zero diff; add the curated 15-component desktop set;
  freeze time and motion; review PNGs; upload actual/diff artifacts in CI.
- Check: Every baseline is generated and compared in the same container
  digest; two local container runs and two CI runs are clean; manual review
  confirms each image covers a meaningful state.
- Test obligation: Add a new stable visual seam.
- Delivery boundary: Foundation/report-only PR, followed by a small separate
  CI PR that makes the proven suite blocking.
- Commit shape: plan/determinism; canary; curated baselines; report-only CI;
  later `ci(vrt): make deterministic visual checks blocking`.
- Stop: Baselines originate on the host, unresolved flake, unexplained pixel
  drift, or CI uses a different image.

### P6 — Retire serious and critical accessibility debt

- Problem: The ratchet blocks new debt but permits every known exact case from
  P4. GA should not ship known serious/critical waivers.
- Evidence: P4's exact inventory, focused keyboard/label contracts, and current
  CI provide the trustworthy denominator.
- Decision: Zero waived serious/critical cases is the recommended GA gate.
  Moderate/minor findings remain visible but do not block GA unless a package
  plan elevates them.
- Risk: Removing a waiver without fixing semantics; large omnibus diffs;
  inaccessible story fixtures mistaken for component code; visual fixes land
  without VRT.
- Do: Sequence risk-cohesive PRs for names/labels, ARIA ownership/nesting,
  focusable scrolling, and contrast. Delete each inventory entry in the same
  PR as its fix. Use P5 to protect visual changes.
- Check: Full four-shard run; focused keyboard/label tests; browser interaction
  for changed widgets; VRT for visual changes; exact inventory reaches zero.
- Test obligation: Extend existing stable seams only for the distinct fixed
  behavior; delete baseline cases as protection replaces them.
- Delivery boundary: Several cohesive DS PRs, not one 159/190-case package.
- Commit shape: one plan and behavior-focused commits per PR.
- Stop: A fix needs an unresolved product/design ruling, baseline increases, or
  the harness does not prove the changed state.

### P7 — Brand extension delivered; consumer qualification retained

- Status: ADR 0003 settles consumer ownership of a complete design-approved
  primary ramp. ADR 0004 settles document-root application. DS owns the generic
  extension contract and derived bridges; it does not export a Klicker brand
  profile. The earlier ownership ruling and proposed DS profile are superseded.
- Evidence: `ThemeExtensionContract.stories.tsx` and packed computed-token/browser
  checks cover neutral, UZH and a synthetic full-ramp override. Synthetic values
  demonstrate mechanics; they are not approved consumer branding.
- Remaining acceptance: For a candidate using a consumer override, record its
  exact source ref and approved full ramp, then verify intended text/fill
  contrast, primary/focus/sidebar bridges, keyboard focus and packed stylesheet
  order. Base UZH GA does not depend on creating a separately branded DS export.
- Scope: Actual brand values and their approval stay with the consumer. Extend
  existing contract/VRT seams only for gaps exposed by the candidate; preserve
  default neutral/UZH behaviour and requalify bridges changed by Phase 2.
- Stop: The consumer candidate requires an unapproved or incomplete ramp, or
  its tested token graph or contrast fails. That blocks the affected consumer
  acceptance branch rather than reopening the settled generic ownership model.

### P8 — Migrate Klicker as the GA acceptance consumer

- Problem: Klicker remains on v4 and uses removed source scans, font variables,
  and `Shadcn*` names across several apps/packages.
- Evidence: Historical consumer audits and the current v5 roadmap identify
  Klicker as the real GA acceptance boundary; VetSim and GBL prove narrower
  application shapes.
- Decision: Start from a clean repo-local worktree and a separately authorized
  registry candidate containing P1-P7. Decide stack topology from the current
  repository before implementation; do not work in a dirty primary checkout.
- Risk: Multi-app blast radius, Formik/RHF scope creep, React duplication,
  package import collisions, or branding drift.
- Do: Inventory all DS manifests/imports; update package versions coherently;
  import compiled CSS; remove source scans/font injection; select UZH plus any
  approved consumer-owned primary ramp; move raw primitives to `/primitives`; use the ruled RHF
  entry only where needed; preserve application-specific components.
- Check: Frozen install; repository-native checks; relevant production builds;
  one React runtime; representative manage/PWA/control/auth/chat/docs browser
  journeys; screenshots in relevant locales and viewports.
- Test obligation: Extend existing application journeys at stable boundaries;
  avoid duplicating DS component tests.
- Delivery boundary: One milestone-level Klicker PR unless approved stack
  analysis proves independently functional packages. Push, PR, merge, release,
  and deployment remain separate.
- Commit shape: package/CSS foundation; import/forms migration; browser/docs
  evidence.
- Stop: Candidate artifact unavailable, dirty-state collision, duplicate React,
  or package grows beyond an independently reviewable milestone.

### P9 — Reconcile remaining consumers

- Problem: Thesis Platform, Careers, Elearning, and the GBL website remain on
  older contracts, and the completed GBL demo-game branch is not delivered.
- Decision: Full migration of every app is not a GA blocker. GA requires a
  fresh matrix showing versions, React/Tailwind/runtime constraints, packed
  candidate compile/build result, and no unknown critical break.
- Do: Inventory each live consumer; run a packed-artifact probe; create one
  consumer-owned plan/PR per repository when migration is chosen. Treat the
  React 18/Tailwind 3 GBL website as a separate multi-hop migration.
- Check: Native install/build; one React runtime; compiled CSS and theme root;
  representative browser proof for migrated apps.
- Test obligation: Extend each consumer's existing integration/browser seam.
- Delivery boundary: No cross-repository stack. GBL branch push, GBL draft PR,
  GBL merge, and GBL deployment are four distinct decisions.
- Commit shape: one coherent migration package per consumer.
- Stop: Unknown consumer ownership, incompatible runtime without a migration
  decision, or external action without authority.

### P10 — Promote v5 to GA

- Problem: PR #179 is too broad and stale for its current checks and description
  to serve as final release evidence.
- Decision: Reuse PR #179 after all GA packages land in `v5`; do not replace it
  or add feature work at the promotion boundary.
- Do: Refresh its description and substantive size; rerun package, size,
  accessibility, VRT, consumer, security, maintainability, and final-outcome
  gates; generate release notes; verify package version/tag mapping; prepare a
  registry dry run.
- Check: PR #179 is clean and freshly green; serious/critical inventory is
  zero; VRT and size are blocking; Klicker proof passes; consumer matrix has no
  unknown critical break; no unresolved critical review finding; tag/version
  guard matches the intended `5.0.0` commit.
- Test obligation: No new test solely for promotion; rerun the complete
  established portfolio.
- Delivery boundary: Merge `v5 -> main`, local tag creation, remote tag push
  and publication, `latest` readback, and any deployment are separate gates.
- Commit shape: release metadata and roadmap progress only.
- Stop: Stale check, unresolved review, version mismatch, missing candidate
  evidence, or absent publication authority.

## Candidate alpha checkpoints

- No new alpha is required to close P0.
- After P1-P7, request explicit authority for one candidate alpha containing
  the final package contracts used by Klicker.
- A release request must name the version/tag, confirm that pushing it triggers
  public npm and GitHub Packages publication, and require registry readback of
  version, `alpha` dist-tag, tarball, integrity, provenance, exports, and
  declarations.
- A failed publication never permits moving an existing tag or substituting a
  local tarball in a committed consumer lockfile.

## Historical authority gates — 2026-08-10

This table records P0 and the original consumer delivery boundaries. Current
implementation authority and remaining gates live in the
[theme/defaults execution plan](2026-10-18-v5-theme-defaults-plan.md). Ordinary
commits, non-force task pushes and draft delivery follow the approved package;
readiness conversion, target merges, publication and deployment remain gated.

| Action                                    | Authority required                                              |
| ----------------------------------------- | --------------------------------------------------------------- |
| Push/update PR #195                       | Authorized for P0                                               |
| Mark PR #195 ready                        | Explicit readiness authorization                                |
| Merge PR #195 or any later DS PR          | Explicit DS merge authorization per PR                          |
| Push GBL branch                           | Explicit GBL push authorization                                 |
| Open GBL PR                               | Explicit GBL PR authorization                                   |
| Merge GBL PR                              | Explicit GBL merge authorization                                |
| Create a release tag locally              | Explicit tag authorization                                      |
| Push a release tag and publish            | Explicit authorization naming the tag and both registries       |
| Publish a candidate alpha                 | Explicit alpha publication authorization plus registry readback |
| Merge PR #179                             | Explicit `v5 -> main` merge authorization                       |
| Publish `5.0.0` to `latest`               | Explicit GA/latest authorization                                |
| Deploy any consumer or documentation site | Explicit deployment authorization                               |

## Historical directly delegable tasks — 2026-08-10

These foundation tasks are complete. The [current execution index](#current-execution-index--2026-10-23)
owns sequencing for RHF parity, full Radix coverage and integrated UZH/candidate
qualification. Future reviewed package plans own execution. The completed
[theme/defaults plan](2026-10-18-v5-theme-defaults-plan.md) remains historical evidence.

| Task                                   | Owner                                                                    | Paths                                             | Verification                                           | Stop condition                      |
| -------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------ | ----------------------------------- |
| Complete P0 final reviews and fresh CI | Main session because readiness and external PR state are owned centrally | Exact branch range and PR #195                    | Security, maintainability, integrated review, green CI | Any new release-boundary finding    |
| Close PR #195 plans and evidence       | Bounded executor after final facts are fixed, or main session            | Current PR plan and this roadmap                  | Links, formatting, data hygiene                        | Contradiction with live refs        |
| Prepare P1 execution plan and baseline | Executor for measurements; main session for thresholds                   | Root package/config and built package             | Reproducible Size Limit baseline                       | Threshold chosen before measurement |
| Draft P2 ADR options                   | Main session plus planning reviewer                                      | ADR, exports, Vite entries, packed fixture design | Next App Router reproduction                           | User has not ruled public API       |
| Reconstruct P4 inventory               | Executor after plan approval                                             | A11y suite and task-local reports                 | Exact two-run counts and canary                        | Fail-open or unexplained drift      |

## Global stop conditions

Stop the active package and report when:

- its remote base advances through files in scope and has not been reconciled;
- a package needs a public API, brand, product, or ownership ruling not yet made;
- a registry, packed artifact, consumer, accessibility, or visual check fails in
  a way the package cannot explain;
- duplicate React/RHF runtimes remain;
- a reviewer finds a security, data-integrity, accessibility, or public-contract
  issue outside the approved package;
- completing the work would require an unapproved push, PR, merge, tag,
  publication, deployment, secret access, or production action.

## Progress

- 2026-10-23: User expanded v5 GA to full Formik-to-RHF parity, retained Formik through v5, full official shadcn Radix coverage and auxiliaries, and current UZH alignment. Refreshed upstream release/source evidence, reconciled the completed Klicker draft pilot, and superseded blanket additive/major deferrals for required capabilities. This entry records requirements and planning; no feature implementation or release is claimed.

- 2026-08-10: Reconciled remote `v5`, PRs #179/#195, npm dist-tags, VetSim
  delivery, and the clean local GBL W3 branch.
- 2026-08-10: User approved PR #195 hardening and requested this detailed
  roadmap in `project/`.
- 2026-08-10: Configured planning-stage specialist returned
  `DONE_WITH_CONCERNS`. Accepted concerns: P2 requires an explicit RSC/API
  ruling; P7 requires approved brand ramp and ownership; P4 must re-measure the
  190-versus-159 accessibility discrepancy.
- 2026-08-10: PR #195 plan metadata, this roadmap, immutable privileged action
  pins, complete release prerequisites, workflow-wide read-only permissions,
  and removal of manual replay are committed. The security re-review passed;
  maintainability findings are closed; and the late planning recovery passed
  with its progress-only concerns integrated. The integrated final re-review
  passed with no findings. The remaining CI and delivery state is tracked live
  on draft PR #195. No merge, readiness, tag, publication, GBL delivery, or
  deployment is authorized by this roadmap.

- 2026-10-18: User approved working through the independently verified review
  findings. Reconciled the current index with remote v5, existing draft heads
  and the separate UZH branch. The correction status below records the completed
  source fixes, durable gates and historical packed-pilot acceptance.
- 2026-10-18: A two-round read-only Claude consultation challenged remaining
  sequencing against current source and ADRs. Updated the existing roadmaps to
  put family/alias coverage before palette/default changes, restore the missing
  badge-default item, distinguish rendered typography from additive exports,
  scope consumer override retirement and retire the superseded P7 ruling.

- 2026-10-19: Boundary review accepted the qualification package at reviewed draft delivery in [PR218](https://github.com/uzh-bf/design-system/pull/218), head `870879614`; its 18 successful checks and two expected publish/deploy skips close the package CI gate. Focused risk review and the corrected integrated review are accepted; no implementation was sent back. Actual consumer and manual acceptance remain GA gates.
- 2026-10-19: User ruled [Klicker pilot routing repair and exact-package acceptance](#completed-package--klicker-pilot-routing-and-exact-package-acceptance) next, before tooling remediation, with direction-only scope approval. The stale instruction to execute the completed qualification plan is retracted. The consumer owner derives its execution plan; the completed qualification plan and its Progress remain unchanged.

## Historical October 18 correction status

All eight actionable findings from the supplied review are corrected in the
unmerged draft stack, with passing source verification at `b8d607280`:

| Review finding | Disposition | Evidence or remaining gate |
| --------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Responsive consumer CSS collision | Scoped component defaults implemented in Phase 1 | Independently compiled CSS across both themes/four widths; explicit primitive utility overrides; real Klicker modal desktop/mobile checks and explicit header override pass |
| Calendar browsing changes selected date during time edits | Corrected in PR210 | Each time segment preserves selected calendar date after month browsing |
| Missing behavioral and consumer release gates | Corrected in PR213 | Contract job and frozen RHF 7.59.0/7.90.0 packed/Next jobs are prerequisites; injected failing contract fails the actual command |
| Modal arrows unreachable after keyboard opening | Corrected in PR210 | Natural trigger → Enter → arrow sequence; nested controls retain their keys |
| Empty twelve-hour picker discards PM | Corrected in PR210 | Pending period applies when hours, minutes or seconds are entered first; controlled reset/synchronization cases |
| Open selection remains mutable when disabled | Corrected in PR213 | Standalone and RHF close/mutation guards; named disabled Select absent from FormData; disabled-close blur follow-up reproduced and corrected in both themes |
| Highlight exposed as multiple selection | Corrected in PR213 | Independent highlight and selected values, multiselectable listbox, consistent dialog popup relation; keyboard/filter/external-update checks |
| FormField rejects transformed output | Corrected in PR213 | Public packed declaration fixture with inferred string input/number output at both supported RHF versions |

The compatible dependency layer retains the selected major lines and updates
only the supplied inherited transitive paths. This is bounded maintenance, not
a broad security assessment or evidence of zero remaining vulnerabilities.
The shadcn assessment covers selected components and capabilities; dependency
updates do not synchronize copied primitive source automatically. Remaining
majors and unused dependency ownership stay separate decisions.

Current packed-candidate acceptance passes in the historical Klicker pilot after
the approved temporary lifecycle/dependency exceptions. It does not replace
the refreshed multi-consumer qualification of the eventual release candidate.
The original consumer policy and tracked files are restored; no consumer source
change or delivery is included.

Phase 2 token/default work remains required before GA. Manual screen-reader,
Safari and physical-mobile qualification remain open. PR129's historical Formik
auto-submit remains conditional on a concrete consumer need; PR135's Stencil
package remains a separate initiative. No target merge, ready conversion,
release publication or deployment is part of this remediation goal.

### Calendar empty-error audit follow-up

An extra synthetic empty-error audit reproduces a pre-existing UZH contrast
failure on DatePicker and DateTimePicker placeholder text: `#666666` on
`#ffdbcc`,4.44:1 rather than4.5:1. The exact qualified lower archive shows the
same computed colours and axe result after transitions settle. The Calendar
locale package changes neither these controls nor their colour tokens. Track a
bounded picker/error-state contrast correction before GA; no waiver, suppression
or current-package accessibility pass is implied by the existing closed-story
checks. Manual qualification and exact integrated consumer acceptance stay open.


## October25 quality closure checkpoint

The [approved quality plan](2026-10-25-v5-quality-closure-plan.md) follows the qualified CodeBlock draft. Local source now restores DateTimePicker year navigation and fixes empty-invalid picker contrast using existing component foreground tokens. Focused calendar/form/menu tests, independent final review, exact package proof, captures and exact-head CI qualify [quality draft #237](https://github.com/uzh-bf/design-system/pull/237) at `059844953`.

The opened modal-menu `aria-hidden-focus` finding reproduces in a standalone DS page and unmodified Radix DropdownMenu/ContextMenu. DropdownMenu/ContextMenu Tab/Shift+Tab remains contained and Escape restores focus. Menubar has no hidden-focus finding, and Escape restores its trigger; its non-modal Tab behavior is not a containment claim. This establishes upstream provenance, not assistive-technology acceptance. Keep the finding as a GA upstream/manual gate without a waiver or modality change. Representative public-entry compositions follow this source package. Final qualification records runtime-pin drift; version changes need their own evaluated acceptance. Consumer/manual evidence and merge/release authority remain separate.


## October25 representative composition execution

The [quality draft #237](https://github.com/uzh-bf/design-system/pull/237) qualifies at `059844953`, including independent review, all required hosted checks, exact package proof and quiet feedback. The [composition plan](2026-10-25-v5-composition-qualification-plan.md) qualifies [draft #239](https://github.com/uzh-bf/design-system/pull/239) at `1eeeca318` for dashboard/sidebar/chart, RHF form, chat/code/questionnaire and native Persian recipe proof through public entry points. Its complete finite identity disposition remains in the composition assessment; representative evidence does not mean every upstream identity executed. Both source layers remain drafts. The October26 dependency/consumer checkpoint supersedes the raw latest-version advice below; manual and exact consumer acceptance remain separate.

### Integrated candidate drift and advisory refresh — October25

The [October26 review](2026-10-26-v5-dependency-compatibility-review.md) supersedes
this section's unfiltered latest-version recommendations and root-only advisory
scope. The source comparison and qualified composition evidence remain valid.

Opus next-step consultation confirmed the order: finish representative composition qualification, then retain one exact integrated candidate for source/package proof and report external gates. Composition checks now cover 765 contracts/smokes plus 24 strengthened keyboard/theme/viewport journeys, including linked errors, actual Questionnaire FormData, visible appended messages and the native Persian display/metadata distinction. Four Ladle stories raise the built inventory to 530. These representative journeys do not execute every original upstream identity; consumers own acceptance of their copied application assemblies.

Official shadcn source advanced 18 commits from pinned `3d98900e9b73c45f035f8109e9d41ba6a51685e7` to [481d5233](https://github.com/shadcn-ui/ui/commit/481d523374745e77d0cf9c53a4115ab5dd7c8481). The compared files are templates, registry-directory metadata, root manifest/lockfile and a template workflow. No pinned Radix component, example/block or native auxiliary source changed. Retain the source denominator. The [UZH production index](https://www.frontend.uzh.ch/prod/index.html) still lists 2.11.0; its CSS SHA-256 remains `48a5dc275818ff67e967d712b501b6659b00a48e1974c9c4a45ed5e85e7742f8`.

Registry refresh: @shadcn/react0.3.1, Recharts3.10.1, Sonner2.0.8, Shiki4.5.0 and Ladle5.1.1 match current latest tags. RHF current-cell7.90.0 trails7.91.0; minimum7.59.0 remains the declared compatibility boundary. Panels4.14.8 trails4.15.0. DayPicker9.14.0 trails10.0.2, Vite6.4.4 trails8.3.5 and TypeScript5.8.3 trails7.0.2. shadcn CLI latest is4.22.1; it is a generator, not an application runtime. This assessment changes no dependency or lockfile. The next evaluated dependency package owns the RHF/Panel minor choices and their compatibility evidence; unrelated majors stay separately evaluated.

The fresh full-lockfile audit reports nine unique advisories across ten package occurrences (five high, three moderate, two low occurrences), superseding the older six-advisory snapshot. They affect `extract-zip`, `basic-ftp`, `postcss-selector-parser`, `fast-uri` and `zod`. Most paths are size-limit browser/tooling dependencies; selector-parser is typography tooling. Zod3.25.76 is also a declared DS runtime dependency, so this is **not** a tooling-only finding. [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) marks versions below4.6.6 affected. Focused source search finds no Zod import in DS source; package removal or a major upgrade still needs a separately evaluated dependency contract and consumer proof. No risk acceptance or remediation is claimed here. The next bounded dependency plan must classify each actual path, prefer compatible fixes where available, and present any removal/major/advisory-acceptance ruling before dependent work. Advisory remediation remains a GA gate while composition draft qualification continues independently.

Remaining external gates: manual AT/Safari/physical devices, the documented native modal-menu warning, exact integrated candidate acceptance in representative consumers, lower-layer CI reconciliation and promotion PR179 conflicts. Keep all drafts unmerged; GBL/Klicker merge holds remain. Source/package success establishes none of those separate gates.

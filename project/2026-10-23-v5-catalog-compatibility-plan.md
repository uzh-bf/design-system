# v5 catalog compatibility planning package

## Approval and outcome

The user approved the Claude-backed next steps on 2026-10-23 and asked to
continue v5 while keeping GBL and Klicker unmerged. This package reconciles
completed evidence, inventories the pinned official Radix scope, and produces
reviewed execution plans for the first component and Recharts migrations.
It changes documentation only. The derived implementation plans require their
own bounded approval before source or dependency changes.

- Repository: `uzh-bf/design-system`; release target: `v5`.
- Worktree: `trees/rs-v5-uzh-alignment`; branch: `rs/v5-catalog-compatibility`.
- Base: `rs/v5-rhf-pickers`, `fdf4bc6eeead63a1eb33a7821c71032e921f0312`.
- Execution mode: standard; main model identity is not resolved by runtime metadata.
- Delivery: one documentation layer above draft PR220 in native stack221.
  Existing layers and published history remain intact. Ordinary commits, pushes
  and draft descriptions are covered by standing delivery authority.
- Terminal condition: source-backed inventory, reconciled current roadmap and
  two executable reviewed plans delivered in a draft PR with applicable checks.
- No merge, readiness conversion, publishing, deployment, consumer writes,
  runtime work, human notifications or provider/configuration changes.

## Contracts and finite scope

Use shadcn revision `3d98900e9b73c45f035f8109e9d41ba6a51685e7`, separately
from CLI 4.22.1. Inventory all 63 Radix UI sources, hooks/utilities, recipes,
official blocks and AI compositions. Shared filenames are evidence of location,
not compatibility. Each row needs its local public surface, concrete source
delta or unverified behavior, dependency owner, adaptation and next package.

The ignored cache is `project/_local/reviews/2026-10-23-upstream/pinned/`.
Its immutable source roots are `apps/v4/registry/bases/radix/` (including
`registry.ts`, `ui`, `hooks`, `lib`, `internal`, `components`, `blocks`, and
`examples`) and `apps/v4/content/docs/`. For AI patterns or shared utilities
outside those roots, read the same revision's tree/manifests and name the exact
paths in the matrix. No moving-main source silently extends the denominator.
Unavailable source is an open gap. Require zero unexplained omissions and
duplicate identities across UI, recipes, blocks and composition inventories.

Reuse ADR0002 (RHF/RSC), ADR0005 (UZH reference and application adaptations),
ADR0006 (error behavior) and ADR0007 (required application-owned Recharts 3 peer).
Retain Formik through v5. Keep application-owned blocks, direct Recharts
composition, both supported themes and legacy public APIs. Base UI inside the
official Combobox is auxiliary scope; a second complete backend is not.

## Work and ownership

1. Main session owns remote-state reconciliation, topology, evidence status,
   dependency ownership, integration and delivery. Verify DS219/220 and GBL224
   exact draft heads/checks; distinguish historical Klicker acceptance from its
   current review status. Correct only current status prose, preserving history.
2. One bounded local source worker compares shared component APIs against the
   pinned public cache. It returns a source-referenced inventory fragment;
   no network, writes to production source, Git operations or consumer access.
   A second disjoint worker owns missing UI and composition surfaces.
3. Main session assembles `2026-10-23-v5-radix-capability-matrix.md` and updates
   the existing shadcn assessment and GA/UZH roadmap current indexes. Record
   exact version proposals and library/application/development ownership.
4. Derive `2026-10-23-v5-component-compatibility-plan.md` for Button sizes,
   Tabs variants/orientation, NativeSelect and Direction/RTL; derive
   `2026-10-23-v5-recharts-compatibility-plan.md` for ADR0007. Each names paths,
   compatibility, dependency ranges, package topology, focused verification,
   consumer proof limits and terminal delivery. Keep Combobox and later
   auxiliary/messaging packages separate.
5. Native planner hardens this plan and the two derived plans before presenting
   them. Main session verifies findings. Final configured Claude review covers
   the complete committed documentation delta before draft qualification.

| Outcome                                 | Owner                       | Source set and dependency                                                | Acceptance                                                                     |
| --------------------------------------- | --------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Shared UI comparison                    | native executor Carson      | 52 shared `ui/*.tsx`, local entry files and manifest                     | One source-referenced row per identity, no parity overclaim                    |
| Missing UI and auxiliary enumeration    | native executor Hume        | 11 absent UI sources; pinned Radix non-UI manifests, blocks and examples | Complete IDs, direct dependencies and ownership; explicit unavailable evidence |
| Evidence reconciliation and full matrix | main                        | Worker fragments plus remaining pinned documentation/AI roots            | Zero unexplained omissions; dated exact-head status receipts                   |
| Derived plans and delivery              | main, challenged by planner | Matrix and accepted ADRs; follows inventory                              | Review resolves prerequisites; coherent draft documentation delivery           |

Tracked outputs are `project/2026-10-23-v5-radix-capability-matrix.md`,
`project/2026-10-23-v5-component-compatibility-plan.md`,
`project/2026-10-23-v5-recharts-compatibility-plan.md` and this package plan.
Status reconciliation updates `project/2026-09-06-v5-shadcn-assessment.md`,
`project/2026-08-10-v5-ga-readiness-roadmap.md`,
`project/2026-08-19-v5-uzh-alignment-roadmap.md`, the active RHF plan's current
progress and ADR0006's stale implementation status. Preserve historical scopes.

Derived topology is a proposal, granting no implementation-layer creation,
rearrangement or publication authority. Proposed dependency ranges are untested
until the implementation qualifies them. Each plan identifies material open
decisions, prerequisites and stop conditions; unresolved prerequisites prevent
an executable label. Status corrections cite dated exact-head source/check
evidence and distinguish acceptance from current review and draft delivery.

No same-scope native child or usable plan-hardening report exists at kickoff.
The previous Claude next-package consultation is reusable advice, not the
planner or final review. Docs-only work needs no implementation simplifier,
browser runtime, screenshot gallery or repeated package builds.

## Acceptance and verification

- Account for every pinned UI filename exactly once; also list every pinned
  block, hook, utility and AI pattern, with source links and ownership.
- Distinguish source comparison from browser, accessibility and packed proof.
  Reuse passing evidence only for its unchanged acceptance boundary.
- Check source-set coverage, relative links, Markdown/diff hygiene and the
  repository formatter where available without starting an application.
- Inspect every staged hunk for scope, secrets, personal or real-environment
  data. Use only synthetic verification results in shared artifacts.
- Required CI/review qualification applies to the new draft's exact head;
  no indefinite monitor, new automation or consumer runtime is needed.

Test obligation: none for this docs-only package. Inventory omission is checked
by enumerating the pinned roots and reconciling their IDs with matrix rows;
inaccurate status is checked against fresh host `gh pr view` and existing exact
candidate receipts; broken references are checked by resolving relative Markdown
links in the changed files. Run the installed pinned Prettier3.5.3 over changed
Markdown and `git diff --check`; no new prose/content-pinning tests. Record the
actual command and outcome in Progress. Derived plans own their consequential
behavior/type/browser/packed test portfolios; those tests are not run here.
Final review covers only `fdf4bc6eeead63a1eb33a7821c71032e921f0312..HEAD`,
accounting for all paths in that delta, excluding inherited implementation.

## Planning review

Native planner APPROVED this package and both derived plans after one focused
correction round per object. The changes fix inventory denominators/owners,
NativeSelect and Tabs compatibility, concrete test seams, peer identity proof,
Recharts endpoint cells and zero-value behavior. The optional opposing-provider
pass was unavailable; it does not replace the required native planner or final
review. Private review transcripts record findings and dispositions.

## Progress

- 2026-10-23: approved package in progress; initial planner findings dispositioned; native planner APPROVED round2.
- Fresh release target: `origin/v5=80d6f229cdf8aa57384246bba0386d730484eecb`;
  base is 101 ahead, zero behind v5. No target integration is needed for docs.
- Local stack221 branch order matches the remote. Its saved picker head is an
  ancestor of the actual published tip; this is head metadata drift, not a
  divergent topology. The native tool added the new top branch successfully.
- Substantive executable delta: zero; planned outputs are project artifacts and
  status documentation. Source coverage (63 UI,67 examples,30 blocks,70 chart
  recipes,21 AI patterns), relative paths and immutable source links pass.
  New-document Prettier3.5.3 and diff checks pass. Draft PR222 is published
  above PR220. CI40015271872 passes the initial documentation head46c615e6d;
  required complete Claude review remains unexecuted pending disclosure approval.
- Completion revalidation found two previously accepted chart-plan corrections
  absent from the actual Scope paragraphs. The follow-up makes zero/null and
  initialDimension behavior explicit and names the chart contract test; it also
  corrects Button's proposed 24px rung wording. No new implementation scope.
  Updated-head CI and the complete independent final review remain gates.

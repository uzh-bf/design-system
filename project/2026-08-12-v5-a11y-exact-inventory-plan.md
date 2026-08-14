# Plan — W2: exact serious/critical accessibility inventory

## Identity

- Package: `v5-a11y-exact-inventory`
- Target: `v5`
- Roadmap item: W2 — Pin the exact serious/critical accessibility inventory
- Delivery: one full-path test PR targeting `v5`; no component fixes
- Planned branch/worktree: `rs/v5-a11y-exact-inventory` / `trees/rs-v5-a11y-exact-inventory`
- Plan path: `project/2026-08-12-v5-a11y-exact-inventory-plan.md`
- Dependency: final W1 theme stories must be merged into `v5` before W2 execution; planning may proceed in parallel
- Base: refreshed remote `v5` at `d1825b450dc0b6899dece815811ab29bfc7524f1`, the W1 merge commit

## Delegation Map

| Workstream | Slices | Owner | Dependency or handoff | Acceptance boundary |
| --- | --- | --- | --- | --- |
| Exact inventory contract | S1 | `executor` | Starts from refreshed `v5`; main session owns baseline interpretation and the independent story-ID oracle | Fresh Ladle manifest, exact serious/critical `(rule, story, theme)` tuples, requested-theme assertion, duplicate rejection, and all three merged W1 story IDs present |
| Shard and repeatability guard | S2 | `executor` | Hands S1's exact representation to shard-local preflight and two-cycle comparison; main session owns CI topology | Every shard runs the preflight; two fresh four-shard normalized unions are byte-equivalent; missing, partial, duplicate, or changed tuples fail |
| Package closeout | S3 | `main` | Integrates S1/S2 and their reports; no remote publication authority implied | Fresh build, two complete four-shard cycles, package gates, final review, data-hygiene check, and draft PR evidence |

## Goal

Replace regex-family accessibility waivers with a measured, exact `(rule, story, theme)` baseline that fails on any unexpected serious/critical tuple, while proving that every current component story is rendered and scanned in both themes.

## Non-goals

- No component or story remediation in W2.
- No moderate/minor gate change; continue logging those findings.
- No W1 readiness, PR state, merge, release, publication, consumer delivery, or deployment action.
- No nested-theme or portal contract expansion.
- No edits to the separate `rs/v5-ga-remaining-roadmap` worktree from the W2 branch.

## Research

- `packages/design-system/tests/a11y/stories.spec.ts` currently uses regex-based `ALLOWLIST` entries, so additions inside an allowed story family can pass silently.
- `packages/design-system/tests/_support/ladle.ts` derives story IDs from the fresh-build `build/meta.json` and waits for rendered story content before axe, but the current selector does not assert the requested theme value.
- `.github/workflows/main.yml` runs the a11y sweep as a four-shard blocking job and makes `build` depend on all shards.
- Historical counts of 186 failing story/theme tests and 190 rule cases are stale until a fresh build; they are evidence only, not the new baseline.
- W1 PR #198 merged into `v5` as `d1825b4`. Its three theme-extension story IDs remain a hard execution precondition and must be confirmed in the fresh manifest and independent oracle.

## Test portfolio

- Exact baseline comparison: `replace/consolidate`; primary seam is the a11y test harness; catches an unexpected tuple, a removed tuple, or a changed theme/story association.
- Independent story-ID oracle: `add new`; primary seam is a committed expected component-story fixture; catches empty, partial, stale, unknown, duplicate, or missing W1 story enumeration.
- Rendered theme assertion: `extend existing`; `gotoStory` must prove the requested `neutral` or `uzh` wrapper state before axe runs.
- Rendered-content canary: `extend existing`; retain one deterministic known violation only until its owning debt is retired, then repoint to an independent rendered-content signal.
- Existing axe sweep and moderate/minor logging: `retain`; no duplicate per-component tests.
- Negative proof: `add new` only if the helpers cannot otherwise demonstrate tuple/cardinality failure without changing production behavior; use a temporary ignored mutation and restore it before commit.

## Slices

### S1 — Fresh inventory and exact baseline representation

- Problem: current regex waivers are too broad and historical counts are untrusted.
- Do: after the W1 merge precondition is satisfied, build Ladle from the W2 branch; enumerate sorted component story IDs and compare them bidirectionally with a committed expected story-ID fixture; reject duplicates, unknown IDs, and missing W1 IDs. Run `neutral` and `uzh`, assert the requested rendered theme wrapper, and record every serious/critical violation as a canonical tuple `(rule, story, theme)` with stable sorting. Keep `impact` as the eligibility filter, not tuple identity. Replace regex waiver matching with exact tuple matching. Store reason, owner, and `fixture debt | component debt` metadata separately from matching so metadata cannot widen the baseline.
- Owned paths: `packages/design-system/tests/a11y/stories.spec.ts`; one named fixture such as `packages/design-system/tests/a11y/exact-inventory.ts`; only the smallest helper path needed for exact tuple loading and theme assertion.
- Route: `executor` for bounded implementation after plan approval; main session owns baseline interpretation and any ambiguity about the independent oracle.
- Execution-tier skip reason: none; this is a bounded tool-using test-harness change with named paths and runnable acceptance checks.
- Acceptance: the provisional S1 runs use a fresh Ladle build and `CI=true PWTEST_SKIP_BUILD=1`; the canonical two-cycle/four-shard evidence protocol is completed in S2. An unexpected, absent, duplicate, unknown, or changed tuple fails; every tuple is attributed to one story and one theme; the W1 IDs are present in the independent oracle and fresh manifest. Normalized shard output is a stable JSON-lines file sorted by `theme`, `story`, then `rule`; S2 compares the four-file union with a checked-in helper rather than parsing console output.
- Review: substantive test-gate change; run exactly one configured `simplifier` and one risk-selected `slice-reviewer` on the same immutable commit range, in parallel, before integration.
- Commit: `test(a11y): pin exact serious-critical inventory`.

### S2 — Shard-local cardinality and CI proof

- Problem: a green scan can still be empty, partial, stale, or shard-skewed, and a standalone guard test would run on only one shard under `fullyParallel`.
- Do: define the canonical inventory protocol as two complete cycles, each composed of four explicit shard runs from a fresh Ladle build. Ensure port 61011 is not reused and invoke the runs with `CI=true PWTEST_SKIP_BUILD=1`. Make each shard execute a pure manifest/expected-set preflight through a shared helper invoked by every shard or an equivalent per-test setup; emit shard-local normalized JSON-lines output sorted by `theme`, `story`, then `rule`, reject duplicates, and compare the normalized union of all four shard files between cycles with a checked-in helper. Assert both themes and all W1 story IDs are covered. Preserve the existing four-shard blocking CI topology unless measured evidence requires a narrow CI correction.
- Owned paths: `packages/design-system/tests/_support/ladle.ts`, `packages/design-system/tests/a11y/`; `.github/workflows/main.yml` only if the preflight cannot be expressed in the test harness. No roadmap edits in this worktree.
- Route: `executor` for bounded test/harness implementation; main session owns CI topology, shard protocol, and scope decisions.
- Acceptance: adding, removing, or changing one expected tuple fails; omitting any W1 story fails; a missing/partial manifest fails; the requested theme mismatch fails; each shard runs the preflight; two fresh four-shard cycles have byte-equivalent normalized JSON-lines unions; all four CI shards pass and the blocking `build` dependency remains intact.
- Review: substantive cross-shard test/CI seam; run exactly one configured `simplifier` and one risk-selected `slice-reviewer` on the same immutable commit range, in parallel, before integration.
- Commit: `test(a11y): guard story and theme cardinality` or `ci(a11y): enforce shard inventory preflight` if workflow code is required.

### S3 — Integrated verification and package closeout

- Problem: exact local proof is insufficient unless the branch is clean and the CI contract is reproduced at the package head.
- Do: run a fresh Ladle build, two complete four-shard local inventory cycles using `CI=true PWTEST_SKIP_BUILD=1`, full repository checks, and the normal package gates. Inspect staged data for secrets/PII, update the W2 plan progress, and prepare (but do not directly mutate) roadmap evidence for the roadmap worktree owner. Write/update the draft PR description only after the package clears its gates. Keep the PR draft unless separate readiness authority is granted.
- Owned paths: W2 plan progress and PR body after implementation; roadmap state remains owned by the roadmap worktree; no release/deployment files.
- Route: `main` for integration and final verification; exact final outcome gets one configured integrated-final review after verification and before presentation or PR update.
- Acceptance: two normalized four-shard inventories are byte-equivalent; tuple/cardinality mutation checks fail as intended and are restored; fresh build is used; all four shards pass; `pnpm check`, lint, format, package build, size, and relevant smoke/fast checks pass; all required review reports are terminal and accepted; PR remains draft. Push/PR update and remote CI require separate explicit authority.
- Commit: `docs(project): record W2 exact inventory evidence`.

## Risks and stop conditions

- Stop if W1 is not merged into `v5` or the three W1 story IDs are absent from both the independent oracle and fresh manifest.
- Stop if a fresh run is empty/partial, requested theme proof fails, local and CI story sets differ, shard outputs duplicate tuples, or two complete normalized inventories are not byte-equivalent.
- Stop if the exact baseline needs product/design rulings, component fixes, or a new public contract; record the finding and return for a separate decision.
- Do not hand-edit a baseline to make CI green. Any baseline update must be generated from a fresh measured run, reviewed as a deliberate debt change, and accompanied by explicit evidence.
- Do not push or update a PR merely because the local package is complete; remote CI evidence is a separately authorized publication step.

## Progress

- Planning-stage review: `APPROVE_WITH_CONCERNS` with no must-fix findings; terminal report is `project/_local/reviews/2026-08-12-v5-a11y-exact-inventory-planning.md` in the roadmap worktree. Operational refinements were incorporated: stable JSON-lines output, canonical four-shard evidence in S2, `CI=true PWTEST_SKIP_BUILD=1`, and roadmap evidence prepared for the separate owner.
- Current state: W2 S1 and S2 were completed in the verified standalone clone, then imported into the named worktree as canonical commits `08120037b`, `f6302575a`, `db5f28d1b`, and `450c3edd0`. The import preserved the reviewed a11y harness and resolved the Playwright configuration conflict by retaining both the shard preflight hooks and the existing packed Next/RHF exclusion.
- S1 evidence: a fresh `v5@d1825b4` Ladle build produced 384 non-readme story IDs, including all three W1 theme-extension IDs. The complete neutral/UZH run passed 795/795 tests; the exact inventory contains 148 tuples (98 critical, 50 serious; 80 neutral, 68 UZH). Mutation checks for missing stories, missing tuples, and duplicate tuples passed. Simplification removed the redundant theme wait; slice review used the read-only executor fallback and returned `APPROVE`.
- S2 evidence: every explicit CI shard runs story-manifest and configured-theme preflight. Two fresh-build four-shard cycles passed after the preflight correction, with 148 normalized tuples and all 768 story/theme pairs in each cycle; inventory and coverage unions were byte-equivalent. The configured slice reviewer was unavailable; the executor fallback's preflight concern was corrected in `450c3edd0` and the full protocol was rerun successfully. The S2 simplifier returned `ACCEPT`.
- S3 evidence: the corrected standalone a11y suite passed 795/795; smoke passed 480/480; package build, size, packed theme contract 672/672, root `pnpm check`, root `pnpm lint`, root `pnpm format:check`, and `git diff --check` passed. A concurrent run was discarded because both suites competed for fixed preview port 61011; the standalone rerun is authoritative.
- Integrated final: the complete reviewed range `d1825b45..ed917196` received `APPROVE` from the read-only executor fallback because the configured final reviewer was unavailable. The reports are under `/private/tmp/design-system-w2-exact-inventory/project/_local/reviews/`; no threshold findings remain. The local package is complete at the reviewed delivery layer. No push, PR update, merge, release, or deployment is authorized by this checkpoint.
- Next step: reconcile W2 in the separate roadmap-owner checkpoint; do not start W3 until that roadmap state records W2's reviewed delivery.

### Package boundary

```json
{
  "schema": "PackageBoundary/v1",
  "package_key": "v5-a11y-exact-inventory",
  "roadmap": {
    "path": "project/2026-08-12-v5-ga-remaining-roadmap.md",
    "w_item": "W2"
  },
  "state": "complete",
  "required_delivery": "reviewed",
  "achieved_delivery": "reviewed",
  "slices": {
    "completed": ["S1", "S2", "S3"],
    "remaining": []
  },
  "gates": {
    "verification": {"required": true, "state": "passed", "evidence": ["795/795 corrected standalone a11y tests", "480/480 smoke tests", "two fresh four-shard cycles", "148 tuple union", "768 story/theme pairs per cycle", "672/672 packed theme-contract assertions", "root checks", "package size gate", "package build", "mutation checks"]},
    "simplification": {"required": true, "state": "passed", "evidence": ["S1 redundant theme wait removed", "S2 simplifier ACCEPT"]},
    "slice_review": {"required": true, "state": "passed_with_fallback", "evidence": ["S1 executor fallback APPROVE", "S2 executor fallback concern corrected in 450c3edd0", "native slice-reviewer unavailable"]},
    "integrated_final": {"required": true, "state": "passed_with_fallback", "evidence": ["read-only executor fallback APPROVE over d1825b45..ed917196", "native final-reviewer unavailable"]}
  },
  "active_workers": [],
  "parking": null,
  "git": {
    "head": "450c3edd0",
    "base": "d1825b450dc0b6899dece815811ab29bfc7524f1",
    "branch": "rs/v5-a11y-exact-inventory",
    "worktree": "/Users/rschlae/Git/df/design-system/trees/rs-v5-a11y-exact-inventory"
  }
}
```

## Review routing

- Planning-stage register: `/Users/rschlae/Git/df/design-system/trees/rs-v5-ga-remaining-roadmap/project/_local/reviews/v5-a11y-exact-inventory-gate-register.md`.
- S1/S2: one `simplifier` and one risk-selected `slice-reviewer` in parallel per substantive immutable slice.
- Integrated final: one configured `final-reviewer` after full verification; no publication, merge, readiness, release, or deployment authority is implied.

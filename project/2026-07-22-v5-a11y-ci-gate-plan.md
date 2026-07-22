# Plan — TEST-4: a11y sweep as a blocking CI gate

## Identity

- Plan: `project/2026-07-22-v5-a11y-ci-gate-plan.md`
- Branch: `v5-a11y-ci-gate`
- Target: `v5`
- PR: none yet
- Roadmap: `project/2026-07-18-v5-production-readiness-roadmap.md` item 18 (TEST-4)
- History: `project/2026-07-20-pr-182-v5-a11y-level-a-plan.md` (A11Y Level-A, merged as `55f48dc`)

## Goal

Axe sweep runs in CI as a **blocking** job at serious+critical. Deterministic, under
~5 min wall clock.

## Non-goals

- Triaging the moderate/minor backlog. Inventory it, do not gate on it.
- uzh brand contrast (A11Y-5/12). D4-gated.
- VRT (TEST-3).
- New component a11y fixes beyond what the gate itself surfaces.

## Decisions

- **DA** — Gate blocking, not report-only. User ruling. A permanently amber job is
  alarm fatigue, which is what pulled the sweep from CI in the first place.
- **DB** — Fix determinism before gating. A flaky blocking gate is worse than none.
- **DC** — Keep `BLOCKING_IMPACTS = ['serious','critical']` and `ALLOWLIST = []`.
  Nothing gets waived to make the gate green.

## Research

**Backlog is zero.** Serial run at `55f48dc`: 761 passed, 4 harness timeouts,
**0 `A11Y::` violation markers** across all 740 story x theme cases. The "296
findings" in the roadmap predate the Level-A batch. The gate has nothing to triage.

**The flake is one bug, not many.** Every intermittent failure is axe scanning a
partially rendered story:

| Rule | Why it fires early |
| --- | --- |
| `aria-progressbar-name` | progressbar is named by its `formatter(value)` text |
| `button-name` | trigger content not committed |
| `label` | label/input pair not committed |
| `aria-valid-attr-value` | `aria-controls` target panel not committed |
| `color-contrast` | text painted in a fallback face |

Isolation proves it: `tabs--*` fail under load, pass 10/10 alone; `alert--destructive`
same. No component defect reproduces serially.

**Contention is the trigger, worker count the amplifier.** Machine has 18 cores;
Playwright default is 50% = 9 workers.

| Harness | Workers | Runs |
| --- | --- | --- |
| baseline | 9 (default) | 84, 70 fails |
| baseline | 1 | 4 harness timeouts, 0 axe |
| `+ fonts.ready` | 9 (default) | 3, 14, 38 fails (escalating) |
| `+ fonts.ready` | 4 | 0, 0, 7 fails |

`document.fonts.ready` helps and is now safe (the comment forbidding it cited Google
Fonts stalling; THEME-7 self-hosted them). It is not sufficient. Capping workers is a
band-aid, not a fix.

**Not defects, checked and dismissed:**

- **A11Y-17 Tabs `aria-controls`** — withdrawn. Radix `Presence` gets function
  children, so `TabsContent` stays mounted-and-`hidden` rather than unmounting, and
  axe's `idref` check is a plain `getElementById` that ignores `hidden`. Verified by
  SSR repro against pinned `@radix-ui/react-tabs@1.1.12`, and `tabs--*` passes 10/10
  in isolation. It was a partial-render artifact like the rest.
- **Select / NavigationMenu / Popover dangling `aria-controls`** — these primitives
  *do* truly unmount their content while closed, so the IDREF really can dangle. Axe
  does not flag it, upstream shadcn ships it unmodified, and the ARIA APG disclosure
  pattern tolerates it because `aria-expanded="false"` already carries the state.
  Left alone deliberately; recorded so the next audit does not re-derive it.

**Structural gap worth a guard (not a bug today):** `Tabs.tsx` builds triggers from
the `tabs` prop and panels from opaque `children`, with no cross-check. A tab added
without a matching `TabContent` yields a genuinely dangling `aria-controls`.

**CI shape:** new dedicated job, 4-way `--shard` matrix, explicit `--workers`. Each
shard builds Ladle itself (parallel from t=0 beats a serialized shared-artifact job).
No browser cache (a cache hit costs about what the chromium download costs, and
`--with-deps` apt libs are not cacheable). Public repo on standard Linux runners, so
minutes are free and the 4x compute is not a cost concern.

## Verification path

- Fast: `PWTEST_SKIP_BUILD=1 playwright test tests/a11y --workers=N --reporter=line`
- Stability bar: **5 consecutive full runs, 0 failures, at default workers (9)** —
  the harsher condition, deliberately not the CI worker count.
- CI proof: the gate job green on this branch's own push.

## Slices

### S1 — deterministic settle in `gotoStory`

Replace the 2-rAF heuristic with a real quiescence wait: `networkidle` (Ladle
lazy-loads each story chunk), then a `MutationObserver` idle window, then
`document.fonts.ready`. Cap the idle wait so ticking components (`Countdown` at
`intervalDelay={0}`) cannot hang it.

- Files: `tests/_support/ladle.ts`
- Check: 5 consecutive full runs at default workers, 0 failures.
- Commit: `test(a11y): settle stories deterministically before scanning`

### S2 — inventory moderate/minor instead of claiming to

`stories.spec.ts` says moderate/minor are "tracked", but the marker loop only walks
`blocking`, so nothing is recorded. Log every violation, gate on `blocking`.

- Files: `tests/a11y/stories.spec.ts`
- Check: markers appear for `region` (moderate) while the run stays green.
- Commit: `test(a11y): inventory non-blocking violations instead of dropping them`

### S3 — Tabs contract guard

Dev-only warning when a `tabs[]` entry has no matching `TabContent`. Closes the one
path to a real dangling IDREF. No runtime output change.

- Files: `src/Tabs.tsx`
- Check: contract test asserts the warning fires for a mismatched pair.
- Commit: `fix(a11y): warn when a Tabs entry has no matching panel`

### S4 — blocking CI job

Sharded matrix job in `main.yml`, blocking, `build` gains it in `needs`.

- Files: `.github/workflows/main.yml`
- Check: green on this branch's push; note the observed per-shard wall clock.
- Commit: `ci(a11y): gate on the axe sweep across a sharded matrix`

### S5 — roadmap + plan progress

TEST-4 closed; A11Y-17 recorded as withdrawn; the Select/NavigationMenu/Popover
survey recorded as a deliberate non-finding; the 296-findings figure corrected.

- Files: `project/2026-07-18-v5-production-readiness-roadmap.md`, this plan
- Commit: `docs(project): record TEST-4 completion and correct the a11y backlog`

## Cadence

One slice at a time. Implement, verify, review + simplify subagents on the exact
commit range, integrate, re-verify, commit.

## Progress

- 2026-07-22: branch cut from `v5` at `55f48dc`. Research done (4-lens workflow
  `wf_655be84a-581`, 28 agents, adversarial verification). Backlog measured at zero.
  Flake root-caused to the mount wait. A11Y-17 withdrawn. Plan written. S1 next.
- 2026-07-22: correction posted on the merged PR #182 — the 765/765 figure in its
  body and squash commit message does not reproduce.

## Finish gate

Fresh full-suite stability run, `$security-review` (CI workflow change touches
release plumbing adjacent config), `$thermo-nuclear-code-quality-review`, PR via
`$rs-mr-description-writer`, draft, merge only with explicit authority.

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

**The sweep was scanning an empty page.** This is the finding that invalidates
everything built on top of it, including the verification evidence for PR #182.

`gotoStory` waited for `body > :not(#ladle-root)` as its "story mounted" signal.
That selector matches `<div class="ladle-background">`, which Ladle renders before
anything else — so the wait always returned immediately and asserted nothing. The
story does not render outside `#ladle-root` as the code comment claimed; it renders
*inside* it, next to the toolbar.

Timeline probe on `select--default`, single browser, idle machine:

| t | state |
| --- | --- |
| 104 ms | `html[data-storyloaded]` set; body holds chrome only |
| 366 ms | still chrome only |
| 622 ms | story appears inside `#ladle-root`, combobox reads "Select an item" |

Half a second of nothing, and axe was free to scan any of it. An empty page has no
violations, so the sweep reported **false passes**. The "0 violations" serial run
and the "765/765" figure both measured Ladle's own chrome.

**Fixing the wait makes the suite deterministic.** Waiting on
`#ladle-root > [data-theme] > :not(#ladle-theme-controls)` — the story itself —
gives byte-identical results across runs (same md5 over the violation set):

| Harness | Workers | Runs |
| --- | --- | --- |
| pre-fix | 9 | 410 fails |
| `+ fonts.ready + mutation-quiet` | 9 | 164, 156, 149 fails |
| `+ correct story wait` | 9 | **186, 186, 186** fails |

Failure count went *up* because the scan finally sees real components. Determinism
is the goal, and determinism is achieved.

**There is a real Level-A backlog.** Confirmed by isolation at `--workers=1`, where
contention cannot be the cause:

- `button--icon`, `button--color-button`, `button--button-icon-group` —
  `button-name` (critical). `Button.Icon` with `withoutLabel` and no `ariaLabel`
  produces a button with no accessible name at all. `Button.stories.mdx:176`.
- `tabs--*` — `aria-valid-attr-value` (critical), 10/10 stories, both themes.
- `tabs--tooltips` — additionally `aria-required-children`, `aria-required-parent`,
  `nested-interactive`. The tooltip wrapper breaks the tablist structure.

**A11Y-17 is reinstated.** I withdrew it earlier on the strength of an isolation run
that "passed 10/10" — that run was scanning an empty page. The Radix `Presence`
analysis explains why *inactive* panels stay in the DOM, but it does not explain
these failures, and the failures reproduce serially. Treat the withdrawal as void
and re-derive the diagnosis against real DOM.

**Local measurement hazard.** Playwright leaves headless Chromium processes behind
when a run is interrupted; 54 accumulated here and pushed the machine 5 GB into
swap, which inflated failure counts run over run and produced a fake "escalating
flake" signal. Kill strays between runs before trusting any local number.

**Select / NavigationMenu / Popover dangling `aria-controls`** — these primitives
truly unmount their content while closed, so the IDREF can dangle. Axe does not flag
it, upstream shadcn ships it unmodified, and the APG disclosure pattern tolerates it
because `aria-expanded="false"` carries the state. Left alone deliberately; recorded
so the next audit does not re-derive it.

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
- 2026-07-22: S1 root-caused and fixed. The story-mounted wait was a no-op matching
  Ladle's background div, so the sweep scanned chrome and reported false passes.
  Waiting on the story element makes the suite deterministic (186/186/186 at 9
  workers). That also means the plan's premise was wrong: the backlog is not zero,
  and the PR #182 axe evidence was invalid. A11Y-17 is reinstated. Slices S2-S5 are
  paused pending a scope ruling on the backlog.

## Finish gate

Fresh full-suite stability run, `$security-review` (CI workflow change touches
release plumbing adjacent config), `$thermo-nuclear-code-quality-review`, PR via
`$rs-mr-description-writer`, draft, merge only with explicit authority.

# Plan: visual regression testing (VRT) for Ladle

- Plan path: `project/2026-06-15-ladle-visual-regression-testing-plan.md`
- Branch: new branch off `v5` (own MR/PR) — NOT stacked into #179.
- Related: [a11y/Playwright plan](2026-06-15-ladle-a11y-playwright-testing-plan.md), [ADR keep Ladle](2026-06-15-adr-storybook-vs-ladle.md)
- Status: PLANNED — awaiting go.

## Goal
Catch unintended visual changes per component, per theme. Reuse the existing
Playwright + Ladle harness (`gotoStory`, `meta.json` enumeration, neutral/uzh).
Pixel screenshots vs committed baselines.

## Non-goals
- No Chromatic / Percy / hosted service (ADR chose no Storybook; keep deps minimal, no SaaS).
- No new framework — Playwright native `toHaveScreenshot()` only (already have `@playwright/test`).
- Not every story on day 1 — curated set first, expand after CI is proven stable.
- Not blocking CI on day 1 — report-only first, ratchet (same discipline as a11y).

## HARD LESSON (from the a11y slice — read before building)
The a11y sweep passed locally ("0 violations, stable, repeat-each=2") and then
FAILED in CI: 296 failures + 16.6 min. Causes: (1) `document.fonts.ready` stalled
on Google Fonts on the runner; (2) the slower runner rendered differently than my
fast/cached local box. **A local-green VRT proves nothing.** VRT is even MORE
environment-sensitive than a11y (font rasterization, antialiasing, subpixel). So
this plan is built around determinism FIRST.

## Key facts (grounded)
- Harness exists: `tests/_support/ladle.ts` (`gotoStory`, `loadStoryIds`), config has `reducedMotion: 'reduce'`.
- 437 stories (354 component + 83 readme). Story renders as a `body` child outside `#ladle-root` (toolbar only).
- Fonts load from Google Fonts via CSS `@import` (Source Sans 3, JetBrains Mono) -> non-deterministic load = #1 VRT risk.
- Dynamic stories exist: Calendar shows TODAY's date, Countdown/CycleProgress are time-based, Spinner/caret animate.
- `@playwright/test` 1.61.0 already installed; `toHaveScreenshot` is built in (no new dep).

## Strategy
1. **Determinism via Docker.** Generate AND compare baselines inside the pinned Playwright
   container (`mcr.microsoft.com/playwright:v1.61.0-*`) so local == CI pixel-for-pixel. Baselines
   produced outside the container are worthless. This is the make-or-break decision.
2. **Self-host the two fonts** (bundle WOFF2 in the package, `@font-face` local) so render is
   deterministic and `fonts.ready` resolves instantly — kills the Google-Fonts nondeterminism that
   already bit a11y.
3. **Freeze the dynamic axis.** Mock the clock (fixed date) for Calendar/Countdown; `animations:'disabled'`
   + `caret:'hide'`; `mask` spinner/random/time regions; maintain an exclude list for stories that can't
   be frozen.
4. **Native Playwright snapshots.** `expect(page).toHaveScreenshot(name, {...})` per story per theme,
   baselines committed under `tests/visual/__screenshots__/`. Tune `maxDiffPixelRatio` / `threshold`.
5. **Curated -> scale.** Prove the loop on ~15 representative components first; only expand to all once
   CI shows stable matches.
6. **Report-only -> blocking.** First CI integration uploads diff artifacts and does NOT gate; flip to
   blocking only after a stable run history.

## Slices

### V0 — plan commit
- Commit this plan. (docs only)

### V1 — determinism foundation (THE de-risk slice; do not skip)
- Do:
  - Add Docker run path: pinned Playwright image; npm scripts `test:visual` / `test:visual:update` that run
    inside the container (mount repo, run `playwright test tests/visual`).
  - Self-host Source Sans 3 + JetBrains Mono (bundle WOFF2; `@font-face` referencing local files; drop the
    Google Fonts `@import` for the test/build path or replace globally — decide scope). Bounded font-ready wait.
  - VRT config: `toHaveScreenshot` defaults (`animations:'disabled'`, `caret:'hide'`, `scale:'css'`,
    `maxDiffPixelRatio`), `snapshotPathTemplate`.
  - ONE story (`button--primary`, both themes): generate baseline in container, then run twice more in
    container -> must match 0-diff. Then run on host -> compare host-vs-container delta (expect host to differ;
    documents WHY Docker is mandatory).
- Check: 2x in-container runs = identical; baseline committed; delta documented.
- Commit: `test(ds): visual-regression determinism foundation (docker + self-host fonts)`

### V2 — curated baseline set
- Do: VRT spec over ~15 representative components (button, alert, badge, card, input, select, tabs, accordion,
  avatar, table, tag, switch, progress, tooltip, workflow) x {neutral, uzh}. Generate + commit baselines (in container).
- Check: full curated run green in container; baselines reviewed (eyeball the PNGs).
- Commit: `test(ds): visual baselines for core components (neutral+uzh)`

### V3 — tame dynamic stories
- Do: clock mock (fixed date) for Calendar/Countdown/CycleProgress; `mask` for Spinner/animated/random;
  exclude-list for genuinely non-deterministic stories (with reasons). Re-baseline affected.
- Check: dynamic stories now stable across repeated container runs.
- Commit: `test(ds): freeze/mask dynamic stories for stable snapshots`

### V4 — CI wiring (report-only)
- Do: CI job runs VRT in the SAME pinned container; on diff -> upload `test-results/` (actual+diff PNGs) as
  artifact; `continue-on-error` (non-blocking). Verify committed baselines MATCH in CI (the real determinism test).
- Check: CI run shows VRT matching committed baselines (or surfaces the exact delta to fix before gating).
- Commit: `ci(ds): visual-regression job (report-only) with diff artifacts`

### V5 — scale + (optional) gate
- Do: expand to all component stories once CI is stable; decide baseline storage (commit vs git-lfs if repo bloat
  matters). Flip to blocking only after a clean run history.
- Check: full set stable in CI; repo size acceptable.
- Commit: `test(ds): expand visual coverage` / `ci(ds): gate on visual regressions`

### Final
- Security review (scope: new Docker usage, bundled font binaries, CI). MR/PR via `$df-mr-description-writer`.

## Risks / mitigations
- **Local != CI pixels** (the a11y lesson) -> ALL baselines generated + compared in the pinned Docker image. Never host-generated.
- **Font nondeterminism** -> self-host WOFF2; bounded `fonts.ready`; no Google Fonts in the VRT path.
- **Dynamic content** (today's date, timers, animation, caret, random) -> clock mock + `animations:disabled` + `caret:hide` + `mask` + exclude-list.
- **Baseline bloat** (874 PNGs if all) -> curated first; git-lfs option; decide at V5.
- **Threshold tuning** (too strict = flaky, too loose = misses) -> start `maxDiffPixelRatio` small, calibrate on real diffs.
- **Don't gate prematurely** -> report-only until stable; same mistake as a11y must not repeat.

## Open questions (decide before V1)
- Self-host fonts **globally** (changes the shipped package: drops Google Fonts `@import`) or **test-only** (inject in Ladle head for VRT)? Global is more honest + offline-friendly but touches the published DS.
- Baseline scope at V5: curated-only (cheap, partial) vs all-stories (full, heavy)?
- Viewports: single desktop width v1, or add a mobile width?

## Progress
- 2026-06-15 PLAN written. Awaiting go + the open-question decisions before V1.

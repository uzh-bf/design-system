# Plan: a11y (axe) + Playwright basic testing for Ladle

- Plan path: `project/2026-06-15-ladle-a11y-playwright-testing-plan.md`
- Branch: `v5` (stack) — target `main` (PR #179)
- Related: [ADR keep Ladle](2026-06-15-adr-storybook-vs-ladle.md), [conformance remediation](2026-06-15-v5-design-conformance-remediation-plan.md)
- Status: PLANNED — awaiting go before execution.

## Goal
Catch a11y regressions + dead/broken stories automatically. Cheapest path: drive
the existing Ladle build with Playwright + axe. No Storybook, no story rewrite.

## Non-goals
- Not Storybook migration.
- Not full visual-regression (screenshot diffing) in v1. Add later if wanted.
- Not per-component unit tests / interaction tests. Smoke + a11y only.
- Not blocking-fix every existing a11y violation now. First pass = report, then ratchet.

## Key facts (grounded)
- No test framework today. `lint`/`check`/`format:check` only. Zero test deps.
- Root `test` = `turbo run test`. DS pkg has NO `test` task -> CI test job green no-op. **Empty slot to fill.**
- Ladle: 83 `*.stories.mdx` -> 437 entries (354 stories + 83 readmes). Story URL `?story=<id>&mode=preview`. Base `/design-system/`.
- Story list machine-readable at `/design-system/meta.json` (key `stories`).
- Theme switch persisted via `localStorage` keys `ladle-theme` / `ladle-dark` -> Playwright can set theme by seeding localStorage before load. Enables neutral+uzh parametrization for free.
- `ladle preview` serves the static `build/` (run `build:ladle` first).
- Node 22.16, pnpm 10.30. Vite 6.

## Strategy
Run against the **built static Ladle** (deterministic, == what deploys), served by
`ladle preview`. Playwright `webServer` boots it. Enumerate stories from `meta.json`,
generate one test per story. Two checks:
1. **Smoke** — story renders: no uncaught page error, no `console.error`, story root non-empty.
2. **a11y** — `@axe-core/playwright` scan, fail on `serious`+`critical` (allowlist for known/3rd-party).
Run each in `neutral` + `uzh` (seed localStorage). Skip `*--readme` MDX pages for a11y
(prose, not components) — smoke only.

---

## Slices

### T0 — plan commit
- Commit this plan + ADR. (docs only)
- Check: files exist, build still green.
- Commit: `docs(project): ADR keep-Ladle + a11y/playwright test plan`

### T1 — tooling tracer bullet (one story, green end-to-end)
- Do:
  - Add devDeps (pinned): `@playwright/test`, `@axe-core/playwright`.
  - `playwright.config.ts` in `packages/design-system`: `webServer` = `pnpm build:ladle && pnpm preview` (or serve `build/`) on fixed port; `baseURL` incl. `/design-system/`; chromium only v1; `reporter` html+list.
  - `tests/a11y/smoke.spec.ts`: hit `button--primary` preview, assert root has content + no console errors + axe no serious/critical.
  - Add DS `package.json` script `test` = `playwright test` (fills the turbo `test` task slot). Add `test:install` = `playwright install --with-deps chromium`.
  - `.gitignore`: `playwright-report/`, `test-results/`, `/build`.
- Check: `pnpm --filter @uzh-bf/design-system test` green locally (1 spec). `pnpm build` still green.
- Review + simplify subagents. Commit: `test(ds): playwright + axe tracer (button story)`

### T2 — dynamic story sweep (smoke all)
- Do:
  - Helper reads `meta.json` (from served build) -> story id list.
  - Parametrized smoke test over ALL 437 entries: navigate preview, assert no page error / no `console.error` / root non-empty.
  - Keep fast: chromium, sharding-ready, sane timeouts, `fullyParallel`.
- Check: full smoke run green (or surfaces genuinely broken stories — triage list). Note runtime.
- Review + simplify. Commit: `test(ds): smoke-render sweep across all stories`

### T3 — axe a11y sweep, both themes
- Do:
  - Over component stories (exclude `*--readme`), run axe in `neutral` + `uzh` (seed `localStorage.ladle-theme`).
  - Threshold: fail on `serious`+`critical`. Allowlist file for known/accepted (e.g. 3rd-party radix quirks, contrast in intentional cases) with reason comments.
  - First run = inventory: collect ALL violations, write triage summary to plan Progress. Decide allowlist vs fix.
- Check: run green with allowlist; triage doc of what was waived vs fixed. Runtime acceptable (shard if needed).
- Review + simplify. Commit: `test(ds): axe a11y sweep (neutral+uzh) with triage allowlist`

### T4 — CI wiring (report-first, then ratchet)
- Do:
  - `.github/workflows/main.yml` `test` job: `pnpm test:install` then `pnpm test`; upload `playwright-report/` artifact.
  - v1 **non-blocking** if existing a11y debt large (continue-on-error or smoke-blocking + a11y-soft). Flip a11y to blocking once allowlist stabilizes.
  - Cache Playwright browsers.
- Check: CI run on push green; artifact present; intended blocking semantics verified.
- Commit: `ci(ds): run playwright a11y/smoke tests + upload report`

### Final
- Security review subagent (scope: dev tooling + CI; low surface — new devDeps, no runtime/secrets). Handle/defer findings.
- `$df-mr-description-writer` update PR #179 whole-branch (now incl. ADR + test slices).
- `Next Steps`: visual-regression (screenshot diff / Chromatic-free), ratchet a11y to blocking, expand interaction coverage if wanted.

## Risks / mitigations
- **Existing a11y debt** floods T3 -> start report-only, allowlist, ratchet. Don't block all CI on day 1.
- **Runtime** (437 × themes × axe) slow -> chromium-only, parallel, shard; a11y on component stories only; sample if needed.
- **Flake** from font/animation timing -> disable animations in test (reduce-motion), `waitFor` story root, axe after settle.
- **build:ladle in CI** adds time -> cache; acceptable (deploy already builds it).
- **New devDeps** (security) -> pin, lockfile in same commit, security review at end.

## Progress
- 2026-06-15 PLAN written + ADR written.
- 2026-06-15 Worktree `../design-system--ladle-testing`, branch `test/ladle-a11y-playwright` off `v5`.
- 2026-06-15 Pre-slice fix on **v5** (commit `6ebc9b3`): R3-R7 left 15 src files unformatted +
  2 react-refresh lint warnings (ThemeProvider/ButtonGroup) -> v5 lint + check-format CI were RED.
  Fixed at source (prettier --write + targeted disables). Worktree fast-forwarded onto it.
- 2026-06-15 **T1 DONE** (commit `aede745`). @playwright/test 1.61.0 + @axe-core/playwright 4.11.3 (pinned),
  playwright.config.ts (build:ladle -> ladle preview :61011, `PWTEST_SKIP_BUILD=1` skips rebuild,
  reuseExistingServer off in CI), `tests/a11y/smoke.spec.ts` tracer on button--primary (render +
  no console error + axe no serious/critical, toolbar `#ladle-theme-controls` excluded). Scripts
  `test`/`test:install`. Gate GREEN: lint, format:check, tsc check, 1 test pass.
  Review subagent: 2 Important (build-per-run, reuse staleness) + 4 Minor; applied SKIP_BUILD env +
  10s selector timeout + comments; deferred axe-scope-to-root refinement to T3.
- 2026-06-15 **T2 DONE** (commit `900557a`). Smoke-render sweep: every story from build/meta.json
  asserts no uncaught/console errors. `test` builds Ladle then runs (PWTEST_SKIP_BUILD=1); `test:fast` reuses.
- 2026-06-15 **T3 DONE** (commit `8ea860c`). Axe sweep over all component stories x {neutral,uzh}.
  **Caught + fixed a false-green**: in preview mode the story renders OUTSIDE `#ladle-root` (which holds only
  the toolbar), so `.include('#ladle-root')` scanned nothing (axe passes=0). Fixed -> full page minus
  `#ladle-theme-controls` (proven: axe catches an injected no-alt img). **De-flaked**: violations
  (button-name/label/contrast) appeared only under parallel load = harness race (axe scanning pre-mount).
  Fixed via shared `tests/_support/ladle.ts` `gotoStory` (waits content node + fonts.ready + 2 rAF) +
  config `reducedMotion: 'reduce'`. Stable: repeat-each=2 -> 1416 pass, 0 violations. ALLOWLIST empty
  (no real serious/critical debt). Smoke refactored onto helper; redundant tracer removed.
- 2026-06-15 **T4 DONE** (commit `7600d07`). CI `test` job: install chromium + run DS test + upload report
  artifact; turbo `test` cache:false. Replaced stale Jest-style `pnpm test --ci --coverage` (would now hit
  Playwright and fail). Gating ON from day 1 (no debt). Full `pnpm test` GREEN: 1145 tests (437 smoke + 708 a11y).
- 2026-06-15 **Final security review** (subagent): **SECURE_WITH_NOTES**, no blockers. New devDeps pinned +
  canonical; no workflow injection (static commands, no `github.event.*`); artifact has no secrets; test code
  no injection/traversal. Note (follow-up, pre-existing, non-blocking): GH Actions use floating major tags
  (`@v3`/`@v4`), not SHA-pinned.
- 2026-06-15 Merged into `v5` (ff) + pushed -> PR #179 (`e348956..6f552f9`, 18 commits). lint/format/check GREEN.
- 2026-06-15 **CI REALITY CHECK** (run 27566364698): the a11y gate FAILED in CI — **296 a11y failures**, 16.6 min.
  Smoke PASSED (437/437). Root causes: (1) `document.fonts.ready` settle stalls on Google Fonts on the CI
  runner -> 16min runtime; (2) the "0 violations, stable" local result did NOT generalize — on the slower
  runner axe reports button-name / label / nested-interactive / color-contrast across many stories. My local
  machine (fast CPU + cached fonts) masked them. **Lesson: a local-only "stable" claim is not CI-stable.**
- 2026-06-15 **COURSE CORRECTION** (this commit): a11y gate was over-eager. Now:
  - `gotoStory` drops `document.fonts.ready` (kept content-node wait + 2 rAF).
  - Scripts split: `test:smoke`, `test:a11y` (both build first); `test` still runs all locally.
  - CI `test` job runs **`test:smoke` only** (fast, reliable, blocking). a11y is OUT of the CI gate.
  - Verified locally: lint/format/check GREEN; `test:smoke` 437 pass in ~17s.

## a11y triage backlog (must do before re-adding a11y to CI)
The 296 CI a11y findings need real-vs-environment triage (per-rule, with the report artifact):
- `button-name` (icon/color/select/pin-field buttons) — likely REAL (icon-only buttons need aria-label).
- `label` (formik field stories) — likely REAL (inputs missing associated label).
- `color-contrast` — verify against the rendered (web-font) page, not CI fallback fonts.
- `nested-interactive` — likely REAL (interactive nested in interactive).
- For confirmed-real: fix the component OR allowlist with reason. For timing artifacts: stronger settle
  (e.g. `expect.poll`/`toPass` wrapping axe, or self-hosted fonts so render is deterministic).
- Only then re-add a11y to CI (report-only first, then ratchet to blocking).

## Next Steps
- Triage the a11y backlog above; decide fix vs allowlist; then wire a11y into CI (report-only -> blocking).
- CI hardening: cache Playwright browsers; SHA-pin GH Actions (whole-workflow hygiene pass).
- Update PR #179 description (whole branch incl. R1-R7 conformance + ADR + testing) via `$df-mr-description-writer`.
- Deferred from plan: visual-regression (screenshot diff).

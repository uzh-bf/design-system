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
- 2026-06-15 PLAN written + ADR written. Awaiting go to execute T1+.

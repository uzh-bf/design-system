# W3 — Deterministic visual regression protection

## Goal

Add a small, reviewable visual-regression boundary for the v5 design system:

- generate and compare native Playwright screenshots inside one digest-pinned
  Playwright container;
- reuse the existing Ladle stories and W1 theme-extension stories as the
  visual source of truth;
- prove local determinism before adding report-only CI;
- retain actual and diff images for every CI comparison.

## Non-goals

- No Storybook, Chromatic, Percy, or other visual-testing SaaS.
- No component, theme, accessibility, or public API changes in this package.
- No host-generated baselines, automatic snapshot updates, pixel thresholds, or
  masks that hide component pixels.
- No merge, push, publication, deployment, or release.
- Blocking CI is a later step in this package and requires the explicit evidence
  and authority recorded under S4.

## Plan identity

- Plan: project/2026-08-14-v5-visual-regression-plan.md
- Branch: rs/v5-visual-regression
- Worktree: trees/rs-v5-visual-regression
- Target: v5 at e40f4f5d06ea4f54c7b059dcc1eb13915fe9d9d9
- Delivery: one full-path milestone package; no PR exists yet.
- Roadmap: project/2026-08-12-v5-ga-remaining-roadmap.md, W3 section
- Historical VRT plan: project/2026-06-15-ladle-visual-regression-testing-plan.md
- Ladle decision: project/2026-06-15-adr-storybook-vs-ladle.md

## Evidence and research

### Local evidence

- packages/design-system/package.json already provides @playwright/test 1.61.0
  and Ladle 5.0.3; no new test dependency is required.
- packages/design-system/playwright.config.ts serves the built Ladle preview at
  http://127.0.0.1:61011/design-system/ but is shared with smoke and
  accessibility tests. It enables retries, parallelism, and local server reuse,
  so visual tests need a separate strict configuration.
- packages/design-system/tests/_support/ladle.ts already resolves stories,
  themes, story mounting, font readiness, and the Ladle toolbar boundary.
- W1 self-hosted fonts are available in the package, eliminating the prior
  Google Fonts network dependency.
- The existing Ladle decision keeps Ladle as the component workbench; native
  Playwright snapshots are the compatible missing capability.

### External evidence

- Playwright documents that screenshots must be generated and compared in the
  same rendering environment, and that the package version must match the
  browser image: https://playwright.dev/docs/docker and
  https://playwright.dev/docs/test-snapshots.
- The planner verified this exact architecture-specific image pin:
  mcr.microsoft.com/playwright:v1.61.0-noble@sha256:111dde95859f2c659291cb60e698f9048a8fc30b35b4ddb7c90f9cb5b73062d9
  with --platform=linux/amd64. R0 repeats the ref, digest, and architecture
  check before implementation.

### Decisions

- Use the AMD64 image digest above locally and in CI, even on the ARM64
  development host.
- Use the image's stock Node 24 only for the VRT lane. Normal repository checks
  remain on the repository's Volta Node 22.16.0; the package supports Node 22
  or newer.
- Use a separate visual configuration with one worker, zero retries, a fresh
  Ladle server, fixed 1280x720 viewport, device scale factor 1, UTC timezone,
  en-GB locale, light color scheme, reduced motion, hidden caret, and disabled
  transitions.
- Set threshold 0, maxDiffPixels 0, and updateSnapshots none for comparison
  and CI. Baseline creation is an explicit container-only generate command.
- Capture ordinary component stories through their story-root locator. Capture
  portal-based overlays at page scope so dialogs, menus, and tooltips are not
  silently omitted. The Ladle toolbar may be excluded because it is workbench
  chrome, not component output.
- Reject unexpected cross-origin requests and exclude states whose meaningful
  output depends on randomness, live time, external images, or an endless
  animation. Each exclusion must have a named reason in the case manifest.

## Primitive impact

No product primitive changes. This package reuses the existing component-story
and theme-preview primitives and adds test infrastructure around them; it does
not change consumer-facing contracts, composition, ownership, or lifecycle.

## ADRs

No new ADR is required. The existing Ladle decision remains the applicable
architecture record; the container and snapshot rules are execution policy for
this package.

## Skill routing

- rs-sliced-development-workflow: full-path plan, slices, commits, reviews, and
  finish gate.
- rs-model-routing: route bounded S1-S3 implementation to the configured
  executor; keep environment decisions, integration, S4, and final proof in
  the main session.
- verification-before-completion: fresh evidence before each commit and before
  any completion claim.
- writing-for-agents: keep this plan ordered, bounded, and checkable.
- Browser validation: run the real Ladle preview through the pinned Playwright
  container at http://127.0.0.1:61011/design-system/; inspect the
  container-produced PNGs manually with the local image viewer. Do not use a
  host browser to generate or update baselines.

## Planning-stage specialist

- Role: configured read-only planner
- Verdict: REVISE
- Finding: the original draft did not pin architecture, was unsafe to reuse
  for visual tests because the shared config retries and reuses servers, and
  left the image-diff policy too permissive.
- Accepted changes: force linux/amd64 and the exact digest; create a separate
  serial, retry-free, fresh-server visual config with fail-closed fonts; use
  zero-diff settings and explicit container-only baseline generation; accept
  stock Node 24 only inside the VRT lane; split environment resolution and
  later gate activation into main-owned boundaries.
- Report: project/_local/reviews/2026-08-14-v5-visual-regression-planning.md

## Test portfolio

| Risk or behavior | Obligation | Primary seam | Distinct failure caught | Owner |
| --- | --- | --- | --- | --- |
| Browser and font rendering drift | add new | strict Playwright screenshot canary | host/CI image, architecture, font, or browser drift | S1 |
| Neutral and UZH theme pixels | add new | named snapshots for the canary and curated states | theme token or theme-extension visual regression | S1/S2 |
| Dynamic and portal-based states | add new | frozen state setup plus page/root screenshot boundary | unstable timers, transitions, or omitted overlay pixels | S2 |
| CI uses the approved environment and keeps evidence | add new | report-only CI job and artifact upload | CI running a different image or dropping actual/diff PNGs | S3 |
| A deliberate change fails once blocking is enabled | add new | exact-head CI proof under S4 | report-only job failing open or blocking gate not wired | S4 |

## Delegation map

| Slice | Owner | Handoff | Acceptance boundary |
| --- | --- | --- | --- |
| R0 — environment and case manifest | main | none | live ref, image digest, architecture, viewport policy, and exact story IDs are recorded |
| S0 — package contract | main | user-approved plan | plan is committed as the first branch commit |
| S1 — deterministic canary | executor | S0 | strict config, container runner, neutral/UZH Button canary, and two zero-diff local comparisons |
| S2 — curated visual boundary | executor | S1 | meaningful states and reviewed snapshots cover the named categories and pass two strict container comparisons |
| S3 — report-only CI | executor | S2 | CI uses the same image digest and uploads actual/diff artifacts without blocking |
| S4 — prove and activate gate | main | S3 plus explicit authority for CI/push work | one deliberate failure, two clean same-SHA report-only runs, then a separately authorized blocking conversion |

Execution-tier skip reason for R0, S0, and S4: critical-path coupling with
environment, branch, authority, or integration decisions.

## Slices

### R0 — Settle the environment and case manifest

- Route: main
- Do: verify origin/v5, the architecture-specific image digest, the stock Node
  exception, viewport/time/locale policy, and exact story IDs from a fresh
  Ladle meta manifest. Name each curated state and its screenshot boundary.
- Check: written case manifest and environment values match the live repository
  and approved contract; no host baseline path is available by default.
- Commit: included in the first implementation slice or a small plan update if
  the live manifest changes the approved scope.

### S0 — Commit the package contract

- Route: main
- Do: create this plan on the named branch and preserve it with the
  implementation.
- Check: plan contains the research, accepted planner changes, test portfolio,
  delegation map, slice acceptance, Progress contract, browser path, and
  authority boundaries.
- Commit: docs(project): add v5 visual regression plan

### S1 — Add the deterministic visual canary

- Route: executor after R0
- Do: add a separate visual Playwright config, container wrapper and package
  scripts, a small visual spec, and container-generated neutral and UZH Button
  baselines using the existing W1 ThemeExtensionContract story source.
  Install dependencies and build Ladle inside the pinned image; never consume
  host node_modules, build output, or browser binaries.
- Check: one baseline generation followed by two independent container
  comparisons; both are zero-diff with one worker and zero retries. Fonts load
  or fail closed before capture.
- Commit: test(ds): add deterministic container visual canary
- Review: after commit, run exactly one simplifier and one slice-reviewer in
  parallel; the slice crosses the planned architecture and CI-environment risk.

### S2 — Add the curated visual boundary

- Route: executor after S1
- Do: add explicitly named snapshots selected by distinct visual contract:
  Button disabled and Checkbox partial; opened Modal and shown Tooltip; form
  error states; active navigation/sidebar states; Alert variants and
  UserNotification error; and the complete W1 synthetic-ramp state. Run
  ordinary selected states in neutral and UZH. Keep portal captures at page
  scope and record any deterministic exclusion with its reason.
- Check: every image is manually reviewed and named; every selected state has
  an exact story ID and theme boundary; two consecutive strict container runs
  are zero-diff.
- Commit: test(ds): add curated visual baselines
- Review: after commit, run exactly one simplifier and one slice-reviewer in
  parallel; the slice changes the visual contract and snapshot evidence.

### S3 — Add report-only CI and artifacts

- Route: executor after S2
- Do: add a separate GitHub Actions job using the same AMD64 image digest and
  container command. Keep the comparison step report-only. Upload Playwright
  report, actual, and diff images with always-on artifact handling.
- Check: the job demonstrates the same image/version, preserves artifacts on a
  mismatch, and does not gate the package yet. Record the exact CI SHA and
  artifact names.
- Commit: ci(ds): report visual diffs without blocking
- Review: after commit, run exactly one simplifier and one slice-reviewer in
  parallel; the slice crosses a CI and artifact boundary.

### S4 — Prove and activate the blocking gate later

- Route: main
- Do: after explicit authority for the required external CI work, obtain one
  report-only deliberate-diff artifact, then two clean report-only runs at the
  same exact SHA. Convert only the comparison gate to blocking, prove the same
  deliberate visual change fails and emits actual/diff artifacts, remove the
  deliberate change, and obtain a clean final-head run.
- Check: no retry-dependent pass, threshold, automatic baseline update, host
  baseline, image mismatch, or unexplained diff. If the two clean same-SHA
  runs cannot be obtained, remain report-only and keep the package draft.
- Commit: ci(ds): gate deterministic visual regressions
- Review: main verification plus the required risk review; integrated final
  review occurs only after the complete package is committed and verified.
- Authority: not authorized by this plan approval; requires a separate explicit
  push/CI or publication decision at the boundary.

## Verification and evidence

- Before S1: verify the live target ref, container digest, architecture, and
  clean worktree state.
- Before each slice commit: run the fastest relevant check, inspect the exact
  diff and staged content, and apply verification-before-completion.
- S1/S2: retain two local container run results and manually inspect every
  container-produced PNG.
- S3: retain the CI job URL, exact SHA, image digest, and actual/diff artifacts.
- S4: retain the deliberate failure, two clean same-SHA runs, blocking result,
  and clean final-head result.
- UI evidence must name the viewport, theme, story/state, image source
  container, and review outcome. No host-generated image is accepted.

## Progress

- Status: S3 report-only CI implemented and locally validated; the S4
  blocking-gate authority boundary is next.
- Completed: R0 live target resolved; S0 plan committed; S1 implementation,
  review, correction, and local determinism proof; S2 implementation and
  local determinism proof completed.
- Remaining: S4 conditional blocking proof, which is not authorized by this
  plan approval.
- Latest verified base: e40f4f5d06ea4f54c7b059dcc1eb13915fe9d9d9.
- Planning review: done —
  project/_local/reviews/2026-08-14-v5-visual-regression-planning.md
- S1 routing: configured executor returned BLOCKED before editing; the
  explicitly authorized Agy/Gemini fallback could not read files in headless
  mode, so the bounded implementation returned to main.
- S1 implementation: added the strict visual config, two-theme Button canary,
  exported Ladle story selector, package scripts, and the pinned AMD64
  container runner. The runner disables macOS AppleDouble sidecars with
  `COPYFILE_DISABLE=1` and fails closed for the UZH Source Sans 3 face.
- S1 evidence: pinned image
  `mcr.microsoft.com/playwright:v1.61.0-noble@sha256:111dde95859f2c659291cb60e698f9048a8fc30b35b4ddb7c90f9cb5b73062d9`
  reported `linux/amd64` and Node `v24.16.0`. Container baseline generation
  passed 2 tests and produced the neutral and UZH Button PNGs at the fixed
  1280x720 viewport. Two independent strict container comparison runs each
  passed both themes with zero diffs. The generated PNGs were manually
  inspected. Package typecheck and lint passed; package-scoped Prettier passed
  after formatting the two new files.
- S1 review: completed by one simplifier and one slice-reviewer. The
  slice-reviewer high-severity checkout-boundary finding and medium late-request
  assertion finding were corrected. The simplifier's two low-risk cleanup
  findings were accepted. Reports are retained under `project/_local/reviews/`.
- S1 correction evidence: the safe NUL-delimited Git source manifest archived
  489 entries with no env, credential, secret, key, certificate, dependency,
  build, report, or macOS sidecar entries. After correction, baseline
  generation and two independent strict container comparison runs again passed
  both themes with zero diffs. The pinned-container package typecheck, lint,
  and package-scoped Prettier check all passed.
- S1 correction commit: `a968debdf` (`fix(ds): harden visual runner input
  boundary`).
- S2 implementation: added the exact curated visual cases for disabled button,
  partial checkbox, open modal, shown tooltip, form error, text-field error,
  active navigation, sidebar state, alert variants, UserNotification error,
  and the ThemeExtensionContract synthetic ramp. The boundary covers ten
  neutral/UZH pairs plus one UZH synthetic-ramp case, uses page captures for
  portal states, unions multi-root story fragments for scoped captures, and
  keeps fixed time, font, motion, and external-request guards. The runner now
  copies every generated `*.spec.ts-snapshots` directory instead of assuming
  the S1 canary directory.
- S2 evidence: pinned container generation passed all 23 tests (the two S1
  canaries plus 21 curated cases). Two independent strict container comparison
  runs each passed all 23 tests with zero diffs and exit 0. The 21 new PNGs
  were generated at the fixed 1280x720 viewport where page-boundary cases
  apply; story-root cases retain their content dimensions. Every new PNG was
  manually inspected for the named story/state, neutral or UZH theme, and
  expected portal/error/contract content. The pinned-container typecheck,
  lint, package-scoped Prettier check, and runner shell syntax check passed.
- S2 exclusions: `tooltip--delay` was excluded because it only adds a fixed
  delay to the default tooltip; the loading-modal stories were excluded
  because their spinners remain animated under the fixed clock. Neither adds a
  distinct stable visual contract to this boundary.
- S2 review: the simplifier accepted one low-risk duplication cleanup for the
  repeated ordinary theme pair. The slice-reviewer accepted one low-risk plan
  progress correction for the stale pre-commit next-action text. Both reports
  are retained under `project/_local/reviews/`; the corrections are limited to
  those findings.
- S2 correction evidence: the ordinary theme pair is now defined once and
  reused across the ten ordinary cases. After the correction, the pinned
  container typecheck, lint, package-scoped Prettier check, and runner shell
  syntax check passed, and one strict container comparison passed all 23 tests
  with zero diffs and exit 0.
- S3 implementation: added a standalone `visual-regression` job in
  `.github/workflows/main.yml` that logs the pinned image and `linux/amd64`
  platform, invokes the existing deterministic runner with
  `continue-on-error: true`, and uploads SHA-qualified Playwright-report and
  test-results artifacts whenever the job is not cancelled. The job has
  `contents: read`, no dependency wiring into the existing build or publish
  jobs, and no trigger changes.
- S3 local evidence: the workflow parsed successfully with the repository's
  pinned `js-yaml@4.1.0`; all eight jobs were present and the existing build
  dependencies were unchanged. Workflow Prettier 3.6.2 and `git diff --check`
  passed. `actionlint` was unavailable locally, and no remote job URL or
  artifact exists because push/CI execution remains outside the current
  authority.
- S3 review: the slice-reviewer returned PASS. The simplifier accepted one
  low-risk cleanup for the job-local `contents: read` block duplicated by the
  workflow-wide least-privilege permission. The correction removes only that
  redundant block; both reports are retained under `project/_local/reviews/`.
- S3 correction evidence: after removing the redundant permission block, the
  workflow still passes YAML parsing, workflow Prettier, and `git diff
  --check`; the existing global `contents: read` permission remains in force.
- Integrated final review: the first package review found six bounded
  correction items; the correction pass is implemented and awaits the final
  re-review. The findings and local evidence are retained in
  `project/_local/reviews/2026-08-15-v5-visual-regression-final-review.md`.
- Final correction pass: fixed GNU tar option ordering for the pinned Linux
  runner, gated container export on test success, made host baseline
  replacement transactional with sibling staging and rollback-backed swaps,
  ran the container as the invoking UID/GID with writable Corepack paths,
  removed the curated test's duplicate synthetic-ramp stimulus so the story
  remains the source of truth, hid Ladle workbench chrome for every capture
  boundary, and moved shared visual setup guards into `visual/visual-setup.ts`.
- Final correction evidence: the pinned image generated all 23 snapshots
  successfully and produced no temporary runner directories; the post-
  correction strict comparison passed all 23 tests with zero diffs, and every
  regenerated PNG was manually inspected at the fixed viewport. The pinned
  container typecheck and lint passed before the formatting-only cleanup; the
  changed files now pass package-scoped Prettier, package checks and lint pass
  on the worktree, and the runner passes `bash -n`.
- Active children: none.
- Required delivery: local implementation plus report-only CI evidence.
- Achieved delivery: approved plan committed; S1 and S2 locally verified,
  reviewed, and correction-verified; S3 locally reviewed and
  correction-verified; final correction pass implemented; no external delivery
  performed.
- Next action: stop at the explicit S4 push/CI authority boundary.

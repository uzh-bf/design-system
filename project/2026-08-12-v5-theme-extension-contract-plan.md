# Plan — v5 theme extension contract

## Identity

- Date: 2026-08-12
- Status: implementation and proof correction pushed; the PR
  remains draft and publication boundary remains closed
- Repository: `/Users/rschlae/Git/df/design-system`
- Base and target: `v5` at `3bb6ade0e9b95061d4bbf79fc385253576ae7ad7`
- Branch: `rs/v5-theme-extension-contract`
- Worktree: `/Users/rschlae/Git/df/design-system/trees/rs-v5-theme-extension-contract`
- Delivery: draft PR #198 targets `v5`:
  <https://github.com/uzh-bf/design-system/pull/198>
- Roadmap: W1 in `project/2026-08-12-v5-ga-remaining-roadmap.md` on local branch
  `rs/v5-ga-remaining-roadmap`, frozen for this amendment at
  `39da9ab22692ec55bfb9983712ec12e053188249` with selected W1 contract
  `42b9b78b9942c043a5641307d481baa538d71d0fc195e4a275bcbd30de7d1f97`;
  that artifact is not part of PR #198
- Durable contract: [ADR 0003](../docs/adr/0003-uzh-primary-ramp-override-boundary.md)

## Progress

- Slice 0 — complete. The reviewed plan is committed as `ae9c31785`.
- Slice 1 — complete in commits `302e1070d` and `bcfddea0a`. The packed
  harness, named package script, CI invocation, and app-prefixed assertions are
  in scope.
- Evidence: the packed `./css` artifact was built, packed, extracted, and
  exercised in 4 document roots × 6 stylesheet cells. The focused command passed
  656/656 token assertions. Pre-Slice-2 evidence shows UZH light bridges resolve
  to generic root values and UZH dark bridges resolve to dark-axis values, while
  the five public ramp values and fixed-token sentinels remain stable.
- Test delta: added one packed computed-token contract, one package script, and
  one CI invocation; Slice 2 now adds the primary-ramp bridge assertions and
  the reproduced UZH source-order correction. Generic collisions remain
  consumer-owned, app-prefixed variables remain consumer-owned, and the full
  ramp changes only its five ramp values plus the six intended bridges.
- Slice 1 intermediate review: not required — this slice adds diagnostic
  test/CI plumbing and does not change the public runtime/theme behavior.
- Slice 1 simplifier: done — exact range `ae9c31785..302e1070d`; accepted two
  behavior-preserving reductions in the follow-up: removed redundant packed-CSS
  marker/hash preflight and removed pass-only per-token logging while retaining
  matrix headings, failure details, and aggregate counts.
- Slice 2 — complete in commit `9ba32c746`; the required intermediate review
  approved exact range `bcfddea0a..9ba32c746` with no findings, and the
  simplifier returned `KEEP` with no safe reduction. A fresh post-review packed
  run passed 656/656.
- Slice 3 — complete in commit `cce84b48d`, with follow-up `488a6acae`. Documentation now
  states CSS import order, document-root support, the five-variable ramp, six
  derived bridges, fixed-token ownership, app-prefix collisions, and
  nested/portal limits. The new `theme-extension-contract--default` Ladle
  fixture renders neutral, base UZH, and synthetic-ramp panels with Button,
  Badge, focused Input, and active/hover Sidebar controls. The focused native
  Playwright proof passed. `agent-browser` was not available in this host, so
  no agent-browser screenshot was captured.
- Slice 3 intermediate review: not required — the slice adds documentation and
  a focused rendered contract fixture without changing architecture, data flow,
  or the public token graph.
- Slice 3 simplifier: done — exact range `9ba32c746..cce84b48d`; `SIMPLIFY`, with
  the README duplicate ramp syntax reduced to a canonical migration-guide link.
- Slice 5 — complete and pushed. The obsolete v4 `:root` token and font overrides
  were removed from `.ladle/head.html`; the self-hosted-font comment now stands
  alone. The story exposes `theme-extension-contract--neutral`,
  `theme-extension-contract--uzh`, and `theme-extension-contract--synthetic-ramp`
  without any nested theme wrapper; the synthetic ramp is applied to
  `document.documentElement` by the story and cleaned up on unmount. The focused
  proof inspects the unmodified built page: it removes only the Ladle wrapper's
  competing theme markers, applies the theme and ramp on the document root, and asserts root tokens,
  Button/Badge primary consumption, the settled focus ring (the ring layer is
  `color-mix(in oklab, var(--ring) 50%, transparent)`, compared against the same
  mix resolved from the root token), the active Sidebar item's direct primary
  ramp utilities, and the hover Sidebar item's accent bridges. The packed
  harness gained `--primary-foreground` and
  `--sidebar-primary-foreground` sentinels (UZH literals match the minified
  `#fff` serialization) and durable contract language.
- Slice 5 verification: `build:ladle` passed and the built page is free of the
  removed overrides; the focused spec passed 3/3; `test:theme-contract` passed
  672/672; port 61011 was free before `CI=true PWTEST_SKIP_BUILD=1 test:fast`
  passed 1302/1302 on a fresh preview; `pnpm check`, `pnpm lint`, and
  `pnpm format:check` passed. Negative proof: disabling the document-root
  theme application fails the UZH and synthetic-ramp root-token assertions, and
  disabling the ramp application fails only the synthetic-ramp state; both
  restored before commit.
- Follow-up verification: the synthetic ramp was changed to WCAG-safe values after
  the full a11y sweep identified insufficient contrast in the first fixture; the
  focused UI test and both a11y theme runs then passed. The root Playwright config
  now excludes the isolated Next/RHF consumer, which owns its own server and
  config. The packed consumer's submission assertion still fails unchanged on
  both this branch and the `v5` base; it is a pre-existing RSC/W3 issue outside
  W1 and is not included in the theme package gate.
- Slice 4 — complete locally. `CI=true pnpm install --frozen-lockfile` passed.
  `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm build`, and
  `pnpm size:check` passed. The packed CSS harness passed 656/656 assertions.
  `pnpm --dir packages/design-system build:ladle` passed. With the isolated
  Next/RHF fixture excluded from the Ladle runner,
  `PWTEST_SKIP_BUILD=1 pnpm --dir packages/design-system test:fast` passed
  1294/1294 intended tests;
  focused UI, a11y, and smoke coverage passed as part of that run. Chromium
  required host access because the sandbox reports a macOS bootstrap permission
  error before browser launch. The independent `verify.sh` RSC consumer build
  completed but its existing submission assertion remained red on the base and
  W1 branch.
- Final review: correction review complete against
  `3bb6ade0e9b95061d4bbf79fc385253576ae7ad7..a07e2655a5ce53e34b6443b18918b704326a0453`.
  The final report is persisted at
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-integrated-final.md`.
- Post-push branch review: `code-review` found one standards cleanup and
  four specification-proof gaps at `36a1cb5ca`. The packed ownership contract
  remains accepted. The open correction must replace plan-codename comments
  with domain language, prove neutral, UZH, and synthetic-ramp rendered states
  at the document root, prove the focused shadow consumes the ramp-derived ring,
  and add fixed foreground sentinels for the two UZH values reasserted in
  `tailwind.css`. The duplicated ramp values remain intentional: the story owns
  the stimulus while the Playwright expectation remains an independent oracle.
- Slice 5 intermediate review: not required — proof-only correction; no
  architecture, security, data-integrity, or cross-system boundary changed.
- Slice 5 simplifier: done — exact range `9dd0b2668..fb402e4b1`; `SIMPLIFY`,
  with one accepted behavior-preserving reduction (the focus-ring oracle now
  resolves `var(--ring)` itself instead of reading a redundant probe field).
  Re-verified after the edit: focused spec 3/3, `pnpm check`, `pnpm lint`, and
  `pnpm format:check` passed. Report:
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-slice5-simplifier.md`.
- Remote evidence: draft PR #198 targets `v5` at the latest pushed branch head
  and is mergeable. The latest exact-head CI passed lint, formatting, types,
  tests, four accessibility shards, and Build; Build & Deploy passed with
  deployment skipped. Vercel and Greptile passed. The verified local
  screenshot set is under `project/_local/screenshots/theme-extension-contract/`
  and remains ignored as local visual evidence; no GitHub attachment is
  required before readiness.

## Goal

Establish and verify the document-root UZH theme's complete consumer-owned
primary-ramp override contract. The design system must derive its primary,
focus-ring, and sidebar bridges from the five-step ramp while secondary, status,
destructive, font, chart, and other UZH tokens remain design-system-owned.

## Non-goals and authority

- Do not add Klicker colours, a Klicker export, or a package-owned consumer
  profile.
- Do not derive missing ramp steps from one colour.
- Do not expand support to arbitrary nested themes or portal containers. The
  supported proof is document-root theming, including the existing light/dark
  axis.
- Do not rename generic application tokens. Consumer semantic variables must be
  app-prefixed so they cannot collide with design-system or shadcn bridge names.
- Do not change unrelated UZH tokens or correct unreproduced CSS behaviour.
- Do not publish, push, create/update a PR, change readiness, merge, tag,
  deliver to consumers, deploy, or promote GA.

This plan authorizes local implementation, verification, review artifacts, and
commits on the named branch only. The roadmap's separate authority gates remain
in force.

## Decisions and assumptions

- ADR 0003 is binding. The six bridge mappings are implementation obligations,
  not conditional on discovering a source-order defect:
  - `--primary`, `--ring`, `--sidebar-primary`, and `--sidebar-ring` derive from
    `--theme-color-primary`.
  - `--sidebar-accent` derives from `--theme-color-primary-20`.
  - `--sidebar-accent-foreground` derives from `--theme-color-primary`.
- The supported consumer order is the design-system stylesheet first, then the
  consumer's complete five-step UZH primary-ramp override. A generic consumer
  declaration of `--primary`, `--accent`, or `--destructive` is collision
  evidence, not a supported branding contract.
- The existing package's `./css` export is the packed artifact under test. The
  test harness must load that artifact, not source CSS or a workspace alias.
- The existing Ladle/Playwright path is the browser validation path. The packed
  token harness is independent of Ladle so computed-token ownership is tested
  against what a consumer installs.

## Research and current evidence

The planning review inspected the live worktree, W1, CONTEXT.md, ADR 0003,
theme sources, package scripts, CI, Ladle helpers, and packed-consumer fixtures.
The review returned `DONE_WITH_CONCERNS`; its corrections are incorporated here.

Relevant current seams:

- `packages/design-system/src/themes.css` declares neutral and UZH theme
  variables and currently hardcodes the UZH bridge values.
- `packages/design-system/src/tailwind.css` exposes the five public
  `primary-*` utility steps and redeclares generic and dark-axis bridge tokens.
- `packages/design-system/src/ui/button.tsx`, `ui/badge.tsx`, `ui/input.tsx`,
  and `ui/sidebar.tsx` exercise the primary, accent, destructive, ring, and
  sidebar paths.
- `packages/design-system/tests/_support/ladle.ts` enumerates themes and waits
  for rendered story content; it is the existing empty-page-safe browser seam.
- `packages/design-system/tests/rsc/packed-consumers` proves packed exports but
  has no browser-computed CSS assertions.
- `.github/workflows/main.yml` currently runs smoke and a11y jobs but has no
  named packed theme-contract invocation.

Limitations: the review was read-only and did not run the package because the
roadmap worktree has no installed dependencies or build output. The compiled
cascade, especially the interaction between the UZH block and the later dark
block, remains to be established by the packed harness.

Planning review report:
`project/_local/reviews/2026-08-12-v5-theme-extension-contract-planning.md`.

## Test portfolio

| Risk or behavior                                               | Obligation                                    | Primary seam                                                  | Distinct failure caught                                                                      | Owning slice |
| -------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------ |
| Consumer namespace collision is distinguished from a DS defect | Add new packed contract                       | Synthetic consumer CSS loaded in both orders                  | Generic `--primary`/`--accent`/`--destructive` collision is wrongly treated as a DS fix      | 1            |
| Complete ramp reaches every public bridge                      | Add new packed contract                       | Computed style on document root                               | One of five `--theme-color-primary*`, five `--color-primary-*`, or six bridges remains fixed | 2            |
| Fixed UZH tokens stay fixed                                    | Extend the same packed contract               | Before/after computed-token sentinel comparison               | Secondary, status, destructive, font, chart, or other UZH token leaks from the consumer ramp | 2            |
| Dark axis preserves the contract                               | Extend the same packed contract               | `html.dark[data-theme="uzh"]` and neutral-dark document roots | Later `.dark` declarations defeat the ramp or change neutral behavior                        | 1–2          |
| Rendered components consume the contract                       | Add focused browser proof                     | Ladle Button, Badge, focus, and Sidebar states                | UI state does not follow computed bridge tokens                                              | 3            |
| Existing themes remain stable                                  | Extend existing package checks and theme runs | Fresh Ladle build, smoke, a11y, package gates                 | Neutral or base UZH regression                                                               | 4            |

No separate unit test is planned: the consequential seam is the packed browser
cascade and the rendered component states.

## Slices

### Slice 0 — Commit the executable plan

- Route: main session; budget skip reason: public theme-boundary design and
  critical-path coupling require orchestration.
- Paths: `project/2026-08-12-v5-theme-extension-contract-plan.md` only.
- Acceptance: the plan contains the reviewed W1 contract, exact branch/worktree
  and base, test portfolio, route/acceptance/path/commit fields for each slice,
  browser path, stop conditions, and finish-review preflight.
- Verification: `git diff --check`, Prettier on the plan, and staged data-hygiene
  review.
- Commit: `docs(project): add theme extension contract plan`.

### Slice 1 — Establish the packed CSS ownership tracer

- Route: configured `budget-worker` for the bounded harness; main session owns
  interpretation and integration. No sensitive data or external provider input
  is permitted.
- Paths: `packages/design-system/tests/theme-contract/verify-packed-css.mjs`,
  `packages/design-system/package.json`, `.github/workflows/main.yml`, and
  focused fixture files only if the harness requires them.
- Outcome: build and pack the package, extract the packed `./css` artifact,
  launch the installed Playwright Chromium without Ladle, and inspect computed
  styles from a minimal HTML page. Exercise neutral, UZH, neutral-dark, and
  UZH-dark document roots in both stylesheet orders.
- Matrix: DS CSS then generic consumer CSS; generic consumer CSS then DS CSS;
  app-prefixed control in both orders; complete synthetic ramp after DS CSS.
- Assertions: record the five `--theme-color-primary*` values, five public
  `--color-primary-*` values, `--primary`, `--ring`, `--sidebar-primary`,
  `--sidebar-ring`, `--sidebar-accent`, `--sidebar-accent-foreground`,
  `--accent`, and `--destructive`. Include explicit fixed-token sentinels for
  secondary, status, destructive, font, chart, and other UZH values.
- Acceptance: `pnpm --dir packages/design-system test:theme-contract` is a
  named green command that proves the packed artifact is the source under test,
  emits the matrix/ownership evidence, and fails if the expected computed
  contract changes. Do not commit a deliberately red test.
- CI: invoke the named command from the existing CI test job after dependency
  and browser setup; do not rely on `test:fast` to discover it implicitly.
- Commit: `test(theme): reproduce packed CSS ownership`.
- Stop: the packed export is not the tested artifact, Chromium cannot run in the
  supported CI path, ownership remains ambiguous, or a new dependency is needed.

### Slice 2 — Implement the complete primary-ramp bridges

- Route: main session; this changes a public architecture/theme boundary.
- Paths: `packages/design-system/src/themes.css`, and
  `packages/design-system/src/tailwind.css` only when packed evidence proves a
  dark-axis or layer correction is required; extend the packed contract.
- Outcome: make the six ADR-required bridge mappings ramp-derived. Preserve the
  existing five-step `--theme-color-primary*` and `--color-primary-*` graph.
  Correct additional source-order behavior only when Slice 1 reproduces it as
  a design-system defect.
- Acceptance: a synthetic non-UZH complete ramp propagates through all five
  theme values, all five public utility values, and all six bridges in light and
  dark UZH. Neutral and base UZH values remain unchanged when no consumer
  override is present. Fixed-token sentinels remain unchanged before/after the
  override. Reverting the relevant bridge change makes the contract assertion
  fail.
- Review: this is a substantive public trust-boundary slice. After committing,
  run exactly one `intermediate-reviewer` and one `simplifier` in parallel on
  the immutable slice range, then verify and disposition both reports before
  continuing.
- Commit: `enhance(theme): support complete primary ramp overrides`.
- Stop: nested-theme or portal support becomes necessary, actual brand values
  are required, neutral/base UZH changes cannot be isolated, or the fix changes
  tokens outside ADR 0003.

### Slice 3 — Document and prove rendered component states

- Route: configured `budget-worker` for bounded documentation/story scaffolding;
  main session verifies the resulting diff and browser behavior.
- Paths: `packages/design-system/README.md`,
  `packages/design-system/MIGRATION.md`, comments in
  `packages/design-system/src/themes.css`, a focused theme-contract story or
  fixture, and `packages/design-system/tests/contracts/theme-extension-ui.spec.ts`
  if a new Ladle contract is needed.
- Outcome: document DS-first/consumer-after CSS order, document-root support,
  app-prefixed semantic variables, the exact five-variable override syntax,
  fixed-token boundaries, and the lack of a nested/portal guarantee. Add
  rendered proof for Button, Badge, focus/ring, and active/hover Sidebar states
  under neutral, base UZH, and the synthetic ramp.
- Acceptance: a fresh Ladle build and focused browser test show the rendered
  states consume the expected computed tokens. Capture screenshots at
  1280×900 through `agent-browser` against the local Ladle URL when the browser
  path is available; keep evidence under the ignored local project artifacts
  directory and never commit generated screenshots unless the final PR policy
  explicitly requires them.
- Commit: `docs(theme): document primary ramp extension contract`.

### Slice 4 — Integrated verification and final review

- Route: main session.
- Acceptance commands, from the W1 worktree after a frozen install:

  ```sh
  pnpm install --frozen-lockfile
  pnpm check
  pnpm lint
  pnpm format:check
  pnpm build
  pnpm size:check
  pnpm --dir packages/design-system test:theme-contract
  pnpm --dir packages/design-system build:ladle
  pnpm --dir packages/design-system test:fast
  ```

  Run focused UI tests and the relevant a11y/smoke checks as part of the fresh
  Ladle proof. Record any host-browser limitation exactly; it is not equivalent
  to a passed browser gate.

- Verify the exact diff, packed artifact, CI wiring, plan progress, fixed-token
  sentinels, and data hygiene. Commit any final progress/evidence update with a
  conventional message.
- Final review: after the complete branch is committed and freshly verified,
  run one integrated-final capable review covering correctness, plan
  compliance, maintainability, security, and architecture. Parent preflight
  must include `gate=integrated-final`,
  `package_key=v5-theme-extension-contract`, a sanitized scope key, exact
  paths, exact base-to-head identity, `attempt=initial`, all applicable lenses,
  and intermediate-review report paths or justified skip reasons. Budget one
  initial review and at most one correction review for this package.
- Stop before presenting completion if any required reviewer is unavailable,
  a fixed-token or dark-axis assertion fails, browser evidence is missing where
  applicable, or any publish/PR/deployment authority would be needed.

### Slice 5 — Close branch-review proof gaps

- Route: resume existing delegated task
  `019ff6e6-f4b9-7842-9883-e63f8e71be44` as the sole writer for the bounded
  correction. Do not create a replacement executor or edit overlapping W1 paths
  in the main session before terminal handback. The main session owns
  verification, integration, and review disposition.
- Paths: `packages/design-system/src/ThemeExtensionContract.stories.tsx`,
  `packages/design-system/tests/contracts/theme-extension-ui.spec.ts`,
  `packages/design-system/tests/theme-contract/verify-packed-css.mjs`,
  `packages/design-system/.ladle/head.html`, and this progress section only.
- Outcome: expose final story IDs `theme-extension-contract--neutral`,
  `theme-extension-contract--uzh`, and
  `theme-extension-contract--synthetic-ramp`. Have the focused test set
  `data-theme`, the optional synthetic ramp, and the dark axis directly on
  `document.documentElement` before styles are read. The story must not add a
  competing nested theme wrapper. For every state, record the expected root
  `--primary`, `--ring`, `--sidebar-accent`, and
  `--sidebar-accent-foreground` values; assert Button and Badge backgrounds
  consume `--primary`, the focused Input shadow contains the resolved `--ring`
  colour, and active/hover Sidebar backgrounds and foregrounds consume the two
  sidebar accent values.
  Add fixed sentinels for `--primary-foreground` and
  `--sidebar-primary-foreground`, and replace “Slice 1/2” comments with durable
  packed-contract language. Remove the obsolete v4 `:root` token and font
  overrides from `.ladle/head.html`: Ladle currently injects that block after
  the v5 stylesheet, so its orange ramp masks both neutral and UZH
  document-root states. The focused test must inspect the unmodified built page,
  not delete or neutralize preview CSS at runtime.
- Acceptance: a fresh Ladle build plus the focused UI test proves all three
  document-root states; `test:theme-contract` passes with the extra sentinels;
  port 61011 is free after the fresh build, then
  `CI=true PWTEST_SKIP_BUILD=1 pnpm --dir packages/design-system test:fast`
  passes so Playwright cannot reuse a stale preview and no story or
  accessibility path silently depended on the obsolete overrides;
  `pnpm check`, `pnpm lint`, and `pnpm format:check` pass; exact-head CI reruns
  after push. Reverting the document-root setup or ramp bridge makes the focused
  proof fail.
- Review: this corrects tests and fixture shape without changing runtime CSS or
  the public contract. Main-session verification closes the exact proof-only
  findings. If runtime CSS or the public contract changes, stop for package-scope,
  risk, and review-budget reassessment; do not dispatch a third integrated-final
  review automatically. The story/test rewrite is substantive; after the
  correction commit, run exactly one configured simplifier on the immutable
  commit or range and disposition its result before coordinator acceptance.
- Commit: `test(theme): prove document-root extension states`.
- Stop: the correction needs nested or portal support, changes runtime CSS,
  removing the obsolete Ladle override exposes a component/runtime regression
  rather than fixture debt, or neutral/base UZH cannot be proved without
  weakening the synthetic-ramp oracle.

## Review and simplification records

- Planning review: done —
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-planning.md`.
- Adaptation planning review: done — exact W1 draft
  `a4f84f10c8da2cc61ff3c4c30efecb1283d11da1a132c6ecc625f531417f27be`
  and roadmap draft
  `97bfd12144a5325aa440545426264b76d58810eeb5dd2a236b012c49b7ba73a3`
  were reviewed; seven findings were then incorporated and verified in the
  follow-up drafts. The report is persisted at
  `project/_local/reviews/2026-08-12-v5-ga-roadmap-w1-review-adaptation-planning.md`.
- Slice 5 amendment planning review: done — exact combined draft identity
  `draft:7aafcc83d27cbe0605f7a49857d50e935a2a92d1dfc9b8260b00a2160f18c68b`
  received `DONE_WITH_CONCERNS`; all four findings are incorporated. Report:
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-slice5-amendment-planning.md`.
- Slice 1 intermediate review: not required — diagnostic harness and CI wiring
  are reviewed through main-session verification unless the implementation adds
  a new trust-boundary behavior.
- Slice 1 simplifier: not required — record after the committed range is
  classified; generated/fixture-only changes may be trivial.
- Slice 2 intermediate review: required — public theme trust boundary.
- Slice 2 simplifier: done — exact range `bcfddea0a..9ba32c746`; `KEEP`, with no
  safe behavior-preserving reduction.
- Slice 3 intermediate review: not required — documentation and focused Ladle
  fixture only; no architecture, security, data-integrity, or cross-system
  boundary changed.
- Slice 3 simplifier: done — exact range `9ba32c746..cce84b48d`; the accepted
  reduction is recorded above.
- Integrated final review: complete — correction review covered the exact range
  above; the final report is persisted under `project/_local/reviews/`.
- Post-push Standards review: closed locally by Slice 5 — plan-codename comments
  were replaced with durable contract language. The duplicated ramp literals
  remain accepted as independent stimulus and oracle. Exact-head CI was rerun
  after the authorized push and is green.
  Report:
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-standards-review.md`.
- Post-push Spec review: closed locally by Slice 5 — the document-root,
  neutral/base UZH, fixed-foreground sentinel, and focused-ring consumption
  findings now have passing focused and full-suite proof. Exact-head CI was
  rerun after the authorized push and is green.
  Report:
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-spec-review.md`.

## Stop conditions

Stop and report the exact evidence if:

- the base or target branch differs from this plan;
- CSS ownership cannot be isolated with packed computed styles;
- a change needs nested-theme/portal support, actual brand values, or a new
  package export;
- generic consumer collisions are mistaken for a design-system defect;
- neutral, base UZH, dark-axis, fixed-token, a11y, size, or package checks drift;
- the browser cannot run in the required environment and no equivalent CI proof
  exists; or
- the next action would be PR readiness, merge, tag, publication, consumer
  delivery, deployment, or GA promotion.

## Next steps

The corrected head is pushed to draft PR #198, and exact-head CI is green. The
ignored desktop and narrow-viewport screenshot set is retained as local visual
evidence. Request separate readiness authority when the maintainer is ready;
merge, tag, publication, consumer delivery, deployment, and GA promotion remain
separate explicit authority gates.

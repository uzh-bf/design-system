# Plan — v5 theme extension contract

## Identity

- Date: 2026-08-12
- Status: approved; implementation not started
- Repository: `/Users/rschlae/Git/df/design-system`
- Base and target: `v5` at `3bb6ade0e9b95061d4bbf79fc385253576ae7ad7`
- Branch: `rs/v5-theme-extension-contract`
- Worktree: `/Users/rschlae/Git/df/design-system/trees/rs-v5-theme-extension-contract`
- Delivery: one full-path Design System PR; no PR exists yet
- Roadmap: [remaining v5 GA work](./2026-08-12-v5-ga-remaining-roadmap.md), W1
- Durable contract: [ADR 0003](../docs/adr/0003-uzh-primary-ramp-override-boundary.md)

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

## Review and simplification records

- Planning review: done —
  `project/_local/reviews/2026-08-12-v5-theme-extension-contract-planning.md`.
- Slice 1 intermediate review: not required — diagnostic harness and CI wiring
  are reviewed through main-session verification unless the implementation adds
  a new trust-boundary behavior.
- Slice 1 simplifier: not required — record after the committed range is
  classified; generated/fixture-only changes may be trivial.
- Slice 2 intermediate review: required — public theme trust boundary.
- Slice 2 simplifier: required if the committed code/test range is substantive;
  otherwise record the evidence-backed skip.
- Integrated final review: required before any PR update or completion claim.

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
- the next action would be push, PR, readiness, merge, tag, publication,
  consumer delivery, deployment, or GA promotion.

## Next steps

Commit Slice 0 in the W1 worktree, then execute Slice 1 as the packed CSS
ownership tracer. Keep the roadmap worktree and primary checkout unchanged.

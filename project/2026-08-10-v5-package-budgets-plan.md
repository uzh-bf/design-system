# Plan — v5 package-size budgets

Status: Slice 3 complete; integrated close-out pending
Date: 2026-08-10
Branch: `rs/v5-package-budgets`
Target: `v5`
Worktree: `/Users/rschlae/Git/df/design-system/trees/rs-v5-package-budgets`
Parent roadmap: `project/2026-08-10-v5-ga-readiness-roadmap.md`
Related merged PR: [#195](https://github.com/uzh-bf/design-system/pull/195)

## Goal

Make the v5 public package's built import seams fail CI when a generic import
regresses into the heavy date, chart, or carousel graph, or when the shipped
CSS grows beyond the measured budget. Preserve positive controls so the budget
does not pass because a heavy component silently disappeared.

## Non-goals

- No source-component rewrite, export-map change, RSC decision, theme change,
  consumer migration, dependency upgrade, package version change, tag, npm
  publication, deployment, or merge beyond this package PR.
- No total-tarball-only gate. The tarball remains diagnostic evidence, not the
  primary contract.
- No broad bundle optimization or new public subpath. W3's measured module
  boundaries remain the implementation baseline.
- No legacy v4 package budgets; P1 covers the v5 `@uzh-bf/design-system`
  package only.

## Research

Questions:

1. Can the installed Size Limit 11.2.0 preset measure the packed public
   `.`/`./primitives` import seams and CSS files without a browser-running time
   plugin? — main session, verified from installed types and plugin source.
2. What are the current post-alpha.3 built-package measurements? — main
   session, clean build and pack.
3. Does the current Vite preserve-modules output keep the W3 generic/positive
   control contract? — implementation slice, packed consumer checks.

Evidence:

- Root `package.json` already installs `size-limit` and
  `@size-limit/preset-big-lib`, but has no configuration or script.
- The only v5 public package is `packages/design-system`; its public exports
  are `.`, `./primitives`, `./css`, `./preflight.css`, and `./package.json`.
- The current build uses Vite/Rollup `preserveModules`, externalizes declared
  runtime dependencies, and emits the final artifacts under `dist/`.
- Fresh build on merged `v5` commit `70eb98a9a25590b2f8215f41223c1233d7b23777`
  succeeded. `pnpm pack` produced a 440,012-byte alpha.3 tarball.
- Deterministic Brotli q11 baselines after the complete build are:
  root `Button` 27,149 bytes; primitives `Button` 9,619; design-system CSS
  24,802; preflight CSS 2,333; Calendar 27,674; Chart 28,104; Carousel 14,398.
- Historical W3 Vite/Rollup evidence remains the cross-check: root `Button`
  229,226 emitted bytes, primitives `Button` 116,588, with zero date/chart/
  carousel bytes in generic fixtures and retained positive controls.
- Installed Size Limit's default preset includes a time plugin that launches a
  browser. Every check must set `running: false`; CSS checks must set
  `webpack: false`. The committed CommonJS `.size-limit.cjs` avoids a
  module-type warning in the private root package, and every invocation passes
  `--config .size-limit.cjs` explicitly so a stale or temporary config cannot
  shadow the release gate.

## Package boundary and ceremony

- One full-path PR from merged `v5`, not a stack. The roadmap explicitly makes
  P1 one package-level PR; the files form one independently testable budget
  contract and CI gate.
- Expected substantive scope: root config/script plus CI wiring, above the
  packaging floor. The plan file ships with this implementation PR, not alone.
- No intermediate reviewer is required for the initial implementation unless
  the change adds a new dependency, changes the public package contract, or
  introduces a security/data-integrity seam. The main session owns threshold
  selection and verifies the exact built/packed behavior.
- The integrated final outcome requires separate capable security,
  maintainability, and final-outcome review before the PR is marked ready.

## Decision proposal

Use the installed Size Limit preset as the stable upper-budget seam and a
small Node script for positive-control lower bounds and output validation.

`.size-limit.cjs` will measure these named checks after the package build using
deterministic Brotli compression:

| Check                     |  Current | Proposed initial cap | Rationale                                                |
| ------------------------- | -------: | -------------------: | -------------------------------------------------------- |
| root `Button`             | 27,149 B |                32 kB | ~18% headroom for harmless implementation drift          |
| `./primitives` `Button`   |  9,619 B |                12 kB | ~25% headroom                                            |
| design-system CSS         | 24,802 B |                30 kB | ~21% headroom                                            |
| preflight CSS             |  2,333 B |                 3 kB | ~29% headroom                                            |
| Calendar positive control | 27,674 B |                33 kB | retains the current control while allowing small changes |
| Chart positive control    | 28,104 B |                34 kB | retains the current control while allowing small changes |
| Carousel positive control | 14,398 B |                18 kB | retains the current control while allowing small changes |

The implementation must confirm these caps against a clean baseline. If the
planning review or a clean two-run measurement shows that a cap is not stable,
adjust it before committing the configuration and record the measured reason.

The root `size:check` script will run Size Limit after `build`. A companion
`scripts/check-package-size.mjs` will invoke
`pnpm exec size-limit --config .size-limit.cjs --json`, parse the JSON result,
require every named check to pass, and enforce exact conservative lower bounds
for positive controls so an accidental removal cannot make the gate pass by
shrinking the component. The lower bounds are Calendar 25 kB, Chart 25 kB, and
Carousel 13 kB; each is below the current stable baseline but above a 10%
shrink. The script will also run the W3 consumer-marker checks against
the full Webpack stats/module graph for each named import. Generic Button
graphs must contain no date/chart/carousel modules, while Calendar, Chart, and
Carousel must retain their corresponding resolved dependency identities. The
check filters to emitted modules (`orphan: false` or a non-empty chunk list),
so unused modules reachable through a barrel do not fail the generic contract.
It will fail closed on missing checks, malformed output, absent `dist/` files,
an unexpectedly changed check name, or missing graph evidence. Temporary
config, stats, and bundle directories live under `/private/tmp` and are
removed by the script.

The CI `Build` job will run `pnpm run size:check` after its Node 22 package
build and before `Publish`; branch pushes still run `Build` and skip only
`Publish`. The privileged `Publish` job will run the same size gate again after
its independent Node 24 package build, so the exact artifact being published
has fresh size and marker evidence. The existing `Publish -> Build` dependency
remains the publication gate.

## Test portfolio

| Risk                                                    | Existing protection                  | Test obligation                                                                              | Primary seam                                     | Distinct failure caught                                     | Owner |
| ------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- | ----- |
| Generic root import absorbs date/chart/carousel graph   | W3 consumer measurements             | Add new                                                                                      | Size Limit root `Button` and primitives `Button` | Generic import crosses the selected cap                     | P1    |
| CSS/preflight grows silently                            | W3 final CSS bytes                   | Add new                                                                                      | Size Limit file checks                           | Theme or preflight change exceeds cap                       | P1    |
| Positive control disappears or loses its intended graph | W3 retained positive controls        | Add new                                                                                      | Positive-control Size Limit lower bounds         | Calendar/Chart/Carousel becomes an inert or incomplete stub | P1    |
| Gate runs before build or is bypassed                   | Existing CI `Build -> Publish` graph | Extend existing                                                                              | CI Build job                                     | Publish proceeds without fresh size evidence                | P1    |
| Packaged public exports drift                           | W3 packed export proof               | Extend existing evidence; no separate permanent test unless the implementation exposes a gap | `pnpm pack` and export-resolution fixture        | Budget passes on an unpacked-only artifact                  | P1    |

## Slices

### Slice 1 — plan and baseline contract

Files: `project/2026-08-10-v5-package-budgets-plan.md`.

Problem: P1 has an approved roadmap item but no executable package plan.

Evidence: The clean post-merge baseline and installed Size Limit behavior are
recorded above.

Do: Commit this plan as the first commit after the planning-stage review. Keep
thresholds and the no-new-dependency boundary explicit.

Check: Review the exact plan against the roadmap, current v5 tree, and package
boundary. No implementation files in this commit.

Commit: `docs(project): plan v5 package-size budgets`.

Stop: Planning review identifies a public-contract change, unstable baseline,
or need for a different measurement seam.

### Slice 2 — enforce built-package budgets

Files: `.size-limit.cjs`, `scripts/check-package-size.mjs`, root `package.json`.

Problem: Size Limit is inert and the current package baseline is not enforced.

Do: Add the named checks, disable browser-time measurement, add the root
`size:check` command, and add the fail-closed JSON/lower-bound validator. Keep
the generated `dist/` and tarball outside Git.

Check:

- Clean package build succeeds, then `pnpm run size:check` passes.
- A temporary lower cap in `/private/tmp` fails the command.
- Removing or renaming a positive-control result fails the validator.
- Packed `.`, `./primitives`, CSS, preflight, and package metadata remain
  resolvable; tarball contents and public version do not change.
- Two identical clean runs produce the same named results and sizes.

Test obligation: add the package budget contract; no browser test file.

Commit: `build(size): enforce v5 package budgets`.

Stop: Any cap is chosen from an unrepeatable run, Size Limit launches a browser,
the generic seam retains an unexpected heavy contribution, or packed exports
fail.

### Slice 3 — wire CI publication prerequisite

Files: `.github/workflows/main.yml`.

Problem: Local budgets do not protect the release build.

Do: Run the existing build first, then `pnpm run size:check` in the ordinary
`Build` job and again after the independent Node 24 build in `Publish`.
Preserve the existing job names, permissions, tag guard, and `Publish`
dependency. Do not add a tag, publication path, or deployment.

Check: YAML parse, structural workflow inspection, branch CI with Build passing
and Publish skipped on an ordinary branch push, and a tag-path dry structural
check showing both Build and Publish run the size gate with Publish still
depending on Build.

Test obligation: extend existing CI evidence; no new workflow test file.

Commit: `ci(size): gate release build on package budgets`.

Stop: CI starts size checking before build, changes release permissions, or
creates a second publication authority path.

### Slice 4 — integrated close-out

Do: Run the full repository-native checks required by the changed files, inspect
the staged diff for secrets/PII, update this plan's `Progress`, commit the
evidence, and run required final reviews on the exact range. Prepare the whole-
branch PR description locally; do not push or update a PR without a separate
authorization.

Check: clean worktree; package build and size gate; root lint, formatting, and
type checks; workflow YAML/structural checks; `git diff --check`; required
reviews pass; any future PR remains draft until separately authorized.

Commit: `docs(project): record v5 package-budget evidence`.

Stop: Missing review, unexplained baseline drift, unrelated changes, or any
request to publish/deploy/merge outside the explicit authority gate.

## Authority boundary

This goal authorizes implementation and local commits for P1. It does not by
itself authorize pushing a branch, creating or updating a PR, marking a PR
ready, merging, creating a candidate alpha, publishing to npm/GitHub Packages,
deploying, migrating consumers, or promoting GA. Those remain separate gates
in the parent roadmap and require explicit authorization at the relevant
boundary.

## Planning-stage specialist

The read-only capable planner returned `CHANGES_REQUIRED`. The main session
accepted and incorporated all findings: explicit config selection,
positive-control lower bounds plus W3 marker checks, a second Node 24 gate in
Publish, correction of branch-push Build behavior, and removal of unsupported
push/PR authority from this plan.

## Progress

- P0 Trusted Publisher PR #195 is merged as squash commit
  `70eb98a9a25590b2f8215f41223c1233d7b23777`.
- Clean P1 branch created from merged `v5`; frozen install and complete package
  build pass.
- Fresh Size Limit baseline recorded; threshold decision reviewed and accepted
  with the recorded lower bounds and marker checks.
- Planning review completed with corrections incorporated in this draft.
- The temporary `.size-limit.js` experiment was removed.
- The first Slice 2 gate run exposed that Webpack removes the literal Embla
  package name. The validator now inspects emitted Webpack module identities,
  including the resolved Embla modules, while retaining the W3 dependency
  markers for all controls.
- Slice 2 is complete: `.size-limit.cjs`, `scripts/check-package-size.mjs`,
  and the root `size:check` script pass the clean baseline; the temporary
  lower-cap run fails as expected; packed exports resolve; and the W3 marker
  checks pass. Test delta: two implementation files added, one package script
  changed, no browser test file added.
- Slice 3 is complete: both Build and Publish contain the size gate after their
  package builds; YAML parsing and structural job inspection pass; and the
  exact package build plus `pnpm run size:check` pass locally. `actionlint` is
  unavailable. A repository-wide Turbo build remains outside this workflow's
  package-only release path and failed only in legacy Parcel header/tag builds
  on the known LMDB sandbox limitation.
- The maintainability review required the graph assertions to use emitted module
  identities and the canonical Size Limit import contracts; the validator now
  does both and its focused gate passes. A second review also required the
  complete seven-check inventory to remain independent of the config under
  test; that inventory is now explicit.
- Next: verify and commit the independent inventory, then perform the required
  final reviews on the exact branch range.

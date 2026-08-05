# Plan — v5 prototype readiness across consuming apps

## Identity and status

- Date: 2026-08-05
- Repository: `/Users/rschlae/Git/df/design-system`
- Base: `origin/v5` at `4627432709ab91aaf29c1c5129a9a79b5ab74246`, including the merged W3 bundle-boundary change.
- Working branch: `rs/v5-prototype-readiness`
- Working tree: `/Users/rschlae/Git/df/design-system/trees/rs-v5-prototype-readiness`
- Audience: maintainers of the design system and the first application teams adopting v5.
- Status: approved roadmap; W1 is in progress. W2 and W3 are dependent consumer work packages.
- Planning review: the requested read-only Sol planning pass was attempted once but the model stream disconnected before returning a report. The scope was then explicitly approved by the user. This missing independent report remains a review limitation; no publication or PR-ready claim is made here on that basis.

## How to work

- Keep the v5 public contract unchanged: root composites, `/primitives`, `/css`, and `/preflight.css`. Do not restore `/ui` or `/forms` aliases, add compatibility exports, or redesign component APIs for these pilots.
- W1 is one normal design-system release-preparation PR. W2 and W3 are separate consumer PRs in their owning repositories, not layers in a cross-repository stack.
- Start every implementation surface from its current remote base. Preserve dirty or unrelated worktrees; do not rebase them silently.
- W1 may prepare a prerelease artifact, but npm publication and any later `latest` or GA promotion remain separately authorized actions.
- For W2 and W3, use the real application dev/build paths and browser validation with `agent-browser`; record the local preview URL and the exact verification commands in each consumer plan.
- Do not widen the work because a pilot exposes an unrelated component or product issue. Record it as a follow-up and fix only shared v5 blockers in the design-system scope.

## Current state and evidence

- PR #192 is merged into `v5` as `4627432709ab91aaf29c1c5129a9a79b5ab74246`. Required build, lint, type, formatting, test, accessibility, publish, and preview checks were green at merge.
- The merged package source is still version `5.0.0-alpha.1`, but its exports are now only `.`, `./primitives`, `./css`, `./preflight.css`, and `./package.json`. The package ships `dist` and `MIGRATION.md`, not source files.
- The live npm `alpha` dist-tag remains `5.0.0-alpha.1`, while `latest` remains `4.1.6`. That registry artifact predates the merged W3 contract and still exposes the older consumer surface.
- VetSim is pinned to `5.0.0-alpha.1`, already imports the compiled design-system CSS, and already sets the UZH theme at the document root. Two components still import `Badge` and `Button` from the removed `/ui` subpath; this makes VetSim the smallest useful first consumer pilot.
- GBL `apps/demo-game` remains on `4.1.6`, React 19, Next 16, and Tailwind 4. Its Next configuration contains v4-era development transpilation and React-deduplication workarounds. It is the second pilot for published-package, dev/prod, and React singleton behavior.
- Thesis Platform, Careers, and Klicker remain v4 consumers with old package-source scans and/or removed font variables. They are migration waves after prototype readiness, not prerequisites for the first two pilots.

## Non-negotiables

- The current package contract remains the source of truth.
- The compiled CSS import is required; consumer Tailwind source scanning of `@uzh-bf/design-system/src` is not a v5 compatibility path.
- UZH applications must explicitly select `data-theme="uzh"` at the document root or use the documented provider contract.
- React and React DOM remain peers; a pilot must prove that the application resolves one runtime copy in the browser bundle.
- No alpha publication, tag, production deployment, or GA/latest promotion is implied by a green local check.
- No broad application migration begins until the two pilot outcomes are recorded.

## Known traps

| Symptom | Cause | Remedy |
| --- | --- | --- |
| An app installs `5.0.0-alpha.1` but resolves `/ui` successfully | The registry alpha is older than the merged source | Read back npm metadata and every supported/removed export before consumer testing |
| Next development works only with `transpilePackages` | The app is consuming a v4/source-oriented condition rather than the published dist artifact | Test the published package in both `next dev` and `next build`; remove workarounds only when both pass |
| Components render unstyled after migration | The app still scans the package's removed `src` directory | Import `@uzh-bf/design-system/css` once and remove the package `@source` rule |
| A UZH app renders neutral colors | v5 defaults to the neutral theme | Set `data-theme="uzh"` on the document root and verify an actual page |
| Hooks or context fail in the browser | Multiple physical React copies remain in the consumer bundle | Inspect package-manager resolution and run a browser smoke using the real production bundle |

## Work packages

### W1 — Current v5 alpha artifact

**Problem:** The source contract merged into `v5` is not installable from the public alpha tag. No application can currently prove the merged package.

**Do:**

- Prepare the next prerelease version for `@uzh-bf/design-system` using the repository's release configuration, with the design-system package as the sole version source of truth.
- Build the package and inspect the packed tarball, declaration files, CSS files, fonts, migration guide, and absence of source files.
- Probe root, `/primitives`, `/css`, `/preflight.css`, and `/package.json` from a scratch consumer. Confirm `/ui` and `/forms` fail as intentionally removed paths.
- Keep the release tag and npm publication behind explicit authorization. If publication is authorized later, read back the exact registry version, dist-tag, tarball contents, and export-resolution results.

**Check:** package build, pack dry run, type/declaration resolution, CSS/preflight presence, peer-runtime scan, and a clean scratch-consumer import probe.

**Depends:** merged `origin/v5` at `4627432709ab91aaf29c1c5129a9a79b5ab74246`.

**Priority:** prototype blocker.

**Commit:** `chore(release): prepare design-system v5 alpha artifact`.

### W2 — VetSim first consumer pilot

**Problem:** VetSim is the only current v5 consumer, but it consumes the stale alpha artifact and still has two removed `/ui` imports.

**Do:**

- Point VetSim at the exact W1 artifact.
- Move the two custom composite imports from `/ui` to the package root; do not add compatibility exports to the design system.
- Preserve its existing compiled CSS import and document-root UZH theme.
- Run the app's typecheck, production build, focused tests, and representative browser flow against the real local app.

**Check:** no `/ui`, `/forms`, package-source `@source`, or removed font-variable references remain in the touched app path; the production bundle resolves one React runtime; a real page renders branded controls with interactive behavior.

**Depends:** W1 artifact available to the consumer.

**Priority:** prototype blocker.

**Commit:** consumer repository owns the migration commit and PR.

### W3 — GBL Next/Tailwind consumer pilot

**Problem:** GBL has a real v5 preview history but the current demo app still consumes v4 and carries workarounds for the old source/dependency contract.

**Do:**

- Point `gbl-uzh/apps/demo-game` at the exact W1 artifact.
- Migrate the package CSS and public imports according to the current contract.
- Exercise development and production webpack paths, React 19 singleton resolution, and UZH theme rendering.
- Remove `transpilePackages` or React aliases only when the published artifact makes them unnecessary; retain a workaround only with a verified reason and a bounded follow-up.

**Check:** clean install, development page load, production build/start, representative browser interaction, one React copy in the client bundle, and no dependency on package source files.

**Depends:** W1 artifact available to the consumer; W2 may run first for a simpler contract smoke, but it is not a code dependency.

**Priority:** prototype blocker.

**Commit:** consumer repository owns the migration commit and PR.

## Decision gates

| Gate | Question | Recommendation | Applies to |
| --- | --- | --- | --- |
| A1 | May the next alpha be tagged and published? | Keep publication separately gated; prepare and verify locally first | W1 |
| A2 | Which apps define prototype readiness? | VetSim first, then GBL demo-game as the independent Next/Tailwind pilot | W2, W3 |
| A3 | Should the package contract change for the pilots? | No. Keep root, `/primitives`, `/css`, and `/preflight.css` as merged | W1–W3 |
| A4 | When do the remaining v4 apps migrate? | After both pilot reports, as separate app-owned migration waves | Follow-up |

## Prototype exit criteria

v5 is ready to prototype when W1 is verified and both W2 and W3 have real application evidence. This does not require a full Klicker migration, VRT expansion, brand-override profile, GA tag, or `latest` publication.

## Review and evidence expectations

- The W1 branch must retain the roadmap as its first committed change and keep implementation in the same review scope.
- Every published-artifact claim must include registry readback; a local tarball is not evidence of npm publication.
- Consumer reports must distinguish source inspection, package-resolution checks, build checks, and browser-observed behavior.
- A failed pilot is a useful result only when the exact package version, resolver, command, and error are recorded.
- The current planning-stage Sol review is unavailable because its stream disconnected. Do not describe the roadmap as independently Sol-reviewed unless that gate is rerun successfully.

## Progress

- 2026-08-05: PR #192 merged into `v5` at `4627432709ab91aaf29c1c5129a9a79b5ab74246`.
- 2026-08-05: live registry and consumer checks identified the source-versus-alpha mismatch and selected VetSim plus GBL demo-game as the first two prototype pilots.
- 2026-08-05: user approved W1–W3. Fresh worktree created at `trees/rs-v5-prototype-readiness` from `origin/v5`.
- 2026-08-05: W1 release preparation committed as `978a7250`; local package build, type checks, lint, formatting, pack inspection, and scratch-consumer export resolution passed. No tag or npm publication was created.

# Plan — v5 prototype readiness across consuming apps

## Identity and status

- Date: 2026-08-05
- Repository: `/Users/rschlae/Git/df/design-system`
- Base: `origin/v5` at `a710c24021edcc01db1f6d07e3d198e9e1a0d2cc`, including the merged W3 bundle-boundary change.
- Working branch: `rs/v5-rhf-w3`
- Working tree: `/Users/rschlae/Git/df/design-system/trees/rs-v5-rhf-w3`
- Audience: maintainers of the design system and the first application teams adopting v5.
- Status: approved roadmap; W1 is released as `5.0.0-alpha.2`. W3 is expanded into a design-system RHF API package followed by the GBL consumer package; alpha.2 is insufficient for the full demo-game migration, so GBL waits for the separately verified `5.0.0-alpha.3` artifact.
- Planning review: the corrected W3 plan was independently reviewed by Sol and passed with no remaining concerns.

## How to work

- Keep the v5 public contract unchanged: root composites, `/primitives`, `/css`, and `/preflight.css`. Do not restore `/ui` or `/forms` aliases, add compatibility exports, or redesign component APIs for these pilots.
- W1 is one normal design-system release-preparation PR. Expanded W3 is two sequential PRs in the owning repositories — design-system API first, then GBL consumption — not layers in a cross-repository stack.
- Start every implementation surface from its current remote base. Preserve dirty or unrelated worktrees; do not rebase them silently.
- W1 may prepare a prerelease artifact, but npm publication and any later `latest` or GA promotion remain separately authorized actions.
- For W2 and W3, use the real application dev/build paths and browser validation with `agent-browser`; record the local preview URL and the exact verification commands in each consumer plan.
- Do not widen the work because a pilot exposes an unrelated component or product issue. Record it as a follow-up and fix only shared v5 blockers in the design-system scope.

## Current state and evidence

- PR #192 is merged into `v5` as `4627432709ab91aaf29c1c5129a9a79b5ab74246`. Required build, lint, type, formatting, test, accessibility, publish, and preview checks were green at merge.
- The merged package source is still version `5.0.0-alpha.1`, but its exports are now only `.`, `./primitives`, `./css`, `./preflight.css`, and `./package.json`. The package ships `dist` and `MIGRATION.md`, not source files.
- The live npm `alpha` dist-tag is `5.0.0-alpha.2`, while `latest` remains `4.1.6`. Alpha.2 carries the merged v5 contract: root composites, `/primitives`, `/css`, `/preflight.css`, and `/package.json`, with `/ui` and `/forms` removed. It does not yet contain the W3 `Rhf*Field` family; GBL must wait for alpha.3.
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

| Symptom                                                         | Cause                                                                                       | Remedy                                                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| An app installs `5.0.0-alpha.1` but resolves `/ui` successfully | The registry alpha is older than the merged source                                          | Read back npm metadata and every supported/removed export before consumer testing                      |
| Next development works only with `transpilePackages`            | The app is consuming a v4/source-oriented condition rather than the published dist artifact | Test the published package in both `next dev` and `next build`; remove workarounds only when both pass |
| Components render unstyled after migration                      | The app still scans the package's removed `src` directory                                   | Import `@uzh-bf/design-system/css` once and remove the package `@source` rule                          |
| A UZH app renders neutral colors                                | v5 defaults to the neutral theme                                                            | Set `data-theme="uzh"` on the document root and verify an actual page                                  |
| Hooks or context fail in the browser                            | Multiple physical React copies remain in the consumer bundle                                | Inspect package-manager resolution and run a browser smoke using the real production bundle            |

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

**Problem:** GBL has a real v5 preview history but the current demo app still consumes v4 and carries workarounds for the old source/dependency contract. The demo-game also owns generic RHF field glue that should be replaced by the shared v5 API.

**Do:**

- Add and verify the four generic `Rhf*Field` wrappers in the design system, prepare alpha.3, and point `gbl-uzh/apps/demo-game` at that exact artifact.
- Migrate the package CSS and public imports according to the current contract.
- Replace demo-game's generic text, number, select, and multi-select RHF glue with the DS wrappers; keep the domain-specific `LogoSelector` controller local.
- Exercise development and production webpack paths, React 19 singleton resolution, and UZH theme rendering.
- Remove `transpilePackages` or React aliases only when the published artifact makes them unnecessary; retain a workaround only with a verified reason and a bounded follow-up.

**Check:** clean install, development page load, production build/start, representative browser interaction, one React copy in the client bundle, and no dependency on package source files.

**Depends:** W1 artifact available to the consumer; W2 may run first for a simpler contract smoke, but it is not a code dependency.

**Priority:** prototype blocker.

**Commit:** consumer repository owns the migration commit and PR.

## Decision gates

| Gate | Question                                           | Recommendation                                                                                                            | Applies to |
| ---- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- |
| A1   | May the next alpha be tagged and published?        | Keep publication separately gated; prepare and verify locally first                                                       | W1         |
| A2   | Which apps define prototype readiness?             | VetSim first, then GBL demo-game as the independent Next/Tailwind pilot                                                   | W2, W3     |
| A3   | Should the package contract change for the pilots? | No. Keep root, `/primitives`, `/css`, and `/preflight.css` as merged; add the four W3 RHF wrappers additively at the root | W1–W3      |
| A4   | When do the remaining v4 apps migrate?             | After both pilot reports, as separate app-owned migration waves                                                           | Follow-up  |

## Prototype exit criteria

v5 is ready to prototype when W1 is verified, alpha.3 is registry-proven, and both W2 and the expanded W3 GBL package have real application evidence. This does not require a full Klicker migration, VRT expansion, brand-override profile, GA tag, or `latest` publication.

## Review and evidence expectations

- The W1 branch must retain the roadmap as its first committed change and keep implementation in the same review scope.
- Every published-artifact claim must include registry readback; a local tarball is not evidence of npm publication.
- Consumer reports must distinguish source inspection, package-resolution checks, build checks, and browser-observed behavior.
- A failed pilot is a useful result only when the exact package version, resolver, command, and error are recorded.
- The expanded W3 plan has a successful Sol planning review. DS and GBL final review gates remain separate and must cover their exact final commits before either package is presented as ready.

## Progress

- 2026-08-05: PR #192 merged into `v5` at `4627432709ab91aaf29c1c5129a9a79b5ab74246`.
- 2026-08-05: live registry and consumer checks identified the source-versus-alpha mismatch and selected VetSim plus GBL demo-game as the first two prototype pilots.
- 2026-08-05: user approved W1–W3. Fresh worktree created at `trees/rs-v5-prototype-readiness` from `origin/v5`.
- 2026-08-05: W1 release preparation committed as `978a7250`; local package build, type checks, lint, formatting, pack inspection, and scratch-consumer export resolution passed. No tag or npm publication was created.
- 2026-08-05: the required final review found one generated-changelog accuracy issue; it was verified and corrected in `e05edfb0`. The correction changed release prose only, and main-session checks closed the finding. W1 remains publication-gated.
- 2026-08-05: tag `v5.0.0-alpha.2` pushed; the release workflow published `5.0.0-alpha.2` to the npm `alpha` dist-tag and to GitHub Packages. Registry readback and tarball inspection confirm the published artifact matches the branch tip `eb543bcd` and exposes only the supported export roots.
- 2026-08-06: PR #193 merged into `v5`, recording the released alpha and the W1 evidence.
- 2026-08-09: expanded W3 plan committed as `18df75eb6` and passed the corrected Sol planning review; the DS wrapper slice is committed as `0e1965e30` and is awaiting the repository-specific final review gates.
- 2026-08-09: alpha.3 release inputs prepared without a tag or publication; superseded local packed artifacts had SHA-256 `64ea1b607d5815e2e7e04fc1a500a8628f218c68ec5ce1c647cbe16d4c2b1935`, `7b0e2afa162766be83efa51937f295878faa600b8f0e147a0f3f387173007917`, `cc610844b26609c96e4a667b4dfb43b85c338fa3a7bcc36b71130b2f0986f317`, and `0b1cec1db7e348b0c8e5be96af32973536fd2b6c40135bbb049e8edb09afa1d9`; the latest local packed artifact has SHA-256 `c3ba4b5cd5521f62720d06295da80f805ad980911829f7b45c5147b77e627814`. The refreshed package proof passes 1,278 tests, 18 focused RHF/multi-select accessibility checks, and a fresh scratch consumer.

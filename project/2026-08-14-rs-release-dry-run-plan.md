# v4 npm Trusted Publishing and 4.1.8 release plan

## Goal

- Backport the reviewed v5 native npm Trusted Publishing path to the v4 release workflow.
- Add only the package repository metadata required for npm OIDC/provenance.
- Prepare `@uzh-bf/design-system` 4.1.8 using the existing standard-version release convention.
- Push only `rs/release-dry-run` and leave a draft PR against `main` ready for review.

## Non-goals and authority

- Do not move, rewrite, force-update, or recreate `v4.1.7`.
- Do not inspect or print `NPM_TOKEN` or any other secret value.
- Do not merge `main`, create or push `v4.1.8`, publish to npm or GitHub Packages, remove secrets, or change npm Trusted Publisher settings in this package.
- Local edits, commits, branch push, and draft PR creation are authorized by the delegation. Merge, tag, and publication remain separate gates.
- Do not claim npm publication without registry readback of version, dist-tag, tarball/integrity, and provenance.

## Plan identity

- Repository: `/Users/rschlae/Git/df/design-system`
- Worktree: `/Users/rschlae/Git/df/design-system/trees/rs-release-dry-run`
- Branch: `rs/release-dry-run`
- Target: `main`
- Starting ref: `364cb6be0d5a7581922e58b02a828007adab8e5b` (`v4.1.7`)
- PR: not created yet
- Related source: v5 trusted-publisher implementation, merged as commit `70eb98a9a` through PR [#195](https://github.com/uzh-bf/design-system/pull/195)

## Research

- npm Trusted Publishing requires a package `repository.url` matching the GitHub repository, OIDC `id-token: write`, and a compatible npm/Node runtime. The publish job will use Node 24 and the pinned npm-publish v4 action, matching the reviewed v5 path.
- Current v4 `.github/workflows/main.yml` couples build and publication, publishes with the stale-risk `NPM_TOKEN`, accepts any tag, and has no tag/version or dist-tag guard.
- Current v4 validation has lint, type check, format check, and tests; it has no v5-only a11y job/scripts. The backport will gate the build on all existing v4 checks without inventing a v5-only check.
- Current v4 release convention uses `standard-version` and bumps the root plus all eight package manifests listed in `.versionrc.js`. `pnpm-lock.yaml` is expected to remain unchanged because workspace manifest versions are not recorded there; frozen install plus a zero lockfile diff is the proof.
- Registry readback before implementation: npm dist-tags are `latest: 4.1.6` and `alpha: 5.0.0-alpha.3`; versions `4.1.7` and `4.1.8` are absent. Remote `main` is `364cb6be0`; remote `v4.1.7` is `44f525685dc6cd5e014115bbac6b15be0a76189d`.

## Delegation map

| Slice | Owner | Dependency | Acceptance |
| --- | --- | --- | --- |
| S0 baseline and plan | main | none | clean named worktree, immutable v4.1.7 proof, plan committed |
| S1 release trust contract | main | S0 | workflow/package contract locally validated and exact diff reviewed |
| S2 4.1.8 preparation | main | S1 | standard-version output inspected; versions/changelog consistent; no tag or lockfile drift |
| S3 integrated verification | main | S2 | Node 22 checks, Node 24 package inspection, guard exercises, clean final diff |
| S4 draft PR delivery | main | S3 | final review, branch-only push, draft PR, CI evidence, explicit release boundary |

Execution-tier skip reason: the implementation and release slices stay in the main session because they cross workflow permissions, package identity, release metadata, and external release authority; the main session must own those seams and all external effects.

## Test portfolio

| Risk or behavior | Existing protection | Obligation and primary seam | Failure caught |
| --- | --- | --- | --- |
| Existing v4 validation remains required before publish | `lint`, `check-ts`, `check-format`, and `test` jobs | extend workflow dependency graph; CI job wiring | a tag publishes after a skipped or failed required check |
| Only an exact version tag can publish | none in v4 | add workflow guard and shell edge-case exercises | stray tag, mismatch, build metadata, or reserved `latest` prerelease reaches npm |
| npm identity uses OIDC and provenance | v5 PR #195 implementation | extend workflow contract; static inspection plus authoritative CI | stale token path or missing OIDC/provenance configuration remains |
| Package identity and exports remain compatible | existing package manifest | no new test; JSON/export-key comparison and `npm pack --dry-run` | metadata backport changes v4 entrypoints or package contents |
| 4.1.8 release metadata is consistent | standard-version and prior release commits | extend release convention; manifest/changelog/tag assertions | root/package versions diverge or an existing tag is recreated |

## Slices

### S0 — baseline and plan

- Check: worktree is clean; branch is based exactly on `origin/main`; `v4.1.7^{}` remains the known commit; remote has no `v4.1.8` tag or competing branch PR.
- Do: commit this plan as `docs(project): add v4 trusted publishing release plan`.

### S1 — backport the release trust contract

- Change `.github/workflows/main.yml` only as needed to:
  - set workflow-level `contents: read`;
  - keep normal v4 checks and make `build` depend on lint, type, format, and test;
  - separate a `publish` job that runs only for `refs/tags/v*` and depends on `build`;
  - grant the publish job only `contents: read`, `id-token: write`, and `packages: write`;
  - use pinned checkout/setup-node/pnpm/npm-publish action SHAs from the reviewed v5 implementation;
  - use Node 24/npm 11-compatible publishing, without a registry-url or `NPM_TOKEN` on the npm path;
  - verify `github.ref_name` is exactly `v<packages/design-system/package.json version>`;
  - derive `latest` for stable versions and the first prerelease identifier for prereleases, reject the reserved `latest` prerelease, and ignore build metadata;
  - publish to npm with provenance through OIDC, then retain GitHub Packages publication with `GITHUB_TOKEN` and `packages: write`.
- Change `packages/design-system/package.json` only by adding the v5 repository object with the exact GitHub repository URL and `directory: packages/design-system`. Preserve the v4 exports, files, engine, and behavior.
- Check: JSON parse, YAML structural checks, no NPM_TOKEN input, exact permissions, pinned actions, tag-only publish condition, positive/mismatch/prerelease guard exercises, and `git diff --check`.
- Commit: `ci(release): backport npm trusted publishing for v4`.
- Review: after the immutable commit, run exactly one simplifier and one slice reviewer in parallel. The slice reviewer covers correctness, security, cross-system, and release-integrity risk; the simplifier checks for behavior-preserving reduction.

### S2 — prepare 4.1.8 without creating a tag

- Check: run the standard-version dry run with explicit `4.1.8`, then generate the release without automatic commit/tag side effects.
- Expected: root `package.json`, `packages/design-system/package.json`, and all other `.versionrc.js` bump manifests become `4.1.8`; `CHANGELOG.md` adds a `v4.1.7...v4.1.8` section; `pnpm-lock.yaml` is unchanged.
- Assert: `v4.1.7` still resolves to the original commit, `v4.1.8` does not exist locally or remotely, exports are unchanged, and no source/generated declaration drift is staged.
- Commit: `chore(release): 4.1.8`.
- Review: no separate simplifier or slice reviewer; this is generated/mechanical release metadata and remains covered by integrated final review.

### S3 — local package and workflow verification

- Run under the repository Node 22.16/pnpm 10.30 runtime: frozen install, format check, lint, type check, repository tests, and design-system build.
- Run under Node 24 publish parity: verify npm is at least 11.5.1 and run `npm pack --dry-run --json ./packages/design-system`.
- Inspect the packed manifest for package name/version, exact repository metadata, expected exports, declaration files, and expected `dist`/`src` contents. A local tarball is not registry publication evidence.
- Record `pnpm-lock.yaml` unchanged, `git diff --check` clean, no secret values, and no `NPM_TOKEN` workflow input.

### S4 — integrated review and draft PR

- Run one read-only integrated final reviewer over the exact branch range for correctness, plan compliance, maintainability, security, and architecture.
- Compute substantive diff size against `origin/main` excluding lockfiles, generated output, and project-plan docs; include it in the PR description.
- Push only `rs/release-dry-run` with upstream tracking; never push tags, force-push, merge, or delete refs.
- Create or update one draft PR against `main` with a concise description covering the stale-token failure, OIDC design, repository metadata, tag/version guard, diff size, and verification. If a PR ID is assigned, rename the plan file to include it and refresh the body.
- Confirm branch CI is green. The publish job should be skipped on the ordinary branch push; this is not npm publication proof.

## Finish gates

- Merge gate: stop at the draft PR unless the user separately authorizes merging `main`.
- Authoritative release-ref gate: do not create or push `v4.1.8` until the reviewed workflow and release metadata are present on authoritative `main` and the required CI is green.
- npm configuration gate: repository evidence cannot prove the live npm Trusted Publisher account configuration. Before any authorized tag, confirm values-free that owner `uzh-bf`, repository `design-system`, workflow `main.yml`, action `npm publish`, and any environment match the npm package settings.
- Publication gate: npm and GitHub Packages publication require a separately authorized tag/release action and live registry readback. Never infer publication from a green tag workflow, local pack, or CI build.

## Progress

- Status: S1 implementation complete locally; planning-stage review completed with `DONE_WITH_CONCERNS`; slice review found and corrected the GitHub Packages dist-tag omission.
- Completed: named worktree/branch/ref validation, v4/v5 workflow comparison, registry absence check for 4.1.7/4.1.8, Node 22 baseline package build, format check, workflow/package backport, JSON/YAML checks, and guard edge-case exercises.
- Remaining: prepare S2, run S3, final review, push branch, create/update draft PR, and report the release boundary.
- Latest evidence: workflow YAML and both package manifests parse; no `NPM_TOKEN` input remains in the workflow; both registries receive the derived dist-tag; Node 24.17/npm 11.13.0 satisfies the publish runtime; guard cases pass for stable, prerelease, build metadata, mismatch, and reserved `latest`.
- Review reports: planning-stage review is recorded in the session; initial slice review, simplifier, and correction findings are pending artifact capture; integrated-final review is pending.

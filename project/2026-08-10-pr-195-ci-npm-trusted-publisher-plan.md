# Plan — PR #195 v5 alpha.3 npm Trusted Publisher replay

Status: implementation complete; final reviews and refreshed PR CI remain.
The v5.0.0-alpha.3 tag has been published through npm Trusted Publisher, and
the registry-backed GBL migration is complete, verified, and intentionally
local and unmerged.

Date: 2026-08-10
Branch: `rs/ci-npm-trusted-publisher`
Target: `v5`
PR: https://github.com/uzh-bf/design-system/pull/195
Related release: `v5.0.0-alpha.3` at
`1de22ddc0a1cffdfccdfa5a99af91d5b217ccf40`

## Problem

The release job uses `JS-DevTools/npm-publish@v3` with the stale
`secrets.NPM_TOKEN`. The tag/version guard and package checks pass, but npm
rejects the public publish request. A new alpha version or a moved tag would
create unnecessary release drift; the existing tag needs a safe replay path.

## Evidence

- npm Trusted Publisher is configured for GitHub Actions repository
  `uzh-bf/design-system`, workflow filename `main.yml`, with `npm publish`
  allowed.
- npm requires GitHub Actions `id-token: write` for trusted publishing and
  npm CLI 11.5.1+ on Node 22.14+; the current npm-publish action documents
  tokenless OIDC support in v4.
- The failed tag run passed build, formatting, lint, types, smoke tests, and
  all four accessibility shards before npm returned `E404` on the publish
  `PUT` request.
- Corrected branch CI run `31364356289` passed; its publish job was skipped on
  an ordinary branch push, confirming the permission isolation.
- Replay run `31364726904` passed all checks, rebuilt from the immutable
  `v5.0.0-alpha.3` tag, and completed both the public npm and GitHub Packages
  publish steps.
- Public registry readback confirms `5.0.0-alpha.3` is present, the `alpha`
  dist-tag points to it, and the version metadata includes integrity and
  provenance metadata.
- The GBL demo-game migration is complete at local commit `9f8c76b`, five
  commits ahead of `origin/dev`; frozen install, package/build checks,
  authenticated browser tests, and final review passed. The branch remains
  unpushed and unmerged.
- Live PR review identified that the privileged publish job still used mutable
  action tags. The current branch pins each action in that job to the peeled
  commit selected by its documented v4 release and makes lint plus formatting
  prerequisites for the release build.

## Decision

Use npm Trusted Publisher for the public npm step. Keep the ordinary build job
free of publish-capable credentials, and add a tag-gated publish job that
uses Node 24, action v4, and only the permissions needed for the two registry
publishes. Remove the public npm token input. Retain the GitHub Packages
publication with `GITHUB_TOKEN` and grant the publish job the package-write
permission it needs.
The one-time replay used `workflow_dispatch` on this corrected workflow branch,
passed a single alpha3 choice, and checked out the alpha3 tag for both jobs.
After the successful publication and registry readback, the final workflow
removes that branch-dispatch release authority. Normal version-tag pushes are
the only remaining publication trigger.
Only the privileged publish job receives immutable action pins in this PR;
upgrading unrelated jobs or action major versions is outside scope. The release
build now waits for lint, formatting, types, tests, and accessibility, and the
publish job continues to depend on that single complete gate.
Workflow-level permissions default every job to `contents: read`; the publish
job explicitly adds only OIDC and package-write permissions.

## Non-goals

- No package source, public API, version, or tag change.
- No further GBL code, lockfile, branch, PR, or deployment change.
- No GBL merge, deployment, or consumer PR merge.
- No secret value retrieval, persistence, or chat transmission.

## Planning gate

The original read-only planning challenge timed out. A capable planner later
completed an explicit recovery review of this plan and exact range
`origin/v5...72d238662`, returning `PASS_WITH_CONCERNS`. It confirmed that the
plan is implementation-ready and the implementation follows it safely. Its
only findings were to record the recovered gate and correct stale progress;
both are accepted here. This late pass does not rewrite the historical timing,
but it closes the missing capable challenge before the draft PR is updated.

## Progress

- `162e6c2ac`: plan committed before implementation.
- `2ff08ed0`: initial OIDC workflow slice committed.
- `07938b7f0`: manual alpha3-only replay guard and default-branch prerequisite
  recorded; intermediate review found that publish-capable permissions must be
  isolated from ordinary push builds.
- `9b6fd28d0`: split the tag-gated publish job from the ordinary build job and
  added the required progress record.
- `91482113f`: replay alpha3 from the immutable tag in both jobs.
- `daf6566f`: gate the ordinary build checkout on the replay source as well.
- `17211de31`: record successful Trusted Publisher replay and public registry
  evidence.
- `68f308fa6`: rename this plan to include PR #195.
- `578dfad00`: add the planning-reviewed v5 GA-readiness roadmap and supersede
  stale milestone ordering without rewriting historical plans.
- `d1fb0dc1e`: pin every privileged publish action to an immutable commit and
  make lint plus formatting release prerequisites.
- `71c12cc4f`: remove the completed manual replay path and set the workflow-wide
  read-only permission baseline. The exact security re-review passed with no
  remaining finding.
- `72d238662`: close the maintainability findings by removing the impossible
  manual-dispatch check, consolidating P0 status, and renaming the ordinary job
  from `Build and Publish` to `Build`.
- The late planning recovery pass returned `PASS_WITH_CONCERNS`; its two
  progress-only findings are closed in the current follow-up.
- Current evidence: local YAML, formatting, lint, and type/build checks pass.
  The initial sandbox type/build run could not open Parcel's LMDB cache; the
  approved host-level rerun passed.
- Next: integrated final re-review of the progress-only tip, then push and wait
  for fresh PR CI. The draft remains unmerged and not ready for review.

## Slice — release workflow and alpha.3 replay

Files: `.github/workflows/main.yml`.

Do:

- Preserve push-triggered CI and the existing version-tag/version/dist-tag
  guard; remove the one-time manual replay trigger after alpha3 registry
  readback.
- Keep the ordinary build job at `contents: read` and give only the tag-gated
  publish job `contents: read`, `packages: write`, and `id-token: write`.
- Use Node 24 and `JS-DevTools/npm-publish@v4` without `NPM_TOKEN` for public
  npm; retain the GitHub Packages publish step with `GITHUB_TOKEN`. Rebuild in
  the isolated publish job rather than passing an artifact from the ordinary
  build job.
- Pin every action in the privileged publish job to the immutable commit for
  the verified v4 release, with a readable version comment.
- Require lint and formatting alongside types, tests, and accessibility before
  the release build can succeed.
- Set workflow-level permissions to `contents: read`; let only `publish`
  explicitly add `id-token: write` and `packages: write`.

Check:

- Ruby YAML parsing, `git diff --check`, and a focused diff review pass
  locally; `actionlint` is unavailable in this environment, so GitHub Actions
  remains the authoritative workflow syntax check.
- The final workflow has no `workflow_dispatch`, replay input, or branch-based
  publish path.
- Branch CI is green after the workflow change; ordinary branch CI skips
  publication.
- Do not replay alpha.3 after the immutable version is present in npm. The
  next live Trusted Publisher proof belongs to a separately authorized future
  version-tag push and must include registry readback of version, dist-tag,
  tarball URL, integrity, and provenance metadata.

Observed release evidence:

- Workflow run: `31364726904`.
- One-time replay command: `gh workflow run main.yml --ref
rs/ci-npm-trusted-publisher -f release_tag=v5.0.0-alpha.3`.
- Public package: `@uzh-bf/design-system@5.0.0-alpha.3`.
- Public `alpha` dist-tag: `5.0.0-alpha.3`.
- Registry metadata exposes the published tarball integrity and provenance
  metadata.

Commit: `ci(release): publish v5 tags through npm trusted publisher`.

## Close-out

The release replay and GBL consumer proof are complete. Close PR #195 only
after the exact final branch passes the required read-only reviews and fresh PR
CI. Keep the PR draft, and leave merge, readiness, tags, package publication,
GBL delivery, and deployment behind their explicit authority gates. Continue
post-P0 work from `project/2026-08-10-v5-ga-readiness-roadmap.md` in separate
package-level plans and PRs.

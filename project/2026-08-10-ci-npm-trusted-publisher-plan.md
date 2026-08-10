# Plan — v5 alpha.3 npm Trusted Publisher replay

Status: in progress. The v5.0.0-alpha.3 tag exists, but its public npm
publication failed at the token-authenticated publish step. The npm package
settings now trust `uzh-bf/design-system` workflow `main.yml` through OIDC.

Date: 2026-08-10
Branch: `rs/ci-npm-trusted-publisher`
Target: `v5`
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

## Decision

Use npm Trusted Publisher for the public npm step. Keep the ordinary build job
free of publish-capable credentials, and add a tag-gated publish job that
uses Node 24, action v4, and only the permissions needed for the two registry
publishes. Remove the public npm token input. Retain the GitHub Packages
publication with `GITHUB_TOKEN` and grant the publish job the package-write
permission it needs.
Add `workflow_dispatch` without weakening the existing tag guard. Manual
dispatch may publish only `v5.0.0-alpha.3`; normal push-tag releases retain
their existing tag behavior. Because GitHub registers manual workflows only
when the workflow file exists on the default `main` branch, add the smallest
possible default-branch trigger registration as a separate reviewable change
before dispatching the v5 tag.

## Non-goals

- No package source, public API, version, or tag change.
- No GBL lockfile change until npm registry readback confirms alpha.3.
- No GBL merge, deployment, or consumer PR merge.
- No secret value retrieval, persistence, or chat transmission.

## Planning gate

A read-only planning challenge was dispatched to the configured planner and
timed out after repeated bounded waits. The main-session plan is based on the
verified npm documentation, the configured publisher screenshot, the live
workflow, and the failed tag-run evidence. The integrated final review remains
required before presenting the workflow change as ready.

## Progress

- `162e6c2ac`: plan committed before implementation.
- `2ff08ed0`: initial OIDC workflow slice committed.
- `07938b7f0`: manual alpha3-only replay guard and default-branch prerequisite
  recorded; intermediate review found that publish-capable permissions must be
  isolated from ordinary push builds.
- Current slice: split the tag-gated publish job from the ordinary build job.
- Next: rerun the intermediate review on the corrected exact range, prepare
  the default-branch trigger registration, then run final review before any
  push or publication.

## Slice — release workflow and alpha.3 replay

Files: `.github/workflows/main.yml`.

Do:

- Preserve push-triggered CI and the existing tag/version/dist-tag guard.
- Add a manual workflow trigger for replaying alpha3; branch/manual runs and
  manual dispatches for other tags must skip publication.
- Keep the ordinary build job at `contents: read` and give only the tag-gated
  publish job `contents: read`, `packages: write`, and `id-token: write`.
- Use Node 24 and `JS-DevTools/npm-publish@v4` without `NPM_TOKEN` for public
  npm; retain the GitHub Packages publish step with `GITHUB_TOKEN`. Rebuild in
  the isolated publish job rather than passing an artifact from the ordinary
  build job.

Check:

- Ruby YAML parsing, `git diff --check`, and a focused diff review pass
  locally; `actionlint` is unavailable in this environment, so GitHub Actions
  remains the authoritative workflow syntax check.
- Branch CI is green after the workflow change.
- Manual dispatch on `v5.0.0-alpha.3` reaches the tag guard and publishes via
  OIDC; read back the npm version, alpha dist-tag, tarball URL, integrity, and
  provenance metadata.
- The default `main` branch contains the workflow trigger registration needed
  for GitHub to expose manual dispatch, while the v5 workflow contains the
  OIDC implementation and replay guard.

Commit: `ci(release): publish v5 tags through npm trusted publisher`.

## Close-out

After publication readback, reconcile the GBL registry manifests and lockfile
in its existing worktree, rerun the consumer checks and authenticated browser
flow, commit the GBL migration only if the registry graph is green, and run
the required read-only final review. Leave all GBL work unmerged.

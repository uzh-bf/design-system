# Package Plan — Candidate Release Metadata (5.0.0-alpha.5)

## Overview

- **Kind:** Implementation package (light path — metadata only, mirror of #206).
- **Branch:** `rs/v5-alpha5-metadata`
- **Base:** `v5` (at `736028a61`)
- **Worktree:** `trees/rs-v5-w5-candidate-metadata` (reused release-metadata worktree)
- **Goal:** Update release metadata to `5.0.0-alpha.5` so the review-fix package of #207 can be published.

## Scope

- `packages/design-system/package.json`: `5.0.0-alpha.4` → `5.0.0-alpha.5`.
- `CHANGELOG.md`: the hand-written `## Unreleased` section becomes the `5.0.0-alpha.5` entry, with the compare link and the #207 attribution added. `standard-version` was run in dry-run only: it generates a single squash-commit line and does not consume a hand-written `## Unreleased` section, so folding it manually preserves the per-change consumer detail. A CI/build entry documents the two new publish-path gates.
- No tag is created in this package. Tagging pushes to the publish workflow and stays with the maintainer.

## Verification

- `pnpm release:alpha:dry` — confirms the computed next version and that the generated entry would replace, not merge, the hand-written section.
- `pnpm check && pnpm lint && pnpm format:check`
- `pnpm --dir packages/design-system test:smoke && pnpm --dir packages/design-system test:theme-contract`
- `pnpm --dir packages/design-system build` — the published artifact carries the bumped version.

## Progress

- 2026-08-18: metadata prepared on branch; tag and publication deliberately out of scope.

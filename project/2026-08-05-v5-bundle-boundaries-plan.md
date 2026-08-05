# v5 W3 bundle boundaries plan

Status: implementation verified; final review pending
Date: 2026-08-05
Branch: `rs/v5-bundle-boundaries`
Base: `origin/v5` at `30ffba0d00219bf0dda1d8573f90ab68bda2ffbd`
Artifact root: `project/`

## Goal

Record a reproducible post-W2 build and package baseline, then make the smallest measured Vite/Rollup graph change that lets generic imports avoid pulling date-picker, chart, carousel, and their heavy transitive dependencies into the generic consumer bundle.

The published root and `./primitives` JavaScript exports, CSS exports, preflight export, declarations, peer-runtime behavior, and package metadata remain part of the contract.

## Non-goals

- No public API redesign or lazy root barrel.
- No source-component rewrite, dependency upgrade, new dependency, size threshold, or size-limit policy in W3.
- No `latest`/4.1.6 release, npm publish, tag, deploy, merge, or push.
- No changes to the root checkout or existing worktrees.

## Evidence and baseline

The clean W3 worktree was created from the refreshed `origin/v5`, and a frozen pnpm install completed with pnpm 10.30.0. The baseline command was:

```sh
VOLTA_FEATURE_PNPM=1 pnpm --dir packages/design-system build
```

The complete build includes TypeScript, Vite, declaration generation, font extraction, CSS rewriting, and preflight generation. Baseline measurements below are from the final `dist/` after `build:copy`, not the intermediate Vite CSS size.

Tool versions: Node v26.5.1, pnpm 10.30.0, Vite 6.3.5, TypeScript 5.8.3, Apple gzip 479, Brotli 1.2.0.

Compression commands:

```sh
gzip -n -9 -c <file> | wc -c
brotli --quality=11 --stdout <file> | wc -c
shasum -a 256 <file>
```

| Artifact | Raw bytes | gzip `-n -9` | Brotli q11 | SHA-256 |
| --- | ---: | ---: | ---: | --- |
| `dist/index.js` | 243,137 | 48,468 | 40,640 | `3e8a40f4bcb7b8f1e0dd00e6807b228b34ffe1f52e195b576f2f2445c818d493` |
| `dist/primitives.js` | 14,043 | 3,656 | 3,225 | `9c5958686044d7aaa5b77ae984cdbe0fbab5bda45513b5b7eab9fbf13caeb100` |
| `dist/design-system.css` | 240,923 | 31,880 | 24,802 | `66d1566faae3c77ce572cdbded1c1827bb2ab84d1f488aebd8006fc4afb23215` |
| `dist/preflight.css` | 8,179 | 2,794 | 2,333 | `3874fa3fba44b6b2424774f348a99618134f09079d6095b8dadb57f1da5ebd0a` |
| `dist/toggle-group-BIDPk4zQ.js` | 1,425,361 | 295,771 | 228,016 | `4f94aa7af307af546b2759a942b548a53fcca8d0ca2b2a3d6436eec462b781ca` |

The baseline package tarball is 890,666 bytes. It contains the two JavaScript entries, their sourcemaps and declaration files, the shared `toggle-group` chunk and sourcemap, both CSS exports, six fonts, two font licences, `README.md`, `MIGRATION.md`, and `package.json`.

The large shared chunk contains the Radix component code plus date-fns, react-day-picker, Embla, Recharts, D3, and other dependencies. Both `index.js` and `primitives.js` import that chunk. The current Vite config externalizes peer dependencies only, while regular runtime dependencies remain eligible for bundling.

## Decision

Use one Vite/Rollup configuration change in `packages/design-system/vite.config.ts`:

1. Match package names and subpaths from the union of `dependencies` and `peerDependencies` as external runtime modules.
2. Enable Rollup `output.preserveModules`.
3. Set an absolute `output.preserveModulesRoot` for `packages/design-system/src`.

This keeps the existing export map and moves component code into separate published modules while leaving runtime dependency resolution to the package consumer. The change is intentionally limited to the bundler graph; no source barrel or package export redesign is included.

`preserveModules` is not a lazy root barrel: a direct unbundled ESM import of the root can still follow static re-exports. Consumer fixture results, not file count or root entry size alone, decide whether this W3 change satisfies the generic-import boundary.

## Verification contract

Run the complete build after the config change, then pack the package and verify the packed artifact. Use temporary fixtures outside the repository for consumer-bundle checks.

Required checks:

- `VOLTA_FEATURE_PNPM=1 pnpm --dir packages/design-system check`
- `VOLTA_FEATURE_PNPM=1 pnpm --dir packages/design-system build`
- Package exports resolve for `.`, `./primitives`, `./css`, `./preflight.css`, and `./package.json` from the packed artifact.
- Root `Button` and `./primitives` `Button` consumer fixtures do not contain date-fns, react-day-picker, Recharts/D3, or Embla markers.
- Positive-control fixtures for Calendar/date picker, Chart, and Carousel retain their corresponding dependency imports.
- Packed declarations, fonts, licences, README, MIGRATION, and CSS files are present.
- Sourcemap `sources` contain no `dist/node_modules` and no bundled regular dependency source.
- Every remaining bare import in published JavaScript is declared in `dependencies` or `peerDependencies`.
- Runtime imports execute from the packed artifact for generic and heavy-component fixtures.

Keep the baseline CSS raw bytes and SHA unchanged unless the change is proved to affect CSS; treat any unexplained CSS/hash change as a stop condition. Also stop on export/type resolution failure, runtime import failure, missing packed file, undeclared bare import, unexpected `dist/node_modules`, or a heavy marker in either generic fixture.

## Planning-stage review

The required read-only planning-stage review returned `CHANGES_REQUIRED`. Its required corrections are incorporated here:

- measure only after the complete build and use deterministic compression;
- keep the implementation to `vite.config.ts` after this plan commit;
- verify packed-package generic and heavy-component fixtures;
- verify all exports, artifact contents, sourcemaps, and declared bare imports;
- treat consumer tree-shaking, runtime module resolution, and tarball growth as explicit risks.

## Progress

- [x] Read W3 handoff and inherited W1/W2/ruling handoffs.
- [x] Refreshed remotes; confirmed `origin/v5` at `30ffba0d` and root checkout remains untouched.
- [x] Created clean worktree `/Users/rschlae/Git/df/design-system/trees/rs-v5-bundle-boundaries` on `rs/v5-bundle-boundaries`.
- [x] Installed the frozen lockfile with pnpm 10.30.0.
- [x] Built the baseline and recorded final `dist/` sizes, compression, hashes, dependency membership, peer-runtime markers, and packed contents.
- [x] Rejected `preserveModules` alone and `manualChunks` alone in disposable experiments because they either emitted dependency modules or left the generic graph coupled to heavy chunks.
- [x] Tested the combined `preserveModules` plus declared-runtime-externalization candidate; an initial input-count reading was corrected to `bytesInOutput` before deciding the consumer contract.
- [x] Completed the separate planning-stage review and incorporated its corrections.
- [x] Commit this plan as the first W3 commit (`3684a2c4`).
- [x] Implement the Vite-only graph change in `packages/design-system/vite.config.ts` (`8af0614b`).
- [x] Run the verification contract and inspect the final diff.
- [ ] Run required maintainability, security, and integrated final-outcome reviews on committed scope.
- [x] Ask the Sol advisor to challenge the input-count interpretation; it returned `KEEP_CURRENT_CONTRACTS` and recommended the corrected consumer-bundle measurements.
- [x] Commit the revised verification progress and scope ruling.

## Validation result and contract decision

The initial consumer experiment counted resolved esbuild inputs, which overstated emitted dependency inclusion. The corrected check uses `outputs[*].inputs[*].bytesInOutput` and was repeated with esbuild and Vite/Rollup.

| Fixture | esbuild output | Vite/Rollup output | Heavy contribution |
| --- | ---: | ---: | --- |
| Root `Button` | 301,713 bytes | 229,226 bytes | date/chart/carousel: 0 bytes |
| `./primitives` `Button` | 155,645 bytes | 116,588 bytes | date/chart/carousel: 0 bytes |
| `Calendar` positive control | 324,570 bytes; date 138,481 | 268,748 bytes; date 258,090 | retained |
| `ChartContainer` positive control | 205,812 bytes; chart 10,833 | 156,926 bytes; chart 9,779 | retained |
| `Carousel` positive control | 201,225 bytes; carousel 51,001 | 162,076 bytes; carousel 50,779 | retained |
| `DateTimePicker` positive control | 757,027 bytes; date 139,276 | 649,059 bytes; date 259,971 | retained |

The candidate packed artifact is 431,910 bytes with 230 dist files. All five package exports resolve, root and primitives runtime imports execute, declarations/fonts/licences/README/MIGRATION are present, sourcemaps contain no `node_modules`, and all bare imports are declared. CSS and preflight remain 240,923 and 8,179 bytes respectively. Host-level repository smoke verification passed all 469 tests; the sandbox-only run failed before browser launch with Chromium Mach-port permission denial.

The Sol advisor reviewed the corrected evidence and returned `KEEP_CURRENT_CONTRACTS`. The current root and `./primitives` named-export contracts remain unchanged; W3 is accepted on emitted consumer bundle contribution, not zero graph traversal or optional installation under native ESM.

## Commit and stop rules

Commit 1 contains only this plan. Commit 2 contains only `packages/design-system/vite.config.ts`. A final progress commit may update this plan after review evidence is available.

Do not push or open/update a PR from this task. Do not change the public export map or source architecture inside W3.

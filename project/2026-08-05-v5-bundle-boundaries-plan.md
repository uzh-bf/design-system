# v5 W3 bundle boundaries plan

Status: draft PR publication authorized; merge and release held
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
- No `latest`/4.1.6 release, npm publish, tag, deploy, merge, or ready-for-review action. Push and draft-PR creation are allowed only under the explicit authorization recorded below.
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
- [x] Run required maintainability, security, and integrated final-outcome reviews on committed scope; Terra returned APPROVE_WITH_CONCERNS with one low-severity auditability concern, closed in the reproducibility record below.
- [x] Ask the Sol advisor to challenge the input-count interpretation; it returned `KEEP_CURRENT_CONTRACTS` and recommended the corrected consumer-bundle measurements.
- [x] Commit the revised verification progress and scope ruling.
- [x] Close the final-review reproducibility concern without changing implementation behavior.
- [x] Receive explicit authorization to push this branch and open a draft PR against `v5`; keep merge, ready-for-review, deployment, tag, and npm-publication gates separate.

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

## Reproducibility record

All consumer checks ran from the W3 worktree with temporary fixtures under /private/tmp; no verification fixture was added to the repository.

The candidate package was created with:

    pack_dir=$(mktemp -d /private/tmp/design-system-w3-pack.XXXXXX)
    VOLTA_FEATURE_PNPM=1 pnpm --dir packages/design-system pack --pack-destination "$pack_dir"

The resulting pnpm tarball was 431,910 bytes with SHA-256 a9c49dbfe15620962827bfeccfe1438c2dd1f8a1fa734ba2455b20e08a1de2b6. The plan's tarball measurements use pnpm pack. For comparison, npm pack --dry-run --json with a task-local NPM_CONFIG_CACHE reported size: 427012, unpackedSize: 1355897, and entryCount: 233; the npm dry-run metadata size is not mixed with the pnpm tarball byte measurement.

The packed consumer fixture used the following setup:

    fixture=$(mktemp -d /private/tmp/design-system-w3-consumer-bytes.XXXXXX)
    mkdir -p "$fixture/node_modules/@uzh-bf"
    tar -xzf "$candidate_tgz" -C "$fixture/node_modules/@uzh-bf"
    mv "$fixture/node_modules/@uzh-bf/package" "$fixture/node_modules/@uzh-bf/design-system"
    ln -s "/Users/rschlae/Git/df/design-system/trees/rs-v5-bundle-boundaries/packages/design-system/node_modules" "$fixture/node_modules/@uzh-bf/design-system/node_modules"

Each consumer case generated the same source shape, replacing Symbol and the package specifier per case:

    import { Symbol } from "package";
    console.log(Symbol);

The esbuild check used the local esbuild 0.25.5 binary and these options:

    stdin: { contents: source, loader: "tsx", resolveDir: fixture, sourcefile: "entry.tsx" }
    bundle: true, format: "esm", platform: "browser"
    metafile: true, write: false, logLevel: "silent"

It summed bytesInOutput for positive-output entries in Object.values(result.metafile.outputs)[0].inputs and separately inspected emitted code for retained heavy imports. The marker groups were date: /date-fns|react-day-picker|@date-fns\/tz/, chart: /recharts|d3-|victory-vendor/, and carousel: /embla-carousel/. Cases were root Button, ./primitives Button, Calendar, ChartContainer, Carousel, and DateTimePicker.

The Vite/Rollup check used Vite 6.3.5 with a virtual-entry plugin and:

    build({
      root: fixture,
      configFile: false,
      logLevel: "error",
      plugins: [virtualEntryPlugin],
      build: {
        write: false,
        minify: false,
        rollupOptions: { input: virtualName }
      }
    })

It summed renderedLength for matching entries in each returned chunk's modules object and inspected chunk.imports for retained heavy imports. The same six cases and marker groups were used. The artifact script ran from the extracted fixture directory with node --input-type=module; it resolved all five exports, imported root and primitives at runtime, checked the expected 230 dist files, rejected dist/node_modules, checked sourcemap sources, parsed every published JavaScript import against declared dependencies and peers, and verified CSS bytes.

The browser command was:

    VOLTA_FEATURE_PNPM=1 pnpm --dir packages/design-system test:smoke

The host-level run passed all 469 tests. The sandbox run stopped before browser launch with Chromium Mach-port permission denial, so it is recorded as an environment limitation rather than a product failure.

Static analysis used opengrep scan --config auto. For the base comparison, origin/v5 was exported with git archive --format=tar origin/v5 -o "$scratch/base.tar" into a disposable directory, indexed with git init -q and git add --all, and scanned with the same OpenGrep command. Head and base each produced 36 findings and two partially analyzed files; normalized check_id, path, line, and column fingerprints had zero additions and zero removals, and neither run found packages/design-system/vite.config.ts. The first sandbox scan could not write OpenGrep's global log, so the recorded scan was rerun at host level.

Terra's final read-only review covered origin/v5..49b37db7 and returned APPROVE_WITH_CONCERNS; it found no security, runtime-resolution, or contract defect. Its only concern was missing reproducibility detail and the unspecified pack method. This record closes that concern. The follow-up changes only this plan, so the reviewed implementation behavior is unchanged.

## Commit and stop rules

Commit 1 contains only this plan. Commit 2 contains only `packages/design-system/vite.config.ts`. A final progress commit may update this plan after review evidence is available.

The user explicitly authorized pushing this branch and opening a draft PR against `v5`. Do not mark it ready, merge, deploy, tag, or publish npm from this task. Do not change the public export map or source architecture inside W3.

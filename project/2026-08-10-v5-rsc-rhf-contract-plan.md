# Draft plan — v5 RSC/RHF public contract

Status: Approved; A1+D1 ruling accepted 2026-08-10
Date: 2026-08-10
Repository: `/Users/rschlae/Git/df/design-system`
Base: fresh branch from `origin/v5` at merged P0; P1 remains a separate local branch
Delivery: one full-path Design System PR; no push, PR creation, merge, tag, publication, deployment, consumer migration, or GA promotion authorized by this draft

## Progress

- Slice 1 — implementation committed locally: build the packed Next App Router
  tracer bullet and split RHF behind `./react-hook-form` while keeping `.` and
  `./primitives` RHF-free.
- Evidence: package build, source type check, lint, format check, metadata
  checks, and emitted client-directive preservation all pass. The isolated
  fixture installs its packed tarball with pnpm 11.21.0; `next build` and
  `next build --webpack` both pass, including the root Server Component import
  and client RHF leaf compilation.
- Environment gap: the required Playwright hydration interaction is not
  runnable in this macOS sandbox. Chromium exits before launch with
  `bootstrap_check_in ... Permission denied`; the same failure occurs through
  the native Node browser runtime. No product failure is inferred from this
  gap.
- Intermediate review: Terra returned `DONE_WITH_CONCERNS` for
  `70eb98a..324c79d`. The accepted confidence-100 finding is that direct entry
  scans do not prove transitive RHF-free root and primitive graphs. Slice 2
  therefore includes recursive emitted-graph checks and a packed
  `./primitives` Server Component import.
- Slice 2 — implementation ready locally: the recursive graph checks pass for
  101 root modules and 56 primitive modules; both packed Next build modes pass
  with root and primitive server imports; and the separate packed root-only and
  dedicated consumers pass type, runtime, CSS, optional-peer, distinct-label,
  and removed-root-export checks.
- Environment gap carried: Playwright still cannot launch Chromium in this
  macOS sandbox, so hydration/submission remains unverified.
- Fixture hardening: both packed verification scripts refresh only the local
  tarball integrity in the isolated copied lockfile because `pnpm pack` emits
  nondeterministic archive metadata; external dependency resolutions remain
  frozen.
- Slice 3 — implementation committed locally: migration and README examples
  use `./react-hook-form`; RHF stories and type contracts use the dedicated
  source entry; and package check, lint, format, and whitespace checks pass.
- Final contract fixes are committed locally: direct declaration-boundary
  assertions, standalone root-only and dedicated packed lockfiles, a legacy
  `typesVersions` compile, emitted-directive coverage, a shared packed-artifact
  helper, and removal of the orphan `src/Form.tsx`.
- The ADR and plan status corrections are included in the current local
  documentation commit.
- Build review fix committed in `8628709`: the client-boundary build hook now
  generates an offset-aware sourcemap when injecting `use client`, and the
  packed Next verifier checks that the emitted map retains its source and
  directive offset. Package checks, packed consumers, both Next build modes,
  recursive RHF-free graphs, and the 89-directive scan pass after the fix.
- Next: rerun the exact-range security, maintainability, and integrated final
  reviews. The browser hydration gate remains an explicit environment blocker,
  and P2 delivery authority remains separate.

## Research

- Question: Does the current compiled package satisfy the roadmap's RSC
  contract? Evidence: source contains 124 top-level `use client` directives,
  compiled JavaScript contains 0, root `dist/index.js` re-exports `Form` and
  `Rhf*`, root declarations import `react-hook-form` types, and the current
  package has no `./react-hook-form` export.
- Question: Is the proposed split technically feasible? Evidence: the
  disposable prototype at
  `/private/tmp/design-system-p2-prototype-rsc/RESULT.md` reports a failing
  current synthetic graph and a passing synthetic graph when client directives
  are preserved and RHF moves behind a dedicated client entry.
- Limitation: the prototype is not a Next build. It does not prove Next's
  webpack/Turbopack condition resolution, client-reference manifest, tree
  shaking, packed artifact resolution, or a version matrix. A real packed Next
  fixture is mandatory in this package.
- Consumer evidence: VetSim required a client wrapper around a root import;
  the GBL demo-game remains on the Pages Router and currently imports the RHF
  wrappers from the root. These are compatibility evidence, not RSC proof.
- Option A1 build spike: a temporary split built and packed successfully,
  preserved 89 emitted client directives, left the root runtime/type graph RHF
  free, and resolved the dedicated entry. It also exposed that `./primitives`
  still reaches RHF through its existing `ui/form` re-export. The optional-peer
  contract is therefore incomplete unless the primitive door is split too.

## Problem

The accepted two-door API currently exports RHF runtime and declaration edges
from the root. The package build strips every source `use client` boundary, so
an App Router Server Component importing an unrelated root composite can reach
`react-hook-form` through the server graph. This contradicts the GA roadmap's
required RSC contract and leaves VetSim with a workaround.

## Planning-stage review

- The configured read-only planner returned `DONE` after the plan incorporated
  the optional-peer, tracer-bullet, packed-Next, directive, `typesVersions`,
  `FormLabel`, and `./primitives` checks.
- The user approved Option A1 + D1: both existing doors are RHF-free; RHF is
  optional at install level and available through `./react-hook-form`.

## Decision gate

The roadmap requires a ruling before implementation. Choose the public
contract and the install-level RHF policy together:

| Option | Contract                                                                                                                                                                                             | Consequence                                                                                                                                                            | Recommendation                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| A      | Keep root non-form composites server-importable; preserve emitted per-module `use client`; remove `Form` and `Rhf*` from root; add client `./react-hook-form` entry for `Form` and the four wrappers | Pre-GA public break; server consumers can import non-form root composites; RHF remains explicit and client-only                                                        | Recommended                                          |
| B      | Keep root `Form`/`Rhf*` exports and declare the entire root client-only                                                                                                                              | Smallest package change; every Server Component importing root composites needs a consumer client boundary; does not satisfy the roadmap's root server-import contract | Reject unless explicitly accepted as the GA contract |
| C      | Keep root exports and add a compatibility alias or alternate `./forms` door                                                                                                                          | Preserves the current RSC edge and recreates the multi-door ambiguity rejected by ADR 0001                                                                             | Reject                                               |

For Option A, also choose the peer policy and primitive-door scope:

| Policy | Contract                                                                                           | Consequence                                                                               | Recommendation                                      |
| ------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- |
| A1     | `react-hook-form` becomes an optional peer; consumers of `./react-hook-form` install it explicitly | Root-only consumers can install and run without RHF; the RHF door remains explicit        | Recommended                                         |
| A2     | `react-hook-form` remains a required peer                                                          | Simple migration story, but root-only consumers still install an unused client dependency | Reject unless explicitly required for compatibility |

For the primitive door, choose one scope:

| Scope | Contract                                                                                              | Consequence                                                                                 | Recommendation |
| ----- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| D1    | Remove the RHF-aware `ui/form` exports from `./primitives`; expose them only from `./react-hook-form` | Both existing component doors are RHF-free; the dedicated door is the only RHF runtime path | Recommended    |
| D2    | Keep `ui/form` under `./primitives`                                                                   | `./primitives` remains RHF-dependent and is not a server-safe raw primitive door            | Reject for GA  |

Recommended ruling: Option A1 + D1. It supersedes ADR 0001's deferred
per-feature split, makes both existing doors RHF-free, and retains the RHF
family under one explicit client entry. If the user selects Option B, A2, or
D2, stop this draft and create a revised ADR, slice plan, test portfolio, and
planning review before implementation. No compatibility alias is planned.

## Public contract after Option A

- `.` exports UZH composites and primitives-compatible root exports that do not
  require RHF runtime or types.
- `./react-hook-form` exports `Form`, `FormControl`, `FormDescription`,
  `FormField`, `FormItem`, `FormLabel`, `FormMessage`, `useFormField`,
  `RhfTextField`, `RhfNumberField`, `RhfSelectField`, and `RhfMultiSelect`.
- Under A1, `react-hook-form` is listed in `peerDependenciesMeta` as optional;
  the dedicated-entry consumer must still install it. Root-only consumers
  must not need it at runtime or in the root declaration graph.
- `./primitives`, `./css`, `./preflight.css`, and `./package.json` keep their
  current contracts except that the RHF-aware `ui/form` exports are removed
  from `./primitives` and move to `./react-hook-form`.
- Root `Form` and `Rhf*` exports are removed as a deliberate pre-GA break;
  `MIGRATION.md` gives the explicit subpath migration.
- The root's existing custom `FormLabel` remains the root export. The
  RHF-aware `FormLabel` is exported only from `./react-hook-form`.
- `typesVersions` includes an exact `react-hook-form` mapping to
  `dist/react-hook-form.d.ts` before any wildcard mapping, or is replaced by a
  contract that modern TypeScript and the fixture both resolve correctly.
- The emitted build preserves top-level `use client` directives on client
  modules. The implementation must avoid a dependency unless the existing
  Vite/Rollup seam cannot preserve the directive reliably.
- The root entry itself remains server-classified; a build hook that marks the
  root entry client-side is a contract failure, not an acceptable shortcut.
- `./primitives` also remains RHF-free and server-safe; it must not retain the
  `ui/form` re-export.

## Risks

- A directive-preservation plugin or custom build hook may mark too many
  modules client-side or silently fail after a Vite/Rollup upgrade.
- Removing root declarations may leave an indirect RHF type import through a
  shared declaration bundle.
- A synthetic graph can pass while a real packed Next fixture fails to produce
  the expected server/client manifests.
- Existing Pages Router consumers and current alpha consumers need an explicit
  migration path; no consumer migration is part of this PR.
- `Form` and `Rhf*` removal is a public break and requires the ADR to be
  superseded before implementation.

## Test portfolio

| Risk                                              | Test obligation                                               | Primary seam                                                        | Distinct failure                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Root server graph reaches RHF                     | Add new packed integration                                    | Next App Router server page importing root `Button`                 | Root import fails under RSC because RHF or client-only runtime leaks into server graph |
| Client boundaries disappear in dist               | Add new built-package contract                                | Built module directive scan plus Next fixture                       | Source has `use client`, but published modules do not                                  |
| Dedicated RHF entry is missing or incomplete      | Extend existing RHF type contract and add packed import proof | `./react-hook-form` exports and client leaf                         | Client consumer cannot import wrappers/Form or declarations resolve the wrong door     |
| Existing non-RHF root exports drift               | Extend packed export proof                                    | Root/primitives/CSS/preflight export resolution                     | P2 fixes break existing public doors                                                   |
| Intentional root break is undocumented            | Extend migration/contract checks                              | `MIGRATION.md` and type-level negative assertions where stable      | Consumers keep using removed root RHF exports without a clear migration                |
| Root is accidentally classified as a client entry | Add a negative built-package assertion                        | `dist/index.js` directive and packed server import                  | A broad directive hook makes Option B pass accidentally                                |
| Optional peer contract is false                   | Add packed consumers with and without RHF                     | Root-only and primitives-only fixtures plus dedicated-entry fixture | Existing doors still require RHF or the RHF door lacks its peer                        |
| TypeScript resolves the wrong door                | Extend packed type compilation                                | `typesVersions` exact subpath and package `exports.types`           | `./react-hook-form` declarations resolve to the root declaration bundle                |

## Slices

### Slice 0 — ADR and clean branch baseline

- Do: record the accepted A1+D1 ruling in a superseding ADR; create the fresh
  `rs/v5-rsc-rhf-contract` branch from `origin/v5`; commit this approved plan
  and ADR before implementation.
- Check: branch is based on fetched `origin/v5`; no P1 or unrelated dirty
  changes are copied; ADR names the root/subpath contract, peer policy,
  primitive-door scope, and break boundary.
- Commit: `docs(project): plan v5 RSC RHF contract` plus ADR in the same plan
  boundary only after the ruling and planning review.

### Slice 1 — make the packed RSC tracer bullet pass

- Do: add the smallest pinned fixture at
  `packages/design-system/tests/rsc/next-consumer` before changing the build.
  Run it once against the current packed artifact and record the expected
  failure in the command output, but do not commit a red fixture. In the same
  slice, add `src/react-hook-form.ts`; remove root `Form`/`Rhf*` exports; add
  the third Vite entry and package export; preserve source `use client`
  directives in emitted modules; set the A1 peer metadata and exact
  `typesVersions` mapping; remove `ui/form` from `src/primitives.ts` so both
  existing doors are RHF-free.
- Fixture contract: pin Next `16.2.9`, React `19.2.7`, React DOM `19.2.7`,
  RHF `7.80.0`, and Playwright to repository-supported versions. Keep the
  fixture outside the root workspace; commit its external-dependency
  lockfile. The verification script packs the DS package, copies the tarball
  into an isolated temporary fixture, installs the pinned dependencies with
  the local tarball substituted only in that copy, and never resolves a
  workspace source alias.
- Check: the same fixture passes after the implementation with `next build`
  and `next build --webpack`; its server page imports a non-form root `Button`,
  its client leaf imports `./react-hook-form` and renders a real RHF wrapper,
  and Playwright fills the RHF text field, submits the form, and asserts the
  rendered submitted value after hydration. Use build/runtime output as the
  acceptance assertion; inspect manifests and server chunks only as
  diagnostics. Also assert package build/type checks, root server-classified
  output, preserved client directives, no root RHF runtime/type edge, a live
  dedicated RHF edge, no RHF edge from root or primitives, and
  root/primitives/CSS/preflight export resolution.
- Commit: `build(rsc): split RHF entry and preserve client boundaries`.

### Slice 2 — optional-peer and packed type contract

- Do: add a root-only packed consumer that omits RHF and a dedicated-entry
  packed consumer that installs RHF. Compile imports from `.`,
  `./react-hook-form`, `./primitives`, `./css`, and `./preflight.css`; assert
  that root `FormLabel` and RHF-door `FormLabel` remain distinct.
- Check: root-only install/build succeeds without RHF; dedicated-entry
  install/build succeeds with RHF; TypeScript resolves the exact subpath
  declaration; removed root `Form`/`Rhf*` imports fail with the intended
  migration error.
- Commit: `test(rsc): prove packed peer and type contracts`.

### Slice 3 — migration docs and integrated verification

- Do: document the import break and migration in `MIGRATION.md`; update the
  existing RHF stories/contracts to use `./react-hook-form`; record the exact
  evidence and final progress.
- Check: design-system package checks, focused RHF contracts, both packed
  consumers, both Next build modes, hydration interaction, lint, format, build,
  and exact security/maintainability/integrated reviews pass. Run an
  intermediate public-contract review after Slice 1 because it changes
  architecture and a public export boundary.
- Commit: `docs(rsc): document RHF subpath migration and evidence`.

## Authority and stop conditions

- This package authorizes only local implementation and commits after the
  Option A1 + D1 ruling and plan approval.
- Push, PR creation/update, PR readiness, merge, candidate alpha publication,
  consumer migration, deployment, and GA promotion remain separate gates.
- Stop if no Option A1 + D1 ruling is given, if the root can only be made
  server-safe by weakening the two-door contract, if a real packed Next
  fixture cannot prove the server/client seam, or if the ADR, peer metadata,
  `typesVersions`, primitive exports, and generated declarations disagree.

## Next step

Commit this approved plan and ADR as the first P2 branch commit, then execute
Slice 1 as the red-to-green packed RSC tracer bullet.

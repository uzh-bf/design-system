# v5 Recharts runtime and chart compatibility

## Outcome and approval

Migrate the existing chart composition to Recharts 3 and implement ADR0007's
required application-owned runtime. Applications keep importing directly from
Recharts and using our existing container, tooltip, legend and theme support.
Every design-system consumer must satisfy the new peer, even without charts.
Approval mode: executable batch. The user approved this reviewed plan on
2026-10-23, including the next native stack layer and qualified draft delivery.

- Repository/target: `uzh-bf/design-system`, release trunk `v5`.
- Prerequisite: reviewed [catalog matrix](2026-10-23-v5-radix-capability-matrix.md)
  and completed [catalog documentation package](2026-10-23-v5-catalog-compatibility-plan.md).
- Approved branch: `rs/v5-recharts-compatibility`, one draft layer following the
  component-compatibility layer in native stack221, in the existing worktree.
  Chart investigation may precede that layer; shared manifest/lock integration
  and topology remain serialized and parent-owned. This plan records the approved
  layer addition; main remains the sole topology owner.
- Main owns integration and dependency/public contracts; a bounded executor may
  adapt settled chart internals while main extends packed acceptance.
- Terminal: six-family and tooltip-category synthetic chart proof, exact packed/dependency proof,
  required checks, simplification and independent final review, then ordinary
  non-force push and qualified draft delivery. Keep the PR draft.
- No GBL/Klicker writes or merges, readiness conversion, package publication,
  release, deployment, live data, paid API work or human notifications.

## Decisions and proposed versions

[ADR0007](../docs/adr/0007-application-owned-recharts-runtime.md) owns runtime
ownership and the non-chart installation cost. This plan implements it without
creating an optional subpath or another chart engine. ADR0002's RHF isolation and
ADR0005's application adaptations remain binding. No product primitive changes;
chart components are presentation. A new engine, optional entry point or changed
runtime ownership requires a new ruling/ADR disposition before implementation.

The pinned shadcn app uses Recharts 3.8.0. The registry latest on 2026-10-23 is
3.10.1. Propose required peer `recharts >=3.8.0 <4` and exact development
version 3.10.1, removing regular dependency2.15.4. Qualify both 3.8.0 and 3.10.1 in
packed consumers before claiming that supported range; a peer declaration alone
proves neither compatibility nor one runtime. Do not automatically chase latest
again during the package without a concrete blocker.

Recharts 3.10.1 declares `react-is` as a peer alongside React/ReactDOM. Require
packed fixture applications to supply a React-matching `react-is` version and
verify it at runtime resolution. Document that transitive peer requirement;
inspect the minimum's metadata before fixing fixture locks. Keep DS's existing
React19 contract; do not broaden React support or silently bundle React,
ReactDOM, react-is, RHF or a second Recharts runtime.

## Scope and slices

1. **Dependency ownership and build seam.** Update
   `packages/design-system/package.json`, `pnpm-lock.yaml`, and each existing
   packed/Next fixture manifest and relevant lock variant to supply compatible
   Recharts/react-is. Preserve installed fixture package-manager versions.
   Existing `vite.config.ts` derives externals from manifest; change it only if
   a verified missing peer/subpath external remains. Build declarations early.
2. **Chart compatibility.** Adapt existing `src/ui/chart.tsx` and retained
   `src/Chart.tsx` exports. Preserve `ChartConfig`, container, tooltip, legend,
   style helper and import paths. Replace obsolete Tooltip-prop derivation with
   supported custom-content typing; preserve formatter/name/label payload
   behavior, custom icons and caller class precedence. Correct the verified
   `item.value &&` defect: render zero and omit null/undefined values, preserving
   explicit formatter output. Add the pinned `initialDimension` option with its
   320×200 fallback and preserve explicit caller sizing. Honor new accessibility
   behavior and controlled interaction, without unsafe casts hiding API failures.
3. **Compositions and packed proof.** Extend existing `Chart.stories.mdx` with
   representative six plot families (area, bar, line, pie, radar, radial) and tooltip states from the
   pinned gallery. Extend existing public types/browser and packed Next seams
   for direct Recharts composition, responsive sizing and dependency identity.
   Add the named `tests/contracts/chart-composition.spec.ts` for cohesive
   chart interaction, zero/null values and `initialDimension` behavior, using
   test-owned synthetic fixtures.
4. **Qualify and document.** Update `packages/design-system/MIGRATION.md`,
   existing chart docs, affected matrix rows and this plan's Progress. Document
   install changes and consequential Recharts 3 migration differences, then
   simplify and perform configured risk/final reviews and draft delivery.

### Concrete endpoint matrix and ownership

Use three packed cells: Recharts 3.8.0 with RHF7.90.0; Recharts 3.10.1 with
RHF7.90.0; Recharts 3.10.1 with RHF7.59.0. The minimum/current Recharts cells
both include strict root-only, dedicated RHF and Next browser composition.
The last cell retains the existing RHF minimum gate without a redundant full
cross-product. Keep source/build chart tests on exact dev 3.10.1.

Extend existing `tests/rsc/packed-consumers/scripts/verify.sh` and
`tests/rsc/next-consumer/scripts/verify.sh` with a bounded
`RECHARTS_VERSION=3.8.0|3.10.1` selector. Existing default/current and
`pnpm-lock.rhf-minimum.yaml` locks encode Recharts 3.10.1. Add only named
`pnpm-lock.recharts-minimum.yaml` in each of
`tests/rsc/packed-consumers/consumers/root-only/`, `.../dedicated/` and
`tests/rsc/next-consumer/`. Stage the selected manifest version/lock into the
existing disposable fixture before frozen install; reject unsupported combinations
or unknown endpoints rather than silently falling back. Keep the existing RHF
selector and package-manager pins. Existing `prepare-packed-artifact.mjs`
continues to qualify archive identity. Put chart composition in the existing
Next `app/page.tsx` via a new explicitly client-only `app/chart-leaf.tsx`;
add named `tests/chart.spec.ts` in that fixture for responsive interaction.

Extend `tests/rsc/packed-consumers/scripts/assert-installed-dependencies.mjs`:
assert Recharts is a required, non-optional DS peer, absent from regular
runtime dependencies; resolve the expected endpoint from both fixture and
installed DS contexts to the same real package path. Resolve React/ReactDOM
and react-is from application, DS and Recharts contexts as applicable, checking
compatible versions and identity where shared; a fixture manifest alone cannot
prove runtime identity. Retain exact checks on all existing regular dependencies.
Add one narrowly scoped `tests/rsc/packed-consumers/scripts/assert-installed-dependencies.test.mjs`
with synthetic manifests/module paths to prove the guard rejects duplicate or
wrong peer resolution and accepts a shared runtime; no real package source is
pinned by hashes/content in that test.

| Slice                         | Owner and dependency                                  | Acceptance                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ownership/build               | main; approved plan and source refs                   | Three fixture manifests and lock variants, required peer and exact development version build cleanly                                                                                               |
| Chart source                  | native executor; after manifest/types seam is settled | Only `src/ui/chart.tsx`, retained `src/Chart.tsx`, `src/Chart.stories.mdx`, `tests/contracts/chart-composition.spec.ts` and public type fixture; zero/null/formatter and initialDimension behavior |
| Packed proof                  | main; after source integration                        | Runner/guard, the named locks and Next client/test files above; all three cells prove selected runtime and boundaries                                                                              |
| Integrated qualification/docs | main; all prior slices                                | Required checks, gallery, exact artifact proof and final review; ordinary draft delivery                                                                                                           |

Do not copy every gallery recipe, regenerate unrelated files or update consumer
repositories. Preserve legacy imports and expose current recipe capability;
upstream style differences do not justify overwriting neutral/UZH choices.

## Test portfolio

Test obligation: extend existing for dependency/peer guard, public chart types
(`tests/contracts/public-contracts.types.ts`), RSC/packed runner and required
checks; add new only for the named chart interaction contract, Next chart
client/browser fixture and focused dependency-guard behavior test. Existing
visual/a11y gates are retained; screenshots/manual checks add no duplicate
test harness. Each new test observes chart/runtime behavior, not recipe text.

Existing chart story and global visual/a11y checks demonstrate basic rendering;
they do not prove six-family and tooltip APIs or peer identity. Existing public contracts,
RSC and packed fixtures supply stable seams; add only missing behavior coverage.

| Risk                                         | Verification obligation                                                                                                                                                | Primary seam                                                                       |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Two runtimes or undeclared install contract  | Each min/current packed cell resolves one compatible Recharts and matching React/react-is; non-chart root consumer imports/builds without chart use and satisfies peer | Existing packed installed-dependency guard and strict root/dedicated fixture locks |
| Tooltip/legend public types or values break  | Direct Recharts charts compose with DS content at both endpoints; labels, null/zero values, formatter and legend payload behave correctly                              | Existing public type contracts and focused chart interaction checks                |
| Responsive container silently renders empty  | Measure nonzero chart geometry at phone/desktop widths, resize and hidden-to-visible cases, with explicit min-height/aspect                                            | Existing Ladle/Next browser seam                                                   |
| Recharts 3 changes controlled interaction    | Initial `defaultIndex`, controlled active state, pointer and keyboard navigation work; no reliance on keyboard firing onMouseMove                                      | Focused synthetic chart contracts                                                  |
| Theme/color is unreadable                    | Both themes use reactive tokens; legend/text alternatives and non-colour cues preserve meaning, intended pairs/series are measured                                     | Chart stories, visual/a11y and browser checks                                      |
| Chart changes leak across package boundaries | Required package types/build, root/primitives Next composition, optional RHF isolation, minimum/current RHF cells, size/CSS gates remain green                         | Existing package and packed gates                                                  |

Run container-dependent checks in the task container. Start with build/types and
one packed chart/one non-chart installation. Then qualify the two Recharts
endpoints; avoid multiplying every unrelated RHF/version combination without a
separate risk. Keep the existing required RHF checks green. Archive digest and
installed-file equality must identify the actual rebuilt candidate.

Synthetic gallery captures use real browser interactions for all seven recipe-category
representatives, neutral-light/dark and UZH-light, desktop/phone layouts, keyboard
focus and a tooltip/legend state. Use `rs-build-screenshot-gallery`, publish only
reviewed synthetic evidence through `gh`, and verify readback in the draft body.
Manual screen-reader, Safari and physical-device qualification remain GA work.
Stop the exact task runtime after the final browser check.

## Research and stop conditions

Current [shadcn chart docs](https://ui.shadcn.com/docs/components/radix/chart)
retain direct Recharts composition and explain v3 token, tooltip and measurement
changes. The official [Recharts 3 migration guide](https://github.com/recharts/recharts/wiki/3.0-migration-guide)
and current Context7 lookup confirm `TooltipContentProps`, changed refs,
accessibility enabled by default and keyboard events no longer reaching
`onMouseMove`. Use package version declarations as the final type authority;
Context7 main documentation is guidance, not proof for both endpoints.

No unresolved product ruling is required by this proposal. Versions are
proposals until the min/current acceptance passes. Stop for an evidenced need
to drop required legacy imports, require a new public subpath/backend, widen the
peer beyond major3, weaken budgets or amend ADR0007. Routine adapters and a
compatible narrower proven range may be proposed with evidence before changing
the approved support promise. Publication and final integrated consumer proof
follow this package and retain their own authority.

## Progress

Checkpoint: 2026-10-24. The user approved both executable plans on 2026-10-23;
standard execution mode and the existing `project/` artifacts root remain in use.

- **Implemented:** [chart draft #224](https://github.com/uzh-bf/design-system/pull/224)
  follows [component draft #223](https://github.com/uzh-bf/design-system/pull/223)
  in native stack 221. Main owns remaining integration and qualification. Required
  Recharts ownership, custom-content types, zero/null formatting, initial sizing,
  all six plot families and tooltip recipes are implemented. The shared story
  helpers have multiple callers and stay outside public entries. Only the
  unimported historical Recharts 2 chart is excluded from app/build type checks.
- **Verified locally:** types, lint, formatting, build, 12 chart contracts,
  14 chart accessibility cases, 704 packed-CSS assertions and seven dependency
  guard cases pass. All three frozen Recharts/RHF cells pass strict root/dedicated
  imports, runtime identity, both Next builds and 10 browser cases. The lower
  test-only readiness correction `30e001315` waits one task for Radix's deferred
  outside-pointer listener: ten repeats and all 130 integrated contracts pass.
  Earlier failures and the producing diagnostic evidence remain in the journal.
- **Reviewed and evidenced:** both slice simplifications found no warranted
  reduction. Source risk reviews accept dependency, public-payload and RSC seams;
  one proposed guard-test finding was verified and retracted. Final review found
  an array-valued tooltip regression, corrected by restoring locale formatting
  for non-null scalar and range values in the existing payload contract. Independent integrated source review and focused correction reviews pass.
  Exact-head hosted CI remains pending. All 42 chart
  captures are published and rendered; the same unpublished archive matches all
  268 installed files at both Recharts endpoints. The a11y oracle and CI consumer
  matrix deliberately cover the six new stories and three endpoint cells.
- **Budget decision:** named imports reduce the responsive wrapper to about 10.3 kB
  at Recharts 3.8.0 and 11.0 kB at 3.10.1. The existing 34,000-byte ceiling passes;
  the historical 25,000-byte positive minimum rejected this legitimate reduction.
  The user approved changing only that minimum to 8,000 on 2026-10-24. The
  34,000-byte ceiling and resolved-Recharts module marker remain intact.
  The complete size/marker check passes with the applied calibration.
- **Next action:** qualify the applied budget calibration through exact-head CI
  and a final feedback settle. The component draft is already qualified. Keep
  consumer repositories, readiness conversion, merging,
  publication and deployment outside this package. Manual AT, Safari/device and
  separate integrated consumer acceptance remain GA gates.

Source completion includes injective chart-style identifiers, omission of an
all-null tooltip, and measured SVG sizing from an initially hidden panel.
Reviewed synthetic captures remain applicable because their visible examples
are unchanged. The size ruling is approved, and all original and forge findings
are resolved. Preserve this package source; record final exact-head CI and settle
evidence in the journal and PR description without another status-only commit.

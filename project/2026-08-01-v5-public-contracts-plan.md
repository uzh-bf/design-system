# Plan — v5 strict public prop contracts (Stack A1)

## Problem

The v5 custom public components still use broad index signatures in four
surfaces. Those signatures make arbitrary props compile and can silently pass
unsupported values into Radix or shadcn primitives.

## Evidence

- `packages/design-system/src/Button.tsx:9-32` has `[x: string]: unknown` and
  spreads the remainder into the shadcn button.
- `packages/design-system/src/Navigation.tsx:452-457` has the same escape hatch
  and spreads the remainder into the menubar root.
- `packages/design-system/src/Progress.tsx:7-19` has the same escape hatch and
  spreads the remainder into the Radix progress root.
- `packages/design-system/src/Workflow.tsx:13-22` permits arbitrary fields on
  every public step object returned to `onClick`.
- The current stories contain accidental custom-`Button` calls using raw
  primitive props such as `variant`; those call sites must be corrected rather
  than preserved through a new catch-all.
- The baseline direct TypeScript check passes. The repository's pnpm shim stops
  before execution because it cannot verify the pinned `pnpm@10.30.0` registry
  signature, so direct installed binaries are the local fallback until the
  toolchain issue is repaired separately.

## Decision

- Compose native attributes only where the component forwards them to the same
  underlying DOM/primitive root, using
  `React.ComponentPropsWithoutRef<typeof Primitive>` with an explicit list of
  component-owned keys omitted. `ref` remains rejected in A1 and is introduced
  only by the A2 direct-control-ref layer.
- Keep the existing opinionated props and their runtime behavior unchanged.
- Remove the four broad index signatures; do not replace them with `Record` or
  another generic escape hatch.
- Treat previously tolerated unsupported story props as call-site defects. Fix
  the stories or examples to use the custom component contract, and document
  the strictness change in `packages/design-system/MIGRATION.md`.
- Keep refs, selector conventions, bundle boundaries, and visual output out of
  this layer; those are A2/A3 or later stacks.

## Risk

- Removing the signatures may expose consumer-like story calls that were never
  part of the documented composite API. Each compile error must be classified
  as an intended native attribute, an accidental primitive prop, or a follow-up
  consumer migration; do not widen the type to make it disappear.
- `Button`, `Navigation`, and `Progress` forward native/ARIA attributes, while
  their custom `className`, controlled state, and variant props must continue to
  win over primitive defaults. The omitted-key lists are therefore part of the
  review contract.
- Workflow item metadata is intentionally narrowed. Consumers that depended on
  arbitrary item fields must model that data outside the component or receive a
  deliberate follow-up; this layer must not invent a generic replacement.

## Approved stack context

- Stack: A — public component contracts
- Layer: A1 of 3
- Worktree: `trees/rs-v5-public-contracts`
- Branch: `rs/v5-prop-contracts`
- Target/trunk: `v5` at `4aa021ac2b8fd43cad6076dcc30071feb87d97f6`
- Dependents: A2 `rs/v5-direct-control-refs`, then A3
  `rs/v5-composite-refs`
- Stack metadata at initialization: native `gh stack`, `trunk: v5`, all
  branches at the target tip, `needsRebase: false`. After the A1 commit, the
  dependent branches remain empty until an explicitly checkpointed stack
  rebase; no rebase or publication is authorized in this slice.
- Existing release PR: [#184](https://github.com/uzh-bf/design-system/pull/184)
  merged as the base commit above; never target or merge this stack into
  `main`.

## Do

1. Replace the four index signatures with explicit or correctly composed
   primitive props.
2. Compile the package and fix every newly revealed in-repo call site without
   changing unrelated components.
3. Add the strict-prop migration note and update only documentation that claims
   arbitrary custom fields/props remain supported.
4. Add a small durable no-emit type-contract fixture under `tests/contracts/`
   and
   wire it to a package script. Its `@ts-expect-error` cases must reject
   arbitrary props and `ref` while its positive cases accept the native/ARIA
   attributes that each component forwards.
5. Add one focused Ladle contract story and Playwright proof that representative
   delegated attributes land on the Button, Navigation, and Progress root DOM
   elements. Compile-time acceptance alone is not sufficient evidence of
   forwarding or correct root placement.

## Check

- Direct installed TypeScript: `/Users/rschlae/Git/df/design-system/node_modules/.bin/tsc --noEmit` from `packages/design-system`.
- Direct installed TypeScript: `/Users/rschlae/Git/df/design-system/node_modules/.bin/tsc -p tsconfig.types.json --noEmit` for the durable public-contract fixture.
- Direct installed ESLint on every changed TypeScript file with
  `--report-unused-disable-directives --max-warnings 0`.
- Prettier check on every changed file.
- Package build and Ladle build are mandatory A1 gates. Use direct installed
  binaries where they safely bypass only the pnpm signature shim; if either
  build remains unavailable, stop A1 at a verification blocker rather than
  calling the implementation green.
- The durable type fixture proves arbitrary props and `ref` are rejected for
  Button, Navigation, Progress, and Workflow step items, while forwarded
  native/ARIA attributes remain accepted.
- The focused Playwright proof verifies representative delegated attributes on
  the rendered Button, Navigation, and Progress root elements.
- Existing story/type compilation remains green; no visual or interaction
  behavior is intentionally changed in A1.

## Review routing

- Current-provider reviewer after the plan and implementation commits, using the
  exact commit range and the shared review rubric.
- Separate simplification pass after review; integrate only verified findings.
- Final Stack A review will add the mandatory security and maintainability gates
  before any draft stack submission or ready-for-review decision.

## Progress

- 2026-08-01: Stack A corrected and initialized with `v5` as the explicit
  trunk. A1 worktree is clean at `4aa021a`; no stack branches are pushed.
- 2026-08-01: baseline direct `tsc --noEmit` and ESLint pass. The pnpm shim's
  pinned-version signature verification fails before project execution; no
  `pmOnFail` override or dependency mutation was made.
- 2026-08-01: plan review required explicit without-ref composition, runtime
  forwarding proof, mandatory package/Ladle builds, and a durable type-test
  seam; all four findings were accepted into this plan.
- 2026-08-01: A1 implementation is complete in the working tree. Button,
  Navigation, and Progress now compose without-ref primitive props with
  component-owned keys omitted; Workflow step metadata no longer has a
  catch-all. A durable type fixture, contract story, and focused DOM proof were
  added, and raw-primitive story call sites were corrected.
- 2026-08-01: direct TypeScript, durable type-contract TypeScript, ESLint,
  Prettier, library `tsc`/Vite/font-copy, Ladle production build, and the
  focused Playwright proof all pass. The pnpm signature shim remains a separate
  package-manager blocker; no override or dependency mutation was made.
- 2026-08-01: implementation review identified three contract-proof gaps:
  Navigation's internally controlled `defaultValue`, invalid string ref
  negatives, and a Button assertion that did not prove `aria-label` forwarding.
  The fixes are now in the working tree; the focused Playwright proof passes
  against the updated story.
- Next: commit the verified review fixes, run the exact-range simplification and
  final review passes, then stop at the Stack A Gate 2 review before adding A2
  work. No stack rebase, push, PR submission, queue, or merge is authorized
  here; `v5` remains the only target and `main` is prohibited.

## Commit boundaries

- `docs(project): add v5 public contracts plan` — this plan only.
- `refactor(api): tighten v5 public prop contracts` — A1 implementation,
  affected stories/docs, and focused type evidence once verified.
- `test(api): harden v5 public contract checks` — verified review fixes for
  controlled Navigation props, valid ref rejection assertions, and Button DOM
  forwarding evidence.

## Out of scope / follow-ups

- A2 direct-control refs and A3 composite refs/Table migration.
- Stack B selector normalization, Stack C bundle budgets, Stack D VRT, and D8
  theme override/migration work.
- Repairing the pnpm registry-signature/toolchain issue; record it as a
  follow-up if it still blocks full package CI.

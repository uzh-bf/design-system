# v5 dependency and field improvement execution plan

Status: planner APPROVED after round 2 on 2026-09-06. User authorized independent implementation and stacked draft PR publication; merges and deployments remain withheld. Parent accepts the five API and dependency scope decisions.

The remaining work fits two new draft PR layers: compatible dependency modernization, followed by consistent field descriptions, error presentation, and accessibility. This is the reviewed execution contract for the remaining authorized stack.

**Approval summary**

Modernize dependencies used by `packages/design-system`, then improve field UX across the standalone text, number, textarea, and select controls and existing RHF wrappers. Preserve existing exports, Formik compatibility, value semantics, refs, styling hooks, validation timing, and neutral/uzh theme contracts.

Use additive descriptions and opt-in visible errors. Merge caller-provided description references with generated description/error references. Reuse existing Field primitives where they preserve those contracts. Do not introduce a second field framework or mechanically replace controls with InputGroup.

Existing authorization covers local implementation, commits, and publishing stacked draft PRs to `origin`. Merges, ready-for-review conversion, releases, deployments, upstream integration, and destructive cleanup remain excluded. The parent owns topology, integration, decisions, and publication.

Completion means both new layers pass their own checks and required reviews, are published as drafts, and have per-layer CI evidence. Manual screen-reader limitations must remain explicit.

**Verified baseline and concerns**

| Evidence                                                                                                                                                                              | Planning consequence                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Worktree HEAD is `04cfd66e0893f42b0e803ae8741cb06a5cddb69e`; upstream is `origin/v5`; ahead 8, behind 0. Parent’s fresh fetch is reused.                                              | Preserve this baseline; no additional fetch or integration performed.                                                     |
| Native `gh stack view --json` shows the existing input layer and [draft PR 210 — input stabilization](https://github.com/uzh-bf/design-system/pull/210). Stack API returns one stack. | Extend this stack in its existing worktree.                                                                               |
| Stack-local trunk metadata is `d511f0fa1`; fetched `origin/v5` is `80d6f229`. `origin/HEAD` points to `main`.                                                                         | Explicit target and existing PR base select `v5`; do not substitute `main` or silently synchronize the stale local trunk. |
| The input correction is committed, independently reviewed and published; the worktree is clean.                                                                                       | CI run 34026869813 passed at04cfd66e0. The affected independent final review passed.                                      |
| Root `AGENTS.md`, `CONTEXT.md`, and `docs/agents/` are absent from this worktree. Supplied instructions and accepted ADR 0002 apply.                                                  | Do not invent missing repository guidance.                                                                                |

The old dependency inventory at `/tmp/ds-v5-outdated.json` is unavailable. A fresh package-filtered registry query succeeded and returned outdated packages; its exit code 1 indicates outdated dependencies. Exact compatible targets still require version-range and release-note verification.

**Binding decisions for parent disposition**

| Decision                  | Recommendation and consequence                                                                                                                                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visible validation errors | Add `errorDisplay?: 'tooltip' \| 'inline'`, defaulting to `'tooltip'`. Inline mode renders one visible error node; preserve `hideError` and validation timing. Changing the default requires a separate ruling.                              |
| Typed pass-through        | Add explicit native attribute/event types with conflicting component-owned keys omitted. Preserve existing catch-all signatures during v5; removing them is a source compatibility change.                                                   |
| Description references    | Accept typed external references; tokenize and deduplicate them with generated description/error IDs. Keep caller IDs, even when outside the component. Generated references exist only while their nodes render.                            |
| Primitive adoption        | Reuse `FieldDescription` and `FieldError` where suitable. Retain existing labels and layout wrappers unless equivalence is demonstrated. Defer InputGroup migration: its height, border, SVG sizing, and focus behavior differ.              |
| Dependency scope          | Update compatible package dependencies/devDependencies using exact pins. Preserve consumer peer ranges, root tools, sibling packages, fixture direct dependency pins, and package release version. Assess later majors; do not install them. |

**Delegation Map**

This map describes implementation ownership. Completed verification workers are recorded in Progress.

| Slice and outcome                                                                                   | Execution owner | Dependency                                                            | Acceptance                                                                                       |
| --------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Dependency modernization — select compatible versions and update the bounded package graph          | `main`          | Parent completes input correction and hands over a clean reviewed tip | Version disposition, scoped lockfile diff, package checks, packed consumers, browser regressions |
| Field associations — descriptions, merged references, typed pass-through, invalid-state consistency | `executor`      | Dependency layer accepted; parent settles API table                   | DOM and type contracts across standalone/RHF controls                                            |
| Field presentation — opt-in inline errors and documented accessible compositions                    | `executor`      | Field associations integrated                                         | Both-theme browser, keyboard/mobile, accessibility and legacy-default evidence                   |
| Stack delivery — integrate, review, publish and verify both new layers                              | `main`          | Per-layer slice acceptance                                            | Required reviews, draft topology, per-layer CI, final receipt                                    |

Dependency selection stays with `main` because dependency compatibility and shared lockfile changes are tightly coupled. Delivery stays with `main` because it owns topology and external effects. The two executor slices run sequentially with one writable owner; they share form files.

**Stack topology**

Use only `trees/rs/v5-input-stabilization`.

| Layer                        | Branch and PR base                                                | Package                                                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Existing input stabilization | `rs/v5-input-stabilization`, base `v5`                            | Parent-owned [draft PR 210 — input stabilization](https://github.com/uzh-bf/design-system/pull/210), including the verified icon styling correction |
| Compatible dependencies      | `rs/v5-compatible-dependencies`, base `rs/v5-input-stabilization` | Dependency updates, necessary compatibility corrections, evidence and plan                                                                          |
| Consistent field UX          | `rs/v5-field-ux`, base `rs/v5-compatible-dependencies`            | Both field slices, their tests, stories, documentation and plan                                                                                     |

After parent handover, use `gh stack add rs/v5-compatible-dependencies`; after accepting that layer, use `gh stack add rs/v5-field-ux`. Publish reviewed tips with `gh stack submit --auto --remote origin`, then verify draft state and bases through `gh`.

Do not run `sync`, prune, reorder, or automatically rebase onto trunk. A required lower-layer correction returns to its owner; checkpoint topology before any approved propagation.

Dependency changes should have a small handwritten diff plus generated lockfile changes. The field package may exceed 400 handwritten lines: keep it one package because associations and presentation form one consumer contract. Reassess scope before exceeding roughly 25 files; do not manufacture a tests-only layer.

**Slice: compatible dependency modernization**

Paths: `packages/design-system/package.json`, the relevant importer and necessary dependency graph in `pnpm-lock.yaml`, and narrowly required compatibility fixes inside `packages/design-system`. This combined execution plan is persisted under `project/2026-09-06-v5-compatible-dependencies-plan.md`.

Create a version ledger containing current declaration, installed version, exact proposed target, engines/peer compatibility, release-note source, and update/hold disposition. Query each candidate within its current major; for `0.x` packages retain the compatible minor line unless separately assessed. Do not use workspace-wide `update --latest`.

Fresh registry examples include Radix Select `2.2.5 → 2.3.7`, RHF `7.59.0 → 7.87.0`, Ladle `5.0.3 → 5.1.1`, and axe `4.11.3 → 4.13.0`. These are candidates, not compatibility approvals.

Explicitly assess the later-major families:

| Family                                                         | Assessment and default disposition                                                               |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Day Picker, Resizable Panels, Recharts, Sonner                 | Map local adapters, exported types, DOM and styling exposure; retain current major.              |
| Vite, SWC plugin, declaration plugin, TypeScript               | Assess Node requirements, build plugins and declaration output together; retain current major.   |
| Zod                                                            | Inspect schema/type consumers and runtime behavior; retain major 3.                              |
| ESLint family, React Hooks plugin, Node types, pre-1.0 tooling | Assess configuration, supported runtime and public declaration effects; retain compatible lines. |

Keep Playwright at `1.61.0` in this package: `scripts/visual-regression.sh` pins the matching image and digest. Updating it independently would break the deterministic visual environment. Record the available update as held.

RHF requires special verification: `forms/rhf.ts` subscribes to private `control._subjects.state`. Re-run incomplete-number editing, reset-to-same-value, `resetField`, `setValue`, disabled state, and transformed-value type contracts. Test RHF 7.59.0 explicitly in an isolated minimum-version runtime/type matrix alongside the selected upgrade, including numeric drafts, reset/resetField/setValue and transformed values. Existing consumers pin 7.80.0 and are not minimum-version proof. Preserve the declared peer range.

Commit manifest and lockfile together. If modernization requires sibling/root changes, broad formatting, altered peers, or substantial redesign, hold that candidate and document why; continue independent candidates.

**Slice: field associations and typed pass-through**

Primary paths beneath `packages/design-system/`:

`src/forms/useFieldError.ts`, `rhf.ts`, `TextField.tsx`, `NumberField.tsx`, `TextareaField.tsx`, `SelectField.tsx`, `RhfField.tsx`, and the four existing `Rhf*` wrappers. Touch `Select.tsx` or `MultiSelect.tsx` only for an explicitly required typed trigger association.

Current evidence:

- Legacy `useFieldError` gates errors by touched state and `hideError`; SelectField intentionally has no touched gate.
- NumberField and TextareaField spread caller props after generated `aria-describedby`, allowing callers to replace the error reference.
- RHF combines generated description/error IDs but omits caller-provided references.
- RHF Select exposes a narrower prop surface than RHF Text/Number.
- NumberField styles touched errors without deriving the matching invalid attribute itself.
- Existing text/textarea unions and RHF path restrictions are public contracts.

Add descriptions to the named standalone fields and preserve existing RHF descriptions. Centralize only the small ID-reference merge operation; keep it free of RHF imports so root consumers remain RHF-free.

Keep component state and consumer ownership explicit: custom string `onChange`, Formik mode, RHF handlers, refs, and controlled values must survive prop typing. Forward attributes to the actual input or trigger, never merely its wrapper. Do not claim arbitrary native events work on composite selects.

Derive NumberField invalid state from its existing touched/error semantics while preserving an explicit caller override. Preserve SelectField’s `ariaInvalid` precedence and invalid state when error prose is hidden.

Verify this slice with synthetic fixtures and existing type-contract suites before committing.

**Slice: field presentation and accessible compositions**

Paths: `src/forms/RhfField.tsx`, the named standalone fields, narrowly scoped shared error code, associated stories, `README.md`, `MIGRATION.md`, and contract tests. The field package inherits this combined plan through the stack; do not duplicate the execution contract.

Implement the settled inline-error option using existing `FieldError`. Keep a single error node and announcement path; do not render both inline and hidden alerts for the same message. Preserve tooltip mode unchanged.

`FieldErrorIndicator` also serves ColorPicker and PIN controls. Do not globally change its default behavior. These consumers need regression coverage if shared internals change, not an unplanned redesign.

Reuse `FieldDescription` only where its paragraph semantics accept the existing `ReactNode` content. Preserve rich/block descriptions through the current container or another compatible composition; avoid invalid nested markup. Preserve styling hooks and label positioning.

Record an explicit shadcn assessment comparing local Field and InputGroup to a recorded upstream source revision. Record adopt/retain/defer with compatibility reasons per relevant component. Preserve the configured CSS target `src/tailwind.css`; prohibit automatic CLI overwrite.

Document standalone and RHF compositions with descriptions, inline errors, external help references, and existing InputGroup usage through the primitive entry. Keep Formik frozen and document inheritance of compatible base-field behavior. Add no new RHF wrapper family.

**Feature-wide test portfolio**

| Consequential contract                      | Obligation and seam                                                                                                                                                     | Owner                |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Dependency/build/public-entry compatibility | Extend existing packed/type evidence only where a discovered risk lacks coverage                                                                                        | Dependency slice     |
| Description/error association and lifecycle | Extend `tests/contracts/rhf-fields.spec.ts`; add focused standalone synthetic fixture/spec for combined IDs, visibility, clearing, hidden errors and distinct instances | Association slice    |
| Public types and refs                       | Extend `rhf-fields.types.ts`, `rhf-fields-jsx.types.tsx`, and relevant existing direct-ref/type tests                                                                   | Association slice    |
| Inline errors, keyboard, mobile and themes  | Extend existing accessibility harness plus focused interaction cases; screenshots supplement behavior assertions                                                        | Presentation slice   |
| Legacy behavior and shared consumers        | Reuse existing field-actions, input-editing, RHF reset/blur, PIN and ColorPicker coverage                                                                               | Owning changed slice |

Do not snapshot prose or demo records. Existing `field-labeling.spec.ts` pins demo error wording; replace touched assertions with relationships and minimal test-owned fixtures rather than updating expected prose.

**Verification and finish**

Use installed Node `22.16.0` through process-scoped runtime selection and verify child-process versions. The ordinary host PATH resolves Node `26.8.1`; do not claim it is pinned execution. Main package pnpm is `10.30.0`; isolated consumers declare pnpm `11.21.0`, which must be preserved and reported separately. Do not change global tooling. Run package build before checks:

```sh
pnpm --filter @uzh-bf/design-system build
pnpm --filter @uzh-bf/design-system check
pnpm --filter @uzh-bf/design-system lint
pnpm --filter @uzh-bf/design-system format:check
pnpm --filter @uzh-bf/design-system test:theme-contract
pnpm size:check
```

After a fresh Ladle build, run focused contracts, then the complete package suite once at each accepted layer tip. Preserve the exact accessibility inventory and its protocol; never weaken severity thresholds or exclude failing stories to obtain green results.

Reconcile fixture lockfile graphs after package dependency updates; replacing tarball integrity alone retains stale dependencies. Permit narrowly scoped updates to fixture lockfiles and packed-artifact helpers under `tests/rsc/`, preserving fixture direct pins. Assert installed dependency versions match the updated package graph, then perform frozen installs. Run both existing packed-consumer verification scripts:

```sh
sh packages/design-system/tests/rsc/packed-consumers/scripts/verify.sh
sh packages/design-system/tests/rsc/next-consumer/scripts/verify.sh
```

Browser acceptance covers neutral and uzh themes at desktop and narrow mobile widths: visible focus, Tab/Shift+Tab, Enter/Space, menu arrows/Escape, no accidental submission, disabled actions, long descriptions/errors, zoom/reflow, and open composite states. Run axe on changed closed, invalid, and open states. Inspect screenshots. Chromium viewport emulation does not prove physical mobile keyboards, Safari/VoiceOver, or NVDA announcement quality; record manual screen-reader testing as unperformed unless actually completed.

Run deterministic `test:visual` when dependency rendering or curated states are affected. Inspect every visual difference before accepting baseline changes. Use only the task-owned runtime and stop it after verification.

Each substantive committed slice receives simplification and applicable public-contract/dependency review. Each complete package receives integrated final review after verification and before publication. Parent verifies findings and persists reports under `project/_local/reviews/`. Prior input-package approval does not cover these new layers.

After publication, verify every draft independently through `gh`; record exact head, base, local checks, review disposition and CI state. Repository-owned preview automation is reported separately from deployment authority.

**Stop conditions and provenance**

Pause dependent work for unresolved API decisions, incompatible dependency requirements, unavailable required reviewers, divergent stack metadata, or missing mandatory verification capability. Continue independent bounded work where possible. Do not convert unavailable browser or screen-reader evidence into a pass.

The parent accepted the five decisions and completed the input-package handover. Planning produced no implementation changes.

## Progress

Resumed on 2026-10-17 in standard execution mode; runtime model identity is not
exposed precisely. The approved topology and terminal condition remain unchanged.

- Input stabilization: [draft PR210](https://github.com/uzh-bf/design-system/pull/210),
  head `04cfd66e0`, base `v5`, exact-head CI passes. Eight commits preserve native
  date editing, keyboard actions, disabled state and modal arrow ownership.
- Compatible dependencies: [draft PR211](https://github.com/uzh-bf/design-system/pull/211),
  head `325bb6db8`, base the input branch. All 71 direct dependency entries were
  refreshed; 55 declarations change, including 36 refreshed in October. Consumer
  peers, exports, engines, release version and root/sibling importers are unchanged.
- Dependency verification: package/Ladle builds, types, lint, formatting, size,
  672 CSS assertions, 23 unchanged visual baselines, three frozen packed consumer
  graphs and 39 installed-version assertions pass. Minimum RHF7.59 and selected
  RHF7.90 pass the existing runtime and public type contracts. The full local
  browser run's 24 accessible-name failures were corrected and verified in focused
  runs; exact-head hosted [CI39066547194](https://github.com/uzh-bf/design-system/actions/runs/39066547194)
  and [build39066547196](https://github.com/uzh-bf/design-system/actions/runs/39066547196)
  pass. Deployment was skipped.
- Dependency simplification and contract review completed without findings.
  Integrated final review accepted code and reported two documentation findings;
  both were verified and corrected by `325bb6db8`, with focused formatting checks.
  Reports remain in the ignored review directory. Current Field/InputGroup
  comparison and major-upgrade dispositions are recorded beside this plan.
- Field UX: branch `rs/v5-field-ux` created on the accepted dependency tip.
  Standalone association patch integrated after bounded executor review. Parent
  owns RHF associations and inline presentation; both bounded executors are done.
  Package builds, types, lint, formatting, 38 existing form/action/label contracts,
  packed consumers, Next.js hydration/submission, 672 CSS assertions and package
  budgets pass. Pinned visual comparison passes 23/23 without baseline changes.
  The new focused suite passes24/24 after correcting asynchronous trigger-focus
  expectations. A read-only advisor traced the open Select aria-hidden warning
  to axe's static modal heuristic. Actual synchronous focus attempts and Tab/
  Shift+Tab remain inside the listbox, matching W3C ACT6cfa84's focus-redirection
  exception. Open-state checks pair this behavioral proof with all axe rules on
  the complete portaled popup. Closed/invalid scans and the global zero-waiver
  story inventory remain unchanged. No production inert management is added.
  Eight inspected synthetic screenshots cover standalone/RHF inline validation,
  desktop/mobile, neutral/uzh. Full browser verification passes1,363 tests. The
  later RHF open-state extension exposed an unnamed MultiSelect popover; a single
  aria-label now reuses the field context (with a generic fallback). This adds
  one relevant shared component, taking the package to26 files; the coherent
  field contract and approved topology are retained. Focused follow-up and
  independent reviews, field draft publication and hosted CI remain.

No merge, ready conversion, release or deployment has been performed. Manual
screen-reader, Safari and physical mobile checks remain unperformed. The separate
UZH alignment branch is outside this approved dependency/field stack.

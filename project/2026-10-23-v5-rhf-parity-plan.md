# Complete v5 React Hook Form capability parity

## Approval summary

Complete the RHF equivalents of all ten retained Formik field families, while
preserving Formik through v5. Add seven adapters around existing controls and
qualify the existing text, number, select and additional multi-select adapters.
Apply the accepted RHF error contract: inline messages by default, tooltip
opt-in, and visibility following errors RHF has produced. This changes the four
existing RHF adapters as well as the new ones; Formik behavior stays compatible.

Deliver two draft PRs in a new native GitHub stack: basic fields and PIN entry,
then color/date/time pickers. Its custom trunk is the existing qualification
branch behind PR218. The earlier eight-layer stack remains a separate
dependency; approval does not expand or restructure it. The new stack cannot
land independently of that dependency. Recharts migration, remaining shadcn
catalog work and consumer repository changes belong to later packages.

Success means each layer independently passes its applicable types, behavior,
packed-package, Next/RHF matrix and UI checks, with inspected synthetic
screenshots and configured reviews. The final DS candidate must cover every
family at both supported RHF versions. Refreshed GBL application acceptance and
retained Klicker Formik acceptance remain GA gates under consumer-owned plans.

Approval authorizes this finite implementation batch, local commits, ordinary
pushes, two draft PRs and scoped local verification. It does not authorize merge,
marking ready, release/publication, deployment or changes to retained consumer
runtimes. No product decision remains open; an incompatible public contract or
unsupported native topology returns to the user before dependent work.

## Execution details

### Contracts and evidence

Approval mode: **executable batch**. Execution mode: **standard**. Execution
owner and boundary owner: **main / self**. The approval starts the whole batch;
internal review and ordinary corrections create no further proceed checkpoint.

The [GA roadmap](2026-08-10-v5-ga-readiness-roadmap.md#binding-v5-ga-scope)
owns the ten-family matrix and package order. The completed
[W3 plan](2026-08-09-v5-rhf-w3-plan.md) is historical foundation, not full parity.
[ADR0002](../docs/adr/0002-rhf-subpath-rsc-contract.md) owns the optional RHF
client entry and root/primitives isolation.
[ADR0006](../docs/adr/0006-rhf-error-presentation-and-validation-ownership.md)
owns error presentation and validation timing. Keep Formik exports, peers and
types until v6. No new product-domain primitive or lifecycle is introduced;
existing field, control and form composition contracts are extended.

Preserve typed paths, explicit-control and FormProvider use, transformed output,
caller refs, selectors and styling hooks. Preserve existing value domains:
strings, numbers with the existing empty representation, booleans and
`Date | undefined`. Applications retain schemas, resolvers and timezone policy.
Native form submission applies where the underlying control supplies native
form participation; a button-based picker must not silently invent a serialized
date/color protocol. RHF submission must retain each family's value contract.

The source snapshot is `130b4f1ac81950a6fde9587b36e2da582b0c1973` before
decision-document persistence. The worktree is
`/Users/rschlae/Git/df/design-system/trees/rs-v5-uzh-alignment` on
`rs/v5-ga-qualification`, synchronized with its task upstream at planning time.
It contains all `origin/v5=80d6f229cdf8aa57384246bba0386d730484eecb` commits.
`main` is the later promotion boundary, not this package's integration target.
Refresh refs after a pause, preserve unrelated primary-checkout files, and record
the actual dependency SHA before branching. Integrate only for a concrete
readiness blocker under the repository integration policy.

### Research and settled alternatives

Official [RHF validation-mode documentation](https://react-hook-form.com/docs/useform#mode),
[`setError` documentation](https://react-hook-form.com/docs/useform/seterror)
and the [shadcn RHF guide](https://ui.shadcn.com/docs/forms/react-hook-form)
were retrieved on October 23, including Context7 RHF documentation. They support
application-owned validation timing and Controller/Field composition. The
additional touch/submit gate is local policy, not a requirement of RHF.

Main owns this bounded documentation research; the configured planner reviewed
the interview frontier, and the Claude advisor supplied a scoped opinion whose
claims were checked against source. No new external research worker is needed.
The pinned catalog and auxiliary evidence lives in the
[shadcn assessment](2026-09-06-v5-shadcn-assessment.md#full-radix-scope-and-release-review--2026-10-23).
Refresh documentation only when a selected mechanism depends on behavior not
covered by these sources. No dependency major migration is assumed necessary
for these adapters; a demonstrated prerequisite must be reconciled before use.

The user accepted inline errors and RHF-owned timing instead of retaining the
old RHF defaults. Formik presentation remains distinct deliberately. The user
selected refreshed GBL RHF proof plus all-family packed coverage instead of an
additional Klicker RHF migration. Other upstream inputs use Controller/Field
recipes without a required named adapter for every primitive. Reopen only on
concrete incompatibility or inability to qualify the selected real-app journey.
The error contract passes the ADR gate because it changes existing public UX
and application validation policy; ADR0006 records its trade-off. GBL proof-route
selection is an acceptance choice, recorded in the roadmap rather than a new ADR.

### Native stack and delivery boundary

Provider: GitHub, existing `uzh-bf/design-system` remote. Mode: progressive;
ordinary slices proceed through review and draft delivery without intermediate
human checkpoints. Main is the sole topology owner. Use this same worktree for
both layers, with the approved plan committed first on the implementing branch.
Decision ADRs are committed separately before that plan commit. No plan-only PR.

Native stacks are enabled. The remote API reports existing stack212 with eight
draft layers, PR210 through PR218. Local `gh stack view --json` reports that the
qualification branch has no local stack registration; do not import, replace or
repair the earlier stack as part of this batch. `gh stack init --help` confirms
custom trunks via `--base`. Initialize a new stack with custom trunk
`rs/v5-ga-qualification` and branch `rs/v5-rhf-fields`; add
`rs/v5-rhf-pickers` through the native tool after the first layer is qualified.
Keep the trunk out of the new stack's layer list. Verify remote membership and
actual PR bases after draft creation. If the provider joins it to the earlier
stack, rejects this topology or requires protected/force changes, stop before
mutating existing topology and report the capability/authority blocker.

| Layer               | Work package and dependency                                                                                  | Review focus and validation at its own tip                                                                                                              | Size signal and ruling                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rs/v5-rhf-fields`  | Existing adapters' error contract plus textarea, switch and both PIN adapters; base `rs/v5-ga-qualification` | Form integration, validation and non-popup input semantics; relevant contract/type/browser checks, packed/RHF matrix, Formik regression and screenshots | Estimated 1,200–1,800 human-authored lines across 16–22 files, excluding generated output/artifacts. One package because the common field contract and non-popup adapters share the same acceptance surface; do not split tests/docs from behavior. |
| `rs/v5-rhf-pickers` | Color, date and date/time adapters; base `rs/v5-rhf-fields`                                                  | Composite focus, popup commit/cancel/reset and date editing; independent checks plus integrated all-family packed and browser qualification             | Estimated 1,000–1,600 lines across 12–18 files. One picker integration package with shared focus/reset risks; retain existing widget logic and reconsider if an upstream migration substantially expands it.                                        |

Both layers exceed the approximate 400-line review diagnostic intentionally;
they remain coherent capability packages. Measure substantive lines/files at
each layer before publication and re-evaluate unexpected growth. Two layers
stay below the six-layer cap. Drafts are incremental against their immediate
bases; the full new stack remains dependent on the earlier stack. No merge,
queue, reorder, unstack, branch deletion or ready conversion is authorized.

Authority includes implementation, configured read-only reviews, commits,
non-force pushes, draft PR creation/updates and publication of reviewed synthetic
screenshots to the same repository through authenticated `gh`, subject to actual
attachment capability and audience verification. Do not request human reviewers.
No native goal, paid calls, new provider/configuration or dependency installation
outside the repository toolchain is authorized by this plan.

### Ownership and slices

The main session owns shared seams, integration, evidence disposition and draft
delivery. Eligible settled adapter/test work goes to the configured executor
with narrow paths, no delegation and one acceptance contract. Never allow two
writers on shared hook, shell, entry, stories or fixture files. Executor tools
and data boundary follow `rs-model-routing`; retained main work is coupled to
the public form/control contract, not merely large.

| Workstream                    | Slices | Owner and route                                                                                              | Acceptance boundary                                                                                     |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| RHF field contract            | 1      | Main; route `main`, critical-path coupling                                                                   | Existing adapters honor ADR0006, Formik remains compatible                                              |
| Non-popup adapters            | 2      | Main accountable; establish shared controls/types first, then executor owns its bounded adapter contribution | Depends on slice1; new textarea, switch and both PIN capabilities pass field-layer checks               |
| Picker adapters               | 3      | Main accountable; establish shared picker seams first, then executor owns its bounded adapter contribution   | Depends on qualified layer1; all three picker families preserve underlying behavior                     |
| Integrated proof and delivery | 4      | Main; route `main`, cross-layer integration and external effects                                             | Each layer independently reviewed/green; final candidate all-family proof and accurate consumer handoff |

1. **Establish the RHF error contract.** Change the existing `forms/rhf.ts`
   visibility policy and `forms/RhfField.tsx` shell default. Reuse existing
   `ui/field` elements and description IDs. Preserve explicit suppression and
   invalid state for message-less errors. Extend existing RHF stories and
   behavior tests for configured validation modes, manual errors and explicit
   tooltip mode. Do not change the shared legacy `useFieldError` timing policy.
   Acceptance: portfolio rows A/B/E below; commit the verified behavior on layer1.
2. **Complete non-popup inputs.** Add `RhfTextareaField`, `RhfSwitchField`,
   `RhfPinField` and `RhfAlphaNumericPinField` under `src/forms/`, exported only
   through `src/react-hook-form.ts`. Use the existing textarea, Switch and OTP
   implementations. Main first extends the controlled textarea branch to accept
   its native name without a Formik field object, preserves the legacy Formik
   branch and avoids propagating the control's permissive string index signature
   into the RHF adapter's props. Verify accepted/rejected adapter JSX props and
   enabled/disabled textarea inclusion in native FormData. Main also establishes
   the Switch and PIN seams below before handing bounded adapter bodies/tests
   to the executor; main alone integrates shared entries, stories and fixtures.
   Add a standalone controlled `PinField` by extracting the
   numeric widget from `FormikPinField`, keeping that Formik adapter's public
   props, timing and visuals compatible; this gives numeric RHF and Formik one
   control rather than copying the widget. Extend the existing alphanumeric
   control's missing native focus/disabled/ARIA seams. For Switch, preserve the
   legacy click callback while providing a separate native blur event seam for
   RHF; do not wire RHF touch to the legacy click callback. Avoid duplicate
   labels/errors when the shell surrounds a legacy composite. Acceptance:
   rows A–F for this layer, including packed exports and Formik PIN regression;
   commit coherent adapter groups, qualify and publish the first draft.
3. **Complete picker inputs.** Add `RhfColorPicker`, `RhfDatePicker` and
   `RhfDatetimePicker`. Main first establishes shared control contracts and
   reset/focus wiring, then assigns bounded adapter bodies to the executor and
   integrates its result. Extend only missing control props for accessible
   association, effective disabled state, focus and blur. Color retains staged
   editing and explicit Apply; cancel/external reset must not leak a staged value
   into the form. Preserve existing date/calendar browsing and partial time,
   AM/PM, empty-value and same-value-reset semantics. Reuse the existing reset
   signal; qualify its private RHF subscription at both supported versions.
   Acceptance: rows A–E/G; commit on layer2 with its own fixtures/docs.
4. **Qualify and finish both layers.** Reuse passing checks whose source and
   environment remain equivalent. Extend the existing packed types and Next
   client fixture for the new families, then verify the complete candidate.
   Update `packages/design-system/MIGRATION.md`, `README.md`, existing RHF
   stories and this plan with supported imports, capability routes, intentional
   UX changes, remaining limitations and exact artifact identity. Reconcile the
   current roadmap/assessment status without rewriting historical qualification.
   Acceptance: all portfolio rows, configured reviews, independent layer CI and
   inspected gallery. Stop at draft delivery with GBL follow-on explicitly open.

Owned changes include the seven named adapters, the new standalone numeric
`src/forms/PinField.tsx`, the existing hook/shell/controls just named, the RHF
entry, existing contract/type/story/packed/Next fixtures, and the documentation
named above. A root export for the standalone numeric control may be added
without an RHF edge. Change fixture manifests/locks only to reproduce the same
supported dependency matrix; no package dependency or peer change is planned.
No new generic form abstraction, validation engine or control implementation
layer is needed. Additional files require a concrete accepted seam, not cleanup.

### Feature-wide test portfolio

Extend observable behavior protection, not prose, demo contents or implementation
counts. Existing checks already cover number buffers and bounds, select blur,
multi-select focus, refs, disabled state, type paths and packed entry isolation.
Reuse those cases; only changed or missing consequential contracts need additions.

| Row | Consequential behavior / realistic failure                                                                                                  | Existing protection and primary seam                                                                         | Test obligation / owner                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| A   | Errors produced on change or by `setError` stay hidden; duplicate messages or broken associations prevent recovery                          | `tests/contracts/rhf-fields.spec.ts`, existing shell/story; submit/message-less associations already covered | Extend existing for timing modes, suppression, inline default, tooltip opt-in and one associated error; slices1–3                         |
| B   | Wrong field paths/value transforms compile, root imports reach RHF, or dedicated consumers reach Formik-only declarations through new props | Existing RHF type/JSX fixtures, `tests/rsc/packed-consumers`, root-only and dedicated cells                  | Extend existing typed coverage and both RHF cells; isolate new RHF adapter declarations from Formik-specific field APIs; slices1–4        |
| C   | Reset, `resetField` or same-value updates leave stale input buffers/staged popup state                                                      | `rhf-fields.spec.ts`, `input-editing.spec.ts`; existing number/date/time reset cases                         | Extend for new family values, dirty/touched boundaries and open staged state; slices2–3                                                   |
| D   | Labels, disabled/required state or refs miss the real control; focus-on-error targets a wrapper or touch fires on internal movement         | Existing ref, component ARIA and RHF blur contracts; browser control seam                                    | Extend relevant existing cases for new actual input/trigger refs, focus and composite blur; slices2–3                                     |
| E   | Legacy Formik or controlled consumers change behavior through shared-control edits                                                          | Existing `field-ux`, `input-editing`, ref and Formik stories                                                 | Extend only touched seam regression checks; preserve error defaults and value/callback behavior; slices1–3                                |
| F   | PIN paste accepts wrong characters, drops leading zeros, ignores casing/length or cannot disable/focus                                      | Existing OTP primitives and PIN stories; RHF browser fixture                                                 | Extend existing contract suite with numeric/alphanumeric paste, string submission, casing/length, reset and disabled/ref behavior; slice2 |
| G   | Picking a date while browsing, dismissing color or editing time commits unintended values                                                   | Existing input-editing and date/time stories; new RHF composition within current stories                     | Extend existing cases for commit/cancel, Escape, focus return and reset; slice3                                                           |
| H   | Compiled styles, entry isolation or layout works only from workspace source; mobile errors/popups clip                                      | Existing packed CSS, Next browser, budgets and pinned visuals                                                | Extend packed fixture and affected visual states; inspect responsive synthetic gallery and interactions per layer; slice4                 |

Use repository-native commands inside the existing isolated tool-container
workflow for installs/builds/tests. Host Git/`gh` stays on the host. Use pinned
pnpm and CI-compatible Node rather than the host's newer Node. The existing
`.github/workflows/main.yml`, `tests/rsc/packed-consumers/scripts/verify.sh`,
`tests/rsc/next-consumer/scripts/verify.sh` and visual-regression script define
the runnable verification paths. Record commands, exact tree, toolchain and
results in Progress/local receipts; do not invent a separate validation runner.

Before each layer's delivery, run its required format, types, lint, build,
relevant contracts/accessibility, packed CSS, size/budget and both RHF/Next cells
(7.59.0 and 7.90.0). Frozen installs and installed-version assertions must prove
the selected cell. Reuse already passing legacy-workspace builds when no shared
build input changed; full required hosted CI still applies at each layer tip.
If the existing private RHF reset subscription fails, diagnose that seam before
replacing it; do not silently drop same-value-reset support or widen peers.

### Browser, review and terminal evidence

Use `rs-build-screenshot-gallery` for real synthetic browser captures per layer:
neutral/UZH at 1440×900 and 390×844, existing and new inline error states,
explicit tooltip mode, textarea length feedback, switch/PIN states and open
color/date/time popups. Use English plus a long localized-label fixture where
layout is affected; test relevant RTL direction/focus without claiming a new
translation. Interact before capture: keyboard entry/blur, submit/manual error,
focus-on-error, paste, reset, Apply/cancel/Escape and focus return. Inspect images
for clipping and readable labels. Preserve source/date/environment provenance in
the ignored gallery manifest and use an inline draft-PR screenshot table through
`rs-mr-description-writer`. Upload only reviewed synthetic images through the
same project's authenticated forge CLI and verify read-back; unavailable upload
or browser capability is an explicit evidence gap.

Run the configured simplifier and one risk-selected slice reviewer on each
substantive committed slice, in parallel when both apply. Review public types,
shared legacy seams and popup/reset boundaries. Reuse the same reviewer for one
focused correction round. Finish with the configured integrated final reviewer
covering both layers and their individual green tips. Preserve review reports
under `project/_local/reviews/`. Main verifies and dispositions all findings.
Screen-reader, Safari and physical-device GA acceptance remain pending actual
runs; Chromium evidence establishes only its tested contracts.

Terminal: two coherent draft PRs with accurate bases, native membership, passing
required checks, complete DS all-family evidence and no unresolved required
review finding. Record final source SHA, packed archive SHA-256 and installed
artifact checks for a GBL handoff. The selected real GBL journey then needs its
own current-source consumer plan and actual browser proof; DS synthetic checks
cannot claim that acceptance. Keep Klicker Formik acceptance separate. The
later chart package follows ADR0007 and the catalog/UZH packages follow the roadmap.

Pause only for a material public-contract change, unsupported native topology,
new dependency major/ownership or data/cost boundary, unavailable required
capability, or separately gated effect. Preserve passing independent work and
state the exact blocked branch. Missing manual GA evidence does not authorize a
substitute or a claim of GA readiness.

## Progress

Status: both draft layers are published; implementation, local verification and
configured slice reviews are complete. Integrated final review passes through the configured AGY fallback.
Required hosted CI passes at both tested source tips. The basic layer passes at
`cf9549b89`; the picker layer passes at `4feb499d6`, including all accessibility
shards, inventory closure, both RHF consumer cells and Build. Its browser jobs
permit one fifteen-minute install within existing seventeen-minute step budgets.
Final documentation-tip CI and a quiet settle remain before closing draft
qualification. Main owns those remaining gates in standard mode.

### Delivery and source

- [Basic fields draft PR219](https://github.com/uzh-bf/design-system/pull/219):
  `cf9549b89a29660993ab312492ad640bba73d13d`, based on the qualification branch.
- [Picker draft PR220](https://github.com/uzh-bf/design-system/pull/220):
  package executable source `e49a96a4b705a296cb4f337d9d788ead344bac85`, passing
  workflow tip `4feb499d6319ade99d103aa9c14824d324b33e3d`, based on basic fields.
- Native stack221 has exactly these two layers and custom trunk
  `rs/v5-ga-qualification`. Remote stack212 retains its original eight PRs and
  `v5` base. No topology repair or target integration was needed.
- Decision commit `afcc2b912eef289772af624ef767e92262c20ce3` was reviewed through
  the explicitly approved bounded AGY fallback and is reflected in
  [qualification draft PR218](https://github.com/uzh-bf/design-system/pull/218).

All ten retained Formik families now have RHF adapters in draft source, alongside
multi-select. Formik remains supported through v5. The optional client subpath,
inline/RHF-owned error contract, typed values and transformed submissions,
actual control refs, reset semantics and application-owned timezone/resolver
policy are preserved. Color retains staged Apply/cancel behavior. Long synthetic
German labels use the existing styling hooks; compact LTR/RTL checks cover label
bounds and focus rather than claiming complete locale support.

### Verification

Final native checks use checksum-verified Node 22.16.0 and root pnpm 10.30.0 in the
isolated tool container. Packed fixtures retain their own pinned pnpm 11.21.0.
Initial image runs used Node 24.16.0; final verification refreshes the pinned
Node 22 boundary. The deterministic visual suite uses its repository-pinned
Playwright image and architecture.

At `adc5d46f5`, package build:tsc, workspace check/lint and formatting pass, with
110 behavioral contracts, 136 relevant axe story cases, 29 pinned visual cases,
704 packed CSS assertions and package budgets. Frozen packed type/runtime cells
pass at RHF 7.59.0 and 7.90.0. Both cells pass Next 16.2.9 Turbopack/Webpack builds
and eight browser cases. The final name correction changes only the aria-label-
only date route; two affected selected/empty-date cases, 28 axe story cases,
types/lint/format and a fresh package build pass at `e49a96a4b`. Other matrix paths,
types, reset and dependency boundaries are unchanged, so passing evidence is
reused explicitly. No new serious/critical accessibility exception was added.

The earlier basic tip independently passed its relevant types/lint, 71 focused
contracts, 74 axe cases, both RHF/Next cells, pinned visuals, CSS and budgets.
Its final slot corrections pass 20 focused RHF cases, including measured padding
and fluid width. Hosted [basic CI](https://github.com/uzh-bf/design-system/actions/runs/39949970459)
passes after one setup retry. Hosted [picker CI](https://github.com/uzh-bf/design-system/actions/runs/39967459521)
passes after the bounded installation correction; all test and build jobs ran,
with tag-only Publish skipped. The separate build workflow also passes.

The workflow install override preserves the existing step/job timeouts and
all verification commands. YAML formatting, effective settings for each browser
job and three simulated installer exit paths confirm one bounded 900-second
attempt and failure propagation. Hosted execution then verifies the setting,
including the previously failing accessibility shard. No new maintained test
is needed for this declarative timing change.
Package source, candidate bytes and reviewed UI behavior are unchanged, so their
passing evidence and configured reviews remain applicable.

Both PR galleries contain inspected synthetic captures with source/date/hash
receipts: four corrected basic states plus one unchanged historical timing state,
and nine picker/long-label/direction states. All 14 native attachments were read
back and rendered in GitHub at their expected image dimensions. No screenshots
are committed. Existing visible captures remain applicable after the final
programmatic-name correction, which changes no captured layout.

### Exact candidate and reviews

The unpublished candidate from `e49a96a4b705a296cb4f337d9d788ead344bac85` is
`project/_local/rhf-parity-candidate/uzh-bf-design-system-5.0.0-alpha.5.tgz`.
SHA-256: `b237f0d7f9b384c84f4027768d5c5391e72e22591c1146ef890f0603a7994f06`.
All 264 installed package files match the archive byte-for-byte; all 11 adapters
import through the dedicated entry with RHF 7.90.0 on Node 22. This artifact has
not been published or accepted by a real consumer.

The configured simplifiers found no justified net reduction. Verified basic
slot/width findings were fixed with measured regressions. The picker reviewer
covered all 20 upper-layer paths, found the aria-label-only date-value omission,
and accepted its correction in the same-child correction pass. No slice finding
remains open. Integrated final review uses AGY Gemini 3.8 Flash high after the
reusable Claude weekly-limit failure; its canonical-schema-validated verdict passes with no findings. Private
reports and exact command receipts remain under `project/_local/reviews/`.

### Remaining boundary

Both tested source tips pass hosted checks. Verify the final documentation-only
tip and quiet settle before claiming completed draft qualification. No merge, marking ready,
release/package publication, deployment, native goal or consumer-runtime change
has occurred under this package.

The selected real GBL RHF journey needs its own current-source consumer plan and
browser proof against this exact candidate. Retained Klicker Formik evidence
remains separate. Screen-reader, Safari and physical-device runs are still
manual GA gates. Chart ownership, remaining Radix/auxiliary coverage and UZH
acceptance continue under the roadmap after the consumer package.


The exact task-owned `ds-v5-rhf-checks` tool container is stopped and verified
exited. Its browser session is closed; relevant logs, candidate and gallery
receipts remain in the ignored artifact area. No retained consumer runtime was
touched or deleted. Source and archive qualification remain valid after the
documentation and workflow timing updates.

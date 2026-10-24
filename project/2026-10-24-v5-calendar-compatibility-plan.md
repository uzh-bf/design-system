# v5 Calendar compatibility

## Approval summary

Make Calendar's default month labels and day metadata follow the supplied locale
consistently. Applications retain DayPicker selection, range, formatter and custom
component contracts, together with our existing UZH geometry and accessible
visible-day labels. Reuse the official pinned Radix Calendar recipe and exact
installed DayPicker 9.14.0; no dependency migration or new date engine is proposed.

Deliver one independently qualified draft layer after the two Shared API layers
in the [Shared API stack proposal](2026-10-24-v5-shared-api-compatibility-plan.md#proposed-stack-and-ownership).
Prove localized dropdowns and day rendering, explicit RTL, caller overrides,
timezone date selection and the existing standalone, RHF and Formik picker
contracts. Preserve numeric trigger formatting, current default navigation
bounds, values, reset behavior, refs and keyboard focus.

Keep localization boundaries explicit. Calendar accepts DayPicker locale objects
and an explicit direction. This package does not introduce a global locale
provider, arbitrary picker prop bag, automatic timezone detection, translated
time controls or new Calendar implementation variants. The existing composite
picker APIs keep their documented surface. Correct inaccurate locale examples
and describe the existing limits instead of silently expanding those APIs.

Approval mode: **executable batch**. The user approved this plan and the linked
three-layer topology on October24. Authorization covers implementation,
configured reviews, real synthetic browser and exact packed proof, ordinary
non-force pushes and qualified draft delivery. The batch stops at three
qualified drafts; merging, readiness, publishing, releases, deployments,
consumer writes and human notifications remain outside its authority.

## Execution details

### Identity and preserved public contract

- Repository: `uzh-bf/design-system`; release trunk `v5`. Proposed branch:
  `rs/v5-calendar-compatibility`, immediate base `rs/v5-shared-interactions`.
  The prerequisite chart baseline is `1138e71352225d1d428e9c8b4ec21742f7666daa`.
- Reuse `trees/rs-v5-uzh-alignment` under the repository. Main owns topology,
  API decisions, integration and final proof. Execution mode: standard;
  ceremony: full path; boundary owner: self.
- Preserve root and primitive `Calendar`/`CalendarDayButton`, all existing date
  value domains, local styling/selectors, caller classNames/components/formatters
  precedence and native DayPicker handlers/labels. Keep Formik throughout v5
  and RHF isolated to its optional dedicated entry under ADR0002/0006.
- ADR0005 and ADR0008 retain application geometry and the compatible DayPicker
  auxiliary. No product primitive, persisted date schema, date engine or timezone
  ownership changes. A new backend, runtime provider, broad picker surface or
  incompatible default would re-arm the ADR/public-contract decision gate.
- Terminal: independently green draft with corrected locale behavior, preserved
  picker/form interactions, exact candidate/archive/installed-file proof and
  configured reviews. Pause only for a material contract/dependency/topology
  change or a concrete mandatory-capability blocker.

### Research and applicability

The current package and lock pin `react-day-picker` 9.14.0 and `date-fns` 4.4.0.
No minimum/current DayPicker matrix is implied by those exact runtime pins.
The [pinned official Radix Calendar source](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix/ui/calendar.tsx)
and its [locale migration guide](https://github.com/shadcn-ui/ui/blob/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/content/docs/components/radix/calendar.mdx)
are the comparison authority. The
[DayPicker v9 custom-component guide](https://daypicker.dev/v9/guides/custom-components)
requires preserving the wrapped component's attributes and behavior.

Research owners: read-only Einstein mapped the primitive, DatePicker,
DateTimePicker, RHF wrappers and existing test seams. Main inspected the range
wrapper, pinned recipes and installed version metadata. Current Context7 lookup
resolved v10/main examples; those are not authority for v9 signatures. Verify
version-sensitive implementation details against the installed 9.14.0 types and
source. No runtime claim follows from this static planning work.

Verified defect: `locale` reaches DayPicker but the local month formatter and
CalendarDayButton metadata use the host locale. Caller overrides already win.
The visible day is already included in the accessible name, and focus already
follows DayPicker's focused modifier. Both are protections to retain.

### Bounded implementation contract

| Surface                | Required behavior                                                                                                                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default month dropdown | Use the supplied DayPicker locale for the default month formatter, matching the pinned recipe. Omission retains the existing host-locale behavior. Caller formatters keep precedence and their complete native argument contract.                                                                  |
| CalendarDayButton      | Accept the same optional locale representation as Calendar and pass it only to the default day renderer. Localized day metadata must agree with the displayed calendar date; preserve native events, selected/range/disabled modifiers, visible-day accessible naming and focused-button behavior. |
| Caller components      | A supplied DayButton or other component still replaces the default. Do not wrap it with new state or silently overwrite caller labels, refs, handlers or children. Keep the exported DayButton usable in direct official DayPicker compositions.                                                   |
| Grid class hook        | Use DayPicker 9's canonical month_grid hook while retaining caller-supplied legacy table customization. An explicit canonical override wins when both are supplied. Preserve omitted geometry and the rest of caller classNames.                                                                   |
| Direction and timezone | Keep explicit DayPicker dir/timeZone passthrough. RTL recipes supply locale and dir together. Preserve date values and caller-owned timezone choice; no browser-locale inference, automatic timezone detection, string reparsing or global Date/dayjs configuration.                               |

Keep standalone DatePicker and DateRangePicker numeric trigger formats, Monday
start/default captions, selectors, value ownership and current prop surfaces.
DateTimePicker's existing locale object affects its calendar, not automatic
translation of dayjs trigger text or time-control labels. Correct its story's
string locale to a supported locale object and correct that promise in its
affected API comment/docs. Add no arbitrary DayPicker prop passthrough to wrappers.
RHF already inherits picker props and passes them through; preserve its field
ownership, same-value reset subscription, blur and focus-on-error. Inspect Formik
wrappers for equivalent unchanged underlying behavior without altering validation
or presentation ownership.

The existing Calendar navigation window and DateTimePicker's ineffective
yearRange prop are a known local limitation. Preserve the effective bounds in
this locale package and record yearRange remediation as an explicit follow-up in
the matrix/roadmap, with no claim that this package fixes it. Reopen that behavior
only under a bounded approved picker-contract change. Likewise, upstream's
Persian/Jalali guide replaces the DayPicker import in an application-owned
recipe; it is not evidence that our packaged Gregorian Calendar switches engines.
Keep that eligible recipe visible for later composition qualification, using the
official DayPicker auxiliary rather than creating a maintained calendar fork.

### Test portfolio

Paths below are relative to `packages/design-system/`. Existing tests already
protect selection/Escape refs, browsing without committing a date, RHF reset and
picker selectors. Reuse those; add only the unprotected locale/override seam.

| Distinct failure                                                      | Obligation and primary seam                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Supplied locale reaches the caption but not dropdown/day metadata     | Add new `tests/contracts/calendar-locale.spec.ts` against the named CalendarCompatibility harness with a fixed browser clock and month. Protect omitted locale against host-locale formatting and omitted January navigation bounds at current year minus one and plus 99, alongside explicit bound overrides. Use browser locales different from the supplied en-US/de/Arabic locale objects; compare semantic date formatting with the same native locale contract, not hard-coded translation copy. |
| Caller formatter/component/label is overwritten, or ref/focus is lost | Extend existing `tests/contracts/public-contracts.types.ts` for the optional DayButton locale and custom component signature; browser-check custom formatter invocation and arguments, custom renderer precedence, actual button ref/focus and visible-day naming.                                                                                                                                                                                                                                     |
| Locale or canonical class hook changes date selection/layout          | Extend that same new seam for single/multiple/range, disabled dates, dropdown navigation, legacy table alone, canonical month_grid alone and canonical winning when both are supplied, RTL arrows, range markers and a timezone boundary where host and selected timezone differ. Assert the selected calendar date and value, not incidental text or default data formatting snapshots.                                                                                                               |
| Primitive changes regress standalone or form-owned pickers            | Test obligation: extend existing `tests/contracts/composite-refs.spec.ts` for DateRangePicker selection/dismissal and add Formik date/datetime reset/error/disabled cases to calendar-locale.spec.ts using the named CalendarCompatibility harness. Run existing `input-editing.spec.ts`, `rhf-fields.spec.ts` picker cases and smoke `test-selectors.spec.ts` unchanged. Preserve reset, invalid/disabled/required state, time editing and trigger focus return.                                      |
| New source loses package identity, RHF isolation or SSR/hydration     | Test obligation: none for new fixtures; run existing packed root/dedicated and Next scripts across the three approved RHF/Recharts cells, package/positive-marker/size and emitted-CSS gates; refresh exact archive and installed-file proof.                                                                                                                                                                                                                                                          |

Add new `src/CalendarCompatibility.stories.tsx` as the single deterministic
behavioral/gallery harness. It includes raw Calendar overrides and modes, legacy
class hooks, timezone/RTL, and minimal test-owned Formik date/datetime fixtures.
Extend existing `src/Calendar.stories.mdx` only for its affected API explanation
and `src/DatetimePicker.stories.mdx` to correct the invalid locale example.
Date-range assertions reuse `src/CompositeRefs.stories.mdx`; extend that fixture
only for the declared range selection/reset behavior. No additional spec/helper
or story files are planned. Register these stories in the exact accessibility
inventory. Do not pin prose or demo contents with hashes/counts/snapshots.
Existing managed visual baselines require actual diff inspection.

### Delegation Map

| Slice                            | Owner           | Dependency and owned work                                                                                                                                                                   | Acceptance                                                            |
| -------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1: locale and component contract | main            | Qualified Shared interactions. Coupled primitive/types/defaults and affected API documentation remain local for critical-path contract integration.                                         | Type checks plus the first useful locale/override browser result      |
| 2: recipe and form proof         | native executor | Slice 1's fixed API. Own CalendarCompatibility.stories.tsx, calendar-locale.spec.ts and the named existing composite-ref/story extensions only; main serializes shared-harness integration. | Complete declared Calendar portfolio, returned diff and test evidence |
| 3: qualified delivery            | main            | Integrated slice 2. Own package/browser proof, reviews, documentation status and ordinary draft delivery.                                                                                   | Independently green, reviewed, exact-candidate Calendar draft         |

### Slices and delegation

1. **Locale and component contract.** Main owns `src/ui/calendar.tsx`, exported
   API/type integration and the canonical grid hook because these decisions are
   coupled. Acceptance: type checks and the focused Calendar locale/override
   browser seam after the first useful build. No dependency/lock changes.
2. **Recipe and form proof.** The native executor extends the named Calendar
   story/test seam after the primitive contract is fixed; main owns any shared
   harness, affected wrapper documentation and integration. Exercise direct
   recipes and existing DatePicker/DateRangePicker/DateTimePicker, RHF and Formik
   behavior. Acceptance: the portfolio above, with explicit unsupported claims
   kept out of the result. Each coherent change carries its applicable checks.
3. **Qualified delivery.** Main runs required checks, screenshots, exact packed
   proof, configured simplification/risk and integrated final review. Update
   `packages/design-system/MIGRATION.md`, the capability matrix, composition
   assessment, GA roadmap and this Progress with actual proof and the named
   follow-ups. Ordinary push; keep the new PR draft and all predecessors intact.

Expected size: 200–400 human-authored lines across 8–14 paths, plus deliberately
reviewed generated visual evidence. One independently reviewable Calendar
package; not a tests-only layer. Risk medium, activation complete, reviewer
audience Calendar/forms/accessibility maintainers, attention judgment-heavy.

### Verification and final boundary

Use the existing container and pinned Node/pnpm versions for builds and tests.
Run package `check`, `lint`, `format:check`, build and Ladle build; then the focused
Calendar and existing picker contracts. At the final tip run full behavioral,
accessibility inventory/protocol, relevant visual regression, theme-contract and
package budget gates. No budget/waiver changes are authorized.

Run both existing packed scripts and Next bundlers for Recharts 3.8.0/RHF 7.90.0,
Recharts 3.10.1/RHF 7.90.0 and Recharts 3.10.1/RHF 7.59.0, using the selectors
and exact-artifact rules in the Shared API plan. A previous archive cannot prove
this executable tip. Preserve Formik runtime/types and root/primitives isolation.

Use `$rs-build-screenshot-gallery` for actual 390px/1280px neutral-light,
neutral-dark and UZH-light captures. Include localized dropdowns, an RTL range,
disabled dates, time controls and representative form errors, with actual
keyboard/selection/reset checks and capture provenance. No UZH-dark support claim.
Record manual screen-reader, Safari/device and integrated exact-candidate
consumer acceptance as separate gates. Runtime lifecycle rules apply only when
implementation verification actually resumes an environment; no runtime is
started for these planning documents.

## Progress

- The user approved this executable batch and the three-layer topology on
  October24. The joint native planner passed both plans in round2.
- Presentation draft225 qualifies at2d8b02a6f and interaction draft226 qualifies
  at4d5f60fc6caa15e1f13ebcdffe0a936d9e17d7e9, including configured final reviews,
  exact artifacts, browser evidence, independent hostedCI and quiet feedback.
- Active branch:rs/v5-calendar-compatibility, immediate baseline4d5f60fc6.
  Required delivery: qualified draft; achieved: approved plan committed before
  implementation. Main owns the coupled locale/grid/source/type contract, then
  delegates the named fixture/test seam while handling docs and integration.
- Current docs lookup resolves DayPicker main/v10; use installed9.14.0 source
  and the pinned shadcn recipe for signatures. No dependency migration.
- Core locale/grid changes pass types, lint and formatting. Existing picker,
  RHF, composite-ref and selector cases:60pass. Focused scanner:0findings/errors.
  A bounded browser comparison against the qualified lower archive confirms
  unchanged Calendar/grid/day geometry on all three supported surfaces at
  390/1280px. A separate de-locale probe fails both host-locale metadata/month
  oracles on the old source and passes both on the corrected source in all6cells.
- The complete named harness and nine Calendar contract cases are integrated.
  All14focused Calendar/composite cases pass after correcting fixture ref
  ownership, Formik validation races and a test-clock/TZDate incompatibility.
  Native Date plus fixed instants and explicit fixture bounds protects the
  timezone case; production date ownership and engines are unchanged.
- Known navigation/yearRange and application-owned non-Gregorian recipe work
  remain named follow-ups. Next: implement the bounded locale contract and its
  first useful browser proof, then complete all declared acceptance gates.

- Integrated source verification:156behavioral contracts and10new themed axe
  cases pass; no new waiver or budget. Package build passes after correcting two
  harness-only strict types. All three packed/Next endpoint cells are running.
  The named five-state harness and single contract spec account for most of the
  package size; their locale/override/bounds/timezone/form obligations stay in
  this one approved Calendar layer. Configured reviews, captures and CI remain.

- Draft [#228](https://github.com/uzh-bf/design-system/pull/228) is registered as
  the third member of native stack227. Full source proof at577c038da passes all
  three packed/Next cells and exact archive60596158 with268installed matches.
  Source files are audited against the tool copy before final archive generation.
- Simplification removed a single-caller bounds wrapper. Phone capture exposed
  a synthetic JSON output widening its grid; constrained fixture columns and
  wrapping correct it. Nine focused contracts still pass. These harness changes
  require fresh captures and emitted-CSS/package proof, now running.

- The source risk review found a remaining yearRange comment/story claim that
  contradicted the documented no-effect contract. The property comment, @param
  and story bullet now agree; effective runtime bounds are unchanged.
- Extra empty-error UZH audit: existing placeholder contrast4.44:1 fails4.5:1.
  Main reproduced the same colours and axe finding with the exact lower archive
  after settling transitions. This is a named GA picker contrast follow-up;
  capture evidence records it without a new waiver or suppression.

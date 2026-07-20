# v5 API Consolidation — Three-Layer Exports + Forms Strategy

Caveman-form plan. Converge the duplicate public API surface while breaking is
still free (v5 pre-GA), and set the forms direction — **without building RHF
yet** (klicker still on Formik).

## Plan identity

- Plan: `project/2026-07-19-pr-181-v5-api-consolidation-plan.md`
- Branch: `v5-api-consolidation` (off `v5`) — created 2026-07-19.
- Target: `v5`
- PR: [#181](https://github.com/uzh-bf/design-system/pull/181) (draft, base `v5`)
- Related: roadmap `project/2026-07-18-v5-production-readiness-roadmap.md`;
  PR [#180](https://github.com/uzh-bf/design-system/pull/180) on
  `v5-p0-release-safety` → **merge into `v5` first (recommended), then fork this
  branch off the updated `v5`** so no rebase/stack.
- Resolves/extends roadmap items: D3 (COMP-5), COMP-6, COMP-8, ARCH-4, TEST-10,
  Forms 2.0 future item.

## Goal

Promote ONE public API per widget family and one coherent export shape, decided
by real consumer evidence, before v5 GA locks the surface. Set the forms
direction (RHF-first, Formik managed-deprecation) in docs; defer all RHF build.

## Non-goals (Phase 1 / this plan)

- Building the RHF turnkey field family — **deferred to Phase 2, post-GA v5.x**
  (user: "first we don't focus on RHF … klicker is still formik for now").
- Removing Formik — that is **v6**. v5 keeps Formik, frozen + `@deprecated`.
- Fixing Formik bugs — frozen (FE2).
- Migrating any consumer off Formik (apps upgrade on their own schedule — FE7).
- Back-compat shims / deprecation-aliases to soften the break — **explicitly
  not wanted** (FE7). Clean rename + removal; the break is documented, not padded.
- `file-upload` (net-new component, later).
- Non-exports/-forms roadmap items (D1/D2/D4/D5, A11Y batch, ARCH-3 bundle
  surgery, etc.).

## Decisions (locked 2026-07-19 grill; FE = forms/exports)

| ID | Decision | Ruling |
| --- | --- | --- |
| FE1 | Forms strategy | RHF first-class (Phase 2); Formik frozen + `@deprecated` in v5, **removed in v6** — RHF the only default then. |
| FE2 | Formik scope | Freeze hard — no bug fixes, no new wrappers. Live dual-mode/`setTouched` defects stay; documented in the migration doc, not fixed. |
| FE3 | RHF API shape | Turnkey `Rhf*Field` config-prop wrappers (props mirror Formik; `control` via `useFormContext`); shadcn `Form`/`FormField` seam = compositional escape hatch. |
| FE4 | RHF packaging | `react-hook-form` → optional `peerDependency` (single deduped instance; no bundle for non-forms consumers). Done in Phase 1 — it is breaking, so pre-GA. |
| FE5 | Exports shape | **Two doors, clean:** root `.` = the custom composites (natural names, **all kept** — FE8); new `./primitives` = raw shadcn under natural names (+ 7 unexported, fixes COMP-8). **Remove** the `Shadcn*` prefix (raw moves to `./primitives`) and **remove** `./ui` + `./forms` subpaths. No aliases. |
| FE6 | Timing vs GA | All breaking parts land in v5 GA (`Shadcn*` removal → `./primitives`, `./ui`+`./forms` removal, dep→peer, Formik `@deprecated`, `sideEffects:['*.css']`); additive RHF field family fast-follows post-GA. |
| FE7 | **Break policy** | v5 is a hard breaking release. **No backward-compat shims, no deprecation-aliases held to soften the break.** Consumers that lack migration time simply don't upgrade. The one hard requirement: **every breaking change is documented cleanly in a dedicated migration/breaking-changes doc** (S7). |
| FE8 | **Keep custom composites** | Do **not** drop any custom composite in v5 (incl. `Table`, `Menubar`, `Field*`), even at 0 consumers — they carry deliberate design. Pure reorg: no component removed, only the `Shadcn*` prefix and the `./ui`/`./forms` subpaths go. Revisit dropping in v6. |

## Research grounding (facts behind the decisions)

- **Consumer audit (6 repos, 2026-07-19).** Subpath split earns nothing: root
  `.` used everywhere, `./forms` = 0 imports, `./ui` = 2 (vet-platform only,
  both names in root). `Shadcn*` is NOT v5-only (verified in 4.1.6 dist).
  Per-family: **Table** 100% raw `ShadcnTable*` (klicker 10 + gbl 10; custom
  `Table` never imported); **Progress** (11) / **Dropdown** (9) 100% custom;
  **Collapsible** split 2 custom / 3 raw; **Menubar** 0. **Label**: `FormLabel`
  dominant (klicker 22), `Field*` = 0. **Forms**: Formik dominant (klicker 88,
  thesis 19), RHF emerging (careers, demo-game — vendored their own glue).
- **Exports probe.** 116 `'use client'` directives (commit `d82f36d`, branch
  `client-component-support`) = the real App Router support, correctly targeted
  → **keep untouched**. Subpath split undocumented (`8ec4032`) + not RSC (client
  boundary is per-file, not per-barrel). `sideEffects` field missing (ARCH-4)
  but each entry imports `tailwind.css` (load-bearing) → carve-out mandatory.
- **Formik probe.** 10 wrappers, modern `useField` (no legacy APIs). Live bugs
  (frozen per FE2): Text/Number/Textarea dual-mode "works without Formik" still
  calls `useField(name||'')` → throws without a `<Formik>` ancestor;
  `FormikNumberField` writes `setTouched(true)` for field `''`; `FormikPinField`
  has no raw counterpart; error render copy-pasted per field with drift. Gaps:
  `Checkbox`/`RadioGroup`/`Slider`/`Combobox`/`MultiSelect`/`DateRangePicker`
  have no Formik wrapper; `file-upload` absent entirely.
- **RHF probe.** RHF already a hard `dependency`; shadcn `Form`/`FormField`/
  `FormControl` binding already shipped + exported (`src/ui/form.tsx` →
  `src/Form.tsx`) + documented in Storybook as "the DS's react-hook-form
  binding". Raw field primitives already controlled/agnostic → `Rhf*Field` is a
  mechanical port (`useField`→`useController`), no primitive changes.

## Skill routing

- `$rs-sliced-development-workflow` (this). Per-slice: review subagent
  (`droid glm-5.2` first for independent review, native pr-review-toolkit
  fallback) + separate simplify subagent + `$verification-before-completion`.
- Finish gates: `$security-review` (low surface — packaging/exports/docs),
  `$thermo-nuclear-code-quality-review`, PR via `$rs-mr-description-writer`.
- ADR candidates (pass the 3-part test → create on plan commit under
  `docs/adr/`): two-door canonical exports (+ `Shadcn*`/`./ui`/`./forms`
  removal); RHF-first forms strategy with v6 Formik removal. Plan references the
  ADR IDs; rationale lives in the ADRs.

## Phase 1 — Exports + packaging convergence (breaking; v5 GA) — THIS plan

Tracer-bullet slices; each a thin, independently reviewable, verifiable path.
Every slice that removes/renames a public name feeds the S7 breaking-changes doc.

### S1 — `./primitives` door (COMP-8, FE5)

- Do: new `src/primitives.ts` barrel re-exporting the raw `src/ui/*` shadcn
  primitives under natural names — the full set, including the 7 currently
  unexported (`button-group`, `empty`, `field`, `input-group`, `item`, `kbd`,
  `spinner`) and the 6 families currently reached via `Shadcn*` (`table`,
  `dropdown-menu`, `progress`, `collapsible`, `label`, `menubar`). Add
  `./primitives` to `package.json` `exports`, `vite.config.ts` `build.entry`,
  and `typesVersions`.
- Check: `pnpm build` emits `dist/primitives.js`; **no TS2308 duplicate-export
  collision** inside the barrel (enumerate + de-collide if any); a scratch
  consumer resolves `import { Table } from '@uzh-bf/design-system/primitives'`
  to the raw shadcn Table; the 7 previously-unexported primitives now resolve.
- Commit: `build(exports): add ./primitives entrypoint for raw shadcn primitives`.

### S2 — Remove the `Shadcn*` prefix; keep every custom composite (FE5, FE7, FE8, D3)

- Do: delete the `src/Shadcn*.tsx` re-export shims so the `Shadcn*` prefix is
  gone from root. Raw shadcn now lives in `./primitives` (S1). **Every custom
  composite stays at root under its natural name — nothing custom is dropped**
  (FE8: design investment). The only removals are the prefix aliases.
- Per-family (root `.` keeps the custom composite; raw is in `./primitives`):

  | Family | Root `.` | `./primitives` |
  | --- | --- | --- |
  | Table | custom `Table` (kept) | raw `Table*` |
  | Progress | custom `Progress` | raw `Progress` |
  | DropdownMenu | custom | raw |
  | Collapsible | custom (D-COLLAPSE → custom) | raw |
  | Label | custom `FormLabel` + `Field*` (kept) | raw `Label` |
  | Menubar | custom (kept) | raw |

- Consumer impact (verified 2026-07-19): klicker + gbl reach tables **only via
  the raw `ShadcnTable*`** (klicker `DataTable` + ~6 components; `ShadcnTableCell`
  30× in one file; **0** custom-`Table` imports). They migrate the raw table
  import to `./primitives` (S7 documents it). The custom `Table` at root is
  untouched but is not what they use today.
- Check: `pnpm check` (tsc) clean, **no TS2308** at root; grep confirms zero
  `Shadcn` identifiers remain in `src/index.ts`; custom composites still resolve
  at root, raw at `./primitives`.
- Commit: `refactor(exports)!: remove Shadcn* prefix, raw shadcn moves to ./primitives`.

### S3 — Remove `./ui` and `./forms` subpaths (FE5, FE7)

- Do: delete both subpaths from `package.json` `exports`, `vite.config.ts`
  `build.entry`, `typesVersions`; delete `src/ui.ts` and `src/forms.ts` barrels.
  Root `.` + `./primitives` (+ existing `./css`) are the only doors. Forms
  components stay exported from root. (`./forms` = 0 imports; `./ui` = 2
  vet-platform sites that break by design → S7 documents the swap to root.)
- Check: `./ui` and `./forms` specifiers no longer resolve; root still exports
  every forms component + `Button`/`Badge`; `npm pack --dry-run` clean.
- Commit: `build(exports)!: remove ./ui and ./forms subpaths`.

### S4 — `sideEffects: ["*.css"]` (ARCH-4)

- Do: add `"sideEffects": ["*.css"]` to `package.json` so JS tree-shakes while
  the load-bearing `tailwind.css` side-effect import is never dropped.
- Check: build clean; a scratch consumer importing a single component does not
  pull the whole barrel (spot-check chunk), and the CSS import survives (guard
  against the CONS-6 class of failure).
- Commit: `build(deps): add sideEffects css carve-out for tree-shaking`.

### S5 — `react-hook-form` → optional peer (FE4)

- Do: move `react-hook-form` (and `@hookform/resolvers` if consumer-facing) from
  `dependencies` to `peerDependencies` + `peerDependenciesMeta.optional: true`.
  Devinstall RHF so the repo build/Ladle still resolve it.
- Check: build + `build:ladle` clean; `Form`/`FormField` binding still compiles;
  `npm pack --dry-run` no longer bundles RHF; break recorded in S7 doc.
- Commit: `build(deps)!: react-hook-form → optional peerDependency`.

### S6 — Formik freeze markers (FE1, FE2)

- Do: add `@deprecated` JSDoc to each of the 10 `Formik*Field` wrappers — text
  states Formik support is frozen and **removed in v6**, points at the S7
  migration doc and the RHF path (`Form`/`FormField` today; turnkey `Rhf*Field`
  in v5.x). No behavior change; bugs stay frozen.
- Check: tsc clean; deprecation strikethrough shows in editor; every
  `Formik*Field` still resolves and renders unchanged.
- Commit: `refactor(forms): mark Formik fields @deprecated toward v6 removal`.

### S7 — Breaking-changes doc + integration (FE7 — the hard requirement)

- Do: author a dedicated, exhaustive v5 breaking-changes / migration doc (extend
  `packages/design-system/MIGRATION.md` with a complete `## v5` section, or a
  `BREAKING_CHANGES.md` if cleaner). It must list **every** break from S1–S6 with
  before→after: `Shadcn*` name removals → the `./primitives` raw name (per-family
  map, incl. the `ShadcnTable*` → `./primitives` migration klicker/gbl need),
  `./ui` and `./forms` removal (+ the root/`./primitives` replacement for each),
  RHF dep→peer (install note), Formik deprecation + v6 removal timeline, and the
  new `./primitives` door. Nothing custom is dropped (FE8). Update README
  pointers. Regenerate `dist` types; final `npm pack --dry-run` +
  exports-resolution check for `.`/`./primitives`/`./css`.
- Check: every removed/renamed public identifier from S1–S6 appears in the doc
  with a migration line (cross-check against the S2/S3 diffs); doc renders;
  pack ships expected files; scratch consumer resolves all live subpaths.
- Commit: `docs(design-system): document all v5 breaking changes and migration`.

## Phase 2 — RHF field family (additive; post-GA v5.x) — DEFERRED (own plan later)

Outline only; not built in Phase 1 per user sequencing.

- B1 — shared field chrome: extract `FieldError` + label/tooltip core (COMP-14),
  fixing the per-field copy-paste drift and giving gap primitives real chrome.
- B2 — tracer `RhfTextField`/`RhfNumberField`/`RhfSelectField` (matches careers'
  live need); prove the turnkey pattern + migration story.
- B3 — RHF parity with the remaining Formik-equivalent types.
- B4 — RHF gap fields: `Checkbox`/`RadioGroup`/`Slider`/`Combobox`/`MultiSelect`/
  `DateRange` (built as agnostic-primitive + `Rhf*Field`, not new Formik).
- B5 — Formik `@deprecated` markers + migration guide (`FormikXField`→`RhfXField`
  near-1:1 prop map) — only once B2–B4 give a real target.
- Consumer-side (separate): klicker Formik→RHF migration.

## Resolved by rulings

| ID | Question | Resolution |
| --- | --- | --- |
| F-a | `./ui` fate | **Removed** (S3). vet-platform's 2 sites break by design → S7 documents the swap to root. |
| F-b | `dep→peer` timing | **Phase 1** (S5) — breaking, so lands in the GA break. |
| F-c | Formik `@deprecated` timing | **Phase 1** (S6) — v6 removal locked; points at S7 doc + RHF path. |
| D-COLLAPSE | Collapsible root canonical | **Custom** at root, raw in `./primitives` (FE8). |
| D-TABLE-DROP | Drop custom `Table`? | **No — keep it** (FE8). NB: audit shows klicker/gbl use raw `ShadcnTable*`, **0** custom-`Table` imports — so custom `Table` is kept on principle but is currently unused; the raw table is what they migrate to `./primitives`. |

## Risks

- Breaking exports are clean removals now → the ONLY safety net is the S7 doc.
  If a removed/renamed identifier is missing from it, a consumer breaks silently
  on upgrade with no migration line. S7 completeness is cross-checked vs the
  S2/S3 diffs — treat that gate as blocking.
- `dep→peer`: the DS `Form` binding then needs a consumer RHF install; ~0 known
  consumers use it (gbl vendored, careers hand-rolls), but document in S7.
- `sideEffects` without the `["*.css"]` carve-out drops CSS (CONS-6 class) — the
  carve-out is mandatory, not optional.
- `./primitives` barrel could collide on duplicate export names across `ui/*`
  files → S1 must enumerate + de-collide.

## Verification

- Per slice: `pnpm check` (tsc), `format:check`, `build`, `build:ladle`,
  `npm pack --dry-run` + a scratch-consumer exports-resolution probe.
- Finish gate: full build + pack; resolve `.`/`./primitives`/`./css` from a
  throwaway consumer; **S7 breaking-changes-doc completeness cross-check** vs the
  removed/renamed identifiers; `$security-review`;
  `$thermo-nuclear-code-quality-review`; PR via `$rs-mr-description-writer`
  (whole-branch, draft by default).

## Progress

- 2026-07-19: plan written from the decision-mapping grill, then revised for the
  user's no-back-compat ruling (FE7): clean rename/removal instead of
  deprecation-aliases, `Shadcn*`/`./ui`/`./forms` removed outright, Formik
  `@deprecated` + `dep→peer` pulled into Phase 1, Formik removal set to v6, and a
  mandatory S7 breaking-changes doc added as the one hard requirement.
- 2026-07-19 (later): FE8 added — keep ALL custom composites (user ruling:
  design investment; don't drop in v5). S2 reframed to `Shadcn*` prefix removal
  only (nothing custom dropped); D-COLLAPSE + D-TABLE-DROP resolved (keep).
  Verified klicker uses raw `ShadcnTable*` (klicker `DataTable` + ~6 components,
  **0** custom-`Table` imports) — custom `Table` kept on principle, but the real
  klicker break is the raw table moving to `./primitives`.
- 2026-07-19 PR #180: finish-gate review found + fixed a dist-tag guard hole
  (prerelease id `latest` could clobber stable); fix pushed, PR marked ready,
  CI watched → merge into `v5` on green. Then fork `v5-api-consolidation` off
  updated `v5`, commit this plan first, then S1 (pending final go).
- 2026-07-19 (exec start): #180 merged into `v5` (merge commit `4305c86`, guard
  fix `e546fa2` inside). Forked `v5-api-consolidation` off `origin/v5`; the
  roadmap D3 edit + this plan traveled clean. Committing this plan first, then
  the roadmap edit separately, then S1 in the reviewed-slice loop. Standing
  rulings: S6 npm release HELD; no fonts in the public repo; agy delegation OFF
  (main-agent impl, native subagents review).
- 2026-07-19 S1 DONE (commit `175da43`): added `src/primitives.ts` re-exporting
  every raw `src/ui/*` primitive under natural names; `./primitives` wired into
  `package.json` `exports` + `typesVersions` and vite `build.entry`. Take-over
  review: barrel complete + exact (53 disk files ↔ 53 re-exports, no gap, no
  dangling), `tsc` clean.
- 2026-07-19 S2 committed by a resumed session (commit `96b59b4`): removed the 6
  `src/Shadcn*.tsx` shims + their stories; every custom composite kept at root.
  Take-over review found TWO defects the commit missed (both pass `tsc`/`pnpm
  build`, so uncaught): (1) **public-API leak** — `src/Form.tsx` still re-exported
  `FormLabel as ShadcnFormLabel`, so the root barrel still shipped a `Shadcn*`
  name (violates FE5); (2) **5 story files** (Popover/RadioGroup/Sheet/Sidebar/
  Form) still imported the deleted `./ShadcnLabel` / `./ShadcnDropdown` → would
  break `build:ladle` + the Playwright suite. Fixes applied on disk: dropped the
  `ShadcnFormLabel` re-export (raw form label now only via `./primitives`);
  repointed stories to raw `Label` / `DropdownMenu*` from `./ui/*` and `FormLabel`
  from `./ui/form`. Both are new v5 breaks for the S7 doc (ShadcnFormLabel
  removal; raw-name story imports). Verification DONE: grep shows no `./Shadcn*`
  broken imports (only internal `<Shadcn*>` `./ui/*` aliases remain, expected);
  `pnpm build` ✓ (types/ regenerated — `types/index.d.ts` −2 / `types/ui.d.ts`
  −3 drop `ShadcnFormLabel`); `build:ladle` ✓ (all stories resolve). Fixes
  folded into S2 via `git commit --amend` → S2 is now `57a0776` (was `96b59b4`).
- S7 follow-up (doc slice): several `*.stories.mdx` still carry stale PROSE
  referencing removed `Shadcn*` names ("distinct from the ShadcnTable component",
  "ShadcnProgress: Basic …"). Not build-breaking; clean up in the migration doc.
- 2026-07-19 S3 DONE (commit `47aa3a0`): removed the `./ui` + `./forms` doors —
  deleted `package.json` export blocks + `typesVersions` entries, the two
  `vite.config` build entries, `src/ui.ts` + `src/forms.ts`, and the orphaned
  tracked `types/ui.d.ts` + `types/forms.d.ts` (3670 deletions, pure removal).
  Verified: no internal barrel imports; `pnpm build` ✓ (`dist/ui.js`+`dist/
  forms.js` gone, `index`+`primitives` remain); `npm pack --dry-run` ships only
  `dist/index.*`+`dist/primitives.*`; `build:ladle` ✓. Public doors now = `.`,
  `./primitives`, `./css`. Breaks for S7 doc: `./ui` (2 vet-platform sites) +
  `./forms` (0 imports) removed → migrate to root `.`.
- 2026-07-19 S4 DONE (commit `9358656`): added `"sideEffects": ["*.css"]` to
  `package.json`. `pnpm build` clean, 6/6 fonts extracted. Non-breaking (additive
  metadata); consumer-side tree-shaking payoff verified at the finish-gate
  scratch-consumer probe, not the library build (sideEffects is consumer-facing).
- 2026-07-19 S5 DONE (commit `9db4fcc`): `react-hook-form` moved from
  `dependencies` to an optional `peerDependency` (`^7.59.0`) + pinned
  `devDependency` (`7.59.0`) so build/Ladle resolve; `peerDependenciesMeta.optional`.
  Dropped `@hookform/resolvers` entirely (never imported by the DS). Lockfile
  synced (`pnpm install`). Verified: `pnpm build` ✓ with RHF now **externalized**
  (shared chunk emits `import { FormProvider, Controller, useFormContext,
  useFormState } from 'react-hook-form'`, no inlined internals — the peer-move
  goal); `build:ladle` ✓ (Form.stories resolves the dev-install); `npm pack
  --dry-run` ships no inlined RHF. Breaking (consumers provide RHF; resolvers no
  longer transitive) → in S7 doc.
- 2026-07-19 S6 DONE (commit `78918cd`): `@deprecated` JSDoc added to all 10
  `Formik*` wrappers (frozen v5, removed v6; points at the RHF `Form` binding +
  `MIGRATION.md`). Comment-only (40 insertions), `tsc --noEmit` clean;
  self-reviewed (near-zero risk surface, gated subagent not warranted).
- 2026-07-19 S7 DONE (commit `f2cec65`): extended `MIGRATION.md` — two-door model,
  removed `./ui`/`./forms` (→ `./primitives`/root), complete **45-entry**
  `Shadcn*`→`./primitives` map, silent-collision callout, RHF dep→optional-peer +
  `@hookform/resolvers` drop, Formik `@deprecated`/v6. Cleaned stale `Shadcn*`
  prose in 7 stories (Accordion/Checkbox/Select/Table/Progress/Dropdown/
  Collapsible). **BLOCKING completeness gate PASSED**: derived the removed-public
  set from the pre-S2 tree — 45 `export` aliases; the 5 `import`-only internal
  `as Shadcn*` aliases (Button/Select/Tabs/Tooltip) correctly excluded; all 45 in
  the table; current public surface has 0 `Shadcn*` names (3 remaining refs are
  JSDoc prose). Independent review found 1 real defect — collision callout
  undercounted (5→12 real silent-swap names: added Button/Checkbox/Select/Slider/
  Switch/Tabs/Tooltip, all verified custom composites); fixed to a rule-of-thumb
  framing. `build:ladle` ✓. **Phase 1 (S1–S7) code-complete.**
- 2026-07-20 FINISH GATES run (all PASS):
  - Exports-resolution probe ✓: all 4 public specifiers (`.`/`./primitives`/`./css`/
    `./preflight.css`) resolve via Node's ESM resolver from an isolated consumer;
    `npm pack` ships `MIGRATION.md`+`dist/*`+`package.json` only.
  - `$thermo-nuclear-code-quality-review` PASS: branch mostly *deletes* complexity
    (flat `primitives.ts` barrel, 6 `Shadcn*` wrappers + `ui.ts`/`forms.ts` gone,
    −5434 lines); grep-verified **zero dangling refs** to removed modules/subpaths;
    no hand-written file near 1k lines. One finding **FIXED** (commit `f456636`):
    tracked `types/index.d.ts` was stale (dts emits `outDir:['dist','types']`; S6
    committed source `@deprecated` but not the regenerated decl — not consumer-facing,
    npm ships `dist/`). Deferred (own slice/ADR): untrack generated `types/` to kill
    the drift class.
  - Security assessment PASS (`$security-review` skill absent this session +
    subagents classifier-gated → main-agent review): no secrets/PII in diff, no
    credential files tracked, tarball = `dist`+`MIGRATION.md` only, **zero new deps**
    (net −2 runtime deps). No runtime security surface touched.
- PR-BASE CORRECTION: base = **`origin/v5` (`4305c86`)**, the merged-#180 tip — NOT
  local `v5` (`bb1ed4f`, stale/behind the whole P0 batch). Scoped branch =
  `4305c86..HEAD` (13 commits). Branch not yet pushed; no PR exists.
- 2026-07-20 S8 DONE (commit `e7980c9`): resolved the deferred thermo-nuclear
  finding — stopped tracking generated `types/`. Added `types` to the package
  `.gitignore` (next to `dist`) + `git rm --cached` the 3 tracked decls; the build
  regenerates them (`outDir:['dist','types']`). No consumer of the tracked copy
  (no tsconfig/import/config ref; only historical plan-markdown mentions). Also
  drops a stale `constants.d.ts` that `rollupTypes` no longer emits. Verified:
  `pnpm check` exit 0; `pnpm build` exit 0 regenerates `dist/`+`types/`; 6/6 fonts.
  Kills the drift class permanently. Not ADR-worthy (trivially reversible).
- 2026-07-20 Push authorized by user → `git push` + draft PR via
  `$rs-mr-description-writer` (whole-branch vs `origin/v5`, draft by default).
  **npm release stays HELD** (no publish of any tag) per standing ruling.
- 2026-07-20 FABLE REVIEW (independent final, `claude-fable-5` main-agent run) →
  full findings persisted at `project/2026-07-20-pr-181-fable-review-findings.md`.
  Verdict: core solid, blocking gate PASS, collision claim exact, smoke 454/454.
  **3 defects + 1 ADR advisory, all in packaging/docs layer:**
  - **F1 (needs ruling, conf 100):** `react-hook-form` `optional:true` is not
    honored — both doors static-import the shared form chunk
    (`dist/toggle-group-*.js:9`), so any consumer skipping RHF crashes on first
    import of EITHER `.` or `./primitives`. Recommend drop `optional:true` (make
    RHF a required peer) + rewrite MIGRATION §RHF; true optionality → v6 `./form` door.
  - **F2 (gated_auto, conf 100):** `MIGRATION.md:106`/`:101` point removed `./ui`
    (was 65 COMPOSITE re-exports) at `./primitives` (raw) → should be root `.`.
  - **F3 (gated_auto, conf 100):** `README.md:87` still shows `./forms` import +
    omits `./primitives`; npm auto-ships README. (S7 dangling grep missed prose.)
  - **F4 (advisory, conf 50):** two-door decision (FE5/FE7/FE8) has no ADR.
  klicker fit: 100/111 root-door import names unchanged; missing 11 all `Shadcn*`
  with exact MIGRATION rows → migration near-mechanical (FE8 vindicated).
  Disposition pending user ruling on F1; F2/F3 applyable as doc slices; npm HELD.
- 2026-07-20 FABLE FINDINGS RESOLVED (user rulings: F1 → required peer; next
  milestone → A11Y Level-A on a separate branch after #181 merges):
  - **F1 DONE** (commit `167a7b1`, `build(deps)!`): dropped
    `peerDependenciesMeta.react-hook-form.optional` → RHF is a required peer.
    Rewrote MIGRATION `### react-hook-form is now a required peer` explaining the
    root-entry re-export forces resolution at load; noted the true-optionality
    (per-feature `./form` split) deferral. README peer list +`react-hook-form`.
    Verified: `pnpm check` + `format:check` clean; `pnpm build` exit 0 (6/6
    fonts); `npm pack --dry-run` = 21 files, ships README+MIGRATION; frozen
    lockfile unchanged (RHF is a devDep in-repo, so the meta drop moved no deps).
  - **F2 DONE** (commit `167a7b1`): corrected MIGRATION removed-subpath mapping —
    `./ui` re-exported composites (→ root `.`) + `Shadcn*` aliases (→ `./primitives`),
    not "same raw primitives → ./primitives".
  - **F3 DONE** (commit `167a7b1`): refreshed README Usage — removed the dead
    `./forms` import, added `./primitives`, corrected the exports table, added
    the both-doors collision note.
  - **F4 DONE** (commit `6550e9f`, `docs(adr)`): created `docs/adr/0001-two-door-public-api.md`
    (FE5/FE7/FE8 + required-RHF-peer, silent-collision consequence + deferrals).
  - Delta gates: F1-F4 are doc/packaging-config only (one peer-meta line + prose +
    a new ADR); no runtime/logic surface. Main-agent re-review: format/tsc/build/
    pack green, no secrets/PII, tarball unchanged shape. Full thermo-nuclear +
    security already PASSED pre-review; a heavyweight rerun on 4 doc lines adds no
    signal — deferred to the GA cutover gate (#25). npm stays HELD.

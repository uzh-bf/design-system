# Fable review findings — PR #181 v5 API consolidation

Independent final branch review. Reviewer: Fable (`claude-fable-5`), main-agent
run. Date: 2026-07-20. Read-only; advice for main agent to integrate.

## Identity

- PR: [#181](https://github.com/uzh-bf/design-system/pull/181) (draft, base `v5`)
- Range reviewed: `origin/v5..HEAD` = `4305c86..a346882` (18 commits)
- Handoff brief: `project/_local/2026-07-20-fable-review-handoff-pr-181-v5-api-consolidation.md`
- Plan: `project/2026-07-19-pr-181-v5-api-consolidation-plan.md`

## Verdict

Core implementation solid. Blocking MIGRATION completeness gate PASS. 12-name
collision claim exact. Smoke 454/454. **3 real defects found, all in the
consumer-facing packaging/docs layer + 1 ADR advisory.** F1 needs a user ruling;
F2/F3 are doc fixes applyable on this branch.

## Findings (most severe first)

| # | Summary | Evidence | Conf | Class | Failure scenario |
| --- | --- | --- | --- | --- | --- |
| F1 | `react-hook-form` "optional" peer is not optional — both doors hard-import it | `dist/toggle-group-*.js:9` `import { FormProvider, Controller, useFormContext, useFormState } from 'react-hook-form'`; that shared chunk is statically imported by line 1 of BOTH `dist/index.js` and `dist/primitives.js` (root `export * from './Form'`; primitives `export * from './ui/form'`) — structural, not a chunking accident | 100 | manual (reverses part of S5 intent) | Consumer skips RHF (doc: "install it only if you use that binding"). First import of EITHER door → Node/Next SSR `ERR_MODULE_NOT_FOUND`, Vite resolution fail. `optional:true` also suppresses pnpm unmet-peer warning + auto-install → zero signal before crash. klicker + gbl are pnpm/Next = exact victim profile. |
| F2 | MIGRATION sends `./ui` consumers to wrong door | `MIGRATION.md:106` `` `@uzh-bf/design-system/ui` → `@uzh-bf/design-system/primitives` (same raw primitives, natural names) ``; but base `src/ui.ts@4305c86` was 65 composite re-exports (`./Accordion`, `./Button`, …) + `useArrowNavigation`, NOT raw primitives. `MIGRATION.md:101` repeats it | 100 | gated_auto | `./ui` consumer of composite `Button` follows doc → imports raw shadcn `Button` from `./primitives` → silent styling/behavior swap (the doc's own collision hazard). Correct target = root `.` (parity verified: all old `./ui` names exist at root, hook via `./hooks`). |
| F3 | README documents pre-branch API (npm auto-ships README regardless of `files`) | `README.md:87` `import { FormikTextField } from '@uzh-bf/design-system/forms'`; entry-point table lists removed `./forms`, omits `./primitives` | 100 | gated_auto | v5 install lands on npm/GitHub front page → copies broken import → resolution error; two-door model invisible in primary doc. The ref S7's "0 dangling refs" grep missed (grep scoped to code/subpaths, not README prose). |
| F4 | Two-door decision has no ADR | repo has no `docs/adr/` | 50 | advisory | Passes three-part test (hard to reverse, surprising, real trade-off). Future maintainer relitigates 12-collision acceptance or re-adds prefixes without context. One ADR covering FE5/FE7/FE8 + RHF-peer ruling fixes it. |

## Re-verified from scratch (challenged, held up)

- **Blocking gate PASS, reconstructed:** removed surface from base tree = 44
  `Shadcn*` in 6 deleted files + `ShadcnFormLabel` from old `Form.tsx` = exactly
  45 MIGRATION rows. 5 excluded aliases genuinely import-only. 0 `Shadcn*`
  exports remain in current surface.
- **Collision exact, not "at least":** loaded both built doors in Node,
  `Object.is` per name → 211 shared names, precisely the documented 12 differ,
  other 199 identical re-exports.
- `primitives.ts` mirrors `src/ui/*` 1:1 (53/53). All 4 `exports` specifiers
  resolve. `sideEffects:["*.css"]` safe (0 non-CSS import-for-effect modules).
  Primitives chunk pulls no formik/fontawesome/dayjs (good door isolation, apart
  from F1 RHF leak).
- Smoke suite fresh run: **454/454 stories render clean** — closes PR body's
  "not run" residual risk.

## Production readiness + klicker-uzh fit

- **klicker (4.1.6, 479 import sites, all root-door):** extracted full 111-name
  import surface, diffed vs built v5 root → **100/111 exist unchanged; missing 11
  are all `Shadcn*` with exact MIGRATION rows** (rest false alarms: type exports +
  local `Pagination as PaginationComponent` alias). FE8 (keep all composites)
  makes migration near-mechanical = decision vindicated. Migration =
  11 renames + theme/CSS sections + F1 RHF ruling.
- CI publish guard (ARCH-1, PR #180) verified present + correct at
  `.github/workflows/main.yml:117-150` — prerelease tag cannot clobber `latest`.
- Design quality: two-door model coherent; deletion-heavy diff (−9.1k lines) real
  simplification. F1 is the one place implementation contradicts the design promise.

## Three closing questions

1. **Hardest decision:** natural names on both doors (FE5) — accept 12 silent
   collisions to keep `./primitives` idiomatic-shadcn.
2. **Rejected alternatives:** re-prefix primitives (defeats door purpose),
   back-compat shims (FE7 hard break), drop zero-consumer composites (FE8 — klicker
   data now vindicates keeping them).
3. **Least confident:** whether "optional RHF" was load-bearing for anyone's v5
   plans. F1 says true optionality is impossible while both barrels statically
   export the Form binding; only a v6 dedicated `./form` door could deliver it.

## Recommended disposition

- **F1 (needs ruling):** drop `optional:true` (RHF becomes required peer) +
  rewrite MIGRATION `### react-hook-form is now an optional peer`. Honest, minimal;
  true optionality deferred to v6.
- **F2, F3:** apply as reviewed doc slices on this branch.
- **F4:** add ADR covering FE5/FE7/FE8 + RHF-peer ruling.
- npm release stays HELD regardless.

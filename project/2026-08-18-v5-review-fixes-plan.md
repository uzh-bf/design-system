# v5 Final-Review Remediation Plan (findings 1–6 → 5.0.0-alpha.5)

Plan identity: branch `rs/v5-review-fixes` (worktree `trees/rs-v5-review-fixes`), target `v5`, PR TBD.
History: fixes the six findings of the 2026-08-17 integrated final review of the W1–W6 GA package (report gitignored under `project/_local/reviews/`); prior plans `project/2026-08-17-w5-candidate-metadata-plan.md` and earlier remain history.

- Goal: remediate all six review findings in one package; afterwards a separate light-path package bumps `5.0.0-alpha.5` (mirror of PR #206). Publish tag push is out of scope (user authority).
- Non-goals: W7 consumer migration; GA (`5.0.0`) metadata; new theme features; touching the publish job beyond `needs` wiring.
- ADRs: 0003 (ramp override boundary) unchanged in substance; D9 root-only theming ruling (2026-07-23) is the basis for S2. Candidate new ADR at finish gate: ThemeProvider root-sync semantics.

## Primitive impact

| Primitive | Disposition | Contract delta |
| --- | --- | --- |
| ThemeProvider | extend | `data-theme` now set on `document.documentElement` via effect; wrapper div keeps `className` only; SSR first paint needs `<html data-theme>`; nested providers = last writer wins (documented) |
| Tabs | fix | caller `tab.id`/`id` no longer become DOM ids (React key only); generated ids sanitized for React 19 |
| Collapsible | extend | new optional `ariaLabel`; English fallback skipped when `customTrigger` present |
| ScrollArea | extend | `tabIndex` forwarded to Viewport (default stays `0`) |

## Planning stage

Planner pass (Fable, read-only) DONE_WITH_CONCERNS 2026-08-18; report persisted at `project/_local/reviews/2026-08-18-v5-review-fixes-planning.md`. Accepted: option (c) for F1; harness companion edits in-slice; inventory wiring split (artifact assertions in CI + local determinism script); VRT gate via `build.needs`; VRT promotion ordered after S2/S3 with local 23/23; Tabs story/JSDoc/CHANGELOG updates; contract test in `tests/contracts/`; delegation map below.

## Delegation Map

| Workstream | Slices | Owner | Dependency | Acceptance boundary |
| --- | --- | --- | --- | --- |
| Theme boundary | S2 | executor (Opus 5, user-directed) | plan committed | suites green + new 4th-state contract |
| Component a11y contracts | S3 | executor (Opus 5) | after S2 (same worktree) | suites green + new resolvable-ids contract |
| CI hardening | S4 | executor (Opus 5) for edits; main for CI proof | after S2+S3 + local `test:visual` 23/23 | PR CI: deliberate red, then green with VRT in `build.needs` |
| Finish | S5 | main + final-reviewer | S2–S4 | Finish Gate |
| Release bump | Package B | main (light path) | Package A merged | alpha.5 metadata PR green; STOP before tag |

## Test portfolio

| Risk | Obligation | Seam | Distinct failure |
| --- | --- | --- | --- |
| Consumer ramp override shadowed inside provider (F1) | add new | 4th state in `tests/contracts/theme-extension-ui.spec.ts`: root `uzh` + ramp override + real provider wrapper intact | override reverts to UZH blue inside subtree |
| Tabs dangling ARIA refs / bad ids (F2) | add new | Playwright contract in `tests/contracts/` via `gotoStory` | `aria-labelledby`/`aria-controls` unresolvable; `«` in generated ids |
| Collapsible label override (F3) | extend existing | same contract file / existing stories | `ariaLabel`/`customTrigger` precedence wrong; `button-name` stays green |
| ScrollArea tabIndex (F5) | none | existing a11y suite covers `scrollable-region-focusable` | — |
| Inventory completeness (F4) | CI evidence | new CI job asserting downloaded shard artifacts | shrunken scan passes silently |
| VRT gates nothing (F6) | CI evidence | `visual-regression` in `build.needs`; deliberate-red proof on PR | regression lands green |

## Slices

- S1 `docs(project)`: commit this plan. DONE when committed.
- S2 `fix(theme)!`: F1 via option (c).
  - Do: `ThemeProvider.tsx` — set/update `data-theme` on `document.documentElement` in an effect (controlled + uncontrolled); wrapper div drops `data-theme`, keeps `className`. Companions in-slice: `tests/_support/ladle.ts` (`STORY_SELECTOR`/`THEME_WRAPPER_SELECTOR`/`expectRequestedTheme` → read `document.documentElement`), `.ladle/components.tsx` (theme and dark axis to root), `tests/contracts/theme-extension-ui.spec.ts` (remove wrapper-strip workaround `:66-79`; add 4th state per portfolio), `ThemeProvider.stories.mdx`, rewrite `README.md:72-83` + `MIGRATION.md:62-88` (portal caveat partially obsolete; SSR note), CHANGELOG entry.
  - Check: `test:theme-contract` 672, `test:smoke`, `test:a11y` 795, local `test:visual` 23/23 (Docker), `pnpm check && pnpm lint && pnpm format:check`.
  - Commit: one slice commit. Slice-risk gate: YES (public theme contract) → simplifier + slice-reviewer in parallel.
- S3 `fix(a11y)`: F2+F3+F5.
  - Do: `Tabs.tsx` drop `tab.id ??` (`:75`) and `id ??` (`:137`) DOM-id fallbacks (key only), fix sanitizer to strip non-`[a-zA-Z0-9_-]`; `Collapsible.tsx` optional `ariaLabel`, skip fallback when `customTrigger`; `ui/scroll-area.tsx` destructure + forward `tabIndex` to Viewport. New contract test per portfolio; update `Tabs.stories.mdx` + JSDoc; CHANGELOG (removed DOM ids).
  - Check: smoke + a11y + new contract + check/lint/format.
  - Commit: one slice commit. Substantive → simplifier; slice-reviewer: yes (a11y public contract, plan-named).
- S4 `ci(quality)`: F4+F6.
  - Do: new thin script asserting `assertInventoryCycle`/`assertCoverageCycle` over the four downloaded `a11y-inventory-*` artifacts in a new job `needs: a11y`; `"test:a11y:protocol": "tsx tests/a11y/run-inventory-cycles.ts"` for local determinism; VRT job drop `continue-on-error` + `if-no-files-found: error` + add to `build.needs`.
  - Check: `actionlint`/YAML parse locally; CI proof at PR stage (deliberate red commit, revert, green; cite report-only history at 53d12495d as the clean-run evidence).
  - Commit: one slice commit. Slice-reviewer: yes (CI/security lens); simplifier if substantive.
- S5: Finish Gate — fresh full verification, final-reviewer over the whole range, PR via `$rs-mr-description-writer`, CI proof, merge into `v5` after green (user-directed flow), then Package B.

## Progress

- 2026-08-18: plan committed (S1).
- 2026-08-18: S2 done (executor report `project/_local/reviews/2026-08-18-s2-executor-report.md`). Option (c) implemented; 4th contract state proven to fail on old code (UZH blue vs consumer ramp) and pass with fix. 9 uzh visual baselines regenerated — the UZH font now genuinely applies through the provider path (typography-only diffs, verified visually); compare run 23/23. Suites: theme-contract 672, smoke 480, a11y 795, check/lint/format green.
- Discovered (pre-existing at 7a905a234, A/B-verified): `tests/contracts/rhf-fields.spec.ts` 6 failures. Root cause diagnosed in live DOM: `NumberField`'s hardcoded `aria-label` fallback (`'Number'`, src/forms/NumberField.tsx ~:206-210) fires whenever no `label` prop is passed — which is always in the RHF path, since `RhfFieldShell` owns the label — and aria-label overrides the correctly associated `<label for>` in accname computation, so the field announces "Number" instead of "Amount". Real AT defect, same family as finding 3. Folded in as S3b: prefer `aria-labelledby` to the shell label (gives correct "Amount *" naming when required) over duplicating label text; keep the fallback for genuinely unlabeled standalone usage so the a11y suite stays at zero violations. CI does not run tests/contracts, so CI green was never evidence here.
- S2 gates done. Slice review: done — `_local/reviews/2026-08-18-s2-slice-review.md` (DONE_WITH_CONCERNS, no blockers; 4th state confirmed non-vacuous). Simplifier: `_local/reviews/2026-08-18-s2-simplifier.md` (one accepted reduction). Adjustments integrated: seedLadleTheme folded back (3-arg gotoStory), dead wrapper workaround removed from curated-boundary.spec.ts, JSDoc one-way-write wording. Verified: check/lint/format green, theme contracts 4/4, visual 23/23.
- Package B note (from slice review finding 4, verified via release:dry): standard-version will NOT consume the hand-written `## Unreleased` CHANGELOG section — fold it into the generated entry during the alpha.5 metadata commit.
- S3 done (executor report `_local/reviews/2026-08-18-s3-executor-report.md`). F2: caller ids never become DOM ids, `TabContent` `id` prop removed (type break, sanctioned), React-19-safe sanitizer. F3: `ariaLabel` prop, fallback stands down for customTrigger. F5: `tabIndex` forwarded to viewport, default kept. S3b: `labelId` through `useRhfField`/`RhfFieldShell`/`FormLabel`, `aria-labelledby` on RhfNumberField AND RhfSelectField (same masked defect: placeholder `Choose a location` outranked the shell label — accepted in-contract extension). New `tests/contracts/component-aria.spec.ts`, non-vacuity A/B-proven. Verified: check/lint/format green, smoke 480, a11y 795 zero waivers, contracts 31/31 (rhf-fields 15/15, was 6 red), visual 23/23.
- S3 deferred items for later decision: sanitize RHF `useId` delimiters (ids like `«r2»-label` are aria-correct but not CSS-id-selectable); RhfMultiSelect still names via duplicated `aria-label`; no story coverage for the two new props (would move pinned suite counts).
- S3 gates done. Simplifier: `_local/reviews/2026-08-18-s3-simplifier.md` (DONE, no reductions). Slice review: `_local/reviews/2026-08-18-s3-slice-review.md` (DONE_WITH_CONCERNS, one finding). Finding integrated via the reviewer's stronger option: `Label.tsx` tooltip branches now render the required asterisk inside the id-bearing `RadixLabel.Root` (matching the no-tooltip branch), so `aria-labelledby`/`<label for>` names include the visible `*` with a tooltip configured — also fixes the same pre-existing asymmetry for `RhfTextField`. New contract test on existing story `label--required-tooltip` (A/B-proven: fails pre-fix on the asterisk assertion). Verified: check/lint/format green, contracts 32/32, smoke 480, a11y 795 zero waivers, visual 23/23 (no snapshot moved — curated stories carry no tooltip+required label).
- S4 done (executor report `_local/reviews/2026-08-18-s4-executor-report.md`, DONE_WITH_CONCERNS with accepted deviations: script at `tests/a11y/assert-inventory-artifacts.ts` since the planned name was taken by the local two-cycle runner; VRT display name drops "(report-only)" with no branch protection pinning it; test-results upload stays `warn` because a green run leaves only the hidden `.last-run.json`). F4: `a11y-protocol` job asserts the 8 shard artifacts via the existing cycle assertions; `test:a11y:protocol` locally. F6: VRT blocking, report upload required, both jobs in `build.needs`. Non-vacuity proven in four failure modes over real artifacts. Verified independently: positive + empty-dir runs, check/lint/format, YAML job graph.
- S4 gates done, zero adjustments. Simplifier `_local/reviews/2026-08-18-s4-simplifier.md` (DONE, no reductions). Slice review `_local/reviews/2026-08-18-s4-slice-review.md` (DONE, no qualifying defects; verified exit-code propagation through the Docker script, report presence on green runs, tag-push coverage, no token-scope gap). Transitive `a11y` in `build.needs` kept deliberately.
- S5: ADR 0004 (ThemeProvider root-sync) written per the plan's finish-gate candidate.
- Next: fresh full verification, final-reviewer over `53d12495d..HEAD`, PR + deliberate-red CI proof, merge, then Package B.

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
- Discovered (pre-existing at 7a905a234, A/B-verified): `tests/contracts/rhf-fields.spec.ts` 6 failures — number field story never renders. Folded in as slice S3b (diagnose root cause, fix if bounded). CI does not run tests/contracts, so CI is unaffected; the full local Playwright run is red on v5 without this.
- Next: S2 fan-out gate (simplifier + slice-reviewer), then S3 executor.

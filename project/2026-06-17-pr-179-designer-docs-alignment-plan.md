# DS v5 — Designer Docs Alignment Plan

Plan path: `project/2026-06-17-pr-179-designer-docs-alignment-plan.md`
Branch: `v5`
Target: `main`
PR: #179
Date: 2026-06-17

Related history:
- `project/2026-06-16-pr-179-structural-baseline-alignment-plan.md`
- `project/2026-06-15-v5-design-reference-conformance-audit.md`
- `project/2026-06-15-ds-v5-composite-components-plan.md`
- Local designer drop: `UZH DF Design System/` (untracked)

## Goal

Finish remaining DS v5 structural alignment using latest designer reference.

Align components that were deferred because no reference existed before designer handoff.
Keep neutral + uzh structure shared.
Keep consumer APIs stable unless new behavior is explicitly additive.

## Non-Goals

- Color phase. No brand hue token changes without design-owner sign-off.
- Composite/template layer: app shell, masthead, primary nav shell, hero, page header, filter rail, footer, stat/announcement templates.
- New heavy deps: TanStack table, VRT infra.
- Re-do shipped D0-D7 structural baseline.
- Push. User controls push.

## Source Precedence

Use latest designer docs in this order:

1. `UZH DF Design System/GAPS-RESOLVED.md`
2. `UZH DF Design System/components/*.jsx`
3. `UZH DF Design System/preview/*.html`
4. `UZH DF Design System/README.md`
5. `UZH DF Design System/colors_and_type.css`

Reason:
- Component files + `GAPS-RESOLVED.md` contain new reference specs.
- `README.md` and `colors_and_type.css` still mix older reconstructed palette/text.

## Fixed Constraints

- Colors gated:
  - destructive orange `#FC4C02` vs shadcn red
  - secondary berry `#BF0D3E` vs older red `#DC6027`
  - status hue set
  - chromatic blue ladder vs mechanical fade
  - badge/count hue
- Structural neutral greys ok:
  - border `#E0E0E0`
  - divider `#EFEFEF`
  - surface `#FAFAFA`
  - muted text `#666666`
  - text `#111111`
  - disabled/placeholder `#A3A3A3`
- Existing repo state:
  - `v5` == `origin/v5` at `edb7952`
  - designer drop untracked
  - PR #179 structural baseline already shipped/green

## Designer Spec Deltas

Latest specs supersede old plan notes:

- Calendar: panel 280, p16, nav 28, weekday 12, day 34, gap 2.
- Sidebar: width 240, item 36, px12, radius 6, label 11 uppercase, badges retained.
- CycleProgress: default 96, stroke 8, center `20/700` + caption 11.
- AlertDialog title: 18/600, not old 16/700.
- Tooltip already mostly aligned: dark, text 12, arrow.

## Skill Routing

- `df-sliced-development-workflow`: plan, slice commits, review/simplify/final gate.
- `caveman`: terse plan/progress/subagent findings.
- `df-uzh-corporate-design`: brand rules + color gate.
- Context7 docs before library-sensitive code:
  - Radix Slider/Menu/Dialog/Accordion/Tooltip/Popover/HoverCard as needed.
  - `react-day-picker` before Calendar.
  - Embla before Carousel.
  - `react-countdown` before Countdown if public behavior changes.
- `df-mr-description-writer`: PR body update at finish.
- `security-review`: final gate.

## Slices

### S0 — Plan + Reference Hygiene

Do:
- Commit this plan alone.
- Add ignore protection for `UZH DF Design System/` or move/copy reference into ignored `uzh-design-reference/`.
- Record source precedence in progress.

Files:
- `project/2026-06-17-pr-179-designer-docs-alignment-plan.md`
- `.gitignore` if needed

Check:
- `git status --short --untracked-files=all`
- Designer reference not staged.

Commit:
- `docs(project): add designer-docs alignment plan`
- `chore(repo): ignore local designer reference drop` if `.gitignore` changes.

### S1 — Small Primitives

Do:
- `Tag`: height 24, radius 4, font 12/500, optional active/removable/dashed if additive.
- `Kbd`: mono, h20, min-w20, px6, radius 4, 1px border + 2px bottom.
- `Slider`: default visual path track h6, thumb 18, radius full, primary fill; preserve labels/icons/color maps/compact.
- `Countdown`: styled default renderer; keep `formatter` escape hatch; add urgent/warning path only if additive.

Files:
- `packages/design-system/src/Tag.tsx`
- `packages/design-system/src/ui/kbd.tsx`
- `packages/design-system/src/Slider.tsx`
- `packages/design-system/src/Countdown.tsx`
- stories/types as needed

Check:
- Ladle stories both themes.
- `pnpm -C packages/design-system tsc -b`

Commit:
- `fix(ds): align primitive components to designer specs`

### S2 — Progress + Carousel Shapes

Do:
- `CycleProgress`: align default 96/stroke 8/center typography; preserve `size`, `overrideSize`, `children`.
- `CycleCountdown`: align ring dimensions/center text if needed.
- `Carousel`: arrows 36 circular, dots if cleanly additive, no public API break.
- `Workflow` / `StepProgress`: only latest doc-backed structural deltas.

Files:
- `packages/design-system/src/CycleProgress.tsx`
- `packages/design-system/src/CycleCountdown.tsx`
- `packages/design-system/src/ui/carousel.tsx`
- `packages/design-system/src/Workflow.tsx`
- `packages/design-system/src/StepProgress.tsx`
- stories/types as needed

Check:
- Ladle progress/carousel stories.
- Carousel keyboard behavior.
- `pnpm -C packages/design-system tsc -b`

Commit:
- `fix(ds): align progress and carousel shapes to designer specs`

### S3 — Navigation + Menu Polish

Do:
- `Sidebar`: width 240, item h36, px12, radius 6, label 11 uppercase, badge alignment.
- `Breadcrumb`: `/` separator, current weight 500, hover primary.
- `Pagination`: 36 controls, radius 6, font 13, active fill already theme-aware.
- Dropdown/Context/Menubar: surface radius 8, item h36, row radius 6, shortcut kbd pill.
- `Navigation`: reduce menu/item text from 16 to 14 where designer docs require.

Files:
- `packages/design-system/src/ui/sidebar.tsx`
- `packages/design-system/src/ui/breadcrumb.tsx`
- `packages/design-system/src/ui/pagination.tsx`
- `packages/design-system/src/ui/dropdown-menu.tsx`
- `packages/design-system/src/ui/context-menu.tsx`
- `packages/design-system/src/ui/menubar.tsx`
- `packages/design-system/src/Dropdown.tsx`
- `packages/design-system/src/Navigation.tsx`
- stories/types as needed

Check:
- Ladle nav/menu stories both themes.
- Axe on affected components if fast enough.
- `pnpm -C packages/design-system tsc -b`

Commit:
- `fix(ds): align navigation and menu polish to designer specs`

### S4 — Overlay + Dialog + Disclosure

Do:
- `Popover`: width 280, p16, radius 8.
- `HoverCard`: width 300, p16, reference person-card defaults where primitive permits.
- `Dialog`/`Modal`: panel p24, width 520-ish, close 32, title 18/600 where applicable.
- `AlertDialog`: keep 18/600 latest spec; only align spacing/buttons.
- `Accordion`: no outer border by default, divider rows, trigger h52, 15/600, content pb16.
- `Tooltip`: verify only; avoid churn if already matching.

Files:
- `packages/design-system/src/ui/popover.tsx`
- `packages/design-system/src/ui/hover-card.tsx`
- `packages/design-system/src/ui/dialog.tsx`
- `packages/design-system/src/ui/alert-dialog.tsx`
- `packages/design-system/src/ui/accordion.tsx`
- wrappers/stories/types as needed

Check:
- Ladle overlay/dialog/disclosure stories.
- Focus/keyboard spot checks.
- `pnpm -C packages/design-system tsc -b`

Commit:
- `fix(ds): align overlay dialog and disclosure specs`

### S5 — Advanced Inputs

Do:
- `Calendar`: align latest reference without breaking `react-day-picker` semantics.
- `NumberField`: add stepper mode/variant only if cleanly additive; do not replace validated text+unit behavior.
- Verify `DatePicker` / `DatetimePicker` after Calendar changes.

Files:
- `packages/design-system/src/ui/calendar.tsx`
- `packages/design-system/src/forms/NumberField.tsx`
- `packages/design-system/src/DatePicker.tsx`
- `packages/design-system/src/DatetimePicker.tsx`
- Formik wrappers only if needed.

Check:
- Context7 docs for `react-day-picker`.
- Keyboard navigation.
- Form stories both themes.
- `pnpm -C packages/design-system tsc -b`

Commit:
- `feat(ds): add reference-backed advanced input variants`

### Final Gate

Do:
- Format touched files from `packages/design-system`.
- Build + type declarations.
- Full Playwright smoke/a11y.
- Browser/Ladle visual screenshots for changed stories.
- Final security review.
- Update plan `Progress`.
- Update PR #179 via `df-mr-description-writer`.

Check:
- `pnpm -C packages/design-system exec prettier --write <touched files>`
- `pnpm -C packages/design-system tsc -b`
- `pnpm -C packages/design-system build`
- `pnpm -C packages/design-system test`
- `git status --short`

Commit:
- `chore(ds): regenerate type declarations for designer-docs alignment` if needed.
- `docs(project): record designer-docs alignment final gate`

## Progress

- 2026-06-17: Plan committed `450fccb`.
- 2026-06-17: S0 done `d2ca8d1`. `.gitignore` now protects `UZH DF Design System/`; designer drop not staged.
- 2026-06-17: S1 done locally. Implemented Tag/Kbd/Slider/Countdown structural alignment. Context7 docs checked for Radix Slider (`/websites/radix-ui_primitives`) and `react-countdown` (`/ndresx/react-countdown`). Self-review simplified Countdown minute math and kept Slider API-compatible.
- S1 verification:
  - `./node_modules/.bin/prettier --write src/Tag.tsx src/Tag.stories.mdx src/ui/kbd.tsx src/Slider.tsx src/Countdown.tsx src/Countdown.stories.mdx`: exit 0 for TS files; MDX files ignored by current Prettier config.
  - `pnpm --dir packages/design-system build:tsc`: exit 0.
  - `pnpm --dir packages/design-system build:ladle`: exit 0.
  - `PWTEST_SKIP_BUILD=1 ./node_modules/.bin/playwright test tests/smoke/stories.spec.ts --grep "tag--|kbd--|slider--|countdown--"`: 32 passed, 0 failed. Ran escalated against local Ladle preview because sandbox cannot bind/reach local server and Playwright config's `pnpm exec ladle preview` hits pnpm registry-signature/network check.
- Next: Commit S1, then S2 progress/carousel.

## Next Steps

1. Commit plan alone.
2. Protect untracked designer drop.
3. Work S1-S5 one slice at a time.
4. Final gate + PR #179 update.

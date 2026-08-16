# W4.1 — Accessible Names, Labels, and Progressbars Remediation

## Goal

Retire the 110 accessible name, label, input, and progressbar debt tuples from the v5 exact accessibility inventory (`button-name`, `label`, `label-title-only`, `aria-input-field-name`, `aria-progressbar-name`) while preserving all component public contracts and visual baselines.

## Non-goals

- No changes to remaining 38 structural and contrast tuples (deferred to W4.2 and W4.3).
- No visual design regressions or public API breaking changes.
- No deletion of the rendered-content canary test.

## Plan Identity

- Plan: `project/2026-08-16-w4-1-a11y-names-labels-plan.md`
- Branch: `rs/v5-w4-a11y-names-labels`
- Worktree: `trees/rs-v5-w4-a11y-names-labels`
- Target: `v5` at `76fddcbc6`
- Umbrella roadmap: `project/2026-08-12-v5-ga-remaining-roadmap.md`, W4 section

## Evidence and Research

### Local Inventory Breakdown

The exact inventory in `packages/design-system/tests/a11y/exact-inventory.ts` records:
1. `aria-input-field-name` (7 stories, 14 tuples): Slider thumbs lacking default accessible names.
2. `aria-progressbar-name` (7 stories, 14 tuples): Linear progress bars lacking accessible labels.
3. `button-name` (26 stories, 52 tuples): Collapsible chevron triggers, icon-only buttons, Switch toggles without text, and Select trigger buttons.
4. `label` & `label-title-only` (15 stories, 30 tuples): FormikPinField digit inputs, NumberField stepper inputs, and arrow navigation demo inputs without programmatic labels.

### Seams & Remediation Strategy

- `Slider.tsx`: Add default `aria-label` / `aria-labelledby` fallbacks on slider thumbs (e.g. `'Value'` or formatted value).
- `Progress.tsx`: Add default `aria-label="Progress"` fallback on progress role container when unlabelled.
- `Collapsible.tsx`: Provide `aria-label="Toggle section"` on toggle button triggers when no text is inside.
- `Switch.tsx` / `FormikSwitchField.tsx`: Ensure toggle button has accessible label or fallback `aria-label` when visible label is absent/unlinked.
- `Select.tsx` / `SelectField.tsx`: Ensure trigger button exposes accessible name from selected value, placeholder, or associated label.
- `FormikPinField.tsx`: Associate label or generate sequential `aria-label="Digit {n} of {total}"` on pin input slots.
- `NumberField.tsx`: Ensure programmatic `<label htmlFor>` linkage and stepper button names (`aria-label="Increment"`, `aria-label="Decrement"`).
- Story fixtures: Update standalone preview stories that intentionally showcase icon-only variants to include standard accessible `aria-label` props.

## Test Portfolio

| Risk or behavior | Obligation | Primary seam | Distinct failure caught | Owner |
| --- | --- | --- | --- | --- |
| Slider thumb accessibility | add/update | `Slider.tsx` & `tests/a11y/` | Screen readers cannot announce slider thumb purpose | S1 |
| Progress bar accessibility | add/update | `Progress.tsx` & `tests/a11y/` | Screen readers cannot announce progress bar purpose | S1 |
| Button / Trigger accessibility | add/update | `Collapsible.tsx`, `Switch.tsx`, `Select.tsx` | Screen readers announce unlabelled buttons | S2 |
| Input / PinField label association | add/update | `FormikPinField.tsx`, `NumberField.tsx` | Inputs missing programmatic labels | S3 |
| Exact inventory ratchet | replace/consolidate | `exact-inventory.ts` | Inventory fails if remediated tuples are retained or new ones added | S4 |
| Visual regression protection | extend existing | `tests/visual/` container snapshots | Label/markup changes alter visual layout | S4 |

## Delegation Map

| Slice | Owner | Handoff | Acceptance boundary |
| --- | --- | --- | --- |
| S0 — Plan contract | main | user-approved plan | Plan committed as first branch commit |
| S1 — Slider & Progress | main | S0 | 28 tuples remediated; Slider & Progress stories pass axe rules |
| S2 — Collapsible, Switch, Select, Buttons | main | S1 | 52 tuples remediated; trigger & icon buttons pass axe rules |
| S3 — PinField & NumberField Labels | main | S2 | 30 tuples remediated; form inputs pass axe rules |
| S4 — Inventory Ratchet & Monorepo Proof | main | S3 | 110 tuples removed from inventory; 4/4 a11y shards pass; VRT clean |

## Slices

### S0 — Commit package contract
- Route: main
- Do: Commit this plan file on branch `rs/v5-w4-a11y-names-labels`.
- Commit: `docs(project): add w4.1 accessible names and labels plan`

### S1 — Remediate Slider and Progress accessible names (28 tuples)
- Route: main
- Do: Update `Slider.tsx` and `Progress.tsx` (and stories if needed) to ensure accessible names for slider thumbs and progress bars.
- Check: `slider--*` and `progress--*` stories pass axe scan without `aria-input-field-name` or `aria-progressbar-name` violations.
- Commit: `fix(a11y): add accessible names to slider and progress components`

### S2 — Remediate Collapsible, Button, Switch, and Select triggers (52 tuples)
- Route: main
- Do: Update `Collapsible.tsx`, `Switch.tsx`, `Select.tsx`, `SelectField.tsx`, and icon button stories to provide accessible names for trigger buttons and icon-only controls.
- Check: `collapsible--*`, `button--*`, `switch--*`, `select--*` stories pass axe scan without `button-name` violations.
- Commit: `fix(a11y): add accessible names to button, switch, collapsible, and select triggers`

### S3 — Remediate PinField, NumberField, and Demo input labels (30 tuples)
- Route: main
- Do: Update `FormikPinField.tsx`, `NumberField.tsx`, and `use-arrow-navigation.stories.tsx` to ensure all input elements are programmatically labelled.
- Check: `formik-pin-field--*`, `number-field--*`, `use-arrow-navigation--*` stories pass axe scan without `label` / `label-title-only` violations.
- Commit: `fix(a11y): associate programmatic labels on pin field and number field inputs`

### S4 — Ratchet exact inventory and run monorepo proof
- Route: main
- Do: Remove the 110 remediated tuples from `packages/design-system/tests/a11y/exact-inventory.ts`. Run full a11y suite across all 4 shards and container VRT.
- Check: All 4 shards pass against the remaining 38 tuples; VRT has zero diffs; typecheck, lint, format pass.
- Commit: `test(a11y): ratchet exact inventory to 38 serious-critical tuples`

## Progress

- Status: S0 plan committed; beginning S1 implementation.
- S0: committed.
- S1: pending.
- S2: pending.
- S3: pending.
- S4: pending.

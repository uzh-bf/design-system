# Package Plan — W4.3 Color Contrast Remediation & Inventory Zeroing

## Overview

- **Kind:** Implementation package.
- **Branch:** `rs/v5-w4-a11y-contrast`
- **Base:** `v5`
- **Worktree:** `/Users/rschlae/Git/df/design-system/trees/rs-v5-w4-a11y-contrast`
- **Goal:** Remediate all 12 remaining `color-contrast` accessibility violations (neutral theme) across UserNotification, Table, Workflow, and Collapsible, reducing the serious/critical accessibility inventory to **0**.

## Slices

### Slice 1: Semantic Status Color Contrast Remediation (10 tuples)
- `packages/design-system/src/UserNotification.tsx`: Use `text-info` and `text-success` instead of `-foreground` on tinted backgrounds (`bg-info-background`, `bg-success-background`).
- `packages/design-system/src/Workflow.tsx`: Use `text-success` on non-active completed item (`bg-success-background`).
- Remediates:
  - `user-notification--info` (neutral)
  - `user-notification--success` (neutral)
  - `user-notification--custom-content` (neutral)
  - `table--simple` (neutral)
  - `table--default-sorting` (neutral)
  - `table--sorting` (neutral)
  - `table--reset-table` (neutral)
  - `table--formatted` (neutral)
  - `table--combined` (neutral)
  - `workflow--progress` (neutral)

### Slice 2: Story Style Overrides Contrast Remediation (2 tuples)
- `packages/design-system/src/Collapsible.stories.mdx`: Update `staticContent` to `text-primary-100 font-semibold` on `bg-primary-20`.
- `packages/design-system/src/UserNotification.stories.mdx`: Update `message` to `text-success` on `bg-muted`.
- Remediates:
  - `collapsible--styled` (neutral)
  - `user-notification--styled` (neutral)

### Slice 3: Inventory Zeroing & Full Suite Proof (Zero Violations)
- `packages/design-system/tests/a11y/exact-inventory.ts`: Zero `EXACT_SERIOUS_CRITICAL_INVENTORY`.
- `packages/design-system/tests/a11y/stories.spec.ts`: Update harness canary to verify passing checks on rendered story tree (`button-name`).

## Verification
- `pnpm --dir packages/design-system test:a11y` (795/795 passed with 0 waivers)
- `pnpm --dir packages/design-system test:visual` (23/23 visual regression tests passed)
- `pnpm check && pnpm lint && pnpm format:check`

# Package Plan — W4.2 ARIA Structure, Ownership, Nested Interactivity & Focusable Scrolling Remediation

## Overview

- **Kind:** Implementation package.
- **Branch:** `rs/v5-w4-a11y-structure`
- **Base:** `v5`
- **Worktree:** `/Users/rschlae/Git/df/design-system/trees/rs-v5-w4-a11y-structure`
- **Goal:** Remediate all 26 serious/critical accessibility violations across `aria-valid-attr-value` (10), `aria-required-children` (6), `nested-interactive` (6), `scrollable-region-focusable` (2), and `aria-required-parent` (2), ratcheting `exact-inventory.ts` down to the final 12 `color-contrast` tuples.

## Slices

### Slice 1: Tabs ARIA IDREF & Tooltip Hierarchy Remediation (16 tuples)
- `packages/design-system/src/Tabs.tsx`
- `packages/design-system/src/ui/tabs.tsx`

### Slice 2: Command Separator & ItemGroup Structure Remediation (4 tuples)
- `packages/design-system/src/ui/command.tsx`
- `packages/design-system/src/ui/item.tsx`

### Slice 3: ScrollArea Keyboard Focus & Tooltip Stories asChild (6 tuples)
- `packages/design-system/src/ui/scroll-area.tsx`
- `packages/design-system/src/Tooltip.stories.mdx`

### Slice 4: Oracle Ratchet to 12 Color-Contrast Tuples & Full Suite Proof
- `packages/design-system/tests/a11y/exact-inventory.ts`
- `packages/design-system/tests/a11y/stories.spec.ts`

## Verification
- `pnpm --dir packages/design-system test:a11y`
- `pnpm --dir packages/design-system test:visual`
- `pnpm check && pnpm lint && pnpm format:check`

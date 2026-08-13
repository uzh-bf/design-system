# ADR: Component workbench — keep Ladle, defer Storybook 10

- Status: Accepted
- Date: 2026-06-15
- Deciders: Roland (DS owner)
- Branch context: `v5`
- Supersedes / relates: none

## Context

The design system (`packages/design-system`) uses **Ladle 5** as its component
workbench. Question raised: should we move to the latest **Storybook 10**?

### How we use Ladle today (measured)
- `@ladle/react@5.0.3`, single devDep, reuses our Vite 6 + SWC + `@tailwindcss/vite`. Node >=22.
- 83 `*.stories.mdx` co-located in `src/` -> 437 story entries (354 component stories + 83 readme pages).
- Authoring = bare named exports returning JSX + custom `{/* AI_DOCUMENTATION */}` + README prose blocks.
  No CSF `meta`, no args/controls, no actions, no decorators, no play/interaction tests, no a11y, no MSW.
- Theme switch = custom `.ladle/components.tsx` `GlobalProvider` (`data-theme` via `ThemeProvider`), now
  persisted to `localStorage` so it survives story navigation.
- CI `deploy.yml` builds static (`ladle build --base=/<repo>/`) -> GitHub Pages.
- No test framework present. Root `test` = `turbo run test`; DS package has no `test` task -> CI test job is a
  green no-op today.

Net: Ladle is a **living visual reference + theme preview**. None of the "workshop"
interactivity (controls, testing) is in use.

### Storybook 10 (latest: 10.2.9 stable, 10.4 alpha)
- ESM-only; install size −50% (SB9) then −29% (SB10). Still much heavier than Ladle. Node 20.19+/22.12+.
- Vite builder (`@storybook/react-vite`), TW v4 + React 19 supported.
- CSF authoring (`default` meta export + named stories with `args`/`argTypes`); MDX docs via `@storybook/blocks`.
- Differentiators vs Ladle-as-we-use-it:
  1. Vitest addon — stories become real-browser component tests (Playwright), portable stories, `composeStories`.
  2. `@storybook/addon-a11y` — axe, can fail CI on violations (`a11y: { test: 'error' }`).
  3. Interactive controls panel from args.
  4. Autodocs — prop tables from TS types.
  5. `addon-themes` `withThemeByDataAttribute({ attributeName: 'data-theme' })` — native toolbar, persists in URL globals.
  6. Ecosystem: Chromatic visual regression, Figma `addon-designs`, pseudo-states.

## Options considered

1. **Stay on Ladle** (chosen). Right-sized for current usage; fast; ~zero config; one dep.
2. **Migrate to Storybook 10.** Unlocks controls + testing + autodocs + ecosystem, but:
   - Rewrite all 83 `.stories.mdx` -> CSF `.stories.tsx` (+ MDX docs). Our named-export + AI-doc format is not drop-in. 354 stories. Mechanical but large.
   - Heavier install, slower dev loop, more config/maintenance.
   - New `.storybook/`, CI swap, theme-switcher port to `addon-themes`.
3. **Cheaper middle path.** Stay on Ladle; add the missing-capability value piecemeal:
   - axe a11y + Playwright basic tests against the Ladle build (most testing value, no rewrite). [separate plan]
   - Adopt Ladle's own args/controls on key components for interactivity.

## Decision

**Keep Ladle. Defer Storybook 10.** For a fast, themeable visual catalog, Storybook's
weight buys nothing we currently use. Pursue the cheaper middle path (option 3) to close
the real gap — automated a11y/visual testing — without a migration.

## Consequences

- Positive: no migration cost; dev loop stays fast; dependency surface stays tiny; CI unchanged.
- Negative: we forgo Storybook's controls/autodocs/Chromatic ecosystem and the deepest testing
  integration. a11y/visual testing must be wired up ourselves (planned separately).
- Neutral: theme persistence handled by our own localStorage fix rather than `addon-themes` globals.

## Revisit triggers (switch to Storybook 10 if any become true)

- DS commits to **interactive controls** as a first-class, ongoing authoring practice.
- DS wants **Storybook-native component + a11y + visual-regression testing** (Vitest addon / Chromatic)
  rather than the standalone Playwright approach.
- Demand for **autodocs** prop tables / **Figma** design parity / large addon ecosystem.
- The standalone testing path (separate plan) proves insufficient or high-maintenance.

## Evidence
- Ladle facts: repo scan 2026-06-15 (`.ladle/`, `package.json`, `.github/workflows/`).
- Storybook 10: storybook.js.org/blog/storybook-10, migration-guide (Node 20.19+/22.12+, ESM-only),
  `@storybook/addon-themes` `withThemeByDataAttribute`, addon-vitest docs (context7 `/storybookjs/storybook`).
- Perf: Ladle cold start ~1s locally; Ladle markedly faster start/build than Storybook (logrocket, pkgpulse 2026).

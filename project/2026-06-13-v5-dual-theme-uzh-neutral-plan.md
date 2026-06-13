# v5 Dual-Theme Design System — neutral (shadcn) + uzh (UZH CD) — Plan

caveman basic form. Full technical substance kept.

## Plan Identity

- Plan path: `project/2026-06-13-v5-dual-theme-uzh-neutral-plan.md`
- Branch: `v5` (long-lived major branch; precedent: remote `v2`)
- Target branch: `main`
- MR/PR: none yet
- Base SHA at branch: `0a78b2c`
- Older related plan: none
- Package: `@uzh-bf/design-system` (currently `4.1.6`) at `packages/design-system`

## Goal

Ship `@uzh-bf/design-system` v5 with TWO selectable themes via a CSS `data-theme` attribute:

- `neutral` — generic shadcn look, de-branded (DEFAULT on `:root`). For non-UZH / white-label apps.
- `uzh` — redesigned, UZH-CD-aligned look from the zip reference. Opt-in via `data-theme="uzh"`. What UZH apps use.

Align the ~17 components the zip reference covers to the new UZH visual spec, and make EVERY component theme-switch cleanly (purge hardcoded `uzh-*`).

## Non-Goals

- NOT rewriting components to the zip's inline-style / no-Radix pattern. Zip = visual spec only. Keep Radix + shadcn + cva + Tailwind v4.
- NOT building net-new app-shell / composite components from `ui_kits/` (filter rail, proposal card, app shells, GBL game cards). Deferred to v5.x.
- NOT touching Preact `header-custom-element` / `tag-custom-element` packages. Frozen / out of scope.
- NOT renaming `--color-uzh-*` palette vars (would break `bg-uzh-*` utilities downstream).
- NOT shipping official UZH logo assets (zip logos are typographic recreations; logo lockup is an app/header concern, not this package).

## Decisions (resolved with user)

- D1 Default theme = `neutral`. `:root` = generic shadcn. The 3 UZH apps MUST add `data-theme="uzh"` on upgrade. This is the single biggest downstream migration action.
- D2 Architecture = keep Radix/shadcn/cva. Port only visual deltas (variants, sizes, radius, focus rings, underline tabs) onto existing components.
- D3 Scope = theming foundation + align ~17 ref components + purge hardcoded `uzh-*`. New composites deferred.
- D4 Fonts = DS `tailwind.css` adds Google Fonts `@import` for Source Sans 3 + JetBrains Mono.

## Assumptions (low-risk, reversible; flagged)

- A1 Alert default icon per variant via `lucide-react` (already a peer dep), overridable / removable by consumer. Ref uses a single info-circle for all; we use per-variant icons. Reversible.
- A2 Adopt `_adherence.oxlintrc.json` as INTERNAL DS dev lint (catch raw hex/px regressions during slices). Not forced on consumers. Optional; Slice 6.
- A3 Apps upgrade independently. Because default = neutral, each UZH app adds `data-theme="uzh"` when it adopts v5. No coordinated big-bang.
- A4 Corporate accent palette (`--color-uzh-*`, 7 hues × 5 steps) stays globally available in BOTH themes for explicit/chart use. Only the PRIMARY/SECONDARY semantic mapping switches per theme.
- A5 Status semantics (success/warning/info/error) get their own tokens; in `neutral` they map to generic green/amber/blue/red, in `uzh` they map to UZH accent hues (lightgreen/yellow/turqoise/red).

## Evidence (from exploration; see workflow run wf_35213f1b-d1b)

- E-arch: React 19 + Vite 6 + Tailwind v4 (`@theme inline` in `packages/design-system/src/tailwind.css`, 388 lines). shadcn + Radix + cva + tailwind-merge. Ladle stories (`.ladle/`, MDX co-located). Entry points `.`/`./ui`/`./forms`.
- E-tokens-now: `--theme-color-primary*` = UZH blue `#0028a5`; `--theme-color-secondary*` = UZH red `#dc6027`. `--color-primary-*` → `var(--theme-color-primary*)`. shadcn `--primary` = `oklch(0.205 0 0)` near-black (declared in BOTH `@theme inline` and `:root`; `.dark` overrides). `--radius: 0.5rem` (8px) — matches ref. `--radius-md` (6px, buttons), `--radius-xl` (12px, cards) already exist. `--shadow-*` NOT defined yet. `--font-sans` leads with undefined `var(--theme-font-primary), var(--source-sans-pro)` then Source Sans 3.
- E-blockers: ~35 hardcoded `uzh-*` utility refs across ~7 component files block clean theme switch: `UserNotification.tsx` (high — switch color map), `Workflow.tsx` (med — default twStyles), `Switch.tsx`, `StepProgress.tsx`, `ColorPicker.tsx`, `Checkbox.tsx`, `Select.tsx` (low each).
- E-ref-tokens: zip `colors_and_type.css` = token source of truth. Compact heading scale h1=24px/700, h2=20px/700, h3=18px/700, h4=17px/700. Radius button 6px / card 12px. Card = border + shadow-sm. `--shadow-xs/sm/md/lg` defined. Source Sans 3 + JetBrains Mono via Google Fonts.
- E-ref-components: zip components are inline-style mocks (React 18 CDN + babel/standalone). Variant deltas vs current shadcn: Badge +success/warning/info/error; Alert variant set neutral/info/success/warning/error + left-4px border + icon; Input/Textarea `invalid` prop + managed focus ring (blue focus, orange invalid); Tabs underline (active 2px primary border-bottom) vs current filled; Table `hoverable` row + uppercase header; Avatar sm/md/lg = 28/40/56.
- E-divergence-from-synthesis: keep `--color-uzh-*` naming (NOT ref `--uzh-*`); skip importing `--space-*`/`--text-*` wholesale (Tailwind provides). Add only consumed tokens.

## Theming Mechanism (recommended, chosen)

`data-theme` attribute + CSS-var cascade. No JS, no per-component API change, opt-in per app, both themes can coexist on one page.

- `:root` keeps the DEFAULT (neutral) token values so Tailwind v4 `@theme inline` generates utilities (`bg-primary-100`, `text-primary-foreground`, `bg-secondary-*`, `border-border`, …) bound to CSS vars.
- New `packages/design-system/src/themes.css` (imported by `tailwind.css`) declares:
  - `[data-theme="neutral"] { … }` — explicit copy of neutral defaults (for nested override / clarity).
  - `[data-theme="uzh"] { … }` — re-declares ONLY the vars that differ: `--theme-color-primary*` + `--color-primary-*` → UZH blue; `--color-secondary-*` → UZH red; `--primary`/`--secondary` (shadcn) bridged to UZH oklch; `--font-sans` → Source Sans 3 first; status tokens → UZH accents; (radius/shadow already shared).
- Runtime cascade: a `<div data-theme="uzh">` ancestor re-declares the custom props; `var()` chains resolve to the nearest ancestor. Zero build cost.
- `.dark` keeps working orthogonally (dark is a separate axis from neutral/uzh).

Rejected: tailwind preset swap (can't do both themes on one page, per-app rebuild). cva `theme` prop on every component (breaking API on all consumers, huge churn).

## Token Plan (Slice 0 detail)

In `tailwind.css` `@theme inline` + `:root` (neutral defaults) and `themes.css` (`[data-theme="uzh"]`):

- Primary/secondary indirection: move UZH-blue assignment of `--theme-color-primary*` and UZH-red `--theme-color-secondary*` OUT of neutral default and INTO `[data-theme="uzh"]`. Neutral default `--color-primary-*` = neutral/zinc ramp (shadcn-like dark→light); neutral `--color-secondary-*` = muted grey ramp.
- Bridge shadcn `--primary`/`--secondary` to match: neutral = current shadcn oklch defaults (unchanged); uzh = UZH-blue / UZH-red oklch equivalents.
- Font: simplify `--font-sans` (drop undefined `--theme-font-primary`/`--source-sans-pro` leads). neutral `--font-sans` = `ui-sans-serif, system-ui, …`; uzh `--font-sans` = `'Source Sans 3', …`. Add `@import` Google Fonts (D4) at top of `tailwind.css`. Define `--font-mono` directly (drop undefined `--mono-space-font` lead).
- Shadows: add `--shadow-xs/sm/md/lg` (+ `--color`-less, used via arbitrary `shadow-[var(--shadow-sm)]` on Card) — same in both themes.
- Status tokens (A5): add `--color-success-*`, `--color-warning-*`, `--color-info-*` (+ reuse `--destructive` for error). neutral → generic green/amber/blue; uzh → `--color-uzh-lightgreen/yellow/turqoise`. Consumed by Alert/Badge/UserNotification.
- `--color-uzh-*` palette: unchanged, present in both themes.
- Radius: no change (`--radius` 8px, `--radius-md` 6px buttons, `--radius-xl` 12px cards already correct).

## Slices (tracer bullets)

Dep graph: `S0 → S1 → {S2, S3, S4} → S5 → S6`. S2/S3/S4 parallelizable after S1.

### Slice 0 — Token foundation + data-theme switch + Ladle toggle + Button pilot
- Do: add `themes.css`; restructure `tailwind.css` (neutral default on `:root`, uzh block, status+shadow tokens, font `@import`, font-sans simplification). Ladle `.ladle/components.tsx`: import `themes.css` + add neutral/uzh toggle on story wrapper. Verify Button renders both themes (no `uzh-*` in Button — confirm it routes through `bg-primary-100`/`text-primary-foreground`).
- Check: Ladle Button story toggles neutral↔uzh, colors switch; `tsc` clean; no regression in other stories. Screenshot both.
- Commit: `feat(theme)!: add data-theme token layer with neutral default + uzh theme`
- Files: `src/tailwind.css`, `src/themes.css` (new), `.ladle/components.tsx`.

### Slice 1 — Purge hardcoded uzh-* so all components theme-switch
- Do: route the 7 blocker components through semantic tokens. `UserNotification.tsx` switch map → status tokens (A5). `Workflow.tsx` default `twStyles` → `primary-*`. `Switch.tsx` disabled, `StepProgress.tsx` error, `ColorPicker.tsx` border, `Checkbox.tsx`, `Select.tsx` → `primary-*`/`destructive`/status. Grep-confirm zero remaining `uzh-blue-*` (and other `uzh-*` that should theme) in component TSX.
- Check: Ladle stories for all 7 in both themes; spot-check disabled Switch, error StepProgress, each UserNotification type; neutral shows NO UZH blue leak. `tsc` clean.
- Commit: `refactor(theme): route hardcoded uzh-* through semantic tokens`

### Slice 2 — Alert + Badge variant expansion
- Do: `ui/alert.tsx` cva +`neutral|info|success|warning|error`, left-4px border, default per-variant lucide icon (A1, overridable). `ui/badge.tsx` +`success|warning|info|error`. Wrappers `Alert.tsx`/`Badge.tsx` pass-through + types. Stories.
- Check: Ladle Alert 5 variants, Badge 8 variants, both themes. `tsc`.
- Commit: `feat(alert,badge): add semantic status variants aligned to UZH spec`

### Slice 3 — Input + Textarea invalid prop + focus ring
- Do: `ui/input.tsx`+`ui/textarea.tsx` add `invalid?: boolean`; focus ring `ring-[var(--color-primary-100)]/20`, invalid ring `ring-[var(--destructive)]`. Wrappers pass `invalid`. Wire `FormikTextField`/`FormikTextareaField` validation→`invalid`.
- Check: Ladle controlled invalid toggle both themes; Formik wrapper shows error ring on Yup fail. `tsc`.
- Commit: `feat(input,textarea): add invalid prop and themed focus rings`

### Slice 4 — Visual refinement batch (low-effort components)
- Do: Avatar sizes 28/40/56 + fallback bg/text via tokens; Checkbox checked = `bg-primary-100`; Progress track 8px/fill `primary-100`/radius 4; Select focus ring; Separator `border`; Skeleton shimmer align; Switch thumb/disabled; Table `hoverable` row prop + header uppercase 12px `tracking-[0.06em]` `bg-muted`; Label 13px/600.
- Check: Ladle stories each, both themes; Table hoverable rows. `tsc`.
- Commit: `feat(components): align avatar/table/progress/etc visuals to UZH spec`

### Slice 5 — Tabs underline + Card border/shadow + heading scale
- Do: `ui/tabs.tsx` underline pattern (active trigger `border-b-2 border-[var(--color-primary-100)]`, drop filled list bg). `ui/card.tsx` `border` + `shadow-[var(--shadow-sm)]`, padding header 20/24/8, content 12/24/20, footer 14/24, footer `bg-muted`. `src/Header.tsx` H1–H4 → 24/20/18/17px all 700 (h4 17px via `--text-md` or arbitrary).
- Check: Ladle Tabs/Card/H1–H4 both themes; devtools verify padding/sizes. `tsc`.
- Commit: `feat(tabs,card,header): underline tabs, card border+shadow, compact heading scale`

### Slice 6 — ThemeProvider + Ladle-wide toggle + docs + dev-lint + security
- Do: `src/ThemeProvider.tsx` (`<div data-theme>` + `useTheme`), export from `index.ts`. Ladle: all stories run under ThemeProvider + global toggle. `README`/`MIGRATION.md`: data-theme opt-in; **UZH apps add `data-theme="uzh"`** (D1). Add `_adherence` oxlint config as internal dev script (A2). Final security review subagent (`$security-review`).
- Check: full Ladle suite toggles on every component; ThemeProvider sample page switches cleanly; `tsc`; lint passes; security review clean. Screenshots for MR (before/after, both themes).
- Commit: `feat(theme): add ThemeProvider, migration docs, adherence dev-lint`

## Verification per slice

Fastest first: `tsc` (typecheck) → Ladle visual in BOTH themes → screenshot. Broaden (full story sweep) at S6. Apply `$verification-before-completion` before each commit. Per-slice review subagent + simplification subagent (caveman, severity-tagged) before commit.

## MR/PR evidence (expected at finish)

- Before/after screenshots: Button, Alert, Badge, Card, Tabs, Table, Input in BOTH neutral + uzh.
- Migration section: the `data-theme="uzh"` requirement for UZH apps (D1), new exports (`ThemeProvider`, `useTheme`), new component props (`invalid`, Table `hoverable`, new Alert/Badge variants).
- `$df-mr-description-writer` for body; full-branch coverage vs `main`.

## Goal-prompt requirements (if handed off)

Reference this plan path. Work one slice at a time. Update `Progress` each slice. Verify → review subagent → simplification subagent → clean conventional commit per slice. Final security review before finalize. `$df-mr-description-writer` for MR. End with `Next Steps`.

## Progress

- [x] Setup: zip extracted to `uzh-design-reference/`; zip + extract gitignored (verified). Branch `v5` created off `main`@`0a78b2c`. Exploration workflow done. 4 forks resolved with user.
- [x] Plan committed; user approved full slice-by-slice execution + MR + demo deploy.
- [x] S0 Token foundation + Button pilot. Added `src/themes.css` (`:root,[data-theme=neutral]` neutral defaults + `[data-theme=uzh]` UZH overrides), routed fonts/primary/secondary/status through `--theme-*` indirection in `tailwind.css`, Google Fonts @import, Ladle neutral/uzh+dark switcher. Verified: tsc clean; `ladle build` ok; compiled CSS asserts `.bg-primary-100{background:var(--theme-color-primary)}`, neutral=`oklch(20.5% 0 0)`, uzh=`var(--color-uzh-blue-100)`; neutral font=system, uzh=Source Sans 3. Review+simplify: added font `var(...,fallback)` for robustness, pinned Ladle toolbar text colour. Deferred to S6 migration docs: `--theme-font-primary`/`--source-sans-pro` injection points removed (v5 break); shadcn `--secondary` stays neutral in uzh (matches v4; UZH red via `bg-secondary-100`).
- [x] S1 uzh-* purge. Routed all hardcoded `uzh-*` in 11 component files to semantic tokens (brand blue/red → primary/secondary/destructive/status; greys → muted/input/border/muted-foreground). Files: UserNotification, StepProgress, Workflow, Switch, Table, Checkbox, Collapsible, Select, ColorPicker, forms/NumberField, forms/TextField. Fixed 2 pre-existing bugs: StepProgress `hover:destructive!`→`hover:bg-destructive!`; ColorPicker dead `focus:border-uzh-blue-50`→`focus:border-primary-100`. Review caught contrast: darkened neutral `--theme-success/-info` mains (oklch 0.5) for readable colored-text-on-tint; aligned Workflow progress-gradient unfilled track to `var(--color-muted)`. Verified: grep zero `uzh-*` leaks; tsc; build; CSS asserts ring/border/bg `primary-100`+`secondary-100` resolve to theme vars, status mains darkened.
- [x] S2 Alert + Badge. Alert: added neutral/info/success/warning/error (tinted bg + 4px coloured left border + variant-coloured consumer icon); kept default/destructive as legacy surfaces. Badge: added success/warning/info/error solid variants; `error` dedup'd to shared `destructiveBadge` const. Updated Alert + Badge stories (Variants showcase, Status row) + docs. Review fixes: kept warning icon `text-warning-foreground` for visibility on light tint (commented), removed redundant `[&>svg]:text-destructive`. Verified tsc/build/format; CSS has bg-/border-l-/-background status utils.
- [ ] S3 Input + Textarea invalid
- [ ] S4 Refinement batch
- [ ] S5 Tabs + Card + headings
- [ ] S6 ThemeProvider + docs + dev-lint + security
- Current slice: S3 next.
- Next action: Input + Textarea `invalid` prop + themed focus/invalid rings; wire Formik wrappers.

### Verification approach note
Per-slice: `tsc` + `ladle build` + targeted compiled-CSS/grep assertions. Live visual both-theme screenshots consolidated at finish for MR evidence (browser set up once across all components) rather than per slice.

## Next Steps (running)

- Dark-mode for status tokens: `.dark` overrides only core shadcn vars, not the new `--theme-*`/status tokens, so status alerts/badges keep light tints on a dark page. Dark is an orthogonal axis; out of v5 scope. Follow-up: add `.dark` overrides (or `[data-theme=uzh].dark`) for status + theme tokens.
- Confirm neutral palette choice (zinc vs slate ramp) at S0 start — low-stakes, pick zinc to match shadcn default.
- After v5 publish: open follow-up for v5.x composites (filter rail, proposal card, app shells) and Preact package theming if still needed.

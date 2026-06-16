# DS v5 — Structural Baseline Alignment Plan

Plan path: `project/2026-06-16-pr-179-structural-baseline-alignment-plan.md`
Branch: `v5` · Target: `main` · PR: #179
Related history: `project/2026-06-15-v5-design-reference-conformance-audit.md` (full 9-agent audit), `project/2026-06-15-ds-v5-composite-components-plan.md` (composite-components branch work this folds into).

## Goal

Align the DS v5 `neutral` + `uzh` themes to the structural baseline in the AI design reference (`uzh-design-reference/`), **full pixel-match** of every existing component's shapes (sizes/heights/radius/padding/gaps/font-size/weight/line-height/icon-size/missing structural variants). Structure is shared across both themes, so each fix aligns neutral AND uzh at once. Folded into the existing `v5` branch / PR #179.

## Non-goals (explicit OUT)

- **Color (GATED).** No brand-hue token changes. The reference is an AI reconstruction (not official UZH CD) and contradicts itself on hues. Destructive (orange `#FC4C02` vs red `#dc2626`), secondary (berry `#BF0D3E` vs red `#dc6027`), status hues, primary mid-ladder (chromatic vs mechanical fade), badge-default hue — all need a **design-owner decision against official UZH CD** before any change. Listed at the end as a follow-up phase.
- **Composite / template layer.** App shell, masthead, primary nav, hero, page header, filter rail, footer, stat/announcement page templates — new components, not structural alignment. Separate effort (see composite-components plan).

## Decisions (user-confirmed)

- **D1 Button heights:** add fixed `sm/md/lg = 32/40/48px` ladder as default, BUT preserve multi-line/auto-height behavior behind the existing `fluid` prop (no wrap-dependent consumer breaks).
- **D3 duplicate-impl:** preserve the richer DF wrapper APIs (Slider color-maps/labels, Checkbox sizes, Table sorting), only unify the structural tokens they render. No consumer API breakage.

## Caveats (carry into PR body)

- **Visually breaking.** Heights/gaps/weights shift for every consumer. Acceptable for `5.0.0-alpha.x`; flag as breaking visual change in PR.
- **Reference = AI reconstruction.** Structural px lower-risk than color, but surprising choices (e.g. Button fixed-height vs current `h-max` wrap) verified per-slice; color stays gated.

## Refreshed gap map (current HEAD `c056256`)

Re-audited vs reference; most 06-15 gaps already closed (Input/Textarea/DatePicker 40px, Switch/Toggle/Sidebar/Command active states, Accordion group border, Tooltip dark+arrow, Spinner ring, Modal scrim, Pagination fill, Calendar today/selected, Card radius+title, radius scale `rounded-md`=6px). Radius-scale gaps from cluster-A are false positives (`--radius-md`=6px confirmed, tailwind.css:142-145). Real OPEN structural gaps below, sliced.

## Slices

### D0 — Foundation + plan commit
- Commit this plan alone.
- Heading line-heights: h1 → 1.2, h2 → 1.25 (h3/h4 already match).
- Card shadow tier: `shadow-sm` → `shadow` (ref layered 0.06).
- Verify: build + Ladle visual.
- Commit: `fix(ds): align heading line-heights + card shadow tier to reference`

### D1 — Control-height ladder (highest leverage)
- Button: fixed `sm/md/lg = 32/40/48px` + per-size font 14/15/16 + nowrap as DEFAULT; keep auto-height/wrap behind `fluid` prop.
- Cascades: verify Combobox, MultiSelect, Select trigger all reach 40px.
- Verify: Ladle Button/Select/Combobox/MultiSelect, both themes; confirm `fluid` still wraps.
- Commit: `fix(ds): button fixed-height size ladder (fluid opt-out) + trigger heights`

### D2 — Form density
- Field intra-gap 12→6, FieldGroup inter-gap 28→16, FormItem 8→6.
- FieldError/Description 14→12px (weight 500). `ui/label` 14/500→13/600 (FormLabel already ok). RadioGroup gap 12→8.
- Verify: form stories + axe (both themes).
- Commit: `fix(ds): tighten form density to reference (gaps + label/error sizes)`

### D3 — Duplicate-impl consolidation (preserve APIs) — RE-SLICED
- **Done:** Checkbox (DF Checkbox.tsx bypasses ui/checkbox → two impls; aligned BOTH to reference 18px / r4 / border-1.5 / check-12px; DF size ladder API kept).
- **Slider → DEFERRED:** no reference Slider component exists (`uzh-design-reference/components/Slider.jsx` absent), so there is no authoritative px target. Not inventing one. DF Slider (48px thumb) left as-is; revisit only if a reference spec appears or design-owner specifies.
- **Table → moved to D4:** its dedup (src/Table.tsx vs ui/table.tsx) is the same work as the D4 Table structural match — done once, holistically, in D4.
- **Tabs → moved to D6:** dropping the DF grid-forcing is a layout-policy/styling change (DF Tabs renders through ui/tabs — single impl, not a dedup), batched with the other shape changes in D6; ui/tabs strip also needs reference tuning (gap 16→28, trigger pad 12/0, active 600).

### D4 — Surfaces & data
- Alert: icon 16→20, title 500→600, optional dismiss, py 12→14.
- Card: footer default border-top + `#FAFAFA` + justify-end, header/body padding 20/24/8 + 12/24/20, announcement + stat variants.
- Table: header uppercase/12px/600/`#FAFAFA`, outer container border+radius, td padding 8→14×16, drop `odd:` stripe, footer pagination slot.
- Verify: Ladle + axe.
- Commit: `feat(ds): surface + table structural variants to reference`

### D5 — Inputs advanced
- NumberField: −/+ stepper, center, mono, 40px. PinField: cells 36→44×52, font 16→20/700. Calendar: nav bordered-square, cell-size 32→40, title weight.
- Verify: form stories + keyboard a11y.
- Commit: `fix(ds): number/pin field + calendar structural match`

### D6 — Component shapes batch
- Tag (active/removable-×/dashed), Separator (labeled "or", vertical fixed 24px), Kbd (font-sans→mono +1px border), Skeleton (pulse→shimmer 1.6s, radius 6→4), Carousel (arrows inside + dots), Countdown (mono 28/700 + urgent threshold), CycleProgress (md 48→72, stroke, center mono/bold), Chart (drop forced aspect-video default), Workflow (fix active hover:text-black contrast + step 13/600), Progress track grey.
- Verify: Ladle both themes.
- Commit: `fix(ds): component-shape pixel-match batch (tag/separator/kbd/skeleton/...)`

### D7 — Overlay/nav polish batch
- Menu surfaces radius 6→8 + kbd-pill shortcuts + item radius (Context/Dropdown/Command), Dropdown/Navigation item font 16→14, Tooltip padding, Breadcrumb (sep `/`, current weight 500), Pagination glyphs, Sidebar (256→220, badge→dot, item radius), AlertDialog (title 18→16/700, footer tint), Popover/HoverCard/Modal sizes+padding, Accordion (chevron, content pb 16→14), Avatar fallback px.
- Verify: Ladle + axe.
- Commit: `fix(ds): overlay + nav polish batch to reference`

### Final
- Full Playwright (smoke + a11y both themes, 0 new serious/critical).
- `$security-review` (low — structural CSS only).
- neutral-vs-uzh gallery sweep (visual regression both themes).
- `types/` regen.
- PR #179 update via `$df-mr-description-writer` (whole-branch; flag breaking visual change + gated color phase).
- `Next Steps` (gated color phase as follow-up needing design-owner answers).

## Gated color phase (follow-up, NOT in slices)
Needs design-owner answers vs official UZH CD: destructive hue, secondary hue, status hues (success/warning/info), primary mid-ladder, badge default hue.

## Progress

- Plan committed `d9b7221`. Decisions (D1 fluid, D3 preserve-APIs) confirmed by user.
- **D0 done** `a0c63d0`: Prose h1/h2/h3 line-heights 1.2/1.25/1.3 (h4 already 1.35 via text-md); `--shadow-card` token (0.06 alpha) + Card uses it. Verified Ladle: card box-shadow exact reference, h1 ratio 1.200.
- **D1 done** `c4980e7`: ui/button.tsx fixed-height ladder (sm/md/lg 32/40/48, font 14/15/16, px 12/16/20, nowrap, icon 40); Button.tsx size prop + dropped padding hack + fluid keeps wrap/auto-height (min-h-10). Verified Ladle: md 40/15/500/16/r6, filled==outline, fluid wraps, Select trigger 40px, icon spacing single 8px. tsc -b clean. Reviewer findings handled (dropped sm gap-1.5 to avoid double-spacing; icon 40 intentional, verify pagination/calendar in D5/D7).
- **D2 done** `3a91f68`: ui/label 13/600, Field gap 6, FieldGroup gap 16, FieldDescription 12, FieldError 12/500, FormItem gap 6, RadioGroup gap 8. Verified Ladle exact. tsc clean. (Choice-label 14/400 nuance deferred.)
- **D3 done** `61ca4ce` (RE-SLICED, see above): Checkbox 18px both impls. Slider deferred (no ref). Table→D4, Tabs→D6. Verified Ladle 18/18/r4/1.5. tsc clean.
- **D4 done** `5c3354e`: Card per-section padding (header 20/24/8, content 12/24/20, footer 14/24 + border-top + muted + justify-end, overflow-hidden, title lh1.3, desc 13); Alert (icon 20, py14, title 600, desc 13; no dismiss — not in ref); Table both impls consolidated (bordered r6 container, uppercase 12/600 #FAFAFA header + 0.06em, td 13×16, hover not zebra). Verified Ladle exact. Reviewer fix: conditional caption. tsc clean. (announcement/stat card variants = composite layer, OUT.)
- **D5 done** `baed41e`: PinField 44×52/20/700 (ui/input-otp + removed per-field h-9 shrink in both pin variants); NumberField 40px; +key fix. Verified Ladle exact. tsc clean. NumberField steppers/mono = new feature, NOT added (DF NumberField is a text-input-with-unit, not a stepper). Calendar moved to D7.
- **Next: D6** component-shape batch (+ Tabs from D3 re-slice).

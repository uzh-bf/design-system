# DS v5 ↔ UZH Design Reference — Component Conformance Audit

- Date: 2026-06-15
- Branch: `v5` · Target: `main` · Related PR: [#179](https://github.com/uzh-bf/design-system/pull/179) (dual-theme uzh/neutral)
- Reference source: `uzh-design-reference/` (gitignored on-disk extract of `UZH DF Design System.zip`, 15 Jun). AI reconstruction of the DS — static `preview/*.html` spec pages, 16 atomic `components/*.jsx` mocks, 4 `ui_kits/` app screens, `colors_and_type.css`, `README.md`. **No Figma; reference is itself a reconstruction and contains internal inconsistencies (flagged below).**
- DS source: `packages/design-system/src/` (`<Name>.tsx` wrappers, `ui/<name>.tsx` shadcn primitives, `forms/`, tokens `tailwind.css` + `themes.css`).
- Method: 9 parallel review agents, one per reference category, each diffed design variants vs DS code (file:line + exact tokens). This doc compiles + de-dupes their findings.

> **Caveat on authority.** Reference is a reconstruction, not the official UZH Corporate Design. Where reference and DS disagree on a brand value (esp. secondary/destructive hue), confirm against the *official UZH CD* before changing DS — do not treat this reference as ground truth.

---

## TL;DR verdict

- **Atomic coverage: complete.** DS ships every atomic the reference shows, plus ~50 more (~80 total vs ref ~16–29). No missing atoms (PIN field, NumberField, etc. all present).
- **Design fidelity: diverges widely.** Most shared components render plainer than the reference. The gap is concentrated in a handful of *systemic* token/state issues that recur across dozens of components (below), plus per-component sizing/radius drift.
- **Composite/template layer: missing entirely.** App shell, masthead, primary navbar, hero, page header, filter rail, footer, card variants (announcement/stat), metadata panel — only exist in the reference `ui_kits/`. This is the bulk of "many more components."
- Net: the work is mostly **(a) fix ~5 systemic token/ladder/state issues** (fixes cascade to many components at once), **(b) per-component size/radius/weight tightening**, **(c) build the composite layer**.

Severity tally (component-level, de-duped): **High ≈ 60+, Med ≈ 70+, Low ≈ 40+.** Most Highs collapse into the 5 systemic root causes.

---

## Systemic root causes (fix these first — each cascades to many components)

### S-1 · Status + destructive hues not bridged to UZH palette  `[High, pervasive]`
`--destructive` and `--notification` resolve to generic shadcn red `oklch(0.5771 0.2152 27.33)` ≈ `#dc2626` in **both** themes — never remapped under `[data-theme='uzh']`. Status tokens drift too.

| token | DS (uzh) | reference (`colors-semantic.html`) |
|---|---|---|
| destructive | `#dc2626` | `#FC4C02` (UZH Orange) |
| notification | `#dc2626` | `#BF0D3E` (UZH Berry) |
| success | `#2a7f62` (uzh-darkgreen) | `#7CA023` (Apple 4) |
| warning | `#fede00` (uzh-yellow) | `#FFC845` (UZH Gold) |
| info | `#0b82a0` (uzh-turquoise) | `#1EA7C4` (Cyan 4) |

Hits: Button.destructive, Badge, Alert (error/success/warning/info), Input/Textarea/Select invalid rings, Field/Form error text, Toast, UserNotification, ContextMenu/Dropdown destructive, Avatar badge, NotificationBadgeWrapper, Sidebar dot. `src/themes.css` (status block), `src/tailwind.css:116-119`.
**Confirm hue intent first** (esp. destructive orange vs red, secondary berry vs red — see S-5).

### S-2 · Primary ladder is a mechanical fade-to-white, not the chromatic reference ladder  `[High]`
DS `primary-80/60/40/20` = flat % tints of `#0028a5` toward white (`#3353b7 / #667ec9 / #99a9db / #ccd4ed`). Reference defines a *chromatic* ladder (Blue 1 `#BDC9E8`, Blue 2 `#7596FF`, Blue 3 `#3062FF`, Blue 4/hover `#001E7C`, Blue 5 `#001452`) and a `--primary-hover` token with no DS counterpart. Consequence: components that use mid-ladder steps render the wrong blue. `src/tailwind.css:46-50`, `src/themes.css:71-76`.

### S-3 · Components reach for mid-ladder / neutral instead of full primary  `[High]`
Several components hardcode a tint or a neutral `accent` where the design wants **full `primary-100`** or **`primary-20` blue tint**:
- Workflow active = `bg-primary-80` (#3353b7) → should be `primary-100` (#0028A5). `Workflow.tsx:85`.
- Switch on = `bg-primary-60` (#667ec9) → should be `primary-100`. `Switch.tsx:131`.
- Progress fill = `bg-primary-60` → should be `primary-100`. `Progress.tsx`.
- Toggle / ToggleGroup on = `bg-accent`/`text-accent-foreground` (grey) → should be `bg-primary-20 text-primary-100`. `ui/toggle.tsx:10`.
- Command selected = `bg-accent` → should be `primary-20` + `primary-100` text. `ui/command.tsx`.
- Sidebar active = `--sidebar-accent` (grey) → should be `primary-20`/`primary-100` (not overridden in uzh theme). `ui/sidebar.tsx:477`.
- Pagination active = `variant=outline` (white) → should be `primary-100` fill. `ui/pagination.tsx`.
- Tabs active **text** = `text-foreground` (near-black) → should be `primary-100` (underline already correct via `border-b-primary-100`). `ui/tabs.tsx:45`.
- Breadcrumb link hover = `text-foreground` → should be `primary-100`. `ui/breadcrumb.tsx`.

### S-4 · Radius + control-height drift  `[Med→High]`
- Inputs / Select / DatePicker triggers: DS `h-9` (36px) vs design **40px**. (TextField, Textarea min-h 64 vs 80, Select, DatePicker, DatetimePicker.)
- Radius: design uses **6px** (`--radius-md`) for most controls; DS uses `rounded-lg`/`--radius`=8px on Alert, Popover, HoverCard, dialogs; **Card uses `rounded-xl`=12px vs design 6px**. Calendar/ScrollArea/Resizable containers 8px ≈ ok.
- Body font on controls: DS `text-base` (16px) vs design **14px** on inputs/labels.

### S-5 · Reference internal inconsistency: secondary = Berry vs Red  `[verify, not a bug yet]`
`colors-secondary.html` shows secondary = **UZH Berry `#BF0D3E`** (crimson). But the reference's own `colors_and_type.css` maps secondary → `#dc6027` (UZH warm red/orange) — which is exactly what DS uses (`--color-uzh-red-100: #dc6027`). So DS matches one half of the reference and not the other. **Action: resolve against official UZH CD.** Same applies to notification (`#BF0D3E` vs `#dc2626`).

---

## Per-component findings

Format: `Design` (reference spec) → `DS` (code, file:line) → deltas (severity). Trimmed to High/notable Med. Systemic items above are referenced as S-n rather than repeated.

### Actions

#### Button
- Sizes: design sm/md/lg = fixed h 32/40/48px. DS `ui/button.tsx:8` `h-max` + padding only — **no fixed-height size ladder** `[High]`.
- destructive hue: S-1 `[High]`. primary hover: design `#3062FF` vs DS `hover:bg-primary-100/90` `[High]`. active bg: design `#BDC9E8` vs DS `bg-primary-20` (#ccd4ed) `[Med]` (S-2).
- base radius `rounded-md`=6px ✓; base `text-base` 16px vs md 15px `[Med]`.
- DS-only: `secondary`/`link` variants, `fluid`, `loading` spinner, `Button.Icon/Label/IconGroup`.

#### ButtonGroup
- **DS-only, no design ref.** `ButtonGroup`/`ButtonGroupText`/`ButtonGroupSeparator` — cannot assess. (Reference only shows `Button.IconGroup`-style toggle, which DS also has.)

#### Badge
- default variant: design preview = near-black `#252525`; DS `bg-primary` → **blue in uzh theme**. Reference `Badge.jsx` mock says blue, preview says black → **inconsistent; confirm intent** `[High]`.
- **Count/pill variant** (20px pill, mono) — no DS equivalent `[High]`. Base radius/padding/size ✓ (`rounded-md px-2 py-0.5 text-xs`).
- DS-only: `success/warning/info/error` semantic variants.

#### Alert
- radius `rounded-lg`=8px vs 6px `[High, S-4]`; icon `size-4`=16px vs 20px `[High]`; py-3=12px vs 14px `[Med]`.
- **neutral left border = `border-l-border` (grey) → design wants `#0028A5` blue** `[High]`.
- info/success/warning/error bg+border+fg hues all off (S-1) `[High]`; success border uses uzh-darkgreen not Apple-green `[High]`.
- `AlertTitle` `font-medium`(500) vs design 600 `[High]`; `AlertDescription` forced `text-muted-foreground` (loses variant tint) `[High]`.
- **No close/dismiss button** (design neutral variant has one) `[High]`.

### Form — core

#### Input / TextField
- height `h-9`(36) vs 40 `[High, S-4]`; invalid ring + border use shadcn red not UZH orange (S-1) `[High]`.
- **Error shown as tooltip icon beside field; design shows inline error text below** (12px `#BD3902` 500) `[High]`. `forms/TextField.tsx:242`.
- focus ring `ring-ring/50` (50% blue under uzh) vs design solid 18% `rgba(0,40,165,.18)` `[Med]`; font 16px vs 14px `[Med]`.
- DS-only: icon left/right, onReset clear, Formik, label tooltip.

#### Textarea
- min-h `h-16`(64) vs 80 `[High]`; invalid hue (S-1); inline-error-vs-tooltip (same as Input) `[High]`; padding `py-2`(8) vs 10 `[Med]`.

#### Select
- Radix custom vs design native `<select>` (note, not bug); trigger `h-9`(36) vs 40 `[High]`; invalid ring not applied on trigger in `SelectField.tsx:127` `[High]`; font 16 vs 14 `[Med]`; default `w-60` vs 100% `[Med]`.

#### Checkbox
- **Two impls diverge** (`Checkbox.tsx` wrapper vs `ui/checkbox.tsx`) — sizes/radii/rings differ; no single source of truth `[High]`.
- default size: wrapper md=20px, ui=16px, design **18px** `[High]`; wrapper hardcodes `border-primary` even when unchecked (design unchecked=`#E0E0E0`) `[High]`. `Checkbox.tsx:88`.
- wrapper radius `rounded-md`(6) vs 4px; `ui` `rounded-[4px]` ✓. ring 2px+offset vs 3px.

#### RadioGroup
- Radix custom vs design native radio (note); grid `gap-3`(12) vs label gap 10 `[Med]`; unchecked border weight differs `[Med]`. focus/invalid present (DS-only vs ref).

#### Label / FormLabel
- small label (default) = `text-muted-foreground` (grey) → design `#111111` near-black `[High]`. `FormLabel.tsx:32`.
- size: `ui/label.tsx` `text-sm`(14) vs design 13px `[High]`; weight `font-bold`(700) / primitive 500 vs design 600 `[Med]`.
- DS-only: tooltip symbol, required asterisk.

#### Field / FieldGroup / FieldError
- field gap `gap-3`(12) vs design 6px `[High]`; inter-field `gap-7`(28) vs 16px `[High]`; error color `text-destructive`(#dc2626) vs `#BD3902` (S-1) `[High]`; helper/error 14px vs 12px `[Med]`, error weight `font-normal` vs 500 `[Med]`.

#### Form (RHF)
- `FormItem` `gap-2`(8) vs 6 `[Med]`; `FormMessage` inline ✓ but color #dc2626 vs #BD3902 (S-1); error turns label red (design keeps label dark) `[Med]`.

#### InputGroup
- **DS-only, no design ref.**

### Form — advanced

#### Slider
- Two impls. `Slider.tsx` range defaults `bg-gray-500` (not blue) `[High]`, thumb border `gray-300` (not blue) `[High]`, thumb 48px default vs 18 `[High]`, track `bg-gray-200` hardcoded vs `--muted` `[Med]`, `rounded-xl` vs 3px `[Med]`. `ui/slider.tsx` is closer (range `bg-primary`, thumb 16px) but no label row `[Med]`.

#### PinField (AlphaNumericPinField / FormikPinField / input-otp)
- cell `36×36` vs design **44×52** `[High]`; **fused pill layout vs design individual boxes w/ 8px gap** `[High]`; no `border-primary` on filled cells `[High]`; font 16 vs 20 `[High]`, no bold `[High]`; focus ring neutral grey not blue `[Med]`.

#### NumberField
- **No stepper −/+ buttons** (design is a stepper; DS is a plain input) `[High]`; not center-aligned `[High]`; not monospace `[High]`; h36 vs 40 `[High]`; unit = dark `bg-slate-600` badge vs plain grey text `[High]`.

#### ColorPicker
- **Entirely different model**: design = flat brand-only swatch grid (8 squares, selected outline blue); DS = full HSL gradient picker + hex input + submit `[High]`. Default `presetColors` are non-brand (5 colors) vs reference 8 brand hues `[High]`; circles vs squares `[High]`; no selected indicator `[High]`.

#### DatePicker / DatetimePicker
- trigger ~36px vs 40 `[Med]`, font 16 vs 14 `[Med]`; DatetimePicker separator `,` vs `·` `[Med]`, default granularity `second` (shows ss) vs design mm `[Med]`.

#### Calendar
- **today** = `bg-accent` grey fill → design wants **blue outline** (`1px #0028A5` + blue text, no fill) `[High]`; no container border/width/radius (design 280px card) `[High]`; nav buttons ghost vs bordered squares `[High]`; weekday labels not uppercase/bold vs design 10px uppercase 600 `[High]`; selected day color ✓ (primary) but no `font-bold` `[Med]`; cells `aspect-square` vs padded `[Med]`. `weekStartsOn` Monday only set by callers.

### Toggles / Disclosure / Tabs

#### Switch
- on-state `bg-primary-60` (#667ec9) → `primary-100` (S-3) `[High]`; primitive on=`bg-primary` only correct in uzh `[High]`; track size md 48×25.6 vs design 40×22 `[Med]`; thumb no shadow `[Med]`; off `bg-input` slightly lighter than `#C9C9C9` `[Med]`.

#### Toggle
- on bg `bg-accent` (near-white) → design `#BDC9E8` `[High]`; on text `accent-foreground` → `#0028A5` `[High]`; outline on-border doesn't go blue `[High]`; padding `px-2`(8) vs 14 `[Med]`; no weight change on press `[Med]`.

#### ToggleGroup
- **no outer container border** (design wraps group in 1px+radius+overflow-hidden) `[High]`; on-state inherits Toggle grey problem `[High]`; outline variant adds unwanted `shadow-xs` `[Med]`.

#### Accordion
- **no outer border/radius on group** (design: 1px box, overflow-hidden) `[High]`; trigger `font-medium`(500) vs 600 `[High]`; **hover = underline vs design bg `#FAFAFA`** `[High]`; trigger 16px vs 14 / `py-4`(16) vs 12 `[Med]`; content no horizontal padding `[Med]`.

#### Collapsible
- **trigger placement bottom-center vs design top-right** `[High]`; border `border-2`(2px) vs 1px `[High]`; design "partial reveal" row pattern not implemented (left to consumer) `[Med]`.

#### Tabs
- active **text** `text-foreground` vs `#0028A5` (S-3) `[High]`; **`Tabs.tsx` wrapper forces responsive grid/column layout** — incompatible with design's left-aligned horizontal strip `[High]`. `Tabs.tsx:67`. gap `gap-4`(16) vs 28 `[Med]`; inactive grey slightly off `[Med]`.
- NOTE: underline `border-b-primary-100` = full blue under uzh (inverted ladder) — **correct, do not flag**.

### Navigation

#### Header
- `Header.tsx` is only H1–H4 heading primitives. **Missing: UZH global black bar, masthead (logo+org), blue primary navbar, composite app shell** — none exist `[High×4]`. (Composite layer, see below.)

#### Navigation
- DS `Navigation` = transparent light-surface menubar; design top bar = `#0028a5` blue, white text, active `border-bottom 3px #fff`, avatar chip + role badge + sign-out `[High]`. No blue-surface variant `[High]`.

#### NavigationMenu
- **DS-only infra, no design ref** (no mega-menu in reference). Note: `bg-background` triggers break on a blue bar `[Med]`.

#### Sidebar
- active item grey (`--sidebar-accent`) → design `#BDC9E8`+`#0028A5` (S-3; uzh theme doesn't override sidebar-accent) `[High]`; badge = inline number vs design tiny colored dot `[High]`; width 256 vs 220 `[Med]`; standalone bordered-card look vs `border-r` only `[Med]`.

#### Breadcrumb
- separator = Lucide chevron icon vs design `/` or `›` `[High]`; link hover not blue (S-3) `[Med]`; current page `font-normal` vs 500 `[Med]`.

#### Pagination
- active page = outline (white) → design `#0028A5` fill (S-3) `[High]`; prev/next = icon+"Previous/Next" label vs design minimal `‹ ›` 36px `[Med]`; ellipsis icon vs `…` glyph `[Med]`.

### Overlay / Dialogs / Feedback

#### Modal / Dialog
- scrim `bg-black/70` vs design ~35% `[High]`; title `font-semibold`(600) vs 700 `[High]`; **footer: no border-top, no `#FAFAFA` tint** vs design `[High]`; footer `sm:justify-between` vs always right `[Med]`; title `text-lg`(18) vs 16 `[Med]`. `hideCloseButton` ✓.

#### AlertDialog
- raw primitives, no opinionated wrapper `[Med]`; scrim `bg-black/50` (inconsistent w/ Dialog 70%) vs ~35% `[High]`; no footer tint/border `[High]`; title weight 600 vs 700 `[Med]`.

#### Drawer / Sheet
- scrim `bg-black/50` vs design ~25% `[High]`; title `font-semibold` vs bold `[Med]`; padding 16 vs 18 `[Med]`; Sheet+Drawer on different primitives (vaul vs radix) same visual — divergence risk `[Low]`.

#### Popover / HoverCard
- radius `rounded-md`(6) vs design 8px `[High]`; width 288/256 vs 250 `[Med]`; padding `p-4`(16) vs `14×16` `[Med]`; HoverCard has no person-card avatar layout (design shows blue-tint avatar) `[Med]`.

#### Tooltip
- **bg `bg-popover` white vs design dark `#252525`** (inverted) `[High]`; **arrow commented out** vs design caret `[High]`; `Tooltip.tsx:70` adds `border-2 border-black` not in design `[High]`; font 14 vs 12 `[Med]`.

#### ContextMenu / Dropdown
- radius 6 vs 8 `[Med]`; **shortcut = plain span vs design styled kbd pill** `[Med]`; `Dropdown.tsx` forces `text-base`(16) on items vs 14 `[High]`; `Dropdown.tsx` trigger over-styled (border box) `[Med]`; destructive ✓ uses `--destructive` (but that's #dc2626, S-1).

#### Command
- selected = `bg-accent` grey → design `#BDC9E8`+`#0028A5`+600 (S-3) `[High]`; group heading `font-medium` no uppercase/letterspacing vs design 700 uppercase 0.08em `[High]`; shortcut plain vs kbd pill `[High]`; radius 6 vs 8 `[Med]`; item 14 vs 13 `[Med]`; `showCloseButton` default true (palette should be false) `[Low]`.

#### Toast
- **missing `info` variant** `[High]`; **border `border-2` uniform vs design 1px box + 4px left-accent bar** `[High]`; success `green-600`/`#7CA023` mismatch (S-1) `[Med]`; error not UZH (S-1) `[Med]`.

#### UserNotification
- info/warning/error hues off (S-1) `[High×]`; warning fg near-black vs gold `#A27200` `[High]`; padding `p-2`(8) vs `12×14` `[Med]`; gap 8 vs 10 `[Med]`; font 14 vs 13 `[Med]`. DS-only: success/default.

#### Skeleton
- color `bg-accent` (#f7f7f7) lighter than design `#EFEFEF` — low contrast `[High]`; `animate-pulse` (2s opacity) vs design shimmer (1.6s) `[Med]`; radius 6 vs 4 `[Med]`.

#### Spinner
- **Lucide `Loader2` icon vs design CSS ring spinner** (track + arc) `[High]`; color `currentColor` (near-black) vs design `#0028A5` arc on grey track `[High]`; size 16 default vs 28 `[Med]`; no size variants.

#### Progress
- `Progress.tsx` h-7(28px) vs design 8px `[High]`; fill `bg-primary-60` vs `#0028A5` (S-3) `[High]`; radius `rounded`(8) vs pill `[Med]`; track `bg-gray-200` vs `--bg-3` `[Med]`. `ui/progress.tsx` is closest match (h-2, `bg-primary`, `rounded-full`) but track `bg-primary/20` tint vs design neutral grey `[Med]`.

#### Empty / NotificationBadgeWrapper
- **DS-only, no design ref** (NotificationBadge color `--notification`=#dc2626, see S-1).

### Identity / Table / Content

#### Avatar
- sizes sm/md/lg = 28/40/56 ✓; fallback bg `primary-20` (#ccd4ed) vs design `#BDC9E8` (S-2) `[Med]`; **fallback text not `font-bold`** vs design 700 `[Med]`; notification badge `#dc2626` vs `#BF0D3E` (S-1) `[Med]`; avatar-stack pattern not built in `[Low]`.

#### Tag
- single variant only. **Missing active/selected** (`bg-primary-20 border-primary-100 text-primary-100`) `[High]`; **missing removable `×`** `[High]`; **missing dashed "add" variant** `[High]`; base uses hardcoded `bg-slate-100/text-slate-700`, no border, vs design `#FAFAFA/#333/#E0E0E0` `[High]`; font 14 vs 12 `[Med]`.

#### Separator
- token `bg-border` (#EBEBEB) vs design `#E0E0E0` `[Med]`; **labeled separator ("or" with flanking lines) not implemented** `[Med]`; vertical `h-full` vs fixed 24px `[Low]`.

#### Prose
- link color only on hover vs design always `#0028A5` + 600 `[Med]`; blockquote border not primary (Tailwind default grey) vs design `3px #0028A5` `[Med]`; no `max-w`(560) `[Med]`; base 16 vs 15 `[Low]`.

#### Table
- header: DS `text-foreground font-medium` normal-case vs design **12px uppercase 600 letterspacing `#FAFAFA` bg** `[High]`; **no outer bordered/rounded container** `[High]`; **status pills not provided** `[High]`; **footer pagination not built in** `[High]`; `Table.tsx` uses `odd:bg-muted` stripe + strips hover vs design hover-only `#FAFAFA` `[High]`; cell padding `p-4`/`p-2` vs `14×16` `[Med]`.

#### Card (+ subparts)
- `rounded-xl`(12) vs design 6px `[High]`; **footer no border-top / no `#FAFAFA` tint / not right-aligned** `[High]`; **no accent/announcement variant** (4px left blue + eyebrow) `[High]`; **no stat/KPI variant** (40px blue number + green delta) `[High]`; no eyebrow slot `[High]`; `CardTitle` no font-size (design 17px) `[Med]`; shadow 0.1 vs 0.06 opacity `[Med]`.

#### Item
- **DS-only, no design ref.**

#### Kbd
- font `font-sans` vs design `font-mono` `[Med]`; size 12 vs 11 / no border by default vs design `1px #E0E0E0` `[Med]`; radius 4 vs 3 `[Low]`.

#### Carousel
- **nav arrows positioned outside frame (`-left-12`) vs design inside (left:10px)** `[High]`; **no dots/page indicator** (design has blue active dot) `[High]`; arrow shadow missing `[Med]`.

#### ScrollArea / Resizable
- ScrollArea scrollbar `w-2.5`(10) vs 6px `[Med]`, color `bg-border` vs `#C9C9C9` `[Med]`, no container border/radius (design 8px box) `[Med]`.
- Resizable handle `w-px`(1) hairline vs design 10px handle w/ flanking borders + grip bar `[Med]`; no outer wrapper styling `[Med]`.

#### Chart
- **no UZH-palette default chart colors** — `--chart-1..5` generic oklch; design mandates `#0028A5/#4AC9E3/#FFC845` `[High]`; `aspect-video` forced default `[Med]`; no chart card wrapper `[Med]`.

#### AspectRatio
- correct utility; no design spec. `[Low]`

### Time

#### Countdown
- **ships zero default styling** — bare number unless `formatter` given. Design: mono 28px 700, urgent `#BD3902` threshold. No `variant=urgent`/threshold prop `[High]`. `Countdown.tsx:46`.

#### CycleProgress
- default ring `#00A321` (generic) vs design `#7CA023` `[High]`; track `#D3D3D3` vs `#EFEFEF` `[High]`; size md 48px vs 72 `[High]`; stroke 5.6 vs 7 `[Med]`; center text `text-sm` 14 vs mono 15 bold `[Med]`; no threshold color logic; terminal `#8B0000` vs `#BD3902` `[High]`.

#### CycleCountdown
- center text no default mono/weight/size; ring+text color not auto-coordinated `[Med]`.

#### Workflow
- active `primary-80`(#3353b7) vs `#0028A5` (S-3) `[High]`; past text `text-gray-500` vs design blue `#0028A5` on light-blue `[High]`; past bg `primary-20`(#ccd4ed) vs `#BDC9E8` (S-2) `[Med]`; **active `hover:text-black` breaks white-on-blue** `[High]`. Gap (`mr-1` detached chevrons) ✓.

#### StepProgress
- no time-page reference; out of scope here (shown in components-progress). Re-audit separately.

### Foundations (tokens)

| area | status |
|---|---|
| Heading scale (24/20/18/17, 700) | ✓ matches `[Low]` |
| Radius scale (4/6/8/12) | ✓ values match; no `--radius-full` token (utility exists) `[Low]` |
| Shadow scale | ✓ matches TW4 defaults `[Low]` |
| Spacing scale | ✓ TW4 default 0.25rem `[Low]` |
| Font family (Source Sans 3 + JetBrains Mono, uzh only) | ✓ correct; neutral theme omits by design `[Low]` |
| Body/helper text | body 16/1.55 ✓, helper 14 ✓; mono code `0.9em`≈14.4 vs design 13 `[Low]` |
| Primary ladder | chromatic mismatch — S-2 `[High]` |
| Secondary | Berry `#BF0D3E` vs Red `#dc6027` — reference-internal conflict, S-5 `[verify]` |
| Accents/status | hue drift — S-1 `[High]` |
| Neutral/grey | DS oklch achromatic ≈ but not exact: muted #f7f7f7 vs #FAFAFA, border #EAEAEA vs #E0E0E0, fg #222 vs #000, muted-fg #7A7A7A vs #666 `[Med]` |

---

## Missing composite / template layer (the "many more components")

Only in `ui_kits/` (thesis-platform, careers, klicker, gbl). DS ships atoms but **none of these assembled patterns**:

| pattern | seen in | DS today |
|---|---|---|
| UZH app shell (global black bar + masthead + blue primary nav + role badge + sign-out + DE/EN) | all 4 kits | atoms only, not assembled `[High]` |
| Hero band (full-bleed blue, display heading, CTA, diagonal sheen) | careers, gbl | none `[High]` |
| Page header (title + subtitle + action cluster) | thesis, careers | none `[High]` |
| Filter rail / toolbar (count pills, segmented All/Jobs/Events, search) | thesis, careers | atoms only `[High]` |
| Announcement card / stat card / proposal card | card preview, thesis | base Card only `[High]` |
| Metadata / detail panel (eyebrow tags + definition list + sections) | thesis ProposalDetail | none `[High]` |
| Grouped/sectioned list (category eyebrow + blue underline divider) | thesis Dashboard | none `[Med]` |
| Footer | careers | none `[Med]` |

---

## DS-only components (no design reference — not gaps, just unaudited)
ButtonGroup, InputGroup, Empty, Item, NotificationBadgeWrapper, NavigationMenu, AspectRatio, plus DS-only variants (Badge semantic statuses, Toast warning, UserNotification success/default, Tabs responsive-grid wrapper). Keep, but no reference to validate styling against.

---

## Recommended remediation order (proposed slices — not yet started)

1. **S-1 + S-2 + S-5 token pass** (themes.css): bridge destructive/notification/status hues to UZH values (after confirming intent); decide chromatic vs mechanical ladder; resolve secondary Berry-vs-Red. *One change → cascades to ~30 components.*
2. **S-3 state pass**: point active/selected/on states at `primary-100`/`primary-20` (Workflow, Switch, Progress, Toggle(Group), Command, Sidebar, Pagination, Tabs-text, Breadcrumb-hover).
3. **S-4 control sizing**: 40px control height + 6px radius + 14px control font where design specifies; Card `rounded-xl`→`rounded-md`.
4. **Per-component design fidelity** (high-value first): Card variants (announcement/stat/footer-tint), Tooltip (dark+arrow, drop black border), Spinner (ring), Toast (left-accent), Tag (active/removable/dashed), Calendar (today=blue outline), Table (header+container+pills+footer), inline form errors, Checkbox single-source, ColorPicker brand-swatch mode, NumberField stepper, PinField boxes.
5. **Composite layer** (new components): AppShell + UZHGlobalBar + Masthead + PrimaryNav, PageHeader, FilterBar, Hero, MetadataPanel, Footer, Card.Stat/Card.Announcement.

## Open questions for design owner (confirm before changing tokens)
- Destructive hue: UZH Orange `#FC4C02` or generic red `#dc2626`?
- Secondary: UZH Berry `#BF0D3E` or UZH Red `#dc6027`? (reference disagrees with itself)
- Success green: Apple `#7CA023` or darkgreen `#2a7f62`? Warning: Gold `#FFC845` or yellow `#fede00`? Info: Cyan `#1EA7C4` or turquoise `#0b82a0`?
- Primary mid-ladder: chromatic (Blue 1–5) or mechanical fade?
- Badge `default`: near-black or UZH blue?
- Is the composite/template layer in scope for the DS package, or app-level?

---

## Provenance
Generated 2026-06-15 by 9 parallel review agents over `uzh-design-reference/` vs `packages/design-system/src/`. Reference is gitignored/local-only. No code changed by this audit. File:line refs are to `packages/design-system/src/` at branch `v5` HEAD `e348956`.

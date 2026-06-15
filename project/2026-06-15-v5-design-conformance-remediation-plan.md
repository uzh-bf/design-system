# DS v5 — Design-Conformance Remediation Plan

Caveman basic form. Plan only — NOT yet approved for execution. Pairs with audit: [2026-06-15-v5-design-reference-conformance-audit.md](2026-06-15-v5-design-reference-conformance-audit.md).

## Plan identity
- Current plan: `project/2026-06-15-v5-design-conformance-remediation-plan.md`
- Branch: `v5` — stack directly (user decision 2026-06-15). Part of PR #179 scope.
- MR/PR: PR #179. (No rename needed.)
- History link: PR #179 (dual-theme uzh/neutral foundation this builds on).

## Goal
Raise DS uzh-theme rendering to match the UZH design reference per-component. Source of truth = the reference reconstruction (user decision 2026-06-15).

## Non-goals
- Neutral theme restyle (stays shadcn defaults; reference values apply under `[data-theme='uzh']` only, unless token is theme-agnostic).
- Rewriting DS-only components with no design ref (ButtonGroup, InputGroup, Empty, Item, NavigationMenu, AspectRatio) — leave.
- Changing public component APIs beyond additive props/variants.
- **App-level composites OUT of scope** (user decision 2026-06-15): no AppShell, Masthead, PrimaryNav, Hero, PageHeader, FilterBar, MetadataPanel. DS = components + variants only. In scope: Card + variants (announcement, stat), and a standardized Footer *if* it generalizes (review real one at https://theses.df.uzh.ch first).

## Decision: adopted reference values (reference wins)
Resolve audit S-5 / open-questions. Use preview spec pages as design intent:
- destructive → `#FC4C02` (UZH Orange); destructive-foreground stays white; dark fg `#BD3902` for text-on-tint.
- notification → `#BF0D3E` (UZH Berry).
- secondary → Berry `#BF0D3E` (preview `colors-secondary.html`), NOT `#dc6027`. NOTE conflicts with reference `colors_and_type.css`; preview spec wins per user.
- success → `#7CA023` (Apple 4), success-bg `#ECF6D6`.
- warning → `#FFC845` (Gold), warning-fg `#A27200`, warning-bg `#FFF4DA`.
- info → `#1EA7C4` (Cyan 4), info-fg `#147082`, info-bg `#DBF4F9`.
- primary-100 `#0028A5` ✓ keep; primary tint consumed by components (`primary-20` slot) → `#BDC9E8` (Blue 1); add `--primary-hover` `#001E7C` (Blue 4).
- Badge `default` → near-black `#252525` (preview wins over Badge.jsx blue).
- Control height 40px, control font 14px, control radius 6px, Card radius 6px.

## Skill routing
- Per-slice: review subagent + simplification subagent (caveman). Verify in Ladle uzh + screenshot vs reference (`uzh-design-reference/preview/*.html`, server :5180).
- Final: mandatory security review subagent, then `$df-mr-description-writer`.

## Verification harness (all slices)
- Ladle :61000 (`?story=<id>&mode=preview`), GlobalProvider theme select → uzh. Reference static :5180.
- Per slice: screenshot changed stories uzh (and dark where relevant) side-by-side vs reference preview. No regression in neutral theme.
- `pnpm --filter @uzh-bf/design-system build` green; tsc clean.

---

## Slices

### R0 — Commit audit + plan
Files: audit doc + this plan. Stack on `v5` (no new branch). Stage only `project/` docs (leave pre-existing `types/*.d.ts` drift + `.tgz` untracked). Commit: `docs(project): add v5 design-conformance audit + remediation plan`.

### R1 — Token foundation: UZH brand hues + tints (audit S-1, S-2, S-5)  [highest leverage]
Do: `src/themes.css` `[data-theme='uzh']` (+ `.dark` variants): remap `--destructive`, `--destructive-foreground`, `--notification`, `--secondary`/`--theme-color-secondary`* → Berry, status `--success`/`--warning`/`--info` (+ `-foreground` + `-background`) to adopted values. Set `--color-uzh-blue-20`→`#BDC9E8`. Add `--primary-hover` token (`#001E7C`). Confirm inverted ladder semantics preserved.
Files: `src/themes.css`, maybe `src/tailwind.css` (token decls/`@theme inline` bridges for new `--primary-hover`, `--notification`).
Check: Ladle uzh — Alert (5 variants), Badge, Button.destructive, Toast, UserNotification render UZH hues; screenshots vs `components-alerts.html` / `components-badges.html` / `components-feedback.html`. Neutral theme unchanged.
Commit: `fix(ui): map destructive/secondary/status tokens to UZH brand hues`.

### R2 — Active/selected/on state pass (audit S-3)
Do: point states at full primary / primary-20 tint:
- `Workflow.tsx:85` active `primary-80`→`primary-100`; remove active `hover:text-black`; past text → `primary-100`.
- `Switch.tsx:131` on `primary-60`→`primary-100`.
- `Progress.tsx` fill `primary-60`→`primary-100` (or switch composite to use `ui/progress.tsx` track model).
- `ui/toggle.tsx:10` on `bg-accent/text-accent-foreground`→`bg-primary-20 text-primary-100` (+ weight 600); ToggleGroup inherits.
- `ui/command.tsx` selected → primary-20 + primary-100.
- `ui/sidebar.tsx` active: override `--sidebar-accent`/`-accent-foreground` under uzh → primary-20/primary-100.
- `ui/pagination.tsx` active page → primary-100 fill.
- `ui/tabs.tsx:45` active text `text-foreground`→`text-primary-100` (underline already ok).
- `ui/breadcrumb.tsx` link hover → `text-primary-100`.
Check: Ladle uzh per component vs reference (`components-toggles/disclosure/nav/time.html`, `components-composite.html` command, `components-progress.html`).
Commit: `fix(ui): route active/selected states through UZH primary`.

### R3 — Control sizing / radius / font (audit S-4)
Do: input/textarea/select/date triggers height 36→40 (`h-10`), font `text-base`→`text-sm`(14); Textarea min-h 64→80; Card `rounded-xl`→`rounded-md`; Alert/Popover/HoverCard/dialog content radius 8→6 where design=6; small label → 13px / 600 / foreground color (`FormLabel.tsx:32`).
Files: `ui/input.tsx`, `ui/textarea.tsx`, `ui/select.tsx` + `Select.tsx`, `DatePicker.tsx`, `DatetimePicker.tsx`, `ui/card.tsx`, `ui/alert.tsx`, `ui/popover.tsx`, `ui/hover-card.tsx`, `ui/dialog.tsx`, `FormLabel.tsx`.
Check: measure heights via preview_inspect; screenshots vs `components-form.html` / `components-card.html`.
Commit: `fix(ui): align control height/radius/font to 40px/6px/14px spec`.

### R4 — Form fidelity
Do: inline error text below field (not tooltip-only) in TextField/Textarea/Select; Checkbox single-source (reconcile `Checkbox.tsx` vs `ui/checkbox.tsx`: 18px, unchecked grey border, 4px radius, 3px ring); ColorPicker add brand-swatch-grid mode + brand palette default (8 hues, square, blue selected outline); NumberField add stepper −/+ + center mono + 40px + plain unit text; PinField individual boxes (44×52, gap-2, filled→border-primary, 20px bold).
Files: `forms/TextField.tsx`, `forms/TextareaField.tsx`, `forms/SelectField.tsx`, `Checkbox.tsx`+`ui/checkbox.tsx`, `ColorPicker.tsx`, `forms/NumberField.tsx`, `forms/AlphaNumericPinField.tsx`+`forms/FormikPinField.tsx`+`ui/input-otp.tsx`.
Check: Ladle uzh vs `components-form.html` + `components-inputs-advanced.html`.
Commit: `feat(ui): form-field design fidelity (inline errors, checkbox, color/number/pin)`.

### R5 — Fidelity batch A: overlays + feedback
Do: Tooltip dark `#252525` bg + white text + caret arrow + drop `border-2 border-black` + 12px; Spinner CSS ring (track `#E0E0E0` + arc primary-100, 28px default + sm); Toast 1px box + 4px left-accent bar + add `info` variant + UZH status colors; Modal/Dialog scrim 35% + title 700 + footer border-top + `#FAFAFA` tint + right-align; Drawer/Sheet scrim 25%; Dropdown item font 14 (drop `text-base` override); Command group-heading uppercase/700/letterspacing + kbd-pill shortcut.
Files: `Tooltip.tsx`+`ui/tooltip.tsx`, `ui/spinner.tsx`, `Toast.tsx`+`ui/sonner.tsx`, `ui/dialog.tsx`+`Modal.tsx`, `ui/drawer.tsx`, `ui/sheet.tsx`, `Dropdown.tsx`+`ui/dropdown-menu.tsx`, `ui/command.tsx`, `ui/kbd.tsx`.
Check: vs `components-dialogs/overlay/feedback/composite.html`.
Commit: `feat(ui): overlay+feedback design fidelity`.

### R6 — Fidelity batch B: content + identity + time
Do: Card variants — `announcement` (4px left primary border + uppercase eyebrow slot) + `stat` (40px primary number + green delta) + footer-tint/right-align/border-top; Tag active/removable(×)/dashed-add + semantic tokens + 12px; Table bordered+rounded container + uppercase 12px header + status-pill helper + footer pagination + row-hover `#FAFAFA`; Calendar today=blue outline (no fill) + bordered 280px card + uppercase 10px weekdays + bold selected; Avatar fallback `font-bold`; Separator labeled variant; Carousel arrows-inside + dots indicator; Countdown default mono/28/700 + `urgent` threshold; CycleProgress default ring `#7CA023`/track `#EFEFEF`/72px/stroke7 + threshold colors; Chart UZH default palette (`#0028A5/#4AC9E3/#FFC845`).
Files: `ui/card.tsx`(+`Card.tsx`), `Tag.tsx`, `Table.tsx`+`ui/table.tsx`, `ui/calendar.tsx`, `ui/avatar.tsx`, `ui/separator.tsx`, `ui/carousel.tsx`, `Countdown.tsx`, `CycleProgress.tsx`+`CycleCountdown.tsx`, `ui/chart.tsx`.
Check: vs `components-card/identity/table/time/composite.html`.
Commit: `feat(ui): content/identity/time design fidelity + Card variants`.

### R7 — Fidelity batch C: disclosure + nav
Do: Accordion outer border/radius/overflow + trigger 600 + hover bg (not underline) + 14px/12px padding; ToggleGroup outer container border; Collapsible trigger top-right + 1px border; `Tabs.tsx` make horizontal strip the default (drop forced responsive grid) + gap-28 + active blue text; Navigation add blue-surface variant (white text, 3px white underline active, avatar/role/sign-out slots); Sidebar dot-badge + 220px + bordered-card variant + active primary; Breadcrumb `/` separator default + blue hover + current 500; Pagination minimal `‹ ›` + active primary fill.
Files: `ui/accordion.tsx`, `ui/toggle-group.tsx`, `Collapsible.tsx`, `Tabs.tsx`, `Navigation.tsx`, `ui/sidebar.tsx`, `ui/breadcrumb.tsx`, `ui/pagination.tsx`.
Check: vs `components-disclosure/nav.html`.
Commit: `feat(ui): disclosure+nav design fidelity`.

### R8 — Footer only (composites otherwise dropped)
App-level composites dropped per user decision (AppShell/Masthead/PrimaryNav/Hero/PageHeader/FilterBar/MetadataPanel = app-level, not DS). Card announcement/stat variants already covered in R6.
Do: review the live Footer at https://theses.df.uzh.ch; if it generalizes, add a standardized `Footer` component + story + export. If too app-specific, drop and note.
Files: new `src/Footer.tsx` + story + `index.ts` (conditional on review).
Check: vs theses.df.uzh.ch footer + `ui_kits/careers` footer.
Commit: `feat(ui): add standardized Footer` (only if built).

### R-final — security review + MR
Do: security review subagent (token/markup changes, new components — low risk, confirm no injection via className/children, no secret leak). Then `$df-mr-description-writer` whole-branch. Rename plan to include PR id (metadata commit).

---

## Progress
- 2026-06-15: plan drafted. Audit complete (9-agent). Brand decision = reference wins. Composites dropped (R8=Footer only). Stack on v5.
- 2026-06-15 R0 DONE: audit + plan committed `6ed2415`.
- 2026-06-15 R1 DONE: token foundation. `themes.css` uzh block — secondary→Berry, status→Apple/Gold/Cyan (+bg/fg per reference), added destructive→#FC4C02 / notification→Berry / destructive-bg→#FFDBCC. `tailwind.css` — added `--color-uzh-berry-*` palette, `--color-uzh-blue-20` #ccd4ed→#bdc9e8 (Blue 1). Verified Ladle uzh alert--variants: error=orange, success=apple, info=cyan, warning=gold. Neutral regression-checked: error stays red (uzh-scoped, no leak). `pnpm build` green 5.73s. Review/simplify: self-reviewed (value-only CSS remap, no logic). NOT committed yet → next.
- 2026-06-15 R1 committed `beeab6f`.
- 2026-06-15 R2 DONE: active/selected/on states → UZH primary. Workflow active primary-80→100 + past text gray→primary-100 + drop active hover:text-black; Switch on primary-60→100; Progress fill primary-60→100; Toggle on accent→primary-20/primary-100/semibold; Command selected same; Pagination active outline→default(primary fill); Tabs active text foreground→primary-100; Breadcrumb link hover→primary-100; themes.css uzh --sidebar-accent→blue-20/blue-100. Verified Ladle uzh: Workflow active=full #0028A5 (was #3353b7), past text=blue. `pnpm build` green 5.16s.
- 2026-06-15 R2 committed `6a1b184`.
- 2026-06-15 R3 DONE: control sizing/radius/font (structural — applies BOTH themes, noted). input/textarea/select/datepicker/datetimepicker height 36→40 (h-9→h-10) + font 16→14 (text-base→text-sm); textarea min-h 64→80; TextField inner inputs same; Card rounded-xl→rounded-md(6px); Alert rounded-lg→rounded-md; Popover/HoverCard rounded-md→rounded-lg(8px); FormLabel small text-muted-foreground→text-foreground + text-[13px] + font-semibold. Verified Ladle: Card corners tighter, inputs taller. `pnpm build` green 5.32s. (Edits via subagent, diff reviewed.)
- 2026-06-15 R3 committed `f7ad8b7`.
- 2026-06-15 R4 PARTIAL: safe visual fixes done — Checkbox unchecked border primary→input (grey) + radius rounded-md→rounded-[4px]; PinField (ui/input-otp) fused pill → individual boxes (group gap-2, slot rounded-md border + font-mono + filled→border-primary). Verified Ladle uzh: pin boxes separated. `pnpm build` green 5.81s.
  - **DEFERRED (consumer-risk behavior/UX forks — need product decision):** (a) inline error text vs current tooltip-icon in TextField/Textarea/Select; (b) ColorPicker full swatch-grid redesign (changes interaction model); (c) NumberField stepper −/+ (changes rendering); (d) Checkbox single-source reconcile (two impls) + 18px size. These alter behavior/API of components used in real apps (klicker) — listed in final report for sign-off.
- 2026-06-15 R4 committed `5e6aa06`.
- 2026-06-15 R5 DONE: overlay+feedback fidelity. Tooltip dark #252525 + white + arrow + drop black border; Spinner lucide icon→CSS ring (grey track + primary-100 arc); Toast uniform border→thin+4px left-accent + new info(cyan) tone; Dialog scrim 70%→35% + title bold + footer border-t/bg-muted; Modal footer justify-end; Drawer/Sheet scrim 50%→25% + title bold; Dropdown items text-base→text-sm; Command group-heading→bold/uppercase/tracking. Verified Ladle uzh: Spinner = blue-arc rings. `pnpm build` green 5.59s. (subagent edits, diff reviewed.)
- 2026-06-15 R5 committed `ecba1af`.
- 2026-06-15 R6 PARTIAL (visual subset): Avatar fallback font-bold; Calendar today grey-fill→blue-outline + weekdays uppercase/bold/small + selected day font-bold; CardTitle +text-[17px]; themes.css uzh --chart-1..5 → UZH palette (blue/turquoise/lightgreen/yellow/berry); CycleProgress default ring #00A321→#7ca023 + track #D3D3D3→#EFEFEF; Tag slate→semantic (border/bg-muted/foreground) + text-xs. Verified Ladle uzh: calendar uppercase weekdays + blue bold selected. `pnpm build` green 5.06s.
  - **DEFERRED (additive features — need design sign-off, listed in final report):** Card announcement + stat variants; Tag active/removable/dashed; Separator labeled variant; Carousel arrows-inside + dots indicator; Countdown urgent-threshold prop + default mono styling; Table bordered container + uppercase header + status-pill helper + footer pagination.
- 2026-06-15 R6 committed `ee4bd95`.
- 2026-06-15 R7 PARTIAL: Accordion fidelity — outer rounded border box + inner dividers; trigger font-medium→font-semibold + text-base→text-sm + py-4→py-3 + px-4 + hover:underline→hover:bg-muted; content px-4. Verified Ladle uzh: bordered box + semibold triggers. `pnpm build` green 5.25s.
  - **DEFERRED (behavior changes / additive — final report):** Tabs.tsx drop responsive-grid layout (affects all consumers); Navigation blue-surface variant (additive); Collapsible trigger reposition top-right; Sidebar dot-badge + 220px width; Breadcrumb default separator chevron→slash; Pagination minimal prev/next; ToggleGroup outer container border.
- Next: commit R7, then R8 (review theses.df.uzh.ch footer), then final report.

## Open / risk
- Chromatic full ladder (Blue 2/3/5) deferred — R1 only fixes the consumed tint (Blue 1) + hover. Revisit if more steps needed.
- Secondary Berry vs Red conflict resolved to Berry per user; if official UZH CD says otherwise, R1 is the single revert point.
- R8 reduced to Footer-only (review theses.df.uzh.ch first); app composites dropped.
- Branch resolved: stack on `v5` / PR #179.

# Roadmap — v5 UZH alignment: reconciling the CD conformance and consumer-driven reviews

**Date:** 2026-08-19 · **Baseline:** `origin/v5` at `80d6f229c`, published `5.0.0-alpha.5`
**Supersedes:** `project/2026-08-01-v5-release-readiness-stacks-roadmap.md` (stacks A–D and the release sequence are all merged; it stays readable as history)
**Status:** roadmap only. No branch, no worktree, no implementation. One ruling gate blocks the largest phase.

## The thing that decides everything else

**Corrected 2026-08-19, after reading the bundle's own documentation.** An earlier draft of this roadmap called the relationship between the two source documents a spec-authority conflict and made naming an authority the release-blocking gate. That was wrong, and the bundle says so itself.

`GAPS-RESOLVED.md` opens by describing itself as a "reconciliation of the UZH-BF design-system reference against the upstream public export surface … read from `uzh-bf/design-system@main`", states that "this reference is an **AI reconstruction** with known internal conflicts", and tags every brand-colour line in its own source with `/* VERIFY vs official UZH CD */`. `DESIGN.md` says the same in one line: "Everything below is reconstructed from the public `uzh-bf/design-system` monorepo."

So the bundle is a **derived description of our own v4 library**, produced by an agent, which explicitly defers to the official UZH Corporate Design manual on every colour question. It is not a competing authority and cannot outrank the manual. There is exactly one brand authority: the **official UZH Corporate Design manual**.

That collapses most of what the earlier draft filed as rulings into facts:

- **The bundle's status palette is the CD palette.** Info `#1EA7C4` / `#DBF4F9` / `#147082` is Cyan shades 4 / 1 / 5. Success `#7CA023` / `#ECF6D6` / `#536B18` is Apple 4 / 1 / 5. Warning `#F3AB00` / `#FFF4DA` / `#A27200` is Gold 4 / 1 / 5. Error `#FC4C02` / `#FFDBCC` / `#BD3902` is Orange base / 1 / 4. One consistent rule — accent from the base or shade 4, tinted background from shade 1, text from shade 5. No conflict, and the rule is worth adopting as ours because it is derivable rather than taste.
- **The ladder is chromatic, and it is published.** `GAPS-RESOLVED.md` #4 asks whether the mid-ladder is chromatic or a mechanical opacity fade of `#0028A5`. The CD manual answers it: Blue shade 1 is `#BDC9E8`, exactly the value the bundle used. Chromatic, from the table. No ruling needed, and finding B1's premise that the ladder "should be mechanical 25% fades" is contradicted by the manual.
- **`#DC6027` is not a UZH colour.** It appears in no CD family. `DESIGN.md` asserts it as the secondary and calls it "UZH Red"; the same bundle's `GAPS-RESOLVED.md` #2 says the secondary is unruled with Berry `#BF0D3E` as the candidate. That is the bundle contradicting itself, not two authorities disagreeing.
- **The manual does answer "secondary".** Its web-UI block reads `--c-grey: #666666 — secondary text, default buttons`, its button table gives the Default variant as `#FAFAFA` on `#666666`, and its colour rules say accent families are "for charts, data viz, category labels, card accents … **never as primary UI colors**". Berry-as-secondary-action is ruled out by the manual, and so is any hue-driven secondary button.

**What actually remains is one genuine decision**, and it is not about which document wins. The CD manual is a **content-site specification**: teasers, hero sections, alternating section backgrounds, 18px inline links, `border-radius: 100px` pill buttons, focus expressed as a border-colour change. This library is a **dense application toolkit**. The open question is how literally a content-site spec binds an application UI — and that one answer decides the button shape, the type scale, the focus treatment, and the table header together.

## The GA boundary, and why the ruling is urgent

One rule orders this entire roadmap:

> Anything that changes what already-written consumer code renders must land before 5.0.0 GA. Anything purely additive can follow in a minor.

The token-model work fails that test hard. Adding interaction-state tokens and rewiring button and menu states to them (finding B1) re-values tokens that 84 call sites across 45 Klicker files depend on. Land it after GA and it is a 6.0. So:

| Release | Contents | Rationale |
|---|---|---|
| **5.0.0 GA** | All A-defects, all six CD defects, every token value and naming decision, every changed visual default, the migration-guide delta table | Breaking or visual — cannot move later |
| **5.1** | Purely additive API: `Modal size`, `Button icon-sm` / `destructive-outline` / `success`, Accordion size variants, form `fullWidth`, exported type-scale token | New surface, no existing rendering changes |
| **6.0** | The legacy-wrapper convergence (finding C15), removal of the deprecated `--color-uzh-*` families | Architectural; needs an ADR of its own |

Phase 0 is therefore not a nice-to-have parked item. It is on the GA critical path.

## What the two reviews say about the same things

Read this table with the correction above in hand: the consumer review's column reports what the bundle claims, and the bundle is a reconstruction that defers to the manual. Where the two columns diverge on a brand value, the manual wins by default and the row is a defect in the bundle, not an open question.

| Subject | CD review | Consumer review | Disposition |
|---|---|---|---|
| Secondary colour | #14 — Berry `#BF0D3E`, verified official, keep | B5 — `DESIGN.md` says `#DC6027`; v5 pre-empted an unruled question | **Not a conflict. `#DC6027` is off-palette and the bundle itself flags the secondary as unruled. The manual assigns secondary/default buttons to grey `#666666` and bars accent hues from primary UI, so keep Berry as an accent and do not promote it to a secondary action colour** |
| Warning hue | #14 — Gold `#FFC845`, verified official, keep | B5 — spec says gold `#F3AB00` | **Not a conflict. `#F3AB00` is Gold shade 4 from the same official family; the bundle uses shade 4 as the accent and `#FFC845` is the base. Pick one rung and apply the shade-4 / shade-1 / shade-5 rule consistently** |
| Focus ring | #12 — point `--default-ring-color` at `--color-ring` (solid UZH Blue) | B4 — bundle specifies translucent `rgba(0,40,165,0.18)` at 3px | **Consequence of the literalness question, not a free choice. The manual specifies focus as a border-colour change to `#0028A5` and no ring at all — see the WCAG note in Phase 0** |
| Tint ladder | #17 — non-monotonic but all values official; document the intent. #6 — one interpolated Berry step is not official | B1 — ladder should be mechanical 25% fades, with separate `primary-hover` / `-pressed` / `-container` tokens | **Half settled. The ladder is chromatic and published, so the "mechanical fades" premise is wrong; the interaction-state tokens B1 asks for are still a real and breaking gap** |
| Legacy `--color-uzh-*` | #10 — six families carry off-palette values, deprecate | B3 — five specced accent ladders are missing | **Not a conflict. Replace the off-palette values with official accent families under the same names** |
| Hardcoded hex | #16 — five files bypass tokens | B2 — 168 arbitrary-hex occurrences in compiled `dist` | **Same defect; B2 is the complete measurement** |
| Type scale | #9 — app-sized vs CD-sized, needs a recorded decision | B6 — not exported · C11 — headings bake in margin | **One typography package** |
| Buttons | #7 pill radius · #8 size ladder | C2 — missing `icon-sm`, filled hover on borderless, no semantic outlines | **One button package; #7/#8 need rulings, C2 does not** |
| Tables | #11 — CD header is light blue, not uppercase grey | C14 — `whitespace-nowrap` on every cell | **Adjacent; same file** |

### Verified while writing this

Three claims were reproduced against the published `5.0.0-alpha.5` tarball rather than taken on trust, because the first phase is built on them:

- **A1 holds design-system side.** `dist/design-system.css` declares `@layer components;` empty at line 747 and emits everything into `@layer utilities` from line 749 — `.text-center` at 4395, `.sm\:text-left` at 7850. A consumer's Tailwind appends its own `@layer utilities` after ours, so a consumer-authored base utility beats our responsive variant at every viewport. `README.md:47-50` does tell consumers not to `@source` the package, so a consumer following the documentation is exposed. This is a real every-consumer bug, not a Klicker build-config issue.
- **B2's count is exact.** 168 arbitrary-hex class occurrences across 116 dist modules, with the same distribution the review reports (`#111111` ×53, `#FAFAFA` ×39, `#E0E0E0` ×28, `#666666` ×24, `#EFEFEF` ×10, `#A3A3A3` ×6, `#333333` ×5, `#252525` ×3).
- **`frontend.uzh.ch` still does not resolve** from this network (checked 2026-08-19). CD findings #1, #7, #8, #9, #11, #13 and #18 continue to rest on the local `$rs-uzh-design` distillation rather than a live read of Release 2.9.0.
- **The bundle's provenance is stated in the bundle.** `SKILL.md` describes it as a prototyping skill shipping "typographic recreations" of the logos; `DESIGN.md` says it is "reconstructed from the public `uzh-bf/design-system` monorepo"; `GAPS-RESOLVED.md` calls itself an AI reconstruction read from `@main` and tags every brand colour `/* VERIFY vs official UZH CD */`. Because it reconstructs `main` — that is, v4 — a bundle/v5 difference may be documenting a deliberate v5 change rather than a v5 regression, and each B-finding needs reading that way.

## Phase 0 — the decision gate (you, via `$grill-with-docs`)

Not an authority ruling. One posture decision plus a short tail of treatments the manual is silent on.

### Round 1 rulings — settled 2026-08-19

- **Posture: (c) inspiration only.** The library is not bound by the UZH Corporate Design manual; it should "look somewhat like UZH". The palette and Source Sans 3 carry the recognisability; geometry, density, control sizing, focus affordance, and type scale are ours. Consequences: CD #7 (pill radius), #8 (button size ladder), #9 (type scale), #11 (table header) and the CD's border-change focus model are all closed as "keep what we ship, record the decision". CD #12 survives, but as an internal consistency fix rather than a conformance one.
- **Dark theme: not supported for now.** It drops out of the a11y and VRT obligation set and is documented as unsupported. Disposition of the existing `.dark` blocks is a round-2 question.
- **Colour families: align to the official UZH families**, and the mapping covers more than blue and berry — cyan, gold, apple and orange all have official counterparts to the legacy names. Scope and cost are round-2 questions, because the consumer measurement below changes the economics.

Recorded as `docs/adr/0005-uzh-corporate-design-is-a-reference-not-a-constraint.md` (untracked until the implementation branch exists).

### Round 2 rulings — settled 2026-08-19

- **Realign all four mappable families**: `red`→Orange, `yellow`→Gold, `lightgreen`→Apple, `turqoise`→Cyan. Includes `red` despite 198 consumer occurrences, because all of them move together and `#dc6027` is the value that reads least like UZH.
- **Keep `darkgreen` and `grey`, and move them out of the `uzh-` namespace.** Neither has an official counterpart — the manual has no dark green family, and its neutrals are an achromatic flat list rather than a five-shade family. Breaking 86 consumer files to delete them buys nothing; the rename is what stops the `uzh-` prefix implying brand backing.
- **Ladder rule: `-100` is the darkest saturated rung usable as a fill or foreground** — the base for Blue, Berry and Orange, shade 4 for Cyan, Apple and Gold — and `-20` is shade 1 throughout. Blue and Berry keep exactly the values they ship today, so the 854 already-correct consumer occurrences do not move. Gold therefore resolves to `#F3AB00`, which is the value the status set already wants.
- **Drop the font-weight change (CD #3 / #4).** Its justification was the manual's 400/600 web restriction, which posture (c) removes. It was the largest VRT-baseline churn in Phase 1 for no remaining benefit.
- **Dark theme CSS stays dormant.** The `[data-theme='uzh'].dark` and `.dark [data-theme='uzh']` blocks remain in `themes.css`, documented as unsupported, out of the a11y inventory and VRT set. Deleting them would be a breaking change for any consumer currently setting the class.

### Round 3 rulings — settled 2026-08-20

- **Realigned families take official names** — `uzh-orange`, `uzh-gold`, `uzh-apple`, `uzh-cyan` — with the legacy names surviving as deprecated aliases pointing at the new values through 5.x and removed in 6.0. Consumers do nothing at GA: call sites keep compiling and change colour, and the rename becomes a codemod on their own schedule. This is also the only chance to fix the `turqoise` misspelling without spending a second break on it.
- **The two house families move to a `df-` prefix**: `df-grey` and `df-darkgreen`. The prefix is the point — it stops a colour with no manual backing from reading as a brand claim.
- **Status surfaces keep tinted fills**, with the rule stated explicitly: shade 1 as the fill, shade 5 as the text. That is what already ships, so `UserNotification`'s 181 usages across 137 consumer files do not move, and it is the pairing that clears AA. `DESIGN.md`'s "don't fill alert backgrounds" line is contradicted by its own `Alert.jsx` and status table.
- **Badge default becomes the container tint** (blue-20 fill, blue-100 text) with solid kept as a variant. It aligns badges with the selected-state surface used by tabs and toggles, and at 17 usages across 9 files it is the cheapest default change in the roadmap.
- **Modal keeps the inset divider.** The full-bleed `#FAFAFA` band appears only in a preview page of the reconstruction, contradicted by the reconstruction's own `Modal.jsx`.

Vocabulary from these rulings is recorded in `CONTEXT.md` (untracked, alongside the ADR).

**Phase 0 is closed.** Nothing in Phases 1–4 is ruling-blocked.

### Round 1 — the root, and the two questions independent of it

**The root: how literally does a content-site specification bind a dense application UI?** The manual describes uzh.ch — teasers, hero blocks, alternating section backgrounds, 18px inline links, `border-radius: 100px` buttons at 14px/600 with `8px 16px` padding, focus as a border-colour change. This library builds dashboards, tables, and forms. Three coherent postures:

- **(a) Literal conformance** — pills, the CD button variants including the grey Default, CD-sized type, border-change focus. Survives a brand review unchanged; costs density and, for focus, likely fails WCAG 2.2 focus appearance, since a 1px border-colour change is a weak indicator.
- **(b) Palette-and-type binding** — colour, typeface, weight scale, link treatment, and status semantics come from the manual and are non-negotiable; geometry, density, control sizing, and focus affordance are the library's, justified by application ergonomics and recorded as such.
- **(c) Inspiration only** — the manual is a reference, application ergonomics decide.

The discriminating fact is whether a UZH brand authority can reject this library. If yes, (a) or (b); if no, (b) or (c). Either way (b) is the recommendation: it is the only posture that both survives a brand review on the things a reviewer actually checks and keeps a dense dashboard usable.

This one answer settles four items at once — button shape (CD #7) and the size ladder (#8), the type scale (#9), the focus treatment (#12 and B4), and the table header (#11).

**Independent of the root:**

- **Dark theme (CD #13).** The manual defines none, under any posture. v5 ships one: `themes.css` carries `[data-theme='uzh'].dark` and `.dark [data-theme='uzh']` blocks that re-map the status tokens. So the question is whether the uzh dark theme is a supported product surface with its own contrast obligations, or an unspecced extension documented as best-effort.
- **Legacy `--color-uzh-*` families (CD #10).** `tailwind.css` defines eight: `berry`, `blue`, `darkgreen`, `grey`, `lightgreen`, `red`, `turqoise` (misspelled), `yellow`. Only `berry` and `blue` carry official values; the other six are v4 mechanical-fade ladders on off-palette base hues.

  **Corrected: these are not unused.** The CD review's "no shipped `.tsx` uses them, only stories" is true of the design system's own components — zero utility-class uses on `origin/v5` — and badly wrong for consumers. Measured on the Klicker worktree `rs/ds-v5-alpha5-upgrade`, the eight families account for **1,500 occurrences**: blue 555 (46 files), grey 379 (71), berry 299 (22), red 198 (45), darkgreen 38 (15), yellow 19 (6), lightgreen 6 (1), turqoise 6 (1). This is the most heavily used part of the public surface in the reference consumer, larger than every component override in the review combined. Of that, 646 occurrences sit on the six off-palette families, and 577 of those are `grey` and `red` alone. Any realignment is a visible change at consumer call sites, not a free cleanup.

### Round 2 — treatments the manual does not cover, once the posture is set

Queued rather than asked now, because the recommendation for each changes with the root:

1. **Alert fills** — tinted status backgrounds (shipped, and the bundle's own `Alert.jsx` and status table) or white with coloured text and icon (`DESIGN.md`'s explicit "don't fill alert backgrounds with color"). The bundle is split against itself here, and the manual fills nothing but hero and CTA blocks.
2. **Badge fill** — solid primary (shipped), container tint `#CCD4ED`, or neutral. `GAPS-RESOLVED.md` #5 lists this as unruled and v5 shipped a third option.
3. **Modal footer band** — the full-bleed `#FAFAFA` band the preview shows, or the inset divider both the bundle's `Modal.jsx` and v5 ship.

Under the shade-4 / shade-1 / shade-5 rule the manual's own table supports, 1 and 2 both reduce to a single posture question about tinted surfaces rather than three independent colour picks.

**Run this while the Klicker stack is up.** Button shape and type scale are questions a real application answers far better than a storybook, and the `rs-ds-v5-alpha5-upgrade` devpod is already running one.

## Phase 1 — consumer-breaking defects, no ruling needed → alpha.6

The verification loop comes first, because "fix in the design system, not in consumers" is unenforceable without it.

- **Slice 0 — local link loop.** Klicker consumes the published alpha; no link setup exists, so every fix below is claimed-fixed-unverified. `pnpm pack` plus a `file:` override in the Klicker worktree is the low-ceremony mechanism. Half a day.
- **A1 — CSS delivery.** Compile component-critical styles into the `components` layer with media queries baked in, or change the documented consumption model. The most consequential item in either review: it silently degrades every consumer, and the failure is invisible until someone measures a computed style.
- **A2 — modal autofocus ring.** `preventDefault()` on `onOpenAutoFocus`, or move initial focus to the non-interactive panel.
- **C5 — Dropdown separator bug.** The legacy wrapper merges `className.item` into separators and labels, so a consumer item-height class renders a fat grey band.
- **C1 — unconditional `DialogFooter`.** Actionless modals draw a stray divider.
- ~~**CD #3 / #4 — font weights.**~~ Dropped by the Phase 0 round-2 ruling: posture (c) removes the manual's 400/600 restriction, and this was the largest VRT-baseline churn in the phase.
- **CD #1 / #2 — link blue.** Add `--theme-color-link` / `--theme-color-link-visited` (`#365DD5` / `#5972C5`), fix `Prose` base anchor colour, point `Button variant="link"` at the link token. Today prose links render near-black.
- **CD #5 — the error state has no colour.** `--theme-destructive-text: #111111` in the uzh theme makes error icons and invalid-input borders near-black. Both `#BD3902` and `#BF0D3E` clear AA on white — **and this slice must re-run the a11y inventory**, which is pinned at zero serious/critical with an empty waiver list, because `aria-invalid:border-destructive-text!` paints borders too.
- **A3 — migration guide.** `MIGRATION.md` currently says "colors, spacing, and layout are unaffected" while 30 of 46 primitives changed. Add the per-primitive delta table, and document the new `max-w-[520px]` modal cap, which silently collapsed six Klicker modals and appears in no release note.

Not in this phase: **CD #12** (`--default-ring-color`). It looks like a one-line fix, but it changes what consumer bare-`ring` utilities render today, and the ring ruling may change the value again. Fold it into Phase 2 so consumer rings move once.

Rough size: 1.5–2.5 weeks, wider if A1 forces a change to the documented consumption model.

## Phase 2 — token model → still GA, gated on Phase 0

- **B1** — interaction-state tokens (`--primary-hover`, `--primary-pressed`, `--primary-container`) drawn from the published Blue ladder rather than invented, with button and menu states wired to them. The breaking one. B1's other half — re-basing the ladder onto mechanical 25% fades — is dropped: the manual publishes the chromatic ladder.
- **B2 + CD #16** — tokenize the neutral set, replace all 168 hex occurrences, remove the `!important` escapes the wrapper layer uses against its own primitives, and add a lint rule so it cannot regress.
- **B3 + CD #10** — the colour-family realignment as ruled in Phase 0: four families take official values under the `-100` = darkest-saturated-rung rule, `darkgreen` and `grey` leave the `uzh-` namespace, and `berry-80` `#d9305f` is replaced by the published Berry shade 4 `#8f0a2e` (CD #6's interpolated step). The largest consumer-visible change in the roadmap — 646 occurrences move — so it needs a migration table and a codemod, not just a release note.
- **B4 + CD #12** — one ring decision, applied to both `--ring` and `--default-ring-color`.
- **B5 + CD #6 / #14 / #17** — apply the shade-4 / shade-1 / shade-5 rule to the status set consistently, replace the interpolated Berry step with the published value, and document the non-monotonic ladder intent in `themes.css`. No longer ruling-gated: the manual's table supplies every value.
- **CD #9 + B6 + C11** — the typography package: record the scale decision, export the scale, drop baked-in heading margins for UI headings while `Prose` keeps its rhythm.

**Changed defaults, which the GA rule puts here rather than in 5.1.** Each is backed by measured override economics rather than preference — Button 138 overrides on 201 usages, UserNotification 99 on 137, Tooltip 32 on 36. An 89% override rate is a wrong default, and a wrong default cannot be corrected in a minor.

- **C8** — Tooltip to a `text-sm` default with a default max-width of about 20rem, against today's `text-xs` and unbounded width.
- **C7** — UserNotification default padding and type raised to the alert spec. The fill treatment waits on ruling 1.
- **C2 (partial)** — remove the filled hover overlay from the borderless/basic variant, which paints a button-like surface on things consumers use as plain links in 50 files.
- **C6** — `TabsList` defaults to a full-width spanning track instead of `w-fit`, with an opt-out.
- **C14** — reconsider `whitespace-nowrap` on every table body cell.
- **C9 (partial)** — render the form label tooltip through the portaled `ui/tooltip` so it stops losing to sticky toolbars and modal chrome.
- **C13** — a `--disabled` token replacing `text-slate-400!`; folds naturally into the B2 tokenization sweep.

Rough size: 3–4 weeks after the rulings land, the upper half of that range reflecting the changed defaults that moved in from 5.1.

## Phase 3 — additive API only → 5.1

What is left once the GA rule has taken the default changes: new surface that alters nothing already rendering.

- **C10** — `Modal size="sm|md|lg|xl|full"` presets on the 520px base, replacing 15+ distinct hand-rolled width overrides in Klicker alone.
- **C2 (partial)** — `icon-sm` (`size-8`) alongside the existing `icon`, plus `destructive-outline` and `success` variants so status buttons stop hand-rolling `border-red-400` / `border-green-700`.
- **C3** — Accordion trigger size variants against the fixed 52px, keeping the current height as the default.
- **C9 (partial)** — a `fullWidth` prop and a documented horizontal-label layout for form fields.

## Phase 4 — convergence → 6.0, needs an ADR first

v5 ships 35 legacy wrappers beside 53 `ui/` primitives, and they render visibly different controls: legacy `Switch` is `w-10/12/16` against `ui/switch`'s `w-8`, legacy `Progress` is `h-7` against `ui/progress`'s `h-2`, and `UserNotification` and `ui/alert` are two alert systems with different looks. All 860 Klicker files import the legacy names — which is also where most of the defects in this roadmap live, so consumers are integrating against the layer receiving the least design attention.

This needs a canonical-layer decision per component, wrapper styling aligned to the primitive underneath, and deprecation guidance with codemods. It is a package with an ADR, not a slice.

## Constraints that shape every phase

- **Visual churn batches.** VRT is 23 container-pinned snapshots behind a now-blocking CI gate, regenerated only inside Docker via `packages/design-system/scripts/visual-regression.sh`. Phase 1's font-weight change and Phase 2's token work both move baselines. Regenerate once per package, never per slice, and remember a green local run is no evidence about CI.
- **The a11y inventory is zero-waiver.** `EXACT_SERIOUS_CRITICAL_INVENTORY = []`, enforced by both the sharded `a11y` job and the `a11y-protocol` job. Any colour change re-runs it.
- **Report line numbers are stale by two merges.** The CD review measured `53d12495d`; `origin/v5` is at `80d6f229c`, and the intervening commits touched `Collapsible.tsx`, `Tabs.tsx`, `forms/Label.tsx`, `ThemeProvider.tsx`, the RHF fields, and a VRT baseline. Verify each `file:line` with `git show origin/v5:<path>` — including from the `rs-v5-w5-candidate-metadata` worktree, which sits one commit behind.
- **Klicker's interim workarounds are the acceptance test.** Commits `dc56eca29`, `8ee2fc5aa`, `1de7ad918` work around the modal cap, sidebar density, tab track, and dropdown. Section D of the consumer review maps which override dies with which design-system fix; a fix that does not let its override be deleted is not finished.
- **One worktree will be required.** No branch covers this work. Suggested `trees/rs-v5-uzh-alignment` on `rs/v5-uzh-alignment` from `80d6f229c`. Nothing else is to be created.

## Immediate next actions

1. Answer Phase 0 round 1 — the posture question plus dark theme and the legacy families. Round 2's treatments follow from it. Best done while the Klicker stack is up.
2. Authorize Phase 1 and its worktree. It needs no ruling and contains the only live rendering bug.
3. Before the first execution plan is presented, run the planner gate on it — this roadmap is a horizon above that plan, not a substitute for it.

# Roadmap — v5 UZH alignment: reconciling the CD conformance and consumer-driven reviews

**Date:** 2026-08-19 · **Baseline:** `origin/v5` at `80d6f229c`, published `5.0.0-alpha.5`
**Supersedes:** `project/2026-08-01-v5-release-readiness-stacks-roadmap.md` (stacks A–D and the release sequence are all merged; it stays readable as history)
**Status (2026-10-18):** Phase 0 decisions are recorded. Phase 1 source fixes and scoped responsive CSS are integrated with the corrected input/dependency/field stack on `rs/v5-uzh-alignment` and delivered in [draft PR214](https://github.com/uzh-bf/design-system/pull/214). Hosted checks pass at `b8d607280`; the corrected packed candidate passes the historical Klicker pilot. These drafts are unmerged. Phase 2 and full release-candidate qualification still block GA. npm still serves `5.0.0-alpha.5` on `alpha` and `4.1.8` on `latest`; the corrected local tarball is not a published release.

## Official-source correction — 2026-10-18

The [official styleguide link](https://www.frontend.uzh.ch/style/) is reachable;
its release list currently identifies [2.10.0, dated June 10, 2026](https://www.frontend.uzh.ch/prod/releases/2.10.0/index.html).
The comparison below is corrected against that release's [CSS](https://www.frontend.uzh.ch/prod/releases/2.10.0/assets/css/main.css)
and component documentation. The colour manual supplies palette values; the
styleguide supplies web defaults and functional colours. The reconstructed bundle
and cached local distillation do not establish official requirements.

The accepted application-design posture remains in place. It does not establish
strict CD conformance or an institutional exemption: the [UZH Web-CD policy](https://www.kommunikation.uzh.ch/de/web/policies/cd.html)
also covers non-CMS websites. Qualification of an application and its branding
remains separate from the package's theme mechanism.

## Historical reconciliation — 2026-08-19

**Corrected 2026-08-19, after reading the bundle's own documentation.** An earlier draft of this roadmap called the relationship between the two source documents a spec-authority conflict and made naming an authority the release-blocking gate. That was wrong, and the bundle says so itself.

`GAPS-RESOLVED.md` opens by describing itself as a "reconciliation of the UZH-BF design-system reference against the upstream public export surface … read from `uzh-bf/design-system@main`", states that "this reference is an **AI reconstruction** with known internal conflicts", and tags every brand-colour line in its own source with `/* VERIFY vs official UZH CD */`. `DESIGN.md` says the same in one line: "Everything below is reconstructed from the public `uzh-bf/design-system` monorepo."

So the bundle is a **derived description of our own v4 library**, produced by an agent, which explicitly defers to official UZH sources. It is not a competing authority. The official colour manual and Frontend Styleguide supply different parts of the reference; a palette swatch does not by itself prescribe a component's semantic role.

That collapses most of what the earlier draft filed as rulings into facts:

- **The bundle's status hues are drawn from the CD palette.** Cyan, Apple, Gold, Orange and Berry supply official swatches. Assigning them to info/success/warning/error and choosing their fill/accent/text pairs are project decisions. The official web templates instead use functional green/red values and 5% tints in `.FormMessage--inner`; palette provenance does not make our status recipe an official requirement. The implemented Berry error-text exception preserves contrast on the Orange tint.
- **The ladder is chromatic, and it is published.** `GAPS-RESOLVED.md` #4 asks whether the mid-ladder is chromatic or a mechanical opacity fade of `#0028A5`. The CD manual answers it: Blue shade 1 is `#BDC9E8`, exactly the value the bundle used. Chromatic, from the table. No ruling needed, and finding B1's premise that the ladder "should be mechanical 25% fades" is contradicted by the manual.
- **`#DC6027` is not a UZH colour.** It appears in no CD family. `DESIGN.md` asserts it as the secondary and calls it "UZH Red"; the same bundle's `GAPS-RESOLVED.md` #2 says the secondary is unruled with Berry `#BF0D3E` as the candidate. That is the bundle contradicting itself, not two authorities disagreeing.
- **The official default button is neutral.** Release 2.10.0 uses `#FAFAFA` with `#666666` text for `.Button`. Our root Button defaults to outline, and the primitive secondary variant uses neutral `--secondary`; the separate `--theme-color-secondary-*` family is Berry. This distinction does not establish a universal prohibition on coloured actions or certify every consumer's use of the family utilities.

**The remaining decision at that review was the application-design posture.** The official web patterns include content pages, pill buttons and a dedicated Flyingfocus keyboard indicator. This library is a **dense application toolkit**. Phase 0 recorded the project's adaptation of geometry, type scale, focus and table treatment; it did not rule on institutional applicability or certify a consumer's CD conformance.

## The GA boundary, and why the ruling is urgent

One rule orders this entire roadmap:

> Anything that changes what already-written consumer code renders must land before 5.0.0 GA. Anything purely additive can follow in a minor.

The token-model work fails that test hard. Adding interaction-state tokens and rewiring button and menu states to them (finding B1) re-values tokens that 84 call sites across 45 Klicker files depend on. Land it after GA and it is a 6.0. So:

| Release | Contents | Rationale |
|---|---|---|
| **5.0.0 GA** | All A-defects, all six CD defects, every token value and naming decision, every changed visual default, the migration-guide delta table | Breaking or visual — cannot move later |
| **5.1** | Purely additive API: `Modal size`, `Button icon-sm` / `destructive-outline` / `success`, Accordion size variants, form `fullWidth`, exported type-scale token | New surface, no existing rendering changes |
| **6.0** | The legacy-wrapper convergence (finding C15), removal of the deprecated `--color-uzh-*` families | Architectural; needs an ADR of its own |

Phase 0 was on the GA critical path. Its decisions below are settled; Phase 2 implements them before GA.

## What the two reviews say about the same things

Read this table with the correction above in hand: the consumer review's column reports what the bundle claims, and the bundle is a reconstruction that defers to the manual. Where the two columns diverge on a brand value, the manual wins by default and the row is a defect in the bundle, not an open question.

| Subject | CD review | Consumer review | Disposition |
|---|---|---|---|
| Secondary colour | #14 — Berry `#BF0D3E`, verified official, keep | B5 — `DESIGN.md` says `#DC6027`; v5 pre-empted an unruled question | **`#DC6027` is off-palette. Berry remains an accent family; default/secondary button variants are neutral. Palette names and action semantics are distinct contracts** |
| Warning hue | #14 — Gold `#FFC845`, verified official, keep | B5 — spec says gold `#F3AB00` | **Both are official Gold swatches. Phase 0 selects shade 4 for the application accent; that selection is a project decision** |
| Focus ring | #12 — point `--default-ring-color` at `--color-ring` (solid UZH Blue) | B4 — bundle specifies translucent `rgba(0,40,165,0.18)` at 3px | **Keep the ruled per-control indicator and fix internal ring consistency. Official 2.10.0 also has Flyingfocus; the earlier border-only premise was incorrect** |
| Tint ladder | #17 — non-monotonic but all values official; document the intent. #6 — one interpolated Berry step is not official | B1 — ladder should be mechanical 25% fades, with separate `primary-hover` / `-pressed` / `-container` tokens | **Half settled. The ladder is chromatic and published, so the "mechanical fades" premise is wrong; the interaction-state tokens B1 asks for are still a real and breaking gap** |
| Legacy `--color-uzh-*` | #10 — six families carry off-palette values, deprecate | B3 — five specced accent ladders are missing | **Realign four families to official names and values; identify grey/darkgreen as house families. Preserve deprecated aliases through 5.x** |
| Hardcoded hex | #16 — five files bypass tokens | B2 — 168 arbitrary-hex occurrences in the August published `dist` | **Same defect; refresh the owned-default inventory before implementation** |
| Type scale | #9 — app-sized vs CD-sized, needs a recorded decision | B6 — not exported · C11 — headings bake in margin | **One typography package** |
| Buttons | #7 pill radius · #8 size ladder | C2 — missing `icon-sm`, filled hover on borderless, no semantic outlines | **Phase 0 keeps application geometry; Phase 2 handles changed defaults and Phase 3 the additive variants** |
| Tables | #11 — cached claim that the CD header must be light blue | C14 — `whitespace-nowrap` on every cell | **The current guide styles tables, but the blanket light-blue header requirement was not established. Keep the ruled header treatment; review body wrapping as application UX** |

### Historical evidence — verified 2026-08-19

Three claims were reproduced against the published `5.0.0-alpha.5` tarball rather than taken on trust, because the first phase is built on them:

- **A1 holds design-system side.** `dist/design-system.css` declares `@layer components;` empty at line 747 and emits everything into `@layer utilities` from line 749 — `.text-center` at 4395, `.sm\:text-left` at 7850. A consumer's Tailwind appends its own `@layer utilities` after ours, so a consumer-authored base utility beats our responsive variant at every viewport. `README.md:47-50` does tell consumers not to `@source` the package, so a consumer following the documentation is exposed. This is a real every-consumer bug, not a Klicker build-config issue.
- **B2's count is exact.** 168 arbitrary-hex class occurrences across 116 dist modules, with the same distribution the review reports (`#111111` ×53, `#FAFAFA` ×39, `#E0E0E0` ×28, `#666666` ×24, `#EFEFEF` ×10, `#A3A3A3` ×6, `#333333` ×5, `#252525` ×3).
- **The bare `frontend.uzh.ch` host failed in August.** The October 18 check followed UZH's actual `www.frontend.uzh.ch` link and retrieved release 2.10.0. Its current source supersedes cached 2.9.0 descriptions of focus, button weights and table headers.
- **The bundle's provenance is stated in the bundle.** `SKILL.md` describes it as a prototyping skill shipping "typographic recreations" of the logos; `DESIGN.md` says it is "reconstructed from the public `uzh-bf/design-system` monorepo"; `GAPS-RESOLVED.md` calls itself an AI reconstruction read from `@main` and tags every brand colour `/* VERIFY vs official UZH CD */`. Because it reconstructs `main` — that is, v4 — a bundle/v5 difference may be documenting a deliberate v5 change rather than a v5 regression, and each B-finding needs reading that way.

## Phase 0 — the decision gate (you, via `$grill-with-docs`)

Not an authority ruling. One posture decision plus a short tail of treatments the manual is silent on.

### Round 1 rulings — settled 2026-08-19

- **Posture: (c) inspiration only.** The project chooses an application adaptation: the palette and Source Sans 3 carry recognisability; geometry, density, control sizing, focus affordance and type scale follow application ergonomics. This records an internal decision, not an institutional exemption. CD #7/#8/#9/#11 remain closed as "keep what we ship, record the decision"; the per-control focus indicator is also retained. CD #12 survives as an internal consistency fix.
- **Dark theme: not supported for now.** It drops out of the a11y and VRT obligation set and is documented as unsupported. Disposition of the existing `.dark` blocks is a round-2 question.
- **Colour families: align to the official UZH families**, and the mapping covers more than blue and berry — cyan, gold, apple and orange all have official counterparts to the legacy names. Scope and cost are round-2 questions, because the consumer measurement below changes the economics.

Recorded in [ADR 0005](../docs/adr/0005-uzh-corporate-design-is-a-reference-not-a-constraint.md), tracked on the implementation branch. The ADR records the intended ring contract; Phase 2 still needs to align `--default-ring-color` in source.

### Round 2 rulings — settled 2026-08-19

- **Realign all four mappable families**: `red`→Orange, `yellow`→Gold, `lightgreen`→Apple, `turqoise`→Cyan. Includes `red` despite 198 consumer occurrences, because all of them move together and `#dc6027` is the value that reads least like UZH.
- **Keep `darkgreen` and `grey`, and move them out of the `uzh-` namespace.** Neither has an official counterpart — the manual has no dark green family, and its neutrals are an achromatic flat list rather than a five-shade family. Breaking 86 consumer files to delete them buys nothing; the rename is what stops the `uzh-` prefix implying brand backing.
- **Family mapping:** `-100` selects the base for Blue, Berry and Orange, and shade 4 for Cyan, Apple and Gold; `-20` selects shade 1. These labels do not guarantee a lightness ordering: the retained Blue `-80` is darker than Blue `-100`. Blue remains unchanged; Berry retains its family except for the scheduled `berry-80` correction to the published shade 4. Gold resolves to `#F3AB00` by project choice.
- **Drop the font-weight change (CD #3 / #4).** The project retains its application weight scale. The official specimens show Regular and Semibold faces; that does not turn their defaults into a new implementation requirement for this package.
- **Dark theme CSS stays dormant.** The `[data-theme='uzh'].dark` and `.dark [data-theme='uzh']` blocks remain in `themes.css`, documented as unsupported, out of the a11y inventory and VRT set. Deleting them would be a breaking change for any consumer currently setting the class.

### Round 3 rulings — settled 2026-08-20

- **Realigned families take official names** — `uzh-orange`, `uzh-gold`, `uzh-apple`, `uzh-cyan` — with the legacy names surviving as deprecated aliases pointing at the new values through 5.x and removed in 6.0. Consumers do nothing at GA: call sites keep compiling and change colour, and the rename becomes a codemod on their own schedule. This is also the only chance to fix the `turqoise` misspelling without spending a second break on it.
- **The two house families move to a `df-` prefix**: `df-grey` and `df-darkgreen`. The prefix is the point — it stops a colour with no manual backing from reading as a brand claim.
- **Status surfaces keep tinted fills.** The recorded project recipe selects shade 1 as fill and shade 5 as text; this is design intent, not a claim that the complete token map already ships or an official semantic rule. Phase 2 still coordinates the tokens and verifies intended pairs, including the contrast-driven error treatment implemented in Phase 1. `DESIGN.md`'s "don't fill alert backgrounds" line is contradicted by its own `Alert.jsx` and status table.
- **Badge default becomes the container tint** (blue-20 fill, blue-100 text) with solid kept as a variant. It aligns badges with the selected-state surface used by tabs and toggles, and at 17 usages across 9 files it is the cheapest default change in the roadmap.
- **Modal keeps the inset divider.** The full-bleed `#FAFAFA` band appears only in a preview page of the reconstruction, contradicted by the reconstruction's own `Modal.jsx`.

Vocabulary from these rulings is tracked in [CONTEXT.md](../CONTEXT.md).

**Phase 0 is closed.** Its decisions are sufficient to plan Phase 2. Phase 4 still needs its own architectural decision before implementation.

### Historical Round 1 questions — resolved above

**The root: how closely should this application toolkit reproduce the official website patterns?** The current guide's base `.Button` is 14px/400 with a 100px radius; large buttons use 16px/600. Keyboard focus includes Flyingfocus, and input focus changes a light-blue background and border. This library builds dashboards, tables and forms. The three postures considered were:

- **(a) Literal reproduction** — follow the official website component patterns, including typography, pills and Flyingfocus. Full application acceptance would still be required; no accessibility or brand-approval verdict follows from copying individual defaults.
- **(b) Palette-and-type binding** — follow official palette/type defaults and choose application geometry, density, control sizing and focus affordance explicitly. Status-role assignments remain separate from palette provenance.
- **(c) Inspiration only** — the manual is a reference, application ergonomics decide.

The original recommendation was (b); the accepted project choice was (c), recorded above. That choice does not establish an institutional applicability ruling or guarantee a consumer's brand acceptance.

This one answer settles four items at once — button shape (CD #7) and the size ladder (#8), the type scale (#9), the focus treatment (#12 and B4), and the table header (#11).

**Independent of the root:**

- **Dark theme (CD #13).** v5 retains UZH-dark CSS for compatibility. The recorded decision leaves it unsupported and outside the current accessibility/VRT qualification.
- **Legacy `--color-uzh-*` families (CD #10).** `tailwind.css` defines eight: `berry`, `blue`, `darkgreen`, `grey`, `lightgreen`, `red`, `turqoise` (misspelled), `yellow`. Blue uses official selected swatches; Berry has the recorded `-80` exception. The other six retain legacy values pending the official/house-family realignment.

  **Corrected: these are not unused.** The CD review's "no shipped `.tsx` uses them, only stories" is true of the design system's own components — zero utility-class uses on `origin/v5` — and badly wrong for consumers. Measured on the Klicker worktree `rs/ds-v5-alpha5-upgrade`, the eight families account for **1,500 occurrences**: blue 555 (46 files), grey 379 (71), berry 299 (22), red 198 (45), darkgreen 38 (15), yellow 19 (6), lightgreen 6 (1), turqoise 6 (1). This is the most heavily used part of the public surface in the reference consumer, larger than every component override in the review combined. Of that, 646 occurrences sit on the six off-palette families, and 577 of those are `grey` and `red` alone. Any realignment is a visible change at consumer call sites, not a free cleanup.

### Historical Round 2 questions — resolved above

These were queued behind the posture decision; the recorded rulings above supersede their open-question wording:

1. **Alert fills** — tinted status backgrounds (shipped, and the bundle's own `Alert.jsx` and status table) or white with coloured text and icon (`DESIGN.md`'s explicit "don't fill alert backgrounds with color"). The bundle is split against itself. The official web templates also have green/red tinted form messages; our palette-based semantic assignment is a project choice.
2. **Badge fill** — solid primary (shipped), container tint `#CCD4ED`, or neutral. `GAPS-RESOLVED.md` #5 lists this as unruled and v5 shipped a third option.
3. **Modal footer band** — the full-bleed `#FAFAFA` band the preview shows, or the inset divider both the bundle's `Modal.jsx` and v5 ship.

The recorded project choices retain tinted status surfaces and select a container-tint badge. The colour manual supplies swatches rather than prescribing those component defaults; intended text/fill pairs need their own contrast evidence.

**Consumer context:** the August pilot supplied the measurements above. On October 18, the user approved temporary lifecycle changes and exact-version exceptions for 44 Radix versions blocked by the consumer's 14-day policy. The corrected packed candidate installs and its 245 build files match the tarball. The container production build and real Formik save/reload, validation, responsive modal and dropdown checks pass. Configuration and lockfile were restored byte-for-byte; the checkout is clean and provider stopped with zero routes. This qualifies the new package against the historical pilot; current-trunk and broader release-candidate qualification remain open.

## Phase 1 — delivered in the unmerged draft stack

The [Phase 1 plan](2026-08-20-v5-phase1-consumer-defects-plan.md) retains the original defects and implementation sequence. Source corrections and acceptance are complete in PR214:

- **Packed consumer loop:** the corrected tarball installs, its build files match, the container production build passes and synthetic Formik values survive save/reload in the historical Klicker pilot.
- **A1 — CSS delivery:** component-scoped responsive defaults live in the `components` layer. Independent consumer compilation verifies default styles and explicit utility overrides across both themes and four widths; real modal checks corroborate them.
- **A2 / C1 / C5 — modal and dropdown:** pointer entry avoids an incidental close-button ring, keyboard focus remains visible, actionless footers are omitted and separators no longer inherit item sizing.
- **CD #1 / #2 / #5 — links and errors:** dedicated normal/visited link tokens and a legible UZH error colour are implemented, with browser, token and accessibility evidence.
- **A3 — migration guidance:** the visual delta table and modal width cap are documented. The Phase 0 decision dropped CD #3 / #4 font-weight changes.

**CD #12** (`--default-ring-color`) remains in Phase 2 because it changes consumer bare-`ring` utilities alongside the token model. Phase 1 completion does not promise an alpha.6 publication or establish GA acceptance.

## Phase 2 — token model and visual defaults before GA

The October 18 Claude consultation confirmed the following sequence after source and ADR corroboration. This refines the existing scope; implementation packaging and stack topology still belong to its execution plan.

1. **Establish coverage before changing values.** Inventory public families/rungs, freeze the alias mapping from `CONTEXT.md`, and extend the existing theme contract and stories with a dense application reference fixture. Cover palette samples, intended text/fill pairs, forms, status, tabs and a table at desktop/mobile in neutral and UZH. Existing stories cover some family utilities; current evidence does not establish every rung or alias. Keep the fixture internal to Ladle; no public app-shell API is needed.
2. **Implement the token graph.** Apply B1–B5 and C13 below, retaining deprecated aliases through 5.x. Re-measure owned neutral literals and identify the source check that will detect regressions; computed-token assertions alone cannot inventory class-string literals. Extend existing checks within this scope rather than assuming a new lint dependency is required.
3. **Apply the changed defaults.** Complete the component items below against the token graph and preserve explicit consumer overrides. Remove wrapper `!important` escapes only where the new ownership makes them redundant.
4. **Review the result and migration.** Regenerate pinned VRT baselines once per coherent visual package after its changes settle; inspect every intentional diff. Require alias/computed-style proof, AA for intended text/fill pairs, zero waived serious/critical axe cases, keyboard interactions, public types, RHF minimum/current packed/Next checks and size budgets. Maintain the migration delta table and rename guidance. Compare the touched badge/tooltip/table/tabs source with current shadcn documentation; copied primitives are not updated by dependency bumps.
5. **Qualify the eventual candidate.** Record the exact packed artifact and consumer refs for refreshed acceptance, remove only demonstrated redundant overrides corresponding to changed defaults, and recheck consumer dependency-age policy. Manual screen-reader, Safari and physical-mobile evidence remain separate acceptance rows. UZH dark remains unsupported and outside this matrix.

### Token and typography scope

- **B1** — interaction-state tokens (`--primary-hover`, `--primary-pressed`, `--primary-container`) drawn from the published Blue ladder rather than invented, with button and menu states wired to them. The breaking one. B1's other half — re-basing the ladder onto mechanical 25% fades — is dropped: the manual publishes the chromatic ladder.
- **B2 + CD #16** — tokenize the owned neutral defaults using a fresh source/packed inventory. The August count of 168 is historical, not an acceptance target. Palette declarations and deliberate test stimuli remain valid literals; add a scoped regression guard to the existing verification where needed.
- **B3 + CD #10** — the colour-family realignment as ruled in Phase 0: four families take the recorded official swatches with `-100` as the selected accent, `darkgreen` and `grey` leave the `uzh-` namespace, and `berry-80` `#d9305f` is replaced by the published Berry shade 4 `#8f0a2e` (CD #6's interpolated step). The August inventory measured 646 affected occurrences, so the work needs a migration table and a codemod alongside the release note.
- **B4 + CD #12** — apply the recorded ring contract consistently to `--ring` and `--default-ring-color`, including consumer primary-ramp overrides.
- **B5 + CD #6 / #14 / #17** — coordinate the recorded status fill/accent/text recipe using official swatches, verify intended pairs including the contrast-driven error treatment, replace the interpolated Berry step and document the non-monotonic ladder intent in `themes.css`. The semantic assignment is a project choice; the manual's swatch table does not mandate it.
- **CD #9 + C11** — retain the ruled application type scale and weights; remove baked-in UI heading margins while `Prose` keeps its rhythm. The additive B6 type-scale export belongs to v5.1.

**Changed defaults, which the GA rule puts here rather than in 5.1.** Each is backed by measured override economics rather than preference — Button 138 overrides on 201 usages, UserNotification 99 on 137, Tooltip 32 on 36. An 89% override rate is a wrong default, and a wrong default cannot be corrected in a minor.

- **Badge default** — implement the settled container tint (blue-20 fill, blue-100 text), retaining solid as an explicit variant.
- **C8 / C9 (partial)** — set a readable `text-sm` tooltip default with tokenized appearance, and review a default max-width of about 20rem. The primitive currently uses `text-xs`; the wrapper already bounds width at `max-w-120`, and label help already portals. Verify keyboard and portal behaviour inside modals and sticky headers rather than adding another portal.
- **C7** — raise UserNotification default padding and type to the alert treatment; retain tinted fills as ruled in Phase 0.
- **C2 (partial)** — remove the filled hover overlay from the borderless/basic variant, which paints a button-like surface on things consumers use as plain links in 50 files.
- **C6** — `TabsList` defaults to a full-width spanning track instead of `w-fit`, with an opt-out.
- **C14** — reconsider `whitespace-nowrap` on every table body cell.
- **C13** — a `--disabled` token replacing `text-slate-400!`; folds naturally into the B2 tokenization sweep.

The dependency dispositions remain dated: the compatible layer was selected on October 17. Later DayPicker, Resizable Panels, chart, toast, validation and build-tool majors need their own compatibility case; they are not automatic GA prerequisites. Preserve the RHF 7.59.0/7.90.0 matrix and revisit candidate metadata and advisories at qualification. A focused shadcn comparison does not establish parity across every copied primitive.

## Phase 3 — additive API only → 5.1

What is left once the GA rule has taken the default changes: new surface that alters nothing already rendering.

- **C10** — `Modal size="sm|md|lg|xl|full"` presets on the 520px base, replacing 15+ distinct hand-rolled width overrides in Klicker alone.
- **C2 (partial)** — `icon-sm` (`size-8`) alongside the existing `icon`, plus `destructive-outline` and `success` variants so status buttons stop hand-rolling `border-red-400` / `border-green-700`.
- **C3** — Accordion trigger size variants against the fixed 52px, keeping the current height as the default.
- **C9 (partial)** — a `fullWidth` prop and a documented horizontal-label layout for form fields.
- **B6** — export the existing type scale without changing current rendering.

## Phase 4 — convergence → 6.0, needs an ADR first

v5 ships 35 legacy wrappers beside 53 `ui/` primitives, and they render visibly different controls: legacy `Switch` is `w-10/12/16` against `ui/switch`'s `w-8`, legacy `Progress` is `h-7` against `ui/progress`'s `h-2`, and `UserNotification` and `ui/alert` are two alert systems with different looks. All 860 Klicker files import the legacy names — which is also where most of the defects in this roadmap live, so consumers are integrating against the layer receiving the least design attention.

This needs a canonical-layer decision per component, wrapper styling aligned to the primitive underneath, and deprecation guidance with codemods. It is a package with an ADR, not a slice.

## Constraints that shape every phase

- **Visual churn batches.** VRT currently has 23 container-pinned snapshots behind a blocking CI gate, regenerated only inside Docker via `packages/design-system/scripts/visual-regression.sh`. Phase 2 token/default work needs intentional diff review and regeneration once per coherent visual package. The font-weight change was dropped. Local results and hosted checks remain separate evidence.
- **The a11y inventory is zero-waiver.** `EXACT_SERIOUS_CRITICAL_INVENTORY = []`, enforced by both the sharded `a11y` job and the `a11y-protocol` job. Any colour change re-runs it.
- **Report line numbers are historical.** The CD review measured `53d12495d`; merged `origin/v5` is `80d6f229c`, and the corrected draft source is `b8d607280`. Verify source claims against the applicable ref rather than the review's old lines.
- **Consumer workarounds provide acceptance cases.** The historical Klicker pilot retains width/density overrides. Remove an override when the corresponding changed default demonstrably replaces it; application-specific layout constraints may remain. Additive modal size presets belong to v5.1 and do not block Phase 2.
- **Theme ownership is settled.** [ADR 0003](../docs/adr/0003-uzh-primary-ramp-override-boundary.md) assigns full approved primary-ramp overrides to consumers; [ADR 0004](../docs/adr/0004-themeprovider-root-sync.md) fixes document-root placement. The generic contract and synthetic fixture already exist. Any actual branded values need approval in the consumer candidate that uses them; no DS-owned branded export is required for base UZH GA.
- **Existing worktree:** `trees/rs-v5-uzh-alignment` on `rs/v5-uzh-alignment`. Preserve its original fixes and use ordinary merge propagation from the field layer; do not recreate the branch.

## Immediate next actions

1. Retain the source qualification recorded in [PR214](https://github.com/uzh-bf/design-system/pull/214), including eleven component and five real-application captures. The packed acceptance proves the historical pilot; record new source/artifact refs when refreshing it.
2. Start Phase 2 with the public-family/alias inventory and dense internal reference fixture, then follow its ordered acceptance steps above. This is the next implementation package to plan.
3. Refresh candidate acceptance after the token/default work, including relevant consumer override retirement and the outstanding manual accessibility/browser evidence.
4. Keep additive Phase 3 APIs in v5.1. Keep wrapper convergence and complete Formik public-type/runtime removal in v6.
5. Reconcile the existing v5 umbrella and qualify the integrated candidate in its promotion package; target merges, publication and deployment retain their separate authority gates.


## October 18 evidence and remaining gates

The input layer corrects natural modal navigation, pending twelve-hour periods,
controlled resets and date invariance after calendar browsing. The field layer
corrects disabled transitions and native form submission, actual multi-selection
semantics and transformed FormField output. Both supported RHF versions have
passing hosted packed-consumer jobs. Complete independent field review accepted
the corrected source; its current-head hosted CI also passes.

Phase 1 preserves the existing conditional modal footer, isolated Dropdown
separator classes, close-button keyboard focus, link tokens, legible error state
and visual migration table. The integrated source passes 90 browser contracts,
public types, lint, formatting and the packed token/CSS checks. All 23 pinned
visual comparisons pass. PR214 and eleven inspected/rendered screenshots are
published. [Hosted CI at b8d607280](https://github.com/uzh-bf/design-system/actions/runs/39157156790) passes behavioral, both RHF packed-consumer, types, lint, format, visual, all four accessibility shards and the release build. Subsequent documentation-only edits reuse this source evidence; their hosted checks are recorded separately in [PR214](https://github.com/uzh-bf/design-system/pull/214).
The corrected packed candidate passes the real Klicker pilot build and synthetic
application flows, with desktop/mobile captures in PR214. Compact app navigation,
editor-toolbar layout and build translation/page-size warnings remain consumer
follow-ups. Broader release-candidate acceptance remains a GA gate. No target
merge, release or deployment occurred.

The brand posture is a project design decision. It is not evidence of an
institution-wide exemption or institutional approval. UZH dark CSS remains
unsupported and unqualified; retained CSS does not establish accessibility.
Manual screen-reader, Safari and physical-mobile qualification remain open.

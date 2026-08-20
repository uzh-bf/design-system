# Phase 1 — consumer-breaking defects (v5 UZH alignment)

Execution plan for Phase 1 of `project/2026-08-19-v5-uzh-alignment-roadmap.md`.
Posture and colour rulings are recorded in `docs/adr/0005-uzh-corporate-design-is-a-reference-not-a-constraint.md`;
vocabulary in `CONTEXT.md`. This plan does not restate either.

Branch `rs/v5-uzh-alignment`, worktree `trees/rs-v5-uzh-alignment`, cut from
`80d6f229c` (`v5`, `5.0.0-alpha.5` + PR #209 CI hardening). Target: `v5`.
Ceremony tier: **full path** — the branch touches the public CSS delivery
model, theme tokens, and a11y-measured colours.

**Planning gate:** the configured `planner` role is pinned to Fable 5 and its
quota was exhausted on 2026-08-20, so the pre-approval plan challenge ran
through the advisor route instead. Substitution recorded here because the
Finish Gate reads this file for which gates ran. Its four blocking findings are
folded in below; one was overturned on measurement and the reversal is recorded
in slice 4.

Phase 1 is scoped to defects that need no ruling and that change what
already-written consumer code renders. Everything ruling-dependent is Phase 2.

## Research — resolved before planning

- **A2 has a source-level explanation; the finding is real but not in `Modal`.**
  `src/Modal.tsx:195` already carries `onOpenAutoFocus={(e) => e.preventDefault()}`,
  added by `8f37abaf5 fix(Modal): disable autofocus on open`, an ancestor of
  `80d6f229c`. No other component passes `onOpenAutoFocus` or `autoFocus`. But
  `src/ui/dialog.tsx:74` styles the close button with `focus:ring-2`, not
  `focus-visible:ring-2` — so *any* programmatic focus paints the ring — and
  `AlertDialog` passes no autofocus handler, so Radix focuses its first tabbable
  node on open, which is that close button. That composition reproduces the
  reported symptom. Slice 2 confirms it in Ladle before editing, because the
  discriminator is sharp: the ring appears on `AlertDialog` and not on `Modal`.

- **`src/original/*` is not public surface, so C1/C5 land in `ui/` alone.**
  `Modal.tsx:17` and `Dropdown.tsx:19` both import from `./ui/`. Nothing in
  `src/index.ts`, `src/primitives.ts`, or `src/react-hook-form.ts` re-exports
  `original/`, and no module in `src/` imports from it. The duplicated
  `original/dialog.tsx:93` and `original/alert-dialog.tsx:79` are dead code.
  Removing that tree is a separate cleanup, not this phase.

- **A1 has no "component styles" to move, and the obvious fix is wrong.**
  `src/tailwind.css:5` imports `tailwindcss/utilities.css layer(utilities)` and
  `@source "./"` scans the library's own JSX, so every design-system style *is*
  a generated utility, indistinguishable from a consumer's. Emitting the
  library's output into a trailing layer would make the design system win every
  tie — which breaks every consumer override, the same override economics the
  roadmap cites as evidence of missing defaults (Button 138/201,
  UserNotification 99/137). That shape is rejected. See slice 6.

## Delegation Map

| Workstream | Slices | Owner | Depends on | Acceptance boundary |
| --- | --- | --- | --- | --- |
| Verification loop | 0 | main | — | A DS change is observable in the Klicker worktree without publishing |
| Component defects | 1, 2 | main | 0 | Reproduced in Ladle before and after; VRT green |
| Theme colour | 3, 4 | main | 0 | a11y inventory still exactly zero serious/critical |
| Documentation | 5 | main | 1–4 | Delta table matches the measured primitive diff |
| CSS delivery | 6 | main | 0 | Enumerated losing rules win in a real consumer; **zero VRT diffs** |

Every slice stays in the main session. Skip reason for the execution tier:
**cross-slice seams** — slices 3, 4, and 6 change public CSS and token surfaces
that the others then describe, and slice 4 is a11y-measured, which the global
rules keep with the main session.

**Ordering note.** A1 moved from first to last. It and the component defects
both depend only on slice 0, so they are independent; A1 is now plausibly the
largest item in the phase, and front-loading it would park four cheap,
independently shippable fixes behind an open-ended one. Slices 1–5 also give
slice 6 a broader body of rendered output to prove zero visual drift against.

## Slices

### Slice 0 — local link loop

`Problem:` Klicker consumes the published `5.0.0-alpha.5`. Without a link
path, every fix below is claimed-fixed-unverified, and Phase 1 exists
precisely to stop fixing things in consumers.
`Do:` `pnpm build` then `pnpm pack` in `packages/design-system` — the build is
required because the consumer needs `dist/design-system.css`, which `pack`
alone does not produce. Then a `file:` override in the Klicker worktree on
branch `rs/ds-v5-alpha5-upgrade`, pointing at the tarball. Its absolute path is
machine-local and stays out of this file. The tarball must be reachable from
inside the running Klicker
devpod container, not only from the host. Record the exact commands in Progress
so a later session repeats them rather than rediscovering them.
`Check:` A deliberately visible local change (a temporary border colour) shows
up in the running Klicker devpod, then is reverted.
`Risk:` The Klicker devpod `rs-ds-v5-alpha5-upgrade` is running and belongs to
a separate handoff. Reuse it read-mostly; do not rebase or commit on that
branch as part of this work.
`Commit:` None — tooling step, recorded in Progress.

### Slice 1 — C1 and C5, legacy wrapper defects

`Problem:` (C1) `src/Modal.tsx:225` renders `DialogFooter` unconditionally, and
`src/ui/dialog.tsx:99` gives it `border-t border-[#EFEFEF] pt-4` — an actionless
modal draws a stray divider plus 1rem of dead padding. (C5)
`src/Dropdown.tsx:211` merges `className.item` into `DropdownMenuSeparator`
and `DropdownMenuLabel`, so a consumer item-height class renders separators as
fat grey bands.
`Do:` Render the footer only when a primary or secondary action exists. Stop
threading the item class into the separator and label branches of
`DropdownItem`; per-item `item.className?.item` stays honoured. Both changes
land in `src/Modal.tsx` / `src/Dropdown.tsx`; `src/original/*` is untouched
dead code.
`Check:` New Ladle stories for an actionless modal and a dropdown with both a
tall `className.item` and a separator. VRT regenerated in Docker via
`scripts/visual-regression.sh` — a green local run is not evidence about CI.
`Risk:` The footer change removes a divider that some consumer may have come
to rely on visually; it is a defect fix, recorded in the delta table.
`Commit:` `fix(Modal,Dropdown): stop rendering empty footers and styled separators`

### Slice 2 — A2, focus ring on dialog open

`Problem:` `src/ui/dialog.tsx:74` uses `focus:ring-2 focus:ring-offset-2` where
the rest of the library uses `focus-visible:`. Combined with `AlertDialog`
passing no `onOpenAutoFocus` handler, Radix focuses the close button on open and
the ring paints for mouse users.
`Do:` Reproduce in Ladle first and record which surfaces show it. Then narrow
the close button to `focus-visible:`, which is the correct fix regardless of
which dialog opened it, and add `onOpenAutoFocus` handling to `AlertDialog`
only if the repro shows the ring persists.
`Check:` Ladle repro before and after, opening `Modal` and `AlertDialog` by
mouse and by keyboard. Keyboard focus must still paint a visible ring —
narrowing to `focus-visible:` must not become a regression in the other
direction.
`Risk:` Over-fixing. If the repro shows nothing, record it as not-a-defect in
the PR and drop the slice rather than changing focus behaviour speculatively.
`Commit:` `fix(dialog): paint the close-button ring only for keyboard focus`

### Slice 3 — CD #1 / #2, link colour

`Problem:` No link token exists (`grep` for `--theme-color-link` in `src/*.css`
returns nothing). `src/Prose.tsx:32` sets only `hover:prose-a:text-primary-100`,
so prose links render at the Tailwind prose default — near-black — until
hovered. `src/ui/button.tsx:22` points `variant="link"` at `text-primary`.
`Do:` Add `--theme-color-link` `#365DD5` and `--theme-color-link-visited`
`#5972C5` to **both** theme blocks in `src/themes.css`, expose them through
`src/tailwind.css`, set the `Prose` base anchor colour, and point the Button
link variant at the link token.
`Check:` Ladle story showing prose links in both themes, unvisited and
visited. Add a `tests/theme-contract` assertion that both theme blocks define
both tokens — cheap, and it catches the token landing in `neutral` only.
Contrast of both values on white recorded in the PR.
`Risk:` Changes rendered colour for every existing prose link. Intended.
`Commit:` `fix(theme): give links their own token instead of inheriting body text`

### Slice 4 — CD #5, the error state has no colour

`Problem:` `src/themes.css:104` sets `--theme-destructive-text: #111111` in the
`uzh` theme, so error icons and invalid-input borders render near-black. The
neutral theme has `#b91c1c` at `src/themes.css:58`; only `uzh` is affected.
`Decision:` **Berry `#BF0D3E`.** The plan challenge argued for Orange 4
`#BD3902` on family consistency — the same block already sets
`--destructive: #fc4c02` and `--destructive-background: #ffdbcc`, both Orange —
and that reasoning is sound in the abstract. Measurement overturns it.
`text-destructive-text` renders **on** `bg-destructive-background` in shipped
code: `src/ui/alert.tsx:25`, `src/UserNotification.tsx:83`,
`src/forms/SelectField.tsx:143`, `src/forms/RhfSelectField.tsx:51`,
`src/Workflow.tsx:291`.

| Candidate | on white | on `#ffdbcc` |
| --- | --- | --- |
| Orange 4 `#BD3902` | 5.6:1 | **4.34:1 — fails AA text** |
| Berry `#BF0D3E` | 6.28:1 | 4.86:1 |

`src/ui/alert.tsx:25` additionally renders descriptions at
`text-destructive-text/90`, which lowers the ratio further. Against an
inventory pinned at zero serious and critical with no waivers, Orange 4 is not
available. Berry is also already this theme's `--notification` hue, so it is
not a foreign colour here.
`Do:` Set `--theme-destructive-text: #BF0D3E` in the `uzh` block.
`Check:` **Re-run the a11y inventory.** It is enforced by both the sharded
`a11y` job and `a11y-protocol`. This token also paints borders through
`aria-invalid:border-destructive-text!` (`src/ui/input.tsx:20`), so the check
covers borders and text, not text alone. Record both measured ratios.
`Risk:` Splitting destructive text (Berry) from destructive fill (Orange)
across two families is a real inconsistency. It is accepted here and handed to
Phase 2, which realigns the families and can revisit the pairing as a whole.
Noted in the roadmap so it is not rediscovered as a defect.
`Commit:` `fix(theme): restore a visible error colour in the uzh theme`

### Slice 5 — A3, migration guide

`Problem:` `MIGRATION.md` states that colors, spacing, and layout are
unaffected, while 30 of 46 primitives changed. The `max-w-[520px]` modal cap
at `src/Modal.tsx:209` and `src/ui/dialog.tsx:66` silently collapsed six
Klicker modals and appears in no release note.
`Do:` Replace the claim with a per-primitive delta table derived from the
measured diff, document the modal cap and its escape hatch
(`className.content`), and add whatever slices 1–4 changed.
`Check:` Every row traced to a diff hunk. No row asserted from memory.
`Risk:` A delta table that is wrong is worse than none, because consumers stop
checking. Derive it mechanically.
`Commit:` `docs(migration): replace the no-visual-change claim with a delta table`

### Slice 6 — A1, CSS delivery layer

`Problem:` Component-critical styles ship in `@layer utilities`, so a consumer
base utility silently beats a design-system responsive variant at every
viewport. The failure is invisible until someone reads a computed style.
`Do:` Three steps, in order, and the first is not optional.
1. **Enumerate.** Through slice 0's link loop, find which design-system
   responsive variants actually lose to a consumer utility. The list is
   expected to be short — `sm:flex-row` on the dialog footer
   (`src/ui/dialog.tsx:99`) is one known member. Write the enumeration into
   Progress before editing anything.
2. **Hand-author only those rules** as CSS in `@layer components`, with media
   queries baked in, and remove them from the `className` strings.
   `components` still loses to a consumer's `utilities`, which is the point:
   consumer overrides must keep working.
3. Leave every other style where it is.
`Check:` Two gates. (a) **Zero VRT diffs.** Ladle has no competing consumer
stylesheet, so a correct cascade fix changes design-system-internal rendering
not at all; any snapshot diff means the fix altered what the library renders
and is wrong. (b) Extend `tests/theme-contract/verify-packed-css.mjs` to assert
the `components` layer exists in `dist/design-system.css` and sits before
`utilities`. Then re-verify the enumerated rules through slice 0.
`Risk:` The rejected shape — moving the library's whole output into a trailing
layer — is one line and looks like the fix. It would make the design system win
every tie and break consumer overrides wholesale. Do not take it. If step 1
finds the enumeration is not short, stop and re-plan rather than widening;
changing the documented consumption model is a Phase 2 conversation.
`Commit:` `fix(css): serve component-critical responsive rules from the components layer`

## Test obligations

| Risk | Obligation | Seam | Distinct failure caught |
| --- | --- | --- | --- |
| A1 cascade regression | add new | `verify-packed-css.mjs` | Component rules silently return to `utilities` |
| A1 visual drift | extend existing | VRT | The cascade fix changed rendering, which it must not |
| Link token in one theme only | add new | `tests/theme-contract` | Token lands in `neutral` and not `uzh` |
| Empty modal footer | extend existing | VRT story | Divider reappears on an actionless modal |
| Dropdown separator | extend existing | VRT story | Item class leaks back into separators |
| Focus ring on mouse open | extend existing | VRT story | `focus:` reintroduced in place of `focus-visible:` |
| Error colour | extend existing | a11y inventory | A future token change reintroduces a contrast failure |

No new unit tests. The consequential behaviour here is rendered output and
emitted CSS, and the repository already protects both at stable seams — the
container-pinned VRT suite, the zero-waiver a11y inventory, and the packed-CSS
theme contract. Two of those seams are extended above rather than duplicated.

## Out of scope

- **CD #12** (`--default-ring-color`) stays in Phase 2 so consumer rings move
  once, not twice.
- The colour-family realignment, the interaction-state tokens, and every
  ruling-dependent component change are Phase 2.
- Deleting the dead `src/original/*` tree — real, but unrelated to any
  consumer-visible defect.
- The Klicker-side adherence backlog stays with the Klicker branch.

## Progress

**2026-08-20.**

- **Slice 1 — done** (`02b724512`). Modal footer gated on having an action;
  Dropdown separators and labels no longer take the shared item class.
- **Slice 2 — done** (`2f6656288`). The source-level hypothesis held:
  `focus:ring-2` was an outlier in exactly two files (`ui/dialog.tsx`,
  `ui/sheet.tsx`) against eighteen using `focus-visible:`. Both narrowed. The
  Ladle repro was therefore not needed to identify the surface, and `sheet.tsx`
  — which no review had named — carried the same defect.
- **Slice 3 — done** (`090cf5908`). Link tokens in both themes, exposed as
  `--color-link` / `--color-link-visited`, consumed by `Prose` and
  `Button variant="link"`. Neutral needed values of its own, since its primary
  ramp is near-black; `#1D4ED8` / `#6D28D9` were chosen and are a decision made
  without a ruling. **Theme contract: 688/688 assertions pass** against the
  packed artifact, including the two new tokens on all four roots.
- **Slice 4 — done** (`a30faa904`) **plus one follow-on fix.** The first a11y
  run after the colour change came back **794 passed, 1 failed**:
  `alert--variants` (uzh) reported `color-contrast`. Cause: `ui/alert.tsx`
  rendered destructive descriptions at `text-destructive-text/90`, and Berry at
  90% over the `#ffdbcc` tint is **4.39:1** — under AA, where full opacity is
  4.86:1. The other variants fade `text-foreground`, which is near-black and
  survives the fade; fading an already mid-tone colour is the actual defect.
  The fade is removed for the `error` and `destructive` variants.
  This is the zero-waiver inventory doing exactly its job, and it means the
  hue choice was right but incomplete: no Berry rung darker than `#bf0d3e`
  exists in the ladder today, so the fade had to go rather than the hue.
  **The rerun is green: 795 passed, inventory back to exactly zero.**
- **Slice 5 — done.** The delta table is derived mechanically:
  a script compares the set of class tokens per component between `v4.1.8` and
  `HEAD`. Result: **27 of 67 exported components changed classes**, 13 are new
  in v5. The old text claimed the delta was two components. Note that
  `MIGRATION.md:87`'s "colors, spacing, and layout are unaffected" was narrower
  than the review implied — it scopes to the alpha.4 → alpha.5 root-sync change
  and is true of it. It now points at the new section so it cannot be
  over-read. Rows are worded as things to verify rather than as asserted
  outcomes: the token-set method establishes *which* components moved, not how
  they now look. `Countdown` / `CycleCountdown` show `+24 -0`, which means the
  extractor found only added literals, so those two rows say "verify rendering
  end to end" instead of naming a specific restyle.

- **Visual regression — run and re-baselined** (`871f9c2c2`). The first pinned
  container run failed on `text-field-error-uzh`; the diff image showed only
  the `aria-invalid` border and the error icon, both painted by
  `--theme-destructive-text`. Regenerating updated exactly four snapshots
  (`text-field-error-uzh`, `user-notification-error-uzh`, `alert-variants-uzh`,
  `alert-variants-neutral`), each mapping to a surface this branch touched.
  `modal-open` is unchanged in both themes, which is the evidence that slice 1
  leaves a modal that *has* actions alone. Full suite: 23 passed.

**Not started: slices 0 and 6.** Slice 6's step 1 needs slice 0's link loop.
The candidate set is small — the whole library uses 26 `sm:` and 18 `md:`
variants — so the enumeration is tractable, but which of them actually lose
cannot be determined without a real consumer stylesheet in the cascade.

### Commands for slice 0, when it runs

```
cd packages/design-system && pnpm build && pnpm pack
# then, in the Klicker worktree on rs/ds-v5-alpha5-upgrade, point the
# @uzh-bf/design-system dependency at the tarball with a file: specifier
```
The tarball must sit where the running devpod container can read it.

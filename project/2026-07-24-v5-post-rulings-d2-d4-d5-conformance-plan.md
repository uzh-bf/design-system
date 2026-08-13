# Plan — v5 post-rulings D2 + D4 + D5 conformance

## Identity

- Date: 2026-07-24
- Base: `83cfea3` (`v5-roadmap-refresh`)
- Branch: `anja-zgraggen-finalize-v5-conformance`
- Scope: the next unblocked post-rulings slice only
- Release posture: npm release remains held; no publish, tag, merge, or push

## Goal

Implement the recorded rulings that are now unblocked:

- **D2:** use Semibold 600 for the v5 `Header` components.
- **D4:** keep the official UZH status hues, pair them with dark text on their
  brand tints, measure the resulting contrast, and retire the UZH
  color-contrast waiver while retaining only the neutral debt.
- **D5:** replace the UZH primary mid-ramp with the official Blue Shade 2/3/4
  values recorded by the repository audit; do not reconstruct or invent values.

Preserve the existing composite and public API surface. Do not change frozen
legacy header packages, add font binaries, or broaden this slice into unrelated
conformance work.

## Repository evidence

- `project/2026-07-18-v5-production-readiness-roadmap.md` records D2 as
  `font-semibold`, D4 as dark text on official brand tints, and D5 as official
  Blue Shade 2/3/4.
- `project/2026-06-15-v5-design-reference-conformance-audit.md` records the
  official UZH primary ladder: Blue 1 `#BDC9E8`, Blue 2 `#7596FF`, Blue 3
  `#3062FF`, Blue 4 `#001E7C`, Blue 5 `#001452`; this slice maps the existing
  `primary-40/60/80` mid-ramp to Blue Shade 2/3/4 and leaves the existing
  base/tint tokens outside the ruling unchanged.
- The same audit and `themes.css` record the UZH status hues and light tints:
  success `#7CA023`/`#ECF6D6`, warning `#FFC845`/`#FFF4DA`, and info
  `#1EA7C4`/`#DBF4F9`. The status foreground pairing uses the existing design
  near-black `#111111`.

## Slices

### S1 — D2 heading weight

- Change only the v5 `packages/design-system/src/Header.tsx` heading utilities
  from `font-bold` to `font-semibold`.
- Leave the frozen `packages/header-react` and custom-element packages alone.

### S2 — D4 status pairings and waiver ratchet

- Set UZH status foregrounds to dark text and ensure destructive solid surfaces
  consume the semantic destructive foreground token rather than hard-coded
  white.
- Add the missing generated destructive-foreground color alias if required by
  the existing token pattern.
- Make the a11y allowlist theme-aware, remove the UZH color-contrast waiver,
  and retain the neutral waiver until that debt is addressed.
- Verify the full documented `tests/a11y` suite and confirm no UZH
  `color-contrast` markers remain.

### S3 — D5 official primary mid-ramp

- Update the fixed UZH blue `40/60/80` palette entries consumed by the UZH
  semantic ramp to the repository-sourced Blue Shade 2/3/4 values.
- Verify components already consuming the semantic mid-ramp (including
  Workflow and Switch) in both themes; do not alter composites or invent
  additional palette tokens.

## Validation and evidence

- Existing documented a11y suite (`tests/a11y`) with the repository's normal
  build path.
- Existing TypeScript check (`tsc`) and Prettier check/format validation.
- Browser evidence from the existing Ladle/Playwright setup: the full suite
  rendered all 766 stories across both themes; changed status stories pass
  without an unwaived serious/critical contrast finding. Static CSS inspection
  confirms the Header utilities and repository-sourced primary values.
- Measured WCAG AA contrast for the changed UZH light-theme pairings:
  `#111111` on success `#7CA023` = **6.21:1**, success tint `#ECF6D6` =
  **16.83:1**; warning `#FFC845` = **12.23:1**, warning tint `#FFF4DA` =
  **17.27:1**; info `#1EA7C4` = **6.64:1**, info tint `#DBF4F9` =
  **16.47:1**; destructive orange `#FC4C02` = **5.55:1**, destructive tint
  `#FFDBCC` = **14.62:1**. Compare the a11y marker set before/after. Do not
  claim completion if the UZH values or implementation scope cannot be proven
  from repository sources.

## Progress

- 2026-07-24: branch inspected at `83cfea3`; referenced local handoff file is
  absent from this worktree and repository history. Scope is therefore anchored
  to the explicit D2/D4/D5 request and the committed roadmap/audit evidence.
- 2026-07-24: implemented D2, D4, and D5. The a11y allowlist now distinguishes
  theme while retaining only the neutral contrast waiver; all 766 documented
  a11y cases pass with no UZH contrast markers. TypeScript check passes.
  Browser evidence came from the Ladle/Playwright a11y run; the detached
  preview endpoint did not return a response reliably and was not used as
  completion evidence.

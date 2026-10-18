# UZH Corporate Design is a reference, not a constraint

Status: Accepted (2026-08-19)

The official UZH Corporate Design manual specifies a content website — teasers,
hero blocks, alternating section backgrounds, 18px inline links, pill buttons at
`border-radius: 100px`, and input focus expressed as a border-colour change.
This library builds dense application interfaces: dashboards, tables, and forms.
The project has chosen to treat the manual as a reference rather than a
specification for this application toolkit: the palette and Source Sans 3 carry the visual
relationship to UZH, and geometry, density, control sizing, type scale, and
focus affordance are the design system's own, decided on application
ergonomics.

The corollary is that the colour families are the part that must stay faithful.
Where a legacy `uzh-*` family has an official counterpart, it takes the official
values; where it has none, it stops carrying the `uzh-` prefix rather than
implying brand backing that does not exist.

## Considered options

Literal conformance was rejected on two grounds. It costs the information
density the library exists to provide, and the manual's focus model — a 1px
border-colour change with no ring — is a weak indicator that would likely fail
the WCAG 2.2 focus-appearance criterion, against an accessibility inventory this
repository pins at zero serious and critical violations with no waivers.

A middle posture, binding on palette and typography while freeing geometry,
would produce approximately the same application design. The chosen posture
records the project's design decision; it establishes neither an institution-wide
exemption nor institutional approval.

## Consequences

- Buttons keep the 6px radius, the 32/40/48 control ladder, and the app-sized
  type scale (h1 24px). These are decisions, not omissions, and a future
  conformance review should not reopen them as defects.
- The focus ring stays a ring. `--default-ring-color` is aligned to the ring
  token for internal consistency, not for conformance.
- Weight 700 remains in the type scale. The manual's 400/600 web restriction
  does not apply here.
- The `uzh` dark theme is unsupported and outside the current accessibility and
  visual-regression qualification. The CSS stays in place for compatibility;
  its presence does not establish that it is accessible or approved for use.
- Realigning the colour families is a visible change at consumer call sites —
  1,500 `uzh-*` occurrences in the reference consumer, 646 of them on families
  whose values move. It is scheduled as a token-model change before 5.0.0, not
  as a cleanup.
- Realigned families take official names (`uzh-orange`, `uzh-gold`, `uzh-apple`,
  `uzh-cyan`), with the legacy names surviving as deprecated aliases through 5.x
  and removed in 6.0. Consumers therefore see a colour change at GA but no
  identifier change, and rename on their own schedule.
- The two families with no official counterpart move to a `df-` prefix
  (`df-grey`, `df-darkgreen`). The prefix carries the meaning: these are house
  colours, and nothing about them should be read as UZH brand.

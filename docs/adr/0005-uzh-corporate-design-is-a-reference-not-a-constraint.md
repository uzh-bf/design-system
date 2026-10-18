# UZH-inspired design for dense applications

Status: Accepted (2026-08-19)

Source descriptions corrected 2026-10-18; the accepted application-design choices remain in place.

The [official UZH colour manual](https://cd.uzh.ch/dam/jcr:1af76e91-0421-4647-b55a-cc15e1966dfb/uzh-corporate-colors-manual.pdf)
defines the corporate palette. The
[Frontend Styleguide 2.10.0](https://www.frontend.uzh.ch/prod/releases/2.10.0/index.html)
provides web component patterns, including pill buttons and a dedicated
[Flyingfocus keyboard indicator](https://www.frontend.uzh.ch/prod/releases/2.10.0/components/bootstrap/_accessibility/Flyingfocus/Flyingfocus.html).
This library builds dense application interfaces: dashboards, tables and forms.
The project adapts UZH brand elements to that setting: the palette and Source
Sans 3 carry the visual relationship, while geometry, density, control sizing,
type scale and per-control focus indicators follow application ergonomics.

The corollary is that the colour families are the part that must stay faithful.
Where a legacy `uzh-*` family has an official counterpart, it takes the official
values; where it has none, it stops carrying the `uzh-` prefix rather than
implying brand backing that does not exist.

## Considered options

Literal reproduction of the website patterns was rejected because it would
reduce application information density. The project keeps per-control focus
indicators for its controls. The earlier description of official focus as only
a 1px border-colour change was incorrect: the styleguide includes Flyingfocus,
and its input focus also changes the background and border. No accessibility
verdict on that official implementation follows from this comparison.

A middle posture, binding on palette and typography while freeing geometry,
would produce approximately the same application design. The chosen posture
records the project's design decision; it establishes neither an institution-wide
exemption nor institutional approval. The [UZH Web-CD policy](https://www.kommunikation.uzh.ch/de/web/policies/cd.html)
also covers non-CMS websites. Strict CD conformance and any permitted departures
must be established for the affected application separately.

## Consequences

- Buttons keep the 6px radius, the 32/40/48 control ladder, and the app-sized
  type scale (h1 24px). These are decisions, not omissions, and a future
  conformance review should not reopen them as defects.
- The focus ring stays a ring. Phase 2 will align `--default-ring-color` to the
  ring token for internal consistency; the current source still uses generic
  Tailwind blue for bare rings.
- Weight 700 remains in the application type scale by project choice. The
  official font specimens use Regular and Semibold faces; this library also
  renders other weights from its variable font.
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

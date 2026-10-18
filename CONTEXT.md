# Design System

The shared UI library for UZH DF applications — KlickerUZH, the Thesis Platform,
and the Game-Based Learning suite. It builds dense application interfaces, not
content pages, and that distinction decides most of its visual vocabulary.

## Language

### Sources of visual authority

**UZH Corporate Design manual**:
The official UZH brand specification, covering the colour families, typeface,
and the uzh.ch content-site component patterns. A reference for this library,
adapted to dense application interfaces by the project's design decisions — see
`docs/adr/0005`. Those decisions establish neither an institution-wide exemption
nor institutional approval.
_Avoid_: CD guidelines, the styleguide, the brand manual

**UZH DF Design System bundle**:
An AI-generated prototyping skill that reconstructs this library from its own
public source. Useful as a description of intent; never authoritative, and known
to contradict both the manual and itself on colour.
_Avoid_: the redesign bundle, the spec, DESIGN.md

### Colour

**Colour family**:
A named hue with a five-rung ladder, addressed as `-100` through `-20`. The
library's unit of colour vocabulary; consumers write family rungs directly, so
a family's values are public API.
_Avoid_: palette, ramp, scale, colour set

**Rung**:
One step of a family's ladder. `-100` is the darkest saturated value usable as a
fill or foreground; `-20` is the lightest tint. Rungs are chromatic values taken
from the manual, never opacity fades of the base.
_Avoid_: shade, step, tint level

**Official family**:
A colour family whose rungs come from the UZH Corporate Design manual: Blue,
Cyan, Apple, Gold, Orange, Berry. Carries the `uzh-` prefix.
_Avoid_: brand colour, corporate colour

**House family**:
A colour family with no counterpart in the manual, kept because consumers depend
on it. Carries the `df-` prefix precisely so it does not read as a brand claim.
Phase 2 will introduce `df-grey` and `df-darkgreen`; the current source still
uses the legacy `uzh-grey` and `uzh-darkgreen` names.
_Avoid_: custom colour, extra colour, off-palette family

**Status set**:
The four semantic status hues — info, success, warning, error — each drawn from
one official family as fill at `-20`, accent at `-100`, and text at the family's
darkest rung.
_Avoid_: alert colours, semantic colours, feedback colours

### Naming planned for Phase 2

These mappings are settled design decisions and are not yet implemented.
When Phase 2 lands, the legacy identifiers will remain deprecated aliases
through 5.x and will be removed in 6.0.

**`uzh-red`** → `uzh-orange` · **`uzh-yellow`** → `uzh-gold` ·
**`uzh-lightgreen`** → `uzh-apple` · **`uzh-turqoise`** → `uzh-cyan` (also a
spelling fix) · **`uzh-grey`** → `df-grey` · **`uzh-darkgreen`** →
`df-darkgreen`

### Component layers

**Primitive**:
A component under `ui/`, styled directly and treated as the canonical
implementation of its control.
_Avoid_: base component, shadcn component, low-level component

**Legacy wrapper**:
A component outside `ui/` that predates the primitive layer and renders a
visibly different control from the primitive it shadows. Consumers import these
almost exclusively, which is why defects concentrate here.
_Avoid_: the old components, the compat layer

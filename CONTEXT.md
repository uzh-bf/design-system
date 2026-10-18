# Design System

The shared UI library for UZH DF applications — KlickerUZH, the Thesis Platform,
and the Game-Based Learning suite. It builds dense application interfaces, not
content pages, and that distinction decides most of its visual vocabulary.

## Language

### Sources of visual authority

**UZH Corporate Design manual**:
The official UZH palette reference. Web component patterns and functional colours
are specified separately in the [UZH Frontend Styleguide](https://www.frontend.uzh.ch/style/).
This library adapts UZH brand elements to dense application interfaces through
the project's decisions — see `docs/adr/0005`. Those decisions establish neither
an institution-wide exemption nor institutional approval.
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
One step of a family's ladder. `-100` is its selected accent and `-20` its light
tint; the labels do not guarantee a lightness ordering. The retained Blue `-80`
is darker than Blue `-100`. Official families use selected published swatches;
Phase 2 corrects the remaining legacy values and identifies the house families.
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
The four application roles — info, success, warning, error — using hues drawn
from official families. Their semantic assignment and fill/accent/text pairings
are project decisions, distinct from the official web templates' functional
green/red mapping. Phase 2 coordinates the tokens and verifies the intended pairs.
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

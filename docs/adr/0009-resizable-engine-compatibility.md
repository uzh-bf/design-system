# Retain legacy resizing while exposing the native Panels 4 recipe

Status: Superseded by [ADR0010](0010-single-native-resizable-contract.md) (2026-10-25).

The following records the earlier dual-engine decision. ADR0010 moves both doors
to native Panels 4 during the breaking v5 release.

Keep `react-resizable-panels` 3.0.6 under its existing dependency name for the
root Resizable family. The raw `./primitives` family uses the official Panels
4.14.8 engine through an internal dependency alias. Export its `Layout`,
`useDefaultLayout`, `useGroupRef` and `usePanelRef` from that same primitive
module, so applications need not import the alias.

This extends ADR0001's distinction between composites and raw primitives. Root
components retain v3 percentage numbers, imperative handles, callbacks, custom
tags, ordering and saved layouts. Primitive components follow the pinned official
shadcn Radix recipe's v4 contracts, including pixel numbers, percentage strings,
layout maps and native refs. Existing primitive consumers must migrate or use
the retained root family. Components from the two families cannot share a group;
the DS performs no conversion of existing root layouts to the v4 persistence format.

A complete v3 facade on v4 was rejected because v4 lacks several v3 contracts;
emulating them would create a maintained resizing facade. Aliasing v3 instead
was also rejected: a synthetic packed probe preserved app/library v3 module
identity under pnpm but split it under npm. Keeping v3 canonical preserved the
tested identity in both. This preserves the existing dependency arrangement,
not a guarantee of deduplication across arbitrary application versions or tools.

Applications using both families can include both engines. Entry and bundle
checks must keep an unused family out of unrelated imports. Directly imported
v4 component implementations can be another module instance; use the complete
DS primitive family and its exported helpers. No custom resizing algorithm,
global provider, or implicit consumer migration is introduced. Removing the
legacy engine in v6 requires its own compatibility decision.

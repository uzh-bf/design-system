# Use one native Resizable contract in breaking v5

Status: Accepted (2026-10-25); supersedes [ADR0009](0009-resizable-engine-compatibility.md).

Both root and primitive Resizable exports use the canonical shadcn Radix recipe
and exact `react-resizable-panels@4.14.8`. The root re-exports the existing
primitive implementation, including its layout/ref helpers and public types.
Retain the UZH divider, grip and focus styling. Remove the v3 engine and private
v4 alias.

The user selected upgrading throughout the breaking v5 release. Keeping a second
engine until v6 would preserve a duplicate public contract and prevent mixing the
two DS doors. A v3 facade on v4 would recreate removed upstream behavior. Accept
the native migration now, with explicit guidance for percentage size inputs,
orientation, refs, callbacks, DOM structure and persistence. Layout maps still
contain percentage numbers; panel size inputs and `panel.resize(number)` use
pixels. Keep native component names through both public entries.

Removed v3 contracts are documented rather than emulated. Applications own their
saved layouts and any conversion. The DS adds no storage migration or deletion;
the native hook has a limited legacy-read fallback, which does not qualify all
existing layouts. Use a new persistence ID unless application acceptance proves
reuse. Server-rendered consumers provide identical server-render and hydration
snapshots to the native persistence hook. A browser-availability guard alone can
hydrate with stale geometry; the packed fixture demonstrates an application-owned
cookie snapshot. Direct application imports must declare
matching 4.14.8 and share the same runtime; bounded npm/pnpm fixtures demonstrate
this arrangement without guaranteeing arbitrary dependency deduplication.

This decision changes Resizable only. It does not remove Formik, broaden the
Radix-only scope, migrate consumer repositories or qualify an integrated GA
candidate. Existing lower draft proof remains historical evidence of ADR0009's
earlier contract; the unified candidate requires fresh package and browser proof.

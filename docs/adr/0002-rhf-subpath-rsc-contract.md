# RHF client entry and server-safe v5 public doors

Status: Accepted (2026-08-10)

v5 keeps both existing component doors—`.` and `./primitives`—free of
React Hook Form runtime and declaration edges, preserves emitted `use client`
boundaries, and exposes the RHF `Form` binding and `Rhf*` wrappers only through
the explicit client entry `./react-hook-form`. `react-hook-form` becomes an
optional peer for root-only consumers, while consumers of the dedicated entry
must install it. The decision supersedes ADR 0001's deferred per-feature split
because the packed alpha.3 root currently fails a Next App Router Server
Component build by reaching RHF through both the root and primitive graphs.

## Consequences

- Removing root `Form`/`Rhf*` and primitive `ui/form` exports is a deliberate
  pre-GA public break; migration documentation must point to
  `./react-hook-form`.
- The root's existing custom `FormLabel` remains distinct from the RHF-aware
  `FormLabel` exported by the dedicated entry.
- A real packed Next App Router fixture must prove the build and hydration
  boundary before this package is ready for review.

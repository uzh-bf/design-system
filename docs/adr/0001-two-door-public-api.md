# 0001 — Two-door public API for v5

Status: Superseded in part by ADR 0002 (2026-08-10)

ADR 0002 overrides this record's RHF-specific two-door and required-peer
clauses. The naming, compatibility, and raw-primitive decisions below remain
in force; RHF runtime and declaration exports now live behind
`./react-hook-form`, and `react-hook-form` is an optional peer for root-only
consumers.

## Context

Through v4 and the early v5 alphas the package exposed the same shadcn/Radix
primitives two or three times over: once `Shadcn*`-prefixed at the root, once
under a `./ui` subpath, with the form wrappers under `./forms`. The names and
subpaths diverged, so consumers could not tell which import was authoritative,
and the duplication had to be maintained by hand.

## Decision

At the time of this decision, v5 exposed exactly two component doors:

- root `.` = the opinionated UZH **composites** (PascalCase, config-prop APIs),
  including the form wrappers that used to live under `./forms`;
- `./primitives` = the **raw shadcn/Radix primitives** under their natural names,
  a flat `export *` of `src/ui/*`.

The raw primitives keep their natural names rather than being re-prefixed. This
is a hard break: no back-compat aliases or shims for the old `Shadcn*` names or
the removed `./ui` / `./forms` subpaths (FE7). All custom composites are kept in
v5 even at zero current consumers (FE8); dropping any is a v6 question.
`react-hook-form` is a **required** peer dependency, not optional, because the
`Form` binding is re-exported from the root entry and is therefore resolved
whenever that entry loads.

## Consequences

- Twelve natural names (`Button`, `Checkbox`, `Collapsible`, `FormLabel`,
  `Label`, `Progress`, `Select`, `Slider`, `Switch`, `Table`, `Tabs`, `Tooltip`)
  exist at **both** doors as different components. TypeScript does not error on
  the wrong door, so the swap is silent. This is the accepted cost of natural
  names on both sides; `MIGRATION.md` carries the door-selection rule and the
  full collision list.
- Consumers that only use composites still pull `react-hook-form` at load time.
  A per-feature build split (e.g. a dedicated `./form` door) that would restore
  true optionality is deferred to a later release.
- Re-prefixing the primitives, or shipping compatibility shims, was rejected:
  both re-introduce the duplication this decision removes.

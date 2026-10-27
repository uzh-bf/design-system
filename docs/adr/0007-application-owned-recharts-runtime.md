# Applications supply the supported Recharts runtime

Status: Accepted (2026-10-23); implementation belongs to the later chart package

The Recharts 3 migration will make Recharts a required peer dependency, with a development dependency for library verification, so applications composing charts directly can supply the supported runtime. Preserve existing chart import paths and direct Recharts composition with the library's container, tooltip, legend and theme support. This creates an installation requirement for every design-system consumer, including applications without charts; no optional installation, new subpath or exact supported version range is promised by this decision.

## Consequences

The chart package must select a tested Recharts 3 range, document installation and coordinate consumer versions. A peer declaration alone does not prove one compatible runtime: verify dependency resolution and actual chart composition in a packed consumer. Keeping a regular dependency was rejected because the library and applications would continue owning separate version choices; making charts optional would require additional entry-point and declaration proof outside this ruling. The RHF parity package does not change Recharts dependencies.

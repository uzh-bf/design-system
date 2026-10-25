# Own the pinned native chat runtime

Status: Accepted (2026-10-25).

The design system owns exact `@shadcn/react@0.3.1` as a regular dependency for
MessageScroller and Questionnaire. This keeps the usual DS install complete,
while reusing the official headless engines through both public entries instead
of implementing another scroll or form engine. A peer dependency would transfer
installation and version selection to every application.

Applications mixing direct native imports with DS parts must explicitly declare
the same version and resolve one shared context runtime. The bounded npm/pnpm
packed fixtures verify that composition; arbitrary duplicate installations are
not supported. Reconsider the pin or dependency ownership when upstream changes
its public engine contract or a future DS major revisits this requirement.
The native package has no Base UI or React Aria dependency, so this decision
preserves [ADR0008](0008-radix-compatible-shadcn-scope.md).

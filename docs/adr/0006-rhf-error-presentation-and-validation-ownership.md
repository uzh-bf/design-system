# RHF owns validation timing; adapters default to inline errors

Status: Accepted (2026-10-23); implementation pending

All RHF adapters will default to inline error messages, with tooltip presentation available explicitly, so recovery guidance remains visible. Adapters will display errors already produced by RHF, including configured on-change validation and manual/server `setError` calls, without an additional touched-or-submitted gate; explicit caller suppression remains available. This deliberately changes the four existing RHF adapters as well as the seven planned adapters before v5 GA, superseding the W3 presentation and timing rules while preserving Formik presentation and validation behavior.

## Consequences

Applications own validation modes, rules and resolvers. Adapters own consistent association of labels, descriptions, invalid state and one error message, without introducing another validation policy or mandatory provider. Inline messages consume more layout space; applications preferring the previous presentation can select tooltip mode, but validation timing follows RHF in either mode. The optional client-entry boundary in ADR0002 remains authoritative.

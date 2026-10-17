# shadcn field composition assessment

Compared local Field and InputGroup source against shadcn/ui revision `4dbe072997507545dbf648ab45662d9c1e5b5b56` on 2026-09-06. Source was retrieved through GitHub's contents API at that immutable revision; no CLI overwrite was performed.

| Component  | Comparison and decision                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Field      | Retain local density and theme choices. Local FieldGroup uses gap-4 rather than upstream gap-7; Field uses gap-1.5 rather than gap-3. Description and error text use local smaller typography, and errors use the contrast-oriented destructive-text token. The composition API, orientation variants, error deduplication and alert semantics remain available. Reuse FieldDescription and FieldError in the planned additive field UX layer where their element semantics fit. |
| InputGroup | Retain the current primitive. Comparison shows the same control/addon/button composition and focus/error behavior, with repository-local imports and formatting. Its fixed height, border ownership and SVG sizing make wholesale legacy TextField migration a separate public layout change. Document direct primitive use rather than replacing wrappers.                                                                                                                      |

Immutable sources: [Field](https://github.com/shadcn-ui/ui/blob/4dbe072997507545dbf648ab45662d9c1e5b5b56/apps/v4/registry/new-york-v4/ui/field.tsx), [InputGroup](https://github.com/shadcn-ui/ui/blob/4dbe072997507545dbf648ab45662d9c1e5b5b56/apps/v4/registry/new-york-v4/ui/input-group.tsx).

The repository already includes Field, InputGroup, Empty, Spinner, Item, Kbd and ButtonGroup. New capability does not require duplicate primitives. The next field layer adds useful descriptions, optional inline errors and robust description associations while retaining existing value handlers, label positioning and styling hooks.

Keep `components.json` pointed at `src/tailwind.css`. Earlier shadcn CLI discovery found a nested RSC fixture stylesheet; autodetection is not authority to change the package's actual CSS input. Preserve local neutral/uzh tokens and do not run a blanket component overwrite.

This comparison covers the two relevant field composition sources. It does not claim every vendored shadcn component matches upstream or that manual assistive-technology testing has been completed.

## Current registry check — 2026-10-17

The public new-york-v4 registry was checked again for Field and InputGroup, alongside current Context7 form-composition documentation. Field retains the same description/error API, error deduplication and alert behavior. Upstream now imports useMemo directly; local density, typography and destructive-text contrast choices remain deliberate. InputGroup retains the same control/addon composition, focus/error selectors and textarea structure, apart from import and class ordering. No source overwrite is required.

- `field`: [registry source](https://ui.shadcn.com/r/styles/new-york-v4/field.json), source SHA-256 `4a4d17fcb933513f637f9f7e2daf5d8348f7de086b29738337dec7e6dd1819a0`.
- `input-group`: [registry source](https://ui.shadcn.com/r/styles/new-york-v4/input-group.json), source SHA-256 `e379899ac50d6cabc9d9eb1668f265176951c62b1fe83a6f23ee97fe8074d526`.

These hashes identify the dated source comparison; the earlier immutable GitHub revision remains recorded above. They do not establish parity for other components.

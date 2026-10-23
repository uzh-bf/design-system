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

## Phase 2 touched-source check — 2026-10-18

Current primary docs were retrieved for [Radix Badge](https://ui.shadcn.com/docs/components/radix/badge), [Tooltip](https://ui.shadcn.com/docs/components/radix/tooltip), [Table](https://ui.shadcn.com/docs/components/radix/table) and [Tabs](https://ui.shadcn.com/docs/components/radix/tabs) using the shadcn CLI docs command and direct page retrieval. A current CLI dry run names the four existing files and their existing Radix dependencies; no file or dependency was installed or overwritten. Local `components.json` remains the authority for registry/style and `src/tailwind.css` input.

The configured `default` source comparison is not an automatic migration target: it presents older forwardRef-style component structure, while local components use explicit data slots and newer composition. Local container badge, readable bounded tooltip, wrapping table cells and full-width tabs are deliberate Phase 2 design choices. Retain caller class precedence and local theme contracts, compare relevant API/composition seams and use behavioral/packed evidence. A copied primitive is not synchronized by npm updates. This bounded comparison does not certify every vendored primitive or require changing registry style.

Tailwind primary documentation confirms that source detection controls emitted utilities and that `@theme inline` references runtime variables. A separate packed-consumer experiment found missing palette compiler metadata; the Phase 2 plan records the required public-behavior proof. No consumer package-source scanning or new public stylesheet export is assumed.

## Current source and dependency qualification — 2026-10-18

A further bounded comparison used upstream `new-york-v4` Badge, Tabs and Table source from `shadcn-ui/ui` main at `daaf156ee00ed91cc7e6bdd937c1b4973152d141`, plus current Context7 Tooltip source. Upstream retains Radix/Slot composition, caller class merging and portaled tooltip content. Its default badge remains solid, table body cells remain nowrap, and tabs now expose orientation/list variants. Our container badge, wrapping body cells, full-width underline track and readable tooltip are intentional application choices. No wholesale source synchronization or new variant API is part of this package.

The fresh installed-workspace production audit is **not clean**:8 moderate and 17 high advisory records, 0 critical. Most paths belong to the retained Parcel workspace; the design-system importer also has PostCSS/nanoid and source-map-js reports. This is a dated dependency qualification finding, not proof of application exploitability or a completed security audit. Resolve compatible patched locks and assess the legacy Parcel workspaces before GA; do not present the October 17 compatible refresh as current advisory clearance. No audit exception or dependency policy was weakened here.

The version query still identifies deferred major migrations for DayPicker, Resizable Panels, Recharts, Sonner, Zod, TypeScript, Vite and ESLint, alongside newer compatible tooling releases. Pinned `wanted` versions equal the installed values, which does not mean they are the newest available. Preserve the validated RHF 7.59.0/7.90.0 boundary and qualify upgrades as separate changes. The raw registry/audit receipts stay under the existing ignored review directory.

## Full Radix scope and release review — 2026-10-23

The user selected the **full official Radix catalog and auxiliary dependencies**
as v5 GA scope. Earlier focused Field/InputGroup/default comparisons are useful
history; they do not qualify this larger contract. Required capabilities may no
longer be deferred merely because their APIs are additive or need an auxiliary
major migration. The [GA roadmap](2026-08-10-v5-ga-readiness-roadmap.md#current-execution-index--2026-10-23)
owns ordering and acceptance; this section owns the upstream comparison boundary.

### Release and source identity

The npm registry and [latest official release](https://github.com/shadcn-ui/ui/releases/tag/shadcn%404.22.1)
agree on CLI **4.22.1**, published October 18. Its patch fixes `add --all` and
component-picker filtering for the project's style. CLI version is not a
component-library version: freeze the catalog separately at
[`3d98900e9b73c45f035f8109e9d41ba6a51685e7`](https://github.com/shadcn-ui/ui/tree/3d98900e9b73c45f035f8109e9d41ba6a51685e7/apps/v4/registry/bases/radix),
main as checked October 23. The source tree was retrieved through host `gh`.
The pinned CLI's read-only `docs` command resolved current Radix Chart, Combobox,
Field, Direction, Code Block and Trace pages; those pages and Context7 RHF
composition documentation were read. No component install, preset switch,
source overwrite or manifest/lock change occurred.

The [current changelog](https://ui.shadcn.com/docs/changelog) adds planning-relevant
capabilities beyond the older primitives: packaged `cn`, Questionnaire,
messaging components, Trace/Code Block and AI composition patterns. The
[AI Elements release](https://ui.shadcn.com/docs/changelog/2026-10-ai-elements)
describes patterns composed from the components, without a separate package to
install. Include their application seams in coverage; this does not require an
AI provider/backend or paid model calls in the design system.

### Catalog inventory and compatibility

The pinned Radix `ui/` directory contains **63 TSX sources**. Local `src/ui/`
contains 53, with 52 shared filenames and the additional retained `form` module.
The 11 missing matching primitives are:

| Group                       | Missing matching primitives                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| Inputs and direction        | `combobox`, `native-select`, `direction`                                         |
| Messaging and clarification | `attachment`, `bubble`, `marker`, `message`, `message-scroller`, `questionnaire` |
| Agent/code presentation     | `code-block`, `trace`                                                            |

A custom root Combobox or a shared filename does not establish current primitive
API equivalence. The 52 shared names still need public exports/subcomponents,
props/variants/orientation, composition, refs, keyboard/RTL and state comparison.
Examples include Tabs orientation/list variants, Calendar navigation/types,
Chart tooltip/legend types and Resizable refs/persistence. Record an intentional
visual adaptation separately from a missing functional capability. Preserve the
neutral/UZH themes, existing caller class precedence and legacy exports.

Before implementing each package, close its rows in a capability matrix with:
upstream path/revision, local counterpart/entry, API delta, dependency owner,
retained compatibility, adaptation and proof. The inventory must also account for
Data Table and Date Picker recipes, RHF composition, hooks/highlighter utilities,
official blocks and AI patterns. Support composition and document app-owned
routing/data/AI seams; whole demo applications need not become package exports.
Check upstream drift once at final qualification and record the disposition;
continuous changes to main do not reset the finite implementation scope.

### Auxiliary dependency matrix

These requirements come from the pinned Radix UI/hooks/lib registry manifests.
Local versions below are source declarations at DS `870879614`, not proof of
compatibility with current upstream source. Unversioned upstream requirements
must resolve to exact tested versions during the implementing package.

| Official surface                 | Pinned registry dependency                                                          | Local declaration and next disposition                                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calendar/Date Picker             | `react-day-picker@latest`, `date-fns`                                               | 9.14.0 / 4.4.0; assess current Calendar API and DayPicker 10 before GA                                                                                                                |
| Chart                            | `recharts@3.8.0`                                                                    | 2.15.4; Recharts 3 migration and current Chart type/keyboard proof required                                                                                                           |
| Resizable                        | `react-resizable-panels`                                                            | 3.0.6; compare current v4 component/ref/persistence contracts                                                                                                                         |
| Sonner                           | `sonner`, `next-themes`                                                             | 1.7.4 / 0.4.6; qualify current toast behavior, announcements and themes                                                                                                               |
| Carousel / Command               | `embla-carousel-react` / `cmdk`                                                     | 8.6.0 / 1.1.1; verify current composition and interactions                                                                                                                            |
| Drawer / OTP                     | `vaul` / `input-otp`                                                                | 1.1.2 / 1.5.0; verify overlays, keyboard, paste and controlled state                                                                                                                  |
| Combobox                         | `@base-ui/react`                                                                    | Absent; current official Radix-catalog Combobox uses Base UI internally, without implying a full second backend                                                                       |
| Message Scroller / Questionnaire | `@shadcn/react`                                                                     | Absent; assess headless ownership, state/serialization, scroll anchoring and accessibility                                                                                            |
| Highlighted code hook            | `shiki`                                                                             | Absent; assess async highlighting, bundles, SSR/client boundaries and copy interactions                                                                                               |
| `utils` / class composition      | `cn`                                                                                | Absent; local helper wraps clsx/tailwind-merge. Qualify a compatible migration or adapter, including class precedence and consumer-defined theme groups                               |
| Data Table / RHF recipes         | TanStack Table; RHF, resolvers and a supported schema library as used by the recipe | RHF is optional at the dedicated entry. Table/resolvers are not direct dependencies today; assign recipe/application ownership before adding packages. Zod 4 is not assumed mandatory |

Fresh registry metadata reports Recharts 3.10.1, DayPicker 10.0.2, Panels 4.14.8,
Sonner 2.0.8, `cn` 0.5.0, `@base-ui/react` 1.9.0, `@shadcn/react` 0.3.1 and
Shiki 4.5.0. These are dated available versions, not automatic installation
targets. The exact registry Chart pin remains 3.8.0. Select and test each migration
against the required API, consumer dependency-age rules and package budgets.
First-party `@shadcn/helpers` (currently 0.3.0) is a demonstration helper to
inventory where examples need it, not an unconditional runtime dependency.

### Forms, accessibility and package acceptance

The [official RHF guide](https://ui.shadcn.com/docs/forms/react-hook-form) composes
Controller with Field, accessible label/description/error elements and invalid
state on both field and input. Keep our existing Form API for compatibility;
add current Field recipes and complete all ten Formik-equivalent RHF families.
Keep RHF runtime and declaration dependencies out of raw primitives and the
root RSC boundary, preserving the existing Formik compatibility exports.

For each component family, use behavior/type checks at the stable seam plus
packed-consumer proof. Qualify keyboard focus/escape, refs, required/disabled/error
semantics, RTL, reduced motion and relevant pointer/mobile behavior. Messaging
and code additionally need synthetic streaming/scroll, async/copy and validation
journeys. No blanket assertion that upstream code is accessible substitutes for
these checks or actual outstanding screen-reader/Safari/device runs.

This is a source/release inventory and acceptance design, not a completed API
parity audit or implementation. The October 18 audit counts above are historical;
the [October 19 qualification plan](2026-10-19-v5-ga-qualification-plan.md)
records later compatible remediation and six remaining tooling advisories.

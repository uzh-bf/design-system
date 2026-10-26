# UZH DF Design System

This design system is created and maintained by the IT dev-ops team at the Teaching Center of the Department of Finance at the University of Zurich. It simplifies the shared use of commonly used components in our web-development projects with corporate colors already included.

## Theming (v5)

As of v5 the components support two themes, selected via a `data-theme` attribute:

- **`neutral`** (default) — de-branded, shadcn-like. Active on `:root` with no setup.
- **`uzh`** — the UZH corporate-design theme (UZH blue/red, Source Sans 3).

Switching is a pure CSS-variable cascade (no JS engine). UZH apps opt in with
`<html data-theme="uzh">` or by wrapping a subtree in `ThemeProvider`:

```tsx
import { ThemeProvider } from "@uzh-bf/design-system";
<ThemeProvider theme="uzh">{children}</ThemeProvider>;
```

**v4 → v5 is a breaking change for UZH apps** (the default is now `neutral`, not
UZH-branded). See [`packages/design-system/MIGRATION.md`](packages/design-system/MIGRATION.md)
for the full upgrade guide, including new exports, props, and variants.

## Prerequisites

- Node.js version 22 (as specified in the project configuration)
- pnpm 12.12.1 for repository development (npm remains supported for consuming the published package)

## Local Development

This project uses a monorepo structure with Turbo for build orchestration and Ladle for component development.

To see how the components look, corresponding `.stories.mdx` files are added for each component and their content can be observed through the Ladle platform, accessible locally on `localhost:61000/design-system` when running:

```bash
# Using pnpm (recommended)
pnpm run dev

# Using npm
npm run dev
```

In addition to the visible component stories (implemented with Ladle), all MDX-story files also contain an extensive summary of the component's properties, including types, default values, and descriptions (as a comment). This part is meant to be scraped by Context7 (https://context7.com/uzh-bf/design-system), generating an importable MCP for the UZH DF design system. After adding new components / making significant changes to the corresponding interfaces, consider updating / re-generating these sections and triggering a new indexing run in Context7.

### Additional Development Commands

```bash
# Build all packages
pnpm run build      # or npm run build

# Run linting
pnpm run lint       # or npm run lint

# Run type checking
pnpm run check      # or npm run check

# Format code
pnpm run format     # or npm run format

# Check formatting
pnpm run format:check   # or npm run format:check
```

## Deployment

Once you want to re-deploy the package with updates, make sure that all linting errors are fixed and all parts of the new or modified component are exported properly.

**Important:** Before pushing or merging content to the main branch, run the build command to ensure that the generated type files are consistent with the component implementations:

```bash
# Using pnpm (recommended)
pnpm run build

# Using npm
npm run build
```

If this is the case, merge (and squash) all your changes into the main branch, pull the branch to your computer and run:

```bash
# Using pnpm (recommended)
pnpm run release:dry
pnpm run release

# Using npm
npm run release:dry
npm run release
```

Once this release command was successful, you can push it to GitHub with the displayed command:

```bash
git push --follow-tags origin main
```

### Automatic Deployments

This repository is configured with automatic deployments:

- **GitHub Pages**: All pushes to the main branch are automatically deployed to GitHub Pages through CI actions, making the component documentation and examples accessible online.
- **NPM Package**: The repository is set up to automatically deploy the package to npm under the following domain: `https://github.com/uzh-bf/design-system/pkgs/npm/design-system`

## Installing the package

As with all npm packages, components from the design-system can be easily installed using either npm or pnpm:

```bash
# Using npm
npm install @uzh-bf/design-system

# Using pnpm (recommended)
pnpm install @uzh-bf/design-system
```

### v5 form composition

Use the package root for standalone `TextField`, `NumberField`, `TextareaField`
and `SelectField`, or `@uzh-bf/design-system/react-hook-form` for the existing
`Rhf*` wrappers. Both support descriptions, merged external `aria-describedby`
references and opt-in `errorDisplay="inline"` validation. Existing tooltip errors
remain the default. See [field guidance](packages/design-system/MIGRATION.md#descriptions-and-inline-validation)
for validation timing, rich descriptions and Formik compatibility.

Custom input addons can use the existing `Field` and `InputGroup` primitives:

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@uzh-bf/design-system/primitives";

<Field>
  <FieldLabel htmlFor="search">Search</FieldLabel>
  <InputGroup>
    <InputGroupInput id="search" aria-describedby="search-help" />
    <InputGroupAddon>⌘ K</InputGroupAddon>
  </InputGroup>
  <FieldDescription id="search-help">Search project names.</FieldDescription>
</Field>;
```

### React Hook Form field adapters

Import RHF adapters from `@uzh-bf/design-system/react-hook-form` and install
its supported `react-hook-form` peer. The root and `./primitives` entries stay
free of RHF runtime and declaration dependencies. Formik remains supported
through v5; removal belongs to v6.

The dedicated entry supports `RhfTextField`, `RhfNumberField`, `RhfSelectField`,
`RhfMultiSelect`, `RhfTextareaField`, `RhfSwitchField`, `RhfPinField`,
`RhfAlphaNumericPinField`, `RhfColorPicker`, `RhfDatePicker` and
`RhfDatetimePicker`. Use a FormProvider (the exported `Form`) or pass
`control` explicitly. Fields retain typed value paths and transformed submit
values; PINs use strings to preserve leading zeros. Schemas and resolvers belong
to the application. Color changes commit on Apply; closing discards staged edits.
Date fields use `Date | undefined`, retaining the application's timezone policy.
Picker reset, external updates and same-value resets discard transient editing
state.

RHF messages now default to inline presentation. Select `errorDisplay="tooltip"`
for the earlier presentation or `hideError` to suppress the message while keeping
invalid state. Validation timing follows the application's RHF settings and
`setError`; adapters no longer add an extra touched/submitted gate. Formik error
presentation and timing retain their existing behavior.

The standalone numeric `PinField` shares its controlled implementation with
Formik and RHF. `Switch` retains its legacy `onBlur` click callback; native
focus-leaving notifications use `onFocusOut`, which the RHF adapter binds to RHF.

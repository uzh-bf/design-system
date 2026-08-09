# @uzh-bf/design-system

React component library for University of Zurich web applications, maintained by
the IT dev-ops team at the Teaching Center of the Department of Finance (UZH). It
pairs shadcn/Radix-based primitives with UZH-aligned composite components and a
dual-theme system: a de-branded `neutral` default plus the UZH corporate-design
`uzh` theme.

> **v5 is a prerelease** (`5.0.0-alpha.x`, published on the npm `alpha` dist-tag);
> the stable line stays on `4.x`. Upgrading from v4? Read
> [`MIGRATION.md`](./MIGRATION.md) first — v5 has breaking changes, including how
> styles are delivered.

## Install

```bash
pnpm add @uzh-bf/design-system@alpha
# or: npm install @uzh-bf/design-system@alpha
```

Runtime libraries are declared as **peer dependencies**, so your app provides
them (`react`, `react-dom`, `react-hook-form`, `formik`, `dayjs`, `lucide-react`,
`class-variance-authority`, `clsx`, `tailwind-merge`, the `@fortawesome/*`
packages, and the Tailwind toolchain). Your package manager reports any that are
missing.

## Prerequisites

- **React 19** (`react`/`react-dom` `^19.1.0`).
- **Tailwind CSS 4** in the consuming app.

## Required: import the styles

Components ship their styling as one precompiled stylesheet. Import it once — in
your app entry or root stylesheet — or components render unstyled:

```ts
import '@uzh-bf/design-system/css'
```

```css
/* …or from your root stylesheet */
@import '@uzh-bf/design-system/css';
```

This stylesheet already contains the design system's utility classes, theme
tokens, and component styles, so you do **not** need to point Tailwind's
`@source` at the package. `@uzh-bf/design-system/preflight.css` is exported
separately if you need the base/reset layer on its own.

> **Upgrading from v4?** If you previously generated the styles by scanning the
> package source with `@source ".../node_modules/@uzh-bf/design-system/src"`,
> that path is no longer shipped — replace it with the `/css` import above. See
> [CSS delivery](./MIGRATION.md#breaking-change-css-delivery) in the migration
> guide.

## Theming

Components support two themes, selected by a `data-theme` attribute:

- **`neutral`** (default) — de-branded, active on `:root` with no setup.
- **`uzh`** — the UZH corporate-design theme (UZH blue/red, Source Sans 3).

Switching is a pure CSS-variable cascade (no JS engine). Set the theme on the
document root:

```html
<html data-theme="uzh"></html>
```

…or wrap a subtree with the provider — use it when you want an in-app toggle via
`useTheme`:

```tsx
import { ThemeProvider } from '@uzh-bf/design-system'
;<ThemeProvider theme="uzh">{children}</ThemeProvider>
```

Document-root theming is the supported and verified mode in v5. See
[`MIGRATION.md`](./MIGRATION.md) for the theming model and its current
limitations.

## Usage

v5 exposes two component doors: the root for opinionated composites, and
`./primitives` for the raw shadcn/Radix primitives under their natural names. The
form wrappers (`FormikTextField`, …) that lived under `./forms` in v4 now come
from the root. The v5 alpha also provides `RhfTextField`, `RhfNumberField`,
`RhfSelectField`, and `RhfMultiSelect` for turnkey React Hook Form fields.

```tsx
import { useForm } from 'react-hook-form'
import { Button, Form, RhfTextField } from '@uzh-bf/design-system'
import { DropdownMenu } from '@uzh-bf/design-system/primitives'

const form = useForm({ defaultValues: { name: '' } })

<Form {...form}>
  <RhfTextField name="name" label="Name" />
</Form>
```

| Entry                                 | Contents                                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@uzh-bf/design-system`               | Custom composites (`Button`, `Table`, `Modal`, `Form`, the `Formik*` fields, and the `Rhf*Field` wrappers) plus the `ThemeProvider` / `useTheme` theming API. |
| `@uzh-bf/design-system/primitives`    | Raw shadcn/Radix primitives under their natural names (`DropdownMenu*`, `Table*`, …).                                                                         |
| `@uzh-bf/design-system/css`           | Precompiled stylesheet (import once — see above).                                                                                                             |
| `@uzh-bf/design-system/preflight.css` | Base/reset layer on its own.                                                                                                                                  |

Some natural names exist at **both** doors as different components (root = custom
composite, `./primitives` = raw primitive). See
[`MIGRATION.md`](./MIGRATION.md) for the full list and the door-selection rule.

## Documentation

Component stories, props, and examples live in the
[repository](https://github.com/uzh-bf/design-system) (Ladle) and are indexed for
Context7 at <https://context7.com/uzh-bf/design-system>.

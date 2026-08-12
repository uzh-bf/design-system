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
them (`react`, `react-dom`, `formik`, `dayjs`, `lucide-react`,
`class-variance-authority`, `clsx`, `tailwind-merge`, the `@fortawesome/*`
packages, and the Tailwind toolchain). `react-hook-form` is an optional peer for
the dedicated RHF entry; install it only when using that entry. Your package
manager reports any missing required peers.

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

Document-root theming is the supported and verified mode in v5. `ThemeProvider`
remains useful for a component subtree, but it does not make nested themes or
portal content a separately verified theme boundary. See [`MIGRATION.md`](./MIGRATION.md)
for the current limitations.

### Complete primary-ramp extension

Consumers may replace the UZH primary family with a design-approved complete
five-step ramp. Import the packaged design-system stylesheet first, then load
the consumer override after it. The six semantic bridges follow the ramp; do
not provide only one primary colour or generate missing steps in application
code.

```css
/* app.css: the design-system import comes first */
@import '@uzh-bf/design-system/css';

:root[data-theme='uzh'] {
  --theme-color-primary: var(--app-primary-100);
  --theme-color-primary-80: var(--app-primary-80);
  --theme-color-primary-60: var(--app-primary-60);
  --theme-color-primary-40: var(--app-primary-40);
  --theme-color-primary-20: var(--app-primary-20);
}
```

The example assumes the app has already defined those app-prefixed variables;
the design system does not own or generate their values.

This extension changes `--primary`, `--ring`, `--sidebar-primary`,
`--sidebar-ring`, `--sidebar-accent`, and `--sidebar-accent-foreground`. The
secondary, status, destructive, font, chart, and other UZH tokens remain owned
by the design system. Application-specific semantic variables should use an
app prefix such as `--app-primary-100`; declarations of generic `--primary`,
`--accent`, or `--destructive` are namespace collisions, not this extension
contract.

## Usage

v5 exposes three component doors: the root for opinionated composites,
`./primitives` for raw shadcn/Radix primitives under their natural names, and
the client-only `./react-hook-form` entry for the RHF binding and field wrappers.
The Formik wrappers (`FormikTextField`, …) that lived under `./forms` in v4 now
come from the root.

```tsx
import { useForm } from 'react-hook-form'
import { Button } from '@uzh-bf/design-system'
import { Form, RhfTextField } from '@uzh-bf/design-system/react-hook-form'
import { DropdownMenu } from '@uzh-bf/design-system/primitives'

type FormValues = { name: string }
const form = useForm<FormValues>({ defaultValues: { name: '' } })

<Form {...form}>
  <RhfTextField control={form.control} name="name" label="Name" />
</Form>
```

When `control={form.control}` is supplied, wrapper names are value-safe:
text/select paths are strings, number paths are `number | ''`, and multi-select
paths are `string[]`. Omitting `control` still uses the nearest `FormProvider`
at runtime, but TypeScript cannot infer that provider's form shape through
React context, so context-only JSX is not schema-safe. Form-level RHF `disabled`
state reaches the rendered controls, and composite selects report blur when the
user leaves the control or closes its open menu.

| Entry                                   | Contents                                                                                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `@uzh-bf/design-system`                 | Custom composites (`Button`, `Table`, `Modal`, the `Formik*` fields) plus the `ThemeProvider` / `useTheme` theming API. This door is RHF-free. |
| `@uzh-bf/design-system/primitives`      | Raw shadcn/Radix primitives under their natural names (`DropdownMenu*`, `Table*`, …).                                                          |
| `@uzh-bf/design-system/react-hook-form` | Client-only RHF binding (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, and the `Rhf*` wrappers).                                |
| `@uzh-bf/design-system/css`             | Precompiled stylesheet (import once — see above).                                                                                              |
| `@uzh-bf/design-system/preflight.css`   | Base/reset layer on its own.                                                                                                                   |

Some natural names exist at **both** doors as different components (root = custom
composite, `./primitives` = raw primitive). See
[`MIGRATION.md`](./MIGRATION.md) for the full list and the door-selection rule.

## Documentation

Component stories, props, and examples live in the
[repository](https://github.com/uzh-bf/design-system) (Ladle) and are indexed for
Context7 at <https://context7.com/uzh-bf/design-system>.

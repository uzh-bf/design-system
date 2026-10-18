# @uzh-bf/design-system

React component library for University of Zurich web applications, maintained by
the IT dev-ops team at the Teaching Center of the Department of Finance (UZH). It
pairs shadcn/Radix-based primitives with UZH-aligned composite components and a
dual-theme system: a de-branded `neutral` default plus the UZH-inspired application
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
- **`uzh`** — a UZH-inspired application theme (UZH Blue, Berry accent, Source Sans 3).

The `uzh` theme adapts brand elements to dense application interfaces. It does
not establish whole-application CD conformance or institutional approval of
consumer branding. UZH dark mode is unsupported and outside the current
accessibility and visual-regression qualification; its CSS remains for compatibility.

Switching is a pure CSS-variable cascade (no JS engine). Set the theme on the
document root:

```html
<html data-theme="uzh"></html>
```

…or mount the provider — use it when you want an in-app toggle via `useTheme`:

```tsx
import { ThemeProvider } from '@uzh-bf/design-system'
;<ThemeProvider theme="uzh">{children}</ThemeProvider>
```

Both paths end in the same place: `ThemeProvider` writes `data-theme` to
`document.documentElement` from an effect and keeps it in sync, so the theme is
always one attribute on the document root — which is also how portaled overlays
(dialogs, menus, tooltips) get their theme. Because that write happens in a
client effect after paint, the markup should carry `<html data-theme="…">` for
the theme the app starts in — server- and client-rendered apps alike paint one
unthemed frame otherwise; the provider then takes over the toggling. Keep the
provider's `theme`/`defaultTheme` in agreement with that shell attribute: the
provider overwrites it on mount, so a mismatch reverts the document to the
provider's theme after hydration.

Document-root theming is the supported and verified mode in v5. The theme is
global by construction: mounting more than one provider does not create nested
theme regions, it just means the root keeps whichever theme was written last.
See [`MIGRATION.md`](./MIGRATION.md) for the current limitations.

### Complete primary-ramp extension

Consumers may replace the UZH primary family with a design-approved complete
five-step ramp loaded after the packaged stylesheet. The six semantic bridges
follow the ramp; do not provide only one primary colour or generate missing
steps in application code. The exact syntax, fixed-token boundary, and
app-prefix collision guidance are in [`MIGRATION.md`](./MIGRATION.md#complete-primary-ramp-extension).

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

Component responsive defaults use scoped rules in the `components` cascade
layer. Keep the documented package-then-application import order. A consumer
utility on unrelated content cannot replace a component's responsive default;
a utility deliberately passed through that component's className hook can
still override the property. Do not scan the package source to reconstruct its
styles. The packed CSS contract verifies both independently compiled stylesheets.

### Selection and RHF compatibility

Disabling a Select or MultiSelect closes its popup and prevents subsequent
changes. A disabled named Select is excluded from native form submission.
MultiSelect keeps keyboard highlight separate from selected values: its search
input controls a multiple-selection listbox inside the named popup. Arrow keys
move highlight, Enter toggles the highlighted option, and Escape returns to
the trigger. Filtering does not clear selected values.

The compositional `FormField` infers transformed resolver output from `control`,
as the dedicated RHF wrappers do. CI runs behavioral contracts and isolated
packed/Next consumers at RHF 7.59.0 and 7.90.0 before the release build. Formik
support remains available throughout v5; migration and public-type removal are
v6 work.

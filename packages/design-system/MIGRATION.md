# Migration: v4 → v5 (dual theme)

v5 introduces a **dual-theme** system. The same components now render under two
themes, selected by a `data-theme` attribute:

- **`neutral`** (default) — de-branded, shadcn-like. Applied on `:root`, so it is
  what you get with no extra setup.
- **`uzh`** — the UZH corporate-design theme (UZH blue/red palette, Source Sans 3).

Both themes share one set of components; only the CSS custom properties differ.
There is no JS theme engine — switching is a pure CSS-variable cascade.

## Breaking change: CSS delivery

v5 delivers component styles as a single **precompiled stylesheet** that you must
import. Earlier setups relied on the consuming app's Tailwind build scanning the
package source; v5 no longer ships that source, and the theme layer no longer
exposes the old font-injection variables. Existing apps render **unstyled** after
upgrading until they make the following three changes.

1. **Import the compiled stylesheet** once, in your app entry or root CSS:

   ```ts
   import '@uzh-bf/design-system/css'
   ```

   ```css
   /* …or from your root stylesheet */
   @import '@uzh-bf/design-system/css';
   ```

2. **Remove any `@source` scan of the package source.** v5 ships `dist` only, so
   a rule such as

   ```css
   @source "../node_modules/@uzh-bf/design-system/src";
   ```

   now points at a path that no longer exists — delete it. The stylesheet from
   step 1 already contains the design system's utility classes and tokens.

3. **Remove references to the removed font variables.** v5 dropped the
   `--theme-font-primary` / `--source-sans-pro` injection points. If your app
   referenced them, e.g.

   ```css
   @theme {
     --font-sans: var(--theme-font-primary);
   }
   ```

   remove those references. v5 supplies its own fonts through the theme layer
   (`uzh` uses Source Sans 3, `neutral` uses the system font stack) — see
   [Fonts](#fonts).

## Breaking change: UZH apps must opt in

In v4 the design system was UZH-branded by default. In v5 the default is
`neutral`. **The three UZH apps must explicitly select the `uzh` theme**, or they
will render de-branded.

Pick one of:

```html
<!-- Simplest: set it once on the document root -->
<html data-theme="uzh"></html>
```

```tsx
// Or wrap the app subtree with the design-system provider
import { ThemeProvider } from '@uzh-bf/design-system'

export function App({ children }) {
  return <ThemeProvider theme="uzh">{children}</ThemeProvider>
}
```

Anything inside a `data-theme="uzh"` container (set directly or via
`ThemeProvider`) resolves its tokens against the UZH theme.

> **Supported scope in v5: document-root theming.** Setting one theme on the
> document root (`<html data-theme="…">`) is the supported, verified mode. Mixed
> or nested theming has known limitations: a `neutral` subtree inside a `uzh`
> page does not fully reset, and Radix overlays that portal to `document.body`
> (dialogs, dropdown/context menus, hover cards, tooltips) render outside a
> `ThemeProvider` wrapper and resolve the document-root theme. Keep a single root
> theme unless you have verified a specific nested case.

## Breaking change: public API surface

v5 consolidates the package into **two component entry points** plus the CSS
entry. Earlier setups exposed the raw shadcn primitives twice — once with a
`Shadcn*` prefix at the package root, once under a `./ui` subpath — and the form
wrappers under a `./forms` subpath. All of that duplication is removed.

### Entry points

| Import specifier                   | Contents                                                                                                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@uzh-bf/design-system`            | Opinionated **custom composites** — `Button`, `Table`, `Modal`, `Form`, the `Formik*` fields, and the rest of the UZH-styled components. The form wrappers that used to live under `./forms` now live here.                                                                 |
| `@uzh-bf/design-system/primitives` | **Raw shadcn/Radix primitives** under their natural names (`Table`, `DropdownMenu*`, `Menubar*`, `Collapsible*`, `Label`, `Progress`, …). **New door** — it replaces the removed `Shadcn*` root exports and the raw-primitive aliases that the `./ui` subpath also carried. |
| `@uzh-bf/design-system/css`        | Precompiled stylesheet (see [CSS delivery](#breaking-change-css-delivery)). Unchanged.                                                                                                                                                                                      |

### Removed subpaths

- `@uzh-bf/design-system/ui` → this subpath re-exported the **custom composites**
  (`Button`, `Accordion`, …), which now come from the root **`@uzh-bf/design-system`**;
  the raw `Shadcn*` aliases it also carried move to **`@uzh-bf/design-system/primitives`**
  under their natural names.
- `@uzh-bf/design-system/forms` → **`@uzh-bf/design-system`** (the form wrappers moved up to the root).

### Removed `Shadcn*` exports

The `Shadcn*`-prefixed root exports are gone. Import the raw primitive from
`./primitives` under its **natural name** instead:

```ts
// before
import { ShadcnTable, ShadcnTableRow } from '@uzh-bf/design-system'
// after
import { Table, TableRow } from '@uzh-bf/design-system/primitives'
```

Complete mapping (all removed under `@uzh-bf/design-system`, all available from
`@uzh-bf/design-system/primitives`):

| Removed export                   | Replacement (natural name) |
| -------------------------------- | -------------------------- |
| `ShadcnCollapsible`              | `Collapsible`              |
| `ShadcnCollapsibleContent`       | `CollapsibleContent`       |
| `ShadcnCollapsibleTrigger`       | `CollapsibleTrigger`       |
| `ShadcnDropdownMenu`             | `DropdownMenu`             |
| `ShadcnDropdownMenuCheckboxItem` | `DropdownMenuCheckboxItem` |
| `ShadcnDropdownMenuContent`      | `DropdownMenuContent`      |
| `ShadcnDropdownMenuGroup`        | `DropdownMenuGroup`        |
| `ShadcnDropdownMenuItem`         | `DropdownMenuItem`         |
| `ShadcnDropdownMenuLabel`        | `DropdownMenuLabel`        |
| `ShadcnDropdownMenuPortal`       | `DropdownMenuPortal`       |
| `ShadcnDropdownMenuRadioGroup`   | `DropdownMenuRadioGroup`   |
| `ShadcnDropdownMenuRadioItem`    | `DropdownMenuRadioItem`    |
| `ShadcnDropdownMenuSeparator`    | `DropdownMenuSeparator`    |
| `ShadcnDropdownMenuShortcut`     | `DropdownMenuShortcut`     |
| `ShadcnDropdownMenuSub`          | `DropdownMenuSub`          |
| `ShadcnDropdownMenuSubContent`   | `DropdownMenuSubContent`   |
| `ShadcnDropdownMenuSubTrigger`   | `DropdownMenuSubTrigger`   |
| `ShadcnDropdownMenuTrigger`      | `DropdownMenuTrigger`      |
| `ShadcnLabel`                    | `Label`                    |
| `ShadcnMenubar`                  | `Menubar`                  |
| `ShadcnMenubarCheckboxItem`      | `MenubarCheckboxItem`      |
| `ShadcnMenubarContent`           | `MenubarContent`           |
| `ShadcnMenubarGroup`             | `MenubarGroup`             |
| `ShadcnMenubarItem`              | `MenubarItem`              |
| `ShadcnMenubarLabel`             | `MenubarLabel`             |
| `ShadcnMenubarMenu`              | `MenubarMenu`              |
| `ShadcnMenubarPortal`            | `MenubarPortal`            |
| `ShadcnMenubarRadioGroup`        | `MenubarRadioGroup`        |
| `ShadcnMenubarRadioItem`         | `MenubarRadioItem`         |
| `ShadcnMenubarSeparator`         | `MenubarSeparator`         |
| `ShadcnMenubarShortcut`          | `MenubarShortcut`          |
| `ShadcnMenubarSub`               | `MenubarSub`               |
| `ShadcnMenubarSubContent`        | `MenubarSubContent`        |
| `ShadcnMenubarSubTrigger`        | `MenubarSubTrigger`        |
| `ShadcnMenubarTrigger`           | `MenubarTrigger`           |
| `ShadcnProgress`                 | `Progress`                 |
| `ShadcnTable`                    | `Table`                    |
| `ShadcnTableBody`                | `TableBody`                |
| `ShadcnTableCaption`             | `TableCaption`             |
| `ShadcnTableCell`                | `TableCell`                |
| `ShadcnTableFooter`              | `TableFooter`              |
| `ShadcnTableHead`                | `TableHead`                |
| `ShadcnTableHeader`              | `TableHeader`              |
| `ShadcnTableRow`                 | `TableRow`                 |
| `ShadcnFormLabel`                | `FormLabel`                |

> **Watch for name collisions (silent swap).** Wherever a name exists at **both**
> doors, the **root** is the opinionated custom composite and `./primitives` is the
> raw shadcn primitive. When they differ, TypeScript does **not** error on the wrong
> door, so the swap is silent. This affects at least twelve names — `Button`,
> `Checkbox`, `Collapsible`, `FormLabel`, `Label`, `Progress`, `Select`, `Slider`,
> `Switch`, `Table`, `Tabs`, `Tooltip` — five of which (`Collapsible`, `FormLabel`,
> `Label`, `Progress`, `Table`) are also among the removed `Shadcn*` names above.
> **Rule of thumb:** import the raw primitive **explicitly from `./primitives`** and
> the composite from the root. Names such as `DropdownMenu*`, `Menubar*`, and the
> `Table*` sub-parts (`TableRow`, …) exist only under `./primitives`, so nothing
> shadows them.

This is the break most likely to hit existing consumers: apps that imported
`ShadcnTable*` for a bare table now import `Table*` from
`@uzh-bf/design-system/primitives`, keeping the root `Table` free for the custom
data-table composite.

### Strict composite prop contracts

The custom `Button`, `Navigation`, and `Progress` composites no longer accept
arbitrary props. They still accept native and ARIA attributes that the
component forwards to its root element, alongside their documented custom
props. `className`, controlled state, and custom variant props remain owned by
the composite. `Workflow` and `WorkflowProgress` step items likewise expose
only their documented fields in the callback type; arbitrary metadata is not a
supported contract, although the original runtime item object is still passed
through unchanged.

If an application needs a raw primitive prop that the composite intentionally
does not expose (for example, a shadcn button `variant`), import the raw
component from `@uzh-bf/design-system/primitives` instead of adding an
unsupported prop to the custom composite. Move application-specific workflow
metadata outside the step object or model it in the owning application state.

### Direct-control refs

The v5 direct-control components use React 19's normal `ref` prop to expose the
visible interactive element. The ref target is intentionally concrete:

| Component                     | Ref target                          |
| ----------------------------- | ----------------------------------- |
| `Button` (native-button path) | `HTMLButtonElement`                 |
| `TextField`                   | `HTMLInputElement`                  |
| `NumberField`                 | `HTMLInputElement`                  |
| `TextareaField`               | `HTMLTextAreaElement`               |
| `Select`                      | visible trigger `HTMLButtonElement` |
| `Combobox`                    | visible trigger `HTMLButtonElement` |

Use `ref`, not a parallel `forwardedRef` prop. `Button` rejects `ref` when
`asChild` is `true` because the child may not be a button; polymorphic child
refs remain a follow-up. Composite refs for deprecated Formik wrappers, OTP,
date/color pickers, and `Table` are not part of this direct-control migration.

`ButtonProps` is now a discriminated union so the native-button ref target can
remain sound. If a wrapper previously used `interface ... extends ButtonProps`,
define the wrapper props as an intersection instead:

```ts
type WrappedButtonProps = ButtonProps & { analyticsId?: string }
```

v5 also marks the package `"sideEffects": ["*.css"]` so consuming bundlers can
tree-shake unused components while preserving the required stylesheet import — no
action needed.

### Composite refs and Table

Applicable v5 composites now use React 19's normal `ref` prop for their one
stable interactive target:

| Component              | Ref target                                         |
| ---------------------- | -------------------------------------------------- |
| `Checkbox`             | `HTMLButtonElement` (Radix checkbox root)          |
| `Switch`               | `HTMLButtonElement` (Radix switch root)            |
| `Slider`               | `HTMLSpanElement` (the focusable thumb)            |
| `Collapsible`          | `HTMLButtonElement` (the trigger)                  |
| `Dropdown`             | `HTMLButtonElement` (the menu trigger)             |
| `MultiSelect`          | `HTMLButtonElement` (the visible popover trigger)  |
| `SelectField`          | `HTMLButtonElement` (the delegated Select trigger) |
| `AlphaNumericPinField` | `HTMLInputElement` (the underlying OTP input)      |
| `ColorPicker`          | `HTMLButtonElement` (the palette trigger)          |
| `DatePicker`           | `HTMLButtonElement` (the calendar trigger)         |
| `DateRangePicker`      | `HTMLButtonElement` (the calendar trigger)         |
| `DateTimePicker`       | `HTMLButtonElement` (the calendar trigger)         |

`Slider` also accepts an optional `ariaLabel` for naming its focusable thumb
when the surrounding UI does not provide an accessible label.

`Table` exposes an imperative handle instead of a DOM node:

```tsx
interface TableRef {
  reset(): void
}

const tableRef = useRef<TableRef>(null)
<Table ref={tableRef} ... />
tableRef.current?.reset()
```

The former `forwardedRef` prop is removed; replace it with `ref` as shown above.
The removed alias is not accepted as a compatibility prop. `TableRef` is
exported from the package root and is the only supported Table ref target.

`DateTimePickerRef` remains an exported type alias for `HTMLButtonElement` so
type-only imports remain useful, but the old pseudo-handle's Date-valued
`.value` property is gone. Read the selected date from the controlled `value`
prop and `onChange` callback instead.

## Peer dependencies

v5 no longer bundles its runtime libraries — every one is declared as a **peer
dependency** and must be installed by your app (`react`, `react-dom`, `formik`,
`dayjs`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`,
the `@fortawesome/*` packages, and the Tailwind toolchain). v4 inlined some of
these, so an app that never installed them explicitly may now surface unmet-peer
warnings — install the missing ones. As a side effect this removes the duplicate
`react-dom` copy that v4 shipped inside its chunks.

### `react-hook-form` is now a required peer

The shadcn `Form` binding (`Form`, `FormField`, `FormControl`, …) is built on
`react-hook-form`. v5 moves `react-hook-form` from a bundled **dependency** to a
**peer dependency** you provide:

```sh
pnpm add react-hook-form
```

Providing it yourself keeps a single `react-hook-form` instance in your app — a
bundled copy would break the `FormProvider` React context across the package
boundary. It is a required peer rather than an optional one because the `Form`
binding is re-exported from the package's main entry, so `react-hook-form` is
resolved whenever the entry is loaded — even by consumers that never render the
binding. A per-feature build split that would let non-`Form` consumers skip it is
tracked for a later release; until then, install it alongside the package.

v5 also **drops `@hookform/resolvers`** — the design system never imported it, so
it was dead weight in the dependency tree. If you use an RHF resolver such as
`zodResolver`, depend on `@hookform/resolvers` directly in your app.

## Deprecations

The **Formik field family** — `FormikTextField`, `FormikNumberField`,
`FormikTextareaField`, `FormikSelectField`, `FormikSwitchField`,
`FormikColorPicker`, `FormikDatePicker`, `FormikDatetimePicker`, `FormikPinField`,
and `FormikAlphaNumericPinField` — is marked **`@deprecated` as of v5 and will be
removed in v6.** These components keep working unchanged in v5; the tag only
surfaces an editor warning. New code should use the react-hook-form `Form`
binding (`Form` + `FormField` + a control) instead. `formik` remains a v5 peer
dependency so existing Formik usage keeps compiling until the v6 removal.

## New exports

| Export          | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `ThemeProvider` | Renders a `data-theme` container; controlled or uncontrolled. |
| `useTheme`      | Reads `{ theme, setTheme }` from the nearest `ThemeProvider`. |
| `Theme`         | `'neutral' \| 'uzh'` type.                                    |

`ThemeProvider` is optional — a plain `data-theme="uzh"` attribute is enough.
Use the provider when you want an in-app theme toggle via `useTheme`.

## Fonts

The design system **self-hosts** its webfonts (Source Sans 3 for `uzh`, JetBrains
Mono for monospace). They ship inside the package as `.woff2` files that the
precompiled stylesheet references (`@uzh-bf/design-system/dist/fonts/*.woff2`), so
importing `@uzh-bf/design-system/css` is all the font setup an app needs — there
is **no runtime request to Google Fonts**. `neutral` uses the system font stack
for its sans face, so an app on the default theme downloads no webfonts at all.

> **CSP / privacy.** Because the fonts are served from your own origin (bundled
> with the package) there is nothing to allow-list for `fonts.googleapis.com` /
> `fonts.gstatic.com`, and no user IP is sent to Google. Your bundler resolves the
> `.woff2` files from the imported stylesheet like any other asset; the browser
> fetches only the weight/subset a page actually renders (`unicode-range`).

## New component props & variants

These are **additive** — existing usage keeps working.

- **`Alert`** — new `variant`s: `neutral`, `info`, `success`, `warning`, `error`
  (tinted background + coloured left border + status icon). `default` and
  `destructive` are unchanged.
- **`Badge`** — new `variant`s: `success`, `warning`, `info`, `error` (solid).
- **`Input` / `Textarea`** — new `invalid?: boolean` prop → native `aria-invalid`
  (destructive border + ring). The Formik field wrappers wire this automatically
  from `error && touched`.
- **`Avatar`** — new `size?: 'sm' | 'md' | 'lg'` (28 / 40 / 56 px). Omit for the
  legacy 32 px default.
- **shadcn `TableRow`** (from the `Table`/`TableHeader`/`TableBody`/… family in
  `ui/table`, not the legacy `Table` component) — new `hoverable?: boolean`
  (default `true`) to opt out of row hover.
- **`Tabs`** — restyled to an underline pattern (active tab gets a primary
  bottom-border instead of a filled pill). API unchanged.

## Visual changes to verify

- **`AvatarFallback`** background changed from `bg-muted` to `bg-primary-20
text-primary-100` (theme-tinted initials). Override via `className` if you
  relied on the grey fallback.
- **`Tabs`** look different (underline, not pill). Layout/markup is unchanged.

Everything else is theme-token routing: components that hardcoded UZH colours now
read semantic tokens, so they follow whichever `data-theme` is active.

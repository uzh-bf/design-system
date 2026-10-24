# Migration: v4 → v5 (dual theme)

v5 introduces a **dual-theme** system. The same components now render under two
themes, selected by a `data-theme` attribute:

- **`neutral`** (default) — de-branded, shadcn-like. Applied on `:root`, so it is
  what you get with no extra setup.
- **`uzh`** — a UZH-inspired application theme (UZH Blue, Berry accent, Source Sans 3).

Both themes share one set of components; only the CSS custom properties differ.
There is no JS theme engine — switching is a pure CSS-variable cascade.
The `uzh` theme adapts brand elements to dense application interfaces; it does not
establish whole-application CD conformance or institutional approval of consumer branding.

## Additive primitive compatibility

Primitive `Button` adds `xs`, `icon-xs`, `icon-sm` and `icon-lg`. The new 24px
rung supports dense application groups; measure actual target spacing and focus
visibility in the consumer. Existing `default`, `sm`, `lg` and `icon` geometry
and root `Button` props remain unchanged.

Primitive `TabsList` accepts `variant="default"` for filled tabs and `"line"`
for underline tabs. Omitting the variant preserves the previous full-width
underline treatment; `tabsListVariants()` has that same omission behavior.
Primitive `Tabs orientation="vertical"` changes layout and Radix keyboard
navigation together. Callers keep the final `className` override.

`NativeSelect`, `NativeSelectOption` and `NativeSelectOptGroup` are available
from root and primitives. They preserve native select values, form submission,
validation and refs. `size="sm" | "default"` selects visual geometry; numeric
HTML row counts are not part of this API. `className` styles the wrapper while
`style`, native props and `ref` reach the select. Multiple selection keeps its
native row geometry and omits the single-selection chevron.

`DirectionProvider` and `useDirection` share scoped Radix context through both
entries. `direction` takes precedence over `dir`; an omitted value inherits the
nearest context, defaulting to LTR. Set document/element `dir` separately when
native text flow also needs changing. Context reaches Radix portals and nested
providers can override it.

## Breaking change: application-owned Recharts 3

Every consuming application must install `recharts >=3.8.0 <4`, including apps
that do not render charts. Recharts is now a required peer instead of a bundled
regular dependency. The development endpoint is pinned to 3.10.1; packed fixtures
also cover the 3.8.0 minimum. Install `react-is` at the same exact version as your
application's React and ReactDOM. This follows the design system's tested
runtime-identity policy; Recharts declares a broader peer range.

Keep importing plots such as `BarChart` directly from `recharts`, and container,
tooltip and legend components from root or `primitives`. Those public DS exports
remain available. `ChartTooltipContent` uses Recharts 3 custom-content types,
renders numeric zero, and omits null/undefined values before calling a formatter.
`ChartLegendContent` accepts Recharts 3 legend payloads.

`ChartContainer` supplies an initial 320×200 measurement and accepts an
`initialDimension` override. The parent still needs a measurable width and height
or aspect ratio. An initial measurement does not create SVG content during SSR;
Recharts completes rendering in the browser. Use reactive `--chart-*` colors,
measure series contrast, and provide labels, patterns or text alternatives.

Recharts 3 enables its accessibility layer by default. Keyboard navigation no
longer invokes `onMouseMove`; use the tooltip state APIs for controlled behavior.
Choose `defaultIndex` for initial selection rather than a removed plot-level
`activeIndex`. Check custom refs and tooltip payload integrations against the
[Recharts migration guide](https://github.com/recharts/recharts/wiki/3.0-migration-guide).

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

The two paths are equivalent: `ThemeProvider` writes `data-theme` to
`document.documentElement` from an effect and keeps it in sync, so either way
the whole document — including Radix overlays that portal to `document.body` —
resolves the UZH token layer from one attribute on the document root.

Coming from `5.0.0-alpha.4` or earlier, expect a visible typography change on
the provider path: `--font-sans` is resolved on the document root, so a themed
provider container never reached it and UZH apps kept the system font stack.
With the theme on the root, UZH text now renders in Source Sans 3, the font the
theme has always documented. Colors, spacing, and layout are unaffected **by
this particular change** — for the v4 → v5 visual delta, which is substantial,
see [Visual changes to verify](#visual-changes-to-verify).

> **Supported scope in v5: document-root theming.** The theme is global. A
> second `ThemeProvider` does not theme its subtree separately; the document
> root keeps the theme written last (the outermost provider on mount, then
> whichever provider changed most recently). There is no supported way to render
> a `neutral` region inside a `uzh` page. Put the `dark` class on the document
> root next to `data-theme`, not on a `ThemeProvider` container — the dark
> status surfaces are declared on the element that carries the theme.

> **UZH dark mode is unsupported.** Its CSS remains for compatibility, but it is
> outside the current accessibility and visual-regression qualification. The
> placement instruction above does not establish support for that combination.

> **First paint.** The provider writes the attribute in an effect, which runs
> after paint — so an app that themes only through the provider paints one
> unthemed frame, whether server-rendered or purely client-rendered. Render the
> starting theme yourself in the document shell (`<html data-theme="uzh">` — in
> Next.js the `<html>` element of the root layout); the provider syncs the same
> attribute afterwards, so an in-app toggle keeps working. The provider's
> `theme`/`defaultTheme` **must match** the shell attribute: the effect
> overwrites `data-theme` unconditionally on mount, so
> `<html data-theme="uzh">` combined with a bare `<ThemeProvider>` reverts the
> whole document to `neutral` after hydration.

### Complete primary-ramp extension

The supported brand-extension seam is a complete, consumer-owned five-step
primary ramp. Import `@uzh-bf/design-system/css` before the consumer stylesheet
and override all five variables on the document root:

```css
@import '@uzh-bf/design-system/css';

:root[data-theme='uzh'] {
  --theme-color-primary: var(--app-primary-100);
  --theme-color-primary-80: var(--app-primary-80);
  --theme-color-primary-60: var(--app-primary-60);
  --theme-color-primary-40: var(--app-primary-40);
  --theme-color-primary-20: var(--app-primary-20);
}
```

Define the app-prefixed variables in the consumer stylesheet or replace the
references with the approved literal values. The design system does not own or
generate those values.

The design system derives the primary, focus-ring, and sidebar bridges from
that ramp: `--primary`, `--ring`, `--sidebar-primary`, `--sidebar-ring`,
`--sidebar-accent`, and `--sidebar-accent-foreground`. A single primary colour
is not supported, and missing steps are not generated. Secondary, status,
destructive, font, chart, and other UZH tokens stay design-system-owned.
Application-specific semantic variables should be app-prefixed; generic
`--primary`, `--accent`, and `--destructive` declarations are collisions rather
than the branding extension path.

## Breaking change: public API surface

v5 consolidates the package into **three component entry points** plus the CSS
entries. Earlier setups exposed the raw shadcn primitives twice — once with a
`Shadcn*` prefix at the package root, once under a `./ui` subpath — and the form
wrappers under a `./forms` subpath. All of that duplication is removed. RHF
bindings now live behind an explicit client-only entry so Server Components can
use the root and primitive doors without reaching `react-hook-form`.

### Entry points

| Import specifier                        | Contents                                                                                                                                                                                                                                                                    |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@uzh-bf/design-system`                 | Opinionated **custom composites** — `Button`, `Table`, `Modal`, the `Formik*` fields, and the rest of the UZH-styled components. The Formik wrappers that used to live under `./forms` now live here. This door is RHF-free.                                                |
| `@uzh-bf/design-system/primitives`      | **Raw shadcn/Radix primitives** under their natural names (`Table`, `DropdownMenu*`, `Menubar*`, `Collapsible*`, `Label`, `Progress`, …). **New door** — it replaces the removed `Shadcn*` root exports and the raw-primitive aliases that the `./ui` subpath also carried. |
| `@uzh-bf/design-system/react-hook-form` | Client-only React Hook Form binding: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`, and the `Rhf*` field wrappers.                                                                                          |
| `@uzh-bf/design-system/css`             | Precompiled stylesheet (see [CSS delivery](#breaking-change-css-delivery)). Unchanged.                                                                                                                                                                                      |

### Removed subpaths

- `@uzh-bf/design-system/ui` → this subpath re-exported the **custom composites**
  (`Button`, `Accordion`, …), which now come from the root **`@uzh-bf/design-system`**;
  the raw `Shadcn*` aliases it also carried move to **`@uzh-bf/design-system/primitives`**
  under their natural names.
- `@uzh-bf/design-system/forms` → **`@uzh-bf/design-system`** for Formik wrappers;
  RHF bindings move to **`@uzh-bf/design-system/react-hook-form`**.

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

### Accessible names include visible values

Date/time trigger names include the field label and displayed date/time. A
Combobox's explicit `ariaLabel` also prefixes its visible value. Exact
field-label-only name queries should use the rendered value or a stable test
selector. Calendar day names include the displayed number alongside the full date
so speech input can match the visible control.

### Test selectors: `data={{ cy, test }}`

v5 standardises the **shape** of every test selector: `{ cy?: string; test?:
string }`, rendered as `data-cy` and `data-test`. No selector prop accepts
`data-testid` or an arbitrary attribute record. The code examples in the
non-deprecated stories were corrected to match. Two groups still show pre-v5
forms: the deprecated `Formik*` stories keep the old attribute-record examples,
and the per-story prop reference lists outside the pickers and `ColorPicker`
still give the type as `Record<string, string>`. The prop types are
authoritative wherever the two disagree.

Where a composite has one obvious target, the prop is named `data`. Components
with several independently addressable controls also expose named per-element
props, among them `Modal`'s `dataContent`/`dataCloseButton`/`dataPrimaryAction`/
`dataSecondaryAction`, `Slider`'s `dataThumb`, `Tooltip`'s `dataContent`,
`ColorPicker`'s `dataHexInput`/`dataSubmit`, and on the pickers
`dataTrigger`/`dataCalendar`/`dataNextMonth`/`dataPreviousMonth` plus the
`DatetimePicker`'s `dataHours`/`dataMinutes`/`dataSeconds`. Every one carries
the same value shape.

`Calendar`, `ColorPicker`, `DatePicker`, `DateRangePicker`, and
`DatetimePicker` now also accept a root `data` prop. This is additive; existing
per-element props are unchanged. The root prop and the per-element props always
target different elements — the root selector is never inherited by
sub-elements, so each control still needs its own prop to be addressable.

Note what the root selector does and does not enclose, because it differs by
component. On `Calendar` it marks the whole widget, and on `ColorPicker` it
marks a wrapper that contains the popover. On `DatePicker`, `DateRangePicker`
and `DatetimePicker` it marks the **trigger area only**: following shadcn's
composition, `PopoverTrigger` and `PopoverContent` are siblings under
`Popover` rather than nested inside a shared wrapper, so the open calendar is
not a descendant of the root selector. A query like

```js
cy.get('[data-cy="my-picker"]').find('[role="dialog"]')
```

therefore matches on `ColorPicker` and finds nothing on the three date
pickers. Address the popover contents on those through `dataCalendar` (or the
`DatetimePicker`'s `dataHours`/`dataMinutes`/`dataSeconds`) instead of by
descending from the root.

The value shape is now exported as `TestSelectors`, so a suite can name it
instead of retyping the literal:

```ts
import type { TestSelectors } from '@uzh-bf/design-system'

const pickerSelectors: TestSelectors = {
  cy: 'date-picker',
  test: 'date-picker',
}
```

`DatePicker` no longer forwards undeclared props through to its underlying
calendar. Typed callers are unaffected, because `DatePickerProps` never
accepted them; a JavaScript caller that relied on the pass-through to set a
`react-day-picker` option must now use a declared prop instead.

Most components still expose no selector prop at all; those are unchanged, and
role- or label-based queries remain the way to reach them.

**`ColorPicker`'s `dataHexInput.test` now renders as `data-test`.** It
previously rendered as a misspelled `data-text`, present since the component
shipped, so a suite asserting against the hex input must update that selector.
The `cy` half was always correct.

```tsx
// before
cy.get('[data-text="hex-input"]')
// after
cy.get('[data-test="hex-input"]')
```

`Table` was the last composite still using the old `dataAttributes` name.
Adopting `data` required freeing that name. **Its row collection moved to
`rows` and its selector prop is now `data`** — both halves of the rename land
together, so a partially migrated call site fails to compile rather than
silently passing rows as selectors:

```tsx
// before
<Table data={rows} dataAttributes={{ cy: 'results', test: 'results' }} />
// after
<Table rows={rows} data={{ cy: 'results', test: 'results' }} />
```

The attributes stay on the composite's outer root, which is the stable table
selector. Sortable header buttons are addressed by role (`columnheader` →
`button`), not by a second selector API.

`Workflow` and `WorkflowProgress` steps are independently actionable, so their
selectors are per step rather than on the list:

```tsx
<Workflow
  activeIx={0}
  onClick={handleClick}
  items={[
    { title: 'Draft', data: { cy: 'step-draft' } },
    {
      title: 'Review',
      tooltip: 'Not yet available',
      data: { cy: 'step-review' },
    },
  ]}
/>
```

The attributes render on each step's `<button>` in both the tooltip and plain
paths, and a disabled step keeps them on that same focusable button. The `<ol>`
root intentionally carries no selector, since no single one would identify a
step. The step object passed to `onClick` is unchanged.

### `Tabs` derives its trigger and panel ids

`Tabs` now builds every trigger and panel DOM id from the tabs id and the tab
value (`<tabs-id>-trigger-<value>` and `<tabs-id>-content-<value>`), so both ends
of the `aria-controls`/`aria-labelledby` pair always match. Two consequences:

- `tabs[].id` is a React list key only and no longer reaches the DOM. A selector
  that targeted a caller id (`#overview`) must move to `data={{ cy, test }}` or a
  role-based query.
- `TabContent` no longer accepts an `id` prop and always takes the derived id
  from its parent `Tabs`. Remove the prop; TypeScript flags it.

Pass `id` on the `Tabs` root when you need predictable ids:

```tsx
<Tabs
  id="settings"
  defaultValue="overview"
  tabs={[{ label: 'Overview', value: 'overview' }]}
>
  <TabContent value="overview">…</TabContent>
</Tabs>
// renders #settings-trigger-overview and #settings-content-overview
```

### `Collapsible` custom triggers name themselves

A `customTrigger` is now named by its own content instead of the English
`Expand section`/`Collapse section` fallback. A trigger that renders visible
text needs no change; an **icon-only** custom trigger no longer has an
accessible name and must pass the new `ariaLabel` prop:

```tsx
<Collapsible
  customTrigger={<FontAwesomeIcon icon={faChevronDown} />}
  ariaLabel="Show details"
  ...
/>
```

## Peer dependencies

v5 externalizes its runtime imports. Application-owned libraries are declared
as **peer dependencies** and must be installed by your app (`react`, `react-dom`, `formik`,
`dayjs`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`,
the `@fortawesome/*` packages, and the Tailwind toolchain). v4 inlined some of
these, so an app that never installed them explicitly may now surface unmet-peer
warnings — install the missing ones. The package also declares regular
dependencies, including Radix primitives and component support libraries; your
package manager installs those automatically. Externalization describes the
bundle boundary, while peer versus regular dependency describes installation
ownership. This also removes the duplicate `react-dom` copy that v4 shipped
inside its chunks.

### `react-hook-form` is an optional peer behind a dedicated client entry

The shadcn `Form` binding (`Form`, `FormField`, `FormControl`, …) and the `Rhf*`
field wrappers are built on `react-hook-form`. The package declares it as an
**optional peer**: root-only and primitive-only consumers do not need to install
it, while consumers of the dedicated RHF entry must provide it:

```sh
pnpm add react-hook-form
```

Providing it yourself keeps a single `react-hook-form` instance in your app — a
bundled copy would break the `FormProvider` React context across the package
boundary. The root `@uzh-bf/design-system` and `./primitives` doors no longer
export `Form` or `Rhf*`, and do not have RHF runtime or declaration edges. Import
the client-only RHF door explicitly:

```tsx
import { useForm } from 'react-hook-form'
import { Form, RhfTextField } from '@uzh-bf/design-system/react-hook-form'
```

This is a deliberate pre-GA breaking change. The root `FormLabel` remains the
standalone design-system label; the RHF-aware `FormLabel` is exported from
`./react-hook-form` only. Add a client boundary around components that import
the RHF entry when using Next.js Server Components.

v5 also **drops `@hookform/resolvers`** — the design system never imported it, so
it was dead weight in the dependency tree. If you use an RHF resolver such as
`zodResolver`, depend on `@hookform/resolvers` directly in your app.

### RHF field wrappers

The v5 alpha provides turnkey RHF wrappers for the generic controls needed by
the demo-game migration:

```tsx
import {
  Form,
  RhfMultiSelect,
  RhfNumberField,
  RhfSelectField,
  RhfTextField,
} from '@uzh-bf/design-system/react-hook-form'
import { useForm } from 'react-hook-form'

type DemoFormValues = {
  name: string
  amount: number | ''
  location: string
  elements: string[]
}

const form = useForm<DemoFormValues>({
  defaultValues: { name: '', amount: '', location: '', elements: [] },
})

<Form {...form}>
  <RhfTextField control={form.control} name="name" label="Name" />
  <RhfNumberField control={form.control} name="amount" label="Amount" />
  <RhfSelectField
    control={form.control}
    name="location"
    label="Location"
    items={locations}
  />
  <RhfMultiSelect
    control={form.control}
    name="elements"
    label="Elements"
    items={elements}
  />
</Form>
```

Each wrapper accepts a value-safe typed `name` when an explicit
`control={form.control}` is supplied, plus optional runtime context mode, RHF
`rules`, `defaultValue`, `shouldUnregister`, labels, descriptions, required
state, and caller refs. If `control` is omitted, the wrapper uses the nearest
`FormProvider`, but TypeScript cannot infer that provider's form shape through
React context; context-only JSX is therefore a runtime convenience, not a
schema-safety boundary. The `name` type is constrained to the wrapper's value
shape: text and select fields use string paths, number fields use `number | ''`
paths, and multi-selects use `string[]` paths. RHF's form-level `disabled` option
is forwarded to every primitive. Select fields mark the field touched when a
closed trigger loses focus or when an open menu closes; multi-select triggers
consistently expose the combobox role and use the composite boundary for blur
handling.

`RhfNumberField` keeps the RHF value as `number | ''` while retaining transient
editing strings such as `1.` in the input. Empty values clear the field;
incomplete buffers such as `-` resolve to the last committed value on blur; and
RHF resets replace the local editing buffer, including a reset to the same
number. `RhfMultiSelect` marks the field touched when the composite is left or
when its open selection popover closes, not when focus merely moves into that
popover.

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

| Export          | Purpose                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ThemeProvider` | Writes `data-theme` to the document root; controlled or uncontrolled. See [UZH apps must opt in](#breaking-change-uzh-apps-must-opt-in). |
| `useTheme`      | Reads `{ theme, setTheme }` from the nearest `ThemeProvider`.                                                                            |
| `Theme`         | `'neutral' \| 'uzh'` type.                                                                                                               |

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
  bottom-border instead of a filled pill). Props are unchanged apart from the id
  handling described under [`Tabs` derives its trigger and panel
  ids](#tabs-derives-its-trigger-and-panel-ids).

## Visual changes to verify

**v5 changes what many components render.** Use the table below to review
existing wrappers and selected primitives when upgrading from `4.1.8`.
It describes the known class and token changes; it is not a complete count of
exports or a substitute for checking the components your application uses.

"Sizing" means a height, width, or padding moved, so surrounding layout can
shift. "Tokens" means hardcoded colours were replaced by theme tokens, so the
colour now follows `data-theme` and can change pixels in existing screens.

| Component                      | What moved                                                                                                                                             | Verify                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `Button`                       | Sizing and padding: `px-3.25 py-1.75` → `py-2`, plus `min-h-10`, `h-auto`, `whitespace-normal`                                                         | Verify button height and label wrapping                                           |
| `Checkbox`                     | Sizing and shape: `w-5` → `18px`, `rounded-md` → `rounded-[4px]`, border `1px` → `1.5px`, `border-black` → `border-input`                              | Alignment against adjacent text                                                   |
| `Collapsible`                  | Tokens: `border-uzh-grey-80` → `border-border`                                                                                                         | Border colour per theme <!-- gitleaks:allow: a Tailwind class name, not a key --> |
| `ColorPicker`                  | Positioning removed: absolute placement, `-left-72`, `bottom-8`, `max-w-120` all dropped                                                               | Popover placement in your layout                                                  |
| `Countdown`, `CycleCountdown`  | Rewritten; the measurement finds only added classes, so treat these as fully changed rather than trusting a specific list                              | Verify rendering end to end                                                       |
| `CycleProgress`                | Sizing removed in favour of intrinsic sizing (`h-7/12/20`, `w-7/12/20` dropped)                                                                        | Size in your layout; set it yourself if you relied on the preset                  |
| `DatePicker`, `DatetimePicker` | Sizing and chrome: `w-36`/`w-44` → `min-w-[200px]`/`min-w-[220px]`, new borders and hover fills                                                        | Field width in narrow columns                                                     |
| `Dropdown`                     | Type scale: `text-base` → `text-sm`                                                                                                                    | Menu density                                                                      |
| `FormLabel`                    | Type and colour: `text-gray-600` → `text-[13px] font-semibold text-foreground`                                                                         | Label weight against your form rhythm                                             |
| `Header`                       | Weight: `font-bold` → `font-semibold`                                                                                                                  | —                                                                                 |
| `Modal`                        | **Width cap.** `w-108 md:w-160 lg:w-220 xl:w-280 max-w-7xl` → `w-[calc(100%-2rem)] max-w-[520px]`                                                      | **Verify every wide modal.** See below                                            |
| `Navigation`                   | Sizing and type: `h-7`/`h-8` → `h-9`, `text-base` → `text-sm`                                                                                          | Bar height                                                                        |
| `Progress`                     | Fill: `bg-primary-60` → `bg-primary-100`                                                                                                               | Contrast against your background                                                  |
| `Prose`                        | Link colour now `text-link` / visited `text-link-visited`; heading line-heights tightened                                                              | Link colour and heading rhythm                                                    |
| `Select`                       | Sizing and tokens: `h-9` → `h-10`, `bg-uzh-grey-20` → `bg-muted`, `text-black` → `text-foreground`                                                     | Height against adjacent inputs                                                    |
| `Slider`                       | Fully restyled: thumb `size-4`/`size-[18px]`, track `bg-[#EFEFEF]`, ring on focus; old `h-12`/`h-14` presets gone                                      | Track and thumb size                                                              |
| `StepProgress`                 | Tokens: `bg-green-700`, `bg-uzh-red-100` → `bg-success`, `bg-destructive`                                                                              | Status colours per theme                                                          |
| `Switch`                       | Tokens: `bg-uzh-grey-80` → `bg-input`, `bg-primary-60` → `bg-primary-100`                                                                              | On/off contrast                                                                   |
| `Table`                        | Substantially restyled: `p-4` → `px-4 py-3`, header now uppercase `text-xs` with letter-spacing, zebra `odd:bg-uzh-grey-20` dropped, focus ring added  | **Verify row height, header treatment, and the loss of zebra striping**           |
| `Tabs`                         | Layout classes removed (`w-full`, `md:grid`, `md:h-10`); underline instead of pill                                                                     | Verify tab track width; it no longer declares `w-full`                            |
| `Tag`                          | Fully restyled: `bg-slate-100 text-slate-700 text-sm rounded` → `bg-primary-20 text-primary-100 text-[13px] h-6 rounded-xs`, plus a dismiss affordance | Tag size and colour                                                               |
| `Toast`                        | Tokens and border: `border-2` → `border-l-4` status stripe; `bg-white` → `bg-background`                                                               | Toast shape                                                                       |
| `Tooltip`                      | `border-2 border-black` removed                                                                                                                        | Tooltip outline                                                                   |
| `UserNotification`             | Tokens throughout: `bg-uzh-*-20` → `bg-*-background`, `text-uzh-*-100` → semantic text tokens                                                          | Every notification colour                                                         |
| `Workflow`                     | Substantially restyled: all chevron and fill colours moved to tokens, focus ring added, `w-full!` dropped                                              | Width and colours                                                                 |
| `AvatarFallback`               | `bg-muted` → `bg-primary-20 text-primary-100` (theme-tinted initials)                                                                                  | Override via `className` for the old grey                                         |

The table focuses on changed existing components. Additive v5 components
include: `ButtonGroup`, `Combobox`,
`DateRangePicker`, `Empty`, `Field`, `InputGroup`, `Item`, `Kbd`,
`MultiSelect`, `Spinner`, `ThemeProvider`.

### The `Modal` width cap

This one deserves its own note because it silently collapses existing screens.
v4 sized modals with a responsive width ladder up to `xl:w-280`. v5 caps them
at `max-w-[520px]`:

```tsx
// v4: a wide modal was the default at large viewports
<Modal open={open} onClose={close}>{wideContent}</Modal>

// v5: opt back in explicitly
<Modal open={open} onClose={close} className={{ content: 'max-w-4xl' }}>
  {wideContent}
</Modal>
```

Any modal holding a table, a side-by-side layout, or a wide form needs
`className.content` to restore its width. `fullScreen` remains the escape
hatch for the largest cases.

### Also changed in this release

- **Empty modal footers no longer render.** A `Modal` with neither
  `onPrimaryAction` nor `onSecondaryAction` previously drew the footer's top
  divider above empty space; it now renders no footer at all.
- **`Dropdown` separators and group labels ignore `className.item`.** Only
  menu items take the shared item class. If you were compensating for fat
  separators with a per-item override, remove it.
- **Dialog and sheet close buttons ring only on keyboard focus.** They used
  `focus:`, so opening either with the mouse painted a focus ring; they now use
  `focus-visible:` like the rest of the library.
- **Links have their own colour.** `--theme-color-link` and
  `--theme-color-link-visited` are new, exposed as `text-link` and
  `text-link-visited`. `Prose` anchors and `Button variant="link"` use them.
  Previously prose links rendered as body text.
- **The `uzh` error colour is visible again.** `--theme-destructive-text` was
  `#111111` in the `uzh` theme, so error text and invalid-field borders were
  near-black. It is now Berry `#BF0D3E`. Error/destructive Alert descriptions
  also use the full semantic text colour instead of a 90% opacity fade in both
  themes, preserving contrast on their tinted backgrounds.

### Descriptions and inline validation

`TextField`, `NumberField`, `TextareaField` and `SelectField` accept an optional
`description`. Standalone fields and the existing `Rhf*` wrappers merge external
`aria-describedby` references with their generated help and visible-error IDs.
Repeated references are deduplicated. The generated references disappear when
the corresponding help or error node disappears; caller-owned references remain.
SelectField also accepts the existing camel-case `ariaDescribedBy` spelling.

Use `errorDisplay="inline"` to show one visible validation message below a control.
Standalone fields default to `"tooltip"`; RHF adapters default to `"inline"`.
`hideError` hides the error message and its reference while preserving invalid
state. Standalone text, number and textarea fields retain their touched gate;
SelectField displays an error whenever one is supplied. RHF adapters display
errors already produced by RHF without an extra touched/submitted gate. RHF
continues to own validation timing, values, change/blur handlers and refs.

```tsx
<TextField
  label="Project name"
  value={name}
  onChange={setName}
  description="Use the name shown to participants."
  aria-describedby="project-policy"
  errorDisplay="inline"
  error={error}
  isTouched={isTouched}
/>
<p id="project-policy">Names are visible to the project group.</p>

<RhfTextField
  control={form.control}
  name="name"
  label="Project name"
  description={<div><strong>Guidance</strong><p>Rich help is supported.</p></div>}
  aria-describedby="project-policy"
  errorDisplay="inline"
  rules={{ required: 'Enter a project name.' }}
/>
```

Native attributes and event handlers on text, number and textarea controls are
explicitly typed. Their existing string value callbacks and Formik unions remain
unchanged. Select wrappers expose the documented trigger associations rather than
arbitrary native input events. Frozen `FormikTextField`, `FormikNumberField` and
`FormikTextareaField` forward the base-field additions through their existing
catch-all props. `FormikSelectField` does not declare these options in its frozen
type interface. No new Formik or RHF wrapper family is added.

For custom input addons, compose `Field`, `FieldDescription`, `FieldError`,
`InputGroup`, `InputGroupInput` and `InputGroupAddon` from the `./primitives` entry.
Give each help/error node an ID, associate it on the actual control, and put
`aria-invalid` on that control when validation fails. This primitive composition
is available alongside the opinionated field wrappers.

## Palette and interaction tokens before v5 GA

The v5 token layer aligns the four legacy families to published UZH swatches. `uzh-red` maps to `uzh-orange`, `uzh-yellow` to `uzh-gold`, `uzh-lightgreen` to `uzh-apple`, and misspelled `uzh-turqoise` to `uzh-cyan`. House families use `df-grey` and `df-darkgreen`; their old `uzh-` names remain aliases. Base names and100/80/60/40/20 rungs keep compiling through5.x. The aliases point at the new values, so colors change at existing call sites before identifiers change. Berry80 is now the published `#8f0a2e`; Blue retains its intentional non-monotonic selected ladder.

Generate custom palette utilities by importing `@uzh-bf/design-system/css` in the consumer's Tailwind root stylesheet. The packed CSS carries public palette compiler metadata, so new names, retained aliases, variants and opacity utilities can be generated without scanning package source. A JavaScript import still loads shipped component rules; it does not feed metadata into another Tailwind compilation. No new stylesheet export is required.

The optional `scripts/rename-palette-utilities.mjs` helper in this repository defaults to a dry run over explicitly named UTF-8 files; pass `--write` to apply reviewed changes. It handles complete static color utility tokens in quoted class lists/strings and CSS `@apply`, preserving variants, rungs, opacity and important modifiers. Interpolated, escaped and arbitrary CSS expressions are reported and left untouched. Review the diff; this conservative token tool is not an AST migration and does not discover files or rewrite consumer code automatically. Deprecated aliases remain usable if the helper is not run.

Primary hover/pressed/container states and bare ring colors follow the selected theme's complete primary ramp. Hover and pressed currently share the approved80rung; container uses20. No new consumer branding property or generated intermediate shade is introduced. Disabled navigation foregrounds and owned component neutrals now use theme tokens; explicit caller utilities retain precedence. Tinted status text uses contrast-checked pairs: Apple5/Apple1 and Cyan5/Cyan1, Berry error text on Orange1, and the retained dark warning foreground because Gold5/Gold1 does not meet4.5:1 for ordinary text.

## Component default changes before v5 GA

| Component         | Previous default                 | Current default and explicit opt-out                                                                                                                                                                                                         |
| ----------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Badge             | Solid primary fill               | Theme primary container fill/primary-100 text; use `variant="solid"` for the former solid treatment                                                                                                                                          |
| Tooltip primitive | `text-xs`, unbounded content     | `text-sm`, 20rem maximum constrained to the viewport; explicit caller classes merge last                                                                                                                                                     |
| Tooltip wrapper   | 30rem maximum                    | Same desktop maximum constrained to the viewport; `className.tooltip` still takes precedence                                                                                                                                                 |
| UserNotification  | 8px padding and compact icon gap | 16px horizontal/14px vertical padding and 12px gap, retaining 14px text and tinted status fills; caller root styles take precedence; dismissible notifications retain the reserved right padding and minimum height for their dismiss button |
| Basic Button      | Ghost filled hover               | Transparent base/hover; focus indicator remains; caller hover utilities remain available                                                                                                                                                     |
| TabsList          | Intrinsic width                  | Full-width track; use `w-fit` or another explicit width utility to opt out                                                                                                                                                                   |
| TableCell         | No wrapping                      | Ordinary content wraps; use `whitespace-nowrap` explicitly where needed                                                                                                                                                                      |
| Header H1–H4      | 0.2em bottom margin              | Typography without outer margin; parent layout/caller classes own spacing and Prose retains document rhythm                                                                                                                                  |

Review these visual changes before upgrading; they intentionally land before GA. No consumer source is rewritten automatically. Sticky-header and modal tooltip keyboard/dismissal behavior, compact layout and explicit override examples are qualified separately from manual AT/Safari/device acceptance.

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

## Shared presentation compatibility

The primitive entry adds `AlertAction`, `AvatarBadge`, `AvatarGroup`,
`AvatarGroupCount` and the existing `useCarousel` hook. Their matching root
modules re-export these additions. Existing root wrappers keep their own APIs.

`Badge` adds `ghost` and `link`; `Card` adds `size="sm"`; `Item` adds `size="xs"`.
Card omission and explicit `default` retain existing insets. Avatar's explicit
`default` is 32px, matching omission; `sm`/`md`/`lg` remain 28/40/56px.
`Switch` adds compact `size="sm"`. `ToggleGroup` adds `spacing` and vertical
layout: omission remains joined, while positive spacing separates items.
Pagination Previous/Next accept upstream `text` alongside existing `label`;
`label` takes precedence, including an empty string. Custom pagination text also
sets its default accessible name; an explicit native `aria-label` still wins.
InputOTP defaults
`spellCheck` to false and accepts an explicit caller override.

Some composition contracts remain deliberate adaptations. ItemGroup has no
implicit list role; supply a valid list/listitem structure when that semantic
relationship applies. EmptyDescription renders a div, KbdGroup a kbd element,
and Spinner a status span. Their props and refs match the rendered element.
Spinner keeps its 28px default; use `className="size-4"` inside compact controls.
The Spinner does not accept SVG-only props or refs.

## Shared overlay and menu compatibility

The primitive entry adds `AlertDialogMedia`, compact AlertDialog Content, Button
variants/sizes on Action and Cancel, and Popover Header/Title/Description. The
matching root AlertDialog and Popover modules re-export their new parts. Popover
Title renders a div and Description a paragraph; their props and refs match.

`DialogFooter showCloseButton` defaults to false. `SheetContent showCloseButton`
defaults to true. Dialog and Popover keep caller-owned portal composition;
AlertDialog and Sheet retain their automatic portal/overlay. Existing root Modal
and other wrappers keep their own public APIs.

Checkbox and radio menu parts accept `inset`; omission preserves the indicator
reserve and caller classes still win. Raw Dropdown content retains the Radix
alignment default. Select keeps its `popper` omission default and explicit
`item-aligned` route, exposes position markers, and gives explicit `size="sm"`
a compact 32px trigger. Omitted/default trigger geometry is unchanged.

`CommandItem data-checked` adds a trailing check only for explicit true. Keyboard
focus and cmdk selection remain separate. CommandShortcut suppresses that check.
Legacy caller-owned indicators, including the root Combobox, omit `data-checked`
and gain no extra indicator or reserved spacing. CommandDialog still supplies its
implicit Command wrapper; close-button defaults and separator filtering remain.

## Calendar locale and grid compatibility

Calendar now applies the supplied DayPicker locale object to its default month
dropdown labels and day metadata. Omitted locale retains browser-default
formatting. A custom formatter or DayButton still replaces the default and keeps
its native arguments, labels and handlers. CalendarDayButton accepts the same
optional locale object for direct DayPicker compositions.

Use `classNames.month_grid` for the month table. The legacy `classNames.table`
customization remains supported when the canonical key is omitted; an explicit
canonical value wins. Explicit `dir` and `timeZone` continue to pass through
Calendar. Date values remain caller-owned; localized `data-day` strings are
presentation metadata rather than a date-storage format.

DateTimePicker's locale is a DayPicker locale object, such as `de` imported from
`date-fns/locale`. It affects the calendar. Trigger text follows `displayFormat`
and dayjs; time-control labels use `timeLabels`. Standalone DatePicker and
DateRangePicker retain their numeric trigger formats and existing props, and
Formik and RHF bindings retain their value/reset/error ownership.

The retained DateTimePicker `yearRange` option currently does not change Calendar
navigation bounds. Its contract repair remains a separate follow-up. Calendar's
omitted bounds remain January of the current year minus one through January of
the current year plus 99; explicit native bounds still win. Application-owned
non-Gregorian recipes and manual screen-reader/Safari/device qualification remain
separate from this locale update.

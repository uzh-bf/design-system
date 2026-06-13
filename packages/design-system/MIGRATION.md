# Migration: v4 → v5 (dual theme)

v5 introduces a **dual-theme** system. The same components now render under two
themes, selected by a `data-theme` attribute:

- **`neutral`** (default) — de-branded, shadcn-like. Applied on `:root`, so it is
  what you get with no extra setup.
- **`uzh`** — the UZH corporate-design theme (UZH blue/red palette, Source Sans 3).

Both themes share one set of components; only the CSS custom properties differ.
There is no JS theme engine — switching is a pure CSS-variable cascade.

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
`ThemeProvider`) resolves its tokens against the UZH theme. Nesting is allowed:
a `uzh` subtree inside a `neutral` page works, and vice versa.

## New exports

| Export          | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `ThemeProvider` | Renders a `data-theme` container; controlled or uncontrolled. |
| `useTheme`      | Reads `{ theme, setTheme }` from the nearest `ThemeProvider`. |
| `Theme`         | `'neutral' \| 'uzh'` type.                                    |

`ThemeProvider` is optional — a plain `data-theme="uzh"` attribute is enough.
Use the provider when you want an in-app theme toggle via `useTheme`.

## Fonts

The design system now `@import`s its webfonts (Source Sans 3 for `uzh`, JetBrains
Mono for monospace) from Google Fonts inside `tailwind.css`. No per-app font setup
is required. `neutral` uses the system font stack for its sans face.

> **CSP / privacy note.** The import fetches from `fonts.googleapis.com` /
> `fonts.gstatic.com` at runtime. Apps with a strict Content-Security-Policy must
> allow `style-src`/`font-src` for those hosts, or the fonts silently fall back.
> For GDPR-sensitive deployments that cannot send user IPs to Google, self-host
> the two families and drop the `@import` (tracked as a follow-up).

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

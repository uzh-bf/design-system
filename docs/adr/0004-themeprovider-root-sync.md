# ThemeProvider writes the theme to the document root

Status: Accepted (2026-08-18)

`ThemeProvider` does not render a themed container. It writes `data-theme` to
`document.documentElement` from a client effect and keeps it in sync with its
`theme` prop; its wrapper div carries only layout (`display: contents`) and the
consumer `className`. This follows the root-only theming ruling (D9,
2026-07-23): the packaged CSS declares every theme token at
`:root[data-theme='…']`, and a consumer ramp override per ADR 0003 targets the
same root selector.

The alternative — the provider re-declaring the theme layer on its own
container — was rejected because a nearer-ancestor `[data-theme]` match beats a
root-level declaration during custom-property resolution, so the container
silently shadowed consumer ramp overrides inside the provider subtree and left
portaled overlays outside the themed region.

## Consequences

- Server-rendered markup should carry `<html data-theme="…">` for the theme the
  app starts in; the attribute is otherwise written only on the client after
  hydration, so the first paint would fall back to the neutral theme.
- Several mounted providers do not create nested theme regions; the document
  root keeps the theme written last (last writer wins), and this is the
  documented behavior rather than a race to work around.
- The `dark` class belongs on the document root next to `data-theme`, not on
  the provider's `className`.
- Portaled overlays (dialogs, popovers, tooltips) resolve the same theme as the
  rest of the app without any wrapper-forwarding workaround.

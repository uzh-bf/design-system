# A1 cascade enumeration — measured in KlickerUZH (2026-08-20)

Klicker-side deliverable for design-system Phase 1 slice 0 (link loop) and the
step-1 gate of slice 6. Not committed; the design-system plan's `Progress`
section is the design-system session's to write.

## Link loop (slice 0) — what was run

Worktree `trees/ds-v5-alpha5-upgrade`, DevPod `rs-ds-v5-alpha5-upgrade`.

1. Copy `uzh-bf-design-system-5.0.0-alpha.5.tgz` from the design-system worktree
   into `project/_local/` (gitignored, and inside the container's bind mount).
2. Temporary override in `pnpm-workspace.yaml` (NOT `package.json` — pnpm 11 in
   this repo reads `overrides` from `pnpm-workspace.yaml`):
   `'@uzh-bf/design-system': file:./project/_local/uzh-bf-design-system-5.0.0-alpha.5.tgz`
3. `pnpm install --no-frozen-lockfile` inside the container. `minimumReleaseAge`
   does not reject a `file:` specifier; no exclude entry was needed.
4. Next dev caches must be cleared or the app keeps serving the old CSS even
   though `node_modules` already holds the new build:
   `rm -rf apps/{auth,frontend-manage,frontend-pwa}/.next`, kill the whole
   `turbo run dev` process tree including its `next dev` children, then
   `devrouter ensure .` on the host.
5. Discriminator: `--theme-destructive-text` in the served stylesheet —
   `#bf0d3e` = branch build, `#111` = published alpha.5.

Restore: revert the override, reinstall in-container, `git checkout -- pnpm-lock.yaml`,
delete the tarball, clear caches, `devrouter ensure .`, re-check the
discriminator reads `#111` again.

## Method

Two independent methods, run against `manage`, `pwa`, and `auth`:

- Static: for each design-system class string that pairs a base utility with a
  responsive variant of the same property, compare the byte offset of the last
  definition of each selector in the app's compiled stylesheet. Both sit in the
  single `@layer utilities` block, design-system output first, consumer output
  second, so a later base definition wins at every viewport.
- Live: inject the exact class strings into the running app at 1280px and read
  the computed style.

The two agree on all 15 cases in both apps measured live (30 comparisons).

Caveat on the live method: the probe injects the class strings into a detached
`div` positioned off-screen, so any rule whose rendering depends on ancestor
context is measured out of context. `md:w-auto` on the navigation-menu viewport
is the one affected row — `width: auto` on a detached block resolves to the host
width, which is indistinguishable from `w-full` winning, so that verdict rests on
the offset method alone. `sm:max-w-[520px]` is measured context-free too, though
`max-width` does not depend on ancestors the same way.

## Result — rules that lose in at least one Klicker app

| Design-system rule | Source | Loses to | manage | pwa | auth | Observable |
| --- | --- | --- | --- | --- | --- | --- |
| `sm:text-left` | `ui/dialog.js:84`, `ui/alert-dialog.js:65` | `text-center` | yes | yes | yes | yes — header stays centred |
| `sm:block` | `ui/pagination.js:72,90` | `hidden` | yes | yes | yes | yes — prev/next label never appears |
| `sm:flex` | `ui/sidebar.js:231` | `hidden` | yes | yes | yes | yes — rail never appears |
| `md:flex` | `ui/sidebar.js:171` | `hidden` | no | yes | yes | yes — sidebar container never appears |
| `md:block` | `ui/sidebar.js:147` | `hidden` | no | no | yes | yes — sidebar wrapper never appears |
| `md:w-auto` | `ui/navigation-menu.js:96` | `w-full` | yes | no | yes | offset method only — see caveat |
| `md:gap-1.5` | `ui/drawer.js:76` | `gap-0.5` | yes | yes | no | yes — 2px instead of 6px |
| `sm:max-w-[520px]` | `ui/alert-dialog.js:49` | `max-w-[calc(100%-2rem)]` | yes | no | no | yes — cap does not apply |
| `md:p-12` | `ui/empty.js:11` | `p-6` | yes | no | no | yes — 24px instead of 48px |
| `sm:grid-cols-7` / `md:grid-cols-9` / `lg:grid-cols-11` | `Collapsible.js:41` | `grid-cols-5` | yes | no | no | yes — stuck at 5 columns |
| `sm:pl-2.5` / `sm:pr-2.5` | `ui/pagination.js:68,87` | `px-2.5` | yes | yes | yes | no — same value |
| `md:text-sm` | `ui/textarea.js:16` | `text-sm` | yes | no | yes | no — same value |

Eleven observable rules across seven components; two further pairs lose but set
the same value, so nothing renders differently.

## Findings the design-system side needs before slice 6 step 2

1. **The plan's named positive control is not a member.** `sm:flex-row` on the
   dialog and alert-dialog footer wins in all three Klicker apps, because
   Klicker itself uses `sm:flex-row`, so the consumer re-emits the variant after
   its own base rule. The same holds for `md:flex-row` on the calendar,
   `col-span-*` on Collapsible, and `flex-col-reverse` on the footers.
2. **Membership is consumer-specific, not library-specific.** A rule loses only
   when that consumer's own Tailwind build emits the conflicting base utility
   and not the variant. `md:block`, `md:flex`, `md:p-12`, `sm:max-w-[520px]`,
   and the Collapsible grid each lose in some apps and not others — inside one
   monorepo, against one design-system build. A fix derived from this
   enumeration is correct for these three apps and cannot be assumed complete
   for another consumer.
3. **`@layer components` is already declared** and already precedes
   `utilities` in the compiled output (`@layer components;` at line 1343 of the
   manage bundle, `@layer utilities {` at 1345), so slice 6's packed-CSS
   assertion has something to assert against today.

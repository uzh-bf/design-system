---
module: toaster
date: 2026-10-24
problem_type: integration
severity: medium
symptoms:
  - "An OS preference change overrides a mounted Toaster's DS root mode."
root_cause: "Sonner 2.0.8 retains its system listener after a theme prop change."
tags: [sonner, theme, react-effects, accessibility]
---

# System preference overrides the resolved notification mode

## Problem

Sonner 2.0.8 registers a media-query listener when its theme is `system`,
and retains that listener when a later prop selects `light` or `dark`.
A wrapper that initially passes `system` while resolving the DS root can
therefore lose root-mode precedence after an OS preference change.

## Symptoms

The root remains in light mode, but an OS change makes an existing notification
report `data-sonner-theme="dark"`. This was reproduced with synthetic stories;
it is an upstream listener-lifetime issue, independent of toast-store identity.

## What Didn't Work

Observing only root attributes left Sonner's earlier listener active. An
assertion immediately after media emulation also passed before the browser's
change event reached the notification. It did not prove precedence persisted.

## Solution

The local mode hook owns root and media-query observation with cleanup, and
passes Sonner a concrete light/dark value. The existing priority remains
explicit mode, configured next-themes mode, valid DS root mode, then system
preference. See [the mode hook](../../../packages/design-system/src/ui/sonner.tsx#L25)
and [the integration draft](https://github.com/uzh-bf/design-system/pull/230).

## Why This Works

Sonner never receives `system`, so its persistent listener cannot install.
The wrapper reads OS preferences only through its own removable subscription
and applies them when the selected mode requires them. Notifications stay mounted.

## Prevention

The [existing root-mode regression](../../../packages/design-system/tests/contracts/layout-auxiliaries.spec.ts#L601)
waits for the actual media change and DOM settlement before checking that the
DS mode still wins. It then checks mount preservation and system fallback.
Recheck both the pinned runtime and this sequence when upgrading Sonner.

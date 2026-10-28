---
module: code-presentation
date: 2026-10-25
problem_type: integration
severity: medium
symptoms:
  - "Consumer compilation cannot generate parameterized utility values from compiled CSS alone."
  - "An eager highlighter import makes plain component leaves reach the highlighting runtime."
root_cause: "Browser CSS output and static JavaScript imports erase different kinds of optionality."
tags: [tailwind, shiki, packaging, server-components]
---

# Preserve optional highlighting and consumer utility compilation

## Problem

The design system ships compiled styles and server-compatible public entries.
Code presentation adds optional highlighting, while compatible scrolling and
shimmer recipes let consumers choose values outside the library's source.

A compiled stylesheet contains only generated selectors. It cannot teach a
consumer compiler how to generate another duration, spread or fade size.
Similarly, a plain component cannot defer a highlighter imported statically
through its dependency graph.

## Solution

Keep the highlighter core, JavaScript engine, themes and selected grammars behind
dynamic imports. Keep its public async helpers separate from the client hook's
module directive. Verify the existing public entries in a packed Server
Component and inspect plain component graphs for eager runtime imports.

Keep ordinary generated rules in the package stylesheet and append the selected
public `@utility` definitions in `src/copy.ts`. Browsers ignore those compiler
directives; consumer Tailwind compilation can use them to generate additional
values. Test both the packed stylesheet alone and a consumer compilation that
uses values absent from component markup.

## Verification

[Code presentation draft #236](https://github.com/uzh-bf/design-system/pull/236)
uses the existing packed Next and CSS ownership harnesses for these boundaries.
The static graph check supplements actual pre-activation and post-activation
browser requests. CSS/compiler metadata counts toward the shipped stylesheet
budget even though browsers ignore the directives.

Run packed harnesses serially when they rebuild the same workspace `dist`
directory. Separate processes with independent temporary consumers still
contend if their package build output is shared.

Manual assistive-technology and browser qualification remain separate from
these synthetic package checks.

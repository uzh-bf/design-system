# v5 CodeBlock, highlighting and compatible utilities

## Approval summary

Approval mode: executable batch. The user approved the October25 progress
review's next implementation package with “approved, go”. This derived plan
records that package before implementation; internal planning and review do not
create a second generic approval checkpoint.

Deliver the remaining eligible pinned CodeBlock family with the same ergonomic
root interfaces as the recent chat components, natural compound parts through
`./primitives`, optional lazy highlighting and compatible CSS utilities. Use exact
Shiki4.5.0, its JavaScript engine and individually loaded languages/themes.
The package already requires Node22+, above Shiki4's Node20 minimum. Plain code
is the readable default, including before hydration and after loading failure.
Applications own Markdown, AI transport/state and block source.

Use the existing public entries: export server-callable `loadHighlighter` and
`highlightCode` from root/primitives and the client `useHighlightedCode` from its
own marked module. Preserve module boundaries; add no public subpath or backend.
The first packed Server Component proof must establish that these helpers stay
callable without pulling client highlighting into the server-rendered example.
If this cannot work through the existing entries, surface the concrete API
decision before adding a subpath.

Delivery is one coherent draft on `rs/v5-code-highlighting`, based on held
Questionnaire draft235 at `2a8d3f4013ab93bf2ffe7b053210369ab00051e4`.
A new local native stack uses `rs/v5-questionnaire` as trunk, preserving the
existing six-layer stack231. Multiple implementation commits belong to this
one package. Do not append a seventh layer to stack231 or alter its topology.

Acceptance includes typed props/refs/selectors, real copy/failure/scroll/wrap and
highlighting interactions, theme/RTL/reduced-motion coverage, server and hydrated
packed Next proof, the approved CSS ceiling and unchanged JavaScript budgets, independent reviews, inspected
synthetic screenshots, exact installed-archive proof and qualified hosted CI.
Ordinary commits/pushes and draft delivery are authorized. Merging, readiness,
force/protected pushes, publishing, deployment, consumer writes, human messages
and new automations remain withheld. Stop after the qualified draft and release
of the exact task runtime. Later residual, composition and GA packages retain
their own boundaries.

## Execution details

### Evidence, scope and component ownership

Full-path package, execution mode standard. Artifacts stay in `project/`.
The verified full-progress report and original Opus response live under
`project/_local/reviews/2026-10-25-v5-full-progress-*`. Reuse qualified source,
consumer and review evidence wherever its acceptance boundary is unchanged.
Pinned shadcn source remains `3d98900e9b73c45f035f8109e9d41ba6a51685e7`;
CLI4.22.1 resolves the current docs and is not the catalog's source revision.
Read the official Radix CodeBlock route: CLI defaults may return Base UI URLs.

No product identity, persistence or AI workflow primitive changes. Reuse the
existing presentation, Button, token, selector and public-entry contracts.
Extend code presentation with copy and optional syntax rendering. Shiki owns
tokenization and grammar continuation; applications own language choice and
untrusted text provenance. Render React text nodes and style properties, never
raw HTML or injected scripts. No source content goes to a network service.

The pinned CodeBlock source itself does not call highlighting, while its registry
manifest names the hook. Keep the visual parts independent and document explicit
composition. Do not infer a Base UI dependency from the CLI's default URL.

### Public interfaces and behavior

All eight natural parts are exported from primitives: `CodeBlock`,
`CodeBlockHeader`, `CodeBlockTitle`, `CodeBlockActions`, `CodeBlockCopyButton`,
`CodeBlockContent`, `CodeBlockLine`, `CodeBlockFooter`.
Preserve upstream root variants default/destructive and sizes default/sm;
Content accepts wrap, lineNumbers and startLine with an actual pre ref;
Line accepts default/added/removed/highlighted and holds empty lines.
Code remains LTR by default inside RTL applications; caller native props win.
Keyboard users can focus and scroll content. Diff cues include a textual or
semantic marker, with colour as an additional cue. Mark line numbers as
decorative where supported; keep selection/copy free of synthetic numbers.

The root composite follows existing exclusive configuration/custom-children
unions. Configured use requires `code: string`; custom use requires children
and excludes code-generation options. Its `className` slots are root, header,
title, actions, copy, content, line and footer. Reuse `TestSelectors`/`testAttrs`
with data, dataHeader, dataTitle, dataActions, dataCopy, dataContent and dataFooter.
The root inherits native div attributes/events/ref. Configured code accepts
titleContent/footer/actions nodes (native title remains a tooltip), language, highlight=false, wrap, lineNumbers,
startLine, readonly per-line variant/selector configuration, native content
props/ref and copy=true or a typed copy-options object. Copy options derive from
the actual primitive button, excluding generated value/className/children.
Custom children own their internal parts/slots. No simultaneous generated code
and custom content; no second highlighter control model.

Copy is always a user action. Keep native button type=button, ref/attributes and
caller onClick; preventDefault suppresses copying. Prefer navigator.clipboard;
when unavailable or rejected, attempt a bounded textarea/execCommand fallback
and restore prior focus/selection. Failure produces an accessible status and
optional onCopyError(error) callback, never a false success. `onCopied` fires
once after success. Localizable copy/copied/error labels and caller aria labels
are supported. Timers and pending work do not update unmounted controls.

Highlighting exports retain the official two-argument hook and async helper
shapes. Supported language names are bash/css/diff/html/javascript/json/jsx/
markdown/python/sql/tsx/typescript/yaml and upstream aliases, plus ansi.
Unknown names return null from helpers and plain lines from the hook, without
loading engines. The hook ignores one trailing newline as upstream does;
copy uses the original exact string. Reuse completed-line tokens and native
grammar continuation while appending streams. Value replacement and language
changes invalidate the right cache; slow older loads cannot overwrite newer
language state. Loading/tokenization failure leaves readable text. Async helper
failure may reject so server callers can choose their fallback explicitly.

Use dynamic imports for Shiki core, JS engine, themes and selected grammars;
type-only imports remain type-only. No eager Shiki runtime in root/primitives
Button or plain CodeBlock leaves. Cache successful engine/language initialization
without permanently caching rejected initialization promises. Preserve explicit
light/dark syntax colours within the supported neutral-light/dark and UZH-light
surfaces; no UZH-dark promise. Avoid the full bundled language registry,
precompiled grammars and WASM. New source does not import RHF/Formik or AI SDKs.

### CSS utilities and chat disposition

Extend the existing tailwind.css with the pinned scroll-fade family (all/x/y,
t/b/l/r/s/e/none plus numeric/arbitrary size customization), no-scrollbar and
shimmer once/reverse/colour/duration/spread/angle support. Use existing CSS build
and packed CSS verifier, not a new stylesheet/runtime/compiler. Keep exported
utility definitions available to consumer Tailwind compilation where needed;
compiled ordinary styles must work through the documented CSS import alone.
Test representative emitted and consumer-compiled parameterized utilities.

Adopt official text-shimmer semantics for the newly introduced chat `shimmer`
utility and retain `animate-shimmer` skeleton behavior. Document this visual
adaptation and capture running Trace/processing Attachment. Reduced motion must
leave ordinary readable text with no forced transparent text fill.
Use scroll-aware fades only when the browser supports the necessary timeline;
the unsupported/reduced-motion fallback leaves content readable. Keep visible
native scrollbars and focus treatment. Applying fades must not hide focused
actions or the last code/message/attachment at either edge.

After utility proof, apply the matching supported fade treatment to code content,
MessageScroller and AttachmentGroup, or record a verified deliberate adaptation
if masking conflicts with focus/readability. Do not add a custom scrolling engine.
The settled native scrolling algorithms and qualified earlier PRs are preserved.
The user explicitly approved a 34 kB compiled CSS ceiling after the measured
overflow. The integrated candidate measures 32,479 Brotli bytes against the
29,984-byte baseline. JavaScript thresholds remain unchanged. Do not prune
unrelated CSS or raise any other budget.

### Ownership, slices and verification portfolio

Delegation Map: main owns slices1,2,3 exactly once, including shared integration.
Slice1 has one disjoint trusted native executor contribution restricted to the
three ui/highlighter/hook modules; main owns the root and all other paths.
Slice2 depends on the usable slice1 API; slice3 depends on both and accepts only
the exact final draft. Native role/model availability is recorded before dispatch.

| Workstream                      | Owner and scope                                                                                                          | Acceptance                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Plan, seams and delivery        | Main; exports/manifests/lockfiles, root wrapper, tests, source integration, docs, runtime and forge                      | One functional package with exact proof and draft delivery                                                   |
| Code parts and highlighting     | Trusted executor; new ui/code-block.tsx, lib/highlighter.tsx and hooks/use-highlighted-code.ts only after plan hardening | Eight parts, native props, lazy helpers/hook and error-safe copy                                             |
| CSS compatibility               | Main; existing CSS/copy paths and two affected chat class lists                                                          | Compiled/default and consumer-compiled utility behavior within approved CSS and unchanged JavaScript budgets |
| Simplification and risk reviews | Dedicated read-only reviewers on committed ranges                                                                        | One net-simplification pass and one combined risk disposition per substantive slice                          |
| Integrated final review         | Configured Claude read-only exact complete range                                                                         | Correctness, spec, maintainability, focused code/dependency security and architecture/SSR lenses             |

1. Code display tracer: add ui/code-block.tsx, CodeBlock.tsx, lib/highlighter.tsx,
   hooks/use-highlighted-code.ts, CodeBlock.stories.tsx and code-block.spec.ts.
   Parts, ergonomic root, plain-copy/failure and initial syntax helpers include
   exact Shiki dependency/lock integration before build or packed checks; extend
   existing public/type and packed Server Component seams.
   Validate existing-entry server calls and lazy leaf imports early. Commit this
   useful complete path, then simplify/review its changed boundaries.
2. Highlighting/utility tracer: complete streaming/language/failure/SSR behavior,
   CSS families and affected chat dispositions, with docs integration. Before
   committing complete utility breadth, measure candidate CSS including retained
   consumer utility definitions through existing build/copy/size tooling. On
   overflow, record exact delta and finish unaffected work before the bounded
   budget decision; no threshold increase or unrelated pruning.
   Extend focused browser/packed/CSS seams and run affected review on that range.
3. Integrated finish: required full checks once on stable source, galleries,
   exact archive proof, complete final review, ordinary push/draft creation,
   exact-head hosted qualification and feedback settle. Preserve held heads.

| Observable risk                                            | Maintained test seam                                                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Props/refs/selectors or custom/config union breaks         | Existing public-contracts.types.ts and test-selectors.types.ts; new code-block.spec.ts contract suite with synthetic fixtures                                      |
| Copy writes wrong text, lies on failure or steals focus    | Same browser suite: native clipboard/fallback/rejection/cancel, native form and meaningful refs/selectors                                                          |
| Streaming/language race or load failure hides/injects text | Add new cases in the same suite and existing packed Next fixture; assert token/source text behavior, not fixture wording; HTML-looking synthetic text remains text |
| Scrolling/wrap/diff/motion/theme/RTL fails                 | New CodeBlock.stories.tsx plus existing ChatPresentation story; narrow/wide and supported themes, real geometry/keyboard/axe/captures                              |
| Package mixes client/server or eager heavy modules         | Existing check-package-size.mjs, packed root-only type probe, Next app/page.tsx and auxiliary-leaf/tests, both bundlers and current/minimum RHF/Recharts cells     |
| Utility styles missing after packing                       | Extend existing verify-packed-css.mjs using test-owned utility fixtures and computed masks/colour/fill/animation under normal/reduced/RTL conditions               |

New files permitted under packages/design-system/src: ui/code-block.tsx,
CodeBlock.tsx, CodeBlock.stories.tsx, lib/highlighter.tsx,
hooks/use-highlighted-code.ts. Add tests/contracts/code-block.spec.ts only;
extend existing type, a11y inventory, packed and theme tests rather than creating
a parallel app or tool. Existing index/primitives, package manifests and their
lockfiles, CSS/copy, size checks, MIGRATION, README where necessary and relevant
project roadmap/matrix/assessment documents may change. No unrelated dependency
refreshes, residual picker/yearRange fixes or consumer-source changes here.

Run the existing package check/lint/format/build/Ladle and focused browser/a11y
commands, then the stable full contracts/smokes and required package/theme/size
gates. Retain the three current/minimum packed cells and both Next bundlers.
Use a distinct server-only mode in the existing page which omits all enabled
client highlighter leaves, calls the helper through the public entries and
verifies no-JS output. A separate client mode starts disabled, records requests
and opts in, proving no engine/grammar request before activation and successful
loading afterward. Extend existing size/chunk markers with plain root/primitive
CodeBlock and Shiki absence; inspect emitted client graphs separately from lazy
chunks. Re-export the marked client hook through the existing doors, retaining
its own module directive.
Prove server-generated highlighted content is readable without JS and does not
ship Shiki to the client when only server highlighting is used. Prove client
highlighting loads only after opt-in. Reuse earlier native context/npm proofs
unless this package changes those contracts. Exact package/archive/installed-file
proof and synthetic screenshot publication/read-back follow existing tooling.

### Documentation, runtime and terminal condition

Reconcile delivered233–235 status, runtime ownership and the remaining eligible
catalog rows in the canonical GA/UZH roadmaps, capability matrix and composition
assessment. Add the new API/async/fallback/utility guidance to MIGRATION rather
than repeating the complete catalog under its theme-only New exports heading.
Record remaining picker, harness, UZH traceability, composition, manual and
consumer gates honestly; do not turn this component package into those packages.

Use only the existing DS verification container identified by the exact worktree
source bind. Git/gh run on host; installs/builds/tests run in its /workspace copy.
After final runtime-dependent evidence, stop it and verify exited state. No
Klicker/GBL runtime touch. No permanent agent/provider configuration changes.

Terminal: one qualified, independently reviewed draft at its exact held head,
complete package/browser/capture evidence, clean task worktree and stopped task
runtime. If hosted CI remains active, use one supported blocking watcher; no
new deferred automation without user authorization. Required review/verification
unavailability, public-entry incompatibility, real CSS budget overflow, new
backend requirement or material contract/topology change is a concrete blocker.

## Progress

Implementation is prepared in the existing task worktree on
`rs/v5-code-highlighting`, above held Questionnaire base `2a8d3f401`.
Display/highlighting slice1 is committed as `4ac4d6d7f`; the prepared utility
slice and documentation remain uncommitted while slice1 reviews run. The CSS
decision is resolved at34kB. No new draft or push exists.
The existing six-layer stack and consumer repositories remain untouched.
Planner round2 approved the hardened plan. The optional opposing-provider pass
was unavailable; required source reviews remain armed. The executor is closed
and main owns the integrated source.

Both component doors, ergonomic props, copy/fallback/error behavior, lazy Shiki
helpers/hook and utility families are implemented. Verification passes include
package types/lint/build, 728 stable browser contracts/smokes, five new focused
contracts, six closed-story accessibility cases, 704 theme assertions, 336
responsive assertions, packed CSS/compiler utility proof, all three packed
consumer cells and both Next bundlers across current/minimum dependency cells.
The existing type, accessibility, packed Next and CSS seams were extended;
no parallel application or test framework was added. Focused executable-source
Opengrep reports no findings. Shared build-directory contention in an early
parallel matrix attempt was diagnosed; the three minimum matrices passed when
serialized.

Active-state checks found and verified corrections for the UZH highlighted
keyword contrast and neutral-dark copy-error contrast. The final focused
browser run passes all five cases; eight synthetic responsive/theme/error/RTL/
reduced-motion captures have no serious or critical axe findings. Their ignored
gallery records the dirty-tree fingerprint and the engineering capture-tool
limitation. Manual screen-reader, Safari and device qualification remains open.
The candidate archive matches all 304 installed files; exact receipts and
producing logs live in `project/_local/reviews/2026-10-25-code-highlighting-progress.md`.

CSS baseline is 29,984 Brotli bytes; the integrated candidate measures 32,479.
The user approved the 34 kB CSS ceiling on October25. JavaScript thresholds
remain unchanged. The measured budget decision is resolved; implementation
simplification, risk review and final review are pending their immutable
committed ranges. Continue the planned separate slice commits and their reviews
through draft/CI qualification. Runtime ownership and stopped-state receipts
are recorded in the same ignored progress journal.

Slice1 simplification accepted: the retained language-promise map replaces a
redundant success Set. The trusted native simplifier completed; trusted Claude
slice review is running on the immutable range. The full candidate passes all
size and dependency-marker gates. Code content deliberately retains an unmasked
horizontal surface for line numbers and diff cues; message/attachment fade
adoption follows slice2. Current packed Next proof is being refreshed for its
stronger post-activation request assertion.

Normal-motion capture review found that the upstream light shimmer highlight
washed out status text. The default now follows the theme foreground, while
custom colours and all utility identifiers retain their native contracts.
Affected running Trace/processing Attachment captures and packed CSS checks
are refreshed before the utility slice is committed.

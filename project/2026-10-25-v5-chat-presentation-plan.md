# Chat and AI presentation components for v5

## Approval summary

Complete the next supported shadcn catalog package with reusable chat and
clarification presentation components. Add the official Radix-compatible Message,
Bubble, Marker, Attachment, Trace, MessageScroller and Questionnaire families.
Keep the established ergonomic root interfaces: named styling slots, structured
test selectors, typed configuration, native attributes and events, explicit refs,
and custom React content. Expose the natural compound APIs through `./primitives`.
All existing public components and callbacks retain their contracts. Scroller
refs target the scroll viewport; the native root registration remains internal.

Reuse the upstream headless scrolling and questionnaire engines through exact
`@shadcn/react@0.3.1`. Its published artifact imports React and its own shared
chunk, with no Base UI or React Aria dependency. React 19 fits the existing peer
range. Keep model calls, conversation state, uploads, tool execution, persistence,
Markdown and highlighting in applications or their separately planned packages.

The consequential risks are scroll-position loss, inaccessible dynamic content,
questionnaire submission and focus, server/hydration disagreement, and dependency
or CSS growth for unrelated components. Acceptance requires public type and prop
contracts, real browser interaction and accessibility evidence, both themes,
packed Next consumers under both bundlers, dependency/module boundaries, exact
archive proof, independent reviews and passing CI. Deliver two qualified
stacked drafts above held Resizable [#233](https://github.com/uzh-bf/design-system/pull/233).

Approval mode: executable batch, approved by the user on October25. The user approved proceeding with
this capability and preserving standardized prop interfaces. The user approved the reviewed two-layer topology and its frozen public API.
Approval covers bounded implementation, configured reviews, normal task commits
and pushes, and qualified draft delivery. Merging, marking ready, publishing,
deployment, consumer writes, external messages and new automations remain separate gates.
A new backend, a replacement of existing prop contracts, or further stack layers
requires a new ruling. No native goal was requested for this package.

## Execution details

### Baseline and boundaries

Boundary owner: self. Execution mode: standard, full path; main runtime identity
is not asserted to be on the solo allowlist. Reuse the existing task worktree
`trees/rs-v5-uzh-alignment`, local branch `rs/v5-chat-presentation`. The target is
`rs/v5-resizable-native-v4` at `cb1c16769cc5f9b07f68d7e2e5fcea141fcef41a`.
Fresh fetch confirms the target is held; local branch starts zero ahead/behind
it and 350 ahead/3 behind `origin/main`. Main is not this draft's target.
The primary checkout and user-owned files remain untouched.

Approved delivery topology: append `rs/v5-chat-presentation` above #233, then
`rs/v5-questionnaire` above the qualified chat head. Native stack231 then has
six layers, retaining all four existing lower heads. Chat is one conversation
presentation/scroll package; Questionnaire is a separate form capability that
reuses the pinned dependency. Each layer must qualify independently. No rebase, restack, force push or lower-head mutation. No PR exists
for either new layer yet. Do not create a documentation-only draft. The shared batch plan is the first commit on the chat implementation branch
after completed planning review and user approval. Questionnaire updates its Progress
as the second phase; no plan-only draft is created.

ADRs0001/0002 own public entry and RHF isolation; ADR0008 owns the supported
backend scope. ADR0011 records the already-approved native runtime ownership
and mixed-context obligation. Its new file is docs/adr/0011-native-chat-runtime.md. No product primitive is created: these are presentation and
interaction surfaces composing application-owned conversation, attachments,
workflow status and answers. They do not own network effects or product policy.

### Evidence and source disposition

The finite catalog baseline remains shadcn source
`3d98900e9b73c45f035f8109e9d41ba6a51685e7`. The seven Radix recipes are present
in the retained public-source cache. Current shadcn CLI4.22.1 registry views also
resolve all seven `radix-rhea` families; names and dependency ownership agree.
CLI docs lookup resolves Trace and Questionnaire and omits five existing pages;
record that lookup limitation rather than treating absence as a scope exclusion.
Context7 supplies the current headless scrolling and form guidance.

The exact npm0.3.1 archive matches registry integrity. All seven shipped code,
declaration and metadata files were inspected; JS imports are `react`,
`react/jsx-runtime` and a local chunk. No Base UI/React Aria closure was observed.
Its React and @types/react peers are optional in package metadata; React remains
required by actual runtime imports and the DS peer contract. It exports only
`./message-scroller` and `./questionnaire`. Use those subpaths,
local `cn`, installed CVA, individual Radix Slot and existing Button/Collapsible;
do not add the `cn` package or the aggregate `radix-ui` package.

Preserve the pinned official API below; current style-specific registry output
is comparison evidence, not authority to replace settled UZH tokens or enlarge
scope. Adapt only imports, icons, existing themes, reduced motion and explicitly
verified CSS utilities. Reuse existing shimmer keyframes; add only missing
required utility definitions to existing CSS. No new global stylesheet.

| Family          | Required primitive exports                                                                                                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Message         | MessageGroup, Message, MessageAvatar, MessageContent, MessageHeader, MessageFooter                                                                                                                                                                                                                                               |
| Bubble          | BubbleGroup, Bubble, BubbleContent, BubbleReactions                                                                                                                                                                                                                                                                              |
| Marker          | Marker, MarkerIcon, MarkerContent, markerVariants                                                                                                                                                                                                                                                                                |
| Attachment      | Attachment, AttachmentGroup, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger                                                                                                                                                                  |
| Trace           | Trace, TraceLine, TraceIcon, TraceTitle, TraceDescription, TraceCollapsible, TraceCollapsibleTrigger, TraceCollapsibleContent                                                                                                                                                                                                    |
| MessageScroller | MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility                                                                                                            |
| Questionnaire   | Questionnaire, QuestionnaireProgress, QuestionnaireItem, QuestionnaireTitle, QuestionnaireDescription, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireChoiceDescription, QuestionnaireInput, QuestionnaireError, QuestionnaireActions, QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, QuestionnaireSubmit |

### Root prop contracts

These are component-specific interfaces following existing wrappers, not a new
universal props framework. Export each public Props/ClassName/config type from
its component module and root index. Preserve all existing root prop names and
callback semantics; new types cannot introduce loose catch-all index signatures.
Primitive parts retain native prop types, className strings and render/asChild
composition. Document added same-name entry collisions per ADR0001.

Every new wrapper supports `data?: {cy?: string; test?: string}` on its root,
named `className` slots merged with defaults through existing utilities,
ReactNode content, relevant native attributes/events, and its actual ref target.
Use targeted `dataContent`-style props or item-level `data` only for rendered
parts that need independent selection. Never expose unwired slots/selectors.
Root wrappers with a fixed DOM target omit polymorphic `asChild`/`render` when
that would invalidate the promised ref or automatic layout. The full native
composition stays available through primitives. Native `aria-labelledby` wins
over a convenience fallback name. Avoid a chat-role
prop named `role` that could collide with HTML/ARIA semantics.

| Root component  | Ergonomic contract and ref target                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Message         | Native align; children body plus optional avatar/header/footer ReactNodes; root/avatar/content/header/footer styling slots. Ref targets root div.                                                                                                                                                                                                                                                                                                            |
| Bubble          | Native variant/align, children content and optional reactions; root/content/reactions slots. Ref targets root div.                                                                                                                                                                                                                                                                                                                                           |
| Marker          | Native variants, children content and optional icon; root/icon/content slots. Ref targets root div; polymorphic composition remains available through the primitive.                                                                                                                                                                                                                                                                                         |
| Attachment      | Native state/size/orientation; media/title/description/actions ReactNodes and explicit children/custom-content route. Root/media/content/title/description/actions slots; no upload execution. Ref targets root div.                                                                                                                                                                                                                                         |
| Trace           | Readonly items with stable id, title, optional description/icon/content, native status and the exact upstream controlled/uncontrolled open/defaultOpen/onOpenChange union. Root/line/icon/title/description/trigger/content slots; config item data selects rows. Ref targets root div; no execution engine or alternate status machine.                                                                                                                     |
| MessageScroller | Readonly stable-id items containing ReactNodes and optional scrollAnchor, or custom children as an exclusive union. Native behavior options stay native; root/viewport/content/item/button/spacer/footer slots. The public ref targets the scroll viewport; native root registration stays internal; an optional footer renders inside the provider and outside the viewport. Typed viewport props allow aria/id/events without redirecting root attributes. |
| Questionnaire   | Readonly native item definitions extended with presentation label/description, choice labels, multiple and optional freeform input; root native item/defaultItem/onItemChange and form events. Named region/action slots and localizable labels; ref targets form. Submit uses native FormEvent/FormData; no parallel answers/state transport API.                                                                                                           |

Root wrappers compose the same canonical primitive parts. Configuration and
custom children are mutually exclusive wherever both would render the same
content. No second implementation of scrolling, answer validation, native input
selection or controllable state. Questionnaire uses its native engine, without
importing RHF/Formik or changing their existing validation ownership.

### Concrete prop adaptation rules

Use `Omit<React.ComponentProps<typeof Primitive>, ...>` to replace only fields
whose ergonomic meaning differs: className, composed children and conflicting
content properties such as Attachment title. Do not mask unrelated DOM props.
No root `role` aliases. Fixed-element wrappers omit polymorphic render/asChild;
the full primitive entry keeps them. New declared callbacks forward the native
payload exactly once and honor preventDefault where the native contract does.
Existing callback names and signatures are never rewritten for consistency.

Questionnaire ClassName keys are root, progress, item, title, description,
choices, choice, choiceDescription, input, error, actions, previous, skip, next
and submit. ChoiceInput is the native hidden input inside Choice; do not promise
an unwired root input-style slot for it. Other families use exactly their table's
slots. A slot applies when the wrapper renders that part; custom children own
their own internal part classes.

Named part selector props match rendered part names: for Message, dataAvatar,
dataContent, dataHeader and dataFooter; for Bubble, dataContent/dataReactions;
for Marker, dataIcon/dataContent; for Attachment, dataMedia/dataContent/dataTitle/
dataDescription/dataActions; for Scroller, dataViewport/dataContent/dataButton/dataFooter.
Trace config items and Questionnaire questions/choices/freeform inputs carry
item-level data, matching existing Select item selectors. Questionnaire may
also expose dataProgress/dataActions/dataPrevious/dataSkip/dataNext/dataSubmit.
All selector objects have the existing optional cy/test fields and are stripped
before primitive DOM passthrough.

Root Questionnaire item config extends native metadata with title and optional
description ReactNodes, multiple, optional error ReactNode/invalid flag, and
readonly choices with value, label, optional description/disabled/data and
native checked/defaultChecked/onChange. An optional input config derives from
`React.ComponentProps<typeof QuestionnairePrimitive.Input>`, omitting
className/render/children/ref and adding label/data. Keep the native exclusion
of name/form and the exact supported input-type union; the engine owns answer
association. No arbitrary HTMLInputElement props bypass those restrictions. Use the native headless definition
as the single collection; map only supported fields into its engine and render
presentation fields into parts. The active item contract is native
item/defaultItem/onItemChange; onSubmit/onReset remain form events. An optional typed labels object supplies previous/skip/next/submit strings,
progressAriaLabel, a progress formatter returning a string, requiredError and
optionalError, with English defaults. The same formatted progress is visible and
used for aria-valuetext. Override DS-owned text; native browser validity messages
follow the browser locale. Use the native Progress render state, not a duplicate
active-item state. Full custom part composition uses primitives;
there is no alternative root answer model or RHF binding in this package.

Examples of the intended root ergonomics:

```tsx
<Message
  align="end"
  avatar={<Avatar />}
  className={{ root: 'max-w-2xl', content: 'gap-2' }}
  data={{ test: 'message' }}
  dataContent={{ test: 'message-body' }}
>
  <Bubble variant="muted">{content}</Bubble>
</Message>

<Questionnaire
  items={questions}
  className={{ root: 'max-w-xl', choice: 'rounded-md' }}
  data={{ test: 'clarification' }}
  onSubmit={(event) => {
    event.preventDefault()
    consumeAnswers(new FormData(event.currentTarget))
  }}
/>
```

These examples show config and existing conventions; they do not install an
Avatar, add a new content schema, or give the library a consumeAnswers service.

### Action and scroller option shapes

Attachment adds optional `triggerProps`, derived from
`Omit<React.ComponentProps<typeof AttachmentTrigger>, 'asChild' | 'className' |
'children' | 'ref'>`, and `triggerRef?: React.Ref<HTMLButtonElement>`. This
config renders the native trigger button; its native onClick, disabled and other
button attributes flow to that button, not the outer div. `triggerAriaLabel` is
a convenience fallback. Naming precedence is native aria-labelledby, native
aria-label, triggerAriaLabel, then the generated title ID. A trigger without any
accessible naming source is a type/runtime contract violation. No triggerProps
means passive display. Add className.trigger and dataTrigger only for that
rendered part; root div click/ref/events remain independent of trigger props.

Root MessageScroller combines disjoint native option types explicitly:
provider options autoScroll/defaultScrollPosition/scrollEdgeThreshold/
scrollPreviousItemPeek/scrollMargin are top-level; viewportProps derives from
Viewport props excluding className/children/ref; buttonProps derives from Button
props excluding className/children/render/ref. Add localized jumpLabel and
jumpButtonRef for the actual button. preserveScrollOnPrepend belongs to
viewportProps; caller behavior belongs to buttonProps. Forward native root
DOM attributes from the Root props excluding children/className/ref. Neither
provider nor viewport options are spread onto that root DOM node.

Exact0.3.1 native Root spreads caller props after its internal registration ref.
Passing an external root ref would replace engine registration. The new DS
primitive MessageScroller therefore omits Root ref from its public type and
forwards none; MessageScrollerViewport retains its safe native ref composition.
The ergonomic root MessageScroller ref targets that viewport. There is no
rootRef/viewportRef alias or replacement native engine. Test a delivered viewport
ref alongside working native prepend/anchor behavior. Document this bounded
native limitation; do not patch node_modules or add an outer ref-only DOM layer.

### Interaction and rendering contracts

Message/Trace/Attachment preserve DOM reading order, intrinsic wrapping and
accessible names for actions. Start/end alignment is logical and works in RTL.
Status indicators retain readable text; loading/error are not color-only.
A configured Attachment open action renders a named native trigger linked to
the title (or an explicit triggerAriaLabel); actions remain above its overlay
and independently keyboard/pointer operable. Passive attachments have no empty
clickable overlay. Native TraceCollapsibleTrigger owns its button; never nest
root Button around it. Trace
expansion is keyboard-operable and controlled props report native state changes.
No live-region announcement is added per streaming token by default.

MessageScroller follows incoming growth at the live edge, yields to user scroll,
preserves reading position on prepend, supports explicit anchors and jump
controls, and never steals focus on append. Preserve native defaults: autoScroll=false,
defaultScrollPosition=end, preserveScrollOnPrepend=true and scrollAnchor=false.
Examples opt into autoScroll for a live conversation. Stable message IDs drive
scrollToMessage and prepend preservation. The provider is internal to the root
composite; child components in its footer can use the shared public hooks.
Keep the composer outside the viewport, with jump controls positioned inside
the viewport region so they do not cover the footer. Native jump-button default is smooth;
under reduced motion the DS default must request instant scrolling. Explicit
caller behavior remains caller-controlled. Test initial position and late content
resize, not only hook snapshots. Use the native provider/commands; no DS observer
or scrollTop algorithm. Server HTML must remain readable before JavaScript: omit the recipe's
`data-pending-scroll:invisible` class at both DS doors while retaining the native
pending attribute. Accept an initial-position flash in the readable default;
apps needing precise first paint own the documented optional script. The native
content-visibility item optimization stays only if off-screen jump and accessible
reading-order checks pass; otherwise omit those optional optimization classes.
Any optional first-paint positioning script stays application-owned, supports
CSP nonce and has no unsafe message interpolation; the package injects no script.

Questionnaire handles single/multiple choice, freeform, required/optional skip,
disabled items, native form submission and reset, controlled active item and
localized actions. Verify associated labels/descriptions/errors, keyboard focus
and shortcut behavior, actual FormData and absence of nested forms/buttons.
Server-rendered item metadata must agree with hydration; avoid blank progress,
actions or changed default active items. Persistence/branching/cancel/close stay
with the containing application. No personal data in fixtures or captures.

### Test portfolio and verification

| Consequential risk                                                | Test obligation                                                                                                   | Primary seam and owner                                                                                                                                                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ergonomic props diverge or parts ignore overrides                 | Extend existing public-contracts.types.ts and test-selectors.types.ts; add new chat-presentation.spec.ts          | Main: public type acceptance/rejection and browser slot/selector/ref/event/custom-content targets, including no primitive Root ref and restricted Questionnaire inputs.                                      |
| Reading order, action semantics or responsive/theme contrast fail | Add new cases to that same browser spec; extend existing smoke/a11y inventories                                   | Main: ChatPresentation/Questionnaire stories, keyboard/RTL/narrow/wide/neutral light-dark/UZH/reduced motion; named attachment trigger independent of actions.                                               |
| Scrolling loses position or hides content                         | Add new cases in the same browser spec and extend existing packed Next auxiliaries.spec.ts                        | Main: append/growth/manual override/prepend/anchors/late resize, delivered viewport ref plus native registration, SSR/no-JS visibility and focus.                                                            |
| Questionnaire loses answers or misvalidates                       | Extend the same browser/type and packed Next fixtures in layer2                                                   | Main: required/optional/multiple/freeform/reset/controlled-item/FormData and server/hydration state.                                                                                                         |
| Auxiliary leaks or CSS grows beyond budget                        | Extend existing check-package-size.mjs and marker expectations; no new budget tool                                | Main: forbid @shadcn/react modules in root/primitive Button leaves; retain CSS30kB/preflight3kB and existing entry ceilings. New modules never import RHF/Formik/Shiki/Markdown/AI SDK or excluded backends. |
| Package depends on workspace resolution                           | Extend existing packed-consumers/scripts/verify.sh, root-only/src/index.ts and Next app/auxiliary leaf/page/tests | Main: current/minimum packed/Next cells and both bundlers; one default-cell npm/pnpm native-context identity check, exact archive/installed-file comparison.                                                 |

For the npm/pnpm proof, extend the existing packed verifier after its default
pnpm cell: install the exact same unpublished archive plus explicitly pinned
fixture React/ReactDOM and @shadcn/react in its existing temporary run root
using npm with scripts disabled. Keep root-only/src/index.ts as its existing no-emit type/CSS contract. Define
one synthetic mixed headless-provider/DS-parts runtime SSR probe directly in the
existing packed-consumers/scripts/verify.sh and execute it against each isolated
installation, resolving imports relative to that fixture. Provider and DS parts
must render successfully together under both npm and pnpm. Compare resolved
headless context/runtime identity and rendered structure, not package versions
alone; catch errors as failures. No CSS imports enter the runtime probe. No new committed application, package manager, production
lockfile or test tool. Minimum cells retain their existing pnpm coverage; do not
claim every package-manager topology is qualified.

Do not duplicate unchanged per-door native engine assertions; type and wiring
checks establish shared composition. No prose, demo contents, translation strings
or image snapshots as behavioral assertions. Existing UI baselines remain unless
new named stories intentionally extend the inventory. Static docs need no runtime.

### Ownership and slices

Main owns public API decisions, exports, manifest/lock changes, CSS integration,
verification/runtime, source reviews and external delivery. Delegate settled
separable files after the reviewed contract is frozen. One writer per path;
shared package/CSS/index changes are serialized. Native explore completed the
public-source prop map; main inspected its actionable findings.

The source/test size signal is approximately 1,600–2,300 human-authored lines
across 20–25 paths for chat and 700–1,100 across 10–15 for Questionnaire, excluding
locks/docs. The explicit ruling is two coherent capabilities, not one PR per
family: smaller splits would duplicate conversation acceptance and shared
manifest/fixture integration. Reassess actual size before opening drafts.

### Delegation Map

| Workstream / slices          | Accountable owner | Disjoint contributor and dependency                                                                                                 | Acceptance                                                                           |
| ---------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Chat presentation, slice1    | Main              | Executor writes the five named ui modules only; main owns root wrappers, story/types/tests/exports                                  | Native parts plus ergonomic props, keyboard/slots/selectors/refs/theme/RTL           |
| Scrolling, slice2            | Main              | Executor writes ui/message-scroller.tsx only after slice1; main owns dependency/options/fixture integration                         | Scroll geometry, no-JS visibility, reduced motion, correct refs and boundaries       |
| Chat finish, slice3          | Main              | Depends on slices1–2; read-only simplification/risk/final review owns no writes                                                     | Qualified frozen chat draft, exact package/CI/captures, no pending in-scope findings |
| Questionnaire, slice4        | Main              | Executor writes ui/questionnaire.tsx and root Questionnaire.tsx after qualified chat; main integrates tests/exports/labels/fixtures | Native FormData/validation/reset/SSR plus ergonomic API proof                        |
| Questionnaire finish, slice5 | Main              | Depends on slice4 and held qualified chat; read-only reviewers                                                                      | Independently qualified frozen second draft and released runtime                     |

1. **Presentation tracer, chat layer.** Implement the five static/Trace canonical
   ui modules and ergonomic wrappers, ChatPresentation story and focused public
   types/browser spec. Commit a useful complete message/attachment/trace path;
   simplify and review its risk on that immutable range.
2. **Scrolling tracer, chat layer.** Add the exact dependency and canonical
   scroller, ergonomic list/footer/options, story and packed fixture. Prove native
   geometry/focus/refs/reduced-motion and no-JS visibility. Commit; simplify and
   review the native runtime/SSR boundary.
3. **Chat finish.** Integrate, run relevant full local/package checks, capture
   real synthetic states, commit complete plan Progress, dispatch one final
   reviewer, push/create/attach the draft and qualify its exact head and feedback.
   Hold it. Only then branch rs/v5-questionnaire; no second layer exists earlier.
4. **Clarification tracer, Questionnaire layer.** Implement native form parts
   and typed root config/labels; integrate separate story and existing fixtures.
   Prove FormData, required/skip/disabled/multiple/freeform/reset/controlled/SSR.
   Commit; simplify and review the form boundary.
5. **Questionnaire finish.** Repeat only its affected and required integrated
   proof, one complete final review, captures and exact archive proof; push and
   attach the second draft, qualify its exact head/feedback. Preserve both drafts.

Route: executor for settled source; main for coupled seams/authority with
critical-path coupling as the retention reason. Planner hardens the full plan;
configured trusted Claude advises architecture and performs final review.
Each implementation slice's armed simplifier and slice-reviewer run on the same
immutable range. Reviews never grant merge or readiness authority.

New production files, all under packages/design-system/src:

- ui/message.tsx, ui/bubble.tsx, ui/marker.tsx, ui/attachment.tsx, ui/trace.tsx and
  ui/message-scroller.tsx; root Message.tsx, Bubble.tsx, Marker.tsx, Attachment.tsx,
  Trace.tsx and MessageScroller.tsx in the chat layer.
- ui/questionnaire.tsx and root Questionnaire.tsx in the form layer.
- ChatPresentation.stories.tsx and Questionnaire.stories.tsx beside existing
  component stories, plus tests/contracts/chat-presentation.spec.ts, are the only
  new demo/test files.

Existing index/primitives, package.json/root and affected fixture locks, CSS,
public types/selectors, size checks, packed root-only index/verify.sh, Next
app/auxiliary-leaf.tsx/page.tsx/tests/auxiliaries.spec.ts, MIGRATION.md and affected
capability rows may change. No new providers, subpaths, configuration or tooling.

Use the existing package scripts: `pnpm --dir packages/design-system check`,
`lint`, `format:check`, `build` and `build:ladle`; then `test:fast` with
`tests/contracts/chat-presentation.spec.ts` and focused existing smoke/a11y
selectors. Package proof uses `scripts/check-package-size.mjs`,
`tests/theme-contract/verify-packed-css.mjs`, and existing
`tests/rsc/packed-consumers/scripts/verify.sh` plus
`tests/rsc/next-consumer/scripts/verify.sh`. Retain their current/minimum cells
and both Next bundlers. Extend the existing next-consumer app/auxiliary leaf,
page, auxiliaries spec and packed root-only fixture for the new capabilities;
create no parallel example application. A missing acceptance capability blocks
that slice rather than justifying a new tool or broad environment change.

### Runtime and delivery

Git/gh remain on the host. Use the existing source-identified DS verification
container for installs/builds/tests only when implementation starts. Read the
runtime lifecycle skill at resume and final verification; stop the exact runtime
and verify stopped state after the last check. Do not touch retained Klicker/GBL
runtimes. Use agent-browser for synthetic engineering checks and screenshot
publication through host gh; no external hosting or committed screenshots.

Terminal: two independently qualified drafts at their frozen heads, public type/interaction/theme and
package evidence, independent reviews, hosted checks and quiet feedback, clean
worktree and released task runtime. Consumer acceptance and manual integrated GA
remain separate. Pause for verified scope/backend/public-contract departure,
unavailable required review/verification, conflicting ownership, or separately
gated actions. Do independent authorized work before raising a blocker.

## Progress

Chat presentation and scrolling are qualified at held head
`48c6b91a6c41aa487b82e0426f1b5621e2bac925` in
[draft234](https://github.com/uzh-bf/design-system/pull/234), above held
[draft233](https://github.com/uzh-bf/design-system/pull/233). The final hosted
CI40205922338 passed all checks, including all packed cells, both Next bundlers,
four accessibility shards, inventory protocol and final build. Greptile reviewed
this head without remaining findings; its earlier Marker thread was resolved
automatically. Final feedback remained quiet for more than five minutes.
Configured Claude completed the full review and one focused correction with PASS;
the final response validated against the shared schema.

The six ergonomic wrappers and natural compound parts preserve approved props.
Eight focused browser contracts, eight theme accessibility cases, the earlier
711-case stable integrated suite, unchanged size budgets and 704 theme assertions
pass. Seven real synthetic screenshots are inspected, attached and render on
GitHub. Final archive SHA256
`fc9eeb8fbafbe63b7feb861f584d1762598f50dd63d10867f9513234f82749c6`
matches all292 installed files. ADR0011 records the regular pin/shared runtime
obligation. Review corrections restored standalone Bubble alignment/width,
keyboard AttachmentGroup scrolling and narrow Marker/attachment containment.

The task container was stopped and its exact source bind verified. No consumer
runtime or repository was touched. Native goal state is empty; no new goal or
automation was created for this batch. Draft234 remains held and unmerged.

Questionnaire is now active on `rs/v5-questionnaire`, based on the exact qualified
chat head. Fresh fetch confirms chat0ahead/behind; default main drift is358ahead,
3behind and does not select this draft's target. Main owns story/types/browser
and packed verification, exports, docs, CSS integration and delivery. Native
worker Rawls owns only ui/questionnaire.tsx and Questionnaire.tsx, with the full
settled approved contract; complete plan context stays on a trusted route.
No Questionnaire PR exists yet. Remaining: implement and verify native form
contracts/ergonomic props, simplify/risk review, final package/browser/captures,
independent final review, then push/attach/qualify the second draft in stack231.
Both drafts stay unmerged; manual assistive-technology/device/GA and separate
consumer acceptance remain independent gates.


Questionnaire source is implemented with all16 native parts and the ergonomic
configured root. Readonly item/choice/input config, named slots, selectors,
form ref/events, active item callbacks and localizable progress/actions/errors
are wired. Configured freeform inputs require a visible or explicit accessible
name. The form's ARIA name remains on the form; progress has its independent
localized name. Error descriptions attach to freeform inputs only while invalid.
Native state and FormData own answers; no RHF/Formik or second form engine.

Current acceptance: types, lint and formatting pass. Twelve chat/form browser
contracts and eight Questionnaire accessibility cases across both themes pass.
Existing package budgets pass after removing redundant optional text-wrap and
margin rules; no ceiling changed. The canonical native choice input uses the
existing theme text token with the installed forms styles. Focused source scan
reported no findings. These are local results; packed matrices, independent
slice/final reviews, captures and hosted draft qualification remain pending.


Slice simplification completed on48c6b91a6..01e7d37da. Main verified and accepted
removing four duplicated native action-label fallbacks; native0.3.1 already owns
those defaults and configured localization still flows through children. No new
tests or abstractions were needed. Required-error state axe checks have zero
violations for neutral dark and UZH light. Current/minimum RHF packed cells pass
15 browser cases under each bundler; Recharts minimum and full stable browser
suite continue. Slice risk review remains active on the committed slice.

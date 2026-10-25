import { createElement, createRef, type ComponentProps } from 'react'
import {
  DirectionProvider as RootDirectionProvider,
  NativeSelect as RootNativeSelect,
  ResizablePanel as RootResizablePanel,
  ResizablePanelGroup as RootResizablePanelGroup,
  Sidebar as RootSidebar,
  SidebarProvider as RootSidebarProvider,
  Toaster as RootToaster,
  toast as rootToast,
  useSidebar as rootUseSidebar,
  useDefaultLayout as useRootDefaultLayout,
  useGroupRef as useRootGroupRef,
  usePanelRef as useRootPanelRef,
} from '../../src'
import {
  DirectionProvider,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  Button as PrimitiveButton,
  ResizablePanel,
  ResizablePanelGroup,
  Sidebar,
  SidebarProvider,
  TabsList,
  Toaster,
  tabsListVariants,
  useDirection,
  useGroupRef,
  usePanelRef,
  useSidebar,
} from '../../src/primitives'

declare const rootSidebarState: ReturnType<typeof rootUseSidebar>
declare const primitiveSidebarState: ReturnType<typeof useSidebar>
// @ts-expect-error Mobile focus bookkeeping remains private to SidebarProvider.
void rootSidebarState.mobileOpenerRef
// @ts-expect-error Primitive consumers receive the same public sidebar state.
void primitiveSidebarState.mobileOpenerRef

createElement(RootSidebarProvider, {
  open: true,
  onOpenChange: (open) => void open,
})
createElement(RootSidebar, {
  dir: 'rtl',
  side: 'right',
  ref: createRef<HTMLDivElement>(),
  id: 'typed-root-sidebar',
  className: 'caller-sidebar',
  style: { width: 300 },
  'aria-label': 'Application navigation',
})
createElement(SidebarProvider, { defaultOpen: false })
createElement(Sidebar, {
  dir: 'ltr',
  side: 'left',
  collapsible: 'none',
  ref: createRef<HTMLDivElement>(),
})
// @ts-expect-error Sidebar keeps its div ref across static, mobile and desktop layouts.
createElement(Sidebar, { ref: createRef<HTMLButtonElement>() })
// @ts-expect-error Mobile visibility remains internal to SidebarProvider.
createElement(SidebarProvider, { openMobile: true })

createElement(RootToaster, {
  id: 'typed-toaster',
  theme: 'dark',
  containerAriaLabel: 'Synthetic notification region',
  swipeDirections: ['top', 'left'],
  icons: { close: createElement('span') },
  toastOptions: {
    toasterId: 'typed-toaster',
    unstyled: true,
    classNames: { content: 'typed-content', loading: 'typed-loading' },
  },
})
createElement(Toaster, { theme: 'system', mobileOffset: { bottom: 16 } })
rootToast({
  message: createElement('span'),
  options: { toasterId: 'typed-toaster', testId: 'typed-notification' },
})

import type {
  ButtonProps,
  GroupImperativeHandle,
  Layout,
  NavigationProps,
  PanelImperativeHandle,
  PanelSize,
  ProgressProps,
  WorkflowProps,
} from '../../src'

declare const typedLayout: Layout
declare const typedSize: PanelSize
void typedLayout
void typedSize
const rootGroupHook: typeof useGroupRef = useRootGroupRef
const rootPanelHook: typeof usePanelRef = useRootPanelRef
void rootGroupHook
void rootPanelHook
void useRootDefaultLayout
createElement(RootResizablePanelGroup, {
  orientation: 'horizontal',
  groupRef: createRef<GroupImperativeHandle>(),
  onLayoutChanged: (layout, meta) => {
    void Object.values(layout)
    void meta.isUserInteraction
  },
})
createElement(RootResizablePanel, {
  defaultSize: '30%',
  panelRef: createRef<PanelImperativeHandle>(),
  onResize: (size, id, previous) => {
    void size.inPixels
    void id
    void previous?.asPercentage
  },
})
createElement(ResizablePanelGroup, {
  orientation: 'vertical',
  groupRef: createRef<ReturnType<typeof useGroupRef>['current']>(),
  onLayoutChange: (layout) => {
    Object.values(layout).forEach((size) => size.toFixed(1))
  },
})
createElement(ResizablePanel, {
  defaultSize: '30%',
  minSize: 100,
  panelRef: createRef<ReturnType<typeof usePanelRef>['current']>(),
  onResize: (size) => size.asPercentage + size.inPixels,
})
// @ts-expect-error Native persistence is supplied through useDefaultLayout.
createElement(RootResizablePanelGroup, { autoSaveId: 'legacy-layout' })
createElement(RootResizablePanelGroup, {
  // @ts-expect-error Imperative handles use groupRef; elementRef receives a div.
  elementRef: createRef<GroupImperativeHandle>(),
})
// @ts-expect-error Native callbacks replace the removed v3 collapse event.
createElement(RootResizablePanel, { onCollapse: () => undefined })
// @ts-expect-error Native panels follow DOM order.
createElement(ResizablePanel, { order: 1 })
// @ts-expect-error Native primitives use orientation rather than the v3 direction prop.
createElement(ResizablePanelGroup, { direction: 'horizontal' })

function acceptsButtonProps(props: ButtonProps) {
  return props
}

acceptsButtonProps({
  'aria-label': 'Save',
  title: 'Save the current record',
})

// @ts-expect-error Arbitrary composite props are not part of the v5 contract.
acceptsButtonProps({ unsupportedProp: true })

function acceptsNavigationProps(props: NavigationProps) {
  return props
}

const navigationItems = [
  {
    type: 'button' as const,
    key: 'home',
    label: 'Home',
    active: true,
    onClick: () => undefined,
  },
]

acceptsNavigationProps({
  items: navigationItems,
  'aria-label': 'Primary navigation',
  title: 'Primary navigation',
})

// @ts-expect-error Arbitrary composite props are not part of the v5 contract.
acceptsNavigationProps({ items: navigationItems, unsupportedProp: true })

const navigationRef = (element: HTMLDivElement | null) => {
  void element
}
// @ts-expect-error Ref support belongs to the A2 direct-control-ref layer.
acceptsNavigationProps({ items: navigationItems, ref: navigationRef })

// @ts-expect-error Navigation owns its controlled open state; defaultValue is a no-op.
acceptsNavigationProps({ items: navigationItems, defaultValue: 'home' })

function acceptsProgressProps(props: ProgressProps) {
  return props
}

acceptsProgressProps({
  value: 50,
  max: 100,
  formatter: String,
  'aria-label': 'Completion',
  title: 'Completion',
})

acceptsProgressProps({
  value: 50,
  max: 100,
  formatter: String,
  // @ts-expect-error Arbitrary composite props are not part of the v5 contract.
  unsupportedProp: true,
})

acceptsProgressProps({
  value: 50,
  max: 100,
  formatter: String,
  // @ts-expect-error Ref support belongs to the A2 direct-control-ref layer.
  ref: (element: HTMLDivElement | null) => {
    void element
  },
})

function acceptsWorkflowProps(props: WorkflowProps) {
  return props
}

acceptsWorkflowProps({
  activeIx: 0,
  items: [{ title: 'First step', description: 'A documented field' }],
  onClick: () => undefined,
})

acceptsWorkflowProps({
  activeIx: 0,
  items: [
    {
      title: 'First step',
      // @ts-expect-error Workflow step metadata is intentionally limited to the documented fields.
      unsupportedProp: true,
    },
  ],
  onClick: () => undefined,
})

const nativeSelectRef = createRef<HTMLSelectElement>()
createElement(NativeSelect, {
  ref: nativeSelectRef,
  size: 'sm',
  name: 'selection',
  multiple: true,
  defaultValue: ['one'],
  required: true,
  style: { width: 200 },
  onChange: (event) => event.currentTarget.selectedOptions,
})
createElement(RootNativeSelect, { ref: nativeSelectRef, defaultValue: 'one' })
createElement(NativeSelectOption, { value: 'one', disabled: true })
createElement(NativeSelectOptGroup, { label: 'Group', disabled: true })
// @ts-expect-error NativeSelect reserves size for visual sizes, not native row count.
createElement(NativeSelect, { size: 4 })
createElement(DirectionProvider, { direction: 'rtl', dir: 'ltr' })
createElement(RootDirectionProvider, { dir: 'rtl' })
const useTypedDirection: (dir?: 'ltr' | 'rtl') => 'ltr' | 'rtl' = useDirection
void useTypedDirection
const primitiveSizes: ComponentProps<typeof PrimitiveButton>['size'][] = [
  'default',
  'sm',
  'lg',
  'icon',
  'xs',
  'icon-xs',
  'icon-sm',
  'icon-lg',
]
void primitiveSizes
createElement(TabsList, { variant: 'default' })
createElement(TabsList, { variant: 'line' })
tabsListVariants()
tabsListVariants({ variant: 'default', className: 'w-full' })

import type {
  DefaultTooltipContentProps,
  LegendPayload,
  TooltipContentProps,
} from 'recharts'
import { Bar, BarChart, Tooltip as RechartsTooltip } from 'recharts'
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../src'

const chartConfig = {
  published: {
    label: 'Published',
    color: 'var(--theme-color-primary)',
  },
}

createElement(
  ChartContainer,
  {
    config: chartConfig,
    children: null,
    initialDimension: { width: 360, height: 240 },
    style: { minHeight: 240, width: '100%' },
  },
  createElement(
    BarChart,
    { data: [{ month: 'January', published: 0 }] },
    createElement(ChartTooltip, {
      defaultIndex: 0,
      content: createElement(ChartTooltipContent),
    }),
    createElement(Bar, { dataKey: 'published' })
  )
)

const tooltipContentProps: Partial<TooltipContentProps> = {
  active: true,
  accessibilityLayer: true,
  activeIndex: '0',
  coordinate: undefined,
  label: 'January',
  payload: [],
  labelFormatter: (label, payload) => {
    void payload
    return label
  },
}
createElement(ChartTooltipContent, tooltipContentProps)
createElement(RechartsTooltip, {
  content: createElement(ChartTooltipContent),
})

const defaultTooltipContentProps: DefaultTooltipContentProps = { payload: [] }
void defaultTooltipContentProps

const legendPayload: LegendPayload[] = [
  { value: 'Published', dataKey: 'published' },
]
createElement(ChartLegendContent, { payload: legendPayload })

import {
  AlertAction as RootAlertAction,
  AvatarBadge as RootAvatarBadge,
  AvatarGroup as RootAvatarGroup,
  AvatarGroupCount as RootAvatarGroupCount,
  useCarousel as rootUseCarousel,
} from '../../src'
import {
  AlertAction,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  Badge,
  Card,
  EmptyDescription,
  InputOTP,
  Item,
  KbdGroup,
  PaginationNext,
  PaginationPrevious,
  Spinner,
  Switch,
  ToggleGroup,
  useCarousel,
} from '../../src/primitives'

const divRef = createRef<HTMLDivElement>()
const spanRef = createRef<HTMLSpanElement>()
createElement(AlertAction, {
  ref: divRef,
  title: 'Action',
  onClick: (event) => {
    const target: HTMLDivElement = event.currentTarget
    void target
  },
})
createElement(RootAlertAction, { ref: divRef })
createElement(Avatar, { size: 'default', ref: spanRef })
createElement(Avatar, { size: 'md' })
createElement(AvatarBadge, { ref: spanRef })
createElement(RootAvatarBadge, { ref: spanRef })
createElement(AvatarGroup, { ref: divRef })
createElement(RootAvatarGroup, { ref: divRef })
createElement(AvatarGroupCount, { ref: divRef })
createElement(RootAvatarGroupCount, { ref: divRef })
createElement(Badge, { variant: 'ghost', ref: spanRef })
createElement(Badge, { variant: 'link', asChild: true })
createElement(Card, { size: 'sm', ref: divRef })
createElement(Item, { size: 'xs', ref: divRef })
createElement(PaginationNext, {
  text: 'Alias',
  label: '',
  ref: createRef<HTMLAnchorElement>(),
})
createElement(PaginationPrevious, { text: 'Alias', 'aria-label': 'Override' })
createElement(Switch, {
  size: 'sm',
  name: 'enabled',
  ref: createRef<HTMLButtonElement>(),
})
createElement(ToggleGroup, {
  type: 'single',
  spacing: 2,
  orientation: 'vertical',
  dir: 'rtl',
})
createElement(InputOTP, { maxLength: 4, spellCheck: true, children: null })
createElement(EmptyDescription, { ref: divRef })
createElement(KbdGroup, { ref: createRef<HTMLElement>() })
createElement(Spinner, { ref: spanRef, className: 'size-4' })
// @ts-expect-error The retained Spinner is a span, not an SVG element.
createElement(Spinner, { ref: createRef<SVGSVGElement>() })
// @ts-expect-error Compact Card supports only the documented size variants.
createElement(Card, { size: 'dense' })
const carouselHook: typeof useCarousel = rootUseCarousel
void carouselHook

import {
  AlertDialogMedia as RootAlertDialogMedia,
  PopoverDescription as RootPopoverDescription,
  PopoverHeader as RootPopoverHeader,
  PopoverTitle as RootPopoverTitle,
} from '../../src'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  CommandItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  DialogFooter,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  SheetContent,
} from '../../src/primitives'

createElement(RootAlertDialogMedia, { ref: divRef })
createElement(RootPopoverHeader, { ref: divRef })
createElement(RootPopoverTitle, {
  ref: divRef,
  onClick: (event) => {
    const div: HTMLDivElement = event.currentTarget
    void div
  },
})
createElement(RootPopoverDescription, {
  ref: createRef<HTMLParagraphElement>(),
})
createElement(AlertDialogContent, { size: 'sm', ref: divRef })
createElement(AlertDialogAction, {
  variant: 'outline',
  size: 'sm',
  type: 'submit',
  ref: createRef<HTMLButtonElement>(),
})
createElement(AlertDialogCancel, {
  variant: 'ghost',
  size: 'xs',
  asChild: true,
})
createElement(DialogFooter, { showCloseButton: true, ref: divRef })
createElement(SheetContent, { showCloseButton: false, ref: divRef })
createElement(CommandItem, { 'data-checked': true, ref: divRef })
createElement(CommandItem, { 'data-checked': 'false' })
createElement(DropdownMenuCheckboxItem, { inset: true })
createElement(DropdownMenuRadioItem, { inset: true, value: 'a' })
createElement(ContextMenuCheckboxItem, { inset: true })
createElement(ContextMenuRadioItem, { inset: true, value: 'a' })
createElement(MenubarCheckboxItem, { inset: true })
createElement(MenubarRadioItem, { inset: true, value: 'a' })

import { de } from 'date-fns/locale'
import { CalendarDay, DayButton, type DayPickerProps } from 'react-day-picker'
import { Calendar, CalendarDayButton } from '../../src/primitives'

const calendarLocale: DayPickerProps['locale'] = de
const calendarDayProps: ComponentProps<typeof DayButton> = {
  day: new CalendarDay(new Date(2026, 9, 15), new Date(2026, 9)),
  modifiers: {},
  children: 15,
}
createElement(CalendarDayButton, {
  ...calendarDayProps,
  locale: calendarLocale,
})
createElement(Calendar, {
  locale: calendarLocale,
  dir: 'rtl',
  timeZone: 'UTC',
  classNames: { table: 'legacy-grid', month_grid: 'canonical-grid' },
  components: {
    DayButton: (props) =>
      createElement(CalendarDayButton, { ...props, locale: calendarLocale }),
  },
  formatters: {
    formatMonthDropdown: (month, dateLib) =>
      dateLib?.format(month, 'LLLL') ?? '',
  },
})
// @ts-expect-error Calendar locale requires a DayPicker locale object.
createElement(CalendarDayButton, { ...calendarDayProps, locale: 'de-DE' })

import type {
  AttachmentProps,
  BubbleProps,
  MarkerProps,
  MessageProps,
  TraceProps,
} from '../../src'
import {
  Attachment as ChatAttachment,
  Bubble as ChatBubble,
  Marker as ChatMarker,
  Message as ChatMessage,
  Trace as ChatTrace,
} from '../../src'
createElement(
  ChatMessage,
  {
    avatar: 'U',
    className: { root: 'p-2', content: 'gap-2' },
    dataContent: { test: 'body' },
    ref: createRef<HTMLDivElement>(),
    'aria-label': 'Conversation item',
  },
  'Body'
)
createElement(
  ChatBubble,
  {
    variant: 'muted',
    reactions: 'Helpful',
    className: { content: 'rounded-md' },
  },
  'Text'
)
createElement(
  ChatMarker,
  {
    icon: '✓',
    className: { icon: 'size-4' },
    ref: createRef<HTMLDivElement>(),
  },
  'Saved'
)
createElement(ChatAttachment, {
  title: 'File',
  triggerProps: {
    onClick: (event) => {
      event.preventDefault()
    },
  },
  triggerRef: createRef<HTMLButtonElement>(),
  className: { trigger: 'ring-2' },
})
createElement(ChatTrace, {
  items: [
    {
      id: 'x',
      title: 'Step',
      content: 'Details',
      open: false,
      onOpenChange: (open) => void open,
    },
  ],
})
const chatProps: [
  MessageProps,
  BubbleProps,
  MarkerProps,
  AttachmentProps,
  TraceProps,
] = [
  { children: 'Body' },
  { children: 'Text' },
  { icon: '✓' },
  { title: 'File' },
  { items: [] },
]
void chatProps
// @ts-expect-error Root wrappers use semantic styling slots.
createElement(ChatMessage, { className: 'flat' })
// @ts-expect-error Fixed root Marker composition does not replace its DOM element.
createElement(ChatMarker, { asChild: true })
// @ts-expect-error Attachment needs a title or explicit name for its trigger.
createElement(ChatAttachment, { triggerProps: {} })
// @ts-expect-error Custom attachment content and configured parts are exclusive.
createElement(ChatAttachment, { children: 'Custom', title: 'File' })
// @ts-expect-error Trace controlled expansion must report changes.
createElement(ChatTrace, { items: [{ id: 'x', title: 'Step', open: true }] })
// @ts-expect-error Configured rows and custom content are exclusive.
createElement(ChatTrace, { items: [], children: 'Other' })

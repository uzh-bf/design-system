import { createElement, createRef, type ComponentProps } from 'react'
import {
  DirectionProvider as RootDirectionProvider,
  NativeSelect as RootNativeSelect,
} from '../../src'
import {
  DirectionProvider,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  Button as PrimitiveButton,
  TabsList,
  tabsListVariants,
  useDirection,
} from '../../src/primitives'

import type {
  ButtonProps,
  NavigationProps,
  ProgressProps,
  WorkflowProps,
} from '../../src'

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

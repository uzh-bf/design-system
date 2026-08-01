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

// @ts-expect-error Ref support belongs to the A2 direct-control-ref layer.
acceptsButtonProps({ ref: 'not-a-ref' })

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

// @ts-expect-error Ref support belongs to the A2 direct-control-ref layer.
acceptsNavigationProps({ items: navigationItems, ref: 'not-a-ref' })

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
  ref: 'not-a-ref',
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

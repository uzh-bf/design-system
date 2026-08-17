/**
 * Generated from the fresh v5@d1825b4 Ladle manifest and a complete neutral/UZH
 * a11y run. Keep this oracle independent from the runtime manifest and axe
 * output: changing either source must produce a deliberate diff here.
 */

export type A11yTheme = 'neutral' | 'uzh'

export const INVENTORY_THEMES = ['neutral', 'uzh'] as const

export type SeriousCriticalTuple = {
  rule: string
  impact: 'serious' | 'critical'
  story: string
  theme: A11yTheme
}

export type InventoryTuple = Pick<
  SeriousCriticalTuple,
  'rule' | 'story' | 'theme'
>

export type InventoryMetadata = {
  reason: string
  owner: string
  debt: 'fixture debt' | 'component debt'
}

export const W1_THEME_EXTENSION_STORY_IDS = [
  'theme-extension-contract--neutral',
  'theme-extension-contract--synthetic-ramp',
  'theme-extension-contract--uzh',
] as const

export const EXPECTED_STORY_IDS = [
  'accordion--default',
  'alert--default',
  'alert--destructive',
  'alert--icon',
  'alert--success',
  'alert--variants',
  'alert-dialog--default',
  'alpha-numeric-pin-field--default',
  'alpha-numeric-pin-field--error',
  'alpha-numeric-pin-field--styled',
  'alpha-numeric-pin-field--tooltip',
  'alpha-numeric-pin-field--uppercase-only',
  'aspect-ratio--default',
  'avatar--default',
  'avatar--sizes',
  'badge--default',
  'breadcrumb--default',
  'button--active',
  'button--basic-button',
  'button--button-icon-group',
  'button--color-button',
  'button--default',
  'button--destructive',
  'button--disabled',
  'button--fluid',
  'button--icon',
  'button--loading',
  'button--primary',
  'button-group--default',
  'button-group--with-text',
  'calendar--default',
  'calendar--month-year-dropdown',
  'card--default',
  'carousel--default',
  'chart--default',
  'checkbox--content',
  'checkbox--default',
  'checkbox--disabled',
  'checkbox--labelled',
  'checkbox--partial',
  'checkbox--sizes',
  'collapsible--buttons',
  'collapsible--complex',
  'collapsible--default',
  'collapsible--primary-secondary',
  'collapsible--simple',
  'collapsible--styled',
  'color-picker--custom-text',
  'color-picker--default',
  'color-picker--disabled',
  'color-picker--label',
  'color-picker--position',
  'color-picker--styled',
  'combobox--default',
  'combobox--disabled',
  'combobox--preselected',
  'command--default',
  'composite-refs--default',
  'context-menu--default',
  'countdown--default',
  'countdown--formatter',
  'countdown--on-expire',
  'countdown--static',
  'countdown--styled',
  'countdown--update-function',
  'countdown--warning',
  'cycle-countdown--default',
  'cycle-countdown--expiration',
  'cycle-countdown--formatter',
  'cycle-countdown--sizes',
  'cycle-countdown--static',
  'cycle-countdown--styled',
  'cycle-countdown--terminal-settings',
  'cycle-countdown--updating',
  'cycle-progress--colored',
  'cycle-progress--default',
  'cycle-progress--override-size',
  'cycle-progress--reference-default',
  'cycle-progress--small',
  'date-picker--default',
  'date-picker--disabled',
  'date-picker--error',
  'date-picker--labelled',
  'date-picker--no-year-month-dropdown',
  'date-picker--small-label',
  'date-range-picker--default',
  'date-range-picker--disabled',
  'date-range-picker--preselected',
  'datetime-picker--date-format',
  'datetime-picker--default',
  'datetime-picker--disabled',
  'datetime-picker--error',
  'datetime-picker--hour-precision',
  'datetime-picker--labelled',
  'datetime-picker--minute-precision',
  'datetime-picker--no-year-month-dropdown',
  'datetime-picker--small-label',
  'direct-control-refs--default',
  'drawer--default',
  'dropdown--aligned-end',
  'dropdown--custom-trigger',
  'dropdown--default',
  'dropdown--disabled',
  'dropdown--disabled-items',
  'dropdown--item-tooltips',
  'dropdown--radio-groups',
  'dropdown--selection',
  'dropdown--shortcuts',
  'dropdown--submenu',
  'empty--default',
  'field--default',
  'field--with-error',
  'form--default',
  'form-label--large',
  'form-label--required',
  'form-label--small',
  'form-label--with-tooltip',
  'formik-alpha-numeric-pin-field--default',
  'formik-alpha-numeric-pin-field--large-label',
  'formik-alpha-numeric-pin-field--required',
  'formik-alpha-numeric-pin-field--styled',
  'formik-alpha-numeric-pin-field--tooltip',
  'formik-alpha-numeric-pin-field--uppercase-only',
  'formik-alpha-numeric-pin-field--validation',
  'formik-color-picker--custom-presets',
  'formik-color-picker--default',
  'formik-color-picker--disabled',
  'formik-color-picker--label',
  'formik-color-picker--validation',
  'formik-date-picker--default',
  'formik-date-picker--disabled',
  'formik-date-picker--labelled',
  'formik-date-picker--tooltip',
  'formik-date-picker--validation',
  'formik-datetime-picker--default',
  'formik-datetime-picker--disabled',
  'formik-datetime-picker--labelled',
  'formik-datetime-picker--tooltip',
  'formik-datetime-picker--validation',
  'formik-number-field--decimals',
  'formik-number-field--default',
  'formik-number-field--disabled',
  'formik-number-field--integer',
  'formik-number-field--large-label',
  'formik-number-field--min-max',
  'formik-number-field--required',
  'formik-number-field--styled',
  'formik-number-field--unit',
  'formik-number-field--validation',
  'formik-pin-field--default',
  'formik-pin-field--large-label',
  'formik-pin-field--required',
  'formik-pin-field--styled',
  'formik-pin-field--tooltip',
  'formik-pin-field--validation',
  'formik-select-field--default',
  'formik-select-field--disabled',
  'formik-select-field--disabled-element',
  'formik-select-field--disabled-element-groups',
  'formik-select-field--error',
  'formik-select-field--groups',
  'formik-select-field--large-label',
  'formik-select-field--required',
  'formik-select-field--tooltip',
  'formik-select-field--validation',
  'formik-switch-field--default',
  'formik-switch-field--disabled',
  'formik-switch-field--error',
  'formik-switch-field--left-label',
  'formik-switch-field--required',
  'formik-switch-field--sizes',
  'formik-switch-field--tooltip',
  'formik-switch-field--undefined',
  'formik-switch-field--validation',
  'formik-text-field--default',
  'formik-text-field--disabled',
  'formik-text-field--icon',
  'formik-text-field--icon-right',
  'formik-text-field--large-label',
  'formik-text-field--on-change-error',
  'formik-text-field--on-change-function',
  'formik-text-field--required',
  'formik-text-field--styled',
  'formik-text-field--validation',
  'formik-textarea-field--default',
  'formik-textarea-field--disabled',
  'formik-textarea-field--large-label',
  'formik-textarea-field--max-length',
  'formik-textarea-field--on-change-error',
  'formik-textarea-field--on-change-function',
  'formik-textarea-field--required',
  'formik-textarea-field--styled',
  'formik-textarea-field--validation',
  'header--default',
  'hover-card--default',
  'input-group--default',
  'input-group--with-button',
  'item--default',
  'item--group',
  'kbd--default',
  'kbd--group',
  'label--default',
  'label--required',
  'label--required-tooltip',
  'label--styled',
  'label--tooltip',
  'label--tooltip-styled',
  'label--tooltip-symbol',
  'modal--basic',
  'modal--default',
  'modal--escape-disabled',
  'modal--fullscreen',
  'modal--loading',
  'modal--primary',
  'modal--secondary',
  'modal--three-second-loading',
  'modal--trigger',
  'modal--without-close',
  'multi-select--default',
  'multi-select--disabled',
  'multi-select--external-label',
  'multi-select--preselected',
  'navigation--active',
  'navigation--button',
  'navigation--combined-trigger',
  'navigation--complex',
  'navigation--disabled',
  'navigation--dropdown',
  'navigation--icon-trigger',
  'navigation--nested-menu',
  'navigation--notification-trigger',
  'navigation-menu--default',
  'notification-badge-wrapper--default',
  'notification-badge-wrapper--no-batch',
  'notification-badge-wrapper--no-count',
  'notification-badge-wrapper--positions',
  'notification-badge-wrapper--sizes',
  'notification-badge-wrapper--styled',
  'number-field--default',
  'number-field--error',
  'number-field--integer',
  'number-field--labelled',
  'number-field--min-max',
  'number-field--number-state',
  'number-field--placeholder',
  'number-field--precision',
  'number-field--small-label',
  'number-field--stepper',
  'number-field--unit',
  'pagination--default',
  'popover--default',
  'progress--default',
  'progress--formatted',
  'progress--full',
  'progress--multiple',
  'progress--offset',
  'progress--styled',
  'progress--zero',
  'prose--default',
  'public-contracts--default',
  'radio-group--default',
  'resizable--default',
  'rhf-fields--composite-blur-contracts',
  'rhf-fields--default',
  'rhf-fields--disabled',
  'rhf-fields--explicit-control',
  'rhf-fields--message-less-validation',
  'rhf-fields--number-range',
  'rhf-fields--validation',
  'scroll-area--default',
  'select--basic',
  'select--custom-trigger-label',
  'select--default',
  'select--default-value',
  'select--disabled',
  'select--disabled-elements',
  'select--groups',
  'select--popper',
  'select--styled',
  'select--with-tooltips',
  'select-field--default',
  'select-field--disabled',
  'select-field--error',
  'select-field--groups',
  'select-field--label',
  'select-field--large-label',
  'select-field--required',
  'select-field--tooltip',
  'separator--default',
  'sheet--default',
  'sidebar--default',
  'skeleton--default',
  'slider--compact',
  'slider--compact-disabled',
  'slider--compact-no-labels',
  'slider--default',
  'slider--disabled',
  'slider--icons',
  'slider--styled',
  'spinner--default',
  'spinner--in-button',
  'spinner--sizes',
  'step-progress--asymmetric-offset',
  'step-progress--custom-formatter',
  'step-progress--default',
  'step-progress--status',
  'step-progress--status-offset',
  'step-progress--with-offset',
  'switch--default',
  'switch--disabled',
  'switch--disabled-active',
  'switch--error',
  'switch--required',
  'switch--sizes',
  'switch--tooltip',
  'switch--undefined',
  'table--combined',
  'table--default-sorting',
  'table--formatted',
  'table--reset-table',
  'table--simple',
  'table--sorting',
  'tabs--controlled',
  'tabs--default',
  'tabs--disabled-tabs',
  'tabs--multiple',
  'tabs--tooltips',
  'tag--active',
  'tag--default',
  'tag--removable',
  'text-field--default',
  'text-field--disabled',
  'text-field--enter-key-confirmation',
  'text-field--error',
  'text-field--icon',
  'text-field--icon-right',
  'text-field--required',
  'text-field--reset-field-button',
  'text-field--small-label',
  'text-field--styled',
  'textarea-field--default',
  'textarea-field--disabled',
  'textarea-field--max-length',
  'textarea-field--required',
  'textarea-field--small-label',
  'textarea-field--styled',
  'theme-extension-contract--neutral',
  'theme-extension-contract--synthetic-ramp',
  'theme-extension-contract--uzh',
  'theme-provider--default',
  'theme-provider--uncontrolled',
  'toast--action',
  'toast--children',
  'toast--default',
  'toast--dismissible',
  'toast--error',
  'toast--positions',
  'toast--simple',
  'toast--success',
  'toast--warning',
  'toggle--default',
  'toggle-group--default',
  'tooltip--children',
  'tooltip--default',
  'tooltip--delay',
  'tooltip--multi-line',
  'tooltip--styled',
  'use-arrow-navigation--default',
  'user-notification--custom-content',
  'user-notification--default',
  'user-notification--dismissible',
  'user-notification--error',
  'user-notification--info',
  'user-notification--styled',
  'user-notification--success',
  'user-notification--warning',
  'workflow--default',
  'workflow--description',
  'workflow--disabled',
  'workflow--minimal',
  'workflow--progress',
  'workflow--styled',
  'workflow--tooltip',
  'workflow--tooltip-symbol',
] as const

export const INVENTORY_METADATA: Readonly<Record<string, InventoryMetadata>> = {
  'aria-input-field-name': {
    reason: 'Slider thumbs have no accessible name.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'aria-progressbar-name': {
    reason: 'Progress bars have no accessible name.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'aria-required-children': {
    reason: 'Composite roles are missing required children.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'aria-required-parent': {
    reason: 'Tab roles are separated from their required parent.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'aria-valid-attr-value': {
    reason: 'Tabs contain invalid aria attribute values.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'button-name': {
    reason: 'Icon-only controls have no accessible name.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'color-contrast': {
    reason: 'Neutral styled controls have insufficient contrast.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  label: {
    reason: 'Inputs are not programmatically associated with labels.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'label-title-only': {
    reason: 'The label is conveyed by title alone.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'nested-interactive': {
    reason: 'Interactive controls contain other interactive controls.',
    owner: 'design-system component',
    debt: 'component debt',
  },
  'scrollable-region-focusable': {
    reason: 'The scrollable region is not keyboard focusable.',
    owner: 'design-system component',
    debt: 'component debt',
  },
}

export const EXACT_SERIOUS_CRITICAL_INVENTORY = [
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'collapsible--styled',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'table--combined',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'table--default-sorting',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'table--formatted',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'table--reset-table',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'table--simple',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'table--sorting',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'user-notification--custom-content',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'user-notification--info',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'user-notification--styled',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'user-notification--success',
    theme: 'neutral',
  },
  {
    rule: 'color-contrast',
    impact: 'serious',
    story: 'workflow--progress',
    theme: 'neutral',
  },
] as const satisfies readonly SeriousCriticalTuple[]

export function tupleKey(tuple: InventoryTuple): string {
  return `${tuple.theme}|${tuple.story}|${tuple.rule}`
}

export function sortTuples<T extends InventoryTuple>(
  tuples: readonly T[]
): T[] {
  return [...tuples].sort(
    (a, b) =>
      a.theme.localeCompare(b.theme) ||
      a.story.localeCompare(b.story) ||
      a.rule.localeCompare(b.rule)
  )
}

export function expectedTuplesFor(
  story: string,
  theme: A11yTheme
): SeriousCriticalTuple[] {
  return sortTuples(
    EXACT_SERIOUS_CRITICAL_INVENTORY.filter(
      (tuple) => tuple.story === story && tuple.theme === theme
    )
  )
}

export function assertStoryIds(
  actual: readonly string[],
  expected: readonly string[] = EXPECTED_STORY_IDS
): void {
  const actualSorted = [...actual].sort()
  const expectedSorted = [...expected].sort()
  if (new Set(actualSorted).size !== actualSorted.length) {
    throw new Error('Ladle manifest contains duplicate story IDs')
  }
  if (new Set(expectedSorted).size !== expectedSorted.length) {
    throw new Error('Expected story-ID oracle contains duplicate story IDs')
  }
  if (actualSorted.join('\n') !== expectedSorted.join('\n')) {
    throw new Error(
      `Ladle story-ID mismatch\nExpected: ${expectedSorted.join(', ')}\nObserved: ${actualSorted.join(', ')}`
    )
  }
  for (const storyId of W1_THEME_EXTENSION_STORY_IDS) {
    if (!actualSorted.includes(storyId) || !expectedSorted.includes(storyId)) {
      throw new Error(
        `Required W1 story is missing from the story-ID contract: ${storyId}`
      )
    }
  }
}

export function assertExactStoryInventory(
  actual: readonly SeriousCriticalTuple[],
  story: string,
  theme: A11yTheme
): void {
  const expected = expectedTuplesFor(story, theme)
  const observed = sortTuples(actual)
  const expectedKeys = expected.map(tupleKey)
  const observedKeys = observed.map(tupleKey)

  if (new Set(observedKeys).size !== observedKeys.length) {
    throw new Error(
      `A11Y inventory contains duplicate serious/critical tuples for ${story} (${theme})`
    )
  }

  if (expectedKeys.join('\n') !== observedKeys.join('\n')) {
    throw new Error(
      `A11Y inventory mismatch for ${story} (${theme})\nExpected: ${expectedKeys.join(', ')}\nObserved: ${observedKeys.join(', ')}`
    )
  }
}

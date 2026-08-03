/**
 * The v5 test-selector contract.
 *
 * A selector prop carries exactly this shape and renders as `data-cy` /
 * `data-test`. `data-testid` is not part of the contract and is never emitted.
 *
 * Both the type and the attribute names live here so neither is retyped at a
 * call site. The `data-text` typo that shipped in `ColorPicker` for three
 * years was possible only because every render site spelled the attribute out
 * by hand.
 */
export type TestSelectors = {
  cy?: string
  test?: string
}

/**
 * Spread onto the element a selector prop addresses:
 *
 * ```tsx
 * <div {...testAttrs(data)} />
 * ```
 *
 * Both keys are always present, so an unset selector renders no attribute
 * rather than an empty one, and JSX spread precedence stays predictable.
 */
export function testAttrs(data?: TestSelectors) {
  return {
    'data-cy': data?.cy,
    'data-test': data?.test,
  }
}

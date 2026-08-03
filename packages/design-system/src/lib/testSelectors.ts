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
 * Only keys that carry a value are emitted, so the result is safe to spread in
 * any position: an unset selector cannot blank an attribute that a neighbouring
 * spread supplied. Emitting both keys unconditionally would make a spread-last
 * call destructive, which is the same silent attribute loss this module exists
 * to prevent.
 */
export function testAttrs(data?: TestSelectors) {
  return {
    ...(data?.cy !== undefined && { 'data-cy': data.cy }),
    ...(data?.test !== undefined && { 'data-test': data.test }),
  }
}

'use client'

import type { ReactNode } from 'react'
import { useId } from 'react'

/** Combines caller and generated description references without duplicate IDs. */
export function mergeDescriptionIds(
  ...ids: Array<string | undefined>
): string | undefined {
  const tokens = ids.flatMap((value) => value?.split(/\s+/) ?? [])
  const uniqueTokens = [...new Set(tokens.filter((token) => token.length > 0))]
  return uniqueTokens.length > 0 ? uniqueTokens.join(' ') : undefined
}

/**
 * Derives the ids and accessibility wiring shared by the form field
 * components.
 *
 * `useId()` yields a stable, globally-unique fallback id whenever the consumer
 * omits `id`, so the label/input association and the `aria-describedby` link to
 * the error message survive even without an explicit id.
 *
 * @param id - The optional explicit id of the input field.
 * @param error - The error message (validation is handled by the consumer).
 * @param isTouched - Whether the field has been touched.
 * @param hideError - Whether the error message should be hidden.
 * @param description - The optional description node; a generated id is exposed only while the node renders.
 * @param describedBy - Caller-provided `aria-describedby` references, kept ahead of the generated ids.
 * @returns Stable control/error ids, visible error, optional help id and merged references.
 */
export function useFieldError({
  id,
  error,
  isTouched,
  hideError,
  description,
  describedBy,
}: {
  id?: string
  error?: string
  isTouched?: boolean
  hideError?: boolean
  description?: ReactNode
  describedBy?: string
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  // Narrow the error to a defined string exactly when it should be surfaced, so
  // callers gate the alert and link `aria-describedby` off one value without a
  // non-null assertion.
  const visibleError = !!error && !!isTouched && !hideError ? error : undefined
  const errorId = `${inputId}-error`
  const descriptionId =
    typeof description === 'undefined' ? undefined : `${inputId}-description`
  const mergedDescribedBy = mergeDescriptionIds(
    describedBy,
    descriptionId,
    visibleError ? errorId : undefined
  )
  return {
    inputId,
    visibleError,
    errorId,
    descriptionId,
    describedBy: mergedDescribedBy,
  }
}

'use client'

import { useId } from 'react'

/**
 * Derives the id and error wiring shared by the form field components.
 *
 * `useId()` yields a stable, globally-unique fallback id whenever the consumer
 * omits `id`, so the label/input association and the `aria-describedby` link to
 * the error message survive even without an explicit id.
 *
 * @param id - The optional explicit id of the input field.
 * @param error - The error message (validation is handled by the consumer).
 * @param isTouched - Whether the field has been touched.
 * @param hideError - Whether the error message should be hidden.
 * @returns inputId (stable), visibleError (the error string when it should be surfaced, else undefined), errorId (id of the alert node).
 */
export function useFieldError({
  id,
  error,
  isTouched,
  hideError,
}: {
  id?: string
  error?: string
  isTouched?: boolean
  hideError?: boolean
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  // Narrow the error to a defined string exactly when it should be surfaced, so
  // callers gate the alert and link `aria-describedby` off one value without a
  // non-null assertion.
  const visibleError = !!error && !!isTouched && !hideError ? error : undefined
  const errorId = `${inputId}-error`
  return { inputId, visibleError, errorId }
}

'use client'

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '../Tooltip'

/**
 * Renders the error indicator shared by the form field components: a
 * hover/focus tooltip on a warning icon (visual affordance) plus a
 * visually-hidden `role="alert"` node referenced by the input's
 * `aria-describedby` so assistive technology receives the error text (WCAG
 * 3.3.1, Level A).
 *
 * @param error - The error message to display.
 * @param errorId - The id of the visually-hidden alert node (matches the input's aria-describedby).
 */
export function FieldErrorIndicator({
  error,
  errorId,
}: {
  error: string
  errorId: string
}) {
  return (
    <>
      <Tooltip
        tooltip={error}
        ariaLabel={error}
        delay={0}
        className={{ tooltip: 'max-w-120 text-sm' }}
      >
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-destructive mr-1"
        />
      </Tooltip>
      <span id={errorId} role="alert" className="sr-only">
        {error}
      </span>
    </>
  )
}

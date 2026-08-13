import * as React from 'react'

import { cn } from '../lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="spinner"
      role="status"
      // A status region with no text content is announced as an empty live
      // region; the name is what makes the busy state perceivable. Placed
      // before the spread so consumers can still override it.
      aria-label="Loading"
      className={cn(
        'border-t-primary-100 inline-block size-7 animate-spin rounded-full border-[3px] border-[#E0E0E0]',
        className
      )}
      {...props}
    />
  )
}

export { Spinner }

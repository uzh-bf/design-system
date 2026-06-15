import * as React from 'react'

import { cn } from '../lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="spinner"
      role="status"
      className={cn(
        'inline-block size-7 animate-spin rounded-full border-[3px] border-[#E0E0E0] border-t-primary-100',
        className
      )}
      {...props}
    />
  )
}

export { Spinner }

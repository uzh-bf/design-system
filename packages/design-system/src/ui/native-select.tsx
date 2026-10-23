import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
  size?: 'sm' | 'default'
}

function NativeSelect({
  className,
  size = 'default',
  multiple,
  ...props
}: NativeSelectProps) {
  return (
    <div
      data-slot="native-select-wrapper"
      data-size={size}
      className={cn(
        'relative w-fit has-[select:disabled]:opacity-50',
        className
      )}
    >
      <select
        data-slot="native-select"
        data-size={size}
        multiple={multiple}
        className={cn(
          'border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 w-full min-w-0 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed',
          multiple ? 'py-2' : 'appearance-none pe-9',
          !multiple && (size === 'sm' ? 'h-8' : 'h-10')
        )}
        {...props}
      />
      {!multiple && (
        <ChevronDownIcon
          data-slot="native-select-icon"
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2"
        />
      )}
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<'option'>) {
  return (
    <option
      data-slot="native-select-option"
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }

import * as React from 'react'
import { cn } from '../lib/utils'

import { ChevronRightIcon } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'

function Trace({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="trace"
      className={cn('flex w-full min-w-0 flex-col gap-2', className)}
      {...props}
    />
  )
}

function TraceLine({
  className,
  status,
  ...props
}: React.ComponentProps<'span'> & {
  status?: 'running' | 'error' | 'pending'
}) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      className={cn(
        'text-muted-foreground data-[status=error]:text-destructive-text dark:data-[status=error]:text-destructive data-[status=running]:*:data-[slot=trace-title]:shimmer flex w-fit max-w-full min-w-0 items-center gap-2 text-sm transition-colors',
        className
      )}
      {...props}
    />
  )
}

function TraceIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TraceTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="trace-title"
      className={cn('motion-reduce:shimmer-none min-w-0 truncate', className)}
      {...props}
    />
  )
}

function TraceDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="trace-description"
      className={cn('text-muted-foreground shrink-0 tabular-nums', className)}
      {...props}
    />
  )
}

function TraceCollapsible({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, 'asChild' | 'open'> &
  (
    | { open?: undefined }
    | {
        open: boolean
        onOpenChange: NonNullable<
          React.ComponentProps<typeof Collapsible>['onOpenChange']
        >
      }
  )) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      className={cn('flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  )
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleTrigger>, 'asChild'>) {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      className={cn(
        'group/trace-collapsible-trigger text-muted-foreground hover:text-foreground focus-visible:ring-ring/30 has-[[data-status=error]]:text-destructive-text dark:has-[[data-status=error]]:text-destructive flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-lg text-start transition-colors outline-none focus-visible:ring-3',
        className
      )}
      {...props}
    >
      {children}
      <TraceIcon className="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
        <ChevronRightIcon />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleContent>, 'asChild'>) {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up min-w-0 overflow-hidden duration-200 [--radix-accordion-content-height:var(--radix-collapsible-content-height)]"
      {...props}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        className={cn(
          'text-muted-foreground ms-2 mt-2 mb-1 min-w-0 border-s ps-4 pe-1 leading-relaxed wrap-break-word',
          className
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  )
}

export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
}

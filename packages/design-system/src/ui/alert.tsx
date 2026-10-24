import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const alertVariants = cva(
  'group/alert relative w-full rounded-md border px-4 py-3.5 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] sm:has-data-[slot=alert-action]:grid-cols-[0_minmax(0,1fr)_auto] sm:has-[>svg]:has-data-[slot=alert-action]:grid-cols-[calc(var(--spacing)*5)_minmax(0,1fr)_auto] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-px [&>svg]:text-current',
  {
    variants: {
      variant: {
        // `default` and `destructive` are the legacy shadcn surfaces (plain card bg).
        // The semantic family (neutral/info/success/warning/error) shares the UZH
        // treatment: tinted bg + 4px coloured left border + variant-coloured icon.
        default: 'bg-card text-card-foreground',
        neutral: 'bg-muted text-foreground border-l-4 border-l-border',
        info: 'bg-info-background text-info-text border-l-4 border-l-info [&>svg]:text-info-foreground dark:[&>svg]:text-info *:data-[slot=alert-description]:text-info-text',
        success:
          'bg-success-background text-success-text border-l-4 border-l-success [&>svg]:text-success-foreground dark:[&>svg]:text-success *:data-[slot=alert-description]:text-success-text',
        // warning icon uses the dark -foreground (not the light amber main) so it
        // stays visible on the light warning tint; in dark mode the tint is dark,
        // so the icon flips to the bright amber main instead.
        warning:
          'bg-warning-background text-foreground border-l-4 border-l-warning [&>svg]:text-warning-foreground dark:[&>svg]:text-warning *:data-[slot=alert-description]:text-foreground/80',
        // The error description does not fade. Its mid-tone text on a tinted
        // fill would drop below 4.5:1 if an opacity fade were applied.
        error:
          'bg-destructive-background text-destructive-text border-l-4 border-l-destructive *:data-[slot=alert-description]:text-destructive-text',
        destructive:
          'text-destructive-text bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-text',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-foreground/80 col-start-2 grid justify-items-start gap-1 text-[13px] [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  )
}

const AlertAction = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-action"
    className={cn(
      'col-start-3 row-start-1 self-start justify-self-end max-sm:col-start-2 max-sm:row-start-auto max-sm:mt-2 max-sm:justify-self-start sm:ms-3 sm:group-has-[>svg]/alert:ms-0',
      className
    )}
    {...props}
  />
))

AlertAction.displayName = 'AlertAction'

export { Alert, AlertAction, AlertDescription, AlertTitle }

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        // `default` and `destructive` are the legacy shadcn surfaces (plain card bg).
        // The semantic family (neutral/info/success/warning/error) shares the UZH
        // treatment: tinted bg + 4px coloured left border + variant-coloured icon.
        default: 'bg-card text-card-foreground',
        neutral: 'bg-muted text-foreground border-l-4 border-l-border',
        info: 'bg-info-background text-foreground border-l-4 border-l-info [&>svg]:text-info *:data-[slot=alert-description]:text-foreground/80',
        success:
          'bg-success-background text-foreground border-l-4 border-l-success [&>svg]:text-success *:data-[slot=alert-description]:text-foreground/80',
        // warning icon uses the dark -foreground (not the light amber main) so it
        // stays visible on the light warning tint.
        warning:
          'bg-warning-background text-foreground border-l-4 border-l-warning [&>svg]:text-warning-foreground *:data-[slot=alert-description]:text-foreground/80',
        error:
          'bg-destructive-background text-destructive border-l-4 border-l-destructive *:data-[slot=alert-description]:text-destructive/90',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
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
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
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
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle }

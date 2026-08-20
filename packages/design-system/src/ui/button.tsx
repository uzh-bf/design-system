import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-primary-100 text-primary-foreground hover:bg-primary-100/90 disabled:hover:bg-primary-100',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background hover:bg-accent disabled:hover:bg-background hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:hover:bg-secondary',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 disabled:hover:bg-accent',
        link: 'text-link underline-offset-4 hover:underline',
      },
      // fixed-height ladder matching the reference (sm/md/lg = 32/40/48px, font 14/15/16, px 12/16/20)
      size: {
        default: 'h-10 px-4 text-[15px]',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-5 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

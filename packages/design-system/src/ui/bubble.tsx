import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../lib/utils'

function BubbleGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="bubble-group"
      className={cn('flex min-w-0 flex-col gap-2', className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  'group/bubble relative flex w-fit min-w-0 flex-col',
  {
    variants: {
      variant: {
        default:
          '[--bubble-bg:var(--primary)] [--bubble-fg:var(--primary-foreground)]',
        secondary:
          '[--bubble-bg:var(--secondary)] [--bubble-fg:var(--secondary-foreground)]',
        muted: '[--bubble-bg:var(--muted)] [--bubble-fg:var(--foreground)]',
        tinted:
          '[--bubble-bg:color-mix(in_oklab,var(--primary)_15%,var(--background))] [--bubble-fg:var(--foreground)]',
        outline:
          '[--bubble-bg:var(--background)] [--bubble-fg:var(--foreground)] [--bubble-border:var(--border)]',
        ghost: '[--bubble-bg:transparent] [--bubble-fg:var(--foreground)]',
        destructive:
          '[--bubble-bg:color-mix(in_oklab,var(--destructive)_10%,var(--background))] [--bubble-fg:var(--theme-destructive-text)] dark:[--bubble-fg:var(--destructive)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Bubble({
  variant = 'default',
  align = 'start',
  className,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof bubbleVariants> & {
    align?: 'start' | 'end'
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        'focus-visible:ring-ring w-fit max-w-full min-w-0 overflow-hidden rounded-3xl border border-[var(--bubble-border,transparent)] bg-[var(--bubble-bg)] px-3 py-2.5 text-sm leading-relaxed wrap-break-word text-[var(--bubble-fg)] group-data-[align=end]/bubble:self-end group-data-[variant=ghost]/bubble:p-0 focus-visible:ring-2',
        className
      )}
      {...props}
    />
  )
}

const bubbleReactionsVariants = cva(
  'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0',
  {
    variants: {
      side: {
        top: 'top-0 -translate-y-3/4',
        bottom: 'bottom-0 translate-y-3/4',
      },
      align: {
        start: 'start-3',
        end: 'end-3',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'end',
    },
  }
)

function BubbleReactions({
  side = 'bottom',
  align = 'end',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  align?: 'start' | 'end'
  side?: 'top' | 'bottom'
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions }

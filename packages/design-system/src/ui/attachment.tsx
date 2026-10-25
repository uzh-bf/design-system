import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../lib/utils'

import { Button } from './button'

const attachmentVariants = cva(
  'group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 rounded-lg border bg-card text-card-foreground focus-within:ring-2 focus-within:ring-ring data-[state=error]:border-destructive data-[state=idle]:border-dashed',
  {
    variants: {
      size: {
        default: 'gap-2 p-2 text-sm',
        sm: 'gap-1.5 p-1.5 text-xs',
        xs: 'gap-1 p-1 text-xs',
      },
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'w-28 flex-col items-stretch',
      },
    },
  }
)

function Attachment({
  className,
  state = 'done',
  size = 'default',
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof attachmentVariants> & {
    state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done'
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  'relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-foreground group-data-[orientation=vertical]/attachment:aspect-square group-data-[orientation=vertical]/attachment:w-full group-data-[orientation=vertical]/attachment:h-auto group-data-[state=error]/attachment:text-destructive-text dark:group-data-[state=error]/attachment:text-destructive [&_svg]:size-4',
  {
    variants: {
      variant: { icon: '', image: '[&_img]:size-full [&_img]:object-cover' },
    },
    defaultVariants: { variant: 'icon' },
  }
)

function AttachmentMedia({
  className,
  variant = 'icon',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        'max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1',
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        'group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block max-w-full min-w-0 truncate font-medium',
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        'text-muted-foreground group-data-[state=error]/attachment:text-destructive-text dark:group-data-[state=error]/attachment:text-destructive mt-0.5 block min-w-0 truncate text-xs',
        'max-w-full',
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        'relative z-20 flex shrink-0 items-center gap-1 self-end',
        className
      )}
      {...props}
    />
  )
}

function AttachmentAction({
  type = 'button',
  className,
  variant,
  size = 'icon-xs',
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      type={type}
      variant={variant ?? 'ghost'}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="attachment-trigger"
      type={asChild ? undefined : (type ?? 'button')}
      className={cn('absolute inset-0 z-10 outline-none', className)}
      {...props}
    />
  )
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        'scroll-fade-x scrollbar-none flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
}

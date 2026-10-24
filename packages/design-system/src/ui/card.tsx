import * as React from 'react'

import { cn } from '../lib/utils'

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'bg-card text-card-foreground shadow-card flex flex-col overflow-hidden rounded-md border [--card-content-top:--spacing(3)] [--card-footer-y:--spacing(3.5)] [--card-header-bottom:--spacing(2)] [--card-inset-x:--spacing(6)] [--card-inset-y:--spacing(5)]',
        size === 'sm' &&
          '[--card-content-top:--spacing(2)] [--card-footer-y:--spacing(3)] [--card-header-bottom:--spacing(1.5)] [--card-inset-x:--spacing(4)] [--card-inset-y:--spacing(4)]',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-[var(--card-inset-x,calc(var(--spacing)*6))] pt-[var(--card-inset-y,calc(var(--spacing)*5))] pb-[var(--card-header-bottom,calc(var(--spacing)*2))] has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-[17px] leading-[1.3] font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-muted-foreground text-[13px] leading-normal',
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        'px-[var(--card-inset-x,calc(var(--spacing)*6))] pt-[var(--card-content-top,calc(var(--spacing)*3))] pb-[var(--card-inset-y,calc(var(--spacing)*5))]',
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'bg-muted flex items-center justify-end gap-2 border-t px-[var(--card-inset-x,calc(var(--spacing)*6))] py-[var(--card-footer-y,calc(var(--spacing)*3.5))]',
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}

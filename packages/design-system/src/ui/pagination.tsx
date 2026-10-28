import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'
import { Button, buttonVariants } from './button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'default' : 'ghost',
          size,
        }),
        'data-[active=true]:border-primary-100 data-[active=true]:bg-primary-100 border-control-border bg-surface text-content hover:bg-surface-hover hover:text-content h-9 min-w-9 rounded-md border px-2 text-[13px] font-normal shadow-none data-[active=true]:font-semibold data-[active=true]:text-white',
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  label,
  text,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  label?: string
  text?: string
}) {
  return (
    <PaginationLink
      aria-label={(label ?? text) || 'Go to previous page'}
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="ds-pagination-label">{label ?? text ?? 'Previous'}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  label,
  text,
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  label?: string
  text?: string
}) {
  return (
    <PaginationLink
      aria-label={(label ?? text) || 'Go to next page'}
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="ds-pagination-label">{label ?? text ?? 'Next'}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        'text-disabled flex size-9 items-center justify-center',
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

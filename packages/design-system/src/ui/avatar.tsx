'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

// sm/md/lg = 28/40/56px per UZH spec. No defaultVariant: omitting `size`
// keeps the legacy size-8 (32px) default for backwards compatibility.
const avatarVariants = cva(
  'relative flex size-8 shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'size-7 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-14 text-base',
      },
    },
  }
)

function Avatar({
  className,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-primary-20 text-primary-100 flex size-full items-center justify-center rounded-full font-bold',
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }

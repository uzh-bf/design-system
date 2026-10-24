'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'
import { toggleVariants } from './toggle'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: 'horizontal' | 'vertical'
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 0,
  orientation: 'horizontal',
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation,
  style,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      orientation={orientation}
      style={{ '--gap': spacing, ...style } as React.CSSProperties}
      className={cn(
        'group/toggle-group flex w-fit items-center gap-[calc(var(--spacing)*var(--gap))] rounded-md data-[variant=outline]:shadow-xs',
        orientation === 'vertical' && 'flex-col items-stretch',
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'min-w-0 flex-1 shrink-0 shadow-none focus:z-10 focus-visible:z-10',
        context.spacing === 0 &&
          (context.orientation === 'vertical'
            ? 'rounded-none first:rounded-t-md last:rounded-b-md data-[variant=outline]:border-t-0 data-[variant=outline]:first:border-t'
            : 'rounded-none first:rounded-s-md last:rounded-e-md data-[variant=outline]:border-s-0 data-[variant=outline]:first:border-s'),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }

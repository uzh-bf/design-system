'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'group/tabs flex gap-2 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row',
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex items-center justify-start text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
  {
    variants: {
      variant: {
        default: 'w-fit gap-1 rounded-lg bg-muted p-1',
        line: 'border-border w-full gap-7 border-b group-data-[orientation=vertical]/tabs:border-r group-data-[orientation=vertical]/tabs:border-b-0',
      },
    },
    defaultVariants: {
      variant: 'line',
    },
  }
)

function TabsList({
  className,
  variant = 'line',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'data-[state=active]:border-b-primary-100 data-[state=active]:text-primary-100 text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 group-data-[variant=default]/tabs-list:data-[state=active]:bg-background group-data-[variant=default]/tabs-list:data-[state=active]:text-foreground -mb-px inline-flex cursor-pointer items-center justify-center gap-1.5 border-b-2 border-b-transparent px-0 py-3 text-sm font-medium whitespace-nowrap transition-colors group-data-[orientation=vertical]/tabs:mb-0 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start group-data-[variant=default]/tabs-list:mb-0 group-data-[variant=default]/tabs-list:rounded-md group-data-[variant=default]/tabs-list:border-b-0 group-data-[variant=default]/tabs-list:px-3 group-data-[variant=default]/tabs-list:py-1.5 focus-visible:rounded-sm focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=active]:font-semibold group-data-[variant=default]/tabs-list:data-[state=active]:border-b-transparent group-data-[variant=default]/tabs-list:data-[state=active]:font-medium',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger }

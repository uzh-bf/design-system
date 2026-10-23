'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const TabsStyleContext = React.createContext<{
  orientation: 'horizontal' | 'vertical'
  variant: 'default' | 'line' | null | undefined
}>({ orientation: 'horizontal', variant: 'line' })

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsStyleContext.Provider value={{ orientation, variant: 'line' }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        orientation={orientation}
        className={cn(
          'flex gap-2',
          orientation === 'vertical' ? 'flex-row' : 'flex-col',
          className
        )}
        {...props}
      />
    </TabsStyleContext.Provider>
  )
}

const tabsListVariants = cva(
  'inline-flex items-center justify-start text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'w-fit gap-1 rounded-lg bg-muted p-1',
        line: 'border-border w-full gap-7 border-b',
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
  const { orientation } = React.useContext(TabsStyleContext)
  return (
    <TabsStyleContext.Provider value={{ orientation, variant }}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(
          tabsListVariants({ variant }),
          orientation === 'vertical' && 'h-fit flex-col',
          orientation === 'vertical' &&
            variant === 'line' &&
            'w-fit gap-0 border-e border-b-0',
          className
        )}
        {...props}
      />
    </TabsStyleContext.Provider>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { orientation, variant } = React.useContext(TabsStyleContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'data-[state=active]:border-b-primary-100 data-[state=active]:text-primary-100 text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 -mb-px inline-flex cursor-pointer items-center justify-center gap-1.5 border-b-2 border-b-transparent px-0 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:rounded-sm focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=active]:font-semibold',
        orientation === 'vertical' && 'mb-0 w-full justify-start',
        variant === 'default' &&
          'text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground mb-0 rounded-md border-b-0 px-3 py-1.5 data-[state=active]:border-b-transparent',
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

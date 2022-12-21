import * as TabsPrimitive from '@radix-ui/react-tabs'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface TabProps {
  key?: string
  value: string
  label: string
  disabled?: boolean
  className?: {
    root?: string
    label?: string
    disabled?: string
  }
}

/**
 * This function returns a pre-styled Tab trigger component to be used inside a Tabs.Tablist.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param key - The key of the tab.
 * @param value - The value of the tab. This is required for the internal and external state.
 * @param label - The label of the tab.
 * @param disabled - The optional disabled property allows you to disable the tab.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tab trigger component
 */
export function Tab({ key, value, label, disabled, className }: TabProps) {
  return (
    <TabsPrimitive.Trigger
      key={`tab-trigger-${key}`}
      value={value}
      className={twMerge(
        'group first:rounded-tl-lg last:rounded-tr-lg border-b border-r last:border-r-0 border-gray-300 flex-1 px-3 py-2.5',
        'rdx-state-active:border-b-slate-600 focus-visible:rdx-state-active:border-b-transparent rdx-state-inactive:bg-gray-50',
        'focus:rdx-state-active:border-b-red focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
        className?.root
      )}
      disabled={disabled}
    >
      <span
        className={twMerge(
          'text-sm font-medium text-gray-700',
          className?.label
        )}
      >
        {label}
      </span>
    </TabsPrimitive.Trigger>
  )
}

interface TabListProps {
  className?: {
    root?: string
  }
}

/**
 * This function returns a pre-styled TabList component to be used inside a Tabs component.
 *
 * @param children The tab triggers should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns TabList component
 */
export function TabList({
  children,
  className,
}: PropsWithChildren<TabListProps>) {
  return (
    <TabsPrimitive.List
      className={twMerge(
        'flex w-full rounded-t-lg bg-white flex-col md:flex-row',
        className?.root
      )}
    >
      {children}
    </TabsPrimitive.List>
  )
}

interface TabContentProps {
  key: string
  value: string
  className?: {
    root?: string
  }
}

/**
 * This function returns a pre-styled TabContent component to be used inside a Tabs component.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param key The key of the tab.
 * @param value The value of the tab. This is required for the internal and external state.
 * @param children The content of the tab should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tab Content component
 */
export function TabContent({
  key,
  value,
  children,
  className,
}: PropsWithChildren<TabContentProps>) {
  return (
    <TabsPrimitive.Content
      key={`tab-content-${key}`}
      value={value}
      className={twMerge('rounded-t-lg bg-white md:px-6 py-4', className?.root)}
    >
      {children}
    </TabsPrimitive.Content>
  )
}

interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (newValue: string) => void
  className?: {
    root?: string
  }
}

/**
 * This function returns a pre-styled TabList component based on the RadixUI TabList component and the custom theme.
 * The active tab / component state can be either controlled internally or controlled through the parent component.
 *
 * @param defaultValue The default value of the tab that is active when the component is initially rendered.
 * @param value The value of the tab that is active. This value is required, if the state is controlled by the parent component.
 * @param onValueChange The function that is called when the active tab is changed. The new value is passed as a parameter. This function is required, if the state is controlled by the parent component.
 * @param children The tab list and content should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tabs wrapper component
 */
function Tabs({
  defaultValue,
  value,
  children,
  onValueChange,
  className,
}: PropsWithChildren<TabsProps>) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className?.root}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

Tabs.Tab = Tab
Tabs.TabList = TabList
Tabs.TabContent = TabContent

export default Tabs

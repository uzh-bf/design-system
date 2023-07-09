import * as TabsPrimitive from '@radix-ui/react-tabs'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface TabProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
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
 * @param id - The id of the tab.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param key - The key of the tab.
 * @param value - The value of the tab. This is required for the internal and external state.
 * @param label - The label of the tab.
 * @param disabled - The optional disabled property allows you to disable the tab.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tab trigger component
 */
export function Tab({
  id,
  data,
  key,
  value,
  label,
  disabled,
  className,
}: TabProps) {
  return (
    <TabsPrimitive.Trigger
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      key={`tab-trigger-${key}`}
      value={value}
      className={twMerge(
        'group flex-1 border-b border-r border-gray-300 px-3 py-2.5 first:rounded-tl-lg last:rounded-tr-lg last:border-r-0',
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
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    root?: string
  }
}

/**
 * This function returns a pre-styled TabList component to be used inside a Tabs component.
 *
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children The tab triggers should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns TabList component
 */
export function TabList({
  id,
  data,
  children,
  className,
}: PropsWithChildren<TabListProps>) {
  return (
    <TabsPrimitive.List
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'flex w-full flex-col rounded-t-lg bg-white md:flex-row',
        className?.root
      )}
    >
      {children}
    </TabsPrimitive.List>
  )
}

interface TabContentProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
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
 * @param id The id of the tab content.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param key The key of the tab.
 * @param value The value of the tab. This is required for the internal and external state.
 * @param children The content of the tab should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tab Content component
 */
export function TabContent({
  id,
  data,
  key,
  value,
  children,
  className,
}: PropsWithChildren<TabContentProps>) {
  return (
    <TabsPrimitive.Content
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      key={`tab-content-${key}`}
      value={value}
      className={twMerge('rounded-t-lg bg-white py-4 md:px-6', className?.root)}
    >
      {children}
    </TabsPrimitive.Content>
  )
}

interface TabsProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
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
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param defaultValue The default value of the tab that is active when the component is initially rendered.
 * @param value The value of the tab that is active. This value is required, if the state is controlled by the parent component.
 * @param onValueChange The function that is called when the active tab is changed. The new value is passed as a parameter. This function is required, if the state is controlled by the parent component.
 * @param children The tab list and content should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tabs wrapper component
 */
function Tabs({
  id,
  data,
  defaultValue,
  value,
  children,
  onValueChange,
  className,
}: PropsWithChildren<TabsProps>) {
  return (
    <TabsPrimitive.Root
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
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

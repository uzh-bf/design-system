'use client'

import React, { createContext, useContext, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import Tooltip from './Tooltip'
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs'

const TabsContext = createContext<{ tabsId: string }>({ tabsId: '' })

/**
 * This function returns a tabs component for use based on the Shadcn UI prestyled component
 * with simplified / combined interfaces for easier re-use.
 *
 * @param id - The id of the tabs component.
 * @param defaultValue - The default value of the active tab.
 * @param value - The controlled value of the active tab.
 * @param onValueChange - Callback function to handle value changes.
 * @param tabs - An array of tab objects, each containing an optional id (React key only, never a DOM id), label, value, and optional data attributes.
 * @param className - Optional class names for styling the tabs and their components.
 * @param children - The content of the tabs, which will be rendered in the corresponding tab content area.
 * @returns A Tabs component that allows users to switch between different content sections.
 */
export function Tabs({
  id,
  defaultValue,
  value,
  onValueChange,
  tabs,
  className,
  children,
}: {
  id?: string
  defaultValue: string
  value?: string
  onValueChange?: (newValue: string) => void
  tabs: {
    // React list key only — the trigger and panel DOM ids are always derived
    // from the tabs id and the tab value so both ends of the ARIA pair match.
    id?: string
    label: string | React.ReactNode
    value: string
    disabled?: boolean
    tooltip?: string
    tooltipDelay?: number
    data?: { cy?: string; test?: string }
    className?: {
      trigger?: string
      tooltip?: string
    }
  }[]
  className?: {
    root?: string
    list?: string
    trigger?: string
  }
  children: React.ReactNode // tabs content
}) {
  // React 19 useId values contain delimiters that are illegal in CSS id
  // selectors (`«r0»` today, `:R0:` before it). Strip everything outside the
  // safe id alphabet so the derived trigger/panel ids stay selectable.
  const generatedId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const tabsId = id ?? `tabs-${generatedId}`

  return (
    <TabsContext.Provider value={{ tabsId }}>
      <ShadcnTabs
        id={id}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className={className?.root}
      >
        <TabsList className={className?.list}>
          {tabs.map((tab) => {
            const triggerId = `${tabsId}-trigger-${tab.value}`
            const contentId = `${tabsId}-content-${tab.value}`
            const trigger = (
              <TabsTrigger
                key={tab.id ?? tab.value}
                id={triggerId}
                aria-controls={contentId}
                value={tab.value}
                disabled={tab.disabled}
                data-cy={tab.data?.cy}
                data-test={tab.data?.test}
                className={twMerge(className?.trigger, tab.className?.trigger)}
              >
                {tab.label}
              </TabsTrigger>
            )

            return tab.tooltip ? (
              <Tooltip
                key={tab.id ?? tab.value}
                asChild
                tooltip={tab.tooltip}
                delay={tab.tooltipDelay}
                className={{ tooltip: tab.className?.tooltip }}
              >
                {trigger}
              </Tooltip>
            ) : (
              trigger
            )
          })}
        </TabsList>
        {children}
      </ShadcnTabs>
    </TabsContext.Provider>
  )
}

/**
 * This function returns a tab content component based on the Shadcn UI prestyled component
 *
 * @param value - The value of the tab content, which should match the value of the corresponding tab trigger.
 * @param children - The content to be displayed within the tab content area.
 * @param data - Optional data attributes for testing purposes.
 * @param className - Optional class names for styling the tab content.
 * @returns A TabContent component that displays content when its corresponding tab is active.
 */
export function TabContent({
  value,
  children,
  data,
  className,
}: {
  value: string
  children: React.ReactNode
  data?: { cy?: string; test?: string }
  className?: { root?: string }
}) {
  const { tabsId } = useContext(TabsContext)
  const contentId = tabsId ? `${tabsId}-content-${value}` : undefined
  const triggerId = tabsId ? `${tabsId}-trigger-${value}` : undefined

  return (
    <ShadcnTabsContent
      id={contentId}
      aria-labelledby={triggerId}
      value={value}
      data-cy={data?.cy}
      data-test={data?.test}
      className={className?.root}
    >
      {children}
    </ShadcnTabsContent>
  )
}

import { twMerge } from 'tailwind-merge'
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs'

/**
 * This function returns a tabs component for use based on the Shadcn UI prestyled component
 * with simplified / combined interfaces for easier re-use.
 *
 * @param id - The id of the tabs component.
 * @param defaultValue - The default value of the active tab.
 * @param value - The controlled value of the active tab.
 * @param onValueChange - Callback function to handle value changes.
 * @param tabs - An array of tab objects, each containing an id, label, value, and optional data attributes.
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
    id?: string
    label: string | React.ReactNode
    value: string
    data?: { cy?: string; test?: string }
    className?: string
  }[]
  className?: {
    root?: string
    list?: string
    trigger?: string
  }
  children: React.ReactNode // tabs content
}) {
  return (
    <ShadcnTabs
      id={id}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className?.root}
    >
      <TabsList
        className={twMerge('grid w-full', className?.list)}
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.value}
            data-cy={tab.data?.cy}
            data-test={tab.data?.test}
            className={twMerge(
              'data-[state=active]:font-bold',
              className?.trigger,
              tab.className
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </ShadcnTabs>
  )
}

export function TabContent({
  id,
  value,
  children,
  data,
  className,
}: {
  id?: string
  value: string
  children: React.ReactNode
  data?: { cy?: string; test?: string }
  className?: { root?: string }
}) {
  return (
    <ShadcnTabsContent
      id={id}
      value={value}
      data-cy={data?.cy}
      data-test={data?.test}
      className={className?.root}
    >
      {children}
    </ShadcnTabsContent>
  )
}

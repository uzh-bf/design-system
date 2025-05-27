import { twMerge } from 'tailwind-merge'
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs'

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
    active?: string
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
              className?.trigger,
              tab.className,
              'focus:font-bold',
              tab.value === value ? className?.active : ''
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

Tabs.TabContent = TabContent
export default Tabs

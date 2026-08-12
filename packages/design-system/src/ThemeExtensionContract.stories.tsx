import type { CSSProperties } from 'react'

import { Badge } from './Badge'
import { Button } from './Button'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './Sidebar'
import { Input } from './ui/input'

const SYNTHETIC_RAMP = {
  '--theme-color-primary': '#8c2f14',
  '--theme-color-primary-80': '#a94425',
  '--theme-color-primary-60': '#c76645',
  '--theme-color-primary-40': '#e5a38f',
  '--theme-color-primary-20': '#f7d9cf',
} as CSSProperties

function ContractPanel({
  id,
  label,
  style,
  theme,
}: {
  id: string
  label: string
  style?: CSSProperties
  theme: 'neutral' | 'uzh'
}) {
  return (
    <section
      data-theme={theme}
      data-theme-contract-panel={id}
      className="flex min-w-0 flex-col gap-4 rounded-lg border p-4"
      style={style}
    >
      <h2 className="text-lg font-semibold">{label}</h2>
      <div className="flex flex-wrap items-center gap-2">
        <Button primary data={{ test: `theme-contract-button-${id}` }}>
          Primary action
        </Button>
        <Badge data-test={`theme-contract-badge-${id}`}>Badge</Badge>
      </div>
      <label
        className="flex flex-col gap-1 text-sm"
        htmlFor={`theme-contract-input-${id}`}
      >
        Focus target
        <Input
          id={`theme-contract-input-${id}`}
          data-test={`theme-contract-input-${id}`}
          aria-label={`${label} focus target`}
          placeholder="Focus me"
        />
      </label>
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="none" className="min-h-0 w-full">
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive
                  data-test={`theme-contract-sidebar-active-${id}`}
                >
                  Active item
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  data-test={`theme-contract-sidebar-hover-${id}`}
                >
                  Hover item
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </section>
  )
}

export const Default = () => (
  <div className="grid w-full gap-6 md:grid-cols-3">
    <ContractPanel id="neutral" label="Neutral" theme="neutral" />
    <ContractPanel id="uzh" label="UZH" theme="uzh" />
    <ContractPanel
      id="synthetic-ramp"
      label="Synthetic primary ramp"
      theme="uzh"
      style={SYNTHETIC_RAMP}
    />
  </div>
)

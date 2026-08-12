import { useEffect, type CSSProperties } from 'react'

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

/**
 * Canonical document-root theme states for the primary-ramp extension
 * contract. Each story renders the same content without any nested theme
 * wrapper: the theme, ramp, and dark axis are applied to
 * `document.documentElement` — by the story itself for the synthetic ramp
 * stimulus, and by the focused Playwright proof for every state.
 */
const SYNTHETIC_RAMP = {
  '--theme-color-primary': '#8c2f14',
  '--theme-color-primary-80': '#a94425',
  '--theme-color-primary-60': '#c76645',
  '--theme-color-primary-40': '#e5a38f',
  '--theme-color-primary-20': '#f7d9cf',
} as CSSProperties

function ContractContent({ id }: { id: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">{id}</h2>
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
          aria-label={`${id} focus target`}
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
    </div>
  )
}

export const Neutral = () => <ContractContent id="neutral" />

export const Uzh = () => <ContractContent id="uzh" />

export const SyntheticRamp = () => {
  useEffect(() => {
    const root = document.documentElement
    for (const [name, value] of Object.entries(SYNTHETIC_RAMP)) {
      root.style.setProperty(name, value)
    }
    return () => {
      for (const name of Object.keys(SYNTHETIC_RAMP)) {
        root.style.removeProperty(name)
      }
    }
  }, [])

  return <ContractContent id="synthetic-ramp" />
}

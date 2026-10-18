import { useEffect, type CSSProperties } from 'react'

import { Badge } from './Badge'
import { Button } from './Button'
import { H1, H2, H3, H4 } from './Header'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './Sidebar'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { UserNotification } from './UserNotification'

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

// Fixed palette stimuli remain independent from the consumer-owned primary ramp.
const REFERENCE_SWATCHES = [
  ['bg-uzh-blue-100', '#0028a5'],
  ['bg-uzh-blue-80', '#001e7c'],
  ['bg-uzh-blue-60', '#3062ff'],
  ['bg-uzh-blue-40', '#7596ff'],
  ['bg-uzh-blue-20', '#bdc9e8'],
  ['bg-uzh-grey-100', '#a3adb7'],
  ['bg-uzh-grey-80', '#b5bdc5'],
  ['bg-uzh-grey-60', '#c8ced4'],
  ['bg-uzh-grey-40', '#dadee2'],
  ['bg-uzh-grey-20', '#edeff1'],
  ['bg-uzh-red-100', '#dc6027'],
  ['bg-uzh-red-80', '#e38052'],
  ['bg-uzh-red-60', '#eaa07d'],
  ['bg-uzh-red-40', '#f1bfa9'],
  ['bg-uzh-red-20', '#f8dfd4'],
  ['bg-uzh-berry-100', '#bf0d3e'],
  ['bg-uzh-berry-80', '#d9305f'],
  ['bg-uzh-berry-60', '#f3537f'],
  ['bg-uzh-berry-40', '#f78caa'],
  ['bg-uzh-berry-20', '#fbc6d4'],
  ['bg-uzh-yellow-100', '#fede00'],
  ['bg-uzh-yellow-80', '#fbe651'],
  ['bg-uzh-yellow-60', '#fcec7c'],
  ['bg-uzh-yellow-40', '#fdf3a8'],
  ['bg-uzh-yellow-20', '#fef9d3'],
  ['bg-uzh-lightgreen-100', '#91c34a'],
  ['bg-uzh-lightgreen-80', '#aad470'],
  ['bg-uzh-lightgreen-60', '#bfdfc4'],
  ['bg-uzh-lightgreen-40', '#d5e9b7'],
  ['bg-uzh-lightgreen-20', '#eaf4db'],
  ['bg-uzh-darkgreen-100', '#2a7f62'],
  ['bg-uzh-darkgreen-80', '#569d85'],
  ['bg-uzh-darkgreen-60', '#80b6a4'],
  ['bg-uzh-darkgreen-40', '#abcec2'],
  ['bg-uzh-darkgreen-20', '#d5e7e1'],
  ['bg-uzh-turqoise-100', '#0b82a0'],
  ['bg-uzh-turqoise-80', '#3c9fb6'],
  ['bg-uzh-turqoise-60', '#6bb7c7'],
  ['bg-uzh-turqoise-40', '#9ed0d9'],
  ['bg-uzh-turqoise-20', '#cfe8ec'],
] as const

function swatchInk(hex: string) {
  const channels = [1, 3, 5].map((offset) => {
    const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  })
  const luminance =
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  return luminance > 0.179 ? '#000000' : '#ffffff'
}

function ReferenceContent() {
  return (
    <div
      data-test="theme-reference"
      className="flex min-w-0 flex-col gap-4 p-4"
    >
      <H1>Theme reference</H1>
      <section aria-label="Typography" className="flex flex-col gap-2">
        <H2>Application heading</H2>
        <H3>Section heading</H3>
        <H4>Supporting heading</H4>
        <p className="text-sm">
          Readable content and explicit consumer layout remain independent.
        </p>
      </section>
      <section
        aria-label="Palette"
        className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-5"
      >
        {REFERENCE_SWATCHES.map(([className, hex]) => (
          <div
            key={className}
            data-test={className}
            className={`${className} min-w-0 rounded p-2 text-xs break-words`}
            style={{ color: swatchInk(hex) }}
          >
            {className.slice(3)}
          </div>
        ))}
      </section>
      <section aria-label="Status" className="grid gap-2 sm:grid-cols-2">
        <UserNotification type="info">
          Information is available.
        </UserNotification>
        <UserNotification type="success">Changes were saved.</UserNotification>
        <UserNotification type="warning">
          Review the selected values.
        </UserNotification>
        <UserNotification type="error">
          The value needs attention.
        </UserNotification>
      </section>
      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="theme-reference-name">Reference value</label>
        <Input id="theme-reference-name" defaultValue="Synthetic reference" />
        <div className="flex flex-wrap gap-2">
          <Button primary data={{ test: 'theme-reference-primary' }}>
            Save
          </Button>
          <Button disabled>Unavailable</Button>
          <Badge>Selected</Badge>
        </div>
      </form>
      <Tabs defaultValue="overview">
        <TabsList aria-label="Reference views">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detail">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Example</TableCell>
                <TableCell>
                  A long synthetic description exercises the default table
                  layout and consumer wrapping choices.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="detail">
          <p>Additional reference content.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export const Reference = () => <ReferenceContent />

export const ReferenceSyntheticRamp = () => {
  useEffect(() => {
    const root = document.documentElement
    for (const [name, value] of Object.entries(SYNTHETIC_RAMP))
      root.style.setProperty(name, value)
    return () => {
      for (const name of Object.keys(SYNTHETIC_RAMP))
        root.style.removeProperty(name)
    }
  }, [])
  return <ReferenceContent />
}

import { useEffect, useState, type CSSProperties } from 'react'

import { Badge } from './Badge'
import { Button } from './Button'
import { H1, H2, H3, H4 } from './Header'
import { Modal } from './Modal'
import { Prose } from './Prose'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './Sidebar'
import { Tooltip as LegacyTooltip } from './Tooltip'
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
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
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
  ['bg-uzh-red-100', '#fc4c02'],
  ['bg-uzh-red-80', '#bd3902'],
  ['bg-uzh-red-60', '#fe9367'],
  ['bg-uzh-red-40', '#feb799'],
  ['bg-uzh-red-20', '#ffdbcc'],
  ['bg-uzh-berry-100', '#bf0d3e'],
  ['bg-uzh-berry-80', '#8f0a2e'],
  ['bg-uzh-berry-60', '#f3537f'],
  ['bg-uzh-berry-40', '#f78caa'],
  ['bg-uzh-berry-20', '#fbc6d4'],
  ['bg-uzh-yellow-100', '#f3ab00'],
  ['bg-uzh-yellow-80', '#a27200'],
  ['bg-uzh-yellow-60', '#ffde8f'],
  ['bg-uzh-yellow-40', '#ffe9b5'],
  ['bg-uzh-yellow-20', '#fff4da'],
  ['bg-uzh-lightgreen-100', '#7ca023'],
  ['bg-uzh-lightgreen-80', '#536b18'],
  ['bg-uzh-lightgreen-60', '#c8e485'],
  ['bg-uzh-lightgreen-40', '#dbedad'],
  ['bg-uzh-lightgreen-20', '#ecf6d6'],
  ['bg-uzh-darkgreen-100', '#2a7f62'],
  ['bg-uzh-darkgreen-80', '#569d85'],
  ['bg-uzh-darkgreen-60', '#80b6a4'],
  ['bg-uzh-darkgreen-40', '#abcec2'],
  ['bg-uzh-darkgreen-20', '#d5e7e1'],
  ['bg-uzh-turqoise-100', '#1ea7c4'],
  ['bg-uzh-turqoise-80', '#147082'],
  ['bg-uzh-turqoise-60', '#92dfee'],
  ['bg-uzh-turqoise-40', '#b7e9f4'],
  ['bg-uzh-turqoise-20', '#dbf4f9'],
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
  const [modalOpen, setModalOpen] = useState(false)
  const help =
    'A long synthetic explanation keeps help readable when a form is narrow and the surrounding content scrolls. It also checks that portaled content remains inside the available viewport.'
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
          <Badge data-test="reference-badge">Selected</Badge>
          <Badge variant="solid" data-test="reference-badge-solid">
            Solid
          </Badge>
          <Button basic data={{ test: 'reference-basic' }}>
            Basic action
          </Button>
        </div>
      </form>
      <section
        aria-label="Help"
        className="bg-background sticky top-0 z-10 flex flex-wrap gap-2"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button data={{ test: 'reference-tooltip' }}>Help</Button>
          </TooltipTrigger>
          <TooltipContent data-test="reference-tooltip-content">
            {help}
          </TooltipContent>
        </Tooltip>
        <LegacyTooltip
          asChild
          tooltip={help}
          data={{ test: 'reference-wrapper-tooltip' }}
          dataContent={{ test: 'reference-wrapper-tooltip-content' }}
        >
          <Button>Wrapper help</Button>
        </LegacyTooltip>
      </section>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Reference dialog"
        data={{ test: 'reference-open-modal' }}
        trigger={
          <Button
            data={{ test: 'reference-open-modal' }}
            onClick={() => setModalOpen(true)}
          >
            Open help dialog
          </Button>
        }
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button data={{ test: 'reference-modal-tooltip' }}>
              Dialog help
            </Button>
          </TooltipTrigger>
          <TooltipContent data-test="reference-modal-tooltip-content">
            {help}
          </TooltipContent>
        </Tooltip>
      </Modal>
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
      <details data-test="reference-overrides">
        <summary>Explicit consumer overrides</summary>
        <div className="flex flex-col gap-3 p-3">
          <Button basic disabled data={{ test: 'reference-basic-disabled' }}>
            Disabled basic action
          </Button>
          <UserNotification
            dismissible
            onDismiss={() => {}}
            className={{ root: 'p-1' }}
            data={{ test: 'reference-dismissible-override' }}
            message="A long synthetic notification first line must leave enough room for its dismiss action at every viewport."
          />
          <Badge
            className="bg-background text-foreground"
            data-test="reference-badge-override"
          >
            Custom
          </Badge>
          <H2 className={{ root: 'mb-4' }}>Spaced heading</H2>
          <Prose>
            <H2>Document heading</H2>
            <p>Document rhythm stays with prose.</p>
            <H2>Next section</H2>
          </Prose>
          <UserNotification
            className={{ root: 'bg-background p-1 text-lg' }}
            data={{ test: 'reference-notification-override' }}
          >
            Custom notification
          </UserNotification>
          <Tabs defaultValue="one">
            <TabsList className="w-fit" aria-label="Compact reference">
              <TabsTrigger value="one">One</TabsTrigger>
              <TabsTrigger value="two">Two</TabsTrigger>
            </TabsList>
          </Tabs>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  className="whitespace-nowrap"
                  data-test="reference-nowrap"
                >
                  Explicit no-wrap content
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </details>
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

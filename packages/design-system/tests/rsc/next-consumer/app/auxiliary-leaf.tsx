'use client'

import {
  ResizablePanelGroup as RootGroup,
  ResizableHandle as RootHandle,
  ResizablePanel as RootPanel,
  Toaster,
  useDefaultLayout as useRootDefaultLayout,
  useGroupRef as useRootGroupRef,
} from '@uzh-bf/design-system'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useDefaultLayout,
  useGroupRef,
  usePanelRef,
  type Layout,
} from '@uzh-bf/design-system/primitives'
import { useMemo, useState } from 'react'
import {
  Panel as ApplicationPanel,
  type LayoutStorage,
} from 'react-resizable-panels'
import { toast as applicationToast } from 'sonner'

function PackedRootLayout({
  expanded,
  storage,
}: {
  expanded: boolean
  storage: LayoutStorage
}) {
  const rootRef = useRootGroupRef()
  const [layout, setLayout] = useState<Layout>({})
  const panelIds = useMemo(
    () =>
      expanded
        ? ['root-left', 'root-right', 'root-extra']
        : ['root-left', 'root-right'],
    [expanded]
  )
  const persistence = useRootDefaultLayout({
    id: 'packed-root-persistence',
    storage,
    panelIds,
  })

  return (
    <section data-test="packed-root-layout">
      <h2>Shared resizable layout</h2>
      <RootGroup
        id="packed-root-group"
        groupRef={rootRef}
        orientation="horizontal"
        defaultLayout={persistence.defaultLayout}
        onLayoutChanged={persistence.onLayoutChanged}
        onLayoutChange={setLayout}
        style={{ height: 140 }}
      >
        <ApplicationPanel id="root-left" defaultSize="30%" minSize="10%">
          Left
        </ApplicationPanel>
        <ResizableHandle aria-label="Resize shared panels" withHandle />
        <RootPanel
          id="root-right"
          defaultSize={expanded ? '50%' : '70%'}
          minSize="10%"
        >
          Right
        </RootPanel>
        {expanded && (
          <>
            <RootHandle aria-label="Resize extra panel" />
            <ResizablePanel id="root-extra" defaultSize="20%" minSize="10%">
              Extra
            </ResizablePanel>
          </>
        )}
      </RootGroup>
      <button
        data-test="packed-root-resize"
        onClick={() =>
          rootRef.current?.setLayout(
            expanded
              ? { 'root-left': 20, 'root-right': 50, 'root-extra': 30 }
              : { 'root-left': 40, 'root-right': 60 }
          )
        }
      >
        Resize shared panels
      </button>
      <output data-test="packed-root-layout-state">
        {JSON.stringify(layout)}
      </output>
    </section>
  )
}

export function AuxiliaryLeaf({
  initialLayouts,
}: {
  initialLayouts: Record<string, string>
}) {
  const layoutStorage = useMemo(() => {
    // Hydration must read the same persisted snapshot as the server render.
    const values = { ...initialLayouts }
    return {
      getItem: (key: string) => values[key] ?? null,
      setItem: (key: string, value: string) => {
        values[key] = value
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value)
          document.cookie = `ds-fixture-panel-layouts=${encodeURIComponent(JSON.stringify(values))}; Path=/; SameSite=Lax`
        }
      },
    }
  }, [initialLayouts])
  const groupRef = useGroupRef()
  const panelRef = usePanelRef()
  const [expanded, setExpanded] = useState(false)
  const [nativeLayout, setNativeLayout] = useState<Layout>({})
  const [explicitToastTheme, setExplicitToastTheme] = useState<
    'light' | undefined
  >()
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'packed-native-persistence',
    storage: layoutStorage,
  })

  return (
    <div>
      <PackedRootLayout
        key={String(expanded)}
        expanded={expanded}
        storage={layoutStorage}
      />
      <button
        data-test="packed-root-toggle-panels"
        onClick={() => setExpanded((value) => !value)}
      >
        Toggle extra panel
      </button>
      <section data-test="packed-shared-toast">
        <h2>Application toast runtime</h2>
        <Toaster
          id="packed-shared-store"
          theme={explicitToastTheme}
          position="bottom-right"
          closeButton
        />
        <button
          data-test="packed-application-toast"
          onClick={() =>
            applicationToast.success('Synthetic application notification', {
              id: 'packed-application-toast',
              toasterId: 'packed-shared-store',
              duration: Infinity,
              description: 'Emitted through the application Sonner dependency',
            })
          }
        >
          Emit application toast
        </button>
        <button
          data-test="packed-toast-toggle-root-mode"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          Toggle application root mode
        </button>
        <button
          data-test="packed-toast-explicit-light"
          onClick={() => setExplicitToastTheme('light')}
        >
          Use explicit light toast mode
        </button>
      </section>
      <section data-test="packed-native-layout">
        <h2>Native resizable layout</h2>
        <ResizablePanelGroup
          id="packed-native-group"
          groupRef={groupRef}
          orientation="horizontal"
          defaultLayout={defaultLayout}
          onLayoutChange={setNativeLayout}
          onLayoutChanged={onLayoutChanged}
          style={{ height: 140 }}
        >
          <ResizablePanel
            id="native-left"
            panelRef={panelRef}
            defaultSize="30%"
            minSize="10%"
          >
            Left
          </ResizablePanel>
          <ResizableHandle aria-label="Resize native panels" withHandle />
          <ResizablePanel id="native-right" defaultSize="70%" minSize="10%">
            Right
          </ResizablePanel>
        </ResizablePanelGroup>
        <button
          data-test="packed-native-resize"
          onClick={() =>
            groupRef.current?.setLayout({
              'native-left': 40,
              'native-right': 60,
            })
          }
        >
          Resize native panels
        </button>
        <output data-test="packed-native-layout-state">
          {JSON.stringify(nativeLayout)}
        </output>
      </section>
    </div>
  )
}

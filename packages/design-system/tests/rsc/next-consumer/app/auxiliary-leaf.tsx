'use client'

import {
  ResizablePanelGroup as RootGroup,
  ResizableHandle as RootHandle,
  ResizablePanel as RootPanel,
  Toaster,
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
import { useRef, useState } from 'react'
import {
  Panel as ApplicationPanel,
  type ImperativePanelGroupHandle,
} from 'react-resizable-panels'
import { toast as applicationToast } from 'sonner'

const layoutStorage = {
  getItem: (key: string) =>
    typeof window === 'undefined' ? null : window.localStorage.getItem(key),
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, value)
  },
}

export function AuxiliaryLeaf() {
  const rootRef = useRef<ImperativePanelGroupHandle>(null)
  const groupRef = useGroupRef()
  const panelRef = usePanelRef()
  const [rootLayout, setRootLayout] = useState<number[]>([])
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
      <section data-test="packed-root-layout">
        <h2>Legacy resizable layout</h2>
        <RootGroup
          id="packed-root-group"
          autoSaveId="packed-root-persistence"
          ref={rootRef}
          direction="horizontal"
          onLayout={setRootLayout}
          style={{ height: 140 }}
        >
          <ApplicationPanel id="root-left" defaultSize={30} minSize={10}>
            Left
          </ApplicationPanel>
          <RootHandle aria-label="Resize legacy panels" withHandle />
          <RootPanel id="root-right" defaultSize={70} minSize={10}>
            Right
          </RootPanel>
        </RootGroup>
        <button
          data-test="packed-root-resize"
          onClick={() => rootRef.current?.setLayout([40, 60])}
        >
          Resize legacy panels
        </button>
        <output data-test="packed-root-layout-state">
          {JSON.stringify(rootLayout)}
        </output>
      </section>
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

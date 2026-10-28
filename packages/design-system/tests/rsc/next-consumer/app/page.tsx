import {
  Button,
  highlightCode,
  NativeSelect,
  NativeSelectOption,
} from '@uzh-bf/design-system'
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockLine,
  Button as PrimitiveButton,
} from '@uzh-bf/design-system/primitives'
import { cookies } from 'next/headers'
import { AuxiliaryLeaf, PackedCodeClient } from './auxiliary-leaf'
import { ChartLeaf } from './chart-leaf'
import { RhfLeaf } from './rhf-leaf'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  const { mode } = await searchParams
  if (mode === 'server-code') {
    const code = 'const server = 42\n'
    const lines = (await highlightCode(code, 'typescript')) ?? code.split('\n')
    return (
      <main>
        <h1>Server source</h1>
        <CodeBlock>
          <CodeBlockContent data-test="server-code" lineNumbers>
            {lines.map((line, index) => (
              <CodeBlockLine key={index}>{line}</CodeBlockLine>
            ))}
          </CodeBlockContent>
        </CodeBlock>
      </main>
    )
  }
  if (mode === 'client-code')
    return (
      <main>
        <h1>Client source</h1>
        <PackedCodeClient />
      </main>
    )
  let initialLayouts: Record<string, string> = {}
  const persisted = (await cookies()).get('ds-fixture-panel-layouts')?.value
  if (persisted) {
    try {
      const parsed: unknown = JSON.parse(persisted)
      if (
        parsed &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed) &&
        Object.values(parsed).every((value) => typeof value === 'string')
      )
        initialLayouts = parsed as Record<string, string>
    } catch {
      // An invalid fixture cookie falls back to the native default layout.
    }
  }
  return (
    <main>
      <h1>RSC contract</h1>
      <Button type="button">Root Button</Button>
      <PrimitiveButton type="button">Primitive Button</PrimitiveButton>
      <label htmlFor="rsc-native">Server-rendered native selection</label>
      <NativeSelect id="rsc-native" defaultValue="one" name="native">
        <NativeSelectOption value="one">One</NativeSelectOption>
        <NativeSelectOption value="two">Two</NativeSelectOption>
      </NativeSelect>
      <ChartLeaf />
      <RhfLeaf />
      <AuxiliaryLeaf initialLayouts={initialLayouts} />
    </main>
  )
}

import { Button, NativeSelect, NativeSelectOption } from '@uzh-bf/design-system'
import { Button as PrimitiveButton } from '@uzh-bf/design-system/primitives'
import { RhfLeaf } from './rhf-leaf'

export default function Page() {
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
      <RhfLeaf />
    </main>
  )
}

import { Button } from '@uzh-bf/design-system'
import { Button as PrimitiveButton } from '@uzh-bf/design-system/primitives'
import { RhfLeaf } from './rhf-leaf'

export default function Page() {
  return (
    <main>
      <h1>RSC contract</h1>
      <Button type="button">Root Button</Button>
      <PrimitiveButton type="button">Primitive Button</PrimitiveButton>
      <RhfLeaf />
    </main>
  )
}

import { Button } from '@uzh-bf/design-system'
import { RhfLeaf } from './rhf-leaf'

export default function Page() {
  return (
    <main>
      <h1>RSC contract</h1>
      <Button type="button">Root Button</Button>
      <RhfLeaf />
    </main>
  )
}

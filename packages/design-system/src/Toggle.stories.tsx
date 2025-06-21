import { Bold } from 'lucide-react'

import { Toggle } from './Toggle'

export const Default = () => {
  return (
    <Toggle aria-label="Toggle italic">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}

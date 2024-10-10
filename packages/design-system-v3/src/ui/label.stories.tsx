import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'

import type { Story, StoryDefault } from '@ladle/react'

export default {
  title: 'Shadcn/Label',
} satisfies StoryDefault

export const Default: Story = () => (
  <div>
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  </div>
)

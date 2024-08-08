import { Checkbox } from '@/ui/checkbox'
import type { Story, StoryDefault } from '@ladle/react'

export default {
  title: 'Shadcn/Checkbox',
} satisfies StoryDefault

export const Default: Story = () => (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <label
      htmlFor="terms"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
)

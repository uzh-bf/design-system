import { Textarea } from '@/ui/textarea'
import type { Story, StoryDefault } from '@ladle/react'

export default {
  title: 'Shadcn/Textarea',
} satisfies StoryDefault

export const Default: Story = () => (
  <Textarea placeholder="Type your message here." />
)

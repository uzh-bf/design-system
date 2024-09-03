import { Input } from '@/ui/input'

import type { Story, StoryDefault } from '@ladle/react'

export default {
  title: 'Shadcn/Input',
} satisfies StoryDefault

export const Default: Story = () => <Input type="email" placeholder="Email" />

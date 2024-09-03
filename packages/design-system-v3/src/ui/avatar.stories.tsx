import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import type { Story, StoryDefault } from '@ladle/react'

export default {
  title: 'Shadcn/Avatar',
} satisfies StoryDefault

export const Default: Story = () => (
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)

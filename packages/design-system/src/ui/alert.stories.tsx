import { Alert, AlertDescription, AlertTitle } from '@/ui/alert'
import type { Story, StoryDefault } from '@ladle/react'
import { Terminal } from 'lucide-react'

export default {
  title: 'Shadcn/Alert',
} satisfies StoryDefault

export const Default: Story = () => (
  <Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
)

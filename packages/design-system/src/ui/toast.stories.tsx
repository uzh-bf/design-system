import { StoryDefault } from '@ladle/react'
import { Button } from './button'
import { ToastAction } from './toast'
import { Toaster } from './toaster'
import { useToast } from './use-toast'

export default {
  title: 'Shadcn/Toast',
} satisfies StoryDefault

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
            duration: 5000,
          })
        }}
      >
        Add to calendar
      </Button>
    </div>
  )
}

export function Simple() {
  const { toast } = useToast()

  return (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description:
              'Pariatur mollit eiusmod fugiat labore sunt eu reprehenderit laborum Lorem est.',
            duration: 5000,
          })
        }}
      >
        Add to calendar
      </Button>
    </div>
  )
}

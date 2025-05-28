import { toast } from 'sonner'
import { Toaster } from './sonner'

import { StoryDefault } from '@ladle/react'
import { Button } from './button'

export default {
  title: 'Shadcn/Sonner',
} satisfies StoryDefault

export function Default() {
  return (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            // TODO: add type here with styling and then return this as wrapped toast function
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  )
}

export function CloseButton() {
  return (
    <>
      <Toaster closeButton />
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  )
}

export function Simple() {
  return (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            classNames: { title: 'font-bold text-base' },
          })
        }
      >
        Show Toast
      </Button>
    </>
  )
}

export function Custom() {
  return (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast(<div className="font-bold italic">Custom Content</div>)
        }
      >
        Show Toast
      </Button>
    </>
  )
}

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'
import { ToastAction, Toaster, useToast } from './Toast'

export const Default = () => {
  const { toast } = useToast({})

  return (
    <>
      Default toasts can be triggered with a title and description.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            title: 'Title',
            description:
              'Dolore incididunt reprehenderit officia et occaecat non laboris.',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Simple = () => {
  const { toast } = useToast({})

  return (
    <>
      Simple toasts can be triggered with a description as content only.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            description:
              'Dolore incididunt reprehenderit officia et occaecat non laboris.',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Children = () => {
  const { toast } = useToast()

  return (
    <>
      Simple toasts can be triggered with a description as content only.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            children: (
              <div className="flex flex-row items-center gap-3">
                <FontAwesomeIcon
                  className="text-green-600"
                  icon={faCheckCircle}
                />
                <span>SUCCESS</span>
              </div>
            ),
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Action = () => {
  const { toast } = useToast()

  return (
    <>
      Toasts can have an action button that can be triggered.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            description:
              'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            action: (
              <ToastAction
                altText="Action"
                onClick={() => alert('Action clicked!')}
              >
                Action
              </ToastAction>
            ),
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Success = () => {
  const { toast } = useToast({ type: 'success' })

  return (
    <>
      Prestyled toasts can be triggered with a title and description.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            title: 'Title',
            description:
              'Dolore incididunt reprehenderit officia et occaecat non laboris.',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Warning = () => {
  const { toast } = useToast({ type: 'warning' })

  return (
    <>
      Prestyled toasts can be triggered with a title and description.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            title: 'Title',
            description:
              'Dolore incididunt reprehenderit officia et occaecat non laboris.',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Error = () => {
  const { toast } = useToast({ type: 'error' })

  return (
    <>
      Prestyled toasts can be triggered with a title and description.
      <Toaster />
      <Button
        onClick={() =>
          toast({
            title: 'Title',
            description:
              'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            titleClassName: 'text-base',
            descriptionClassName: 'text-base',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

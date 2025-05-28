import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'
import { Toaster, toast } from './Toast'

export const Default = () => {
  return (
    <div>
      <Toaster />
      <div>Default toasts can be triggered with a title and description.</div>
      <Button
        onClick={() =>
          toast({
            message: 'Title',
            options: {
              description:
                'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            },
          })
        }
      >
        Trigger
      </Button>
    </div>
  )
}

export const Dismissible = () => {
  return (
    <div>
      <Toaster closeButton />
      <div>Default toasts can be triggered with a title and description.</div>
      <Button
        onClick={() =>
          toast({
            message: 'Title',
            options: {
              description:
                'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            },
          })
        }
      >
        Trigger
      </Button>
    </div>
  )
}

export const Simple = () => {
  return (
    <>
      <Toaster />
      <div>
        Simple toasts can be triggered with a description as content only.
      </div>
      <Button
        onClick={() =>
          toast({
            message:
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
  return (
    <>
      <Toaster />
      <div>
        The toast function can be simply called with a React function as an
        argument for maximum flexibility
      </div>
      <Button
        onClick={() =>
          toast({
            message: (
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
  return (
    <>
      <Toaster />
      <div>Toasts can have an action button that can be triggered.</div>
      <Button
        onClick={() =>
          toast({
            message: 'Title',
            options: {
              description:
                'Dolore incididunt reprehenderit officia et occaecat non laboris.',
              action: (
                <Button
                  altText="Action"
                  onClick={() => alert('Action clicked!')}
                >
                  Action
                </Button>
              ),
            },
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Success = () => {
  return (
    <>
      <Toaster closeButton />
      <div>Prestyled toasts can be triggered with a title and description.</div>
      <Button
        onClick={() =>
          toast({
            options: {
              description:
                'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            },
            type: 'success',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Warning = () => {
  return (
    <>
      <Toaster />
      <div>Prestyled toasts can be triggered with a title and description.</div>
      <Button
        onClick={() =>
          toast({
            options: {
              description:
                'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            },
            type: 'warning',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

export const Error = () => {
  return (
    <>
      <Toaster />
      <div>Prestyled toasts can be triggered with a title and description.</div>
      <Button
        onClick={() =>
          toast({
            options: {
              description:
                'Dolore incididunt reprehenderit officia et occaecat non laboris.',
            },
            type: 'error',
          })
        }
      >
        Trigger
      </Button>
    </>
  )
}

import React, { useState } from 'react'
import Button from './Button'
import Toast from './Toast'

export const Default = () => {
  return (
    <div>
      <div>
        Toasts can be used with an internally managed state when a trigger can
        be used to trigger the toast (i.e. a button).
      </div>
      <Toast
        triggerText="Trigger Text"
        title="Title"
        description="Description"
        duration={5000}
      />
    </div>
  )
}

export const Children = () => {
  return (
    <div>
      <div>
        Toasts can be used with an internally managed state when a trigger can
        be used to trigger the toast (i.e. a button) and children as content.
      </div>
      <Toast triggerText="Trigger Text" duration={5000}>
        Content as Children
      </Toast>
    </div>
  )
}

export const ExternalState = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div>
        Toasts can be used with an externally managed state and either
        title/description or children as content. As both the open state and the
        state change method have to be passed to the component, the toast will
        still disappear after the specified duration, given that the user does
        not hover on it.
      </div>
      <Button onClick={() => setOpen(true)}>Trigger now is a Button</Button>
      <Toast duration={5000} openExternal={open} setOpenExternal={setOpen}>
        Content as Children
      </Toast>
    </div>
  )
}

export const Action = () => {
  return (
    <div>
      <div>
        Toasts can make use of a radix action button (basic button version).
        This button will be shown, if a corresponding text and onClick function
        are provided
      </div>
      <Toast
        triggerText="Trigger Text"
        duration={5000}
        actionText="Action Trigger"
        actionOnClick={() => alert('Action clicked')}
      >
        Content
      </Toast>
    </div>
  )
}

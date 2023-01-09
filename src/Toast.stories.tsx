import React, { useState } from 'react'
import Button from './Button'
import { H4 } from './Header'
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

export const Success = () => {
  return (
    <div>
      <div>Styled toast component with success type.</div>
      <Toast triggerText="Trigger" duration={5000} type="success">
        <H4>Title</H4>
        <div>Content Success</div>
      </Toast>
    </div>
  )
}

export const Warning = () => {
  return (
    <div>
      <div>Styled toast component with warning type.</div>
      <Toast triggerText="Trigger" type="warning">
        Content of Tooltip
      </Toast>
    </div>
  )
}

export const Error = () => {
  return (
    <div>
      <div>Styled toast component with error type.</div>
      <Toast triggerText="Trigger" duration={5000} type="error">
        Content with a bit more text so that it will be split onto multiple
        lines due to the maximum width specified for the tooltip
      </Toast>
    </div>
  )
}

export const Dismissible = () => {
  return (
    <div>
      <div className="mb-2">
        Toast components can have an "addimissible" prop set to true. This will
        set the duration automatically to a minute, but offer an option to the
        user to manually close the tooltip. Optionally, the duration of a minute
        can also be overwritten using the duration prop.
      </div>
      <Toast
        triggerText="Trigger - no overwritten duration"
        className={{ trigger: 'mb-2' }}
        dismissible
      >
        Toast Content
      </Toast>
      <Toast triggerText="Trigger - duration 5s" duration={5000} dismissible>
        Toast Content
      </Toast>
    </div>
  )
}

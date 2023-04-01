import React from 'react'
import UserNotification from './UserNotification'

export const Default = () => {
  return (
    <UserNotification message="This is the default notif style when the provided type is not 'success', 'error', or 'info'" />
  )
}

export const Success = () => {
  return (
    <UserNotification
      type="success"
      message="You have been registered successfully"
    >
      Content
    </UserNotification>
  )
}

export const Warning = () => {
  return (
    <UserNotification
      type="warning"
      message="You are about to create a new account with a different email address."
    >
      Content
    </UserNotification>
  )
}

export const Error = () => {
  return (
    <UserNotification
      type="error"
      message="An error occurred during registration"
    >
      Content
    </UserNotification>
  )
}

export const Info = () => {
  return (
    <UserNotification
      type="info"
      message="There are five more places available"
    >
      Content
    </UserNotification>
  )
}

export const Styled = () => {
  return (
    <UserNotification
      type="default"
      message="This is a notification with default type but added custom styling"
      className={{
        root: 'text-lg gap-4',
        content: 'text-red-400 text-base italic',
        icon: 'text-blue-500',
        message: 'text-green-500',
      }}
    >
      The content of the notification can be styled as well and used to display
      more detailed information regarding the notification.
    </UserNotification>
  )
}

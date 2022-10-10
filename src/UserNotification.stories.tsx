import React from 'react'
import UserNotification from './UserNotification'

export const Success = () => {
  return (
    <UserNotification
      notificationType="success"
      message="You have been registered successfully"
    ></UserNotification>
  )
}

export const Error = () => {
  return (
    <UserNotification
      notificationType="error"
      message="An error occurred during registration"
    ></UserNotification>
  )
}

export const Info = () => {
  return (
    <UserNotification
      notificationType="info"
      message="There are five more places available"
    ></UserNotification>
  )
}

export const Default = () => {
  return (
    <UserNotification
      notificationType="default"
      message="This is the default notif style when the provided notificationType is not 'success', 'error', or 'info'"
    ></UserNotification>
  )
}

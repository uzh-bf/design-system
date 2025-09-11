import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface UserNotificationProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  message?: string
  type?: 'default' | 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
  hidden?: boolean
  onDismiss?: () => void
  children?: React.ReactNode
  className?: {
    root?: string
    icon?: string
    closeIcon?: string
    message?: string
    content?: string
  }
}

export interface UserNotificationMessageProps extends UserNotificationProps {
  message: string
  children?: React.ReactNode
}
export interface UserNotificationChildrenProps extends UserNotificationProps {
  message?: never
  children: React.ReactNode
}

/**
 * This function returns a pre-styled UserNotification component based on the custom theme.
 *
 * @param id - The id of the notification.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param message - The message that is displayed in the notification.
 * @param type - The type of the notification. This can be either 'success', 'info' or 'error'. This determines the icon that is displayed and some conditional styling. If not type is provided, the information icon is displayed.
 * @param dismissible - If true, a close button is displayed in the top right corner of the notification. When clicked, the onDismiss function is called.
 * @param hidden - If true, the notification is hidden. This can be used in combination with the dismissible prop to hide the notification when the close button is clicked.
 * @param onDismiss - The function that is called when the close button is clicked. This prop is required if the dismissible prop is set to true.
 * @param children - The optional children are displayed in the notification in addition to the provided message icon.
 * @param className - The optional className object allows you to override the default styling.
 * @returns UserNotification component
 */
export function UserNotification({
  id,
  data,
  message,
  type = 'default',
  dismissible = false,
  hidden = false,
  onDismiss,
  children,
  className,
}: UserNotificationMessageProps | UserNotificationChildrenProps) {
  let notifIcon: IconDefinition
  let computedClassName: string

  if (hidden) {
    return null
  }

  switch (type) {
    case 'warning':
      computedClassName = 'text-uzh-red-100 bg-uzh-red-20'
      notifIcon = faTriangleExclamation
      break
    case 'error':
      computedClassName = 'text-destructive bg-red-100'
      notifIcon = faCircleXmark
      break
    case 'info':
      computedClassName = 'text-uzh-blue-100 bg-uzh-blue-20'
      notifIcon = faCircleInfo
      break
    case 'success':
      computedClassName = 'text-uzh-darkgreen-100 bg-uzh-lightgreen-20'
      notifIcon = faCircleCheck
      break
    default:
      computedClassName = 'text-slate-800 bg-uzh-grey-20'
      notifIcon = faCircleInfo
  }

  return (
    <div
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
      className={twMerge(
        'relative flex flex-row gap-2 rounded-md p-2 text-sm',
        className?.root,
        computedClassName!,
        dismissible && 'pr-8'
      )}
    >
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss notification"
          title="Dismiss"
          onClick={onDismiss}
          className={twMerge(
            'focus:ring-uzh-blue-100 absolute top-2 right-2 inline-flex h-5 w-5 items-center justify-center rounded text-base hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-none',
            className?.closeIcon
          )}
        >
          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
        </button>
      )}
      <span>
        <FontAwesomeIcon icon={notifIcon!} className={className?.icon} />
      </span>
      {message && <span className={className?.message}>{message}</span>}
      {children && (
        <div className={twMerge(message && 'mt-2', className?.content)}>
          {children}
        </div>
      )}
    </div>
  )
}

export default UserNotification

import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
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
  children?: React.ReactNode
  className?: {
    root?: string
    icon?: string
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
 * @param children - The optional children are displayed in the notification in addition to the provided message icon.
 * @param className - The optional className object allows you to override the default styling.
 * @returns UserNotification component
 */
export function UserNotification({
  id,
  data,
  message,
  type = 'default',
  children,
  className,
}: UserNotificationMessageProps | UserNotificationChildrenProps) {
  let notifIcon: IconDefinition
  let computedClassName: string

  switch (type) {
    case 'warning':
      computedClassName = 'text-uzh-red-100 bg-uzh-red-20'
      notifIcon = faTriangleExclamation
      break
    case 'error':
      computedClassName = 'text-red-600 bg-red-100'
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
        'flex flex-row gap-2 rounded-md p-2 text-sm',
        className?.root,
        computedClassName!
      )}
    >
      <span>
        <FontAwesomeIcon icon={notifIcon!} className={className?.icon} />
      </span>
      <div>
        {message && <span className={className?.message}>{message}</span>}
        {children && (
          <div className={twMerge(message && 'mt-2', className?.content)}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserNotification

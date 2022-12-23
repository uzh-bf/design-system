import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
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
  message: string
  notificationType: string
  children?: React.ReactNode
  className?: {
    root?: string
    icon?: string
    message?: string
    content?: string
  }
}

const defaultProps = {
  id: undefined,
  data: undefined,
  children: undefined,
  className: undefined,
}

/**
 * This function returns a pre-styled UserNotification component based on the custom theme.
 *
 * @param id - The id of the notification.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param message - The message that is displayed in the notification.
 * @param notificationType - The type of the notification. This can be either 'success', 'info' or 'error'. This determines the icon that is displayed and some conditional styling. If not type is provided, the information icon is displayed.
 * @param children - The optional children are displayed in the notification in addition to the provided message icon.
 * @param className - The optional className object allows you to override the default styling.
 * @returns UserNotification component
 */
export function UserNotification({
  id,
  data,
  message,
  notificationType,
  children,
  className,
}: UserNotificationProps) {
  let notifIcon: any
  let computedClassName: string

  switch (notificationType) {
    case 'error':
      computedClassName = 'text-uzh-red-100 bg-uzh-red-20'
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
        'p-2 mt-6 mb-4 text-sm rounded-md',
        className?.root,
        computedClassName!
      )}
    >
      <div className="flex flex-row">
        <span>
          <FontAwesomeIcon
            icon={notifIcon!}
            className={twMerge('mr-2', className?.icon)}
          />
        </span>
        <span className={className?.message}>{message}</span>
      </div>
      <div
        className={twMerge(
          'flex items-center justify-center mt-2',
          className?.content
        )}
      >
        {children}
      </div>
    </div>
  )
}

UserNotification.defaultProps = defaultProps
export default UserNotification

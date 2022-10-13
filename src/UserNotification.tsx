import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface UserNotificationProps {
  message: string
  notificationType: string
  children?: React.ReactNode
  className?: string
}

export function UserNotification(props: UserNotificationProps) {
  let notifIcon: any
  let computedClassName: string

  switch (props.notificationType) {
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
      className={twMerge(
        'p-2 mt-6 mb-4 text-sm rounded-md',
        props.className,
        computedClassName!
      )}
    >
      <div className="flex flex-row">
        <span>
          <FontAwesomeIcon icon={notifIcon!} className="mr-2" />
        </span>
        <span>{props.message}</span>
      </div>
      <div className="flex items-center justify-center mt-2">
        {props.children}
      </div>
    </div>
  )
}

export default UserNotification

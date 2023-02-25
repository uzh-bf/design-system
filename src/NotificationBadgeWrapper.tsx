import React from 'react'
import { twMerge } from 'tailwind-merge'

interface NotificationBadgeWrapperProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  count?: number
  showBadge?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: {
    root?: string
    badge?: string
  }
  children: React.ReactNode
}

/**
 * This function returns a pre-styled wrapper for some custom component with navigation badge on it.
 *
 * @param id - The id of the notification badge wrapper.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param count - The number of notifications to be displayed on the badge. If no count is provided, the badge will be displayed as a simple red notification dot.
 * @param showBadge - If true, the badge will be displayed as a red dot, even if the number notifications is undefined.
 * @param size - The size of the badge (can be small, medium, large or extra large).
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The component the notification badge should be placed on.
 * @returns Notification badge wrapper component
 */
export function NotificationBadgeWrapper({
  id,
  data,
  count,
  showBadge = false,
  size = 'md',
  className,
  children,
}: NotificationBadgeWrapperProps): React.ReactElement {
  const sizeStyles = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-sm leading-[1.1rem]',
    lg: 'h-[1.6rem] w-[1.6rem] text-lg leading-6',
    xl: 'h-7 w-7 text-xl leading-7',
  }

  if (!count && !showBadge) return <>{children}</>

  return (
    <div
      className={twMerge('relative', className?.root)}
      id={id}
      data-cy={data?.cy}
      data-test={data?.test}
    >
      <div className={twMerge('flex flex-1')}>{children}</div>
      <div
        className={twMerge(
          'absolute right-1 z-10 text-center text-white bg-red-600 rounded-full top-1',
          sizeStyles[size || 'md'],
          className?.badge
        )}
      >
        {!count ? '' : count < 10 && count > 0 ? count : '9+'}
      </div>
    </div>
  )
}

export default NotificationBadgeWrapper

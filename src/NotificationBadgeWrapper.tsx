import React from 'react'
import { twMerge } from 'tailwind-merge'

interface NotificationBadgeWrapperProps {
  count?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: {
    root?: string
    badge?: string
  }
  children: React.ReactNode
}

const defaultProps = {
  count: undefined,
  withoutCount: undefined,
  size: 'md',
  className: undefined,
}

/**
 * This function returns a pre-styled wrapper for some custom component with navigation badge on it.
 *
 * @param count - The number of notifications to be displayed on the badge. If no count is provided, the badge will be displayed as a simple red notification dot.
 * @param size - The size of the badge (can be small, medium, large or extra large).
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The component the notification badge should be placed on.
 * @returns Notification badge wrapper component
 */
export function NotificationBadgeWrapper({
  count,
  size,
  className,
  children,
}: NotificationBadgeWrapperProps): React.ReactElement {
  const sizeStyles = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-sm leading-[1.1rem]',
    lg: 'h-[1.6rem] w-[1.6rem] text-lg leading-6',
    xl: 'h-7 w-7 text-xl leading-7',
  }

  return (
    <div className={twMerge('relative', className?.root)}>
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

NotificationBadgeWrapper.defaultProps = defaultProps

export default NotificationBadgeWrapper

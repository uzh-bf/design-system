'use client'

import { ExternalToast, toast as toastOriginal } from 'sonner'
import { twMerge } from 'tailwind-merge'
export { Toaster } from './ui/sonner'

/**
 * The `toast` function is a wrapper around the `sonner` toast library, providing a consistent styling and behavior for success, warning, and error messages.
 *
 * @param message - The message to be displayed in the toast notification. It can be a string or a React node.
 * @param options - Additional options for the toast notification, such as duration, position, and custom class names.
 * @param type - The type of toast notification to display. It can be 'success', 'warning', or 'error'. If not provided, it defaults to a generic toast
 * @returns - A toast notification with the specified message and options, styled according to the type of notification.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function toast({
  message,
  options,
  type,
}: {
  message?: React.ReactNode
  options?: ExternalToast
  type?: 'success' | 'warning' | 'error' | 'info'
}) {
  if (type === 'success') {
    return toastOriginal.success(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border! group-[.toaster]:border-l-4! group-[.toaster]:border-l-[#7ca023]! group-[.toaster]:py-3!',
          options?.classNames?.toast
        ),
        icon: twMerge('text-[#7ca023] mr-3!', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge(
          'bg-white! text-black! border-gray-300!',
          options?.classNames?.closeButton
        ),
      },
    })
  }

  if (type === 'warning') {
    return toastOriginal.warning(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border! group-[.toaster]:border-l-4! group-[.toaster]:border-l-[#ffc845]! group-[.toaster]:py-3!',
          options?.classNames?.toast
        ),
        icon: twMerge('text-[#ffc845] mr-3!', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge(
          'bg-white! text-black! border-gray-300!',
          options?.classNames?.closeButton
        ),
      },
    })
  }

  if (type === 'error') {
    return toastOriginal.error(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border! group-[.toaster]:border-l-4! group-[.toaster]:border-l-destructive! group-[.toaster]:py-3!',
          options?.classNames?.toast
        ),
        icon: twMerge('text-destructive mr-3!', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge(
          'bg-white! text-black! border-gray-300!',
          options?.classNames?.closeButton
        ),
      },
    })
  }

  if (type === 'info') {
    return toastOriginal(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border! group-[.toaster]:border-l-4! group-[.toaster]:border-l-[#1ea7c4]! group-[.toaster]:py-3!',
          options?.classNames?.toast
        ),
        icon: twMerge('text-[#1ea7c4] mr-3!', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge(
          'bg-white! text-black! border-gray-300!',
          options?.classNames?.closeButton
        ),
      },
    })
  }

  return toastOriginal(message, {
    ...options,
    classNames: {
      closeButton: twMerge(
        'bg-white! text-black! border-gray-300!',
        options?.classNames?.closeButton
      ),
    },
  })
}

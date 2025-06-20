'use client'

import { ExternalToast, toast as toastOriginal } from 'sonner'
import { twMerge } from 'tailwind-merge'
export { Toaster } from './ui/sonner'

// eslint-disable-next-line react-refresh/only-export-components
export function toast({
  message,
  options,
  type,
}: {
  message?: React.ReactNode
  options?: ExternalToast
  type?: 'success' | 'warning' | 'error'
}) {
  if (type === 'success') {
    return toastOriginal.success(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border-2 group-[.toaster]:border-green-600 group-[.toaster]:py-3',
          options?.classNames?.toast
        ),
        icon: twMerge('text-green-600 mr-3', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge('bg-white', options?.classNames?.closeButton),
      },
    })
  }

  if (type === 'warning') {
    return toastOriginal.warning(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border-2 group-[.toaster]:border-orange-500 group-[.toaster]:py-3',
          options?.classNames?.toast
        ),
        icon: twMerge('text-orange-500 mr-3', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge('bg-white', options?.classNames?.closeButton),
      },
    })
  }

  if (type === 'error') {
    return toastOriginal.error(message, {
      ...options,
      classNames: {
        ...options?.classNames,
        toast: twMerge(
          'group-[.toaster]:border-2 group-[.toaster]:border-red-500 group-[.toaster]:py-3',
          options?.classNames?.toast
        ),
        icon: twMerge('text-red-500 mr-3', options?.classNames?.icon),
        description: twMerge('text-base', options?.classNames?.description),
        closeButton: twMerge('bg-white', options?.classNames?.closeButton),
      },
    })
  }

  return toastOriginal(message, options)
}

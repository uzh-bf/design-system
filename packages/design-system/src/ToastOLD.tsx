import {
  faCheckCircle,
  faCircleExclamation,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'
import { ToastDescription, ToastTitle } from './ui/toast'
import { useToast as useToastOriginal } from './ui/use-toast'

// eslint-disable-next-line react-refresh/only-export-components
export * from './ui/toast'
export { Toaster } from './ui/toaster'

// redefine useToast function with additional styling, etc.
// eslint-disable-next-line react-refresh/only-export-components
export function useToast({
  type,
}: {
  type?: 'default' | 'error' | 'success' | 'warning'
} = {}) {
  const { toast, dismiss, toasts } = useToastOriginal()

  if (typeof type === 'undefined' || type === 'default') {
    return { toast, dismiss, toasts }
  }

  // pre-styled toast components with slightly different arguments / more customizable styling
  return {
    toast: ({
      title,
      description,
      className,
      titleClassName,
      descriptionClassName,
    }: {
      title?: string
      description?: string
      className?: string
      titleClassName?: string
      descriptionClassName?: string
    }) =>
      toast({
        children: (
          <div className="flex flex-row items-center gap-4">
            <FontAwesomeIcon
              icon={
                type === 'success'
                  ? faCheckCircle
                  : type === 'warning'
                    ? faTriangleExclamation
                    : faCircleExclamation
              }
              className={twMerge(
                'text-lg',
                type === 'success' && 'text-green-500',
                type === 'warning' && 'text-orange-500',
                type === 'error' && 'text-red-500'
              )}
            />
            <div>
              {title && (
                <ToastTitle className={titleClassName}>{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className={descriptionClassName}>
                  {description}
                </ToastDescription>
              )}
            </div>
          </div>
        ),
        className: twMerge(
          type === 'success' && 'border-2 border-solid border-green-500',
          type === 'warning' && 'border-2 border-solid border-orange-500',
          type === 'error' && 'border-2 border-solid border-red-500',
          className
        ),
      }),
    dismiss,
    toasts,
  }
}

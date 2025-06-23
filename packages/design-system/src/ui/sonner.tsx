'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'
import { twMerge } from 'tailwind-merge'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={twMerge(
        'toaster group',
        props.position === 'top-right' ? 'top-3! right-3!' : '',
        props.position === 'top-left' ? 'top-3! left-3!' : '',
        props.position === 'bottom-right' ? 'right-3! bottom-3!' : '',
        props.position === 'bottom-left' ? 'bottom-3! left-3!' : ''
      )}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: twMerge(
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
            props.toastOptions?.classNames?.toast
          ),
          description: twMerge(
            'group-[.toast]:text-muted-foreground',
            props.toastOptions?.classNames?.description
          ),
          actionButton: twMerge(
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            props.toastOptions?.classNames?.actionButton
          ),
          cancelButton: twMerge(
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            props.toastOptions?.classNames?.cancelButton
          ),
          ...props.toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

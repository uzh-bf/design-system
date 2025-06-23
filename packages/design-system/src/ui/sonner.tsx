'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import { twMerge } from 'tailwind-merge'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={twMerge(
        'toaster group',
        props.position === 'top-right' ? 'top-3 right-3' : '',
        props.position === 'top-left' ? 'top-3 left-3' : '',
        props.position === 'bottom-right' ? 'right-3 bottom-3' : '',
        props.position === 'bottom-left' ? 'bottom-3 left-3' : ''
      )}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

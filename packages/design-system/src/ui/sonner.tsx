'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { Toaster as Sonner, ToasterProps } from 'sonner'
import { twMerge } from 'tailwind-merge'

type SonnerTheme = NonNullable<ToasterProps['theme']>

function validTheme(theme: string | undefined): SonnerTheme | undefined {
  if (theme === 'light' || theme === 'dark' || theme === 'system') {
    return theme
  }

  return undefined
}

function useDocumentModes() {
  const [modes, setModes] = React.useState<{
    root: SonnerTheme | undefined
    system: 'light' | 'dark'
  }>({ root: undefined, system: 'light' })

  React.useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      setModes({
        root:
          root.dataset.theme === 'neutral' || root.dataset.theme === 'uzh'
            ? root.classList.contains('dark')
              ? 'dark'
              : 'light'
            : undefined,
        system: media.matches ? 'dark' : 'light',
      })
    }
    const observer = new MutationObserver(sync)

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })
    media.addEventListener('change', sync)
    sync()

    return () => {
      observer.disconnect()
      media.removeEventListener('change', sync)
    }
  }, [])

  return modes
}

const Toaster = ({
  theme,
  className,
  style,
  toastOptions,
  icons,
  ...props
}: ToasterProps) => {
  const { theme: nextTheme, forcedTheme } = useTheme()
  const { root: rootTheme, system: systemTheme } = useDocumentModes()
  const resolvedTheme =
    validTheme(theme) ??
    validTheme(forcedTheme) ??
    validTheme(nextTheme) ??
    rootTheme ??
    'system'
  const toastClassNames = toastOptions?.classNames

  return (
    <Sonner
      theme={resolvedTheme === 'system' ? systemTheme : resolvedTheme}
      className={twMerge(
        'toaster group',
        props.position === 'top-right' ? 'top-3! right-3!' : '',
        props.position === 'top-left' ? 'top-3! left-3!' : '',
        props.position === 'bottom-right' ? 'right-3! bottom-3!' : '',
        props.position === 'bottom-left' ? 'bottom-3! left-3!' : '',
        className
      )}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          ...style,
        } as React.CSSProperties
      }
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
        ...icons,
      }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastClassNames,
          toast: twMerge(
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
            toastClassNames?.toast
          ),
          description: twMerge(
            'group-[.toast]:text-muted-foreground',
            toastClassNames?.description
          ),
          actionButton: twMerge(
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            toastClassNames?.actionButton
          ),
          cancelButton: twMerge(
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            toastClassNames?.cancelButton
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

import {
  faCheckCircle,
  faCircleExclamation,
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixToast from '@radix-ui/react-toast'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

interface ToastProps {
  title?: string
  description?: string
  duration?: number
  dismissible?: boolean
  triggerText?: string
  actionText?: string
  actionOnClick?: () => void
  position?: string
  openExternal?: boolean
  setOpenExternal?: (open: boolean) => void
  type?: 'default' | 'success' | 'warning' | 'error'
  children?: React.ReactNode
  className?: {
    root?: string
    viewport?: string
    trigger?: string
    title?: string
    description?: string
    children?: string
    action?: string
  }
}

interface ToastPropsWithTitle extends ToastProps {
  title: string
  description?: string
  children?: never
}

interface ToastPropsWithChildren extends ToastProps {
  title?: never
  description?: never
  children: React.ReactNode
}

export interface ToastPropsWithTitleTrigger extends ToastPropsWithTitle {
  triggerText: string
  openExternal?: never
  setOpenExternal?: never
}
export interface ToastPropsWithTitleNoTrigger extends ToastPropsWithTitle {
  triggerText?: never
  openExternal: boolean
  setOpenExternal: (open: boolean) => void
}
export interface ToastPropsWithChildrenTrigger extends ToastPropsWithChildren {
  triggerText: string
  openExternal?: never
  setOpenExternal?: never
}
export interface ToastPropsWithChildrenNoTrigger
  extends ToastPropsWithChildren {
  triggerText?: never
  openExternal: boolean
  setOpenExternal: (open: boolean) => void
}

export function Toast({
  title,
  description,
  duration,
  dismissible,
  triggerText,
  actionText,
  actionOnClick,
  position = 'topRight',
  openExternal,
  setOpenExternal,
  type = 'default',
  children,
  className,
}:
  | ToastPropsWithTitleTrigger
  | ToastPropsWithTitleNoTrigger
  | ToastPropsWithChildrenTrigger
  | ToastPropsWithChildrenNoTrigger): React.ReactElement {
  const [open, setOpen] = useState(false)
  const eventDateRef = useRef(new Date())
  const timerRef = useRef(0)
  const defaultDuration = dismissible ? 60000 : 4000

  const positionDict: Record<string, string> = {
    topRight: 'top-0 right-0',
    topLeft: 'top-0 left-0',
    bottomRight: 'bottom-0 right-0',
    bottomLeft: 'bottom-0 left-0',
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <RadixToast.Provider swipeDirection="right">
      {!openExternal && !setOpenExternal && (
        <Button
          onClick={() => {
            setOpen(false)
            window.clearTimeout(timerRef.current)
            timerRef.current = window.setTimeout(() => {
              eventDateRef.current = new Date('2020-01-01T00:00:00')
              setOpen(true)
            }, 100)
          }}
          className={{ root: className?.trigger }}
        >
          {triggerText}
        </Button>
      )}

      <RadixToast.Root
        className={twMerge(
          'border-md group grid items-center gap-x-4 rounded-md bg-white p-3 shadow-md',
          type === 'success' && 'border-2 border-solid border-green-500',
          type === 'warning' && 'border-2 border-solid border-orange-500',
          type === 'error' && 'border-2 border-solid border-red-500',
          className?.root
        )}
        open={openExternal || open}
        onOpenChange={setOpenExternal || setOpen}
        duration={duration || defaultDuration}
      >
        {dismissible && (
          <Button
            className={{ root: 'fixed right-6 top-4 hidden group-hover:block' }}
            basic
            onClick={() =>
              setOpenExternal ? setOpenExternal(false) : setOpen(false)
            }
          >
            <Button.Icon>
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                className="text-uzh-grey-100 hover:text-black"
              />
            </Button.Icon>
          </Button>
        )}
        <div className="mr-4 flex flex-row items-center gap-4">
          {type === 'success' && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="lg"
              className="text-green-500"
            />
          )}
          {type === 'warning' && (
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="lg"
              className="text-orange-500"
            />
          )}
          {type === 'error' && (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              size="lg"
              className="text-red-500"
            />
          )}
          <div>
            {!children && (
              <>
                <RadixToast.Title
                  className={twMerge('mb-2 font-bold', className?.title)}
                >
                  {title}
                </RadixToast.Title>
                <RadixToast.Description
                  asChild
                  className={twMerge('m-0', className?.description)}
                >
                  {description}
                </RadixToast.Description>
              </>
            )}
            <div className={className?.children}>{children}</div>

            {actionText && actionOnClick && (
              <RadixToast.Action asChild altText="Goto schedule to undo">
                <Button
                  onClick={actionOnClick}
                  className={{ root: className?.action }}
                  basic
                >
                  {actionText}
                </Button>
              </RadixToast.Action>
            )}
          </div>
        </div>
      </RadixToast.Root>
      <RadixToast.Viewport
        className={twMerge(
          'fixed right-0 top-0 z-[1000] m-0 flex min-w-[20rem] max-w-3xl list-none flex-col gap-2 p-3 outline-none',
          positionDict[position || 'topRight'],
          className?.viewport
        )}
      />
    </RadixToast.Provider>
  )
}

export default Toast

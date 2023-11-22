import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixDialog from '@radix-ui/react-dialog'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

export interface ModalProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  className?: {
    overlayOverride?: string
    contentOverride?: string
    overlay?: string
    content?: string
    title?: string
    children?: string
    onPrev?: string
    onNext?: string
  }
  children: React.ReactNode
  fullScreen?: boolean
  open: boolean
  title?: string | React.ReactNode
  trigger?: React.ReactNode
  escapeDisabled?: boolean
  hideCloseButton?: boolean
  asPortal?: boolean

  onClose: () => void
  onNext?: () => void
  onOpenChange?: () => void
  onPrev?: () => void
  onPrimaryAction?: React.ReactNode
  onSecondaryAction?: React.ReactNode
}

/**
 * This function returns a pre-styled modal component based on the RadixUI dialog component and the custom theme.
 *
 * @param id - The id of the modal.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param trigger - The optional trigger that opens the modal, if the state is not managed by some parent component already.
 * @param title - The optional title of the modal.
 * @param children - The content of the modal.
 * @param onClose - Function that is called when the modal is closed.
 * @param onPrev - Function that is called when the optional previous button is clicked.
 * @param onNext - Function that is called when the optional next button is clicked.
 * @param open - Indicate whether the modal is open or not. This state is managed outside of the component.
 * @param onOpenChange - Function that is called when the modal is opened or closed.
 * @param fullScreen - Indicate whether the modal should be full screen or not.
 * @param onPrimaryAction - The optional primary action button.
 * @param onSecondaryAction - The optional secondary action button.
 * @param escapeDisabled - Indicate whether the modal should be closed when the escape key is pressed.
 * @param hideCloseButton - Indicate whether the close button should be hidden.
 * @param className - The optional className object allows you to override the default styling.
 * @param asPortal - Whether the contents are rendered in a portal.
 * @returns Modal component
 */
export function Modal({
  id,
  data,
  trigger,
  title = '',
  children,
  onClose,
  onPrev,
  onNext,
  open,
  onOpenChange,
  fullScreen = false,
  className,
  onPrimaryAction,
  onSecondaryAction,
  escapeDisabled = false,
  hideCloseButton = false,
  asPortal = false,
}: ModalProps) {
  useEffect(() => {
    if (onPrev || onNext) {
      const keyDownHandler = ({ key }: any) => {
        if (key === 'ArrowRight' && onNext) {
          onNext()
        } else if (key === 'ArrowLeft' && onPrev) {
          onPrev()
        }
      }

      window.addEventListener('keydown', keyDownHandler)
      return () => window.removeEventListener('keydown', keyDownHandler)
    }
  }, [onNext, onPrev])

  const overlayContent = (
    <RadixDialog.Overlay
      className={twMerge(
        className?.overlayOverride,
        'fixed bottom-0 left-0 right-0 top-0 z-20 flex justify-center gap-4 bg-uzh-grey-100 bg-opacity-50 p-4 md:items-center',
        className?.overlay
      )}
    >
      {(onPrev || onNext) && (
        <Button
          className={{ root: twMerge('lg:text-xl', className?.onPrev) }}
          disabled={!onPrev}
          onClick={onPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
      )}

      <RadixDialog.Content
        className={twMerge(
          className?.contentOverride,
          'z-30 flex flex-col gap-4 overflow-y-auto rounded-lg bg-white p-4 shadow',
          fullScreen
            ? 'h-full w-full'
            : 'min-h-[18rem] w-[27rem] max-w-7xl md:h-[28rem] md:w-[40rem] lg:h-[40rem] lg:w-[55rem] xl:h-[45rem] xl:w-[70rem]',
          className?.content
        )}
        onEscapeKeyDown={escapeDisabled ? undefined : onClose}
        onPointerDownOutside={
          onPrev || onNext || escapeDisabled ? undefined : onClose
        }
      >
        <div className="flex flex-initial flex-row items-end justify-between">
          <div>
            {title && (
              <RadixDialog.Title
                className={twMerge(
                  'font-sans text-lg font-bold md:text-xl',
                  className?.title
                )}
              >
                {title}
              </RadixDialog.Title>
            )}
          </div>

          {!hideCloseButton && (
            <RadixDialog.Close asChild>
              <Button onClick={onClose} className={{ root: 'self-start' }}>
                <FontAwesomeIcon icon={faXmark} className="lg:text-xl" />
              </Button>
            </RadixDialog.Close>
          )}
        </div>

        <div className={twMerge('flex-1', className?.children)}>{children}</div>

        <div className="flex flex-initial flex-row justify-between">
          <div>{onSecondaryAction && <div>{onSecondaryAction}</div>}</div>
          <div>{onPrimaryAction && <div>{onPrimaryAction}</div>}</div>
        </div>
      </RadixDialog.Content>

      {(onPrev || onNext) && (
        <Button
          className={{ root: twMerge('lg:text-xl', className?.onNext) }}
          disabled={!onNext}
          onClick={onNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      )}
    </RadixDialog.Overlay>
  )

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <RadixDialog.Trigger
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          asChild
        >
          {trigger}
        </RadixDialog.Trigger>
      )}

      {asPortal ? (
        <RadixDialog.Portal>{overlayContent}</RadixDialog.Portal>
      ) : (
        overlayContent
      )}
    </RadixDialog.Root>
  )
}

export default Modal

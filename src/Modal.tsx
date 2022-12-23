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
    overlay?: string
    content?: string
    title?: string
  }
  children: React.ReactNode
  fullScreen?: boolean
  open: boolean
  title?: string | React.ReactNode
  trigger?: React.ReactNode
  escapeDisabled?: boolean
  hideCloseButton?: boolean

  onClose: () => void
  onNext?: () => void
  onOpenChange?: () => void
  onPrev?: () => void
  onPrimaryAction?: React.ReactNode
  onSecondaryAction?: React.ReactNode
}

const defaultProps = {
  id: undefined,
  data: undefined,
  className: undefined,
  fullScreen: false,
  title: '',
  trigger: undefined,
  escapeDisabled: false,
  hideCloseButton: false,
  onNext: undefined,
  onOpenChange: undefined,
  onPrev: undefined,
  onPrimaryAction: undefined,
  onSecondaryAction: undefined,
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
 * @returns Modal component
 */
export function Modal({
  id,
  data,
  trigger,
  title,
  children,
  onClose,
  onPrev,
  onNext,
  open,
  onOpenChange,
  fullScreen,
  className,
  onPrimaryAction,
  onSecondaryAction,
  escapeDisabled,
  hideCloseButton,
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

      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={twMerge(
            'fixed top-0 bottom-0 left-0 right-0 flex justify-center gap-4 p-4 bg-opacity-50 bg-uzh-grey-100 md:items-center',
            className?.overlay
          )}
        >
          {(onPrev || onNext) && (
            <Button
              className={{ root: 'lg:text-xl' }}
              disabled={!onPrev}
              onClick={onPrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          )}

          <RadixDialog.Content
            className={twMerge(
              'flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:overflow-y-scroll',
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
            <div className="flex flex-row items-end justify-between flex-initial">
              <div>
                {title && (
                  <RadixDialog.Title
                    className={twMerge(
                      'text-lg font-bold font-sans md:text-xl',
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

            <div className="flex-1">{children}</div>

            <div className="flex flex-row justify-between flex-initial">
              <div>{onSecondaryAction && <div>{onSecondaryAction}</div>}</div>
              <div>{onPrimaryAction && <div>{onPrimaryAction}</div>}</div>
            </div>
          </RadixDialog.Content>

          {(onPrev || onNext) && (
            <Button
              className={{ root: 'lg:text-xl' }}
              disabled={!onNext}
              onClick={onNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          )}
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

Modal.defaultProps = defaultProps

export default Modal

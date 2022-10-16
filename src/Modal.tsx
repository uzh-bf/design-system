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
  className?: string
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
  className: '',
  fullScreen: false,
  title: '',
  escapeDisabled: false,
  hideCloseButton: false,
}

export function Modal({
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
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}

      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 flex justify-center gap-4 p-4 bg-opacity-50 bg-uzh-grey-100 md:items-center">
          {(onPrev || onNext) && (
            <Button className="lg:text-xl" disabled={!onPrev} onClick={onPrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          )}

          <RadixDialog.Content
            className={twMerge(
              'flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:overflow-y-scroll',
              fullScreen
                ? 'h-full w-full'
                : 'min-h-[18rem] w-[27rem] max-w-7xl md:h-[28rem] md:w-[40rem] lg:h-[40rem] lg:w-[55rem] xl:h-[45rem] xl:w-[70rem]',
              className
            )}
            onEscapeKeyDown={escapeDisabled ? undefined : onClose}
            onPointerDownOutside={
              onPrev || onNext || escapeDisabled ? undefined : onClose
            }
          >
            <div className="flex flex-row items-end justify-between flex-initial">
              <div>
                {title && (
                  <RadixDialog.Title className="text-lg font-bold font-thesans md:text-xl">
                    {title}
                  </RadixDialog.Title>
                )}
              </div>

              {!hideCloseButton && (
                <RadixDialog.Close asChild>
                  <Button onClick={onClose} className="self-start">
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
            <Button className="lg:text-xl" disabled={!onNext} onClick={onNext}>
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

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
  open: boolean
  title?: string | React.ReactNode
  trigger?: React.ReactNode

  onClose: () => void
  onNext?: () => void
  onOpenChange?: () => void
  onPrev?: () => void
  onPrimaryAction?: React.ReactNode
  onSecondaryAction?: React.ReactNode
}

const defaultProps = {
  className: '',
  title: '',
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
  className,
  onPrimaryAction,
  onSecondaryAction,
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
        <RadixDialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 flex justify-center gap-4 p-4 bg-opacity-50 md:items-center bg-uzh-grey-100">
          {(onPrev || onNext) && (
            <Button className="lg:text-xl" disabled={!onPrev} onClick={onPrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
          )}

          <RadixDialog.Content
            className={twMerge(
              'bg-white rounded-lg shadow max-w-7xl xl:w-[70rem] lg:w-[55rem] md:w-[40rem] xl:h-[45rem] lg:h-[40rem] md:h-[28rem] w-[27rem] min-h-[18rem] md:overflow-y-scroll p-4 gap-4 flex flex-col',
              className
            )}
            onEscapeKeyDown={onClose}
            onPointerDownOutside={onPrev || onNext ? undefined : onClose}
          >
            <div className="flex flex-row items-end justify-between flex-initial">
              <div>
                {title && (
                  <RadixDialog.Title className="text-lg font-bold md:text-xl font-thesans">
                    {title}
                  </RadixDialog.Title>
                )}
              </div>

              {onClose && (
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

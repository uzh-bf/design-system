import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export interface ModalProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  dataContent?: {
    cy?: string
    test?: string
  }
  dataCloseButton?: {
    cy?: string
    test?: string
  }
  className?: {
    trigger?: string
    overlay?: string
    content?: string
    header?: string
    footer?: string
    title?: string
    onPrev?: string
    onNext?: string
    primary?: string
    secondary?: string
  }
  children: React.ReactNode
  fullScreen?: boolean
  open: boolean
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void

  title?: string | React.ReactNode
  trigger?: React.ReactNode
  escapeDisabled?: boolean
  hideCloseButton?: boolean

  onNext?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onPrev?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onPrimaryAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  primaryLabel?: string | React.ReactNode
  onSecondaryAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  secondaryLabel?: string | React.ReactNode
}

/**
 * This function returns a pre-styled modal component based on the RadixUI dialog component and the custom theme.
 *
 * @param id - The id of the modal.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the content
 * @param dataCloseButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the close button
 * @param trigger - The optional trigger that opens the modal, if the state is not managed by some parent component already.
 * @param title - The optional title of the modal.
 * @param children - The content of the modal.
 * @param onClose - Function that is called when the modal is closed.
 * @param onPrev - Function that is called when the optional previous button is clicked.
 * @param onNext - Function that is called when the optional next button is clicked.
 * @param open - Indicate whether the modal is open or not. This state is managed outside of the component.
 * @param fullScreen - Indicate whether the modal should be full screen or not.
 * @param onPrimaryAction - The optional primary action, which is executed when clicking on the conditionally rendered primary action button.
 * @param primaryLabel - The label for the primary action button.
 * @param onSecondaryAction - The optional secondary action, which is executed when clicking on the conditionally rendered secondary action button.
 * @param secondaryLabel - The label for the secondary action button.
 * @param escapeDisabled - Indicate whether the modal should be closed when the escape key is pressed.
 * @param hideCloseButton - Indicate whether the close button should be hidden.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Modal component
 */
export function Modal({
  id,
  data,
  dataContent,
  dataCloseButton,
  trigger,
  title,
  children,
  onClose,
  onPrev,
  onNext,
  open,
  fullScreen = false,
  className,
  onPrimaryAction,
  primaryLabel,
  onSecondaryAction,
  secondaryLabel,
  escapeDisabled = false,
  hideCloseButton = false,
}: ModalProps) {
  useEffect(() => {
    if (onPrev || onNext) {
      const keyDownHandler = ({ key }: KeyboardEvent) => {
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
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open === false) {
          onClose()
        }
      }}
    >
      {typeof trigger !== 'undefined' && (
        <DialogTrigger
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          className={className?.trigger}
          asChild
        >
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        hideCloseButton={hideCloseButton}
        onEscapeKeyDown={escapeDisabled ? undefined : () => onClose()}
        onPointerDownOutside={
          onPrev || onNext || escapeDisabled ? undefined : () => onClose()
        }
        data-cy={dataContent?.cy}
        data-test={dataContent?.test}
        dataCloseButton={dataCloseButton}
        className={twMerge(
          'max-h-[calc(100%-2rem)] overflow-y-auto',
          fullScreen
            ? 'h-full w-full max-w-[calc(100%-2rem)]'
            : 'h-max w-[27rem] max-w-7xl md:w-[40rem] lg:w-[55rem] xl:w-[70rem]',
          className?.content
        )}
      >
        <DialogHeader
          className={twMerge(
            'h-max',
            !hideCloseButton && 'mb-3',
            className?.header
          )}
        >
          {typeof title !== 'undefined' && (
            <DialogTitle className={className?.title}>{title}</DialogTitle>
          )}
        </DialogHeader>
        <div className="h-max">{children}</div>
        <DialogFooter
          className={twMerge('mt-3 h-max justify-between', className?.footer)}
        >
          {typeof onSecondaryAction !== 'undefined' && secondaryLabel ? (
            <Button
              className={{ root: twMerge(className?.secondary) }}
              onClick={onSecondaryAction}
            >
              {secondaryLabel}
            </Button>
          ) : null}
          {typeof onPrimaryAction !== 'undefined' && primaryLabel ? (
            <Button
              primary
              className={{ root: twMerge(className?.primary) }}
              onClick={onPrimaryAction}
            >
              {primaryLabel}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal

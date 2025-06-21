'use client'

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
  primaryType?: 'button' | 'submit' | 'reset'
  primaryButtonStyle?: 'default' | 'primary' | 'destructive'
  primaryDisabled?: boolean
  primaryLoading?: boolean
  onSecondaryAction?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  secondaryLabel?: string | React.ReactNode
  secondaryType?: 'button' | 'submit' | 'reset'
  secondaryButtonStyle?: 'default' | 'primary' | 'destructive'

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
  dataPrimaryAction?: {
    cy?: string
    test?: string
  }
  dataSecondaryAction?: {
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
}

/**
 * This function returns a pre-styled modal component based on the RadixUI dialog component and the custom theme.
 *
 * @param id - The id of the modal.
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
 * @param primaryType - The type of the primary action button, which can be 'button', 'submit' or 'reset'.
 * @param primaryButtonStyle - The style of the primary action button, which can be 'default', 'primary' or 'destructive'.
 * @param primaryDisabled - Indicate whether the primary action button should be disabled.
 * @param primaryLoading - Indicate whether the primary action button should be in a loading state.
 * @param onSecondaryAction - The optional secondary action, which is executed when clicking on the conditionally rendered secondary action button.
 * @param secondaryLabel - The label for the secondary action button.
 * @param secondaryType - The type of the secondary action button, which can be 'button', 'submit' or 'reset'.
 * @param secondaryButtonStyle - The style of the secondary action button, which can be 'default', 'primary' or 'destructive'.
 * @param escapeDisabled - Indicate whether the modal should be closed when the escape key is pressed.
 * @param hideCloseButton - Indicate whether the close button should be hidden.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the content
 * @param dataCloseButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the close button
 * @param dataPrimaryAction - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the primary action button
 * @param dataSecondaryAction - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the secondary action button
 * @param className - The optional className object allows you to override the default styling.
 * @returns Modal component
 */
export function Modal({
  id,

  trigger,
  title,
  children,
  onClose,
  onPrev,
  onNext,
  open,
  fullScreen = false,
  onPrimaryAction,
  primaryLabel,
  primaryType = 'button',
  primaryButtonStyle = 'primary',
  primaryDisabled = false,
  primaryLoading = false,
  onSecondaryAction,
  secondaryLabel,
  secondaryType = 'button',
  secondaryButtonStyle = 'default',
  escapeDisabled = false,
  hideCloseButton = false,
  data,
  dataContent,
  dataCloseButton,
  dataPrimaryAction,
  dataSecondaryAction,
  className,
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
        onOpenAutoFocus={(e) => e.preventDefault()} // avoid that the automatically sets focus on first element
        onEscapeKeyDown={
          escapeDisabled ? (e) => e.preventDefault() : () => onClose()
        }
        onPointerDownOutside={
          escapeDisabled ? (e) => e.preventDefault() : () => onClose()
        }
        data-cy={dataContent?.cy}
        data-test={dataContent?.test}
        dataCloseButton={dataCloseButton}
        className={twMerge(
          'max-h-[calc(100%-2rem)] overflow-y-auto',
          fullScreen
            ? 'h-full max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)]'
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
          className={twMerge(
            'mt-3 flex h-max gap-2 sm:flex-row sm:justify-between sm:gap-0',
            typeof onSecondaryAction === 'undefined' &&
              typeof onPrimaryAction !== 'undefined'
              ? 'sm:justify-end'
              : '',
            className?.footer
          )}
        >
          {typeof onSecondaryAction !== 'undefined' && secondaryLabel ? (
            <Button
              type={secondaryType}
              primary={secondaryButtonStyle === 'primary'}
              destructive={secondaryButtonStyle === 'destructive'}
              onClick={onSecondaryAction}
              className={{ root: className?.secondary }}
              data={dataSecondaryAction}
            >
              {secondaryLabel}
            </Button>
          ) : null}
          {typeof onPrimaryAction !== 'undefined' && primaryLabel ? (
            <Button
              primary={primaryButtonStyle === 'primary'}
              destructive={primaryButtonStyle === 'destructive'}
              primaryType={primaryType}
              className={{ root: className?.primary }}
              onClick={onPrimaryAction}
              disabled={primaryDisabled}
              loading={primaryLoading}
              data={dataPrimaryAction}
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

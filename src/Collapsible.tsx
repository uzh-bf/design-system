import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixCollapsible from '@radix-ui/react-collapsible'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

export interface CollapsibleProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  open: boolean
  onChange: () => void
  staticContent: React.ReactNode | string // static content that is only
  closedContent?: React.ReactNode | string // optional content that is only shown when the collapsible is closed
  customTrigger?: React.ReactNode
  primary?: string | React.ReactNode
  onPrimaryClick?: () => void
  secondary?: string | React.ReactNode
  onSecondaryClick?: () => void
  className?: {
    root?: string
    staticContent?: string
    closedContent?: string
    content?: string
    trigger?: string
    primary?: string
    primaryButton?: string
    secondary?: string
    secondaryButton?: string
    bottomWrapper?: string
  }
  children: React.ReactNode
}

/**
 * This function returns a pre-styled collapsible component based on the RadixUI collapsible component and the implemented theme.
 * State need to be managed by the parent component.
 *
 * @param id - The id of the collapsible.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param open - Indicate whether the collapsible is open or not.
 * @param onChange - Function that is called when the collapsible is toggled.
 * @param staticContent - The static content that is always shown.
 * @param closedContent - The optional content that is only shown when the collapsible is closed.
 * @param customTrigger - The optional custom trigger that is shown instead of the default arrow trigger.
 * @param primary - An optional text that will be displayed on a button in the right bottom corner of the collapsible. Alternatively, it is also possible to pass a React node instead.
 * @param onPrimaryClick - Function that will be called once the primary button is clicked (no function for custom primary nodes)
 * @param secondary - An optional text that will be displayed on a button in the left bottom corner of the collapsible. Alternatively, it is also possible to pass a React node instead.
 * @param onSecondaryClick - Function that will be called once the secondary button is clicked (no function for custom secondary nodes)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the collapsible that is shown when the collapsible is open.
 * @returns Collapsible component
 */
export function Collapsible({
  id,
  data,
  open,
  onChange,
  staticContent,
  closedContent,
  customTrigger,
  primary,
  onPrimaryClick,
  secondary,
  onSecondaryClick,
  className,
  children,
}: CollapsibleProps) {
  return (
    <RadixCollapsible.Root open={open} onOpenChange={onChange}>
      <div
        className={twMerge(
          'w-full rounded-md border-2 border-solid border-uzh-grey-80 p-2 pb-0',
          className?.root
        )}
      >
        <div className={className?.staticContent}>{staticContent}</div>
        {!open && closedContent && (
          <div className={className?.closedContent}>{closedContent}</div>
        )}
        <RadixCollapsible.Content className={className?.content}>
          {children}
        </RadixCollapsible.Content>
        <div
          className={twMerge(
            'mb-1.5 grid w-full grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11',
            className?.bottomWrapper
          )}
        >
          <div
            className={twMerge(
              'col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5',
              className?.secondary
            )}
          >
            {typeof secondary === 'string' && onSecondaryClick ? (
              <Button
                onClick={onSecondaryClick}
                className={{ root: className?.secondaryButton }}
              >
                {secondary}
              </Button>
            ) : (
              secondary
            )}
          </div>
          <RadixCollapsible.Trigger
            className={twMerge(
              'col-span-1 flex w-full flex-col justify-end text-center',
              className?.trigger
            )}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
          >
            {customTrigger ?? (
              <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                size="sm"
              />
            )}
          </RadixCollapsible.Trigger>
          <div
            className={twMerge(
              'col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5',
              className?.primary
            )}
          >
            {typeof primary === 'string' && onPrimaryClick ? (
              <Button
                onClick={onPrimaryClick}
                className={{
                  root: twMerge(
                    'float-right border-primary-80 bg-primary-80 font-bold text-white',
                    className?.primaryButton
                  ),
                }}
              >
                {primary}
              </Button>
            ) : (
              primary
            )}
          </div>
        </div>
      </div>
    </RadixCollapsible.Root>
  )
}

export default Collapsible

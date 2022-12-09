import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixCollapsible from '@radix-ui/react-collapsible'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface CollapsibleProps {
  open: boolean
  onChange: () => void
  staticContent: React.ReactNode | string // static content that is only
  closedContent?: React.ReactNode | string // optional content that is only shown when the collapsible is closed
  customTrigger?: React.ReactNode
  className?: {
    root?: string
    staticContent?: string
    closedContent?: string
    content?: string
    trigger?: string
  }
  children: React.ReactNode
}

/**
 * This function returns a pre-styled collapsible component based on the RadixUI collapsible component and the implemented theme.
 * State need to be managed by the parent component.
 *
 * @param open - Indicate whether the collapsible is open or not.
 * @param onChange - Function that is called when the collapsible is toggled.
 * @param staticContent - The static content that is always shown.
 * @param closedContent - The optional content that is only shown when the collapsible is closed.
 * @param customTrigger - The optional custom trigger that is shown instead of the default arrow trigger.
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the collapsible that is shown when the collapsible is open.
 * @returns Collapsible component
 */
export function Collapsible({
  open,
  onChange,
  staticContent,
  closedContent,
  customTrigger,
  className,
  children,
}: CollapsibleProps) {
  return (
    <RadixCollapsible.Root open={open} onOpenChange={onChange}>
      <div
        className={twMerge(
          'w-full p-2 pb-0 border-2 border-solid rounded-md border-uzh-grey-80',
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
        <RadixCollapsible.Trigger
          className={twMerge('w-full text-center', className?.trigger)}
        >
          {customTrigger ?? (
            <FontAwesomeIcon
              icon={open ? faChevronUp : faChevronDown}
              size="sm"
            />
          )}
        </RadixCollapsible.Trigger>
      </div>
    </RadixCollapsible.Root>
  )
}

export default Collapsible

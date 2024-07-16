import * as RadixTooltip from '@radix-ui/react-tooltip'
import React from 'react'
import { twMerge } from 'tailwind-merge'

// trigger is passed as child of the component
export interface TooltipProps {
  id?: string
  contentId?: string
  data?: {
    cy?: string
    test?: string
  }
  dataContent?: {
    cy?: string
    test?: string
  }
  tooltip: React.ReactNode | string
  delay?: number
  withIndicator?: boolean
  children: React.ReactNode
  className?: {
    override?: string
    tooltip?: string
    trigger?: string
    arrow?: string
  }
}

/**
 * This function returns a pre-styled Tooltip component based on the RadixUI tooltip component and the custom theme.
 *
 * @param id - The id of the tooltip.
 * @param contentId - The id of the tooltip content.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) of the content
 * @param tooltip - The content of the tooltip.
 * @param delay - The delay in milliseconds before the tooltip is shown.
 * @param withIndicator - Determines whether the tooltip should have a small indicator or not.
 * @param children - The child component that triggers the tooltip.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tooltip component
 */
export function Tooltip({
  id,
  contentId,
  data,
  dataContent,
  tooltip,
  delay = 350,
  withIndicator = true,
  children,
  className,
}: TooltipProps): React.ReactElement {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={delay ?? 1000}>
        <RadixTooltip.Trigger
          tabIndex={-1}
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          className={twMerge('[all:_unset]', className?.trigger)}
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          id={contentId}
          data-cy={dataContent?.cy}
          data-test={dataContent?.test}
          className={twMerge(
            className?.override,
            'rounded-md bg-gray-800 p-2 text-white',
            className?.tooltip
          )}
        >
          {tooltip}
          {withIndicator && <RadixTooltip.Arrow className={className?.arrow} />}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip

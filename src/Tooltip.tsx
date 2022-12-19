import * as RadixTooltip from '@radix-ui/react-tooltip'
import React from 'react'
import { twMerge } from 'tailwind-merge'

// trigger is passed as child of the component
export interface TooltipProps {
  id?: string
  contentId?: string
  data_cy?: string
  data_cyContent?: string
  tooltip: React.ReactNode | string
  delay?: number
  withIndicator?: boolean
  children: React.ReactNode
  className?: {
    tooltip?: string
    trigger?: string
    arrow?: string
  }
}

const defaultProps = {
  id: undefined,
  contentId: undefined,
  data_cy: undefined,
  data_cyContent: undefined,
  delay: 350,
  withIndicator: true,
  className: undefined,
}

/**
 * This function returns a pre-styled Tooltip component based on the RadixUI tooltip component and the custom theme.
 *
 * @param id - The id of the tooltip.
 * @param contentId - The id of the tooltip content.
 * @param data_cy - The data-cy attribute of the tooltip.
 * @param data_cyContent - The data-cy attribute of the tooltip content.
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
  data_cy,
  data_cyContent,
  tooltip,
  delay,
  withIndicator,
  children,
  className,
}: TooltipProps): React.ReactElement {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={delay || 1000}>
        <RadixTooltip.Trigger
          id={id}
          data-cy={data_cy}
          className={twMerge(
            '[all:_unset] !cursor-default',
            className?.trigger
          )}
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          id={contentId}
          data-cy={data_cyContent}
          className={twMerge(
            'p-2 text-white bg-gray-800 border rounded-md border-1 border-grey-20',
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

Tooltip.defaultProps = defaultProps
export default Tooltip

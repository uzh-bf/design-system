import * as RadixTooltip from '@radix-ui/react-tooltip'
import React from 'react'
import { twMerge } from 'tailwind-merge'

// trigger is passed as child of the component
export interface TooltipProps {
  tooltip: React.ReactNode | string
  delay?: number
  tooltipStyle?: string
  triggerStyle?: string
  arrowStyle?: string
  withArrow?: boolean
  children: React.ReactNode
}

const defaultProps = {
  delay: 350,
  tooltipStyle: '',
  triggerStyle: '',
  arrowStyle: '',
  withArrow: true,
}

export function Tooltip({
  tooltip,
  delay,
  tooltipStyle,
  triggerStyle,
  arrowStyle,
  withArrow,
  children,
}: TooltipProps): React.ReactElement {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={delay || 1000}>
        <RadixTooltip.Trigger className={twMerge('[all:_unset]', triggerStyle)}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          className={twMerge(
            'p-2 text-white bg-black border rounded-md opacity-80 border-1 border-grey-20',
            tooltipStyle
          )}
        >
          {tooltip}
          {withArrow && <RadixTooltip.Arrow className={arrowStyle} />}
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

Tooltip.defaultProps = defaultProps
export default Tooltip

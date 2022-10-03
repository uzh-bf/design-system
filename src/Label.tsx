import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixLabel from '@radix-ui/react-label'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Tooltip from './Tooltip'

export interface LabelProps {
  label: string
  tooltip?: string | React.ReactNode
  tooltipStyle?: string
  arrowStyle?: string
  showTooltipSymbol?: boolean
  tooltipSymbolSize?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const defaultProps = {
  tooltip: undefined,
  tooltipStyle: '',
  arrowStyle: '',
  showTooltipSymbol: false,
  tooltipSymbolSize: 'md',
  className: '',
}

export function Label({
  label,
  tooltip,
  tooltipStyle,
  arrowStyle,
  showTooltipSymbol,
  tooltipSymbolSize,
  className,
}: LabelProps): React.ReactElement {
  if (tooltip && !showTooltipSymbol) {
    return (
      <Tooltip
        tooltip={tooltip}
        tooltipStyle={tooltipStyle}
        arrowStyle={arrowStyle}
        withArrow={true}
      >
        <RadixLabel.Root className={twMerge(className, 'cursor-default')}>
          {label}
        </RadixLabel.Root>
      </Tooltip>
    )
  } else if (tooltip && showTooltipSymbol) {
    return (
      <div className={twMerge(className, 'w-max flex flex-row items-center')}>
        <RadixLabel.Root className="mr-2 cursor-default">
          {label}
        </RadixLabel.Root>
        <Tooltip
          tooltip={tooltip}
          tooltipStyle={tooltipStyle}
          arrowStyle={arrowStyle}
          withArrow={true}
          triggerStyle="h-full"
        >
          <FontAwesomeIcon
            icon={faQuestion}
            className={twMerge(
              tooltipSymbolSize === 'xl' && '!w-5 !h-5 !p-2 !mt-1',
              tooltipSymbolSize === 'lg' && '!w-4 !h-4 !p-1.5 !mt-1',
              tooltipSymbolSize === 'sm' && '!w-2 !h-2 !p-1 !mt-1',
              'w-3 h-3 p-1 mt-1 font-bold text-white rounded-full bg-uzh-blue-100 border border-solid border-white'
            )}
          />
        </Tooltip>
      </div>
    )
  } else {
    return (
      <RadixLabel.Root className={twMerge(className, 'cursor-default')}>
        {label}
      </RadixLabel.Root>
    )
  }
}

Label.defaultProps = defaultProps
export default Label

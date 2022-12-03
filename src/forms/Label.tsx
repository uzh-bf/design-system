import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixLabel from '@radix-ui/react-label'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from '../ThemeProvider'
import Tooltip from '../Tooltip'

export interface LabelProps {
  forId?: string
  label: string
  required?: boolean
  tooltip?: string | React.ReactNode
  showTooltipSymbol?: boolean
  tooltipSymbolSize?: 'sm' | 'md' | 'lg' | 'xl'
  className?: {
    root?: string
    tooltip?: string
    arrow?: string
  }
}

const defaultProps = {
  forId: undefined,
  required: false,
  tooltip: undefined,
  showTooltipSymbol: false,
  tooltipSymbolSize: 'md',
  className: undefined,
}

export function Label({
  forId,
  label,
  required,
  tooltip,
  showTooltipSymbol,
  tooltipSymbolSize,
  className,
}: LabelProps): React.ReactElement {
  const theme = useContext(ThemeContext)

  if (tooltip && !showTooltipSymbol) {
    return (
      <Tooltip
        tooltip={tooltip}
        className={{
          tooltip: className?.tooltip,
          arrow: className?.arrow,
        }}
        withArrow={true}
      >
        <div className="flex flex-row">
          <RadixLabel.Root
            htmlFor={forId}
            className={twMerge(className?.root, 'cursor-default')}
          >
            {label}
          </RadixLabel.Root>
          {required && <div className="mr-2 ml-0.5 mb-1 text-red-600">*</div>}
        </div>
      </Tooltip>
    )
  } else if (tooltip && showTooltipSymbol) {
    return (
      <div
        className={twMerge(className?.root, 'w-max flex flex-row items-center')}
      >
        <RadixLabel.Root
          htmlFor={forId}
          className={twMerge('mr-2 cursor-default', required && 'mr-0')}
        >
          {label}
        </RadixLabel.Root>
        {required && <div className="mr-2 ml-0.5 mb-1 text-red-600">*</div>}
        <Tooltip
          tooltip={tooltip}
          className={{
            tooltip: className?.tooltip,
            arrow: className?.arrow,
            trigger: 'h-full',
          }}
          withArrow={true}
        >
          <FontAwesomeIcon
            icon={faQuestion}
            className={twMerge(
              tooltipSymbolSize === 'xl' && '!w-5 !h-5 !p-2 !mt-1',
              tooltipSymbolSize === 'lg' && '!w-4 !h-4 !p-1.5 !mt-1',
              tooltipSymbolSize === 'sm' && '!w-2 !h-2 !p-1 !mt-1',
              'w-3 h-3 p-1 mt-1 text-white rounded-full border border-solid border-white',
              theme.primaryBgDark
            )}
          />
        </Tooltip>
      </div>
    )
  } else {
    return (
      <div className="flex flex-row">
        <RadixLabel.Root
          htmlFor={forId}
          className={twMerge(className?.root, 'cursor-default')}
        >
          {label}
        </RadixLabel.Root>
        {required && <div className="mr-2 ml-0.5 mb-1 text-red-600">*</div>}
      </div>
    )
  }
}

Label.defaultProps = defaultProps
export default Label

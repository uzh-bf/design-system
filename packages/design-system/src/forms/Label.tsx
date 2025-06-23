import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as RadixLabel from '@radix-ui/react-label'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Tooltip from '../Tooltip'

export interface LabelProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  forId?: string
  label: string
  required?: boolean
  tooltip?: string | React.ReactNode
  showTooltipSymbol?: boolean
  tooltipSymbolSize?: 'sm' | 'md' | 'lg' | 'xl'
  className?: {
    root?: string
    tooltip?: string
    tooltipSymbol?: string
    arrow?: string
  }
}

/**
 * This function returns a label component based on the RadixUI label.
 *
 * @param id - The id of the label.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param forId - The id of the element that the label is for.
 * @param label - The text displayed as label.
 * @param required - Indicate whether the field is required or not.
 * @param tooltip - The optional tooltip is shown on hover over the label.
 * @param showTooltipSymbol - Indicate whether the tooltip symbol should be shown or not.
 * @param tooltipSymbolSize - The size of the tooltip symbol.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Label component with optional tooltip and required symbol.
 */
export function Label({
  id,
  data,
  forId,
  label,
  required = false,
  tooltip,
  showTooltipSymbol = false,
  tooltipSymbolSize = 'md',
  className,
}: LabelProps): React.ReactElement {
  if (tooltip && !showTooltipSymbol) {
    return (
      <Tooltip
        tooltip={tooltip}
        className={{
          tooltip: className?.tooltip,
          arrow: className?.arrow,
        }}
      >
        <div className="flex flex-row">
          <RadixLabel.Root
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            htmlFor={forId}
            className={twMerge('cursor-default', className?.root)}
          >
            {label}
          </RadixLabel.Root>
          {required && <div className="mr-2 mb-1 ml-0.5 text-red-600">*</div>}
        </div>
      </Tooltip>
    )
  } else if (tooltip && showTooltipSymbol) {
    return (
      <div
        className={twMerge('flex w-max flex-row items-center', className?.root)}
      >
        <RadixLabel.Root
          id={id}
          data-cy={data?.cy}
          data-test={data?.test}
          htmlFor={forId}
          className={twMerge('mr-2 cursor-default', required && 'mr-0')}
        >
          {label}
        </RadixLabel.Root>
        {required && <div className="mr-2 mb-1 ml-0.5 text-red-600">*</div>}
        <Tooltip
          tooltip={tooltip}
          className={{
            tooltip: className?.tooltip,
            arrow: className?.arrow,
            trigger: 'h-full',
          }}
        >
          <FontAwesomeIcon
            icon={faQuestion}
            className={twMerge(
              'bg-primary-60 mt-1 h-3.5! w-3.5! rounded-full border border-solid border-white p-1! text-sm text-white',
              tooltipSymbolSize === 'xl' && 'mt-1! h-5! w-5! p-2!',
              tooltipSymbolSize === 'lg' && 'mt-1! h-4! w-4! p-1.5!',
              tooltipSymbolSize === 'sm' && 'mt-1! h-2! w-2! p-1!',
              className?.tooltipSymbol
            )}
          />
        </Tooltip>
      </div>
    )
  } else {
    return (
      <RadixLabel.Root
        id={id}
        data-cy={data?.cy}
        data-test={data?.test}
        htmlFor={forId}
        className={twMerge(
          'flex cursor-default flex-row items-center',
          className?.root
        )}
      >
        {label}
        {required && <div className="mr-2 mb-1 ml-0.5 text-red-600">*</div>}
      </RadixLabel.Root>
    )
  }
}

export default Label

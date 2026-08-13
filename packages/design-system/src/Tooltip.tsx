'use client'

import React from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

// trigger is passed as child of the component
export interface TooltipProps {
  id?: string
  tooltip: React.ReactNode | string
  ariaLabel?: string
  delay?: number
  asChild?: boolean
  children: React.ReactNode
  data?: {
    cy?: string
    test?: string
  }
  dataContent?: {
    cy?: string
    test?: string
  }
  className?: {
    tooltip?: string
    trigger?: string
    arrow?: string
  }
}

/**
 * This function returns a pre-styled Tooltip component based on the RadixUI tooltip component and the custom theme.
 *
 * @param id - The id of the tooltip.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) of the content
 * @param tooltip - The content of the tooltip.
 * @param delay - The delay in milliseconds before the tooltip is shown.
 * @param asChild - Render the child as the trigger instead of wrapping it in the default trigger button. Use this when the child is already an interactive element, to avoid nesting a button inside a button. Note that Radix concatenates className.trigger with the child's own className instead of merging them through twMerge, so conflicting utilities are resolved by stylesheet order rather than by the last class written.
 * @param children - The child component that triggers the tooltip.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tooltip component
 */
export function Tooltip({
  id,
  data,
  dataContent,
  tooltip,
  ariaLabel,
  delay = 350,
  asChild = false,
  children,
  className,
}: TooltipProps): React.ReactElement {
  return (
    <TooltipProvider>
      <ShadcnTooltip delayDuration={delay ?? 1000}>
        <TooltipTrigger
          asChild={asChild}
          id={id}
          aria-label={ariaLabel}
          data-cy={data?.cy}
          data-test={data?.test}
          className={twMerge('text-start', className?.trigger)}
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          data-cy={dataContent?.cy}
          data-test={dataContent?.test}
          className={twMerge('max-w-120', className?.tooltip)}
        >
          {tooltip}
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  )
}

export default Tooltip

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface StepProps {
  title: string
  description?: string
  [x: string]: any
}

export interface WorkflowProps {
  items: StepProps[]
  onClick: (item: StepProps) => void
  activeIx: number
  twStyles?: {
    bgHover: string
    bgActive: string
    bgPast: string
  }
  className?: {
    root?: string
    item?: string
    active?: string
    past?: string
    title?: string
    description?: string
  }
}

/**
 * This function returns a pre-styled Workflow component. Theme-based styling is not available for this component at the moment, use the twStyles or className objects instead to override default styling.
 *
 * @param items - The array of steps that should be displayed in the workflow.
 * @param onClick - The function that is called when a step is clicked. The step object is passed as an argument.
 * @param activeIx - The index of the active step. State management is not handled by this component.
 * @param twStyles - The optional twStyles object allows you to override the default styling.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Workflow component
 */
export function Workflow({
  items,
  onClick,
  activeIx,
  twStyles = {
    bgHover: 'hover:bg-uzh-blue-20 hover:after:!border-l-uzh-blue-20',
    bgActive: 'bg-uzh-blue-80 after:border-l-uzh-blue-80',
    bgPast: 'bg-uzh-blue-20 after:border-l-uzh-blue-20',
  },
  className,
}: WorkflowProps) {
  const hasDescription = items.reduce(
    (acc, item) => acc || Boolean(item.description),
    false
  )

  return (
    <div
      className={twMerge(
        'flex w-full flex-row',
        hasDescription ? 'h-[50px]' : 'h-[34px]',
        className?.root
      )}
    >
      {items.map((item, ix) => (
        <div
          key={`${item.title}-${ix}`}
          className={twMerge(
            'relative flex items-center justify-center bg-uzh-grey-40 text-center',
            'mr-1 cursor-pointer select-none first:before:!border-none last:mr-0 after:last:!border-none',
            'after:z-10 after:border after:border-r-0 after:border-solid after:border-y-transparent',
            "before:absolute before:left-0 before:right-auto before:z-0 before:content-['']",
            'before:border before:border-r-0 before:border-solid before:border-y-transparent',
            "before:border-l-white after:absolute after:border-l-uzh-grey-40 after:content-['']",
            twStyles.bgHover,
            hasDescription
              ? 'h-[50px] pl-[25px] before:border-y-[25px] before:border-l-[25px] after:right-[-25px] after:border-y-[25px] after:border-l-[25px] first:pl-0 last:pl-0'
              : 'h-[34px] pl-[17px] before:border-y-[17px] before:border-l-[17px] after:right-[-17px] after:border-y-[17px] after:border-l-[17px] first:pl-0 last:pl-0',
            ix === activeIx &&
              twMerge(
                twStyles.bgActive,
                'text-white hover:text-black',
                className?.active
              ),
            ix < activeIx &&
              twMerge(twStyles.bgPast, 'text-gray-500', className?.past),
            className?.item
          )}
          onClick={() => onClick(item)}
          style={{
            width: `${100 / items.length}%`,
          }}
        >
          <div className="flex flex-col">
            <div
              className={twMerge(
                'leading-5',
                ix === activeIx && 'font-bold',
                className?.title
              )}
            >
              {item.title}
            </div>
            {/* // TODO: introduce line-clamp-1 here once support is sufficient */}
            <div className={twMerge('text-sm', className?.description)}>
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Workflow

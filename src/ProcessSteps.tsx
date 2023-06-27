import React from 'react'
import { twMerge } from 'tailwind-merge'

interface StepItem {
  title: string
  description?: string
  [x: string]: any
}

export interface ProcessStepsProps {
  items: StepItem[]
  onClick: (item: StepItem) => void
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

export function ProcessSteps({
  items,
  onClick,
  activeIx,
  twStyles = {
    bgHover: 'hover:bg-uzh-blue-20 hover:after:!border-l-uzh-blue-20',
    bgActive: 'bg-uzh-blue-80 after:border-l-uzh-blue-80',
    bgPast: 'bg-uzh-blue-20 after:border-l-uzh-blue-20',
  },
  className,
}: ProcessStepsProps) {
  const hasDescription = items.reduce(
    (acc, item) => acc || Boolean(item.description),
    false
  )

  return (
    <div
      className={twMerge(
        'flex flex-row w-full',
        hasDescription ? 'h-[50px]' : 'h-[34px]',
        className?.root
      )}
    >
      {items.map((item, ix) => (
        <div
          key={`${item.title}-${ix}`}
          className={twMerge(
            'relative text-center flex items-center justify-center bg-uzh-grey-40 step',
            'mr-1 last:mr-0 cursor-pointer select-none first:before:!border-none after:last:!border-none',
            'after:z-10 after:border after:border-solid after:border-y-transparent after:border-r-0',
            "before:content-[''] before:absolute before:z-0 before:right-auto before:left-0",
            'before:border before:border-solid before:border-r-0 before:border-y-transparent',
            "after:content-[''] after:absolute after:border-l-uzh-grey-40 before:border-l-white",
            twStyles.bgHover,
            hasDescription
              ? 'pl-[25px] first:pl-0 last:pl-0 h-[50px] after:right-[-25px] after:border-y-[25px] after:border-l-[25px] before:border-y-[25px] before:border-l-[25px]'
              : 'pl-[17px] first:pl-0 last:pl-0 h-[34px] after:right-[-17px] after:border-y-[17px] after:border-l-[17px] before:border-y-[17px] before:border-l-[17px]',
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

export default ProcessSteps

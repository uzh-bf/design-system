import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

interface StepItem {
  title: string
  description?: string
  [x: string]: any
}

export interface ProcessStepsProps {
  items: StepItem[]
  onClick: (item: StepItem) => void
  activeIx: number
  className?: {
    root?: string
    item?: string
    active?: string
    title?: string
    description?: string
  }
}

export function ProcessSteps({
  items,
  onClick,
  activeIx,
  className,
}: ProcessStepsProps) {
  const theme = useContext(ThemeContext)
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
          // TODO: properly switch to either theme or hardcoded color implementation for consistency
          className={twMerge(
            'relative text-center flex items-center justify-center bg-uzh-grey-40 step',
            'mr-1 last:mr-0 cursor-pointer select-none first:before:!border-none after:last:!border-none',
            "hover:after:!border-l-uzh-blue-20 after:content-[''] after:absolute",
            'after:z-10 after:border after:border-solid after:border-y-transparent after:border-r-0',
            "before:content-[''] before:absolute before:z-0 before:right-auto before:left-0",
            'before:border before:border-solid before:border-r-0 before:border-y-transparent',
            'after:border-l-uzh-grey-40 before:border-l-white',
            theme.primaryBgHover,
            ix === activeIx &&
              twMerge(
                theme.primaryBgDark,
                'text-white hover:text-black after:border-l-uzh-blue-80',
                className?.active
              ),
            ix < activeIx &&
              twMerge(theme.primaryBg, 'after:border-l-uzh-blue-20'),
            hasDescription
              ? 'h-[50px] after:right-[-26px] after:border-y-[25px] after:border-l-[25px] before:border-y-[25px] before:border-l-[25px]'
              : 'h-[34px] after:right-[-17px] after:border-y-[17px] after:border-l-[17px] before:border-y-[17px] before:border-l-[17px]',
            theme.primaryBgHover,
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

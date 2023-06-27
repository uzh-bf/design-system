import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from './ThemeProvider'

interface StepItem {
  title: string
  description?: string
  [x: string]: any
}

interface ProcessStepsProps {
  items: StepItem[]
  onClick: (item: StepItem) => void
  activeIx: number
  color?: string
  activeColor?: string
  pastColor?: string
  hoverColor?: string
  className?: {
    root?: string
    item?: string
    active?: string
    title?: string
    description?: string
  }
}

function ProcessSteps({
  items,
  onClick,
  activeIx,
  color = '#ddd',
  activeColor = '#0028A5',
  pastColor = '#99A9DB',
  hoverColor = '#99A9DB',
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
          className={twMerge(
            'relative text-center flex items-center justify-center step',
            `mr-1 last:mr-0 cursor-pointer select-none w-[${
              100 / items.length
            }%]`,
            hasDescription ? 'h-[50px]' : 'h-[34px]',
            ix === activeIx && 'text-white hover:text-black',
            ix === activeIx && className?.active,
            theme.primaryBgHover,
            className?.item
          )}
          onClick={() => onClick(item)}
        >
          <style>{`
            .step {
              background-color: ${
                ix === activeIx
                  ? activeColor
                  : ix < activeIx
                  ? pastColor
                  : color
              };
            }

            .step:hover {
              background-color: ${hoverColor};
            }

            .step:after,
            .step:before {
              content: '';
              position: absolute;
              right: ${hasDescription ? '-25px' : '-16px'};
              border-top: ${hasDescription ? '25px' : '16px'} solid transparent;
              border-bottom: ${hasDescription ? '25px' : '16px'} solid
                transparent;
              border-left: ${hasDescription ? '25px' : '16px'} solid
                ${
                  ix === activeIx
                    ? activeColor
                    : ix < activeIx
                    ? pastColor
                    : color
                };
              z-index: 2;
            }

            .step:hover:after {
              border-left: ${hasDescription ? '25px' : '16px'} solid
                ${hoverColor};
              z-index: 2;
            }

            .step:before {
              right: auto;
              left: 0;
              border-left: ${hasDescription ? '25px' : '16px'} solid #fff;
              z-index: 0;
            }

            .step:first-child:before {
              border: none;
            }
            .step:last-child:after {
              border: none;
            }
          `}</style>
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

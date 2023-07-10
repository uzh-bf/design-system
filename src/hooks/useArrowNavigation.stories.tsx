import React from 'react'
import { twMerge } from 'tailwind-merge'
import useArrowNavigation from './useArrowNavigation'

export const Default = () => {
  const [arrowPressed, setArrowPressed] = React.useState<string | undefined>(
    undefined
  )

  useArrowNavigation({
    onArrowLeft: () => setArrowPressed('Arrow Left'),
    onArrowRight: () => setArrowPressed('Arrow Right'),
    onArrowUp: () => setArrowPressed('Arrow Up'),
    onArrowDown: () => setArrowPressed('Arrow Down'),
  })

  return (
    <div>
      <div className="mb-3">
        Please first click into this area of the page and then press the
        different arrow keys on the keyboard to trigger the corresponding
        function.
      </div>
      <div className="flex flex-row gap-2">
        <div
          className={twMerge(
            'rounded border border-solid p-1',
            arrowPressed === 'Arrow Left' && 'bg-primary-20'
          )}
        >
          Arrow Left
        </div>
        <div
          className={twMerge(
            'rounded border border-solid p-1',
            arrowPressed === 'Arrow Right' && 'bg-primary-20'
          )}
        >
          Arrow Right
        </div>
        <div
          className={twMerge(
            'rounded border border-solid p-1',
            arrowPressed === 'Arrow Up' && 'bg-primary-20'
          )}
        >
          Arrow Up
        </div>
        <div
          className={twMerge(
            'rounded border border-solid p-1',
            arrowPressed === 'Arrow Down' && 'bg-primary-20'
          )}
        >
          Arrow Down
        </div>
      </div>
    </div>
  )
}

import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { ThemeContext } from '../ThemeProvider'
import useArrowNavigation from './useArrowNavigation'

export const Default = () => {
  const theme = useContext(ThemeContext)
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
            'p-1 border border-solid rounded',
            arrowPressed === 'Arrow Left' && theme.primaryBg
          )}
        >
          Arrow Left
        </div>
        <div
          className={twMerge(
            'p-1 border border-solid rounded',
            arrowPressed === 'Arrow Right' && theme.primaryBg
          )}
        >
          Arrow Right
        </div>
        <div
          className={twMerge(
            'p-1 border border-solid rounded',
            arrowPressed === 'Arrow Up' && theme.primaryBg
          )}
        >
          Arrow Up
        </div>
        <div
          className={twMerge(
            'p-1 border border-solid rounded',
            arrowPressed === 'Arrow Down' && theme.primaryBg
          )}
        >
          Arrow Down
        </div>
      </div>
    </div>
  )
}

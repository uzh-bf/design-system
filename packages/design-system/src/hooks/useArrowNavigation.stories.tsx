import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import TextField from '../forms/TextField'
import useArrowNavigation from './useArrowNavigation'

export const Default = () => {
  const [arrowPressed, setArrowPressed] = React.useState<string | undefined>(
    undefined
  )
  const [value, setValue] = useState('')

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
      <div className="mt-4 italic">
        Note that when using the arrow navigation, all arrow keys that are used
        for a custom functionality cannot be used in other fields anymore. E.g.
        in the current example where all arrow keys are used with key listeners,
        navigating through the input field with the corresponding keys will not
        be possible anymore.
      </div>
      <div className="mt-2 flex flex-row">
        <div className="my-auto w-32">Generic Input: </div>
        <TextField value={value} onChange={(newValue) => setValue(newValue)} />
      </div>
    </div>
  )
}

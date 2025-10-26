'use client'

import { useCallback, useEffect } from 'react'

export interface useArrowNavigationProps {
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
}

/**
 * Custom hook to handle arrow key navigation.
 *
 * @param onArrowLeft - Callback for left arrow key press
 * @param onArrowRight - Callback for right arrow key press
 * @param onArrowUp - Callback for up arrow key press
 * @param onArrowDown - Callback for down arrow key press
 */
export function useArrowNavigation({
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onArrowDown,
}: useArrowNavigationProps) {
  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event
      if (key === 'ArrowLeft' && onArrowLeft) {
        event.preventDefault()
        onArrowLeft()
      } else if (key === 'ArrowRight' && onArrowRight) {
        event.preventDefault()
        onArrowRight()
      } else if (key === 'ArrowUp' && onArrowUp) {
        event.preventDefault()
        onArrowUp()
      } else if (key === 'ArrowDown' && onArrowDown) {
        event.preventDefault()
        onArrowDown()
      }
    },
    [onArrowLeft, onArrowRight, onArrowUp, onArrowDown]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress)
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])
}

export default useArrowNavigation

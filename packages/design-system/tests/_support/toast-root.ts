import { useEffect, useState } from 'react'

/** Restores the root attributes temporarily changed by a synthetic Toast story. */
export function useRestoreDocumentRoot() {
  const [snapshot] = useState(() => {
    if (typeof document === 'undefined') return null

    const root = document.documentElement
    return {
      theme: root.getAttribute('data-theme'),
      dark: root.classList.contains('dark'),
      nextMode: root.getAttribute('data-next-mode'),
    }
  })

  useEffect(() => {
    if (!snapshot) return

    return () => {
      const root = document.documentElement
      if (snapshot.theme === null) {
        root.removeAttribute('data-theme')
      } else {
        root.setAttribute('data-theme', snapshot.theme)
      }
      root.classList.toggle('dark', snapshot.dark)
      if (snapshot.nextMode === null) {
        root.removeAttribute('data-next-mode')
      } else {
        root.setAttribute('data-next-mode', snapshot.nextMode)
      }
    }
  }, [snapshot])
}

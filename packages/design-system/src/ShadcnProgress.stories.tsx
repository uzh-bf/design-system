'use client'

import * as React from 'react'
import { ShadcnProgress } from './ShadcnProgress'

export const Default = () => {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <ShadcnProgress value={progress} className="w-[60%]" />
}

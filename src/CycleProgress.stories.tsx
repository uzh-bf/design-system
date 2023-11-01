import React from 'react'
import CycleProgress from './CycleProgress'

export function Default() {
  return <CycleProgress percentage={60}>60</CycleProgress>
}

export function Small() {
  return (
    <CycleProgress percentage={60} size="sm" strokeWidthRem={0.2}>
      60
    </CycleProgress>
  )
}

export function Colored() {
  return (
    <CycleProgress percentage={60} color="#FF0000">
      60
    </CycleProgress>
  )
}

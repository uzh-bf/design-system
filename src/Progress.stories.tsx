import React from 'react'
import Progress from './Progress'

export const Default = () => {
  return <Progress value={10} max={100} formatter={(val) => val} />
}

export const Zero = () => {
  return <Progress value={0} max={100} formatter={(val) => val} />
}

export const Full = () => {
  return <Progress value={100} max={100} formatter={(val) => val} />
}

export const Formatted = () => {
  return <Progress value={50} max={100} formatter={(val) => `${val}%`} />
}

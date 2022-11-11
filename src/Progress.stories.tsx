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

export const Styled = () => {
  return (
    <Progress
      value={30}
      max={100}
      className="h-10 font-bold"
      indicatorClassName="bg-blue-700 h-10"
      formatter={(val) => val}
    />
  )
}

export const Nonlinear = () => {
  return <Progress nonLinear value={6} max={20} formatter={(val) => val} />
}

export const NonlinearWithOffset = () => {
  const [value, setValue] = React.useState(0)
  return (
    <Progress
      nonLinear
      displayOffset={3}
      value={value}
      max={20}
      formatter={(val) => val}
      onItemClick={(val) => setValue(val)}
    />
  )
}

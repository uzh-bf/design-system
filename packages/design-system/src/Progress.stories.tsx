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
      className={{ root: 'h-10 font-bold', indicator: 'h-10 bg-blue-700' }}
      formatter={(val) => val}
    />
  )
}

export const Offset = () => {
  return <Progress offset={50} value={60} max={100} formatter={(val) => val} />
}

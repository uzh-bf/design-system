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

export const Multiple = () => {
  return (
    <div className="flex flex-col gap-4">
      <Progress
        value={[30, 70]}
        max={100}
        formatter={(val) => val}
        className={{ indicator: ['bg-blue-400', 'bg-red-400'] }}
      />
      <Progress
        value={[70, 20]}
        max={100}
        formatter={() => null}
        className={{
          background: 'bg-gray-300',
          indicator: [
            'rounded-r-none bg-green-600',
            'rounded-r-none bg-gray-300',
          ],
        }}
      />
      <Progress
        noMinWidth
        value={[70, 0]}
        max={100}
        formatter={() => null}
        className={{
          background: 'bg-gray-300',
          indicator: [
            'min-w-0 rounded-r-none bg-green-600',
            'min-w-0 rounded-r-none bg-gray-300',
          ],
        }}
      />
      <Progress
        value={[85, 60, 30, 10]}
        max={100}
        formatter={() => null}
        className={{
          background: 'bg-gray-300',
          indicator: [
            'rounded-r-none bg-green-600',
            'rounded-r-none bg-orange-300',
            'rounded-r-none bg-blue-600',
            'rounded-r-none bg-red-600',
          ],
        }}
      />
    </div>
  )
}

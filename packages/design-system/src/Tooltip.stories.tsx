import Button from './Button'
import Tooltip from './Tooltip'

export const Default = () => {
  return (
    <Tooltip tooltip="Content Tooltip">
      <div className="border border-solid border-uzh-grey-100 p-2 shadow-md">
        Hover Me!
      </div>
    </Tooltip>
  )
}

export const Styled = () => {
  return (
    <Tooltip
      className={{ tooltip: 'bg-red-400', arrow: 'fill-red-400' }}
      tooltip={
        <div className="font-bold italic text-black">Styled Tooltip</div>
      }
      withIndicator={true}
    >
      <Button
        className={{
          root: 'border border-solid border-uzh-grey-100 p-2 shadow-md',
        }}
      >
        Hover Me! and I can still be a Button
      </Button>
    </Tooltip>
  )
}

export const Delay = () => {
  return (
    <Tooltip tooltip="Content Tooltip" delay={3000}>
      <div className="border border-solid border-uzh-grey-100 p-2 shadow-md">
        Delayed Tooltip...
      </div>
    </Tooltip>
  )
}

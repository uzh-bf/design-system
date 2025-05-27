import Button from './Button'
import TooltipLegacy from './TooltipLegacy'

export const Default = () => {
  return (
    <TooltipLegacy tooltip="Content Tooltip">
      <div className="border border-solid border-uzh-grey-100 p-2 shadow-md">
        Hover Me!
      </div>
    </TooltipLegacy>
  )
}

export const Styled = () => {
  return (
    <TooltipLegacy
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
    </TooltipLegacy>
  )
}

export const Delay = () => {
  return (
    <TooltipLegacy tooltip="Content Tooltip" delay={3000}>
      <div className="border border-solid border-uzh-grey-100 p-2 shadow-md">
        Delayed Tooltip...
      </div>
    </TooltipLegacy>
  )
}

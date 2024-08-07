import Label from './Label'

export const Default = () => {
  return <Label label="Labels cannot be selected with double click" />
}

export const Required = () => {
  return <Label label="Required label" required />
}

export const RequiredTooltip = () => {
  return (
    <Label
      label="Required label"
      tooltip="Tooltip of a required label with required symbol"
      showTooltipSymbol
      required
    />
  )
}

export const Styled = () => {
  return (
    <Label
      label="Labels"
      className={{
        root: 'rounded-md border border-solid border-uzh-grey-100 bg-uzh-blue-20 p-2',
      }}
    />
  )
}

export const Tooltip = () => {
  return (
    <Label
      label="Hover this Label!"
      tooltip="Tooltip Content"
      className={{ root: 'rounded-md bg-uzh-blue-20 p-2' }}
    />
  )
}

export const TooltipStyled = () => {
  return (
    <Label
      label="Label with styled Tooltip"
      tooltip="Tooltip Content"
      className={{
        root: 'rounded-md bg-uzh-blue-20 p-2',
        arrow: 'opacity-0',
        tooltip: 'bg-uzh-red-100 font-bold italic text-black',
      }}
    />
  )
}

export const TooltipSymbol = () => {
  return (
    <div className="flex flex-col gap-4">
      <Label
        label="Label with small styled Tooltip"
        tooltip="Tooltip Content"
        className={{
          root: 'rounded-md bg-uzh-blue-20 p-2',
          arrow: 'opacity-0',
          tooltip: 'bg-uzh-red-100 font-bold italic text-black',
        }}
        showTooltipSymbol={true}
        tooltipSymbolSize="sm"
      />
      <Label
        label="Default Label with styled Tooltip"
        tooltip="Tooltip Content"
        className={{
          root: 'rounded-md bg-uzh-blue-20 p-2',
          arrow: 'opacity-0',
          tooltip: 'bg-uzh-red-100 font-bold italic text-black',
        }}
        showTooltipSymbol={true}
      />
      <Label
        label="Label with large styled Tooltip"
        tooltip="Tooltip Content"
        className={{
          root: 'rounded-md bg-uzh-blue-20 p-2',
          arrow: 'fill-uzh-blue-100',
          tooltip: 'bg-uzh-blue-100 font-bold italic',
        }}
        showTooltipSymbol={true}
        tooltipSymbolSize="lg"
      />
      <Label
        label="Label with large Tooltip"
        tooltip="Tooltip Content"
        className={{ root: 'rounded-md bg-uzh-blue-20 p-2' }}
        showTooltipSymbol={true}
        tooltipSymbolSize="xl"
      />
    </div>
  )
}

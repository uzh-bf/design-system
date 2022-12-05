import React from 'react'
import Label from './Label'

export const Default = () => {
  return <Label label="Labels cannot be selected with double click" />
}

export const Styled = () => {
  return (
    <Label
      label="Labels"
      className={{
        root: 'p-2 border border-solid rounded-md border-uzh-grey-100 bg-uzh-blue-20',
      }}
    />
  )
}

export const Tooltip = () => {
  return (
    <Label
      label="Hover this Label!"
      tooltip="Tooltip Content"
      className={{ root: 'p-2 rounded-md bg-uzh-blue-20' }}
    />
  )
}

export const TooltipStyled = () => {
  return (
    <Label
      label="Label with styled Tooltip"
      tooltip="Tooltip Content"
      className={{
        root: 'p-2 rounded-md bg-uzh-blue-20',
        arrow: 'opacity-0',
        tooltip: 'bg-uzh-red-100 font-bold text-black italic',
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
          root: 'p-2 rounded-md bg-uzh-blue-20',
          arrow: 'opacity-0',
          tooltip: 'bg-uzh-red-100 font-bold text-black italic',
        }}
        showTooltipSymbol={true}
        tooltipSymbolSize="sm"
      />
      <Label
        label="Default Label with styled Tooltip"
        tooltip="Tooltip Content"
        className={{
          root: 'p-2 rounded-md bg-uzh-blue-20',
          arrow: 'opacity-0',
          tooltip: 'bg-uzh-red-100 font-bold text-black italic',
        }}
        showTooltipSymbol={true}
      />
      <Label
        label="Label with large styled Tooltip"
        tooltip="Tooltip Content"
        className={{
          root: 'p-2 rounded-md bg-uzh-blue-20',
          arrow: 'fill-uzh-blue-100',
          tooltip: 'bg-uzh-blue-100 font-bold italic',
        }}
        showTooltipSymbol={true}
        tooltipSymbolSize="lg"
      />
      <Label
        label="Label with large Tooltip"
        tooltip="Tooltip Content"
        className={{ root: 'p-2 rounded-md bg-uzh-blue-20' }}
        showTooltipSymbol={true}
        tooltipSymbolSize="xl"
      />
    </div>
  )
}

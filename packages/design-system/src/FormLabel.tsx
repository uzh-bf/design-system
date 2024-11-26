import { twMerge } from 'tailwind-merge'
import { Label } from './forms/Label'

export interface FormLabelProps {
  id?: string
  required: boolean
  label: string
  labelType: 'small' | 'large'
  className?: {
    label?: string
    tooltip?: string
  }
  tooltip?: string | React.ReactNode
}

export function FormLabel({
  id,
  required,
  label,
  labelType = 'small',
  className,
  tooltip,
}: FormLabelProps) {
  return (
    <Label
      forId={id}
      required={required}
      label={label}
      className={{
        root: twMerge(
          'my-auto mr-2 min-w-max font-bold',
          labelType === 'small' && '-mb-0.5 mt-1 leading-6 text-gray-600',
          className?.label
        ),
        tooltip: twMerge(
          'max-w-[30rem] text-sm font-normal',
          className?.tooltip
        ),
        tooltipSymbol: twMerge(labelType === 'small' && 'h-2 w-2'),
      }}
      tooltip={tooltip}
      showTooltipSymbol={typeof tooltip !== 'undefined'}
    />
  )
}

export default FormLabel

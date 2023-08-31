import { ErrorMessage, Field, useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface PinFieldProps {
  id?: string
  name: string
  required?: boolean
  label?: string
  labelType?: 'small' | 'normal'
  tooltip?: string
  className?: {
    override?: string
    root?: string
    field?: string
    label?: string
    error?: string
    tooltip?: string
  }
  data?: {
    cy?: string
    test?: string
  }
}

export function PinField({
  id,
  name,
  required = false,
  label,
  labelType = 'normal',
  tooltip,
  className,
  data,
}: PinFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <div className={className?.root}>
      {label && (
        <Label
          forId={id}
          required={required}
          label={label}
          className={{
            root: twMerge(
              'my-auto mr-2 min-w-max font-bold',
              labelType === 'small' &&
                'mt-1 text-sm font-normal leading-6 text-gray-600',
              className?.label
            ),
            tooltip: twMerge('text-sm font-normal', className?.tooltip),
            tooltipSymbol: twMerge(labelType === 'small' && 'h-2 w-2'),
          }}
          tooltip={tooltip}
          showTooltipSymbol={typeof tooltip !== 'undefined'}
        />
      )}
      <Field
        name={name}
        type="text"
        data-cy={data?.cy}
        data-test={data?.test}
        placeholder="### ### ###"
        className={twMerge(
          className?.override,
          'mb-2 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20 bg-opacity-50 focus:border-primary-40',
          meta.error && meta.touched && 'mb-0 border-red-400 bg-red-50',
          className?.field
        )}
        maxLength={11}
        onPaste={(e: any) => {
          e.preventDefault()
          const paste = e.clipboardData?.getData('text')
          if (
            typeof paste === 'string' &&
            paste.length === 9 &&
            paste.match(/^[0-9]{9}$/g)
          ) {
            helpers.setValue(
              `${paste.slice(0, 3)} ${paste.slice(3, 6)} ${paste.slice(6, 9)}`
            )
          } else if (
            typeof paste === 'string' &&
            paste.length === 11 &&
            paste.match(/^[0-9]{3} [0-9]{3} [0-9]{3}$/g)
          ) {
            helpers.setValue(paste)
          }
        }}
        onChange={(e: any) => {
          // regex magic to only allow numerical pins in the format ### ### ###
          const regexToMatch =
            /([0-9]{3} [0-9]{3} [0-9]{0,3})|([0-9]{3} [0-9]{3}[ ]{0,1})|([0-9]{3} [0-9]{0,3})|([0-9]{3}[ ]{0,1})|([0-9]{0,3})/g
          const valueMatched = e.target.value.match(regexToMatch)[0]

          // only add a whitespace after a block of 3 numbers if the user is typing - otherwise deletions are not possible
          if (
            (valueMatched.match(/^[0-9]{3}$/g) &&
              field.value.match(/^[0-9]{2}$/g)) ||
            (valueMatched.match(/^[0-9]{3} [0-9]{3}$/g) &&
              field.value.match(/^[0-9]{3} [0-9]{2}$/g))
          ) {
            helpers.setValue(valueMatched + ' ')
          } else {
            helpers.setValue(valueMatched)
          }
        }}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={twMerge('text-sm text-red-400', className?.error)}
      />
    </div>
  )
}

export default PinField

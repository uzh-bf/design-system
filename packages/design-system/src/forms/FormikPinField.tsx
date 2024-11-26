import { useField } from 'formik'
import React from 'react'
import FormikTextField from './FormikTextField'
import { TextFieldClassName } from './TextField'

export interface FormikPinFieldProps {
  id?: string
  name: string
  required?: boolean
  label?: string
  labelType?: 'small' | 'large'
  tooltip?: string | React.ReactNode
  className?: TextFieldClassName & { root?: string }
  data?: {
    cy?: string
    test?: string
  }
}

export function FormikPinField({
  id,
  name,
  required = false,
  label,
  labelType = 'small',
  tooltip,
  className,
  data,
}: FormikPinFieldProps) {
  const [field, meta, helpers] = useField(name)

  return (
    <FormikTextField
      id={id}
      value={field.value}
      required={required}
      label={label}
      labelType={labelType}
      tooltip={tooltip}
      className={className}
      data={data}
      error={!!meta.error && meta.touched ? meta.error : undefined}
      placeholder="### ### ###"
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
      onChange={(newValue: string) => {
        // regex magic to only allow numerical pins in the format ### ### ###
        const regexToMatch =
          /([0-9]{3} [0-9]{3} [0-9]{0,3})|([0-9]{3} [0-9]{3}[ ]{0,1})|([0-9]{3} [0-9]{0,3})|([0-9]{3}[ ]{0,1})|([0-9]{0,3})/g
        const valueMatched = newValue.match(regexToMatch)?.[0] ?? ''

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
      onBlur={() => {
        helpers.setTouched(true)
      }}
    />
  )
}

export default FormikPinField

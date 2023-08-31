import { useField } from 'formik'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

export interface TextareaFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  label?: string
  labelType?: 'small' | 'normal'
  placeholder?: string
  tooltip?: string
  required?: boolean
  maxLength?: number
  maxLengthLabel?: string
  hideError?: boolean
  disabled?: boolean
  className?: {
    override?: string
    root?: string
    field?: string
    label?: string
    input?: string
    error?: string
    tooltip?: string
  }
}

// type structure ensures that either a name or a value and onChange function are passed
export interface TextareaFieldWithNameProps extends TextareaFieldProps {
  name: string
  value?: never
  onChange?: never
  [key: string]: any
}
export interface TextareaFieldWithOnChangeProps extends TextareaFieldProps {
  name?: never
  value: string
  onChange: (newValue: string) => void
  [key: string]: any
}

/**
 * This component returns a textarea field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param maxLength - The optional maxLength is used to limit the number of characters that can be entered in the field.
 * @param maxLengthLabel - This optional label allows to specify a custom label for the maxLength indicator (e.g. "characters left" supporting internationalization).
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Textarea component with Formik state management.
 */
export function FormikTextareaField({
  id,
  data,
  name,
  value,
  onChange,
  label,
  labelType,
  placeholder,
  tooltip,
  required = false,
  maxLength,
  maxLengthLabel,
  hideError = false,
  disabled = false,
  className,
  ...props
}: TextareaFieldWithNameProps | TextareaFieldWithOnChangeProps) {
  const [field, meta] = useField(name || 'missing')

  return (
    <div className={twMerge('flex flex-col', className?.root)} id={id}>
      <div
        className={twMerge(
          'flex w-full flex-row',
          labelType === 'small' && 'flex-col',
          className?.field
        )}
      >
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
        {name && (
          <textarea
            {...field}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            className={twMerge(
              className?.override,
              'focus:border-uzh-blue-50 min-h-12 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
              disabled && 'cursor-not-allowed',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
        {typeof value !== 'undefined' && onChange && (
          <textarea
            {...field}
            id={id}
            data-cy={data?.cy}
            data-test={data?.test}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            className={twMerge(
              className?.override,
              'focus:border-uzh-blue-50 min-h-12 w-full rounded border border-uzh-grey-60 bg-uzh-grey-20',
              disabled && 'cursor-not-allowed',
              meta.error && meta.touched && 'border-red-400 bg-red-50',
              className?.input
            )}
            {...props}
          />
        )}
      </div>
      {!hideError && meta.touched && meta.error && (
        <div
          className={twMerge(
            'w-full text-right text-sm text-red-400',
            className?.error
          )}
        >
          {meta.error}
        </div>
      )}
      {maxLength && (
        <div className="text-right text-sm italic">
          {`${
            value?.length || field.value.length
          } / ${maxLength} ${maxLengthLabel}`}
        </div>
      )}
    </div>
  )
}

export default FormikTextareaField

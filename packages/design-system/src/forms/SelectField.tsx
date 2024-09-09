import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import FormLabel from '../FormLabel'
import Select, { SelectClassName, SelectGroup, SelectItem } from '../Select'
import { Tooltip } from '../Tooltip'

interface SelectFieldProps {
  id?: string
  data?: {
    cy?: string
    test?: string
  }
  name?: string
  value: string
  onChange: (newValue: string) => void
  onBlur?: () => void
  label?: string
  labelType?: 'small' | 'large'
  placeholder?: string
  tooltip?: string | React.ReactNode
  required?: boolean
  disabled?: boolean
  error?: string
  hideError?: boolean
  contentPosition?: 'item-aligned' | 'popper'
  className?: {
    root?: string
    label?: string
    error?: string
    tooltip?: string
    select?: SelectClassName
  }
}

export interface SelectFieldItemsProps extends SelectFieldProps {
  items: SelectItem[]
  groups?: never
}

export interface SelectFieldGroupsProps extends SelectFieldProps {
  groups: SelectGroup[]
  items?: never
}

/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field.
 * @param items - The array of items that should be available on the select component.
 * @param groups - The optional groups array can be used to group items in the select component.
 * @param value - The value of the field (external state management).
 * @param onChange - The onChange function of the field (external state management).
 * @param onBlur - The onBlur function of the field (external state management).
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param error - The optional error message is shown next to the component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export function SelectField({
  id,
  data,
  name,
  items,
  groups,
  value,
  onChange,
  onBlur,
  label,
  labelType = 'small',
  placeholder,
  tooltip,
  required = false,
  disabled = false,
  error,
  hideError = false,
  contentPosition = 'item-aligned',
  className,
  ...props
}: SelectFieldItemsProps | SelectFieldGroupsProps) {
  return (
    <div className={twMerge('flex w-max flex-col', className?.root)} id={id}>
      <div
        className={twMerge(
          'flex w-full flex-row',
          labelType === 'small' && 'flex-col'
        )}
      >
        {label && (
          <FormLabel
            id={id}
            required={required}
            label={label}
            labelType={labelType}
            tooltip={tooltip}
            className={className}
          />
        )}

        <div className="flex flex-row items-center gap-2">
          {items ? (
            <Select
              data={data}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
              items={items}
              placeholder={placeholder}
              disabled={disabled}
              className={{
                ...className?.select,
                trigger: twMerge(
                  error && 'outline outline-1 outline-red-600',
                  className?.select?.trigger
                ),
              }}
              contentPosition={contentPosition}
              {...props}
            />
          ) : (
            <Select
              data={data}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
              groups={groups}
              placeholder={placeholder}
              disabled={disabled}
              className={{
                ...className?.select,
                trigger: twMerge(
                  error && 'outline outline-1 outline-red-600',
                  className?.select?.trigger
                ),
              }}
              contentPosition={contentPosition}
              {...props}
            />
          )}
          {error && !hideError && (
            <Tooltip
              tooltip={error}
              delay={0}
              className={{ tooltip: 'max-w-[30rem] text-sm' }}
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="mr-1 text-red-600"
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectField

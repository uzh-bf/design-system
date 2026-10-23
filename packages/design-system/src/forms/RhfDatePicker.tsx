'use client'

import type { Ref } from 'react'
import type { FieldValues } from 'react-hook-form'
import DatePicker, { type DatePickerProps } from '../DatePicker'
import { RhfFieldShell } from './RhfField'
import {
  mergeRefs,
  omitRhfProps,
  useRhfField,
  type FieldPathByExactValue,
  type RhfFieldProps,
} from './rhf'

export type RhfDatePickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByExactValue<TFieldValues, Date | undefined>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  DatePickerProps,
  | keyof RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>
  | 'date'
  | 'onDateChange'
  | 'onBlur'
  | 'resetKey'
  | 'ref'
  | 'error'
  | 'isTouched'
> &
  Omit<
    RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
    'className'
  > & {
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] &
      DatePickerProps['className']
    ref?: Ref<HTMLButtonElement>
  }

export function RhfDatePicker<
  TFieldValues extends FieldValues,
  TName extends FieldPathByExactValue<TFieldValues, Date | undefined>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfDatePickerProps<TFieldValues, TName, TContext, TTransformedValues>
) {
  const state = useRhfField(props)
  const pickerProps = omitRhfProps(props)
  const value: unknown = state.field.value
  const date = value instanceof Date ? value : undefined

  return (
    <RhfFieldShell
      inputId={state.inputId}
      labelId={state.labelId}
      label={props.label}
      labelType={props.labelType}
      tooltip={props.tooltip}
      required={props.required}
      description={props.description}
      descriptionId={state.descriptionId}
      error={state.error}
      errorId={state.errorId}
      showError={state.showError && !props.hideError}
      errorDisplay={props.errorDisplay}
      className={props.className}
      data={props.data}
    >
      <DatePicker
        {...pickerProps}
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        date={date}
        onDateChange={(nextDate) => {
          state.field.onChange(
            typeof nextDate === 'function' ? nextDate(date) : nextDate
          )
        }}
        onBlur={state.field.onBlur}
        resetKey={state.resetVersion}
        disabled={state.field.disabled}
        required={props.required}
        error={state.error}
        isTouched={state.showError}
        hideError
        aria-label={props['aria-label'] ?? props.label}
        aria-labelledby={props['aria-labelledby'] ?? state.labelId}
        aria-describedby={state.describedBy}
        aria-invalid={state.showError}
        className={props.className}
        data={props.data}
      />
    </RhfFieldShell>
  )
}

export default RhfDatePicker

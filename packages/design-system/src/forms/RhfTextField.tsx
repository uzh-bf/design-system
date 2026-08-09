'use client'

import type { Ref } from 'react'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'
import { RhfFieldShell } from './RhfField'
import TextField, { type TextFieldOnChangeProps } from './TextField'
import { mergeRefs, omitRhfProps, useRhfField, type RhfFieldProps } from './rhf'

export type RhfTextFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className'
> &
  Omit<
    TextFieldOnChangeProps,
    | 'id'
    | 'label'
    | 'required'
    | 'error'
    | 'isTouched'
    | 'hideError'
    | 'value'
    | 'onChange'
    | 'onBlur'
    | 'ref'
  > & {
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] &
      TextFieldOnChangeProps['className']
    ref?: Ref<HTMLInputElement>
  }

export function RhfTextField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(props: RhfTextFieldProps<TFieldValues, TName, TContext, TTransformedValues>) {
  const state = useRhfField(props)
  const inputProps = omitRhfProps(props) as Omit<
    TextFieldOnChangeProps,
    | 'id'
    | 'label'
    | 'required'
    | 'error'
    | 'isTouched'
    | 'hideError'
    | 'value'
    | 'onChange'
    | 'onBlur'
    | 'ref'
  >

  const value =
    typeof state.field.value === 'string'
      ? state.field.value
      : state.field.value == null
        ? ''
        : String(state.field.value)

  return (
    <RhfFieldShell
      inputId={state.inputId}
      label={props.label}
      labelType={props.labelType}
      tooltip={props.tooltip}
      required={props.required}
      description={props.description}
      descriptionId={state.descriptionId}
      error={state.error}
      errorId={state.errorId}
      showError={state.showError}
      className={props.className}
      data={props.data}
    >
      <TextField
        {...inputProps}
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        data={props.data}
        value={value}
        onChange={state.field.onChange}
        onBlur={state.field.onBlur}
        required={props.required}
        disabled={state.field.disabled}
        error={state.error}
        isTouched={state.showError}
        hideError
        aria-invalid={state.showError}
        aria-describedby={state.describedBy}
        className={props.className}
      />
    </RhfFieldShell>
  )
}

export default RhfTextField

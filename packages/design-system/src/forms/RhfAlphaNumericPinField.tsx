'use client'

import type { Ref } from 'react'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'
import AlphaNumericPinField, {
  type AlphaNumericPinFieldClassName,
  type AlphaNumericPinFieldProps,
} from './AlphaNumericPinField'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, useRhfField, type RhfFieldProps } from './rhf'

export type RhfAlphaNumericPinFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className'
> &
  Pick<
    AlphaNumericPinFieldProps,
    'length' | 'uppercaseOnly' | 'aria-label' | 'aria-labelledby'
  > & {
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] &
      AlphaNumericPinFieldClassName
    ref?: Ref<HTMLInputElement>
  }

export function RhfAlphaNumericPinField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfAlphaNumericPinFieldProps<
    TFieldValues,
    TName,
    TContext,
    TTransformedValues
  >
) {
  const state = useRhfField(props)

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
      <AlphaNumericPinField
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        name={state.field.name}
        value={typeof state.field.value === 'string' ? state.field.value : ''}
        onChange={state.field.onChange}
        onBlur={state.field.onBlur}
        length={props.length}
        required={props.required}
        disabled={state.field.disabled}
        hideError
        error={state.error}
        isTouched={state.fieldState.isTouched}
        uppercaseOnly={props.uppercaseOnly}
        className={{
          input: props.className?.input,
          inputItem: props.className?.inputItem,
        }}
        data={props.data}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby'] ?? state.labelId}
        aria-describedby={state.describedBy}
        aria-invalid={state.showError}
      />
    </RhfFieldShell>
  )
}

export default RhfAlphaNumericPinField

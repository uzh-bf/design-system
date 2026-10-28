'use client'

import type { Ref } from 'react'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'
import PinField, {
  type PinFieldClassName,
  type PinFieldProps,
} from './PinField'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, useRhfField, type RhfFieldProps } from './rhf'

export type RhfPinFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className'
> &
  Pick<PinFieldProps, 'length' | 'aria-label' | 'aria-labelledby'> & {
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] &
      PinFieldClassName
    ref?: Ref<HTMLInputElement>
  }

export function RhfPinField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(props: RhfPinFieldProps<TFieldValues, TName, TContext, TTransformedValues>) {
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
      <PinField
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

export default RhfPinField

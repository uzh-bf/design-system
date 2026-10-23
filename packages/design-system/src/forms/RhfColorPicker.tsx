'use client'

import type { Ref } from 'react'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'
import ColorPicker, { type ColorPickerProps } from '../ColorPicker'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, omitRhfProps, useRhfField, type RhfFieldProps } from './rhf'

export type RhfColorPickerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  ColorPickerProps,
  | keyof RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>
  | 'color'
  | 'onSubmit'
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
      ColorPickerProps['className']
    ref?: Ref<HTMLButtonElement>
  }

export function RhfColorPicker<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfColorPickerProps<TFieldValues, TName, TContext, TTransformedValues>
) {
  const state = useRhfField(props)
  const pickerProps = omitRhfProps(props)

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
      <ColorPicker
        {...pickerProps}
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        color={typeof state.field.value === 'string' ? state.field.value : ''}
        onSubmit={state.field.onChange}
        onBlur={state.field.onBlur}
        resetKey={state.resetVersion}
        disabled={state.field.disabled}
        required={props.required}
        submitText={props.submitText}
        colorLabel={props.colorLabel}
        triggerAriaLabel={props.triggerAriaLabel}
        error={state.error}
        isTouched={state.showError}
        hideError
        aria-labelledby={props['aria-labelledby'] ?? state.labelId}
        aria-describedby={state.describedBy}
        aria-invalid={state.showError}
        className={{ ...props.className, root: undefined }}
        data={props.data}
      />
    </RhfFieldShell>
  )
}

export default RhfColorPicker

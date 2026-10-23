'use client'

import type { Ref } from 'react'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'
import { RhfFieldShell } from './RhfField'
import TextareaField from './TextareaField'
import { mergeRefs, omitRhfProps, useRhfField, type RhfFieldProps } from './rhf'

type NativeTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'field'
  | 'name'
  | 'value'
  | 'default'
  | 'defaultValue'
  | 'onChange'
  | 'onBlur'
  | 'id'
  | 'className'
>

export type RhfTextareaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = NativeTextareaProps &
  Omit<
    RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
    'className'
  > & {
    maxLengthUnit?: string
    hideMaxLength?: boolean
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] & { input?: string }
    ref?: Ref<HTMLTextAreaElement>
  }

export function RhfTextareaField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfTextareaFieldProps<
    TFieldValues,
    TName,
    TContext,
    TTransformedValues
  >
) {
  const state = useRhfField(props)
  const nativeTextareaProps = omitRhfProps(props)

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
      <TextareaField
        {...nativeTextareaProps}
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        name={state.field.name}
        value={typeof state.field.value === 'string' ? state.field.value : ''}
        onChange={state.field.onChange}
        onBlur={state.field.onBlur}
        disabled={state.field.disabled}
        required={props.required}
        maxLengthUnit={props.maxLengthUnit}
        hideMaxLength={props.hideMaxLength}
        invalid={state.showError}
        isTouched={state.fieldState.isTouched}
        error={state.error}
        hideError
        data={props.data}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby'] ?? state.labelId}
        aria-describedby={state.describedBy}
        aria-invalid={state.showError}
        className={props.className}
      />
    </RhfFieldShell>
  )
}

export default RhfTextareaField

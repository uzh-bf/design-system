'use client'

import type { Ref } from 'react'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'
import Switch, { type SwitchClassName, type SwitchProps } from '../Switch'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, useRhfField, type RhfFieldProps } from './rhf'

export type RhfSwitchFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className'
> &
  Pick<SwitchProps, 'size' | 'fluid' | 'labelLeft'> & {
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] &
      SwitchClassName
    'aria-label'?: string
    'aria-labelledby'?: string
    ref?: Ref<HTMLButtonElement>
  }

export function RhfSwitchField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, boolean>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfSwitchFieldProps<TFieldValues, TName, TContext, TTransformedValues>
) {
  const state = useRhfField(props)

  return (
    <RhfFieldShell
      inputId={state.inputId}
      description={props.description}
      descriptionId={state.descriptionId}
      error={state.error}
      errorId={state.errorId}
      showError={state.showError && !props.hideError}
      errorDisplay={props.errorDisplay}
      className={props.className}
      data={props.data}
    >
      <Switch
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        name={state.field.name}
        checked={state.field.value === true}
        onCheckedChange={state.field.onChange}
        onFocusOut={state.field.onBlur}
        disabled={state.field.disabled}
        required={props.required}
        label={props.label}
        tooltip={props.tooltip}
        labelLeft={props.labelLeft}
        size={props.size}
        fluid={props.fluid}
        data={props.data}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={state.describedBy}
        aria-invalid={state.showError}
        className={{
          element: props.className?.element,
          thumb: props.className?.thumb,
          label: props.className?.label,
          tooltip: props.className?.tooltip,
          root: props.fluid ? 'w-full' : undefined,
        }}
      />
    </RhfFieldShell>
  )
}

export default RhfSwitchField

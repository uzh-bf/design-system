'use client'

import type { Ref } from 'react'
import type { FieldPath, FieldPathByValue, FieldValues } from 'react-hook-form'
import MultiSelect, {
  type MultiSelectClassName,
  type MultiSelectItem,
} from '../MultiSelect'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, useRhfField, type RhfFieldProps } from './rhf'

type RhfMultiSelectVisualClassName = RhfFieldProps<
  FieldValues,
  FieldPath<FieldValues>
>['className'] &
  MultiSelectClassName

export type RhfMultiSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string[]>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className'
> & {
  items: MultiSelectItem[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  ariaLabel?: string
  className?: RhfMultiSelectVisualClassName
  ref?: Ref<HTMLButtonElement>
}

export function RhfMultiSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, string[]>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfMultiSelectProps<TFieldValues, TName, TContext, TTransformedValues>
) {
  const state = useRhfField(props)
  const value = Array.isArray(state.field.value) ? state.field.value : []

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
      <MultiSelect
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        name={state.field.name}
        items={props.items}
        value={value}
        onChange={state.field.onChange}
        onBlur={state.field.onBlur}
        disabled={state.field.disabled}
        ariaLabel={props.ariaLabel ?? props.label}
        ariaRequired={props.required}
        ariaInvalid={state.showError}
        ariaDescribedBy={state.describedBy}
        placeholder={props.placeholder}
        searchPlaceholder={props.searchPlaceholder}
        emptyText={props.emptyText}
        data={props.data}
        className={props.className}
      />
    </RhfFieldShell>
  )
}

export default RhfMultiSelect

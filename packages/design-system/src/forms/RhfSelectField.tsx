'use client'

import type { Ref } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import Select, {
  type SelectClassName,
  type SelectGroup,
  type SelectItem,
} from '../Select'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, useRhfField, type RhfFieldProps } from './rhf'

type RhfSelectVisualClassName = RhfFieldProps<
  FieldValues,
  FieldPath<FieldValues>
>['className'] &
  SelectClassName

export type RhfSelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className'
> &
  (
    | { items: SelectItem[]; groups?: never }
    | { groups: SelectGroup[]; items?: never }
  ) & {
    placeholder?: string
    contentPosition?: 'item-aligned' | 'popper'
    className?: RhfSelectVisualClassName
    ref?: Ref<HTMLButtonElement>
  }

export function RhfSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfSelectFieldProps<TFieldValues, TName, TContext, TTransformedValues>
) {
  const state = useRhfField(props)
  const selectClassName: SelectClassName = {
    ...props.className,
    trigger: `${props.className?.trigger ?? ''} ${
      state.showError
        ? 'border-destructive bg-destructive-background! text-destructive-text data-placeholder:text-destructive-text'
        : ''
    }`,
  }

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
      <Select
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        name={state.field.name}
        data={props.data}
        onChange={state.field.onChange}
        onBlur={state.field.onBlur}
        value={typeof state.field.value === 'string' ? state.field.value : ''}
        disabled={props.disabled}
        placeholder={props.placeholder}
        contentPosition={props.contentPosition}
        ariaRequired={props.required}
        ariaInvalid={state.showError}
        ariaDescribedBy={state.describedBy}
        className={selectClassName}
        {...(props.items ? { items: props.items } : { groups: props.groups })}
      />
    </RhfFieldShell>
  )
}

export default RhfSelectField

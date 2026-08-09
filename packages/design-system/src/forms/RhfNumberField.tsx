'use client'

import type { Ref } from 'react'
import { useEffect, useRef, useState } from 'react'
import type {
  FieldPathByValue,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import NumberField, { type NumberFieldProps } from './NumberField'
import { RhfFieldShell } from './RhfField'
import { mergeRefs, omitRhfProps, useRhfField, type RhfFieldProps } from './rhf'

const incompleteNumber = /^-?(?:\d*\.?\d*)$/
const completeNumber = /^-?(?:\d+(?:\.\d*)?|\.\d+)$/
const unset = Symbol('unset')

function displayValue(value: unknown): string {
  return value === '' || value === null || typeof value === 'undefined'
    ? ''
    : String(value)
}

function mergeNumberRules<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, number | ''>,
>(
  rules: RegisterOptions<TFieldValues, TName> | undefined,
  min: number | undefined,
  max: number | undefined
) {
  return {
    ...rules,
    ...(typeof min === 'number' && typeof rules?.min === 'undefined'
      ? { min }
      : {}),
    ...(typeof max === 'number' && typeof rules?.max === 'undefined'
      ? { max }
      : {}),
  }
}

export type RhfNumberFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, number | ''>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = Omit<
  RhfFieldProps<TFieldValues, TName, TContext, TTransformedValues>,
  'className' | 'rules'
> &
  Omit<
    NumberFieldProps,
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
    rules?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['rules']
    className?: RhfFieldProps<
      TFieldValues,
      TName,
      TContext,
      TTransformedValues
    >['className'] &
      NumberFieldProps['className']
    ref?: Ref<HTMLInputElement>
  }

export function RhfNumberField<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, number | ''>,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(
  props: RhfNumberFieldProps<TFieldValues, TName, TContext, TTransformedValues>
) {
  const min = typeof props.min === 'number' ? props.min : undefined
  const max = typeof props.max === 'number' ? props.max : undefined
  const state = useRhfField({
    ...props,
    rules: mergeNumberRules(props.rules, min, max),
  })
  const inputProps = omitRhfProps(props)

  const [buffer, setBuffer] = useState(() => displayValue(state.field.value))
  const lastCommittedDisplay = useRef(displayValue(state.field.value))
  const previousValue = useRef<unknown>(state.field.value)
  const previousDefaults = useRef(state.formState.defaultValues)
  const previousResetVersion = useRef(state.resetVersion)
  const pendingInternalValue = useRef<unknown>(unset)

  useEffect(() => {
    const defaultsChanged =
      previousDefaults.current !== state.formState.defaultValues
    const resetChanged = previousResetVersion.current !== state.resetVersion
    const valueChanged = !Object.is(previousValue.current, state.field.value)
    const expectedInternalChange =
      pendingInternalValue.current !== unset &&
      Object.is(pendingInternalValue.current, state.field.value)

    if (
      resetChanged ||
      defaultsChanged ||
      (valueChanged && !expectedInternalChange)
    ) {
      const nextDisplay = displayValue(state.field.value)
      setBuffer(nextDisplay)
      lastCommittedDisplay.current = nextDisplay
      pendingInternalValue.current = unset
    } else if (expectedInternalChange) {
      lastCommittedDisplay.current = displayValue(state.field.value)
      pendingInternalValue.current = unset
    }

    previousValue.current = state.field.value
    previousDefaults.current = state.formState.defaultValues
    previousResetVersion.current = state.resetVersion
  }, [state.field.value, state.formState.defaultValues, state.resetVersion])

  const handleChange = (nextBuffer: string) => {
    if (!incompleteNumber.test(nextBuffer)) return
    setBuffer(nextBuffer)

    if (nextBuffer === '') {
      pendingInternalValue.current = ''
      state.field.onChange('')
      return
    }

    if (completeNumber.test(nextBuffer)) {
      const nextValue = Number(nextBuffer)
      if (Number.isFinite(nextValue)) {
        pendingInternalValue.current = nextValue
        state.field.onChange(nextValue)
      }
    }
  }

  const handleBlur = () => {
    if (buffer === '') {
      lastCommittedDisplay.current = ''
    } else if (completeNumber.test(buffer)) {
      const nextValue = Number(buffer)
      if (Number.isFinite(nextValue)) {
        lastCommittedDisplay.current = String(nextValue)
        setBuffer(String(nextValue))
      }
    } else {
      setBuffer(lastCommittedDisplay.current)
    }

    state.field.onBlur()
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
      <NumberField
        {...inputProps}
        id={state.inputId}
        ref={mergeRefs(state.field.ref, props.ref)}
        data={props.data}
        value={buffer}
        onChange={handleChange}
        onBlur={handleBlur}
        required={props.required}
        disabled={state.field.disabled}
        min={min}
        max={max}
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

export default RhfNumberField

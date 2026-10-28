'use client'

import * as React from 'react'

import { testAttrs, type TestSelectors } from './lib/testSelectors'
import { Input } from './ui/input'
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  Questionnaire as QuestionnairePrimitive,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from './ui/questionnaire'

export interface QuestionnaireClassName {
  root?: string
  progress?: string
  item?: string
  title?: string
  description?: string
  choices?: string
  choice?: string
  choiceDescription?: string
  input?: string
  error?: string
  actions?: string
  previous?: string
  skip?: string
  next?: string
  submit?: string
}

export interface QuestionnaireProgressState {
  current: number
  first: boolean
  last: boolean
  total: number
}

export interface QuestionnaireLabels {
  previous: string
  skip: string
  next: string
  submit: string
  progressAriaLabel: string
  formatProgress: (state: QuestionnaireProgressState) => string
  requiredError: string
  optionalError: string
}

export interface QuestionnaireChoiceConfig {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  data?: TestSelectors
  checked?: boolean
  defaultChecked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export type QuestionnaireInputConfig = Omit<
  React.ComponentProps<typeof QuestionnaireInput>,
  'children' | 'className' | 'render' | 'ref'
> & {
  data?: TestSelectors
} & (
    | { label: Exclude<React.ReactNode, null | undefined | boolean> }
    | { label?: React.ReactNode; 'aria-label': string }
    | { label?: React.ReactNode; 'aria-labelledby': string }
  )

type NativeQuestionnaireItem = NonNullable<
  React.ComponentProps<typeof QuestionnairePrimitive>['items']
>[number]

export type QuestionnaireItemConfig = Omit<
  NativeQuestionnaireItem,
  'choices'
> & {
  title: React.ReactNode
  description?: React.ReactNode
  multiple?: boolean
  invalid?: boolean
  error?: React.ReactNode
  choices?: readonly QuestionnaireChoiceConfig[]
  input?: QuestionnaireInputConfig
  data?: TestSelectors
}

export type QuestionnaireProps = Omit<
  React.ComponentProps<typeof QuestionnairePrimitive>,
  'children' | 'className' | 'items'
> & {
  items: readonly QuestionnaireItemConfig[]
  className?: QuestionnaireClassName
  data?: TestSelectors
  dataProgress?: TestSelectors
  dataActions?: TestSelectors
  dataPrevious?: TestSelectors
  dataSkip?: TestSelectors
  dataNext?: TestSelectors
  dataSubmit?: TestSelectors
  labels?: Partial<QuestionnaireLabels>
}

const defaultLabels: QuestionnaireLabels = {
  previous: 'Previous',
  skip: 'Skip',
  next: 'Next',
  submit: 'Submit',
  progressAriaLabel: 'Questionnaire progress',
  formatProgress: ({ current, total }) =>
    'Question ' + current + ' of ' + total,
  requiredError: 'Choose an answer to continue.',
  optionalError: 'Choose an answer or skip this question.',
}

type ConfiguredItemProps = {
  item: QuestionnaireItemConfig
  className?: QuestionnaireClassName
  labels: QuestionnaireLabels
}

function ConfiguredItem({ item, className, labels }: ConfiguredItemProps) {
  const descriptionId = React.useId()
  const generatedInputId = React.useId()
  const errorId = React.useId()
  const { label: inputLabel, data: inputData, ...inputProps } = item.input ?? {}
  const inputId = item.input?.id ?? generatedInputId
  const errorContent =
    item.error ?? (item.required ? labels.requiredError : labels.optionalError)

  return (
    <QuestionnaireItem
      {...testAttrs(item.data)}
      className={className?.item}
      disabled={item.disabled}
      invalid={item.invalid}
      multiple={item.multiple}
      name={item.name}
      required={item.required}
    >
      <QuestionnaireTitle className={className?.title}>
        {item.title}
      </QuestionnaireTitle>
      {item.description != null && (
        <QuestionnaireDescription
          className={className?.description}
          id={descriptionId}
        >
          {item.description}
        </QuestionnaireDescription>
      )}
      {item.choices && item.choices.length > 0 && (
        <QuestionnaireChoices className={className?.choices}>
          {item.choices.map((choice) => {
            const { data, description, label, ...choiceProps } = choice
            return (
              <QuestionnaireChoice
                {...testAttrs(data)}
                {...choiceProps}
                className={className?.choice}
                key={choice.value}
              >
                <span>{label}</span>
                {description != null && (
                  <QuestionnaireChoiceDescription
                    className={className?.choiceDescription}
                  >
                    {description}
                  </QuestionnaireChoiceDescription>
                )}
              </QuestionnaireChoice>
            )
          })}
        </QuestionnaireChoices>
      )}
      {item.input && (
        <div className="grid gap-1.5">
          {inputLabel != null && (
            <label className="text-sm font-medium" htmlFor={inputId}>
              {inputLabel}
            </label>
          )}
          <QuestionnaireInput
            {...testAttrs(inputData)}
            {...inputProps}
            className={className?.input}
            id={inputId}
            render={(props, state) => (
              <Input
                {...(props as React.ComponentProps<'input'>)}
                aria-describedby={
                  [
                    item.input?.['aria-describedby'],
                    item.description != null ? descriptionId : undefined,
                    state.invalid ? errorId : undefined,
                  ]
                    .filter(Boolean)
                    .join(' ') || undefined
                }
              />
            )}
          />
        </div>
      )}
      <QuestionnaireError className={className?.error} id={errorId}>
        {errorContent}
      </QuestionnaireError>
    </QuestionnaireItem>
  )
}

export function Questionnaire({
  className,
  data,
  dataActions,
  dataNext,
  dataPrevious,
  dataProgress,
  dataSkip,
  dataSubmit,
  items,
  labels: labelOverrides,
  ...formProps
}: QuestionnaireProps) {
  const labels = {
    ...defaultLabels,
    ...labelOverrides,
    formatProgress:
      labelOverrides?.formatProgress ?? defaultLabels.formatProgress,
  }
  const nativeItems: NonNullable<
    React.ComponentProps<typeof QuestionnairePrimitive>['items']
  > = items.map((item) => ({
    choices: item.choices?.map(({ disabled, value }) => ({ disabled, value })),
    disabled: item.disabled,
    name: item.name,
    required: item.required,
  }))

  return (
    <QuestionnairePrimitive
      {...testAttrs(data)}
      {...formProps}
      className={className?.root}
      items={nativeItems}
    >
      <QuestionnaireProgress
        {...testAttrs(dataProgress)}
        aria-label={labels.progressAriaLabel}
        className={className?.progress}
        render={(props, state) => {
          const text = labels.formatProgress(state)
          return (
            <div
              {...(props as React.ComponentProps<'div'>)}
              aria-valuetext={text}
            >
              {text}
            </div>
          )
        }}
      />
      {items.map((item) => (
        <ConfiguredItem
          className={className}
          item={item}
          key={item.name}
          labels={labels}
        />
      ))}
      <QuestionnaireActions
        {...testAttrs(dataActions)}
        className={className?.actions}
      >
        <QuestionnairePrevious
          {...testAttrs(dataPrevious)}
          className={className?.previous}
        >
          {labels.previous}
        </QuestionnairePrevious>
        <QuestionnaireSkip {...testAttrs(dataSkip)} className={className?.skip}>
          {labels.skip}
        </QuestionnaireSkip>
        <QuestionnaireNext {...testAttrs(dataNext)} className={className?.next}>
          {labels.next}
        </QuestionnaireNext>
        <QuestionnaireSubmit
          {...testAttrs(dataSubmit)}
          className={className?.submit}
        >
          {labels.submit}
        </QuestionnaireSubmit>
      </QuestionnaireActions>
    </QuestionnairePrimitive>
  )
}

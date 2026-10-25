import { useRef, useState, type ComponentProps } from 'react'
import { Questionnaire } from './Questionnaire'
import { Button } from './ui/button'
import {
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  Questionnaire as RawQuestionnaire,
} from './ui/questionnaire'

const questions = [
  {
    name: 'format',
    title: 'Choose a response format',
    description: 'Select one format to continue.',
    required: true,
    data: { test: 'question-format' },
    choices: [
      {
        value: 'brief',
        label: 'Brief',
        description: 'A short response',
        data: { test: 'choice-brief' },
      },
      {
        value: 'detailed',
        label: 'Detailed',
        data: { test: 'choice-detailed' },
      },
      {
        value: 'unavailable',
        label: 'Unavailable',
        disabled: true,
        data: { test: 'choice-disabled' },
      },
    ],
  },
  {
    name: 'disabled',
    title: 'Disabled item',
    disabled: true,
    data: { test: 'question-disabled' },
    choices: [{ value: 'hidden', label: 'Unavailable' }],
  },
  {
    name: 'tools',
    title: 'Choose supporting material',
    multiple: true,
    required: true,
    data: { test: 'question-tools' },
    choices: [
      { value: 'table', label: 'Table', data: { test: 'choice-table' } },
      { value: 'diagram', label: 'Diagram', data: { test: 'choice-diagram' } },
    ],
    input: {
      label: 'Other material',
      placeholder: 'Describe other material',
      data: { test: 'input-tools' },
    },
  },
  {
    name: 'notes',
    title: 'Additional notes',
    data: { test: 'question-notes' },
    input: { label: 'Notes', type: 'text', data: { test: 'input-notes' } },
  },
] as const satisfies NonNullable<ComponentProps<typeof Questionnaire>['items']>

export const Configured = () => {
  const ref = useRef<HTMLFormElement>(null)
  const [active, setActive] = useState('format')
  const [events, setEvents] = useState({ submitted: 0, reset: 0, changed: 0 })
  const [answers, setAnswers] = useState<[string, FormDataEntryValue][]>([])
  return (
    <main
      className="bg-background text-foreground mx-auto flex max-w-xl flex-col gap-4 p-4"
      data-test="questionnaire-story"
    >
      <h1 id="clarification-title" className="text-xl font-semibold">
        Clarification questionnaire
      </h1>
      <Questionnaire
        ref={ref}
        aria-labelledby="clarification-title"
        items={questions}
        item={active}
        defaultItem="format"
        shortcuts="letters"
        onItemChange={(item) => {
          setActive(item)
          setEvents((e) => ({ ...e, changed: e.changed + 1 }))
        }}
        data={{ test: 'questionnaire' }}
        dataProgress={{ test: 'questionnaire-progress' }}
        dataActions={{ test: 'questionnaire-actions' }}
        dataPrevious={{ test: 'questionnaire-previous' }}
        dataSkip={{ test: 'questionnaire-skip' }}
        dataNext={{ test: 'questionnaire-next' }}
        dataSubmit={{ test: 'questionnaire-submit' }}
        className={{
          root: 'rounded-md border p-4',
          title: 'font-medium',
          choice: 'rounded-md',
          input: 'rounded-md',
        }}
        onSubmit={(event) => {
          event.preventDefault()
          setAnswers([...new FormData(event.currentTarget)])
          setEvents((e) => ({ ...e, submitted: e.submitted + 1 }))
        }}
        onReset={() => {
          setAnswers([])
          setEvents((e) => ({ ...e, reset: e.reset + 1 }))
        }}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          data-test="questionnaire-reset"
          onClick={() => ref.current?.reset()}
        >
          Reset form
        </Button>
        <Button
          data-test="questionnaire-focus"
          onClick={() => ref.current?.querySelector('input')?.focus()}
        >
          Focus answer
        </Button>
        <Button
          data-test="questionnaire-active-notes"
          onClick={() => setActive('notes')}
        >
          Select notes
        </Button>
      </div>
      <output data-test="questionnaire-active">{active}</output>
      <output data-test="questionnaire-events">{JSON.stringify(events)}</output>
      <output data-test="questionnaire-answers">
        {JSON.stringify(answers)}
      </output>
    </main>
  )
}

export const Localized = () => (
  <main
    dir="rtl"
    className="bg-background text-foreground mx-auto max-w-xl p-4"
    data-test="questionnaire-localized"
  >
    <h1 className="mb-4 text-xl font-semibold">
      Localizable actions and progress
    </h1>
    <Questionnaire
      items={questions}
      data={{ test: 'localized-form' }}
      dataProgress={{ test: 'localized-progress' }}
      dataNext={{ test: 'localized-next' }}
      labels={{
        previous: 'Zurück',
        skip: 'Überspringen',
        next: 'Weiter',
        submit: 'Senden',
        progressAriaLabel: 'Fortschritt',
        formatProgress: ({ current, total }) => `${current} / ${total}`,
        requiredError: 'Bitte eine Antwort wählen.',
        optionalError: 'Antwort wählen oder überspringen.',
      }}
    />
  </main>
)

export const NativeParts = () => (
  <main
    className="bg-background text-foreground mx-auto max-w-xl p-4"
    data-test="questionnaire-native"
  >
    <h1 className="mb-4 text-xl font-semibold">Native compound form</h1>
    <RawQuestionnaire
      items={[
        { name: 'native', required: true, choices: [{ value: 'one' }] },
        { name: 'final', choices: [{ value: 'two' }] },
      ]}
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="native" required>
        <QuestionnaireTitle>Choose an option</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="one">One</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="final">
        <QuestionnaireTitle>Final option</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="two">Two</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </RawQuestionnaire>
  </main>
)

export const NativeValidity = () => {
  const [submitted, setSubmitted] = useState(0)
  return (
    <main
      className="bg-background text-foreground mx-auto max-w-xl p-4"
      data-test="questionnaire-validity"
    >
      <h1 className="mb-4 text-xl font-semibold">Native input validation</h1>
      <Questionnaire
        noValidate={false}
        items={[
          {
            name: 'contact',
            title: 'Synthetic address',
            required: true,
            input: {
              label: 'Email address',
              type: 'email',
              data: { test: 'validity-email' },
            },
          },
        ]}
        dataSubmit={{ test: 'validity-submit' }}
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted((value) => value + 1)
        }}
      />
      <output data-test="validity-submitted">{submitted}</output>
    </main>
  )
}

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { SelectField } from './forms/SelectField'
import TextField from './forms/TextField'

const locations = [
  { value: 'zurich', label: 'Zurich' },
  { value: 'basel', label: 'Basel' },
]

function FieldActionsFixture() {
  const [value, setValue] = useState('')
  const [actionCount, setActionCount] = useState(0)
  const [leftActionCount, setLeftActionCount] = useState(0)
  const [resetCount, setResetCount] = useState(0)
  const [disabledActionCount, setDisabledActionCount] = useState(0)
  const [disabledResetCount, setDisabledResetCount] = useState(0)
  const [submitCount, setSubmitCount] = useState(0)

  return (
    <form
      className="flex w-96 max-w-full flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitCount((count) => count + 1)
      }}
    >
      <div data-test="field-actions-active">
        <TextField
          label="Search"
          value={value}
          onChange={setValue}
          icon={faMagnifyingGlass}
          iconPosition="right"
          iconAriaLabel="Run search"
          onIconClick={() => setActionCount((count) => count + 1)}
          className={{ icon: '!h-7 !w-7' }}
          resetAriaLabel="Clear search"
          onReset={() => {
            setResetCount((count) => count + 1)
            setValue('')
          }}
          data={{ test: 'field-actions-input' }}
        />
      </div>

      <div data-test="field-actions-left">
        <TextField
          label="Left action"
          value=""
          onChange={() => undefined}
          icon={faMagnifyingGlass}
          iconPosition="left"
          iconAriaLabel="Run left action"
          onIconClick={() => setLeftActionCount((count) => count + 1)}
          className={{ icon: '!h-7 !w-7' }}
          data={{ test: 'field-actions-left-input' }}
        />
      </div>

      <div data-test="field-actions-decorative">
        <TextField
          label="Decorative"
          value="Decorative value"
          onChange={() => undefined}
          icon={faMagnifyingGlass}
          iconPosition="left"
          data={{ test: 'field-actions-decorative-input' }}
        />
      </div>

      <div data-test="field-actions-disabled">
        <TextField
          label="Disabled action"
          value=""
          onChange={() => undefined}
          icon={faMagnifyingGlass}
          onIconClick={() => setDisabledActionCount((count) => count + 1)}
          iconAriaLabel="Disabled action"
          disabled
          data={{ test: 'field-actions-disabled-input' }}
        />
        <TextField
          label="Disabled reset"
          value="Locked value"
          onChange={() => undefined}
          resetAriaLabel="Disabled reset"
          onReset={() => setDisabledResetCount((count) => count + 1)}
          disabled
          data={{ test: 'field-actions-disabled-reset-input' }}
        />
      </div>

      <SelectField
        label="Location with hidden error"
        items={locations}
        value=""
        onChange={() => undefined}
        error="Location is required"
        hideError
        data={{ test: 'field-actions-hidden-error' }}
      />
      <SelectField
        label="Location override"
        items={locations}
        value=""
        onChange={() => undefined}
        error="Location is required"
        hideError
        ariaInvalid={false}
        data={{ test: 'field-actions-invalid-override' }}
      />

      <output aria-label="Action count" data-test="field-actions-count">
        {actionCount}
      </output>
      <output
        aria-label="Left action count"
        data-test="field-actions-left-count"
      >
        {leftActionCount}
      </output>
      <output aria-label="Reset count" data-test="field-resets-count">
        {resetCount}
      </output>
      <output
        aria-label="Disabled action count"
        data-test="field-actions-disabled-count"
      >
        {disabledActionCount}
      </output>
      <output
        aria-label="Disabled reset count"
        data-test="field-actions-disabled-reset-count"
      >
        {disabledResetCount}
      </output>
      <output aria-label="Submit count" data-test="field-actions-submit-count">
        {submitCount}
      </output>
    </form>
  )
}

export const Default = () => <FieldActionsFixture />

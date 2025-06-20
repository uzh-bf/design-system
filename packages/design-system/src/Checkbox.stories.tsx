import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import Button from './Button'
import Checkbox from './Checkbox'

export const Default = () => {
  const [isChecked, setIsChecked] = useState(true)
  return (
    <Checkbox checked={isChecked} onCheck={() => setIsChecked(!isChecked)} />
  )
}

export const Disabled = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Checkbox
      checked={isChecked}
      onCheck={() => setIsChecked(!isChecked)}
      disabled={true}
      label="disabled"
    />
  )
}

export const Labelled = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Checkbox
      checked={isChecked}
      onCheck={() => setIsChecked(!isChecked)}
      label={
        <div className="rounded-md border border-solid border-uzh-blue-80 bg-uzh-blue-20 p-3 font-bold">
          Label Component - checkbox value: {String(isChecked)}
        </div>
      }
    />
  )
}

export const Sizes = () => {
  const [isChecked1, setIsChecked1] = useState(true)
  const [isChecked2, setIsChecked2] = useState(true)
  const [isChecked3, setIsChecked3] = useState(true)
  const [isChecked4, setIsChecked4] = useState(true)

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        checked={isChecked1}
        onCheck={() => setIsChecked1(!isChecked1)}
        label="small checkbox"
        size="sm"
      />
      <Checkbox
        checked={isChecked2}
        onCheck={() => setIsChecked2(!isChecked2)}
        label="medium checkbox"
        size="md"
      />
      <Checkbox
        checked={isChecked3}
        onCheck={() => setIsChecked3(!isChecked3)}
        label="large checkbox"
        size="lg"
      />
      <Checkbox
        checked={isChecked4}
        onCheck={() => setIsChecked4(!isChecked4)}
        label="extra large checkbox"
        size="xl"
      />
    </div>
  )
}

export const Content = () => {
  const [isChecked, setIsChecked] = useState(true)

  return (
    <Checkbox
      checked={isChecked}
      onCheck={() => setIsChecked(!isChecked)}
      label="Checkbox with custom content"
    >
      <FontAwesomeIcon icon={faX} className="mb-[0.19rem] h-4" />
    </Checkbox>
  )
}

export const Partial = () => {
  const [state, setState] = useState(0)

  return (
    <div>
      <Checkbox
        checked={state === 2}
        partial={state > 0}
        onCheck={() => (state === 2 ? setState(0) : setState(2))}
        label="Checkbox with partial logic"
      />
      <div className="flex flex-row gap-4">
        <Button onClick={() => setState(0)}>Uncheck</Button>
        <Button onClick={() => setState(1)}>Partial</Button>
        <Button onClick={() => setState(2)}>Check</Button>
      </div>
      <div className="mt-4">
        State: {state}, This is also compatible with differente sizes:
      </div>
      <div className="mt-2 flex flex-row gap-4">
        <Checkbox
          checked={state === 2}
          partial={state > 0}
          onCheck={() => (state === 2 ? setState(0) : setState(2))}
          label="Checkbox with partial logic"
          size="sm"
        />
        <Checkbox
          checked={state === 2}
          partial={state > 0}
          onCheck={() => (state === 2 ? setState(0) : setState(2))}
          label="Checkbox with partial logic"
          size="md"
        />
        <Checkbox
          checked={state === 2}
          partial={state > 0}
          onCheck={() => (state === 2 ? setState(0) : setState(2))}
          label="Checkbox with partial logic"
          size="lg"
        />
        <Checkbox
          checked={state === 2}
          partial={state > 0}
          onCheck={() => (state === 2 ? setState(0) : setState(2))}
          label="Checkbox with partial logic"
          size="xl"
        />
      </div>
    </div>
  )
}

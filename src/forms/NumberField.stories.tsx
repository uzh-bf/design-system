import React, { useState } from 'react'
import NumberField from './NumberField'

export function Default() {
  const [value, setValue] = useState('')
  return (
    <div>
      <div>
        By default, the number field allows decimal numbers with arbitrary
        precision (negative and positive) and its value is maintained as a
        string.
      </div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        className={{ field: 'w-80' }}
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function Precision() {
  const [value, setValue] = useState('')
  return (
    <div>
      <div>
        The precision prop can be used to limit the number of decimal places.
        For this example, this value is set to 2.
      </div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        precision={2}
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function MinMax() {
  const [value, setValue] = useState('')
  return (
    <div>
      <div>
        The min and max props can be used to limit the allowed values. For this
        example, the minimum value is set to 0 and the maximum value is set to
        100.
      </div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        min={0}
        max={100}
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function Integer() {
  const [value, setValue] = useState('')
  return (
    <div>
      <div>
        The precision prop of the number field can easily be used to limit the
        allowed values to integers by setting it to 0.
      </div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        precision={0}
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function NumberState() {
  const [value, setValue] = useState(0)
  return (
    <div>
      <div>
        If the state of the number field is a number, the conversion needs to be
        done explicitely by the user. It is not recommended to do this as issues
        with empty values or decimal numbers can occur. Instead, consider to
        convert the value to a float on submission of the field.
      </div>
      <NumberField
        value={isNaN(value) ? '' : String(value)}
        onChange={(newValue) => setValue(parseFloat(newValue))}
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function Labelled() {
  const [value, setValue] = useState('')
  return (
    <div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        label="Nunber Field"
        tooltip="This is a tooltip for the number field"
        required
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function SmallLabel() {
  const [value, setValue] = useState('')
  return (
    <div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        label="Nunber Field"
        labelType="small"
        tooltip="This is a tooltip for the number field"
        required
      />
      <div>Value: {value}</div>
    </div>
  )
}

export function Error() {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  return (
    <div>
      <div>
        As soon as the field has been touched, an error will be displayed.
      </div>
      <NumberField
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onBlur={() => setTouched(true)}
        label="Nunber Field"
        labelType="small"
        tooltip="This is a tooltip for the number field"
        error="This is an error message"
        isTouched={touched}
        required
      />
      <div>Value: {value}</div>
    </div>
  )
}

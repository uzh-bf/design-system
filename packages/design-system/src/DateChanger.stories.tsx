import { faPen } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import DateChanger from './DateChanger'

export function Default() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
    />
  )
}

export function Disabled() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
      disabled
    />
  )
}

export function Tooltip() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
      label="Label for date changer"
      tooltip="Tooltip for date changer with label"
    />
  )
}

export function CustomIcons() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
      editIcon={faPen}
    />
  )
}

export function Styled() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
      label="Testlabel"
      className={{
        label: 'mr-1 font-bold',
        editButton: 'text-red-500',
      }}
    />
  )
}

export function Labelled() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
      label="Testlabel"
      required
    />
  )
}

export function SmallLabel() {
  const [date, setDate] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)

  return (
    <DateChanger
      date={date}
      edit={edit}
      onEdit={() => setEdit(true)}
      onSave={(date) => {
        setDate(date)
        setEdit(false)
      }}
      label="Testlabel"
      labelType="small"
      tooltip="Tooltip for date changer with label"
      required
    />
  )
}

export function Error() {
  const [date, setDate] = useState('2021-01-01')
  const [date2, setDate2] = useState('2021-01-01')
  const [edit, setEdit] = useState(false)
  const [edit2, setEdit2] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <DateChanger
        required
        isTouched
        date={date}
        edit={edit}
        onEdit={() => setEdit(true)}
        onSave={(date) => {
          setDate(date)
          setEdit(false)
        }}
        label="Testlabel"
        labelType="small"
        tooltip="Tooltip for date changer with label"
        error="This is an error"
      />
      <DateChanger
        required
        isTouched
        date={date2}
        edit={edit2}
        onEdit={() => setEdit2(true)}
        onSave={(date) => {
          setDate2(date)
          setEdit2(false)
        }}
        label="Testlabel"
        tooltip="Tooltip for date changer with label"
        error="This is an error"
      />
    </div>
  )
}

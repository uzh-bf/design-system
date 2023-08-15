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

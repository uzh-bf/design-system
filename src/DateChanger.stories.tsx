import { faPaperPlane, faPen } from '@fortawesome/free-solid-svg-icons'
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
      saveIcon={faPaperPlane}
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
        label: 'font-bold mr-1',
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

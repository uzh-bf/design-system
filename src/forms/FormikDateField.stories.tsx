import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

import Button from '../Button'
import FormikDateField from './FormikDateField'

const dateSchema = yup.object().shape({
  endDate: yup
    .string()
    .required('End date is required')
    .test('check_minyear_1000', 'End date must be after year 1000', (value) => {
      console.log(value, value?.substring(0, 4))
      return Number(value?.substring(0, 4)) > 1000
    })
    .test(
      'check_maxyear_9999',
      'End date must be before year 9999',
      (value) => {
        console.log(
          value,
          value?.substring(0, 4),
          Number(value?.substring(0, 4)),
          Number(value?.substring(0, 5)),
          isNaN(Number(value?.substring(0, 5)))
        )
        return (
          isNaN(Number(value?.substring(0, 5))) ||
          Number(value?.substring(0, 5)) < 9999
        )
      }
    ),
})

export const Default = () => {
  dayjs.extend(utc)

  // A dayjs datestring in UTC time can be passed to the form for initialization and is parsed correctly
  const initialDate = ''

  return (
    <div>
      <div className="mb-4">
        This field can be used for date handling, however keep in mind that the
        date is stored as an HTML datetime-local string and not as UTC date
        using dayjs. A possbile validation for this field and a possible submit
        function converting the date to a corresponding object is implemented in
        this example.
      </div>
      <Formik
        initialValues={{
          endDate: (dayjs(initialDate).local().format() || '')
            .toString()
            .substring(0, 16),
        }}
        isInitialValid={false}
        validationSchema={dateSchema}
        onSubmit={(values, isValid) => {
          if (!isValid) {
            alert('Form is not valid')
          }
          alert(`Submitted end date: ${dayjs(values.endDate).utc().format()}`)
        }}
      >
        {({ isValid }) => (
          <Form>
            <FormikDateField name="endDate" label="End Date" />
            <Button
              className={{ root: 'mt-2' }}
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export const InitialDate = () => {
  dayjs.extend(utc)

  // A dayjs datestring in UTC time can be passed to the form for initialization and is parsed correctly
  const initialDate = '2021-01-31T20:12:00Z'

  return (
    <div>
      <div className="mb-4">
        This date field is initialized with a date string.
      </div>
      <Formik
        initialValues={{
          endDate: (dayjs(initialDate).local().format() || '')
            .toString()
            .substring(0, 16),
        }}
        isInitialValid={false}
        validationSchema={dateSchema}
        onSubmit={(values, isValid) => {
          if (!isValid) {
            alert('Form is not valid')
          }
          alert(`Submitted end date: ${dayjs(values.endDate).utc().format()}`)
        }}
      >
        {({ isValid }) => (
          <Form>
            <FormikDateField name="endDate" label="End Date" />
            <Button
              className={{ root: 'mt-2' }}
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export const Disabled = () => {
  return (
    <div>
      <Formik
        initialValues={{
          endDate: '',
        }}
        isInitialValid={false}
        onSubmit={(values) => {
          alert("Date button is disabled. Can't submit")
        }}
      >
        <Form>
          <FormikDateField name="endDate" label="End Date" disabled />
          <Button className={{ root: 'mt-2' }} type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export const Required = () => {
  dayjs.extend(utc)

  // A dayjs datestring in UTC time can be passed to the form for initialization and is parsed correctly
  const initialDate = ''

  return (
    <div>
      <Formik
        initialValues={{
          endDate: (dayjs(initialDate).local().format() || '')
            .toString()
            .substring(0, 16),
        }}
        isInitialValid={false}
        validationSchema={dateSchema}
        onSubmit={(values, isValid) => {
          if (!isValid) {
            alert('Form is not valid')
          }
          alert(`Submitted end date: ${dayjs(values.endDate).utc().format()}`)
        }}
      >
        {({ isValid }) => (
          <Form>
            <FormikDateField name="endDate" label="End Date" required />
            <Button
              className={{ root: 'mt-2' }}
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

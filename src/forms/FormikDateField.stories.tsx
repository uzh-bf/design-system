import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikDateField from './FormikDateField'

export const Default = () => {
  return (
    <div>
      <Formik
        initialValues={{
          endDate: '',
        }}
        isInitialValid={false}
        onSubmit={(values) => {
          alert(`Submitted end date: ${values.endDate}`)
        }}
      >
        {() => {
          return (
            <div>
              <Form>
                <FormikDateField name="endDate" label="End Date" />
                <Button className={{ root: 'mt-2' }} type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          )
        }}
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
        {() => {
          return (
            <div>
              <Form>
                <FormikDateField name="endDate" label="End Date" disabled />
                <Button className={{ root: 'mt-2' }} type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export const Required = () => {
  return (
    <div>
      <Formik
        initialValues={{
          endDate: '',
        }}
        isInitialValid={false}
        onSubmit={(values) => {
          alert(`Submitted end date: ${values.endDate}`)
        }}
      >
        {() => {
          return (
            <div>
              <Form>
                <FormikDateField name="endDate" label="End Date" required />
                <Button className={{ root: 'mt-2' }} type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikDateChanger from './FormikDateChanger'

export const Default = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger name="date" className={{ root: 'mb-2' }} />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Disabled = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger
                name="date"
                className={{ root: 'mb-2' }}
                disabled
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Labelled = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger
                name="date"
                className={{ root: 'mb-2' }}
                label="Label"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Tooltip = () => (
  <div>
    <Formik
      initialValues={{
        date: '2023-01-01',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with date: ${values.date}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikDateChanger
                name="date"
                className={{ root: 'mb-2' }}
                label="Testlabel"
                required
                tooltip="Test Tooltip"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.date}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

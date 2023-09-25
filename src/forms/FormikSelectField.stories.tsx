import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import Button from '../Button'
import FormikSelectField from './FormikSelectField'

export const Default = () => (
  <div>
    <Formik
      initialValues={{
        name: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSelectField
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                ]}
                label="Name"
                placeholder="Select a name"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Required = () => (
  <div>
    <Formik
      initialValues={{
        name: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSelectField
                required
                tooltip="This is a tooltip"
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                ]}
                label="Name"
                placeholder="Select a name"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const DefaultValue = () => (
  <div>
    <Formik
      initialValues={{
        name: 'world',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSelectField
                tooltip="This is a tooltip"
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                ]}
                label="Name"
                placeholder="Select a name"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
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
        name: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSelectField
                disabled
                tooltip="This formik select component is disabled."
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                ]}
                label="Name"
                placeholder="Select a name"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Validation = () => (
  <div>
    <Formik
      initialValues={{
        name: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
      validationSchema={yup.object().shape({
        name: yup
          .string()
          .required('Name is required')
          .equals(['hello'], 'Name must be hello'),
      })}
    >
      {({ values }) => {
        return (
          <div>
            <div>
              The form should have the value 'hello' in order for validation not
              to fail.
            </div>
            <Form>
              <FormikSelectField
                tooltip="This formik select component is disabled."
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                  { value: 'new', label: 'new' },
                ]}
                label="Name"
                placeholder="Select a name"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const SmallLabel = () => (
  <div>
    <Formik
      initialValues={{
        name: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSelectField
                required
                name="name"
                items={[
                  { value: 'hello', label: 'hello' },
                  { value: 'world', label: 'world' },
                ]}
                label="Name"
                labelType="small"
                placeholder="Select a name"
                tooltip="This is a tooltip"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.name}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

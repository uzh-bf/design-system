import { Form, Formik } from 'formik'
import React from 'react'
import Button from '../Button'
import FormikSelectField from './FormikSelectField'

export const Default = () => (
  <div>
    <Formik
      initialValues={{
        name: undefined,
      }}
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
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
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
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
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
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
      onSubmit={async (values) => {
        alert(`Form submitted with value: ${values.name}`)
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

import { Form, Formik } from 'formik'
import React from 'react'
import { Button } from '../Button'
import FormikSelectField from './NewFormikSelectField'

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'pear', label: 'Pear' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'peach', label: 'Peach' },
  { value: 'mango', label: 'Mango' },
]

export const Default = () => {
  return (
    <Formik
      initialValues={{
        fruit: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.fruit}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div className="flex flex-col gap-2">
            <Form>
              <FormikSelectField
                name="fruit"
                items={items}
                label="Fruits"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.fruit}</div>
          </div>
        )
      }}
    </Formik>
  )
}

export const Required = () => {
  return (
    <Formik
      initialValues={{
        fruit: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.fruit}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div className="flex flex-col gap-2">
            <Form>
              <FormikSelectField
                required
                name="fruit"
                items={items}
                label="Fruits"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.fruit}</div>
          </div>
        )
      }}
    </Formik>
  )
}

export const Disabled = () => {
  return (
    <Formik
      initialValues={{
        fruit: items[0].value,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.fruit}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div className="flex flex-col gap-2">
            <Form>
              <FormikSelectField
                disabled
                name="fruit"
                items={items}
                label="Fruits"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.fruit}</div>
          </div>
        )
      }}
    </Formik>
  )
}

export const LargeLabel = () => {
  return (
    <Formik
      initialValues={{
        fruit: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.fruit}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div className="flex flex-col gap-2">
            <Form>
              <FormikSelectField
                name="fruit"
                items={items}
                label="Fruits"
                labelType="large"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.fruit}</div>
          </div>
        )
      }}
    </Formik>
  )
}

export const Error = () => {
  return (
    <Formik
      initialValues={{
        fruit: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.fruit}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div className="flex flex-col gap-2">
            <Form>
              <FormikSelectField
                name="fruit"
                items={items}
                label="Fruits"
                labelType="large"
                error="Error message"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <FormikSelectField
                name="fruit"
                items={items}
                label="Fruits"
                error="Error message"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.fruit}</div>
          </div>
        )
      }}
    </Formik>
  )
}

export const Tooltip = () => {
  return (
    <Formik
      initialValues={{
        fruit: items[0].value,
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.fruit}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form className="flex flex-col gap-3">
              <FormikSelectField
                required
                name="fruit"
                label="Label"
                tooltip="Tooltip for this input"
                items={items}
              />
              <FormikSelectField
                required
                name="fruit"
                label="Label"
                labelType="large"
                tooltip="Tooltip for this input"
                items={items}
              />
              <FormikSelectField
                required
                name="fruit"
                label="Label"
                labelType="large"
                tooltip="Tooltip for this input"
                error="Error message"
                items={items}
              />
              <Button type="submit" className={{ root: 'w-max' }}>
                Submit
              </Button>
            </Form>
            <div>Value: {values.fruit}</div>
          </div>
        )
      }}
    </Formik>
  )
}

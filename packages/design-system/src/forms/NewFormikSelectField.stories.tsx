import { Form, Formik } from 'formik'
import React from 'react'
import { Button } from '../Button'
import { fruitsValues, groupValues } from '../Select.stories'
import FormikSelectField from './NewFormikSelectField'

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
                items={fruitsValues}
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

export const Groups = () => {
  return (
    <Formik
      initialValues={{
        fruit: groupValues[0].items[0].value,
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
                groups={groupValues}
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
                items={fruitsValues}
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
        fruit: fruitsValues[0].value,
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
                items={fruitsValues}
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
                items={fruitsValues}
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
                items={fruitsValues}
                label="Fruits"
                labelType="large"
                error="Error message"
                placeholder="Select a fruit"
                className={{ root: 'mb-2' }}
              />
              <FormikSelectField
                name="fruit"
                items={fruitsValues}
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
        fruit: fruitsValues[0].value,
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
                items={fruitsValues}
              />
              <FormikSelectField
                required
                name="fruit"
                label="Label"
                labelType="large"
                tooltip="Tooltip for this input"
                items={fruitsValues}
              />
              <FormikSelectField
                required
                name="fruit"
                label="Label"
                labelType="large"
                tooltip="Tooltip for this input"
                error="Error message"
                items={fruitsValues}
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

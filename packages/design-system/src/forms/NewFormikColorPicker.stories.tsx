import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Button from '../Button'
import FormikColorPicker from './NewFormikColorPicker'

export const Default = () => (
  <div>
    <Formik
      initialValues={{
        color: '#FF0000',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(
          `Form submitted with color: ${values.color}. The form will be reset.`
        )
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikColorPicker
                name="color"
                submitText="Save"
                colorLabel="Color"
                className={{ root: 'mb-4' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.color}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Label = () => (
  <div>
    <Formik
      initialValues={{
        color: '#FF0000',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(
          `Form submitted with color: ${values.color}. The form will be reset.`
        )
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikColorPicker
                required
                submitText="Save"
                colorLabel="Color"
                label="Picker"
                tooltip="This is a tooltip"
                name="color"
                className={{ root: 'mb-4' }}
              />
              <FormikColorPicker
                required
                submitText="Save"
                colorLabel="Color"
                label="Picker"
                labelType="large"
                tooltip="This is a tooltip"
                name="color"
                className={{ root: 'mb-4' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.color}</div>
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
        color: '#FF0000',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(
          `Form submitted with color: ${values.color}. The form will be reset.`
        )
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikColorPicker
                disabled
                name="color"
                className={{ root: 'mb-4' }}
                submitText="Save"
                colorLabel="Color"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.color}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const CustomPresets = () => (
  <div>
    <Formik
      initialValues={{
        color: '#FF0000',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(
          `Form submitted with color: ${values.color}. The form will be reset.`
        )
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikColorPicker
                name="color"
                className={{ root: 'mb-4' }}
                presetColors={['#FF0000', '#00FF00', '#0000FF']}
                submitText="Save"
                colorLabel="Color"
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.color}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

export const Validation = () => (
  <div>
    <div>
      The selected color has to be red (#FF0000), otherwise an error will be
      displayed
    </div>
    <Formik
      initialValues={{
        color: '#FF0000',
      }}
      onSubmit={async (values, { resetForm }) => {
        alert(
          `Form submitted with color: ${values.color}. The form will be reset.`
        )
        resetForm()
      }}
      validationSchema={Yup.object().shape({
        color: Yup.string()
          .required()
          .matches(/^#(?:[fF]{2}[0]{4})$/, 'The color has to be red'),
      })}
    >
      {({ values, validateForm }) => {
        return (
          <div>
            <Form>
              <FormikColorPicker
                name="color"
                submitText="Save"
                colorLabel="Color"
                validateForm={validateForm}
                className={{ root: 'mb-4' }}
              />
              <Button type="submit">Submit</Button>
            </Form>
            <div>Value: {values.color}</div>
          </div>
        )
      }}
    </Formik>
  </div>
)

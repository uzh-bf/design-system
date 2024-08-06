import { Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import Button from '../Button'
import FormikSwitchField from './NewFormikSwitchField'

export const Default = () => {
  return (
    <Formik
      initialValues={{
        switch: false,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSwitchField
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
              />
              <Button className={{ root: 'mt-2' }} type="submit">
                Submit
              </Button>
            </Form>
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
        switch: false,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSwitchField
                required
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
              />
              <Button className={{ root: 'mt-2' }} type="submit">
                Submit
              </Button>
            </Form>
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
        switch: false,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSwitchField
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
                tooltip="This is a tooltip"
              />
              <FormikSwitchField
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
                tooltip="This is a tooltip"
                error="Error message"
              />
              <Button className={{ root: 'mt-2' }} type="submit">
                Submit
              </Button>
            </Form>
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
        switch: false,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSwitchField
                required
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
                error="This field is required"
              />
              <Button className={{ root: 'mt-2' }} type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export const Undefined = () => {
  return (
    <Formik
      initialValues={{
        switch: undefined,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSwitchField
                required
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
              />
              <Button className={{ root: 'mt-2' }} type="submit">
                Submit
              </Button>
            </Form>
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
        switch: false,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikSwitchField
                disabled
                required
                name="switch"
                label={values.switch ? 'Checked' : 'Unchecked'}
              />
              <Button className={{ root: 'mt-2' }} type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

export const Sizes = () => {
  return (
    <Formik
      initialValues={{
        switch: false,
      }}
      isInitialValid={false}
      onSubmit={(values) => {
        alert(`Switch value:  ${values.switch}`)
      }}
    >
      {({ values }) => {
        return (
          <Form className="flex flex-col gap-2">
            <FormikSwitchField
              name="switch"
              label={values.switch ? 'Checked' : 'Unchecked'}
              size="sm"
            />
            <FormikSwitchField
              name="switch"
              label={values.switch ? 'Checked' : 'Unchecked'}
              size="md"
            />
            <FormikSwitchField
              name="switch"
              label={values.switch ? 'Checked' : 'Unchecked'}
              size="lg"
            />
            <Button className={{ root: 'mt-2 w-max' }} type="submit">
              Submit
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export const Validation = () => {
  return (
    <div>
      <Formik
        initialValues={{
          switch: false,
        }}
        isInitialValid={false}
        onSubmit={(values) => {
          alert(`Switch value:  ${values.switch}`)
        }}
        validationSchema={yup.object().shape({
          switch: yup
            .boolean()
            .required('Required')
            .equals([true], 'Must be checked'),
        })}
      >
        {({ values, isValid }) => {
          return (
            <div>
              <div>
                This switch is validated to be true and displayes an error
                otherwise (as soon as the field was touched)
              </div>
              <Form>
                <FormikSwitchField
                  name="switch"
                  label={values.switch ? 'Checked' : 'Unchecked'}
                  tooltip="Switch Field Tooltip"
                  required
                />
                <Button
                  disabled={!isValid}
                  className={{ root: 'mt-2' }}
                  type="submit"
                >
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

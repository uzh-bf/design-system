import { Form, Formik } from 'formik'
import * as yup from 'yup'
import Button from '../Button'
import FormikTextareaField from './NewFormikTextareaField'

export const Default = () => (
  <div>
    <div>The default Formik field works with a "name" input</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1 w-96' }}
                placeholder="Placeholder"
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

export const MaxLength = () => (
  <div>
    <div>
      The Formik field works with a "name" input and maximum length (including
      label)
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
                maxLength={20}
                maxLengthUnit="characters"
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
    <div>The default Formik field works with a "name" input</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                disabled
                name="name"
                label="Label"
                tooltip="Tooltip for a disabled text field"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder (disabled field)"
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
    <div>
      By adding a required attribute, the label of the field changes it
      appearance
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                required
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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

export const OnChangeFunction = () => (
  <div>
    <div>
      An alternative version of the text field input allows to work with a
      "value" and "onChange" attribute instead of the "name" attribute. This
      field is modified in a way that whitespaces are removed from the input on
      change.
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                value={values.name}
                onChange={(newValue) => {
                  setFieldValue('name', newValue.replace(/\s/g, ''))
                }}
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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

export const OnChangeError = () => (
  <div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                isTouched
                error="Error message"
                value={values.name}
                onChange={(newValue) => {
                  setFieldValue('name', newValue)
                }}
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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

export const Styled = () => (
  <div>
    <div>The default Formik field works with a "name" input</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{
                  root: 'mb-1 w-1/2',
                  label: 'text-red-500',
                  input: 'bg-uzh-blue-20',
                  error: 'text-red-700',
                }}
                placeholder="Placeholder"
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
    <div>
      This text field should have a maximum length of 10 characters or will
      display an error otherwise.
    </div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
      validationSchema={yup.object().shape({
        name: yup
          .string()
          .required('This field is required')
          .max(10, 'Max 10 characters'),
      })}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                name="name"
                label="Label"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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

export const LargeLabel = () => (
  <div>
    <div>Formik text area component with a large label</div>
    <Formik
      initialValues={{
        name: '',
      }}
      isInitialValid={false}
      onSubmit={async (values, { resetForm }) => {
        alert(`Form submitted with value: ${values.name}`)
        resetForm()
      }}
    >
      {({ values }) => {
        return (
          <div>
            <Form>
              <FormikTextareaField
                required
                name="name"
                label="Label"
                labelType="large"
                tooltip="Tooltip for this input"
                className={{ root: 'mb-1' }}
                placeholder="Placeholder"
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

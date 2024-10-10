import { default as React } from 'react';
import { NumberFieldClassName } from './NumberField';
export interface FormikNumberFieldProps {
    id?: string;
    name: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'normal';
    placeholder?: string;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    hideError?: boolean;
    precision?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        label?: string;
        tooltip?: string;
        error?: string;
        numberField?: NumberFieldClassName;
    };
}
/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param min - The optional min defines the minimum value that is allowed.
 * @param max - The optional max defines the maximum value that is allowed.
 * @param disabled - Disables the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikNumberField({ id, data, name, label, labelType, placeholder, tooltip, required, hideError, precision, min, max, disabled, className, }: FormikNumberFieldProps): import("react/jsx-runtime").JSX.Element;
export default FormikNumberField;

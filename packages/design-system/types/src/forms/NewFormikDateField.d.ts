import { default as React } from 'react';
export interface NewFormikDateFieldProps {
    id?: string;
    name: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        label?: string;
        input?: string;
        error?: string;
        tooltip?: string;
    };
    [key: string]: any;
}
/**
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */
export declare function NewFormikDateField({ id, data, name, label, labelType, placeholder, tooltip, required, hideError, disabled, className, ...props }: NewFormikDateFieldProps): import("react/jsx-runtime").JSX.Element;
export default NewFormikDateField;

import { DateChangerClassName } from '../DateChanger';
export interface FormikDateChangerProps {
    id?: string;
    name: string;
    data?: {
        cy?: string;
        test?: string;
    };
    dataButton?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    tooltip?: string;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        dateChanger?: DateChangerClassName;
    };
}
/**
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the button
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */
export declare function FormikDateChanger({ id, data, dataButton, name, label, tooltip, required, hideError, disabled, className, }: FormikDateChangerProps): import("react/jsx-runtime").JSX.Element;
export default FormikDateChanger;

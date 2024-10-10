import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { default as React } from 'react';
import { DateChangerClassName } from '../DateChanger';
export interface FormikDateChangerProps {
    id?: string;
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    required?: boolean;
    tooltip?: string | React.ReactNode;
    disabled?: boolean;
    hideError?: boolean;
    format?: string;
    editIcon?: IconDefinition;
    validateField?: () => void;
    data?: {
        cy?: string;
        test?: string;
    };
    dataButton?: {
        cy?: string;
        test?: string;
    };
    className?: DateChangerClassName;
}
/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param hideError - Whether the error message should be hidden
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param date - The date to be displayed
 * @param editIcon - The icon to be displayed on the edit button
 * @param validateField - Function to trigger validation of the field under consideration
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the button
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date changer component with optional label, edit button and save button.
 */
declare function FormikDateChanger({ id, name, label, labelType, tooltip, required, disabled, hideError, format, editIcon, validateField, data, dataButton, className, }: FormikDateChangerProps): import("react/jsx-runtime").JSX.Element;
export default FormikDateChanger;

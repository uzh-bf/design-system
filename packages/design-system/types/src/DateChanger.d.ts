import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { default as React } from 'react';
export interface DateChangerClassName {
    root?: string;
    label?: string;
    field?: string;
    input?: string;
    disabled?: string;
    editButton?: string;
    saveButton?: string;
    tooltip?: string;
}
export interface DateChangerProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    dataButton?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    required?: boolean;
    tooltip?: string | React.ReactNode;
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    isTouched?: boolean;
    format?: string;
    edit: boolean;
    date: string;
    onEdit: () => void;
    onSave: (date: string) => void;
    editIcon?: IconDefinition;
    className?: DateChangerClassName;
}
/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the button
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param error - The error message to be displayed
 * @param hideError - Whether the error message should be hidden
 * @param isTouched - Whether the date changer has been touched
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param edit - Whether the date changer is in edit mode or not
 * @param date - The date to be displayed
 * @param onEdit - The function to be called when the edit button is clicked (external state management)
 * @param onSave - The function to be called when the save button is clicked (external state management)
 * @param editIcon - The icon to be displayed on the edit button
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date changer component with optional label, edit button and save button.
 */
export declare function DateChanger({ id, data, dataButton, label, labelType, tooltip, required, disabled, error, hideError, isTouched, format, edit, date, onEdit, onSave, editIcon, className, }: DateChangerProps): import("react/jsx-runtime").JSX.Element;
export default DateChanger;

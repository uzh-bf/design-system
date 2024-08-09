import { FieldInputProps } from 'formik';
import { default as React } from 'react';
interface TextareaFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | React.ReactNode;
    maxLength?: number;
    maxLengthUnit?: string;
    hideMaxLength?: boolean;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    isTouched?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        label?: string;
        input?: string;
        error?: string;
        tooltip?: string;
    };
}
export interface TextareaFieldNameProps extends TextareaFieldProps {
    name: string;
    field: FieldInputProps<any>;
    value?: never;
    onChange?: never;
    [key: string]: any;
}
export interface TextareaFieldOnChangeProps extends TextareaFieldProps {
    name?: never;
    field?: never;
    value: string;
    onChange: (newValue: string) => void;
    [key: string]: any;
}
/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the input field.
 * @param field - The field object from formik.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param maxLength - The optional maxLength is used to limit the number of characters that can be entered in the field.
 * @param maxLengthUnit - This optional label allows to specify a custom label for the maxLength indicator (e.g. "characters left" supporting internationalization).
 * @param hideMaxLength - Indicate whether the maxLength indicator should be hidden or not.
 * @param required - Indicate whether the field is required or not.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is shown below the field.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with optional label, tooltip, error message and icon.
 */
export declare function TextareaField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, maxLength, maxLengthUnit, hideMaxLength, required, isTouched, hideError, error, disabled, className, ...props }: TextareaFieldNameProps | TextareaFieldOnChangeProps): import("react/jsx-runtime").JSX.Element;
export default TextareaField;

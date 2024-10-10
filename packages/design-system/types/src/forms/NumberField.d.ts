import { default as React } from 'react';
export interface NumberFieldClassName {
    field?: string;
    label?: string;
    input?: string;
    error?: string;
    tooltip?: string;
}
export interface NumberFieldProps {
    id?: string;
    value: string | number;
    onChange: (newValue: string) => void;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    precision?: number;
    min?: number;
    max?: number;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    isTouched?: boolean;
    disabled?: boolean;
    onBlur?: () => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: NumberFieldClassName;
    [key: string]: any;
}
/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param min - The optional min defines the minimum value that is allowed.
 * @param max - The optional max defines the maximum value that is allowed.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is displayed below the input field.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onBlur - The onBlur function of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 */
export declare function NumberField({ id, value, onChange, label, labelType, placeholder, precision, min, max, tooltip, required, hideError, error, isTouched, disabled, onBlur, data, className, ...props }: NumberFieldProps): React.ReactElement;
export default NumberField;

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { default as React } from 'react';
interface TextFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'normal';
    icon?: IconDefinition;
    onIconClick?: () => void;
    placeholder?: string;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        icon?: string;
        label?: string;
        input?: string;
        error?: string;
        tooltip?: string;
    };
}
export interface TextFieldWithNameProps extends TextFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    error?: never;
    [key: string]: any;
}
export interface TextFieldWithOnChangeProps extends TextFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    error?: string;
    [key: string]: any;
}
/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param error - The error message that is shown below the field. If a name is provided, this prop will not be used.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param icon - An optional icon (FontAwesomeIcon IconDefinition) that is shown on the right side of the text input component
 * @param onIconClick - An optional function that is called when the icon (previous prop) is clicked
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikTextField({ id, data, name, value, onChange, error, label, labelType, icon, onIconClick, placeholder, tooltip, required, hideError, disabled, className, ...props }: TextFieldWithNameProps | TextFieldWithOnChangeProps): import("react/jsx-runtime").JSX.Element;
export default FormikTextField;

import { default as React } from 'react';
import { SelectClassName, SelectGroup, SelectItem } from '../Select';
interface SelectFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name?: string;
    value: string;
    onChange: (newValue: string) => void;
    onBlur?: () => void;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    contentPosition?: 'item-aligned' | 'popper';
    className?: {
        root?: string;
        label?: string;
        error?: string;
        tooltip?: string;
        select?: SelectClassName;
    };
}
export interface SelectFieldItemsProps extends SelectFieldProps {
    items: SelectItem[];
    groups?: never;
}
export interface SelectFieldGroupsProps extends SelectFieldProps {
    groups: SelectGroup[];
    items?: never;
}
/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field.
 * @param items - The array of items that should be available on the select component.
 * @param groups - The optional groups array can be used to group items in the select component.
 * @param value - The value of the field (external state management).
 * @param onChange - The onChange function of the field (external state management).
 * @param onBlur - The onBlur function of the field (external state management).
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param error - The optional error message is shown next to the component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export declare function SelectField({ id, data, name, items, groups, value, onChange, onBlur, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: SelectFieldItemsProps | SelectFieldGroupsProps): import("react/jsx-runtime").JSX.Element;
export default SelectField;

import { default as React } from 'react';
import { SelectClassName, SelectGroup, SelectItem } from '../Select';
interface FormikSelectFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name: string;
    label?: string;
    labelType?: 'small' | 'normal';
    placeholder?: string;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
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
export interface FormikSelectFieldItemsProps extends FormikSelectFieldProps {
    items: SelectItem[];
    groups?: never;
}
export interface FormikSelectFieldGroupsProps extends FormikSelectFieldProps {
    groups: SelectGroup[];
    items?: never;
}
/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param items - The array of items that should be available on the select component.
 * @param groups - The optional groups array can be used to group items in the select component.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export declare function FormikSelectField({ id, data, name, items, groups, label, labelType, placeholder, tooltip, required, disabled, hideError, contentPosition, className, ...props }: FormikSelectFieldItemsProps | FormikSelectFieldGroupsProps): import("react/jsx-runtime").JSX.Element;
export default FormikSelectField;

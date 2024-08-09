export interface SelectClassName {
    root?: string;
    trigger?: string;
    content?: string;
    item?: string;
    text?: string;
    scrollButton?: string;
    groupLabel?: string;
    separator?: string;
}
interface SelectProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name?: string;
    onChange: (newValue: string) => void;
    onBlur?: () => void;
    value?: string;
    disabled?: boolean;
    size?: 'md' | 'sm';
    className?: SelectClassName;
    placeholder?: string;
    defaultValue?: string;
    basic?: boolean;
    asPortal?: boolean;
    contentPosition?: 'item-aligned' | 'popper';
}
export interface SelectItem {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: string;
    disabled?: boolean;
    label: string;
    shortLabel?: string;
}
export interface SelectGroup {
    label?: string;
    showSeparator?: boolean;
    items: SelectItem[];
}
export interface SelectWithItemsProps extends SelectProps {
    items: SelectItem[];
    groups?: never;
}
export interface SelectWithGroupsProps extends SelectProps {
    groups: SelectGroup[];
    items?: never;
}
/**
 * This function returns a pre-styled Select component based on the RadixUI select component and the custom theme.
 * While the open state of the component is managed internally, the value of the component is managed externally and passed to the function.
 *
 * @param id - The id of the select component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param items - The array of items that are displayed in the select component. This prop is mutually exclusive with the groups prop. If items are provided, the component does not look for groups anymore.
 * @param groups - The array of groups that are displayed in the select component. This prop is mutually exclusive with the items prop.
 * @param name - The name attribute of the select component needed for Formik integration --> see FormikSelectField
 * @param onChange - The function that is called when the value of the select component changes (changes externally managed value).
 * @param onBlur - The function that is called when the viewport of the select component is closed.
 * @param value - The current value of the select component (managed externally).
 * @param defaultValue - The default value of the select component set initially.
 * @param placeholder - The placeholder text that is displayed when no value is selected.
 * @param disabled - Specifies whether the select component is disabled or not.
 * @param size - The size of the select component. Currently only medium and small are supported.
 * @param basic - Specifies whether the select component is basic or not. A basic select component does only have minimal styling of the trigger.
 * @param className - The optional className object allows you to override the default styling.
 * @param asPortal - If true, the select component is rendered as a portal.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @return Select component
 */
export declare function Select({ id, data, items, groups, onChange, onBlur, value, disabled, size, className, name, placeholder, defaultValue, basic, asPortal, contentPosition, }: SelectWithItemsProps | SelectWithGroupsProps): import("react/jsx-runtime").JSX.Element;
export default Select;

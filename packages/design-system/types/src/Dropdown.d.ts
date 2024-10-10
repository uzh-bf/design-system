import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { default as React } from 'react';
interface Item {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label: string | React.ReactNode;
    onClick: () => void;
    shorting?: string;
    selected?: boolean;
}
interface DropdownProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    trigger: string | React.ReactNode;
    triggerIcon?: IconDefinition;
    items?: Item[];
    activeItems?: string[];
    groups?: Item[][];
    className?: {
        trigger?: string;
        triggerDisabled?: string;
        viewport?: string;
        item?: string;
        activeItem?: string;
        group?: string;
        arrow?: string;
    };
    disabled?: boolean;
}
export interface DropdownWithItemsProps extends DropdownProps {
    items: Item[];
    groups?: never;
}
export interface DropdownWithGroupsProps extends DropdownProps {
    items?: never;
    groups: Item[][];
}
/**
 * This function returns a pre-styled Dropdown component based on the RadixUI dropdown component and the custom theme.
 *
 * @param id - The id of the dropdown.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param trigger - The content of the trigger button or a custom trigger component to replace the default button.
 * @param triggerIcon - The icon that is displayed next to the trigger content.
 * @param items - The items that are displayed in the dropdown menu. This attribute should not be set, if groups are used.
 * @param activeItems - List of labels that should be considered active. This attribute has a similar function as the "select" attribute on the item props and should not be used at the same time.
 * @param groups - The groups of items that are displayed in the dropdown menu. This attribute should not be set, if items are used.
 * @param className - The optional className object allows you to override the default styling.
 * @param disabled - Indicate whether the dropdown is disabled or not. Conditional styling is applied, if this is true.
 * @returns Dropdown component
 */
export declare function Dropdown({ id, data, trigger, triggerIcon, items, activeItems, groups, className, disabled, }: DropdownWithItemsProps | DropdownWithGroupsProps): import("react/jsx-runtime").JSX.Element;
export default Dropdown;

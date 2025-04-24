/// <reference types="react" />

import { default as default_2 } from 'react';
import { Dispatch } from 'react';
import { FieldInputProps } from 'formik';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition as IconDefinition_2 } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { PropsWithChildren } from 'react';
import { default as React_2 } from 'react';
import * as React_3 from 'react';
import { ReactNode } from 'react';

export declare interface BaseNavigationButtonProps {
    onClick: React.MouseEventHandler;
    disabled?: boolean;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        label?: string;
        icon?: string;
    };
    style?: {
        root?: React.CSSProperties;
        label?: React.CSSProperties;
        icon?: React.CSSProperties;
    };
}

export declare interface BaseNavigationDropdownProps {
    elements: (NavigationMenuItemProps | NavigationSeparatorProps | NavigationSubmenuProps)[];
    disabled?: boolean;
    active?: boolean;
    notification?: boolean;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        trigger?: string;
        label?: string;
        icon?: string;
        content?: string;
        separator?: string;
    };
    style?: {
        trigger?: React.CSSProperties;
        label?: React.CSSProperties;
        icon?: React.CSSProperties;
        content?: React.CSSProperties;
        separator?: React.CSSProperties;
    };
}

declare interface BaseProgressProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    offset?: number;
    max: number;
    formatter: (value: string | number) => string | default_2.ReactNode;
    isMaxVisible?: boolean;
    noMinWidth?: boolean;
    [x: string]: unknown;
}

declare type BaseRowType = {
    className?: string;
};

/**
 * This function returns a pre-styled Button component based on the custom theme.
 *
 * @param id - The id of the button.
 * @param children - The content of the button.
 * @param onClick - Function that is applied when the button is clicked.
 * @param disabled - Indicate whether the button is disabled or not. Conditional styling is applied, if this is true.
 * @param destructive - Indicate whether the button is destructive or not. Conditional styling is applied, if this is true.
 * @param primary - Indicate whether the button is primary or not. Conditional styling is applied, if this is true.
 * @param active - Indicate whether the button is active or not. Conditional styling is applied, if this is true.
 * @param fluid - Indicate whether the button should be fluid or not. Conditional styling is applied, if this is true.
 * @param basic - This attribute allows to directly remove significant pre-styling and only applies basic styles and functionally required attributes.
 * @param loading - Indicate whether the button is loading or not. Conditional styling / loading symbol is applied, if this is true.
 * @param type - The html type of the button.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @returns Button component
 */
export declare function Button({ id, children, onClick, disabled, primary, destructive, active, fluid, basic, loading, type, className, data, ...props }: ButtonProps): JSX_2.Element;

export declare namespace Button {
    var Icon: ({ icon, withoutLabel, loading, className, }: {
        icon: IconDefinition;
        withoutLabel?: boolean | undefined;
        loading?: boolean | undefined;
        className?: {
            root?: string | undefined;
        } | undefined;
    }) => JSX_2.Element | null;
    var Label: ({ className, children, }: {
        className?: {
            root?: string | undefined;
        } | undefined;
        children: ReactNode;
    }) => JSX_2.Element;
    var IconGroup: ({ state, setState, className, children, }: ButtonIconGroupProps) => JSX_2.Element;
}

export declare interface ButtonIconGroupProps {
    state: number | undefined;
    setState: Dispatch<React.SetStateAction<number | undefined>>;
    className?: {
        root?: string;
        children?: string;
    };
    children: React.ReactNode[];
}

export declare interface ButtonProps {
    id?: string;
    children?: React.ReactNode;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    primary?: boolean;
    destructive?: boolean;
    active?: boolean;
    fluid?: boolean;
    basic?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: {
        root?: string;
        active?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
    [x: string]: unknown;
}

/**
 * This function returns a pre-styled Checkbox component based on the RadixUI Checkbox component and the custom theme.
 * State is not managed internally and needs to be passed to the component through the checked and onCheck props.
 *
 * @param id - The id of the checkbox.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - Optional content of the checkbox that is shown when the checked attribute is true. By default, this is just replaced by a tick symbol.
 * @param checked - Indicate whether the checkbox is checked or not.
 * @param partial - Indicate whether the checkbox is partially checked or not. If the checked attribute is true, it will alwawys override the partial condition simplified logic.
 * @param onCheck - The function that is called when the checkbox is checked or unchecked.
 * @param disabled - Indicate whether the checkbox is disabled or not.
 * @param label - The label of the checkbox.
 * @param size - The size of the checkbox (can be small, medium, large or extra large).
 * @param style - The optional style object allows you to override the default styling.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Checkbox component
 */
export declare function Checkbox({ id, data, children, checked, partial, disabled, label, onCheck, size, style, className, }: CheckboxProps): default_2.ReactElement;

export declare interface CheckboxProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    children?: default_2.ReactNode;
    checked: boolean | 'indeterminate';
    partial?: boolean;
    disabled?: boolean;
    onCheck: () => void;
    label?: string | default_2.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    style?: {
        root?: default_2.CSSProperties;
        label?: default_2.CSSProperties;
    };
    className?: {
        root?: string;
        label?: string;
    };
}

/**
 * This function returns a pre-styled collapsible component based on the RadixUI collapsible component and the implemented theme.
 * State need to be managed by the parent component.
 *
 * @param id - The id of the collapsible.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param open - Indicate whether the collapsible is open or not.
 * @param onChange - Function that is called when the collapsible is toggled.
 * @param staticContent - The static content that is always shown.
 * @param closedContent - The optional content that is only shown when the collapsible is closed.
 * @param customTrigger - The optional custom trigger that is shown instead of the default arrow trigger.
 * @param primary - An optional text that will be displayed on a button in the right bottom corner of the collapsible. Alternatively, it is also possible to pass a React node instead.
 * @param onPrimaryClick - Function that will be called once the primary button is clicked (no function for custom primary nodes)
 * @param secondary - An optional text that will be displayed on a button in the left bottom corner of the collapsible. Alternatively, it is also possible to pass a React node instead.
 * @param onSecondaryClick - Function that will be called once the secondary button is clicked (no function for custom secondary nodes)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the collapsible that is shown when the collapsible is open.
 * @returns Collapsible component
 */
export declare function Collapsible({ id, data, open, onChange, staticContent, closedContent, customTrigger, primary, onPrimaryClick, secondary, onSecondaryClick, className, children, }: CollapsibleProps): JSX_2.Element;

export declare interface CollapsibleProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    open: boolean;
    onChange: () => void;
    staticContent: default_2.ReactNode | string;
    closedContent?: default_2.ReactNode | string;
    customTrigger?: default_2.ReactNode;
    primary?: string | default_2.ReactNode;
    onPrimaryClick?: () => void;
    secondary?: string | default_2.ReactNode;
    onSecondaryClick?: () => void;
    className?: {
        root?: string;
        staticContent?: string;
        closedContent?: string;
        content?: string;
        trigger?: string;
        primary?: string;
        primaryButton?: string;
        secondary?: string;
        secondaryButton?: string;
        bottomWrapper?: string;
    };
    children: default_2.ReactNode;
}

export declare function ColorPicker({ color, label, labelType, required, onSubmit, disabled, triggerIcon, presetColors, position, submitText, colorLabel, tooltip, colorTooltip, error, isTouched, dataTrigger, dataHexInput, dataSubmit, className, }: ColorPickerProps): JSX_2.Element;

export declare interface ColorPickerClassName {
    root?: string;
    pickerRoot?: string;
    label?: string;
    tooltip?: string;
    trigger?: string;
    popover?: string;
    presetButtons?: string;
    inputLabel?: string;
    inputTooltip?: string;
    input?: string;
    abort?: string;
    submit?: string;
}

export declare interface ColorPickerProps {
    color: string;
    label?: string;
    labelType?: 'small' | 'large';
    required?: boolean;
    onSubmit: (newColor: string) => void;
    disabled?: boolean;
    triggerIcon?: IconDefinition;
    presetColors?: string[];
    position?: 'bottom' | 'top' | 'bottom-left' | 'top-left';
    submitText: string;
    colorLabel: string;
    tooltip?: string | React.ReactNode;
    colorTooltip?: string;
    error?: string;
    isTouched?: boolean;
    dataTrigger?: {
        cy?: string;
        test?: string;
    };
    dataHexInput?: {
        cy?: string;
        test?: string;
    };
    dataSubmit?: {
        cy?: string;
        test?: string;
    };
    className?: ColorPickerClassName;
}

export declare type ColumnType<RowType> = {
    className?: string;
    label: string;
    accessor: string;
    sortable?: boolean;
    transformer?: ({ row, ix, }: {
        row: RowType;
        ix?: number;
    }) => string | number | boolean;
    formatter?: ({ row, ix, }: {
        row: RowType;
        ix?: number;
    }) => string | number | default_2.ReactElement;
};

/**
 * This function creates a simple text countdown component (without any additional features or styling)
 *
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param expiresAt - Date when the countdown should expire
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A simple text countdown component
 */
export declare function Countdown({ isStatic, expiresAt, formatter, onExpire, onUpdate, data, className, }: CountdownProps): JSX_2.Element;

export declare interface CountdownProps {
    isStatic?: boolean;
    expiresAt: Date;
    formatter?: (value: number) => string | number | React.ReactNode;
    onExpire?: () => void;
    onUpdate?: (timeRemaining: number) => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
}

/**
 * This function combines the CycleProgress and Countdown components to create a circular progress bar with a countdown in the middle
 *
 * @param expiresAt - Date when the countdown should expire
 * @param totalDuration - Total duration of the countdown in seconds, which is needed to compute the progress in percent
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param overrideSize - Optional override for the size of the progress bar
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param terminalColor - Color of the progress bar when the countdown is expired (total Duration 0 or expiration in the past)
 * @param terminalPercentage - Percentage of the progress bar when the countdown is expired (totalDuration 0 or expiration in the past)
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with a countdown in the middle
 */
export declare function CycleCountdown({ expiresAt, totalDuration, size, overrideSize, color, strokeWidthRem, isStatic, terminalColor, terminalPercentage, formatter, onExpire, onUpdate, data, className, }: CycleCountdownProps): JSX_2.Element;

export declare interface CycleCountdownProps {
    expiresAt: Date;
    totalDuration: number;
    size?: 'sm' | 'md';
    overrideSize?: number;
    color?: string;
    strokeWidthRem?: number;
    isStatic?: boolean;
    terminalColor?: string;
    terminalPercentage?: number;
    formatter?: (value: number) => string | number | React.ReactNode;
    onExpire?: () => void;
    onUpdate?: (timeRemaining: number) => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        countdownWrapper?: string;
        countdown?: string;
    };
}

/**
 * This function create a circular progress bar with custom content in the middle (children)
 *
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param overrideSize - If size adjustments of the relative placement are required due to font changes, this value can be used to override the circle size
 * @param percentage - Percentage of the progress bar (0-100)
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param children - Content of the progress bar, displayed in the center
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with children content in the middle
 */
export declare function CycleProgress({ size, overrideSize, percentage, color, strokeWidthRem, children, data, className, }: CycleProgressProps): JSX_2.Element;

export declare interface CycleProgressProps {
    size?: 'sm' | 'md';
    overrideSize?: number;
    percentage: number;
    color?: string;
    strokeWidthRem?: number;
    children?: default_2.ReactNode;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        children?: string;
    };
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
export declare function DateChanger({ id, data, dataButton, label, labelType, tooltip, required, disabled, error, hideError, isTouched, format, edit, date, onEdit, onSave, editIcon, className, }: DateChangerProps): JSX_2.Element;

export declare interface DateChangerClassName {
    root?: string;
    label?: string;
    field?: string;
    input?: string;
    disabled?: string;
    editButton?: string;
    saveButton?: string;
    tooltip?: string;
}

export declare interface DateChangerProps {
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
    tooltip?: string | default_2.ReactNode;
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
export declare function Dropdown({ id, data, trigger, triggerIcon, items, activeItems, groups, className, disabled, }: DropdownWithItemsProps | DropdownWithGroupsProps): JSX_2.Element;

declare interface DropdownProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    trigger: string | default_2.ReactNode;
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

export declare interface DropdownWithGroupsProps extends DropdownProps {
    items?: never;
    groups: Item[][];
}

export declare interface DropdownWithItemsProps extends DropdownProps {
    items: Item[];
    groups?: never;
}

export declare interface FormatterArgs {
    element: StepItem;
    ix: number;
}

export declare function FormikColorPicker({ name, label, labelType, validateForm, tooltip, required, disabled, triggerIcon, presetColors, position, submitText, colorLabel, colorTooltip, dataTrigger, dataHexInput, dataSubmit, className, }: FormikColorPickerProps): JSX_2.Element;

export declare interface FormikColorPickerProps {
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    validateForm?: () => void;
    tooltip?: string | default_2.ReactNode;
    required?: boolean;
    disabled?: boolean;
    triggerIcon?: IconDefinition_2;
    presetColors?: string[];
    position?: 'bottom' | 'top' | 'bottom-left' | 'top-left';
    submitText: string;
    colorLabel: string;
    colorTooltip?: string;
    dataTrigger?: {
        cy?: string;
        test?: string;
    };
    dataHexInput?: {
        cy?: string;
        test?: string;
    };
    dataSubmit?: {
        cy?: string;
        test?: string;
    };
    className?: ColorPickerClassName;
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
export declare function FormikDateChanger({ id, name, label, labelType, tooltip, required, disabled, hideError, format, editIcon, validateField, data, dataButton, className, }: FormikDateChangerProps): JSX_2.Element;

export declare interface FormikDateChangerProps {
    id?: string;
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    required?: boolean;
    tooltip?: string | default_2.ReactNode;
    disabled?: boolean;
    hideError?: boolean;
    format?: string;
    editIcon?: IconDefinition_2;
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
 * This function returns a date field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param touchedOnChange - Indicate whether the field should be marked as touched on change.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Date field component with Formik state management.
 */
export declare function FormikDateField({ id, data, name, label, labelType, placeholder, tooltip, required, hideError, touchedOnChange, disabled, className, ...props }: FormikDateFieldProps): JSX_2.Element;

export declare interface FormikDateFieldProps {
    id?: string;
    name: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
    required?: boolean;
    hideError?: boolean;
    touchedOnChange?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        label?: string;
        input?: string;
        error?: string;
        tooltip?: string;
    };
    [key: string]: unknown;
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
 * @param unit - The optional unit is shown next to the input field.
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
export declare function FormikNumberField({ id, name, value, onChange, label, labelType, placeholder, precision, min, max, unit, tooltip, required, hideError, error, isTouched, disabled, onBlur, data, className, ...props }: FormikNumberFieldNameProps | FormikNumberFieldOnChangeProps): JSX_2.Element;

export declare interface FormikNumberFieldNameProps extends FormikNumberFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    isTouched?: never;
}

export declare interface FormikNumberFieldOnChangeProps extends FormikNumberFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    isTouched?: boolean;
}

declare interface FormikNumberFieldProps {
    id?: string;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    precision?: number;
    min?: number;
    max?: number;
    unit?: string;
    tooltip?: string | default_2.ReactNode;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    disabled?: boolean;
    onBlur?: () => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: NumberFieldClassName & {
        root?: string;
    };
    [key: string]: unknown;
}

export declare function FormikPinField({ id, name, required, label, labelType, tooltip, className, data, }: FormikPinFieldProps): JSX_2.Element;

export declare interface FormikPinFieldProps {
    id?: string;
    name: string;
    required?: boolean;
    label?: string;
    labelType?: 'small' | 'large';
    tooltip?: string | default_2.ReactNode;
    className?: TextFieldClassName & {
        root?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
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
export declare function FormikSelectField({ id, data, name, items, groups, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: FormikSelectFieldItemsProps | FormikSelectFieldGroupsProps): JSX_2.Element;

export declare interface FormikSelectFieldGroupsProps extends FormikSelectFieldProps {
    groups: SelectGroup[];
    items?: never;
}

export declare interface FormikSelectFieldItemsProps extends FormikSelectFieldProps {
    items: SelectItem[];
    groups?: never;
}

declare interface FormikSelectFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
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

/**
 * This function extends the pre-styled Switch component so that it works as to be expected in a Formik environment.
 * State, in this case, is managed by Formik through the name attribute.
 *
 * @param id - The id of the switch.
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param error - The error message that is shown below the switch.
 * @param hideError - Indicator whether the error message is displayed or not.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param tooltip - The tooltip that is displayed when hovering over the label. Tooltips are only available with the standardLabel setting.
 * @param required - Indicator whether the field is required or not. This is only available with the standardLabel setting.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component with formik state management
 */
export declare function FormikSwitchField({ id, name, data, disabled, error, hideError, label, labelLeft, size, required, tooltip, className, }: FormikSwitchFieldProps): JSX_2.Element;

export declare interface FormikSwitchFieldProps {
    id?: string;
    name: string;
    data?: {
        cy?: string;
        test?: string;
    };
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    label?: string;
    labelLeft?: boolean;
    size?: 'sm' | 'md' | 'lg';
    tooltip?: string | default_2.ReactNode;
    required?: boolean;
    className?: SwitchClassName;
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
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param maxLength - The optional maxLength is shown below the field to indicate the maximum number of characters allowed.
 * @param maxLengthUnit - The optional maxLengthUnit is shown next to the maxLength to indicate the unit of the maximum number of characters allowed.
 * @param hideMaxLength - Indicate whether the maxLength should be hidden or not.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikTextareaField({ id, data, name, value, onChange, error, label, labelType, icon, placeholder, tooltip, required, hideError, disabled, className, ...props }: FormikTextareaFieldWithNameProps | FormikTextareaFieldWithOnChangeProps): JSX_2.Element;

declare interface FormikTextareaFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
    maxLength?: number;
    maxLengthUnit?: string;
    hideMaxLength?: boolean;
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

export declare interface FormikTextareaFieldWithNameProps extends FormikTextareaFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    error?: never;
    [key: string]: unknown;
}

export declare interface FormikTextareaFieldWithOnChangeProps extends FormikTextareaFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    error?: string;
    [key: string]: unknown;
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
 * @param iconPosition - The optional iconPosition can be used to change the position of the icon according to pre-defined standards.
 * @param onIconClick - An optional function that is called when the icon (previous prop) is clicked
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param onPaste - An optional function that is called when the user pastes text into the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikTextField({ id, data, name, value, onChange, error, label, labelType, icon, iconPosition, onIconClick, placeholder, tooltip, required, hideError, isTouched, disabled, onPaste, className, ...props }: FormikTextFieldWithNameProps | FormikTextFieldWithOnChangeProps): JSX_2.Element;

declare interface FormikTextFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    icon?: IconDefinition;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    onPaste?: default_2.ClipboardEventHandler<HTMLInputElement>;
    className?: TextFieldClassName & {
        root?: string;
    };
}

export declare interface FormikTextFieldWithNameProps extends FormikTextFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    error?: never;
    isTouched?: never;
    [key: string]: unknown;
}

export declare interface FormikTextFieldWithOnChangeProps extends FormikTextFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    error?: string;
    isTouched?: boolean;
    [key: string]: unknown;
}

export declare function FormLabel({ id, required, label, labelType, className, tooltip, }: FormLabelProps): JSX_2.Element;

export declare interface FormLabelProps {
    id?: string;
    required: boolean;
    label: string;
    labelType: 'small' | 'large';
    className?: {
        label?: string;
        tooltip?: string;
    };
    tooltip?: string | React.ReactNode;
}

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h1 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H1 component
 */
export declare function H1({ id, data, className, children }: HeaderProps): JSX_2.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h2 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H2 component
 */
export declare function H2({ id, data, className, children }: HeaderProps): JSX_2.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h3 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H3 component
 */
export declare function H3({ id, data, className, children }: HeaderProps): JSX_2.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h4 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H4 component
 */
export declare function H4({ id, data, className, children }: HeaderProps): JSX_2.Element;

declare interface HeaderProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    children: default_2.ReactNode;
}

export declare interface IconOnlyButtonProps extends BaseNavigationButtonProps {
    icon: IconDefinition;
    label?: undefined;
    active?: undefined;
    notification?: undefined;
}

export declare interface IconOnlyDropdownProps extends BaseNavigationDropdownProps {
    label?: undefined;
    icon: IconDefinition;
}

declare interface Item {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label: string | default_2.ReactNode;
    onClick: default_2.MouseEventHandler;
    shorting?: string;
    selected?: boolean;
    icon?: default_2.ReactNode;
    tooltip?: string;
    disabled?: boolean;
    className?: {
        item?: string;
        tooltip?: string;
        label?: string;
        icon?: string;
    };
}

/**
 * This function returns a label component based on the RadixUI label.
 *
 * @param id - The id of the label.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param forId - The id of the element that the label is for.
 * @param label - The text displayed as label.
 * @param required - Indicate whether the field is required or not.
 * @param tooltip - The optional tooltip is shown on hover over the label.
 * @param showTooltipSymbol - Indicate whether the tooltip symbol should be shown or not.
 * @param tooltipSymbolSize - The size of the tooltip symbol.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Label component with optional tooltip and required symbol.
 */
export declare function Label({ id, data, forId, label, required, tooltip, showTooltipSymbol, tooltipSymbolSize, className, }: LabelProps): default_2.ReactElement;

export declare interface LabelOnlyButtonProps extends BaseNavigationButtonProps {
    label: string;
    icon?: IconDefinition;
    active: boolean;
    notification?: boolean;
}

export declare interface LabelOnlyDropdownProps extends BaseNavigationDropdownProps {
    label: string;
    icon?: IconDefinition;
}

export declare interface LabelProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    forId?: string;
    label: string;
    required?: boolean;
    tooltip?: string | default_2.ReactNode;
    showTooltipSymbol?: boolean;
    tooltipSymbolSize?: 'sm' | 'md' | 'lg' | 'xl';
    className?: {
        root?: string;
        tooltip?: string;
        tooltipSymbol?: string;
        arrow?: string;
    };
}

/**
 * This function returns a pre-styled modal component based on the RadixUI dialog component and the custom theme.
 *
 * @param id - The id of the modal.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataOverlay - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the overlay
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the content
 * @param dataCloseButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the close button
 * @param dataNextButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next button
 * @param dataPrevButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous button
 * @param trigger - The optional trigger that opens the modal, if the state is not managed by some parent component already.
 * @param title - The optional title of the modal.
 * @param children - The content of the modal.
 * @param onClose - Function that is called when the modal is closed.
 * @param onPrev - Function that is called when the optional previous button is clicked.
 * @param onNext - Function that is called when the optional next button is clicked.
 * @param open - Indicate whether the modal is open or not. This state is managed outside of the component.
 * @param onOpenChange - Function that is called when the modal is opened or closed.
 * @param fullScreen - Indicate whether the modal should be full screen or not.
 * @param onPrimaryAction - The optional primary action button.
 * @param onSecondaryAction - The optional secondary action button.
 * @param escapeDisabled - Indicate whether the modal should be closed when the escape key is pressed.
 * @param hideCloseButton - Indicate whether the close button should be hidden.
 * @param className - The optional className object allows you to override the default styling.
 * @param asPortal - Whether the contents are rendered in a portal.
 * @returns Modal component
 */
export declare function Modal({ id, data, dataOverlay, dataContent, dataCloseButton, dataNextButton, dataPrevButton, trigger, title, children, onClose, onPrev, onNext, open, onOpenChange, fullScreen, className, onPrimaryAction, onSecondaryAction, escapeDisabled, hideCloseButton, asPortal, }: ModalProps): JSX_2.Element;

export declare interface ModalProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    dataOverlay?: {
        cy?: string;
        test?: string;
    };
    dataContent?: {
        cy?: string;
        test?: string;
    };
    dataCloseButton?: {
        cy?: string;
        test?: string;
    };
    dataNextButton?: {
        cy?: string;
        test?: string;
    };
    dataPrevButton?: {
        cy?: string;
        test?: string;
    };
    className?: {
        overlay?: string;
        content?: string;
        title?: string;
        children?: string;
        onPrev?: string;
        onNext?: string;
    };
    children: default_2.ReactNode;
    fullScreen?: boolean;
    open: boolean;
    title?: string | default_2.ReactNode;
    trigger?: default_2.ReactNode;
    escapeDisabled?: boolean;
    hideCloseButton?: boolean;
    asPortal?: boolean;
    onClose: (e?: default_2.MouseEvent<HTMLButtonElement>) => void;
    onNext?: (e?: default_2.MouseEvent<HTMLButtonElement>) => void;
    onOpenChange?: (e?: default_2.MouseEvent<HTMLButtonElement>) => void;
    onPrev?: (e?: default_2.MouseEvent<HTMLButtonElement>) => void;
    onPrimaryAction?: default_2.ReactNode;
    onSecondaryAction?: default_2.ReactNode;
}

declare interface MultiValueProgressProps extends BaseProgressProps {
    value: number[];
    className?: {
        root?: string;
        background?: string;
        indicator?: string[];
    };
}

/**
 * This function returns a pre-styled navigation component based on the ShadcnUI menubar component.
 * The navigation component can contain multiple items, including buttons and dropdowns, which are
 * defined through a corresponding data structure passed to the function.
 *
 * @param items - The array of items to display in the navigation (required).
 * @param className - The optional className object to override default styling for the root.
 * @return Navigation component
 */
export declare function Navigation({ items, className, style, ...props }: NavigationProps): JSX_2.Element;

export declare type NavigationButtonItemProps = NavigationButtonProps & {
    type: 'button';
    key: string;
};

export declare type NavigationButtonProps = LabelOnlyButtonProps | IconOnlyButtonProps;

export declare type NavigationDropdownItemProps = NavigationDropdownProps & {
    type: 'dropdown';
    key: string;
};

export declare type NavigationDropdownProps = LabelOnlyDropdownProps | IconOnlyDropdownProps;

export declare type NavigationItemProps = NavigationButtonItemProps | NavigationDropdownItemProps;

export declare type NavigationMenuItemProps = {
    key: string;
    type: 'link';
    label: string;
    badge?: string | React.ReactNode;
    onClick: React.MouseEventHandler;
    disabled?: boolean;
    notification?: boolean;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        label?: string;
        text?: string;
        badge?: string;
    };
    style?: {
        label?: React.CSSProperties;
        text?: React.CSSProperties;
        badge?: React.CSSProperties;
    };
};

export declare interface NavigationProps {
    items: NavigationItemProps[];
    className?: {
        root?: string;
    };
    style?: {
        root?: React.CSSProperties;
    };
    [x: string]: unknown;
}

export declare type NavigationSeparatorProps = {
    key: string;
    type: 'separator';
};

export declare type NavigationSubmenuProps = {
    key: string;
    type: 'submenu';
    label: string;
    options: NavigationMenuItemProps[];
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        label?: string;
    };
    style?: {
        label?: React.CSSProperties;
    };
};

/**
 * This function returns a pre-styled wrapper for some custom component with navigation badge on it.
 *
 * @param id - The id of the notification badge wrapper.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param count - The number of notifications to be displayed on the badge. If no count is provided, the badge will be displayed as a simple red notification dot.
 * @param showBadge - If true, the badge will be displayed as a red dot, even if the number notifications is undefined.
 * @param size - The size of the badge (can be small, medium, large or extra large).
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The component the notification badge should be placed on.
 * @returns Notification badge wrapper component
 */
export declare function NotificationBadgeWrapper({ id, data, count, showBadge, size, className, children, }: NotificationBadgeWrapperProps): default_2.ReactElement;

declare interface NotificationBadgeWrapperProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    count?: number;
    showBadge?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: {
        root?: string;
        badge?: string;
    };
    children: default_2.ReactNode;
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
 * @param unit - The optional unit is shown next to the input field.
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
export declare function NumberField({ id, value, onChange, label, labelType, placeholder, precision, min, max, unit, tooltip, required, hideError, error, isTouched, disabled, onBlur, data, className, ...props }: NumberFieldProps): default_2.ReactElement;

export declare interface NumberFieldClassName {
    field?: string;
    label?: string;
    input?: string;
    unit?: string;
    error?: string;
    tooltip?: string;
}

export declare interface NumberFieldProps {
    id?: string;
    value: string | number;
    onChange: (newValue: string) => void;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    precision?: number;
    min?: number;
    max?: number;
    unit?: string;
    tooltip?: string | default_2.ReactNode;
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
    [key: string]: unknown;
}

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value. If multiple values are provided, the indicators are rendered on top of each other (allowing for stacked progress bars).
 * @param offset - The number that determines the offset of the progress bar. The offset is subtracted from the value.
 * @param max - The maximum value of the progress bar.
 * @param formatter - The function that formats the value of the progress bar.
 * @param isMaxVisible - The boolean that determines if the maximum value should be displayed.
 * @param noMinWidth - The boolean that determines if the progress bar should have a minimum width.
 * @param className - The optional className object allows you to override the default styling.
 * @return Progress component
 */
export declare function Progress({ id, data, formatter, value, offset, max, className, isMaxVisible, noMinWidth, ...props }: ProgressProps): JSX_2.Element;

export declare type ProgressProps = SingleValueProgressProps | MultiValueProgressProps;

/**
 * This function returns a pre-styled prose component based on TailwindCSS prose and the custom theme.
 *
 * @param id - The id of the prose component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the prose component.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Children with the standard prose and some custom styling applied to them.
 */
export declare function Prose({ id, data, className, children }: ProseProps): JSX_2.Element;

export declare interface ProseProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    children: default_2.ReactNode;
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
 * @param basic - Specifies whether the select component is basic or not. A basic select component does only have minimal styling of the trigger.
 * @param className - The optional className object allows you to override the default styling.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @return Select component
 */
export declare function Select({ id, data, items, groups, onChange, onBlur, value, disabled, className, name, placeholder, defaultValue, basic, contentPosition, }: SelectWithItemsProps | SelectWithGroupsProps): JSX_2.Element;

export declare interface SelectClassName {
    root?: string;
    trigger?: string;
    content?: string;
    item?: string;
    groupLabel?: string;
    separator?: string;
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
export declare function SelectField({ id, data, name, items, groups, value, onChange, onBlur, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: SelectFieldItemsProps | SelectFieldGroupsProps): JSX_2.Element;

export declare interface SelectFieldGroupsProps extends SelectFieldProps {
    groups: SelectGroup[];
    items?: never;
}

export declare interface SelectFieldItemsProps extends SelectFieldProps {
    items: SelectItem[];
    groups?: never;
}

declare interface SelectFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name?: string;
    value?: string;
    onChange: (newValue: string) => void;
    onBlur?: () => void;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
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

export declare interface SelectGroup {
    label?: string | React.ReactNode;
    showSeparator?: boolean;
    items: SelectItem[];
}

export declare interface SelectItem {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: string;
    disabled?: boolean;
    label: string | React.ReactNode;
    shortLabel?: string;
    icon?: React.ReactNode;
    className?: {
        item?: string;
        tooltip?: string;
        label?: string;
        icon?: string;
    };
    tooltip?: string;
}

declare interface SelectProps {
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
    className?: SelectClassName;
    placeholder?: string;
    defaultValue?: string;
    basic?: boolean;
    contentPosition?: 'item-aligned' | 'popper';
}

export declare interface SelectWithGroupsProps extends SelectProps {
    groups: SelectGroup[];
    items?: never;
}

export declare interface SelectWithItemsProps extends SelectProps {
    items: SelectItem[];
    groups?: never;
}

declare interface SingleValueProgressProps extends BaseProgressProps {
    value: number;
    className?: {
        root?: string;
        background?: string;
        indicator?: string;
    };
}

/**
 * This function returns a pre-styled Slider component based on the RadixUI slider component and the custom theme.
 *
 * @param id - The id of the slider.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the slider. The value should be between the min and max value and is maintained by the parent component.
 * @param defaultValue - The default value of the slider, if the value is undefined
 * @param labels - The labels that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param icons - The icons that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param handleChange - The function that is called when the slider value is changed. The new value is passed as a parameter.
 * @param min - The minimum value of the slider.
 * @param max - The maximum value of the slider.
 * @param step - The step size of the slider.
 * @param disabled - Indicator whether the slider is disabled or not.
 * @param compact - Indicator whether the slider should be shown in a compact formm or not
 * @param rangeColorMap - A map that maps a range of values to colors. The color is used to color the range of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param borderColorMap - A map that maps a range of values to colors. The color is used to color the thumb of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Slider component.
 */
export declare function Slider({ id, value, labels, handleChange, defaultValue, min, max, step, disabled, compact, icons, rangeColorMap, borderColorMap, className, data, dataThumb, }: SliderWithLabelProps | SliderWithIconsProps): default_2.ReactElement;

declare interface SliderProps {
    id?: string;
    value?: number;
    handleChange: (newValue: number) => void;
    defaultValue?: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    compact?: boolean;
    rangeColorMap?: Record<string, string>;
    borderColorMap?: Record<string, string>;
    className?: {
        root?: string;
        icons?: string;
        labels?: string;
        label?: string;
        track?: string;
        range?: string;
        thumb?: string;
        lock?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
    dataThumb?: {
        cy?: string;
        test?: string;
    };
}

export declare interface SliderWithIconsProps extends SliderProps {
    icons: {
        min: default_2.ReactNode;
        mid: default_2.ReactNode;
        max: default_2.ReactNode;
    };
    labels?: never;
}

export declare interface SliderWithLabelProps extends SliderProps {
    labels?: {
        min?: string;
        mid?: string;
        max?: string;
    };
    icons?: never;
}

declare interface StepBaseProps {
    title: string;
    description?: string;
    tooltip?: string;
    tooltipDisabled?: string;
    progress?: number;
    completed?: boolean;
    error?: boolean;
    [x: string]: unknown;
}

export declare interface StepItem {
    [x: string]: string | number | undefined | null;
}

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value.
 * @param max - The maximum value of the progress bar.
 * @param items - The array of items that are displayed in the step progress bar.
 * @param onItemClick - The function that is called when an item is clicked.
 * @param displayOffsetLeft - The number that determines the maximum number of elements that are shown to the left of the current value on the step progress bar.
 * @param displayOffsetRight - The number that determines the maximum number of elements that are shown to the right of the current value on the step progress bar.
 * @param className - The optional className object allows you to override the default styling.
 * @param formatter - The optional formatter function allows you to override the rendering of each item.
 * @return Step progress component
 */
export declare function StepProgress({ id, data, value, max, items, onItemClick, displayOffsetLeft, displayOffsetRight, className, formatter, }: StepProgressProps | StepProgressItemProps): JSX_2.Element;

declare interface StepProgressBaseProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value?: number;
    onItemClick: (ix: number, item?: StepItem) => void;
    displayOffsetLeft?: number;
    displayOffsetRight?: number;
    className?: {
        root?: string;
    };
    formatter?: ({ element, ix }: {
        element: StepItem;
        ix: number;
    }) => {
        className?: string;
        element: default_2.ReactNode;
    };
}

export declare interface StepProgressItemProps extends StepProgressBaseProps {
    max?: never;
    items: StepItem[];
}

export declare interface StepProgressProps extends StepProgressBaseProps {
    max: number;
    items?: never;
}

declare interface StepProgressProps_2 extends StepBaseProps {
    progress?: number;
    completed?: boolean;
    error?: boolean;
}

declare interface StepProps extends StepBaseProps {
    progress?: never;
    completed?: never;
    error?: never;
}

/**
 * This function returns a pre-styled Switch component based on the RadixUI switch component and the custom theme.
 * The state of the switch is maintained by the parent component.
 *
 * @param id - The id of the switch.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param tooltip - The tooltip that is displayed when hovering over the label.
 * @param checked - Indicator whether the switch is checked or not (or indefinite if undefined value). State is managed by the parent component.
 * @param onCheckedChange - The function that is called when the switch is checked or unchecked. The new value is passed as a parameter.
 * @param onBlur - The function that is called when the switch loses focus.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param fluid - Indicator whether the switch should be fluid or not.
 * @param error - The error message that is shown next the switch.
 * @param hideError - Indicator whether the error message should be hidden or not.
 * @param required - Indicator whether the switch is required or not.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component
 */
export declare function Switch({ id, data, disabled, label, tooltip, checked, onCheckedChange, onBlur, fluid, error, hideError, required, labelLeft, size, className, }: SwitchProps): JSX_2.Element;

export declare interface SwitchClassName {
    root?: string;
    element?: string;
    thumb?: string;
    label?: string;
    tooltip?: string;
}

export declare interface SwitchProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    checked?: boolean;
    onCheckedChange: (newValue: boolean) => void;
    onBlur?: () => void;
    disabled?: boolean;
    label?: string;
    tooltip?: string | default_2.ReactNode;
    fluid?: boolean;
    error?: string;
    hideError?: boolean;
    required?: boolean;
    labelLeft?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: SwitchClassName;
}

/**
 * This function returns a pre-styled Tab trigger component to be used inside a Tabs.Tablist.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param id - The id of the tab.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the tab. This is required for the internal and external state.
 * @param label - The label of the tab.
 * @param children - A child component of the tab header, which can optionally replace the label
 * @param disabled - The optional disabled property allows you to disable the tab.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tab trigger component
 */
export declare function Tab({ id, data, value, label, children, disabled, className, }: TabPropsWithLabel_2 | TabPropsWithChildren_2): JSX_2.Element;

/**
 * This function returns a pre-styled Tab trigger component to be used inside a Tabs.Tablist.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param id - The id of the tab.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the tab. This is required for the internal and external state.
 * @param label - The label of the tab.
 * @param children - A child component of the tab header, which can optionally replace the label
 * @param disabled - The optional disabled property allows you to disable the tab.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tab trigger component
 */
declare function Tab_2({
    id,
    data,
    value,
    label,
    children,
    disabled,
    className,
}: TabPropsWithLabel | TabPropsWithChildren) {
    return (
    <TabsPrimitive.Trigger
    id={id}
    data-cy={data?.cy}
    data-test={data?.test}
    value={value}
    className={twMerge(
        'group flex-1 border-b border-r border-gray-300 px-3 py-2.5 first:rounded-tl-lg last:rounded-tr-lg last:border-r-0',
        'rdx-state-active:border-b-slate-600 focus-visible:rdx-state-active:border-b-transparent rdx-state-inactive:bg-gray-50 hover:rdx-state-inactive:bg-gray-200',
        'focus:rdx-state-active:border-b-red focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
        className?.root
        )}
    disabled={disabled}
    >
    <span
    className={twMerge(
        'text-sm font-medium text-gray-700',
        className?.label
        )}
    >
        {label ?? children}
    </span>
    </TabsPrimitive.Trigger>
    )
}

/**
 * This function returns a pre-styled TabContent component to be used inside a Tabs component.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param id The id of the tab content.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value The value of the tab. This is required for the internal and external state.
 * @param children The content of the tab should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tab Content component
 */
export declare function TabContent({ id, data, value, children, className, }: PropsWithChildren<TabContentProps_2>): JSX_2.Element;

/**
 * This function returns a pre-styled TabContent component to be used inside a Tabs component.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param id The id of the tab content.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value The value of the tab. This is required for the internal and external state.
 * @param children The content of the tab should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tab Content component
 */
declare function TabContent_2({
    id,
    data,
    value,
    children,
    className,
}: PropsWithChildren<TabContentProps>) {
    return (
    <TabsPrimitive.Content
    id={id}
    data-cy={data?.cy}
    data-test={data?.test}
    value={value}
    className={twMerge('rounded-t-lg bg-white py-4 md:px-6', className?.root)}
    >
        {children}
    </TabsPrimitive.Content>
    )
}

declare interface TabContentProps {
    id?: string
    data?: {
        cy?: string
        test?: string
    }
    value: string
    className?: {
        root?: string
    }
}

declare interface TabContentProps_2 {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: string;
    className?: {
        root?: string;
    };
}

/**
 * This function returns a pre-styled Table component based on the RadixUI table component and the custom theme.
 * The table is sortable by clicking on the column header.
 * Before the table is being sorted according to the sorting parameters, the transformer will be applied to the data.
 * The formatter is meant to be used for visual modifications of the fields and applied after sorting.
 *
 * @param id - The id of the table.
 * @param dataAttributes - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param columns - The columns of the table. The columns are defined by an array of objects where each object has a label, an accessor and optional transformer and formatters.
 * @param data - The data of the table. The data is defined by an array of objects where each object has a key-value pair for each column.
 * @param caption - The optional caption of the table.
 * @param ref - The optional ref object allows you to access the table methods.
 * @param className - The optional className object allows you to override the default styling.
 * @param forwardedRef - The optional forwardedRef object allows you to access table methods from the parent component.
 * @param emptyCellText - The optional emptyCellText allows you to define the text that should be displayed in empty cells.
 * @param defaultSortField - The optional defaultSortField allows you to define the default sorting field.
 * @param defaultSortOrder - The optional defaultSortOrder allows you to define the default sorting order.
 * @returns Table component
 */
export declare function Table<RowType extends Record<string, string | number | boolean>>({ id, dataAttributes, columns, data, caption, className, forwardedRef, emptyCellText, defaultSortField, defaultSortOrder, }: TableProps<RowType>): JSX_2.Element;

export declare interface TableProps<RowType extends BaseRowType> {
    id?: string;
    dataAttributes?: {
        cy?: string;
        test?: string;
    };
    columns: ColumnType<RowType>[];
    data: RowType[];
    caption?: string;
    className?: {
        root?: string;
        tableHeader?: string;
        body?: string;
        row?: string;
    };
    forwardedRef?: default_2.Ref<unknown>;
    emptyCellText?: string;
    defaultSortField?: string;
    defaultSortOrder?: 'asc' | 'desc';
}

/**
 * This function returns a pre-styled TabList component to be used inside a Tabs component.
 *
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children The tab triggers should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns TabList component
 */
export declare function TabList({ id, data, children, className, }: PropsWithChildren<TabListProps_2>): JSX_2.Element;

/**
 * This function returns a pre-styled TabList component to be used inside a Tabs component.
 *
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children The tab triggers should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns TabList component
 */
declare function TabList_2({
    id,
    data,
    children,
    className,
}: PropsWithChildren<TabListProps>) {
    return (
    <TabsPrimitive.List
    id={id}
    data-cy={data?.cy}
    data-test={data?.test}
    className={twMerge(
        'flex w-full flex-col rounded-t-lg bg-white md:flex-row',
        className?.root
        )}
    >
        {children}
    </TabsPrimitive.List>
    )
}

declare interface TabListProps {
    id?: string
    data?: {
        cy?: string
        test?: string
    }
    className?: {
        root?: string
    }
}

declare interface TabListProps_2 {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
}

declare interface TabProps {
    id?: string
    data?: {
        cy?: string
        test?: string
    }
    value: string
    label?: string
    children?: React_2.ReactNode
    disabled?: boolean
    className?: {
        root?: string
        label?: string
        disabled?: string
    }
}

declare interface TabProps_2 {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: string;
    label?: string;
    children?: default_2.ReactNode;
    disabled?: boolean;
    className?: {
        root?: string;
        label?: string;
        disabled?: string;
    };
}

declare interface TabPropsWithChildren extends TabProps {
    label?: never
    children: React_2.ReactNode
}

declare interface TabPropsWithChildren_2 extends TabProps_2 {
    label?: never;
    children: default_2.ReactNode;
}

declare interface TabPropsWithLabel extends TabProps {
    label: string
    children?: never
}

declare interface TabPropsWithLabel_2 extends TabProps_2 {
    label: string;
    children?: never;
}

/**
 * This function returns a pre-styled TabList component based on the RadixUI TabList component and the custom theme.
 * The active tab / component state can be either controlled internally or controlled through the parent component.
 *
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param defaultValue The default value of the tab that is active when the component is initially rendered.
 * @param value The value of the tab that is active. This value is required, if the state is controlled by the parent component.
 * @param onValueChange The function that is called when the active tab is changed. The new value is passed as a parameter. This function is required, if the state is controlled by the parent component.
 * @param children The tab list and content should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tabs wrapper component
 */
export declare function Tabs({ id, data, defaultValue, value, children, onValueChange, className, }: PropsWithChildren<TabsProps>): JSX_2.Element;

export declare namespace Tabs {
    var Tab: Tab_2;
    var TabList: TabList_2;
    var TabContent: TabContent_2;
}

declare interface TabsProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    defaultValue: string;
    value?: string;
    onValueChange?: (newValue: string) => void;
    className?: {
        root?: string;
    };
}

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export declare function Tag({ id, data, className, label }: TagProps): JSX_2.Element;

export declare interface TagProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    label: string;
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
export declare function TextareaField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, maxLength, maxLengthUnit, hideMaxLength, required, isTouched, hideError, error, disabled, className, ...props }: TextareaFieldNameProps | TextareaFieldOnChangeProps): JSX_2.Element;

export declare interface TextareaFieldNameProps extends TextareaFieldProps {
    name: string;
    field: FieldInputProps<string>;
    value?: never;
    onChange?: never;
    [key: string]: unknown;
}

export declare interface TextareaFieldOnChangeProps extends TextareaFieldProps {
    name?: never;
    field?: never;
    value: string;
    onChange: (newValue: string) => void;
    [key: string]: unknown;
}

declare interface TextareaFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
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
 * @param required - Indicate whether the field is required or not.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is shown below the field.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onPaste - The optional onPaste function is called when the user pastes text into the input field.
 * @param className - The optional className object allows you to override the default styling.
 * @param icon - The optional icon is shown on the right side of the input field.
 * @param iconPosition - The optional iconPosition can be used to change the position of the icon to the left side of the input field.
 * @param onIconClick - The optional onIconClick function is called when the icon is clicked.
 * @returns Text field component with optional label, tooltip, error message and icon.
 */
export declare function TextField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, required, isTouched, hideError, error, disabled, onPaste, className, icon, iconPosition, onIconClick, ...props }: TextFieldNameProps | TextFieldOnChangeProps): JSX_2.Element;

export declare interface TextFieldClassName {
    field?: string;
    label?: string;
    input?: string;
    error?: string;
    tooltip?: string;
    icon?: string;
}

export declare interface TextFieldNameProps extends TextFieldProps {
    name: string;
    field: FieldInputProps<string>;
    value?: never;
    onChange?: never;
    [key: string]: unknown;
}

export declare interface TextFieldOnChangeProps extends TextFieldProps {
    name?: never;
    field?: never;
    value: string;
    onChange: (newValue: string) => void;
    [key: string]: unknown;
}

declare interface TextFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_2.ReactNode;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    isTouched?: boolean;
    disabled?: boolean;
    onPaste?: default_2.ClipboardEventHandler<HTMLInputElement>;
    className?: TextFieldClassName;
    icon?: IconProp;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
}

export declare function Toast({ title, description, duration, dismissible, triggerText, actionText, actionOnClick, position, openExternal, onCloseExternal, type, children, data, className, }: ToastPropsWithTitleTrigger | ToastPropsWithTitleNoTrigger | ToastPropsWithChildrenTrigger | ToastPropsWithChildrenNoTrigger): React_3.ReactElement;

declare interface ToastProps {
    title?: string;
    description?: string;
    duration?: number;
    dismissible?: boolean;
    triggerText?: string;
    actionText?: string;
    actionOnClick?: () => void;
    position?: string;
    openExternal?: boolean;
    onCloseExternal?: () => void;
    type?: 'default' | 'success' | 'warning' | 'error';
    children?: React_3.ReactNode;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        viewport?: string;
        trigger?: string;
        title?: string;
        description?: string;
        children?: string;
        action?: string;
    };
}

declare interface ToastPropsWithChildren extends ToastProps {
    title?: never;
    description?: never;
    children: React_3.ReactNode;
}

export declare interface ToastPropsWithChildrenNoTrigger extends ToastPropsWithChildren {
    triggerText?: never;
    openExternal: boolean;
    onCloseExternal: () => void;
}

export declare interface ToastPropsWithChildrenTrigger extends ToastPropsWithChildren {
    triggerText: string;
    openExternal?: never;
    onCloseExternal?: never;
}

declare interface ToastPropsWithTitle extends ToastProps {
    title: string;
    description?: string;
    children?: never;
}

export declare interface ToastPropsWithTitleNoTrigger extends ToastPropsWithTitle {
    triggerText?: never;
    openExternal: boolean;
    onCloseExternal: () => void;
}

export declare interface ToastPropsWithTitleTrigger extends ToastPropsWithTitle {
    triggerText: string;
    openExternal?: never;
    onCloseExternal?: never;
}

/**
 * This function returns a pre-styled Tooltip component based on the RadixUI tooltip component and the custom theme.
 *
 * @param id - The id of the tooltip.
 * @param contentId - The id of the tooltip content.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) of the content
 * @param tooltip - The content of the tooltip.
 * @param delay - The delay in milliseconds before the tooltip is shown.
 * @param withIndicator - Determines whether the tooltip should have a small indicator or not.
 * @param children - The child component that triggers the tooltip.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tooltip component
 */
export declare function Tooltip({ id, contentId, data, dataContent, tooltip, delay, withIndicator, children, className, }: TooltipProps): default_2.ReactElement;

export declare interface TooltipProps {
    id?: string;
    contentId?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    dataContent?: {
        cy?: string;
        test?: string;
    };
    tooltip: default_2.ReactNode | string;
    delay?: number;
    withIndicator?: boolean;
    children: default_2.ReactNode;
    className?: {
        tooltip?: string;
        trigger?: string;
        arrow?: string;
    };
}

export declare function useArrowNavigation({ onArrowLeft, onArrowRight, onArrowUp, onArrowDown, }: useArrowNavigationProps): void;

export declare interface useArrowNavigationProps {
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
}

/**
 * This function returns a pre-styled UserNotification component based on the custom theme.
 *
 * @param id - The id of the notification.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param message - The message that is displayed in the notification.
 * @param type - The type of the notification. This can be either 'success', 'info' or 'error'. This determines the icon that is displayed and some conditional styling. If not type is provided, the information icon is displayed.
 * @param children - The optional children are displayed in the notification in addition to the provided message icon.
 * @param className - The optional className object allows you to override the default styling.
 * @returns UserNotification component
 */
export declare function UserNotification({ id, data, message, type, children, className, }: UserNotificationMessageProps | UserNotificationChildrenProps): JSX_2.Element;

export declare interface UserNotificationChildrenProps extends UserNotificationProps {
    message?: never;
    children: default_2.ReactNode;
}

export declare interface UserNotificationMessageProps extends UserNotificationProps {
    message: string;
    children?: default_2.ReactNode;
}

export declare interface UserNotificationProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    message?: string;
    type?: 'default' | 'info' | 'success' | 'warning' | 'error';
    children?: default_2.ReactNode;
    className?: {
        root?: string;
        icon?: string;
        message?: string;
        content?: string;
    };
}

/**
 * This function returns a pre-styled Workflow component. Theme-based styling is not available for this component at the moment, use the twStyles or className objects instead to override default styling.
 *
 * @param items - The array of steps that should be displayed in the workflow.
 * @param onClick - The function that is called when a step is clicked. The step object is passed as an argument.
 * @param activeIx - The index of the active step. State management is not handled by this component.
 * @param twStyles - The optional twStyles object allows you to override the default styling.
 * @param minimal - The optional minimal boolean allows you to render the workflow with minimal space requirements.
 * @param disabledFrom - The optional disabledFrom number allows you to disable steps from a certain index onwards.
 * @param showTooltipSymbols - The optional showTooltipSymbols boolean allows you to show the tooltip symbols.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Workflow component
 */
export declare function Workflow({ items, onClick, activeIx, twStyles, minimal, disabledFrom, showTooltipSymbols, className, }: WorkflowProps | WorkflowProgressProps): JSX_2.Element;

declare interface WorkflowBaseProps {
    activeIx?: number;
    twStyles?: {
        bgHover: string;
        bgActive: string;
        bgPast: string;
    };
    minimal?: boolean;
    disabledFrom?: number;
    showTooltipSymbols?: boolean;
    className?: {
        root?: string;
        item?: string;
        active?: string;
        past?: string;
        title?: string;
        description?: string;
    };
}

export declare function WorkflowItem({ item, ix, hasDescription, minimal, activeIx, disabled, tooltip, showTooltipSymbols, onClick, numItems, twStyles, className, }: WorkflowItemProps): JSX_2.Element;

declare interface WorkflowItemProps {
    item: StepProps | StepProgressProps_2;
    onClick: (item: StepProps | StepProgressProps_2, ix: number) => void;
    ix: number;
    hasDescription: boolean;
    minimal: boolean;
    activeIx?: number;
    disabled: boolean;
    tooltip?: string;
    showTooltipSymbols?: boolean;
    numItems: number;
    twStyles: {
        bgHover: string;
        bgActive: string;
        bgPast: string;
    };
    className?: {
        root?: string;
        item?: string;
        active?: string;
        past?: string;
        title?: string;
        description?: string;
    };
}

export declare interface WorkflowProgressProps extends WorkflowBaseProps {
    activeIx?: number;
    items: StepProgressProps_2[];
    onClick: (item: StepProps | StepProgressProps_2, ix: number) => void;
}

export declare interface WorkflowProps extends WorkflowBaseProps {
    activeIx: number;
    items: StepProps[];
    onClick: (item: StepProps | StepProgressProps_2, ix: number) => void;
}

export { }


declare namespace Tabs {
    var Tab: typeof import("@/Tabs").Tab;
    var TabList: typeof import("@/Tabs").TabList;
    var TabContent: typeof import("@/Tabs").TabContent;
}


declare namespace Calendar {
    var displayName: string;
}

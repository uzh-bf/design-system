import { default as React } from 'react';
export interface SwitchClassName {
    root?: string;
    element?: string;
    thumb?: string;
    label?: string;
}
export interface SwitchProps {
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
    tooltip?: string | React.ReactNode;
    fluid?: boolean;
    error?: string;
    hideError?: boolean;
    required?: boolean;
    labelLeft?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: SwitchClassName;
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
export declare function Switch({ id, data, disabled, label, tooltip, checked, onCheckedChange, onBlur, fluid, error, hideError, required, labelLeft, size, className, }: SwitchProps): import("react/jsx-runtime").JSX.Element;
export default Switch;

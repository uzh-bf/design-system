import { default as React } from 'react';
export interface CheckboxProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    children?: React.ReactNode;
    checked: boolean | 'indeterminate';
    partial?: boolean;
    disabled?: boolean;
    onCheck: () => void;
    label?: string | React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: {
        root?: string;
        label?: string;
    };
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
 * @param className - The optional className object allows you to override the default styling.
 * @returns Checkbox component
 */
export declare function Checkbox({ id, data, children, checked, partial, disabled, label, onCheck, size, className, }: CheckboxProps): React.ReactElement;
export default Checkbox;

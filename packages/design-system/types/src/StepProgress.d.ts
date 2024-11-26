import { default as React } from 'react';
export interface FormatterArgs {
    element: StepItem;
    ix: number;
}
export interface StepItem {
    [x: string]: any;
}
interface StepProgressBaseProps {
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
        element: React.ReactNode;
    };
}
export interface StepProgressProps extends StepProgressBaseProps {
    max: number;
    items?: never;
}
export interface StepProgressItemProps extends StepProgressBaseProps {
    max?: never;
    items: StepItem[];
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
export declare function StepProgress({ id, data, value, max, items, onItemClick, displayOffsetLeft, displayOffsetRight, className, formatter, }: StepProgressProps | StepProgressItemProps): import("react/jsx-runtime").JSX.Element;
export default StepProgress;

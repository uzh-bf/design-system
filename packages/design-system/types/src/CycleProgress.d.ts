import { default as React } from 'react';
export interface CycleProgressProps {
    size?: 'sm' | 'md';
    overrideSize?: number;
    percentage: number;
    color?: string;
    strokeWidthRem?: number;
    children?: React.ReactNode;
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
export declare function CycleProgress({ size, overrideSize, percentage, color, strokeWidthRem, children, data, className, }: CycleProgressProps): import("react/jsx-runtime").JSX.Element;
export default CycleProgress;

import { default as React } from 'react';
export interface TooltipProps {
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
    tooltip: React.ReactNode | string;
    delay?: number;
    withIndicator?: boolean;
    children: React.ReactNode;
    className?: {
        tooltip?: string;
        trigger?: string;
        arrow?: string;
    };
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
export declare function Tooltip({ id, contentId, data, dataContent, tooltip, delay, withIndicator, children, className, }: TooltipProps): React.ReactElement;
export default Tooltip;

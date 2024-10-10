import { default as React } from 'react';
export interface LabelProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    forId?: string;
    label: string;
    required?: boolean;
    tooltip?: string | React.ReactNode;
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
export declare function Label({ id, data, forId, label, required, tooltip, showTooltipSymbol, tooltipSymbolSize, className, }: LabelProps): React.ReactElement;
export default Label;

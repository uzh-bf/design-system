import { default as React } from 'react';
export interface CollapsibleProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    open: boolean;
    onChange: () => void;
    staticContent: React.ReactNode | string;
    closedContent?: React.ReactNode | string;
    customTrigger?: React.ReactNode;
    primary?: string | React.ReactNode;
    onPrimaryClick?: () => void;
    secondary?: string | React.ReactNode;
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
    children: React.ReactNode;
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
export declare function Collapsible({ id, data, open, onChange, staticContent, closedContent, customTrigger, primary, onPrimaryClick, secondary, onSecondaryClick, className, children, }: CollapsibleProps): import("react/jsx-runtime").JSX.Element;
export default Collapsible;

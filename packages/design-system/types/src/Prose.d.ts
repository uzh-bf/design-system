import { default as React } from 'react';
export interface ProseProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    children: React.ReactNode;
}
/**
 * This function returns a pre-styled prose component based on TailwindCSS prose and the custom theme.
 *
 * @param id - The id of the prose component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the prose component.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Children with the standard prose and some custom styling applied to them.
 */
export declare function Prose({ id, data, className, children }: ProseProps): import("react/jsx-runtime").JSX.Element;
export default Prose;

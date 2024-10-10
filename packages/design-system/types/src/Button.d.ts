import { default as React, Dispatch } from 'react';
export interface ButtonProps {
    id?: string;
    active?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    fluid?: boolean;
    basic?: boolean;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
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
 * This function returns a pre-styled Button component based on the custom theme.
 *
 * @param id - The id of the button.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the button.
 * @param active - Indicate whether the button is active or not. Conditional styling is applied, if this is true.
 * @param disabled - Indicate whether the button is disabled or not. Conditional styling is applied, if this is true.
 * @param fluid - Indicate whether the button should be fluid or not. Conditional styling is applied, if this is true.
 * @param basic - This attribute allows to directly remove significant pre-styling and only applies basic styles and functionally required attributes.
 * @param type - The html type of the button.
 * @param loading - Indicate whether the button is loading or not. Conditional styling / loading symbol is applied, if this is true.
 * @param onClick - Function that is applied when the button is clicked.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Button component
 */
export declare function Button({ id, children, onClick, disabled, active, fluid, basic, loading, type, className, data, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Button {
    var Icon: ({ className, children, }: {
        className?: {
            root?: string | undefined;
        } | undefined;
        children: React.ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
    var Label: ({ className, children, }: {
        className?: {
            root?: string | undefined;
        } | undefined;
        children: React.ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
    var IconGroup: ({ state, setState, className, children, }: ButtonIconGroupProps) => import("react/jsx-runtime").JSX.Element;
}
export interface ButtonIconGroupProps {
    state: number | undefined;
    setState: Dispatch<React.SetStateAction<number | undefined>>;
    className?: {
        root?: string;
        children?: string;
    };
    children: React.ReactNode[];
}
export default Button;

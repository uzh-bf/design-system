import { default as React } from 'react';
interface HeaderProps {
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
 * This function returns a pre-styled header component with custom font similarly sized to the default h1 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H1 component
 */
export declare function H1({ id, data, className, children }: HeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h2 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H2 component
 */
export declare function H2({ id, data, className, children }: HeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h3 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H3 component
 */
export declare function H3({ id, data, className, children }: HeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h4 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H4 component
 */
export declare function H4({ id, data, className, children }: HeaderProps): import("react/jsx-runtime").JSX.Element;
/**
 * This function returns a pre-styled header component with custom font similarly sized to the chosen h* tag.
 */
declare const Header: {
    H1: typeof H1;
    H2: typeof H2;
    H3: typeof H3;
    H4: typeof H4;
};
export default Header;

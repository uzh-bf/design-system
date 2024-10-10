import { default as React } from 'react';
export interface NavigationProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    children: React.ReactNode;
    className?: {
        root?: string;
        indicator?: string;
        viewport?: string;
    };
    style?: {
        root?: React.CSSProperties;
        indicator?: React.CSSProperties;
        viewport?: React.CSSProperties;
    };
}
/**
 * This function returns a pre-styled Navigation component based on the RadixUI navigation component and the custom theme.
 *
 * @param id - The id of the navigation.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the navigation. Children should be subcomponents of the Navigation component like TriggerItem / ButtonItem / CustomItem for the correct functionality.
 * @param className - The optional className object allows you to override the default styling.
 * @param style - The optional style object allows you to override the default styling using CSS key-value styles.
 * @returns Navigation component
 */
export declare function Navigation({ id, data, children, className, style, }: NavigationProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Navigation {
    var TriggerItem: ({ id, data, label, icon, dropdownWidth, children, disabled, className, style, }: TriggerIconProps | TriggerLabelProps) => import("react/jsx-runtime").JSX.Element;
    var DropdownItem: ({ id, data, title, href, onClick, subtitle, icon, className, style, }: DropdownItemWithHrefProps | DropdownItemWithOnClickProps) => import("react/jsx-runtime").JSX.Element;
    var ButtonItem: ({ id, data, label, disabled, icon, href, onClick, className, style, }: ButtonItemWithHrefProps | ButtonItemWithOnClickProps) => import("react/jsx-runtime").JSX.Element;
    var IconItem: ({ id, data, icon, disabled, href, onClick, className, style, }: IconItemWithHrefProps | IconItemWithOnClickProps) => import("react/jsx-runtime").JSX.Element;
    var CustomItem: ({ id, data, children, className, style, }: CustomItemProps) => import("react/jsx-runtime").JSX.Element;
}
interface TriggerProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    dropdownWidth: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: {
        root?: string;
        label?: string;
        icon?: string;
        dropdown?: string;
        disabled?: string;
    };
    style?: {
        root?: React.CSSProperties;
        label?: React.CSSProperties;
        icon?: React.CSSProperties;
        dropdown?: React.CSSProperties;
        disabled?: React.CSSProperties;
    };
}
export interface TriggerIconProps extends TriggerProps {
    icon: React.ReactNode;
    label?: never;
}
export interface TriggerLabelProps extends TriggerProps {
    label: string;
    icon?: React.ReactNode;
}
interface DropdownItemProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    className?: {
        root?: string;
        title?: string;
        icon?: string;
        subtitle?: string;
    };
    style?: {
        root?: React.CSSProperties;
        title?: React.CSSProperties;
        icon?: React.CSSProperties;
        subtitle?: React.CSSProperties;
    };
}
export interface DropdownItemWithHrefProps extends DropdownItemProps {
    href: string;
    onClick?: never;
}
export interface DropdownItemWithOnClickProps extends DropdownItemProps {
    href?: never;
    onClick: React.MouseEventHandler;
}
interface ButtonItemProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    className?: {
        root?: string;
        label?: string;
        icon?: string;
        disabled?: string;
    };
    style?: {
        root?: React.CSSProperties;
        label?: React.CSSProperties;
        icon?: React.CSSProperties;
        disabled?: React.CSSProperties;
    };
}
export interface ButtonItemWithHrefProps extends ButtonItemProps {
    href: string;
    onClick?: never;
}
export interface ButtonItemWithOnClickProps extends ButtonItemProps {
    href?: never;
    onClick: React.MouseEventHandler;
}
interface IconItemProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    icon: React.ReactNode;
    disabled?: boolean;
    className?: {
        root?: string;
        disabled?: string;
    };
    style?: {
        root?: React.CSSProperties;
        disabled?: React.CSSProperties;
    };
}
export interface IconItemWithHrefProps extends IconItemProps {
    href: string;
    onClick?: never;
}
export interface IconItemWithOnClickProps extends IconItemProps {
    href?: never;
    onClick: React.MouseEventHandler;
}
type CustomItemProps = {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    children: React.ReactNode;
    className?: {
        root?: string;
    };
    style?: {
        root?: React.CSSProperties;
    };
};
export default Navigation;

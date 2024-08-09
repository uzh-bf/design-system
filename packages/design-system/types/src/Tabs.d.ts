import { default as React, PropsWithChildren } from 'react';
interface TabProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    key?: string;
    value: string;
    label?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    className?: {
        root?: string;
        label?: string;
        disabled?: string;
    };
}
interface TabPropsWithLabel extends TabProps {
    label: string;
    children?: never;
}
interface TabPropsWithChildren extends TabProps {
    label?: never;
    children: React.ReactNode;
}
/**
 * This function returns a pre-styled Tab trigger component to be used inside a Tabs.Tablist.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param id - The id of the tab.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param key - The key of the tab.
 * @param value - The value of the tab. This is required for the internal and external state.
 * @param label - The label of the tab.
 * @param children - A child component of the tab header, which can optionally replace the label
 * @param disabled - The optional disabled property allows you to disable the tab.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tab trigger component
 */
export declare function Tab({ id, data, key, value, label, children, disabled, className, }: TabPropsWithLabel | TabPropsWithChildren): import("react/jsx-runtime").JSX.Element;
interface TabListProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
}
/**
 * This function returns a pre-styled TabList component to be used inside a Tabs component.
 *
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children The tab triggers should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns TabList component
 */
export declare function TabList({ id, data, children, className, }: PropsWithChildren<TabListProps>): import("react/jsx-runtime").JSX.Element;
interface TabContentProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    key: string;
    value: string;
    className?: {
        root?: string;
    };
}
/**
 * This function returns a pre-styled TabContent component to be used inside a Tabs component.
 * The value of this tab is required for both the internally and externally controlled state.
 *
 * @param id The id of the tab content.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param key The key of the tab.
 * @param value The value of the tab. This is required for the internal and external state.
 * @param children The content of the tab should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tab Content component
 */
export declare function TabContent({ id, data, key, value, children, className, }: PropsWithChildren<TabContentProps>): import("react/jsx-runtime").JSX.Element;
interface TabsProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    defaultValue: string;
    value?: string;
    onValueChange?: (newValue: string) => void;
    className?: {
        root?: string;
    };
}
/**
 * This function returns a pre-styled TabList component based on the RadixUI TabList component and the custom theme.
 * The active tab / component state can be either controlled internally or controlled through the parent component.
 *
 * @param id The id of the tab list.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param defaultValue The default value of the tab that is active when the component is initially rendered.
 * @param value The value of the tab that is active. This value is required, if the state is controlled by the parent component.
 * @param onValueChange The function that is called when the active tab is changed. The new value is passed as a parameter. This function is required, if the state is controlled by the parent component.
 * @param children The tab list and content should be passed as children to this component.
 * @param className The optional className object allows you to override the default styling.
 * @returns Tabs wrapper component
 */
declare function Tabs({ id, data, defaultValue, value, children, onValueChange, className, }: PropsWithChildren<TabsProps>): import("react/jsx-runtime").JSX.Element;
declare namespace Tabs {
    var Tab: typeof import("@/Tabs").Tab;
    var TabList: typeof import("@/Tabs").TabList;
    var TabContent: typeof import("@/Tabs").TabContent;
}
export default Tabs;

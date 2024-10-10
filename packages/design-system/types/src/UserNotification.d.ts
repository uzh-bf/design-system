import { default as React } from 'react';
export interface UserNotificationProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    message?: string;
    type?: 'default' | 'info' | 'success' | 'warning' | 'error';
    children?: React.ReactNode;
    className?: {
        root?: string;
        icon?: string;
        message?: string;
        content?: string;
    };
}
export interface UserNotificationMessageProps extends UserNotificationProps {
    message: string;
    children?: React.ReactNode;
}
export interface UserNotificationChildrenProps extends UserNotificationProps {
    message?: never;
    children: React.ReactNode;
}
/**
 * This function returns a pre-styled UserNotification component based on the custom theme.
 *
 * @param id - The id of the notification.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param message - The message that is displayed in the notification.
 * @param type - The type of the notification. This can be either 'success', 'info' or 'error'. This determines the icon that is displayed and some conditional styling. If not type is provided, the information icon is displayed.
 * @param children - The optional children are displayed in the notification in addition to the provided message icon.
 * @param className - The optional className object allows you to override the default styling.
 * @returns UserNotification component
 */
export declare function UserNotification({ id, data, message, type, children, className, }: UserNotificationMessageProps | UserNotificationChildrenProps): import("react/jsx-runtime").JSX.Element;
export default UserNotification;

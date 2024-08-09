import { default as React } from 'react';
interface NotificationBadgeWrapperProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    count?: number;
    showBadge?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: {
        root?: string;
        badge?: string;
    };
    children: React.ReactNode;
}
/**
 * This function returns a pre-styled wrapper for some custom component with navigation badge on it.
 *
 * @param id - The id of the notification badge wrapper.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param count - The number of notifications to be displayed on the badge. If no count is provided, the badge will be displayed as a simple red notification dot.
 * @param showBadge - If true, the badge will be displayed as a red dot, even if the number notifications is undefined.
 * @param size - The size of the badge (can be small, medium, large or extra large).
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The component the notification badge should be placed on.
 * @returns Notification badge wrapper component
 */
export declare function NotificationBadgeWrapper({ id, data, count, showBadge, size, className, children, }: NotificationBadgeWrapperProps): React.ReactElement;
export default NotificationBadgeWrapper;
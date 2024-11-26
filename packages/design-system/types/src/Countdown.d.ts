export interface CountdownProps {
    isStatic?: boolean;
    expiresAt: Date;
    formatter?: (value: any) => any;
    onExpire?: () => void;
    onUpdate?: (timeRemaining: number) => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
}
/**
 * This function creates a simple text countdown component (without any additional features or styling)
 *
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param expiresAt - Date when the countdown should expire
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A simple text countdown component
 */
export declare function Countdown({ isStatic, expiresAt, formatter, onExpire, onUpdate, data, className, }: CountdownProps): import("react/jsx-runtime").JSX.Element;
export default Countdown;

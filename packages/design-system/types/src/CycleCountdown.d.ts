export interface CycleCountdownProps {
    expiresAt: Date;
    totalDuration: number;
    size?: 'sm' | 'md';
    overrideSize?: number;
    color?: string;
    strokeWidthRem?: number;
    isStatic?: boolean;
    terminalColor?: string;
    terminalPercentage?: number;
    formatter?: (value: any) => any;
    onExpire?: () => void;
    onUpdate?: (timeRemaining: number) => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        countdownWrapper?: string;
        countdown?: string;
    };
}
/**
 * This function combines the CycleProgress and Countdown components to create a circular progress bar with a countdown in the middle
 *
 * @param expiresAt - Date when the countdown should expire
 * @param totalDuration - Total duration of the countdown in seconds, which is needed to compute the progress in percent
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param overrideSize - Optional override for the size of the progress bar
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param terminalColor - Color of the progress bar when the countdown is expired (total Duration 0 or expiration in the past)
 * @param terminalPercentage - Percentage of the progress bar when the countdown is expired (totalDuration 0 or expiration in the past)
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with a countdown in the middle
 */
export declare function CycleCountdown({ expiresAt, totalDuration, size, overrideSize, color, strokeWidthRem, isStatic, terminalColor, terminalPercentage, formatter, onExpire, onUpdate, data, className, }: CycleCountdownProps): import("react/jsx-runtime").JSX.Element;
export default CycleCountdown;

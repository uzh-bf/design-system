export interface ProgressProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: number;
    offset?: number;
    max: number;
    formatter: (value: any) => any;
    isMaxVisible?: boolean;
    className?: {
        root?: string;
        indicator?: string;
    };
    [x: string]: any;
}
/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value.
 * @param offset - The number that determines the offset of the progress bar. The offset is subtracted from the value.
 * @param max - The maximum value of the progress bar.
 * @param formatter - The function that formats the value of the progress bar.
 * @param isMaxVisible - The boolean that determines if the maximum value should be displayed.
 * @param className - The optional className object allows you to override the default styling.
 * @return Progress component
 */
export declare function Progress({ id, data, formatter, value, offset, max, className, isMaxVisible, ...props }: ProgressProps): import("react/jsx-runtime").JSX.Element;
export default Progress;

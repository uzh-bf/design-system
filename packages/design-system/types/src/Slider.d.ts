import { default as React } from 'react';
interface SliderProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: number;
    handleChange: (newValue: number) => void;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    rangeColorMap?: Record<string, string>;
    borderColorMap?: Record<string, string>;
    className?: {
        root?: string;
        icons?: string;
        labels?: string;
        range?: string;
        thumb?: string;
    };
}
export interface SliderWithLabelProps extends SliderProps {
    labels: {
        min: string;
        mid: string;
        max: string;
    };
    icons?: never;
}
export interface SliderWithIconsProps extends SliderProps {
    icons: {
        min: React.ReactNode;
        mid: React.ReactNode;
        max: React.ReactNode;
    };
    labels?: never;
}
/**
 * This function returns a pre-styled Slider component based on the RadixUI slider component and the custom theme.
 *
 * @param id - The id of the slider.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the slider. The value should be between the min and max value and is maintained by the parent component.
 * @param labels - The labels that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param icons - The icons that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param handleChange - The function that is called when the slider value is changed. The new value is passed as a parameter.
 * @param min - The minimum value of the slider.
 * @param max - The maximum value of the slider.
 * @param step - The step size of the slider.
 * @param disabled - Indicator whether the slider is disabled or not.
 * @param rangeColorMap - A map that maps a range of values to colors. The color is used to color the range of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param borderColorMap - A map that maps a range of values to colors. The color is used to color the thumb of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Slider component.
 */
export declare function Slider({ id, data, value, labels, handleChange, min, max, step, disabled, icons, rangeColorMap, borderColorMap, className, }: SliderWithLabelProps | SliderWithIconsProps): React.ReactElement;
export default Slider;

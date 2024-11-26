import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
export interface ColorPickerClassName {
    root?: string;
    trigger?: string;
    popover?: string;
    presetButtons?: string;
    inputLabel?: string;
    inputTooltip?: string;
    input?: string;
    abort?: string;
    submit?: string;
}
export interface ColorPickerProps {
    color: string;
    onSubmit: (newColor: string) => void;
    disabled?: boolean;
    triggerIcon?: IconDefinition;
    presetColors?: string[];
    position?: 'bottom' | 'top';
    submitText: string;
    colorLabel: string;
    tooltip?: string;
    dataTrigger?: {
        cy?: string;
        test?: string;
    };
    dataHexInput?: {
        cy?: string;
        test?: string;
    };
    dataSubmit?: {
        cy?: string;
        test?: string;
    };
    className?: ColorPickerClassName;
}
export declare function ColorPicker({ color, onSubmit, disabled, triggerIcon, presetColors, position, submitText, colorLabel, tooltip, dataTrigger, dataHexInput, dataSubmit, className, }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
export default ColorPicker;

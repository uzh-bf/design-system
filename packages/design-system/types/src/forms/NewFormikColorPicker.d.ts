import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { default as React } from 'react';
import { ColorPickerClassName } from '../ColorPicker';
export interface FormikColorPickerProps {
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    validateForm?: () => void;
    tooltip?: string | React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    triggerIcon?: IconDefinition;
    presetColors?: string[];
    position?: 'bottom' | 'top';
    submitText: string;
    colorLabel: string;
    colorTooltip?: string;
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
    className?: {
        root?: string;
        label?: string;
        tooltip?: string;
        picker?: ColorPickerClassName;
    };
}
export declare function FormikColorPicker({ name, label, labelType, validateForm, tooltip, required, disabled, triggerIcon, presetColors, position, submitText, colorLabel, colorTooltip, dataTrigger, dataHexInput, dataSubmit, className, }: FormikColorPickerProps): import("react/jsx-runtime").JSX.Element;
export default FormikColorPicker;

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { default as React } from 'react';
import { ColorPickerClassName } from '../ColorPicker';
export interface FormikColorPickerProps {
    id?: string;
    name: string;
    label?: string;
    labelType?: 'small' | 'normal';
    tooltip?: string | React.ReactNode;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    triggerIcon?: IconDefinition;
    presetColors?: string[];
    position?: 'bottom' | 'top';
    abortText?: string;
    submitText?: string;
    className?: {
        root?: string;
        label?: string;
        field?: string;
        tooltip?: string;
        error?: string;
        colorPicker?: ColorPickerClassName;
    };
    dataTrigger?: {
        cy?: string;
        test?: string;
    };
    dataHexInput?: {
        cy?: string;
        test?: string;
    };
    dataAbort?: {
        cy?: string;
        test?: string;
    };
    dataSubmit?: {
        cy?: string;
        test?: string;
    };
}
export declare function FormikColorPicker({ id, name, label, labelType, tooltip, required, hideError, disabled, triggerIcon, presetColors, position, submitText, className, dataTrigger, dataHexInput, dataSubmit, }: FormikColorPickerProps): import("react/jsx-runtime").JSX.Element;
export default FormikColorPicker;

import { default as React } from 'react';
export interface PinFieldProps {
    id?: string;
    name: string;
    required?: boolean;
    label?: string;
    labelType?: 'small' | 'normal';
    tooltip?: string | React.ReactNode;
    className?: {
        root?: string;
        field?: string;
        label?: string;
        error?: string;
        tooltip?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
}
export declare function PinField({ id, name, required, label, labelType, tooltip, className, data, }: PinFieldProps): import("react/jsx-runtime").JSX.Element;
export default PinField;

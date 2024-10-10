import { default as React } from 'react';
import { TextFieldClassName } from './TextField';
export interface FormikPinFieldProps {
    id?: string;
    name: string;
    required?: boolean;
    label?: string;
    labelType?: 'small' | 'large';
    tooltip?: string | React.ReactNode;
    className?: TextFieldClassName & {
        root?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
}
export declare function FormikPinField({ id, name, required, label, labelType, tooltip, className, data, }: FormikPinFieldProps): import("react/jsx-runtime").JSX.Element;
export default FormikPinField;

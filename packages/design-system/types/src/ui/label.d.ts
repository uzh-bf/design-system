import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
declare const Label: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: ClassProp | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;
export { Label };

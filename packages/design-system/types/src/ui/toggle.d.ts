import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "lg" | "default" | null | undefined;
} & ClassProp) | undefined) => string;
declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "lg" | "default" | null | undefined;
} & ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { Toggle, toggleVariants };

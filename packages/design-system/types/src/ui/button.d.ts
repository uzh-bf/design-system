import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    variant?: "link" | "ghost" | "secondary" | "default" | "destructive" | "outline" | null | undefined;
    size?: "sm" | "lg" | "icon" | "default" | null | undefined;
} & ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };

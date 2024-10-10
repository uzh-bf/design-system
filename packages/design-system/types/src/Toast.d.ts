import * as React from 'react';
interface ToastProps {
    title?: string;
    description?: string;
    duration?: number;
    dismissible?: boolean;
    triggerText?: string;
    actionText?: string;
    actionOnClick?: () => void;
    position?: string;
    openExternal?: boolean;
    setOpenExternal?: (open: boolean) => void;
    type?: 'default' | 'success' | 'warning' | 'error';
    children?: React.ReactNode;
    className?: {
        root?: string;
        viewport?: string;
        trigger?: string;
        title?: string;
        description?: string;
        children?: string;
        action?: string;
    };
}
interface ToastPropsWithTitle extends ToastProps {
    title: string;
    description?: string;
    children?: never;
}
interface ToastPropsWithChildren extends ToastProps {
    title?: never;
    description?: never;
    children: React.ReactNode;
}
export interface ToastPropsWithTitleTrigger extends ToastPropsWithTitle {
    triggerText: string;
    openExternal?: never;
    setOpenExternal?: never;
}
export interface ToastPropsWithTitleNoTrigger extends ToastPropsWithTitle {
    triggerText?: never;
    openExternal: boolean;
    setOpenExternal: (open: boolean) => void;
}
export interface ToastPropsWithChildrenTrigger extends ToastPropsWithChildren {
    triggerText: string;
    openExternal?: never;
    setOpenExternal?: never;
}
export interface ToastPropsWithChildrenNoTrigger extends ToastPropsWithChildren {
    triggerText?: never;
    openExternal: boolean;
    setOpenExternal: (open: boolean) => void;
}
export declare function Toast({ title, description, duration, dismissible, triggerText, actionText, actionOnClick, position, openExternal, setOpenExternal, type, children, className, }: ToastPropsWithTitleTrigger | ToastPropsWithTitleNoTrigger | ToastPropsWithChildrenTrigger | ToastPropsWithChildrenNoTrigger): React.ReactElement;
export default Toast;

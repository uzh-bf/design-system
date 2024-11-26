import { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes, CSSProperties } from 'react';
/// <reference types="react" />
import * as ResizablePrimitive from 'react-resizable-panels';
declare const ResizablePanelGroup: ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => import("react/jsx-runtime").JSX.Element;
declare const ResizablePanel: ForwardRefExoticComponent<Omit< HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onResize"> & {
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: ResizablePrimitive.PanelOnCollapse | undefined;
    onExpand?: ResizablePrimitive.PanelOnExpand | undefined;
    onResize?: ResizablePrimitive.PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: ReactNode;
} & RefAttributes<ResizablePrimitive.ImperativePanelHandle>>;
declare const ResizableHandle: ({ withHandle, className, ...props }: Omit< HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onFocus" | "onBlur"> & {
    className?: string | undefined;
    disabled?: boolean | undefined;
    hitAreaMargins?: ResizablePrimitive.PointerHitAreaMargins | undefined;
    id?: string | null | undefined;
    onBlur?: (() => void) | undefined;
    onDragging?: ResizablePrimitive.PanelResizeHandleOnDragging | undefined;
    onFocus?: (() => void) | undefined;
    style?: CSSProperties | undefined;
    tabIndex?: number | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
} & {
    children?: ReactNode;
} & {
    withHandle?: boolean | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

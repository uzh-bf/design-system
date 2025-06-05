/// <reference types="react" />

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { AllowInDimension } from 'recharts/types/util/types';
import { AnimationTiming } from 'recharts/types/util/types';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { CartesianViewBox } from 'recharts/types/util/types';
import { ClassProp } from 'class-variance-authority/types';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ContentType } from 'recharts/types/component/Tooltip';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ControllerProps } from 'react-hook-form';
import { Coordinate } from 'recharts/types/util/types';
import { CSSProperties } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { default as default_2 } from 'embla-carousel-react';
import { default as default_3 } from 'react';
import { DialogCloseProps } from '@radix-ui/react-dialog';
import { DialogContentProps } from '@radix-ui/react-dialog';
import { DialogDescriptionProps } from '@radix-ui/react-dialog';
import { DialogOverlayProps } from '@radix-ui/react-dialog';
import { DialogPortalProps } from '@radix-ui/react-dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { DialogTitleProps } from '@radix-ui/react-dialog';
import { DialogTriggerProps } from '@radix-ui/react-dialog';
import { Dispatch } from 'react';
import { Drawer as Drawer_2 } from 'vaul';
import { ExternalToast } from 'sonner';
import { FieldError } from 'react-hook-form';
import { FieldInputProps } from 'formik';
import { FieldPath } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { FormProviderProps } from 'react-hook-form';
import { ForwardRefExoticComponent } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { HTMLAttributes } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition as IconDefinition_2 } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import { NameType } from 'recharts/types/component/DefaultTooltipContent';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React_2 from 'react';
import { ReactNode } from 'react';
import * as RechartsPrimitive from 'recharts';
import { RefAttributes } from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { SetStateAction } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { SlotProps } from '@radix-ui/react-slot';
import { Toaster as Toaster_2 } from 'sonner';
import { UniqueOption } from 'recharts/types/util/payload/getUniqPayload';
import { UseEmblaCarouselType } from 'embla-carousel-react';
import { ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { VariantProps } from 'class-variance-authority';

export declare const Accordion: React_2.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React_2.RefAttributes<HTMLDivElement>>;

export declare const AccordionContent: React_2.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const AccordionItem: React_2.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const AccordionTrigger: React_2.ForwardRefExoticComponent<Omit<AccordionPrimitive.AccordionTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const Alert: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string> & React_2.RefAttributes<HTMLDivElement>>;

export declare const AlertDescription: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLParagraphElement> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const AlertDialog: React_2.FC<AlertDialogPrimitive.AlertDialogProps>;

export declare const AlertDialogAction: React_2.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogActionProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const AlertDialogCancel: React_2.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogCancelProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const AlertDialogContent: React_2.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const AlertDialogDescription: React_2.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const AlertDialogFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX_2.Element;
    displayName: string;
};

export declare const AlertDialogHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX_2.Element;
    displayName: string;
};

export declare const AlertDialogOverlay: React_2.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const AlertDialogPortal: React_2.FC<AlertDialogPrimitive.AlertDialogPortalProps>;

export declare const AlertDialogTitle: React_2.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const AlertDialogTrigger: React_2.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const AlertTitle: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLHeadingElement> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const AspectRatio: ForwardRefExoticComponent<AspectRatioPrimitive.AspectRatioProps & RefAttributes<HTMLDivElement>>;

export declare const Avatar: React_2.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React_2.RefAttributes<HTMLSpanElement>, "ref"> & React_2.RefAttributes<HTMLSpanElement>>;

export declare const AvatarFallback: React_2.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React_2.RefAttributes<HTMLSpanElement>, "ref"> & React_2.RefAttributes<HTMLSpanElement>>;

export declare const AvatarImage: React_2.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React_2.RefAttributes<HTMLImageElement>, "ref"> & React_2.RefAttributes<HTMLImageElement>>;

export declare function Badge({ className, variant, ...props }: BadgeProps): JSX_2.Element;

declare interface BadgeProps extends React_2.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

export declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & ClassProp) | undefined) => string;

declare type BaseItem = {
    id?: string;
    disabled?: boolean;
    shortcut?: string;
    tooltip?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        item?: string;
        tooltip?: string;
    };
};

export declare interface BaseNavigationButtonProps {
    onClick: React.MouseEventHandler;
    disabled?: boolean;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        label?: string;
        icon?: string;
    };
    style?: {
        root?: React.CSSProperties;
        label?: React.CSSProperties;
        icon?: React.CSSProperties;
    };
}

export declare interface BaseNavigationDropdownProps {
    elements: (NavigationMenuItemProps | NavigationSeparatorProps | NavigationSubmenuProps)[];
    disabled?: boolean;
    active?: boolean;
    notification?: boolean;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        trigger?: string;
        label?: string;
        icon?: string;
        content?: string;
        separator?: string;
    };
    style?: {
        trigger?: React.CSSProperties;
        label?: React.CSSProperties;
        icon?: React.CSSProperties;
        content?: React.CSSProperties;
        separator?: React.CSSProperties;
    };
}

declare interface BaseProgressProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    offset?: number;
    max: number;
    formatter: (value: string | number) => string | default_3.ReactNode;
    isMaxVisible?: boolean;
    noMinWidth?: boolean;
    [x: string]: unknown;
}

declare type BaseRowType = {
    className?: string;
};

export declare const Breadcrumb: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    separator?: React_2.ReactNode;
} & React_2.RefAttributes<HTMLElement>>;

export declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React_2.ComponentProps<'span'>): JSX_2.Element;
    displayName: string;
};

export declare const BreadcrumbItem: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React_2.RefAttributes<HTMLLIElement>>;

export declare const BreadcrumbLink: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "ref"> & {
    asChild?: boolean | undefined;
} & React_2.RefAttributes<HTMLAnchorElement>>;

export declare const BreadcrumbList: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, "ref"> & React_2.RefAttributes<HTMLOListElement>>;

export declare const BreadcrumbPage: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React_2.RefAttributes<HTMLSpanElement>>;

export declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React_2.ComponentProps<'li'>): JSX_2.Element;
    displayName: string;
};

/**
 * This function returns a pre-styled Button component based on the custom theme.
 *
 * @param id - The id of the button.
 * @param children - The content of the button.
 * @param onClick - Function that is applied when the button is clicked.
 * @param disabled - Indicate whether the button is disabled or not. Conditional styling is applied, if this is true.
 * @param destructive - Indicate whether the button is destructive or not. Conditional styling is applied, if this is true.
 * @param primary - Indicate whether the button is primary or not. Conditional styling is applied, if this is true.
 * @param active - Indicate whether the button is active or not. Conditional styling is applied, if this is true.
 * @param fluid - Indicate whether the button should be fluid or not. Conditional styling is applied, if this is true.
 * @param basic - This attribute allows to directly remove significant pre-styling and only applies basic styles and functionally required attributes.
 * @param loading - Indicate whether the button is loading or not. Conditional styling / loading symbol is applied, if this is true.
 * @param type - The html type of the button.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @returns Button component
 */
export declare function Button({ id, children, onClick, disabled, primary, destructive, active, fluid, basic, loading, type, className, data, ...props }: ButtonProps): JSX_2.Element;

export declare namespace Button {
    var Icon: ({ icon, withoutLabel, loading, className, }: {
        icon: IconDefinition;
        withoutLabel?: boolean | undefined;
        loading?: boolean | undefined;
        className?: {
            root?: string | undefined;
        } | undefined;
    }) => JSX_2.Element | null;
    var Label: ({ className, children, }: {
        className?: {
            root?: string | undefined;
        } | undefined;
        children: ReactNode;
    }) => JSX_2.Element;
    var IconGroup: ({ state, setState, className, children, }: ButtonIconGroupProps) => JSX_2.Element;
}

export declare interface ButtonIconGroupProps {
    state: number | undefined;
    setState: Dispatch<React.SetStateAction<number | undefined>>;
    className?: {
        root?: string;
        children?: string;
    };
    children: React.ReactNode[];
}

export declare interface ButtonProps {
    id?: string;
    children?: React.ReactNode;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    primary?: boolean;
    destructive?: boolean;
    active?: boolean;
    fluid?: boolean;
    basic?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: {
        root?: string;
        active?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
    [x: string]: unknown;
}

declare interface ButtonProps_2 extends React_2.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Card: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardContent: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardDescription: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLParagraphElement> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const CardFooter: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardHeader: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CardTitle: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLHeadingElement> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const Carousel: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & CarouselProps & React_2.RefAttributes<HTMLDivElement>>;

export declare type CarouselApi = UseEmblaCarouselType[1];

export declare const CarouselContent: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CarouselItem: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CarouselNext: React_2.ForwardRefExoticComponent<Omit<ButtonProps_2 & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

declare type CarouselOptions = UseCarouselParameters[0];

declare type CarouselPlugin = UseCarouselParameters[1];

export declare const CarouselPrevious: React_2.ForwardRefExoticComponent<Omit<ButtonProps_2 & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

declare type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};

declare type ChartConfig = {
    [k in string]: {
        label?: React_2.ReactNode;
        icon?: React_2.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};

export declare const ChartContainer: React_2.ForwardRefExoticComponent<Omit<React_2.ClassAttributes<HTMLDivElement> & React_2.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig;
    children: React_2.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ChartLegend: typeof RechartsPrimitive.Legend;

export declare const ChartLegendContent: React_2.ForwardRefExoticComponent<Omit<React_2.ClassAttributes<HTMLDivElement> & React_2.HTMLAttributes<HTMLDivElement> & Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean | undefined;
    nameKey?: string | undefined;
}, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => JSX_2.Element | null;

export declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;

export declare const ChartTooltipContent: React_2.ForwardRefExoticComponent<Omit<RechartsPrimitive.DefaultTooltipContentProps<ValueType, NameType> & {
    accessibilityLayer?: boolean | undefined;
    active?: boolean | undefined;
    includeHidden?: boolean | undefined;
    allowEscapeViewBox?: AllowInDimension | undefined;
    animationDuration?: number | undefined;
    animationEasing?: AnimationTiming | undefined;
    content?: ContentType<ValueType, NameType> | undefined;
    coordinate?: Partial<Coordinate> | undefined;
    cursor?: boolean | React_2.SVGProps<SVGElement> | React_2.ReactElement<any, string | React_2.JSXElementConstructor<any>> | undefined;
    filterNull?: boolean | undefined;
    defaultIndex?: number | undefined;
    isAnimationActive?: boolean | undefined;
    offset?: number | undefined;
    payloadUniqBy?: UniqueOption<Payload<ValueType, NameType>> | undefined;
    position?: Partial<Coordinate> | undefined;
    reverseDirection?: AllowInDimension | undefined;
    shared?: boolean | undefined;
    trigger?: "hover" | "click" | undefined;
    useTranslate3d?: boolean | undefined;
    viewBox?: CartesianViewBox | undefined;
    wrapperStyle?: React_2.CSSProperties | undefined;
} & React_2.ClassAttributes<HTMLDivElement> & React_2.HTMLAttributes<HTMLDivElement> & {
    hideLabel?: boolean | undefined;
    hideIndicator?: boolean | undefined;
    indicator?: "line" | "dot" | "dashed" | undefined;
    nameKey?: string | undefined;
    labelKey?: string | undefined;
}, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

/**
 * This function returns a pre-styled Checkbox component based on the RadixUI Checkbox component and the custom theme.
 * State is not managed internally and needs to be passed to the component through the checked and onCheck props.
 *
 * @param id - The id of the checkbox.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - Optional content of the checkbox that is shown when the checked attribute is true. By default, this is just replaced by a tick symbol.
 * @param checked - Indicate whether the checkbox is checked or not.
 * @param partial - Indicate whether the checkbox is partially checked or not. If the checked attribute is true, it will alwawys override the partial condition simplified logic.
 * @param onCheck - The function that is called when the checkbox is checked or unchecked.
 * @param disabled - Indicate whether the checkbox is disabled or not.
 * @param label - The label of the checkbox.
 * @param size - The size of the checkbox (can be small, medium, large or extra large).
 * @param style - The optional style object allows you to override the default styling.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Checkbox component
 */
export declare function Checkbox({ id, data, children, checked, partial, disabled, label, onCheck, size, style, className, }: CheckboxProps): default_3.ReactElement;

declare interface CheckboxItem extends BaseItem {
    type: 'checkbox';
    value?: never;
    label: string | React.ReactNode;
    onClick: React.MouseEventHandler;
    selected: boolean;
}

export declare interface CheckboxProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    children?: default_3.ReactNode;
    checked: boolean | 'indeterminate';
    partial?: boolean;
    disabled?: boolean;
    onCheck: () => void;
    label?: string | default_3.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    style?: {
        root?: default_3.CSSProperties;
        label?: default_3.CSSProperties;
    };
    className?: {
        root?: string;
        label?: string;
        indicator?: string;
    };
}

/**
 * This function returns a pre-styled collapsible component based on the RadixUI collapsible component and the implemented theme.
 * State need to be managed by the parent component.
 *
 * @param id - The id of the collapsible.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param open - Indicate whether the collapsible is open or not.
 * @param onChange - Function that is called when the collapsible is toggled.
 * @param staticContent - The static content that is always shown.
 * @param closedContent - The optional content that is only shown when the collapsible is closed.
 * @param customTrigger - The optional custom trigger that is shown instead of the default arrow trigger.
 * @param primary - An optional text that will be displayed on a button in the right bottom corner of the collapsible. Alternatively, it is also possible to pass a React node instead.
 * @param onPrimaryClick - Function that will be called once the primary button is clicked (no function for custom primary nodes)
 * @param secondary - An optional text that will be displayed on a button in the left bottom corner of the collapsible. Alternatively, it is also possible to pass a React node instead.
 * @param onSecondaryClick - Function that will be called once the secondary button is clicked (no function for custom secondary nodes)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the collapsible that is shown when the collapsible is open.
 * @returns Collapsible component
 */
export declare function Collapsible({ id, data, open, onChange, staticContent, closedContent, customTrigger, primary, onPrimaryClick, secondary, onSecondaryClick, className, children, }: CollapsibleProps): JSX_2.Element;

export declare interface CollapsibleProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    open: boolean;
    onChange: () => void;
    staticContent: default_3.ReactNode | string;
    closedContent?: default_3.ReactNode | string;
    customTrigger?: default_3.ReactNode;
    primary?: string | default_3.ReactNode;
    onPrimaryClick?: () => void;
    secondary?: string | default_3.ReactNode;
    onSecondaryClick?: () => void;
    className?: {
        root?: string;
        staticContent?: string;
        closedContent?: string;
        content?: string;
        trigger?: string;
        primary?: string;
        primaryButton?: string;
        secondary?: string;
        secondaryButton?: string;
        bottomWrapper?: string;
    };
    children: default_3.ReactNode;
}

/**
 * ColorPicker is a component that allows users to select a color from a palette or input a hex color code.
 *
 * @param color - The initial color value in hex format.
 * @param label - The label for the color picker.
 * @param labelType - The type of label, can be 'small' or 'large'.
 * @param required - Indicates whether the field is required.
 * @param onSubmit - Callback function to handle the submission of the selected color.
 * @param disabled - Indicates whether the color picker is disabled.
 * @param triggerIcon - An optional icon to display as a trigger for the color picker.
 * @param presetColors - An array of preset colors to display in the color picker.
 * @param position - The position of the color picker relative to the trigger icon.
 * @param submitText - The text to display on the submit button of the color picker.
 * @param colorLabel - The label for the color input field.
 * @param colorTooltip - Optional tooltip for the color input field.
 * @param tooltip - Optional tooltip text or component to display additional information.
 * @param error - An error message to display if the color picker has an error.
 * @param isTouched - Indicates whether the color picker has been touched (used for error display).
 * @param dataTrigger - Optional data attributes for the trigger icon (for testing purposes).
 * @param dataHexInput - Optional data attributes for the hex input field (for testing purposes).
 * @param dataSubmit - Optional data attributes for the submit button (for testing purposes).
 * @param className - Optional class names for styling the color picker and its components.
 * @returns A ColorPicker component that allows users to select a color and submit it.
 */
export declare function ColorPicker({ color, label, labelType, required, onSubmit, disabled, triggerIcon, presetColors, position, submitText, colorLabel, tooltip, colorTooltip, error, isTouched, dataTrigger, dataHexInput, dataSubmit, className, }: ColorPickerProps): JSX_2.Element;

export declare interface ColorPickerClassName {
    root?: string;
    pickerRoot?: string;
    label?: string;
    tooltip?: string;
    trigger?: string;
    popover?: string;
    presetButtons?: string;
    inputLabel?: string;
    inputTooltip?: string;
    input?: string;
    abort?: string;
    submit?: string;
}

export declare interface ColorPickerProps {
    color: string;
    label?: string;
    labelType?: 'small' | 'large';
    required?: boolean;
    onSubmit: (newColor: string) => void;
    disabled?: boolean;
    triggerIcon?: IconDefinition;
    presetColors?: string[];
    position?: 'bottom' | 'top' | 'bottom-left' | 'top-left';
    submitText: string;
    colorLabel: string;
    tooltip?: string | React.ReactNode;
    colorTooltip?: string;
    error?: string;
    isTouched?: boolean;
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

export declare type ColumnType<RowType> = {
    className?: string;
    label: string;
    accessor: string;
    sortable?: boolean;
    transformer?: ({ row, ix, }: {
        row: RowType;
        ix?: number;
    }) => string | number | boolean;
    formatter?: ({ row, ix, }: {
        row: RowType;
        ix?: number;
    }) => string | number | default_3.ReactElement;
};

export declare const Command: React_2.ForwardRefExoticComponent<Omit<{
    children?: React_2.ReactNode;
} & Pick<Pick<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React_2.HTMLAttributes<HTMLDivElement>> & {
    ref?: React_2.Ref<HTMLDivElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | keyof React_2.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string | undefined;
    shouldFilter?: boolean | undefined;
    filter?: ((value: string, search: string, keywords?: string[] | undefined) => number) | undefined;
    defaultValue?: string | undefined;
    value?: string | undefined;
    onValueChange?: ((value: string) => void) | undefined;
    loop?: boolean | undefined;
    disablePointerSelection?: boolean | undefined;
    vimBindings?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CommandDialog: ({ children, ...props }: CommandDialogProps) => JSX_2.Element;

declare interface CommandDialogProps extends DialogProps {
}

export declare const CommandEmpty: React_2.ForwardRefExoticComponent<Omit<{
    children?: React_2.ReactNode;
} & Pick<Pick<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React_2.HTMLAttributes<HTMLDivElement>> & {
    ref?: React_2.Ref<HTMLDivElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | keyof React_2.HTMLAttributes<HTMLDivElement> | "asChild"> & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CommandGroup: React_2.ForwardRefExoticComponent<Omit<{
    children?: React_2.ReactNode;
} & Omit<Pick<Pick<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React_2.HTMLAttributes<HTMLDivElement>> & {
    ref?: React_2.Ref<HTMLDivElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | keyof React_2.HTMLAttributes<HTMLDivElement> | "asChild">, "value" | "heading"> & {
    heading?: React_2.ReactNode;
    value?: string | undefined;
    forceMount?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CommandInput: React_2.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React_2.DetailedHTMLProps<React_2.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React_2.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React_2.Ref<HTMLInputElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | "asChild" | keyof React_2.InputHTMLAttributes<HTMLInputElement>>, "onChange" | "value" | "type"> & {
    value?: string | undefined;
    onValueChange?: ((search: string) => void) | undefined;
} & React_2.RefAttributes<HTMLInputElement>, "ref"> & React_2.RefAttributes<HTMLInputElement>>;

export declare const CommandItem: React_2.ForwardRefExoticComponent<Omit<{
    children?: React_2.ReactNode;
} & Omit<Pick<Pick<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React_2.HTMLAttributes<HTMLDivElement>> & {
    ref?: React_2.Ref<HTMLDivElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | keyof React_2.HTMLAttributes<HTMLDivElement> | "asChild">, "onSelect" | "disabled" | "value"> & {
    disabled?: boolean | undefined;
    onSelect?: ((value: string) => void) | undefined;
    value?: string | undefined;
    keywords?: string[] | undefined;
    forceMount?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CommandList: React_2.ForwardRefExoticComponent<Omit<{
    children?: React_2.ReactNode;
} & Pick<Pick<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React_2.HTMLAttributes<HTMLDivElement>> & {
    ref?: React_2.Ref<HTMLDivElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | keyof React_2.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string | undefined;
} & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CommandSeparator: React_2.ForwardRefExoticComponent<Omit<Pick<Pick<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React_2.HTMLAttributes<HTMLDivElement>> & {
    ref?: React_2.Ref<HTMLDivElement> | undefined;
} & {
    asChild?: boolean | undefined;
}, "key" | keyof React_2.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    alwaysRender?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const CommandShortcut: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLSpanElement>): JSX_2.Element;
    displayName: string;
};

export declare const ContextMenu: React_2.FC<ContextMenuPrimitive.ContextMenuProps>;

export declare const ContextMenuCheckboxItem: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuCheckboxItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuContent: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuGroup: React_2.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuItem: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuLabel: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuLabelProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuPortal: React_2.FC<ContextMenuPrimitive.ContextMenuPortalProps>;

export declare const ContextMenuRadioGroup: React_2.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuRadioGroupProps & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuRadioItem: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuRadioItemProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuSeparator: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSeparatorProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuShortcut: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLSpanElement>): JSX_2.Element;
    displayName: string;
};

export declare const ContextMenuSub: React_2.FC<ContextMenuPrimitive.ContextMenuSubProps>;

export declare const ContextMenuSubContent: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuSubTrigger: React_2.ForwardRefExoticComponent<Omit<ContextMenuPrimitive.ContextMenuSubTriggerProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean | undefined;
} & React_2.RefAttributes<HTMLDivElement>>;

export declare const ContextMenuTrigger: React_2.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuTriggerProps & React_2.RefAttributes<HTMLSpanElement>>;

/**
 * This function creates a simple text countdown component (without any additional features or styling)
 *
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param expiresAt - Date when the countdown should expire
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A simple text countdown component
 */
export declare function Countdown({ isStatic, expiresAt, formatter, onExpire, onUpdate, data, className, }: CountdownProps): JSX_2.Element;

export declare interface CountdownProps {
    isStatic?: boolean;
    expiresAt: Date;
    formatter?: (value: number) => string | number | React.ReactNode;
    onExpire?: () => void;
    onUpdate?: (timeRemaining: number) => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
}

/**
 * This function combines the CycleProgress and Countdown components to create a circular progress bar with a countdown in the middle
 *
 * @param expiresAt - Date when the countdown should expire
 * @param totalDuration - Total duration of the countdown in seconds, which is needed to compute the progress in percent
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param overrideSize - Optional override for the size of the progress bar
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param isStatic - If true, the countdown will not be running, but instead show the initial value. However, as the end value is given by a date, reloading can modify the displayed countdown value
 * @param terminalColor - Color of the progress bar when the countdown is expired (total Duration 0 or expiration in the past)
 * @param terminalPercentage - Percentage of the progress bar when the countdown is expired (totalDuration 0 or expiration in the past)
 * @param formatter - Function to format the countdown value
 * @param onExpire - Function that is executed when the countdown expires
 * @param onUpdate - Function that is executed when the countdown is updated (not when it expires)
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with a countdown in the middle
 */
export declare function CycleCountdown({ expiresAt, totalDuration, size, overrideSize, color, strokeWidthRem, isStatic, terminalColor, terminalPercentage, formatter, onExpire, onUpdate, data, className, }: CycleCountdownProps): JSX_2.Element;

export declare interface CycleCountdownProps {
    expiresAt: Date;
    totalDuration: number;
    size?: 'sm' | 'md';
    overrideSize?: number;
    color?: string;
    strokeWidthRem?: number;
    isStatic?: boolean;
    terminalColor?: string;
    terminalPercentage?: number;
    formatter?: (value: number) => string | number | React.ReactNode;
    onExpire?: () => void;
    onUpdate?: (timeRemaining: number) => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        countdownWrapper?: string;
        countdown?: string;
    };
}

/**
 * This function create a circular progress bar with custom content in the middle (children)
 *
 * @param size - Size of the progress bar, can be 'sm' or 'md'
 * @param overrideSize - If size adjustments of the relative placement are required due to font changes, this value can be used to override the circle size
 * @param percentage - Percentage of the progress bar (0-100)
 * @param color - Color of the progress bar (static for the moment)
 * @param strokeWidthRem - Width of the progress bar. For small size, a smaller value is recommended
 * @param children - Content of the progress bar, displayed in the center
 * @param data - Optional data object that can be used for testing (e.g. data-test or data-cy)
 * @param className - Optional className object allows you to override the default styling
 * @returns A circular progress bar with children content in the middle
 */
export declare function CycleProgress({ size, overrideSize, percentage, color, strokeWidthRem, children, data, className, }: CycleProgressProps): JSX_2.Element;

export declare interface CycleProgressProps {
    size?: 'sm' | 'md';
    overrideSize?: number;
    percentage: number;
    color?: string;
    strokeWidthRem?: number;
    children?: default_3.ReactNode;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
        children?: string;
    };
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param date - The date to be displayed (state)
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param placeholder - The placeholder of the date changer (is only shown if no date is selected)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param error - The error message to be displayed
 * @param hideError - Whether the error message should be hidden
 * @param isTouched - Whether the date changer has been touched
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param className - The optional className object allows you to override the default styling.
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button
 * @returns Date changer component with optional label, edit button and save button.
 */
export declare function DatePicker({ id, date, onDateChange, label, labelType, placeholder, tooltip, required, disabled, error, hideError, isTouched, className, dataTrigger, dataCalendar, dataNextMonth, dataPreviousMonth, }: DatePickerProps): JSX_2.Element;

export declare interface DatePickerClassName {
    trigger?: string;
    label?: string;
    input?: string;
    tooltip?: string;
}

export declare interface DatePickerProps {
    id?: string;
    date: Date | undefined;
    onDateChange: Dispatch<SetStateAction<Date | undefined>>;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    required?: boolean;
    tooltip?: string | default_3.ReactNode;
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    isTouched?: boolean;
    className?: DatePickerClassName;
    dataTrigger?: {
        cy?: string;
        test?: string;
    };
    dataCalendar?: {
        cy?: string;
        test?: string;
    };
    dataNextMonth?: {
        cy?: string;
        test?: string;
    };
    dataPreviousMonth?: {
        cy?: string;
        test?: string;
    };
}

export declare const DateTimePicker: React_2.ForwardRefExoticComponent<{
    value?: Date | undefined;
    onChange?: ((date: Date | undefined) => void) | undefined;
    onMonthChange?: ((date: Date | undefined) => void) | undefined;
    disabled?: boolean | undefined;
    /** showing `AM/PM` or not. */
    hourCycle?: 12 | 24 | undefined;
    placeholder?: string | undefined;
    /**
     * The year range will be: `This year + yearRange` and `this year - yearRange`.
     * Default is 50.
     * For example:
     * This year is 2024, The year dropdown will be 1974 to 2024 which is generated by `2024 - 50 = 1974` and `2024 + 50 = 2074`.
     * */
    yearRange?: number | undefined;
    displayFormat?: string | undefined;
    /**
     * The granularity prop allows you to control the smallest unit that is displayed by DateTimePicker.
     * By default, the value is `second` which shows all time inputs.
     **/
    granularity?: Granularity | undefined;
    className?: {
        trigger?: string | undefined;
        input?: string | undefined;
        label?: string | undefined;
        tooltip?: string | undefined;
        error?: string | undefined;
    } | undefined;
    /**
     * Show the default month and time when popup the calendar. Default is the current Date().
     **/
    defaultPopupValue?: Date | undefined;
    dataTrigger?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    dataCalendar?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    dataHours?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    dataMinutes?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    dataSeconds?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    dataNextMonth?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    dataPreviousMonth?: {
        cy?: string | undefined;
        test?: string | undefined;
    } | undefined;
    error?: string | undefined;
    hideError?: boolean | undefined;
    isTouched?: boolean | undefined;
    label?: string | undefined;
    labelType?: "small" | "large" | undefined;
    required?: boolean | undefined;
    tooltip?: string | React_2.ReactNode;
} & Pick<DayPickerProps, "locale" | "showOutsideDays" | "showWeekNumber" | "weekStartsOn"> & React_2.RefAttributes<Partial<DateTimePickerRef>>>;

export declare type DateTimePickerProps = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    onMonthChange?: (date: Date | undefined) => void;
    disabled?: boolean;
    /** showing `AM/PM` or not. */
    hourCycle?: 12 | 24;
    placeholder?: string;
    /**
     * The year range will be: `This year + yearRange` and `this year - yearRange`.
     * Default is 50.
     * For example:
     * This year is 2024, The year dropdown will be 1974 to 2024 which is generated by `2024 - 50 = 1974` and `2024 + 50 = 2074`.
     * */
    yearRange?: number;
    displayFormat?: string;
    /**
     * The granularity prop allows you to control the smallest unit that is displayed by DateTimePicker.
     * By default, the value is `second` which shows all time inputs.
     **/
    granularity?: Granularity;
    className?: {
        trigger?: string;
        input?: string;
        label?: string;
        tooltip?: string;
        error?: string;
    };
    /**
     * Show the default month and time when popup the calendar. Default is the current Date().
     **/
    defaultPopupValue?: Date;
    dataTrigger?: {
        cy?: string;
        test?: string;
    };
    dataCalendar?: {
        cy?: string;
        test?: string;
    };
    dataHours?: {
        cy?: string;
        test?: string;
    };
    dataMinutes?: {
        cy?: string;
        test?: string;
    };
    dataSeconds?: {
        cy?: string;
        test?: string;
    };
    dataNextMonth?: {
        cy?: string;
        test?: string;
    };
    dataPreviousMonth?: {
        cy?: string;
        test?: string;
    };
    error?: string;
    hideError?: boolean;
    isTouched?: boolean;
    label?: string;
    labelType?: 'small' | 'large';
    required?: boolean;
    tooltip?: string | React_2.ReactNode;
} & Pick<DayPickerProps, 'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'>;

export declare type DateTimePickerRef = {
    value?: Date;
} & Omit<HTMLButtonElement, 'value'>;

export declare const Drawer: {
    ({ shouldScaleBackground, ...props }: React_2.ComponentProps<typeof Drawer_2.Root>): JSX_2.Element;
    displayName: string;
};

export declare const DrawerClose: React_2.ForwardRefExoticComponent<DialogCloseProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const DrawerContent: React_2.ForwardRefExoticComponent<Omit<Omit<DialogContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & {
    onAnimationEnd?: ((open: boolean) => void) | undefined;
} & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DrawerDescription: React_2.ForwardRefExoticComponent<Omit<DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const DrawerFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX_2.Element;
    displayName: string;
};

export declare const DrawerHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX_2.Element;
    displayName: string;
};

export declare const DrawerOverlay: React_2.ForwardRefExoticComponent<Omit<Omit<DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const DrawerPortal: React_2.FC<DialogPortalProps>;

export declare const DrawerTitle: React_2.ForwardRefExoticComponent<Omit<DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const DrawerTrigger: React_2.ForwardRefExoticComponent<DialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

/**
 * This function returns a pre-styled Dropdown component based on the RadixUI dropdown component and the custom theme.
 *
 * @param id - The id of the dropdown.
 * @param trigger - The content of the trigger button or a custom trigger component to replace the default button.
 * @param items - The items that are displayed in the dropdown menu. This attribute should not be set, if groups are used.
 * @param radioGroups - The radio groups that are displayed in the dropdown menu. This attribute should not be set, if items are used.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param disabled - Indicate whether the dropdown is disabled or not. Conditional styling is applied, if this is true.
 * @returns Dropdown component
 */
export declare function Dropdown({ id, disabled, trigger, items, radioGroups, data, className, }: DropdownWithItemsProps | DropdownWithGroupsProps): JSX_2.Element;

export declare function DropdownItem({ item, className, }: {
    item: Item;
    className?: string;
}): JSX_2.Element | null;

export declare function DropdownLabelShortcut({ label, shortcut, tooltip, tooltipClassName, }: {
    label: string | React.ReactNode;
    shortcut?: string;
    tooltip?: string;
    tooltipClassName?: string;
}): JSX_2.Element;

declare interface DropdownProps {
    id?: string;
    disabled?: boolean;
    trigger: string | React.ReactNode;
    items?: Item[];
    radioGroups?: {
        value?: string;
        items: Item[];
    }[];
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        trigger?: string;
        triggerWrapper?: string;
        viewport?: string;
        item?: string;
        group?: string;
    };
}

export declare interface DropdownWithGroupsProps extends DropdownProps {
    items?: never;
    radioGroups: {
        value?: string;
        items: Item[];
    }[];
}

export declare interface DropdownWithItemsProps extends DropdownProps {
    items: Item[];
    radioGroups?: never;
}

export declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props: FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React_2.JSX.Element;

export declare interface FormatterArgs {
    element: StepItem;
    ix: number;
}

export declare const FormControl: React_2.ForwardRefExoticComponent<Omit<SlotProps & React_2.RefAttributes<HTMLElement>, "ref"> & React_2.RefAttributes<HTMLElement>>;

export declare const FormDescription: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLParagraphElement> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => JSX_2.Element;

/**
 * FormikColorPicker is a wrapper around the ColorPicker component that integrates with Formik for form handling.
 *
 * @param name - The name of the field (used for Formik).
 * @param label - The label for the color picker.
 * @param labelType - The type of label, can be 'small' or 'large'.
 * @param validateForm - A function to validate the form when the color is changed.
 * @param tooltip - Optional tooltip text or component to display additional information.
 * @param required - Indicates whether the field is required.
 * @param disabled - Indicates whether the color picker is disabled.
 * @param triggerIcon - An optional icon to display as a trigger for the color picker.
 * @param presetColors - An array of preset colors to display in the color picker.
 * @param position - The position of the color picker relative to the trigger icon.
 * @param submitText - The text to display on the submit button of the color picker.
 * @param colorLabel - The label for the color input field.
 * @param colorTooltip - Optional tooltip for the color input field.
 * @param dataTrigger - Optional data attributes for the trigger icon (for testing purposes).
 * @param dataHexInput - Optional data attributes for the hex input field (for testing purposes).
 * @returns A ColorPicker component that integrates with Formik for form handling.
 */
export declare function FormikColorPicker({ name, label, labelType, validateForm, tooltip, required, disabled, triggerIcon, presetColors, position, submitText, colorLabel, colorTooltip, dataTrigger, dataHexInput, dataSubmit, className, }: FormikColorPickerProps): JSX_2.Element;

export declare interface FormikColorPickerProps {
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    validateForm?: () => void;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    disabled?: boolean;
    triggerIcon?: IconDefinition_2;
    presetColors?: string[];
    position?: 'bottom' | 'top' | 'bottom-left' | 'top-left';
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
    className?: ColorPickerClassName;
}

/**
 * This component provides a simple date changer with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param id - The id of the date changer
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The label of the date changer
 * @param labelType - The type of the label (small or large)
 * @param placeholder - The placeholder of the date changer (is only shown if no date is selected)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param hideError - Whether the error message should be hidden
 * @param format - The format of the date when the edit mode is not active (then the display is up to the browser implementation)
 * @param className - The optional className object allows you to override the default styling.
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button
 * @returns Date changer component with optional label, edit button and save button.
 */
export declare function FormikDatePicker({ id, name, label, labelType, placeholder, tooltip, required, disabled, hideError, className, dataTrigger, dataCalendar, dataNextMonth, dataPreviousMonth, }: FormikDatePickerProps): JSX_2.Element;

export declare interface FormikDatePickerProps extends Omit<DatePickerProps, 'date' | 'onDateChange' | 'error' | 'isTouched'> {
    name: string;
}

/**
 * This component provides a simple datetime picker with a label and a button to edit the date (not coupled to a formik context).
 *
 * @param name - The name of the field as used to keep track of the state in Formik.
 * @param label - The label of the datetime picker.
 * @param labelType - The type of the label (small or large).
 * @param placeholder - The placeholder of the datetime picker (is only shown if no date is selected).
 * @param tooltip - The tooltip of the datetime picker (is only shown if a label is given).
 * @param required - Whether the datetime label should contain a required symbol.
 * @param disabled - Whether the datetime picker is disabled or not.
 * @param hideError - Whether the error message should be hidden.
 * @param className - The optional className object allows you to override the default styling.
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger.
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar icon.
 * @param dataHours - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the hours input.
 * @param dataMinutes - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the minutes input.
 * @param dataSeconds - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the seconds input.
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button.
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button.
 * @returns Datetime picker component with optional label, edit button and save button.
 */
export declare function FormikDatetimePicker({ name, label, labelType, placeholder, tooltip, required, disabled, hideError, className, dataTrigger, dataCalendar, dataHours, dataMinutes, dataSeconds, dataPreviousMonth, dataNextMonth, ...props }: FormikDatetimePickerProps): JSX_2.Element;

export declare interface FormikDatetimePickerProps extends Omit<DateTimePickerProps, 'date' | 'onDateChange' | 'error' | 'isTouched'> {
    name: string;
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param min - The optional min defines the minimum value that is allowed.
 * @param max - The optional max defines the maximum value that is allowed.
 * @param unit - The optional unit is shown next to the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is displayed below the input field.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onBlur - The onBlur function of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 */
export declare function FormikNumberField({ id, name, value, onChange, label, labelType, placeholder, precision, min, max, unit, tooltip, required, hideError, error, isTouched, disabled, onBlur, data, className, ...props }: FormikNumberFieldNameProps | FormikNumberFieldOnChangeProps): JSX_2.Element;

export declare interface FormikNumberFieldNameProps extends FormikNumberFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    isTouched?: never;
}

export declare interface FormikNumberFieldOnChangeProps extends FormikNumberFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    isTouched?: boolean;
}

declare interface FormikNumberFieldProps {
    id?: string;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    precision?: number;
    min?: number;
    max?: number;
    unit?: string;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    disabled?: boolean;
    onBlur?: () => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: NumberFieldClassName & {
        root?: string;
    };
    [key: string]: unknown;
}

/**
 * This function returns a pin field component for use with Formik.
 *
 * @param id - The id of the input field.
 * @param name - The name of the input field (used for Formik).
 * @param length - The length of the pin (number of digits).
 * @param required - Indicate whether the field is required or not.
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param className - The class names for the different parts of the component.
 * @param data - Optional data attributes for testing purposes.
 * @returns A pin field component that integrates with Formik for form handling.
 */
export declare function FormikPinField({ id, name, length, required, label, labelType, tooltip, hideError, className, data, }: FormikPinFieldProps): JSX_2.Element;

export declare interface FormikPinFieldProps {
    id?: string;
    name: string;
    length: number;
    required?: boolean;
    label?: string;
    labelType?: 'small' | 'large';
    tooltip?: string | default_3.ReactNode;
    hideError?: boolean;
    className?: {
        field?: string;
        label?: string;
        tooltip?: string;
        input?: string;
        inputItem?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
}

/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field.
 * @param items - The array of items that should be available on the select component.
 * @param groups - The optional groups array can be used to group items in the select component.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param error - The optional error message is shown next to the component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export declare function FormikSelectField({ id, data, name, items, groups, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: FormikSelectFieldItemsProps | FormikSelectFieldGroupsProps): JSX_2.Element;

export declare interface FormikSelectFieldGroupsProps extends FormikSelectFieldProps {
    groups: SelectGroup[];
    items?: never;
}

export declare interface FormikSelectFieldItemsProps extends FormikSelectFieldProps {
    items: SelectItem[];
    groups?: never;
}

declare interface FormikSelectFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name: string;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    contentPosition?: 'item-aligned' | 'popper';
    className?: {
        root?: string;
        label?: string;
        error?: string;
        tooltip?: string;
        select?: SelectClassName;
    };
}

/**
 * This function extends the pre-styled Switch component so that it works as to be expected in a Formik environment.
 * State, in this case, is managed by Formik through the name attribute.
 *
 * @param id - The id of the switch.
 * @param name - The name of the field. This is used to identify the field in Formik.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param error - The error message that is shown below the switch.
 * @param hideError - Indicator whether the error message is displayed or not.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param tooltip - The tooltip that is displayed when hovering over the label. Tooltips are only available with the standardLabel setting.
 * @param required - Indicator whether the field is required or not. This is only available with the standardLabel setting.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component with formik state management
 */
export declare function FormikSwitchField({ id, name, data, disabled, error, hideError, label, labelLeft, size, required, tooltip, className, }: FormikSwitchFieldProps): JSX_2.Element;

export declare interface FormikSwitchFieldProps {
    id?: string;
    name: string;
    data?: {
        cy?: string;
        test?: string;
    };
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    label?: string;
    labelLeft?: boolean;
    size?: 'sm' | 'md' | 'lg';
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    className?: SwitchClassName;
}

/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param error - The error message that is shown below the field. If a name is provided, this prop will not be used.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param maxLength - The optional maxLength is shown below the field to indicate the maximum number of characters allowed.
 * @param maxLengthUnit - The optional maxLengthUnit is shown next to the maxLength to indicate the unit of the maximum number of characters allowed.
 * @param hideMaxLength - Indicate whether the maxLength should be hidden or not.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikTextareaField({ id, data, name, value, onChange, error, label, labelType, icon, placeholder, tooltip, required, hideError, disabled, className, ...props }: FormikTextareaFieldWithNameProps | FormikTextareaFieldWithOnChangeProps): JSX_2.Element;

declare interface FormikTextareaFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_3.ReactNode;
    maxLength?: number;
    maxLengthUnit?: string;
    hideMaxLength?: boolean;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        icon?: string;
        label?: string;
        input?: string;
        error?: string;
        tooltip?: string;
    };
}

export declare interface FormikTextareaFieldWithNameProps extends FormikTextareaFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    error?: never;
    [key: string]: unknown;
}

export declare interface FormikTextareaFieldWithOnChangeProps extends FormikTextareaFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    error?: string;
    [key: string]: unknown;
}

/**
 * This function returns a text field that works as to be expected in a Formik environment.
 * State can be managed either through Formik or internally by passing a value and onChange function.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field as used to keep track of the state in Formik. If no value and onChange function are provided, this field is required.
 * @param value - The value of the field. This is used to manage the state internally. If no name is provided, this field is required.
 * @param onChange - The onChange function is called when the value of the field changes. This is used to manage the state internally. If no name is provided, this field is required.
 * @param error - The error message that is shown below the field. If a name is provided, this prop will not be used.
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param icon - An optional icon (FontAwesomeIcon IconDefinition) that is shown on the right side of the text input component
 * @param iconPosition - The optional iconPosition can be used to change the position of the icon according to pre-defined standards.
 * @param onIconClick - An optional function that is called when the icon (previous prop) is clicked
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param onPaste - An optional function that is called when the user pastes text into the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikTextField({ id, data, name, value, onChange, error, label, labelType, icon, iconPosition, onIconClick, placeholder, tooltip, required, hideError, isTouched, disabled, onPaste, className, ...props }: FormikTextFieldWithNameProps | FormikTextFieldWithOnChangeProps): JSX_2.Element;

declare interface FormikTextFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    icon?: IconDefinition;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
    placeholder?: string;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    hideError?: boolean;
    disabled?: boolean;
    onPaste?: default_3.ClipboardEventHandler<HTMLInputElement>;
    className?: TextFieldClassName & {
        root?: string;
    };
}

export declare interface FormikTextFieldWithNameProps extends FormikTextFieldProps {
    name: string;
    value?: never;
    onChange?: never;
    error?: never;
    isTouched?: never;
    [key: string]: unknown;
}

export declare interface FormikTextFieldWithOnChangeProps extends FormikTextFieldProps {
    name?: never;
    value: string;
    onChange: (newValue: string) => void;
    error?: string;
    isTouched?: boolean;
    [key: string]: unknown;
}

export declare const FormItem: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLDivElement> & React_2.RefAttributes<HTMLDivElement>>;

export declare function FormLabel({ id, required, label, labelType, className, tooltip, }: FormLabelProps): JSX_2.Element;

export declare interface FormLabelProps {
    id?: string;
    required: boolean;
    label: string;
    labelType: 'small' | 'large';
    className?: {
        label?: string;
        tooltip?: string;
    };
    tooltip?: string | React.ReactNode;
}

export declare const FormMessage: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLParagraphElement> & React_2.RefAttributes<HTMLParagraphElement>>;

declare type Granularity = 'day' | 'hour' | 'minute' | 'second';

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h1 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H1 component
 */
export declare function H1({ id, data, className, children }: HeaderProps): JSX_2.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h2 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H2 component
 */
export declare function H2({ id, data, className, children }: HeaderProps): JSX_2.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h3 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H3 component
 */
export declare function H3({ id, data, className, children }: HeaderProps): JSX_2.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h4 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H4 component
 */
export declare function H4({ id, data, className, children }: HeaderProps): JSX_2.Element;

declare interface HeaderProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    children: default_3.ReactNode;
}

export declare const HoverCard: React_2.FC<HoverCardPrimitive.HoverCardProps>;

export declare const HoverCardContent: React_2.ForwardRefExoticComponent<Omit<HoverCardPrimitive.HoverCardContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const HoverCardTrigger: React_2.ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & React_2.RefAttributes<HTMLAnchorElement>>;

export declare interface IconOnlyButtonProps extends BaseNavigationButtonProps {
    icon: IconDefinition;
    label?: undefined;
    active?: undefined;
    notification?: undefined;
}

export declare interface IconOnlyDropdownProps extends BaseNavigationDropdownProps {
    label?: undefined;
    icon: IconDefinition;
}

declare type Item = StandardItem | CheckboxItem | RadioItem | LabelItem | SeparatorItem;

/**
 * This function returns a label component based on the RadixUI label.
 *
 * @param id - The id of the label.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param forId - The id of the element that the label is for.
 * @param label - The text displayed as label.
 * @param required - Indicate whether the field is required or not.
 * @param tooltip - The optional tooltip is shown on hover over the label.
 * @param showTooltipSymbol - Indicate whether the tooltip symbol should be shown or not.
 * @param tooltipSymbolSize - The size of the tooltip symbol.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Label component with optional tooltip and required symbol.
 */
export declare function Label({ id, data, forId, label, required, tooltip, showTooltipSymbol, tooltipSymbolSize, className, }: LabelProps): default_3.ReactElement;

declare interface LabelItem extends BaseItem {
    type: 'label';
    value?: never;
    label: string | React.ReactNode;
    onClick?: never;
    selected?: never;
}

export declare interface LabelOnlyButtonProps extends BaseNavigationButtonProps {
    label: string;
    icon?: IconDefinition;
    active: boolean;
    notification?: boolean;
}

export declare interface LabelOnlyDropdownProps extends BaseNavigationDropdownProps {
    label: string;
    icon?: IconDefinition;
}

export declare interface LabelProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    forId?: string;
    label: string;
    required?: boolean;
    tooltip?: string | default_3.ReactNode;
    showTooltipSymbol?: boolean;
    tooltipSymbolSize?: 'sm' | 'md' | 'lg' | 'xl';
    className?: {
        root?: string;
        tooltip?: string;
        tooltipSymbol?: string;
        arrow?: string;
    };
}

/**
 * This function returns a pre-styled modal component based on the RadixUI dialog component and the custom theme.
 *
 * @param id - The id of the modal.
 * @param trigger - The optional trigger that opens the modal, if the state is not managed by some parent component already.
 * @param title - The optional title of the modal.
 * @param children - The content of the modal.
 * @param onClose - Function that is called when the modal is closed.
 * @param onPrev - Function that is called when the optional previous button is clicked.
 * @param onNext - Function that is called when the optional next button is clicked.
 * @param open - Indicate whether the modal is open or not. This state is managed outside of the component.
 * @param fullScreen - Indicate whether the modal should be full screen or not.
 * @param onPrimaryAction - The optional primary action, which is executed when clicking on the conditionally rendered primary action button.
 * @param primaryLabel - The label for the primary action button.
 * @param primaryType - The type of the primary action button, which can be 'button', 'submit' or 'reset'.
 * @param primaryButtonStyle - The style of the primary action button, which can be 'default', 'primary' or 'destructive'.
 * @param primaryDisabled - Indicate whether the primary action button should be disabled.
 * @param primaryLoading - Indicate whether the primary action button should be in a loading state.
 * @param onSecondaryAction - The optional secondary action, which is executed when clicking on the conditionally rendered secondary action button.
 * @param secondaryLabel - The label for the secondary action button.
 * @param secondaryType - The type of the secondary action button, which can be 'button', 'submit' or 'reset'.
 * @param secondaryButtonStyle - The style of the secondary action button, which can be 'default', 'primary' or 'destructive'.
 * @param escapeDisabled - Indicate whether the modal should be closed when the escape key is pressed.
 * @param hideCloseButton - Indicate whether the close button should be hidden.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the content
 * @param dataCloseButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the close button
 * @param dataPrimaryAction - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the primary action button
 * @param dataSecondaryAction - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the secondary action button
 * @param className - The optional className object allows you to override the default styling.
 * @returns Modal component
 */
export declare function Modal({ id, trigger, title, children, onClose, onPrev, onNext, open, fullScreen, onPrimaryAction, primaryLabel, primaryType, primaryButtonStyle, primaryDisabled, primaryLoading, onSecondaryAction, secondaryLabel, secondaryType, secondaryButtonStyle, escapeDisabled, hideCloseButton, data, dataContent, dataCloseButton, dataPrimaryAction, dataSecondaryAction, className, }: ModalProps): JSX_2.Element;

export declare interface ModalProps {
    id?: string;
    children: default_3.ReactNode;
    fullScreen?: boolean;
    open: boolean;
    onClose: (e?: default_3.MouseEvent<HTMLButtonElement>) => void;
    title?: string | default_3.ReactNode;
    trigger?: default_3.ReactNode;
    escapeDisabled?: boolean;
    hideCloseButton?: boolean;
    onNext?: (e?: default_3.MouseEvent<HTMLButtonElement>) => void;
    onPrev?: (e?: default_3.MouseEvent<HTMLButtonElement>) => void;
    onPrimaryAction?: (e?: default_3.MouseEvent<HTMLButtonElement>) => void;
    primaryLabel?: string | default_3.ReactNode;
    primaryType?: 'button' | 'submit' | 'reset';
    primaryButtonStyle?: 'default' | 'primary' | 'destructive';
    primaryDisabled?: boolean;
    primaryLoading?: boolean;
    onSecondaryAction?: (e?: default_3.MouseEvent<HTMLButtonElement>) => void;
    secondaryLabel?: string | default_3.ReactNode;
    secondaryType?: 'button' | 'submit' | 'reset';
    secondaryButtonStyle?: 'default' | 'primary' | 'destructive';
    data?: {
        cy?: string;
        test?: string;
    };
    dataContent?: {
        cy?: string;
        test?: string;
    };
    dataCloseButton?: {
        cy?: string;
        test?: string;
    };
    dataPrimaryAction?: {
        cy?: string;
        test?: string;
    };
    dataSecondaryAction?: {
        cy?: string;
        test?: string;
    };
    className?: {
        trigger?: string;
        overlay?: string;
        content?: string;
        header?: string;
        footer?: string;
        title?: string;
        onPrev?: string;
        onNext?: string;
        primary?: string;
        secondary?: string;
    };
}

declare interface MultiValueProgressProps extends BaseProgressProps {
    value: number[];
    className?: {
        root?: string;
        background?: string;
        indicator?: string[];
    };
}

/**
 * This function returns a pre-styled navigation component based on the ShadcnUI menubar component.
 * The navigation component can contain multiple items, including buttons and dropdowns, which are
 * defined through a corresponding data structure passed to the function.
 *
 * @param items - The array of items to display in the navigation (required).
 * @param className - The optional className object to override default styling for the root.
 * @return Navigation component
 */
export declare function Navigation({ items, className, style, ...props }: NavigationProps): JSX_2.Element;

export declare type NavigationButtonItemProps = NavigationButtonProps & {
    type: 'button';
    key: string;
};

export declare type NavigationButtonProps = LabelOnlyButtonProps | IconOnlyButtonProps;

export declare type NavigationDropdownItemProps = NavigationDropdownProps & {
    type: 'dropdown';
    key: string;
};

export declare type NavigationDropdownProps = LabelOnlyDropdownProps | IconOnlyDropdownProps;

export declare type NavigationItemProps = NavigationButtonItemProps | NavigationDropdownItemProps;

export declare const NavigationMenu: React_2.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuProps & React_2.RefAttributes<HTMLElement>, "ref"> & React_2.RefAttributes<HTMLElement>>;

export declare const NavigationMenuContent: React_2.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const NavigationMenuIndicator: React_2.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuIndicatorProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const NavigationMenuItem: React_2.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuItemProps & React_2.RefAttributes<HTMLLIElement>>;

export declare type NavigationMenuItemProps = {
    key: string;
    type: 'link';
    label: string;
    badge?: string | React.ReactNode;
    onClick: React.MouseEventHandler;
    disabled?: boolean;
    notification?: boolean;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        label?: string;
        text?: string;
        badge?: string;
    };
    style?: {
        label?: React.CSSProperties;
        text?: React.CSSProperties;
        badge?: React.CSSProperties;
    };
};

export declare const NavigationMenuLink: React_2.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuLinkProps & React_2.RefAttributes<HTMLAnchorElement>>;

export declare const NavigationMenuList: React_2.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuListProps & React_2.RefAttributes<HTMLUListElement>, "ref"> & React_2.RefAttributes<HTMLUListElement>>;

export declare const NavigationMenuTrigger: React_2.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuTriggerProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

export declare const navigationMenuTriggerStyle: (props?: ClassProp | undefined) => string;

export declare const NavigationMenuViewport: React_2.ForwardRefExoticComponent<Omit<NavigationMenuPrimitive.NavigationMenuViewportProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare interface NavigationProps {
    items: NavigationItemProps[];
    className?: {
        root?: string;
    };
    style?: {
        root?: React.CSSProperties;
    };
    [x: string]: unknown;
}

export declare type NavigationSeparatorProps = {
    key: string;
    type: 'separator';
};

export declare type NavigationSubmenuProps = {
    key: string;
    type: 'submenu';
    label: string;
    options: NavigationMenuItemProps[];
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        label?: string;
    };
    style?: {
        label?: React.CSSProperties;
    };
};

/**
 * This function returns a pre-styled wrapper for some custom component with navigation badge on it.
 *
 * @param id - The id of the notification badge wrapper.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param count - The number of notifications to be displayed on the badge. If no count is provided, the badge will be displayed as a simple red notification dot.
 * @param showBadge - If true, the badge will be displayed as a red dot, even if the number notifications is undefined.
 * @param size - The size of the badge (can be small, medium, large or extra large).
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The component the notification badge should be placed on.
 * @returns Notification badge wrapper component
 */
export declare function NotificationBadgeWrapper({ id, data, count, showBadge, size, className, children, }: NotificationBadgeWrapperProps): default_3.ReactElement;

declare interface NotificationBadgeWrapperProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    count?: number;
    showBadge?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: {
        root?: string;
        badge?: string;
    };
    children: default_3.ReactNode;
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param precision - The optional precision defines the number of decimal places that are allowed.
 * @param min - The optional min defines the minimum value that is allowed.
 * @param max - The optional max defines the maximum value that is allowed.
 * @param unit - The optional unit is shown next to the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is displayed below the input field.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onBlur - The onBlur function of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 */
export declare function NumberField({ id, value, onChange, label, labelType, placeholder, precision, min, max, unit, tooltip, required, hideError, error, isTouched, disabled, onBlur, data, className, ...props }: NumberFieldProps): default_3.ReactElement;

export declare interface NumberFieldClassName {
    field?: string;
    label?: string;
    input?: string;
    unit?: string;
    error?: string;
    tooltip?: string;
}

export declare interface NumberFieldProps {
    id?: string;
    value: string | number;
    onChange: (newValue: string) => void;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    precision?: number;
    min?: number;
    max?: number;
    unit?: string;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    isTouched?: boolean;
    disabled?: boolean;
    onBlur?: () => void;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: NumberFieldClassName;
    [key: string]: unknown;
}

export declare const Pagination: {
    ({ className, ...props }: React_2.ComponentProps<'nav'>): JSX_2.Element;
    displayName: string;
};

export declare const PaginationContent: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "ref"> & React_2.RefAttributes<HTMLUListElement>>;

export declare const PaginationEllipsis: {
    ({ className, ...props }: React_2.ComponentProps<'span'>): JSX_2.Element;
    displayName: string;
};

export declare const PaginationItem: React_2.ForwardRefExoticComponent<Omit<React_2.DetailedHTMLProps<React_2.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, "ref"> & React_2.RefAttributes<HTMLLIElement>>;

export declare const PaginationLink: {
    ({ className, isActive, size, ...props }: PaginationLinkProps): JSX_2.Element;
    displayName: string;
};

declare type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps_2, 'size'> & React_2.ComponentProps<'a'>;

export declare const PaginationNext: {
    ({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX_2.Element;
    displayName: string;
};

export declare const PaginationPrevious: {
    ({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX_2.Element;
    displayName: string;
};

declare type Period = 'AM' | 'PM';

export declare const Popover: React_2.FC<PopoverPrimitive.PopoverProps>;

export declare const PopoverContent: React_2.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const PopoverTrigger: React_2.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value. If multiple values are provided, the indicators are rendered on top of each other (allowing for stacked progress bars).
 * @param offset - The number that determines the offset of the progress bar. The offset is subtracted from the value.
 * @param max - The maximum value of the progress bar.
 * @param formatter - The function that formats the value of the progress bar.
 * @param isMaxVisible - The boolean that determines if the maximum value should be displayed.
 * @param noMinWidth - The boolean that determines if the progress bar should have a minimum width.
 * @param className - The optional className object allows you to override the default styling.
 * @return Progress component
 */
export declare function Progress({ id, data, formatter, value, offset, max, className, isMaxVisible, noMinWidth, ...props }: ProgressProps): JSX_2.Element;

export declare type ProgressProps = SingleValueProgressProps | MultiValueProgressProps;

/**
 * This function returns a pre-styled prose component based on TailwindCSS prose and the custom theme.
 *
 * @param id - The id of the prose component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param children - The content of the prose component.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Children with the standard prose and some custom styling applied to them.
 */
export declare function Prose({ id, data, className, children }: ProseProps): JSX_2.Element;

export declare interface ProseProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    children: default_3.ReactNode;
}

export declare const RadioGroup: React_2.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const RadioGroupItem: React_2.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupItemProps & React_2.RefAttributes<HTMLButtonElement>, "ref"> & React_2.RefAttributes<HTMLButtonElement>>;

declare interface RadioItem extends BaseItem {
    type: 'radio';
    value: string;
    label: string | React.ReactNode;
    onClick: React.MouseEventHandler;
    selected?: never;
}

export declare const ResizableHandle: ({ withHandle, className, ...props }: Omit<HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onFocus" | "onBlur"> & {
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
}) => JSX_2.Element;

export declare const ResizablePanel: ForwardRefExoticComponent<Omit<HTMLAttributes<keyof HTMLElementTagNameMap>, "id" | "onResize"> & {
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

export declare const ResizablePanelGroup: ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => JSX_2.Element;

export declare const ScrollArea: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const ScrollBar: React_2.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

/**
 * This function returns a pre-styled Select component based on the RadixUI select component and the custom theme.
 * While the open state of the component is managed internally, the value of the component is managed externally and passed to the function.
 *
 * @param id - The id of the select component.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param items - The array of items that are displayed in the select component. This prop is mutually exclusive with the groups prop. If items are provided, the component does not look for groups anymore.
 * @param groups - The array of groups that are displayed in the select component. This prop is mutually exclusive with the items prop.
 * @param name - The name attribute of the select component needed for Formik integration --> see FormikSelectField
 * @param onChange - The function that is called when the value of the select component changes (changes externally managed value).
 * @param onBlur - The function that is called when the viewport of the select component is closed.
 * @param value - The current value of the select component (managed externally).
 * @param defaultValue - The default value of the select component set initially.
 * @param placeholder - The placeholder text that is displayed when no value is selected.
 * @param disabled - Specifies whether the select component is disabled or not.
 * @param basic - Specifies whether the select component is basic or not. A basic select component does only have minimal styling of the trigger.
 * @param className - The optional className object allows you to override the default styling.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @return Select component
 */
export declare function Select({ id, data, items, groups, onChange, onBlur, value, disabled, className, name, placeholder, defaultValue, basic, contentPosition, }: SelectWithItemsProps | SelectWithGroupsProps): JSX_2.Element;

export declare interface SelectClassName {
    root?: string;
    trigger?: string;
    content?: string;
    item?: string;
    groupLabel?: string;
    separator?: string;
}

/**
 * This component returns a select field that works as to be expected in a Formik environment.
 * State is managed by Formik through the name attribute.
 *
 * @param id - The id of the field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the field.
 * @param items - The array of items that should be available on the select component.
 * @param groups - The optional groups array can be used to group items in the select component.
 * @param value - The value of the field (external state management).
 * @param onChange - The onChange function of the field (external state management).
 * @param onBlur - The onBlur function of the field (external state management).
 * @param label - The optional label is shown next to the field in the form.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The optional placeholder is shown when no value is selected / initialization with 'undefined' is chosen.
 * @param disabled - The optional disabled prop disables the select component.
 * @param error - The optional error message is shown next to the component.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param contentPosition - The position of the content of the select component. Currently only 'item-aligned' and 'popper' are supported.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Select component with formik state management.
 */
export declare function SelectField({ id, data, name, items, groups, value, onChange, onBlur, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: SelectFieldItemsProps | SelectFieldGroupsProps): JSX_2.Element;

export declare interface SelectFieldGroupsProps extends SelectFieldProps {
    groups: SelectGroup[];
    items?: never;
}

export declare interface SelectFieldItemsProps extends SelectFieldProps {
    items: SelectItem[];
    groups?: never;
}

declare interface SelectFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name?: string;
    value?: string;
    onChange: (newValue: string) => void;
    onBlur?: () => void;
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    hideError?: boolean;
    contentPosition?: 'item-aligned' | 'popper';
    className?: {
        root?: string;
        label?: string;
        error?: string;
        tooltip?: string;
        select?: SelectClassName;
    };
}

export declare interface SelectGroup {
    label?: string | React.ReactNode;
    showSeparator?: boolean;
    items: SelectItem[];
}

export declare interface SelectItem {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value: string;
    disabled?: boolean;
    label: string | React.ReactNode;
    shortLabel?: string;
    icon?: React.ReactNode;
    className?: {
        item?: string;
        tooltip?: string;
        label?: string;
        icon?: string;
    };
    tooltip?: string;
}

declare interface SelectProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    name?: string;
    onChange: (newValue: string) => void;
    onBlur?: () => void;
    value?: string;
    disabled?: boolean;
    className?: SelectClassName;
    placeholder?: string;
    defaultValue?: string;
    basic?: boolean;
    contentPosition?: 'item-aligned' | 'popper';
}

export declare interface SelectWithGroupsProps extends SelectProps {
    groups: SelectGroup[];
    items?: never;
}

export declare interface SelectWithItemsProps extends SelectProps {
    items: SelectItem[];
    groups?: never;
}

export declare const Separator: React_2.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

declare interface SeparatorItem extends BaseItem {
    type: 'separator';
    value?: never;
    label?: never;
    onClick?: never;
    selected?: never;
}

export declare const ShadcnCollapsible: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & RefAttributes<HTMLDivElement>>;

export declare const ShadcnCollapsibleContent: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & RefAttributes<HTMLDivElement>>;

export declare const ShadcnCollapsibleTrigger: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & RefAttributes<HTMLButtonElement>>;

export declare const ShadcnFormLabel: React_2.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React_2.RefAttributes<HTMLLabelElement>, "ref"> & React_2.RefAttributes<HTMLLabelElement>>;

export declare const ShadcnLabel: React_2.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React_2.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: ClassProp | undefined) => string> & React_2.RefAttributes<HTMLLabelElement>>;

export declare const ShadcnTable: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableElement> & {
    containerClassName?: string | undefined;
} & React_2.RefAttributes<HTMLTableElement>>;

export declare const ShadcnTableBody: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const ShadcnTableCaption: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableCaptionElement> & React_2.RefAttributes<HTMLTableCaptionElement>>;

export declare const ShadcnTableCell: React_2.ForwardRefExoticComponent<React_2.TdHTMLAttributes<HTMLTableCellElement> & React_2.RefAttributes<HTMLTableCellElement>>;

export declare const ShadcnTableFooter: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const ShadcnTableHead: React_2.ForwardRefExoticComponent<React_2.ThHTMLAttributes<HTMLTableCellElement> & React_2.RefAttributes<HTMLTableCellElement>>;

export declare const ShadcnTableHeader: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const ShadcnTableRow: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableRowElement> & React_2.RefAttributes<HTMLTableRowElement>>;

export declare const Sheet: React_2.FC<SheetPrimitive.DialogProps>;

export declare const SheetClose: React_2.ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare const SheetContent: React_2.ForwardRefExoticComponent<SheetContentProps & React_2.RefAttributes<HTMLDivElement>>;

declare interface SheetContentProps extends React_2.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {
}

export declare const SheetDescription: React_2.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & React_2.RefAttributes<HTMLParagraphElement>, "ref"> & React_2.RefAttributes<HTMLParagraphElement>>;

export declare const SheetFooter: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX_2.Element;
    displayName: string;
};

export declare const SheetHeader: {
    ({ className, ...props }: React_2.HTMLAttributes<HTMLDivElement>): JSX_2.Element;
    displayName: string;
};

export declare const SheetOverlay: React_2.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogOverlayProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare const SheetPortal: React_2.FC<SheetPrimitive.DialogPortalProps>;

export declare const SheetTitle: React_2.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & React_2.RefAttributes<HTMLHeadingElement>, "ref"> & React_2.RefAttributes<HTMLHeadingElement>>;

export declare const SheetTrigger: React_2.ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & React_2.RefAttributes<HTMLButtonElement>>;

declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "top" | "bottom" | null | undefined;
} & ClassProp) | undefined) => string;

declare interface SingleValueProgressProps extends BaseProgressProps {
    value: number;
    className?: {
        root?: string;
        background?: string;
        indicator?: string;
    };
}

export declare function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX_2.Element;

/**
 * This function returns a pre-styled Slider component based on the RadixUI slider component and the custom theme.
 *
 * @param id - The id of the slider.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the slider. The value should be between the min and max value and is maintained by the parent component.
 * @param defaultValue - The default value of the slider, if the value is undefined
 * @param labels - The labels that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param icons - The icons that are displayed on the slider. The labels and icons props should be mutually exclusive.
 * @param handleChange - The function that is called when the slider value is changed. The new value is passed as a parameter.
 * @param min - The minimum value of the slider.
 * @param max - The maximum value of the slider.
 * @param step - The step size of the slider.
 * @param disabled - Indicator whether the slider is disabled or not.
 * @param compact - Indicator whether the slider should be shown in a compact formm or not
 * @param rangeColorMap - A map that maps a range of values to colors. The color is used to color the range of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param borderColorMap - A map that maps a range of values to colors. The color is used to color the thumb of the slider. The length of the map should be equal to the number of steps and the keys should correspond to the possible values of the slider.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Slider component.
 */
export declare function Slider({ id, value, labels, handleChange, defaultValue, min, max, step, disabled, compact, icons, rangeColorMap, borderColorMap, className, data, dataThumb, }: SliderWithLabelProps | SliderWithIconsProps): default_3.ReactElement;

declare interface SliderProps {
    id?: string;
    value?: number;
    handleChange: (newValue: number) => void;
    defaultValue?: number;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    compact?: boolean;
    rangeColorMap?: Record<string, string>;
    borderColorMap?: Record<string, string>;
    className?: {
        root?: string;
        icons?: string;
        labels?: string;
        label?: string;
        track?: string;
        range?: string;
        thumb?: string;
        lock?: string;
    };
    data?: {
        cy?: string;
        test?: string;
    };
    dataThumb?: {
        cy?: string;
        test?: string;
    };
}

export declare interface SliderWithIconsProps extends SliderProps {
    icons: {
        min: default_3.ReactNode;
        mid: default_3.ReactNode;
        max: default_3.ReactNode;
    };
    labels?: never;
}

export declare interface SliderWithLabelProps extends SliderProps {
    labels?: {
        min?: string;
        mid?: string;
        max?: string;
    };
    icons?: never;
}

declare interface StandardItem extends BaseItem {
    type?: 'standard';
    value?: never;
    label: string | React.ReactNode;
    onClick: React.MouseEventHandler;
    selected?: boolean;
}

declare interface StepBaseProps {
    title: string;
    description?: string;
    tooltip?: string;
    tooltipDisabled?: string;
    progress?: number;
    completed?: boolean;
    error?: boolean;
    [x: string]: unknown;
}

export declare interface StepItem {
    [x: string]: string | number | undefined | null;
}

/**
 * This function returns a pre-styled Progress component based on the RadixUI progress component and the custom theme.
 *
 * @param id - The id of the progress bar.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param value - The value of the progress bar. The value should be between 0 and an optionally provided max value.
 * @param max - The maximum value of the progress bar.
 * @param items - The array of items that are displayed in the step progress bar.
 * @param onItemClick - The function that is called when an item is clicked.
 * @param displayOffsetLeft - The number that determines the maximum number of elements that are shown to the left of the current value on the step progress bar.
 * @param displayOffsetRight - The number that determines the maximum number of elements that are shown to the right of the current value on the step progress bar.
 * @param className - The optional className object allows you to override the default styling.
 * @param formatter - The optional formatter function allows you to override the rendering of each item.
 * @return Step progress component
 */
export declare function StepProgress({ id, data, value, max, items, onItemClick, displayOffsetLeft, displayOffsetRight, className, formatter, }: StepProgressProps | StepProgressItemProps): JSX_2.Element;

declare interface StepProgressBaseProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    value?: number;
    onItemClick: (ix: number, item?: StepItem) => void;
    displayOffsetLeft?: number;
    displayOffsetRight?: number;
    className?: {
        root?: string;
    };
    formatter?: ({ element, ix }: {
        element: StepItem;
        ix: number;
    }) => {
        className?: string;
        element: default_3.ReactNode;
    };
}

export declare interface StepProgressItemProps extends StepProgressBaseProps {
    max?: never;
    items: StepItem[];
}

export declare interface StepProgressProps extends StepProgressBaseProps {
    max: number;
    items?: never;
}

declare interface StepProgressProps_2 extends StepBaseProps {
    progress?: number;
    completed?: boolean;
    error?: boolean;
}

declare interface StepProps extends StepBaseProps {
    progress?: never;
    completed?: never;
    error?: never;
}

/**
 * This function returns a pre-styled Switch component based on the RadixUI switch component and the custom theme.
 * The state of the switch is maintained by the parent component.
 *
 * @param id - The id of the switch.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label that is displayed next to the switch.
 * @param tooltip - The tooltip that is displayed when hovering over the label.
 * @param checked - Indicator whether the switch is checked or not (or indefinite if undefined value). State is managed by the parent component.
 * @param onCheckedChange - The function that is called when the switch is checked or unchecked. The new value is passed as a parameter.
 * @param onBlur - The function that is called when the switch loses focus.
 * @param disabled - Indicator whether the switch is disabled or not.
 * @param fluid - Indicator whether the switch should be fluid or not.
 * @param error - The error message that is shown next the switch.
 * @param hideError - Indicator whether the error message should be hidden or not.
 * @param required - Indicator whether the switch is required or not.
 * @param labelLeft - Indicator whether the label should be displayed on the left or right side of the switch.
 * @param size - The size of the switch. The size can be small, medium or large.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Switch component
 */
export declare function Switch({ id, data, disabled, label, tooltip, checked, onCheckedChange, onBlur, fluid, error, hideError, required, labelLeft, size, className, }: SwitchProps): JSX_2.Element;

export declare interface SwitchClassName {
    root?: string;
    element?: string;
    thumb?: string;
    label?: string;
    tooltip?: string;
}

export declare interface SwitchProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    checked?: boolean;
    onCheckedChange: (newValue: boolean) => void;
    onBlur?: () => void;
    disabled?: boolean;
    label?: string;
    tooltip?: string | default_3.ReactNode;
    fluid?: boolean;
    error?: string;
    hideError?: boolean;
    required?: boolean;
    labelLeft?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: SwitchClassName;
}

export declare function TabContent({ id, value, children, data, className, }: {
    id?: string;
    value: string;
    children: React.ReactNode;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
}): JSX_2.Element;

/**
 * This function returns a pre-styled Table component based on the RadixUI table component and the custom theme.
 * The table is sortable by clicking on the column header.
 * Before the table is being sorted according to the sorting parameters, the transformer will be applied to the data.
 * The formatter is meant to be used for visual modifications of the fields and applied after sorting.
 *
 * @param id - The id of the table.
 * @param dataAttributes - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param columns - The columns of the table. The columns are defined by an array of objects where each object has a label, an accessor and optional transformer and formatters.
 * @param data - The data of the table. The data is defined by an array of objects where each object has a key-value pair for each column.
 * @param caption - The optional caption of the table.
 * @param ref - The optional ref object allows you to access the table methods.
 * @param className - The optional className object allows you to override the default styling.
 * @param forwardedRef - The optional forwardedRef object allows you to access table methods from the parent component.
 * @param emptyCellText - The optional emptyCellText allows you to define the text that should be displayed in empty cells.
 * @param defaultSortField - The optional defaultSortField allows you to define the default sorting field.
 * @param defaultSortOrder - The optional defaultSortOrder allows you to define the default sorting order.
 * @returns Table component
 */
export declare function Table<RowType extends Record<string, string | number | boolean>>({ id, dataAttributes, columns, data, caption, className, forwardedRef, emptyCellText, defaultSortField, defaultSortOrder, }: TableProps<RowType>): JSX_2.Element;

export declare interface TableProps<RowType extends BaseRowType> {
    id?: string;
    dataAttributes?: {
        cy?: string;
        test?: string;
    };
    columns: ColumnType<RowType>[];
    data: RowType[];
    caption?: string;
    className?: {
        root?: string;
        tableHeader?: string;
        body?: string;
        row?: string;
    };
    forwardedRef?: default_3.Ref<unknown>;
    emptyCellText?: string;
    defaultSortField?: string;
    defaultSortOrder?: 'asc' | 'desc';
}

/**
 * This function returns a tabs component for use based on the Shadcn UI prestyled component
 * with simplified / combined interfaces for easier re-use.
 *
 * @param id - The id of the tabs component.
 * @param defaultValue - The default value of the active tab.
 * @param value - The controlled value of the active tab.
 * @param onValueChange - Callback function to handle value changes.
 * @param tabs - An array of tab objects, each containing an id, label, value, and optional data attributes.
 * @param className - Optional class names for styling the tabs and their components.
 * @param children - The content of the tabs, which will be rendered in the corresponding tab content area.
 * @returns A Tabs component that allows users to switch between different content sections.
 */
export declare function Tabs({ id, defaultValue, value, onValueChange, tabs, className, children, }: {
    id?: string;
    defaultValue: string;
    value?: string;
    onValueChange?: (newValue: string) => void;
    tabs: {
        id?: string;
        label: string | React.ReactNode;
        value: string;
        data?: {
            cy?: string;
            test?: string;
        };
        className?: string;
    }[];
    className?: {
        root?: string;
        list?: string;
        trigger?: string;
    };
    children: React.ReactNode;
}): JSX_2.Element;

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export declare function Tag({ id, data, className, label }: TagProps): JSX_2.Element;

export declare interface TagProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        root?: string;
    };
    label: string;
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the input field.
 * @param field - The field object from formik.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param maxLength - The optional maxLength is used to limit the number of characters that can be entered in the field.
 * @param maxLengthUnit - This optional label allows to specify a custom label for the maxLength indicator (e.g. "characters left" supporting internationalization).
 * @param hideMaxLength - Indicate whether the maxLength indicator should be hidden or not.
 * @param required - Indicate whether the field is required or not.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is shown below the field.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with optional label, tooltip, error message and icon.
 */
export declare function TextareaField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, maxLength, maxLengthUnit, hideMaxLength, required, isTouched, hideError, error, disabled, className, ...props }: TextareaFieldNameProps | TextareaFieldOnChangeProps): JSX_2.Element;

export declare interface TextareaFieldNameProps extends TextareaFieldProps {
    name: string;
    field: FieldInputProps<string>;
    value?: never;
    onChange?: never;
    [key: string]: unknown;
}

export declare interface TextareaFieldOnChangeProps extends TextareaFieldProps {
    name?: never;
    field?: never;
    value: string;
    onChange: (newValue: string) => void;
    [key: string]: unknown;
}

declare interface TextareaFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_3.ReactNode;
    maxLength?: number;
    maxLengthUnit?: string;
    hideMaxLength?: boolean;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    isTouched?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        field?: string;
        label?: string;
        input?: string;
        error?: string;
        tooltip?: string;
    };
}

/**
 * This function returns a text field component for use without formik
 *
 * @param id - The id of the input field.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param name - The name of the input field.
 * @param field - The field object from formik.
 * @param value - The value of the input field (external state management).
 * @param onChange - The onChange function of the input field (external state management).
 * @param label - The text displayed as label.
 * @param labelType - The optional labelType can be used to change the size and position of the label according to pre-defined standards.
 * @param placeholder - The placeholder text for the input field.
 * @param tooltip - The optional tooltip is shown on hover over the tooltip next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param isTouched - Indicate whether the field has been touched or not (validation is not handled by this component).
 * @param hideError - Indicate whether the error message should be hidden or not.
 * @param error - The error message that is shown below the field.
 * @param disabled - Indicate whether the field is disabled or not.
 * @param onPaste - The optional onPaste function is called when the user pastes text into the input field.
 * @param className - The optional className object allows you to override the default styling.
 * @param icon - The optional icon is shown on the right side of the input field.
 * @param iconPosition - The optional iconPosition can be used to change the position of the icon to the left side of the input field.
 * @param onIconClick - The optional onIconClick function is called when the icon is clicked.
 * @returns Text field component with optional label, tooltip, error message and icon.
 */
export declare function TextField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, required, isTouched, hideError, error, disabled, onPaste, className, icon, iconPosition, onIconClick, ...props }: TextFieldNameProps | TextFieldOnChangeProps): JSX_2.Element;

export declare interface TextFieldClassName {
    field?: string;
    label?: string;
    input?: string;
    error?: string;
    tooltip?: string;
    icon?: string;
}

export declare interface TextFieldNameProps extends TextFieldProps {
    name: string;
    field: FieldInputProps<string>;
    value?: never;
    onChange?: never;
    [key: string]: unknown;
}

export declare interface TextFieldOnChangeProps extends TextFieldProps {
    name?: never;
    field?: never;
    value: string;
    onChange: (newValue: string) => void;
    [key: string]: unknown;
}

declare interface TextFieldProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    label?: string;
    labelType?: 'small' | 'large';
    placeholder?: string;
    tooltip?: string | default_3.ReactNode;
    required?: boolean;
    hideError?: boolean;
    error?: string;
    isTouched?: boolean;
    disabled?: boolean;
    onPaste?: default_3.ClipboardEventHandler<HTMLInputElement>;
    className?: TextFieldClassName;
    icon?: IconProp;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
}

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};

export declare const TimePicker: React_2.ForwardRefExoticComponent<TimePickerProps & React_2.RefAttributes<TimePickerRef>>;

export declare const TimePickerInput: React_2.ForwardRefExoticComponent<TimePickerInputProps & React_2.RefAttributes<HTMLInputElement>>;

declare interface TimePickerInputProps extends React_2.InputHTMLAttributes<HTMLInputElement> {
    picker: TimePickerType;
    date?: Date | null;
    onDateChange?: (date: Date | undefined) => void;
    period?: Period;
    onRightFocus?: () => void;
    onLeftFocus?: () => void;
}

declare interface TimePickerProps {
    date?: Date | null;
    onChange?: (date: Date | undefined) => void;
    disabled?: boolean;
    hourCycle?: 12 | 24;
    /**
     * Determines the smallest unit that is displayed in the datetime picker.
     * Default is 'second'.
     * */
    granularity?: Granularity;
    dataHours?: {
        cy?: string;
        test?: string;
    };
    dataMinutes?: {
        cy?: string;
        test?: string;
    };
    dataSeconds?: {
        cy?: string;
        test?: string;
    };
}

declare interface TimePickerRef {
    minuteRef: HTMLInputElement | null;
    hourRef: HTMLInputElement | null;
    secondRef: HTMLInputElement | null;
}

export declare type TimePickerType = 'minutes' | 'seconds' | 'hours' | '12hours';

export declare function toast({ message, options, type, }: {
    message?: React.ReactNode;
    options?: ExternalToast;
    type?: 'success' | 'warning' | 'error';
}): string | number;

export declare const Toaster: ({ ...props }: ToasterProps) => JSX_2.Element;

declare type ToasterProps = React.ComponentProps<typeof Toaster_2>;

/**
 * This function returns a pre-styled Tooltip component based on the RadixUI tooltip component and the custom theme.
 *
 * @param id - The id of the tooltip.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) of the content
 * @param tooltip - The content of the tooltip.
 * @param delay - The delay in milliseconds before the tooltip is shown.
 * @param children - The child component that triggers the tooltip.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tooltip component
 */
export declare function Tooltip({ id, data, dataContent, tooltip, delay, children, className, }: TooltipProps): default_3.ReactElement;

export declare interface TooltipProps {
    id?: string;
    tooltip: default_3.ReactNode | string;
    delay?: number;
    children: default_3.ReactNode;
    data?: {
        cy?: string;
        test?: string;
    };
    dataContent?: {
        cy?: string;
        test?: string;
    };
    className?: {
        tooltip?: string;
        trigger?: string;
        arrow?: string;
    };
}

export declare function useArrowNavigation({ onArrowLeft, onArrowRight, onArrowUp, onArrowDown, }: useArrowNavigationProps): void;

export declare interface useArrowNavigationProps {
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
}

declare type UseCarouselParameters = Parameters<typeof default_2>;

export declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: FieldError | undefined;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};

/**
 * This function returns a pre-styled UserNotification component based on the custom theme.
 *
 * @param id - The id of the notification.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param message - The message that is displayed in the notification.
 * @param type - The type of the notification. This can be either 'success', 'info' or 'error'. This determines the icon that is displayed and some conditional styling. If not type is provided, the information icon is displayed.
 * @param children - The optional children are displayed in the notification in addition to the provided message icon.
 * @param className - The optional className object allows you to override the default styling.
 * @returns UserNotification component
 */
export declare function UserNotification({ id, data, message, type, children, className, }: UserNotificationMessageProps | UserNotificationChildrenProps): JSX_2.Element;

export declare interface UserNotificationChildrenProps extends UserNotificationProps {
    message?: never;
    children: default_3.ReactNode;
}

export declare interface UserNotificationMessageProps extends UserNotificationProps {
    message: string;
    children?: default_3.ReactNode;
}

export declare interface UserNotificationProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    message?: string;
    type?: 'default' | 'info' | 'success' | 'warning' | 'error';
    children?: default_3.ReactNode;
    className?: {
        root?: string;
        icon?: string;
        message?: string;
        content?: string;
    };
}

/**
 * This function returns a pre-styled Workflow component. Theme-based styling is not available for this component at the moment, use the twStyles or className objects instead to override default styling.
 *
 * @param items - The array of steps that should be displayed in the workflow.
 * @param onClick - The function that is called when a step is clicked. The step object is passed as an argument.
 * @param activeIx - The index of the active step. State management is not handled by this component.
 * @param twStyles - The optional twStyles object allows you to override the default styling.
 * @param minimal - The optional minimal boolean allows you to render the workflow with minimal space requirements.
 * @param disabledFrom - The optional disabledFrom number allows you to disable steps from a certain index onwards.
 * @param showTooltipSymbols - The optional showTooltipSymbols boolean allows you to show the tooltip symbols.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Workflow component
 */
export declare function Workflow({ items, onClick, activeIx, twStyles, minimal, disabledFrom, showTooltipSymbols, className, }: WorkflowProps | WorkflowProgressProps): JSX_2.Element;

declare interface WorkflowBaseProps {
    activeIx?: number;
    twStyles?: {
        bgHover: string;
        bgActive: string;
        bgPast: string;
    };
    minimal?: boolean;
    disabledFrom?: number;
    showTooltipSymbols?: boolean;
    className?: {
        root?: string;
        item?: string;
        active?: string;
        past?: string;
        title?: string;
        description?: string;
    };
}

export declare function WorkflowItem({ item, ix, hasDescription, minimal, activeIx, disabled, tooltip, showTooltipSymbols, onClick, numItems, twStyles, className, }: WorkflowItemProps): JSX_2.Element;

declare interface WorkflowItemProps {
    item: StepProps | StepProgressProps_2;
    onClick: (item: StepProps | StepProgressProps_2, ix: number) => void;
    ix: number;
    hasDescription: boolean;
    minimal: boolean;
    activeIx?: number;
    disabled: boolean;
    tooltip?: string;
    showTooltipSymbols?: boolean;
    numItems: number;
    twStyles: {
        bgHover: string;
        bgActive: string;
        bgPast: string;
    };
    className?: {
        root?: string;
        item?: string;
        active?: string;
        past?: string;
        title?: string;
        description?: string;
    };
}

export declare interface WorkflowProgressProps extends WorkflowBaseProps {
    activeIx?: number;
    items: StepProgressProps_2[];
    onClick: (item: StepProps | StepProgressProps_2, ix: number) => void;
}

export declare interface WorkflowProps extends WorkflowBaseProps {
    activeIx: number;
    items: StepProps[];
    onClick: (item: StepProps | StepProgressProps_2, ix: number) => void;
}

export { }


declare namespace Calendar {
    var displayName: string;
}

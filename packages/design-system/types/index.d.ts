import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { ClassProp } from 'class-variance-authority/types';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Command as Command_2 } from 'cmdk';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ControllerProps } from 'react-hook-form';
import { DayButton } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { DayPickerProps } from 'react-day-picker';
import { default as default_2 } from 'embla-carousel-react';
import { default as default_3 } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Dispatch } from 'react';
import { Drawer as Drawer_2 } from 'vaul';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ExternalToast } from 'sonner';
import { FieldError } from 'react-hook-form';
import { FieldInputProps } from 'formik';
import { FieldPath } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { FormProviderProps } from 'react-hook-form';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition as IconDefinition_2 } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { JSX } from 'react/jsx-runtime';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React_2 from 'react';
import * as RechartsPrimitive from 'recharts';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { SetStateAction } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ToasterProps } from 'sonner';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { UseEmblaCarouselType } from 'embla-carousel-react';
import { VariantProps } from 'class-variance-authority';

export declare function Accordion({ ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Root>): JSX.Element;

export declare function AccordionContent({ className, children, ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Content>): JSX.Element;

export declare function AccordionItem({ className, ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Item>): JSX.Element;

export declare function AccordionTrigger({ className, children, ...props }: React_2.ComponentProps<typeof AccordionPrimitive.Trigger>): JSX.Element;

export declare function Alert({ className, variant, ...props }: React_2.ComponentProps<'div'> & VariantProps<typeof alertVariants>): JSX.Element;

export declare function AlertDescription({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function AlertDialog({ ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Root>): JSX.Element;

export declare function AlertDialogAction({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Action>): JSX.Element;

export declare function AlertDialogCancel({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Cancel>): JSX.Element;

export declare function AlertDialogContent({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Content>): JSX.Element;

export declare function AlertDialogDescription({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Description>): JSX.Element;

export declare function AlertDialogFooter({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function AlertDialogHeader({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function AlertDialogOverlay({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Overlay>): JSX.Element;

export declare function AlertDialogPortal({ ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Portal>): JSX.Element;

export declare function AlertDialogTitle({ className, ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Title>): JSX.Element;

export declare function AlertDialogTrigger({ ...props }: React_2.ComponentProps<typeof AlertDialogPrimitive.Trigger>): JSX.Element;

export declare function AlertTitle({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>): JSX.Element;

export declare function Avatar({ className, ...props }: React_2.ComponentProps<typeof AvatarPrimitive.Root>): JSX.Element;

export declare function AvatarFallback({ className, ...props }: React_2.ComponentProps<typeof AvatarPrimitive.Fallback>): JSX.Element;

export declare function AvatarImage({ className, ...props }: React_2.ComponentProps<typeof AvatarPrimitive.Image>): JSX.Element;

export declare function Badge({ className, variant, asChild, ...props }: React_2.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): JSX.Element;

export declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & ClassProp) | undefined) => string;

declare type BaseItem = {
    id: string;
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

export declare function Breadcrumb({ ...props }: React_2.ComponentProps<'nav'>): JSX.Element;

export declare function BreadcrumbEllipsis({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function BreadcrumbItem({ className, ...props }: React_2.ComponentProps<'li'>): JSX.Element;

export declare function BreadcrumbLink({ asChild, className, ...props }: React_2.ComponentProps<'a'> & {
    asChild?: boolean;
}): JSX.Element;

export declare function BreadcrumbList({ className, ...props }: React_2.ComponentProps<'ol'>): JSX.Element;

export declare function BreadcrumbPage({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function BreadcrumbSeparator({ children, className, ...props }: React_2.ComponentProps<'li'>): JSX.Element;

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
export declare function Button({ id, children, onClick, disabled, primary, destructive, active, fluid, basic, loading, type, className, data, ...props }: ButtonProps): JSX.Element;

export declare namespace Button {
    var Icon: ({ icon, withoutLabel, loading, className, }: {
        icon: IconDefinition;
        withoutLabel?: boolean;
        loading?: boolean;
        className?: {
            root?: string;
        };
    }) => JSX.Element | null;
    var Label: ({ className, children, }: {
        className?: {
            root?: string;
        };
        children: React.ReactNode;
    }) => JSX.Element;
    var IconGroup: ({ state, setState, className, children, }: ButtonIconGroupProps) => JSX.Element;
}

declare function Button_2({ className, variant, size, asChild, ...props }: React_2.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): JSX.Element;

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

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, dataPreviousMonth, dataNextMonth, ...props }: React_2.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React_2.ComponentProps<typeof Button_2>['variant'];
    dataPreviousMonth?: {
        cy?: string;
        test?: string;
    };
    dataNextMonth?: {
        cy?: string;
        test?: string;
    };
}): JSX.Element;

export declare function CalendarDayButton({ className, day, modifiers, ...props }: React_2.ComponentProps<typeof DayButton>): JSX.Element;

export declare function Card({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CardContent({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CardDescription({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CardFooter({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CardHeader({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CardTitle({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function Carousel({ orientation, opts, setApi, plugins, className, children, ...props }: React_2.ComponentProps<'div'> & CarouselProps): JSX.Element;

export declare type CarouselApi = UseEmblaCarouselType[1];

export declare function CarouselContent({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CarouselItem({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function CarouselNext({ className, variant, size, ...props }: React_2.ComponentProps<typeof Button_2>): JSX.Element;

declare type CarouselOptions = UseCarouselParameters[0];

declare type CarouselPlugin = UseCarouselParameters[1];

export declare function CarouselPrevious({ className, variant, size, ...props }: React_2.ComponentProps<typeof Button_2>): JSX.Element;

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

export declare function ChartContainer({ id, className, children, config, ...props }: React_2.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React_2.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}): JSX.Element;

export declare const ChartLegend: typeof RechartsPrimitive.Legend;

export declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: React_2.ComponentProps<'div'> & Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean;
    nameKey?: string;
}): JSX.Element | null;

export declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => JSX.Element | null;

export declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;

export declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React_2.ComponentProps<typeof RechartsPrimitive.Tooltip> & React_2.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
}): JSX.Element | null;

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
    items?: never;
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
export declare function Collapsible({ id, data, open, onChange, staticContent, closedContent, customTrigger, primary, onPrimaryClick, secondary, onSecondaryClick, className, children, }: CollapsibleProps): JSX.Element;

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
export declare function ColorPicker({ color, label, labelType, required, onSubmit, disabled, triggerIcon, presetColors, position, submitText, colorLabel, tooltip, colorTooltip, error, isTouched, dataTrigger, dataHexInput, dataSubmit, className, }: ColorPickerProps): JSX.Element;

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

export declare function Command({ className, ...props }: React_2.ComponentProps<typeof Command_2>): JSX.Element;

export declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: React_2.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}): JSX.Element;

export declare function CommandEmpty({ ...props }: React_2.ComponentProps<typeof Command_2.Empty>): JSX.Element;

export declare function CommandGroup({ className, ...props }: React_2.ComponentProps<typeof Command_2.Group>): JSX.Element;

export declare function CommandInput({ className, ...props }: React_2.ComponentProps<typeof Command_2.Input>): JSX.Element;

export declare function CommandItem({ className, ...props }: React_2.ComponentProps<typeof Command_2.Item>): JSX.Element;

export declare function CommandList({ className, ...props }: React_2.ComponentProps<typeof Command_2.List>): JSX.Element;

export declare function CommandSeparator({ className, ...props }: React_2.ComponentProps<typeof Command_2.Separator>): JSX.Element;

export declare function CommandShortcut({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function ContextMenu({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Root>): JSX.Element;

export declare function ContextMenuCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>): JSX.Element;

export declare function ContextMenuContent({ className, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Content>): JSX.Element;

export declare function ContextMenuGroup({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Group>): JSX.Element;

export declare function ContextMenuItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): JSX.Element;

export declare function ContextMenuLabel({ className, inset, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function ContextMenuPortal({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Portal>): JSX.Element;

export declare function ContextMenuRadioGroup({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>): JSX.Element;

export declare function ContextMenuRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.RadioItem>): JSX.Element;

export declare function ContextMenuSeparator({ className, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Separator>): JSX.Element;

export declare function ContextMenuShortcut({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function ContextMenuSub({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Sub>): JSX.Element;

export declare function ContextMenuSubContent({ className, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.SubContent>): JSX.Element;

export declare function ContextMenuSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function ContextMenuTrigger({ ...props }: React_2.ComponentProps<typeof ContextMenuPrimitive.Trigger>): JSX.Element;

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
export declare function Countdown({ isStatic, expiresAt, formatter, onExpire, onUpdate, data, className, }: CountdownProps): JSX.Element;

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
export declare function CycleCountdown({ expiresAt, totalDuration, size, overrideSize, color, strokeWidthRem, isStatic, terminalColor, terminalPercentage, formatter, onExpire, onUpdate, data, className, }: CycleCountdownProps): JSX.Element;

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
export declare function CycleProgress({ size, overrideSize, percentage, color, strokeWidthRem, children, data, className, }: CycleProgressProps): JSX.Element;

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
 * @param align - The alignment of the label (start, center or end)
 * @param placeholder - The placeholder of the date changer (is only shown if no date is selected)
 * @param tooltip - The tooltip of the date changer (is only shown if a label is given)
 * @param required - Whether the date label should contain a required symbol
 * @param disabled - Whether the date changer is disabled or not
 * @param error - The error message to be displayed
 * @param hideError - Whether the error message should be hidden
 * @param isTouched - Whether the date changer has been touched
 * @param className - The optional className object allows you to override the default styling.
 * @param onDateChange - The function to be called when the date is changed (state management)
 * @param dataTrigger - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the popover trigger
 * @param dataCalendar - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the calendar
 * @param dataNextMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next month button
 * @param dataPreviousMonth - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous month button
 * @returns Date changer component with optional label, edit button and save button.
 */
export declare function DatePicker({ id, date, onDateChange, label, labelType, align, placeholder, tooltip, required, disabled, error, hideError, isTouched, className, dataTrigger, dataCalendar, dataNextMonth, dataPreviousMonth, ...props }: DatePickerProps): JSX.Element;

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
    align?: 'start' | 'center' | 'end';
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

/**
 * This component provides a date and time picker with optional label, error handling, and customizable display and granularity.
 *
 * @param value - The currently selected date value.
 * @param onChange - Callback function called when the date value changes.
 * @param onMonthChange - Callback function called when the displayed month changes.
 * @param disabled - Whether the picker is disabled.
 * @param hourCycle - Whether to use 12-hour or 24-hour time format.
 * @param placeholder - Placeholder text shown when no date is selected / the state is undefined.
 * @param yearRange - The range of years to display in the year dropdown, relative to the current year.
 * @param displayFormat - The dayjs format string to display the date in the input field.
 * @param granularity - The smallest unit displayed by the picker (e.g., 'second', 'minute', 'hour', 'day').
 * @param className - Optional object to override default styling for trigger, input, label, tooltip, and error.
 * @param defaultPopupValue - The default date and time shown when the calendar popup opens.
 * @param dataTrigger - Data attributes for testing the popover trigger.
 * @param dataCalendar - Data attributes for testing the calendar.
 * @param dataHours - Data attributes for testing the hours input.
 * @param dataMinutes - Data attributes for testing the minutes input.
 * @param dataSeconds - Data attributes for testing the seconds input.
 * @param dataNextMonth - Data attributes for testing the next month button.
 * @param dataPreviousMonth - Data attributes for testing the previous month button.
 * @param error - Error message to display.
 * @param hideError - Whether to hide the error message.
 * @param isTouched - Whether the picker has been interacted with.
 * @param label - The label for the picker.
 * @param labelType - The type of label to display ('small' or 'large').
 * @param align - The alignment of the label ('start', 'center', or 'end').
 * @param required - Whether the label should indicate a required field.
 * @param tooltip - Tooltip content shown with the label.
 * @param locale - The locale for date formatting and calendar display.
 * @param weekStartsOn - The day the week starts on in the calendar.
 * @param showWeekNumber - Whether to show the week number in the calendar.
 * @param showOutsideDays - Whether to show days from adjacent months in the calendar.
 * @returns Date and time picker component with optional label, error display, and customizable granularity and formatting.
 */
export declare const DateTimePicker: React_2.ForwardRefExoticComponent<{
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
    labelType?: "small" | "large";
    align?: "start" | "center" | "end";
    required?: boolean;
    tooltip?: string | React_2.ReactNode;
} & Pick<DayPickerProps, "showOutsideDays" | "showWeekNumber" | "locale" | "weekStartsOn"> & React_2.RefAttributes<Partial<DateTimePickerRef>>>;

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
    align?: 'start' | 'center' | 'end';
    required?: boolean;
    tooltip?: string | React_2.ReactNode;
} & Pick<DayPickerProps, 'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'>;

export declare type DateTimePickerRef = {
    value?: Date;
} & Omit<HTMLButtonElement, 'value'>;

declare function Dialog({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Root>): JSX.Element;

export declare function Drawer({ ...props }: React_2.ComponentProps<typeof Drawer_2.Root>): JSX.Element;

export declare function DrawerClose({ ...props }: React_2.ComponentProps<typeof Drawer_2.Close>): JSX.Element;

export declare function DrawerContent({ className, children, ...props }: React_2.ComponentProps<typeof Drawer_2.Content>): JSX.Element;

export declare function DrawerDescription({ className, ...props }: React_2.ComponentProps<typeof Drawer_2.Description>): JSX.Element;

export declare function DrawerFooter({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function DrawerHeader({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function DrawerOverlay({ className, ...props }: React_2.ComponentProps<typeof Drawer_2.Overlay>): JSX.Element;

export declare function DrawerPortal({ ...props }: React_2.ComponentProps<typeof Drawer_2.Portal>): JSX.Element;

export declare function DrawerTitle({ className, ...props }: React_2.ComponentProps<typeof Drawer_2.Title>): JSX.Element;

export declare function DrawerTrigger({ ...props }: React_2.ComponentProps<typeof Drawer_2.Trigger>): JSX.Element;

/**
 * This function returns a pre-styled Dropdown component based on the RadixUI dropdown component and the custom theme.
 *
 * @param id - The id of the dropdown.
 * @param trigger - The content of the trigger button or a custom trigger component to replace the default button.
 * @param items - The items that are displayed in the dropdown menu. This attribute should not be set, if groups are used.
 * @param radioGroups - The radio groups that are displayed in the dropdown menu. This attribute should not be set, if items are used.
 * @param align - The alignment of the dropdown menu. Default is 'start'.
 * @param className - The optional className object allows you to override the default styling.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param disabled - Indicate whether the dropdown is disabled or not. Conditional styling is applied, if this is true.
 * @returns Dropdown component
 */
export declare function Dropdown({ id, disabled, trigger, items, radioGroups, align, data, className, }: DropdownWithItemsProps | DropdownWithGroupsProps): JSX.Element;

export declare function DropdownItem({ item, className, }: {
    item: Item;
    className?: string;
}): JSX.Element | null;

export declare function DropdownLabelShortcut({ label, shortcut, tooltip, tooltipClassName, }: {
    label: string | React.ReactNode;
    shortcut?: string;
    tooltip?: string;
    tooltipClassName?: string;
}): JSX.Element;

declare interface DropdownProps {
    id?: string;
    disabled?: boolean;
    trigger: string | React.ReactNode;
    items?: Item[];
    radioGroups?: {
        value?: string;
        items: Item[];
    }[];
    align?: 'start' | 'center' | 'end';
    data?: {
        cy?: string;
        test?: string;
    };
    className?: {
        trigger?: string;
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

export declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React_2.JSX.Element;

export declare interface FormatterArgs {
    element: StepItem;
    ix: number;
}

export declare function FormControl({ ...props }: React_2.ComponentProps<typeof Slot>): JSX.Element;

export declare function FormDescription({ className, ...props }: React_2.ComponentProps<'p'>): JSX.Element;

export declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => JSX.Element;

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
export declare function FormikColorPicker({ name, label, labelType, validateForm, tooltip, required, disabled, triggerIcon, presetColors, position, submitText, colorLabel, colorTooltip, dataTrigger, dataHexInput, dataSubmit, className, }: FormikColorPickerProps): JSX.Element;

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
export declare function FormikDatePicker({ id, name, label, labelType, placeholder, tooltip, required, disabled, hideError, className, dataTrigger, dataCalendar, dataNextMonth, dataPreviousMonth, ...props }: FormikDatePickerProps): JSX.Element;

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
export declare function FormikDatetimePicker({ name, label, labelType, placeholder, tooltip, required, disabled, hideError, className, dataTrigger, dataCalendar, dataHours, dataMinutes, dataSeconds, dataPreviousMonth, dataNextMonth, ...props }: FormikDatetimePickerProps): JSX.Element;

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
export declare function FormikNumberField({ id, name, value, onChange, label, labelType, placeholder, precision, min, max, unit, tooltip, required, hideError, error, isTouched, disabled, onBlur, data, className, ...props }: FormikNumberFieldNameProps | FormikNumberFieldOnChangeProps): JSX.Element;

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
export declare function FormikPinField({ id, name, length, required, label, labelType, tooltip, hideError, className, data, }: FormikPinFieldProps): JSX.Element;

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
export declare function FormikSelectField({ id, data, name, items, groups, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: FormikSelectFieldItemsProps | FormikSelectFieldGroupsProps): JSX.Element;

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
export declare function FormikSwitchField({ id, name, data, disabled, error, hideError, label, labelLeft, size, required, tooltip, className, }: FormikSwitchFieldProps): JSX.Element;

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
export declare function FormikTextareaField({ id, data, name, value, onChange, error, label, labelType, icon, placeholder, tooltip, required, hideError, disabled, className, ...props }: FormikTextareaFieldWithNameProps | FormikTextareaFieldWithOnChangeProps): JSX.Element;

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
 * @param onEnter - An optional function that is called when the user presses the Enter key in the input field.
 * @param onReset - The optional onReset function adds a cancellation icon to the text field (right side; replacing icons positioned there)
 * @param placeholder - The optional placeholder is shown when the field is empty.
 * @param tooltip - The optional tooltip is shown on hover next to the label.
 * @param required - Indicate whether the field is required or not.
 * @param hideError - Hide the error message below this component as is might be more appropriate to show it somewhere else.
 * @param disabled - Disable the field.
 * @param onPaste - An optional function that is called when the user pastes text into the field.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Text field component with Formik state management.
 */
export declare function FormikTextField({ id, data, name, value, onChange, onEnter, onReset, error, label, labelType, icon, iconPosition, onIconClick, placeholder, tooltip, required, hideError, isTouched, disabled, onPaste, className, ...props }: FormikTextFieldWithNameProps | FormikTextFieldWithOnChangeProps): JSX.Element;

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
    onEnter?: (event: default_3.KeyboardEvent<HTMLInputElement>) => void;
    onReset?: () => void;
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

export declare function FormItem({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function FormLabel({ id, required, label, labelType, className, tooltip, }: FormLabelProps): JSX.Element;

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

export declare function FormMessage({ className, ...props }: React_2.ComponentProps<'p'>): JSX.Element | null;

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
export declare function H1({ id, data, className, children }: HeaderProps): JSX.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h2 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H2 component
 */
export declare function H2({ id, data, className, children }: HeaderProps): JSX.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h3 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H3 component
 */
export declare function H3({ id, data, className, children }: HeaderProps): JSX.Element;

/**
 * This function returns a pre-styled header component with custom font similarly sized to the default h4 tag.
 *
 * @param id - The id of the header.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param className - The optional className object allows you to override the default styling.
 * @param children - The content of the header.
 * @returns Header H4 component
 */
export declare function H4({ id, data, className, children }: HeaderProps): JSX.Element;

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

export declare function HoverCard({ ...props }: React_2.ComponentProps<typeof HoverCardPrimitive.Root>): JSX.Element;

export declare function HoverCardContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof HoverCardPrimitive.Content>): JSX.Element;

export declare function HoverCardTrigger({ ...props }: React_2.ComponentProps<typeof HoverCardPrimitive.Trigger>): JSX.Element;

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

declare function Input({ className, type, ...props }: React_2.ComponentProps<'input'>): JSX.Element;

declare type Item = StandardItem | CheckboxItem | RadioItem | LabelItem | SeparatorItem | SubmenuItem;

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
    items?: never;
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
 * @param loading - Indicate whether the modal is in a loading state.
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
export declare function Modal({ id, trigger, title, children, onClose, onPrev, onNext, open, loading, fullScreen, onPrimaryAction, primaryLabel, primaryType, primaryButtonStyle, primaryDisabled, primaryLoading, onSecondaryAction, secondaryLabel, secondaryType, secondaryButtonStyle, escapeDisabled, hideCloseButton, data, dataContent, dataCloseButton, dataPrimaryAction, dataSecondaryAction, className, }: ModalProps): JSX.Element;

export declare interface ModalProps {
    id?: string;
    children: default_3.ReactNode;
    fullScreen?: boolean;
    open: boolean;
    loading?: boolean;
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
export declare function Navigation({ items, className, style, ...props }: NavigationProps): JSX.Element;

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

export declare function NavigationMenu({ className, children, viewport, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): JSX.Element;

export declare function NavigationMenuContent({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Content>): JSX.Element;

export declare function NavigationMenuIndicator({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): JSX.Element;

export declare function NavigationMenuItem({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Item>): JSX.Element;

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

export declare function NavigationMenuLink({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Link>): JSX.Element;

export declare function NavigationMenuList({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.List>): JSX.Element;

export declare function NavigationMenuTrigger({ className, children, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): JSX.Element;

export declare const navigationMenuTriggerStyle: (props?: ClassProp | undefined) => string;

export declare function NavigationMenuViewport({ className, ...props }: React_2.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): JSX.Element;

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

export declare function Pagination({ className, ...props }: React_2.ComponentProps<'nav'>): JSX.Element;

export declare function PaginationContent({ className, ...props }: React_2.ComponentProps<'ul'>): JSX.Element;

export declare function PaginationEllipsis({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function PaginationItem({ ...props }: React_2.ComponentProps<'li'>): JSX.Element;

export declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): JSX.Element;

declare type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React_2.ComponentProps<typeof Button_2>, 'size'> & React_2.ComponentProps<'a'>;

export declare function PaginationNext({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX.Element;

export declare function PaginationPrevious({ className, ...props }: React_2.ComponentProps<typeof PaginationLink>): JSX.Element;

declare type Period = 'AM' | 'PM';

export declare function Popover({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Root>): JSX.Element;

export declare function PopoverContent({ className, align, sideOffset, ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Content>): JSX.Element;

export declare function PopoverTrigger({ ...props }: React_2.ComponentProps<typeof PopoverPrimitive.Trigger>): JSX.Element;

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
export declare function Progress({ id, data, formatter, value, offset, max, className, isMaxVisible, noMinWidth, ...props }: ProgressProps): JSX.Element;

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
export declare function Prose({ id, data, className, children }: ProseProps): JSX.Element;

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

export declare function RadioGroup({ className, ...props }: React_2.ComponentProps<typeof RadioGroupPrimitive.Root>): JSX.Element;

export declare function RadioGroupItem({ className, ...props }: React_2.ComponentProps<typeof RadioGroupPrimitive.Item>): JSX.Element;

declare interface RadioItem extends BaseItem {
    type: 'radio';
    value: string;
    label: string | React.ReactNode;
    items?: never;
    onClick: React.MouseEventHandler;
    selected?: never;
}

export declare function ResizableHandle({ withHandle, className, ...props }: React_2.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}): JSX.Element;

export declare function ResizablePanel({ ...props }: React_2.ComponentProps<typeof ResizablePrimitive.Panel>): JSX.Element;

export declare function ResizablePanelGroup({ className, ...props }: React_2.ComponentProps<typeof ResizablePrimitive.PanelGroup>): JSX.Element;

export declare function ScrollArea({ className, children, ...props }: React_2.ComponentProps<typeof ScrollAreaPrimitive.Root>): JSX.Element;

export declare function ScrollBar({ className, orientation, ...props }: React_2.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): JSX.Element;

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
export declare function Select({ id, data, items, groups, onChange, onBlur, value, disabled, className, name, placeholder, defaultValue, basic, contentPosition, }: SelectWithItemsProps | SelectWithGroupsProps): JSX.Element;

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
export declare function SelectField({ id, data, name, items, groups, value, onChange, onBlur, label, labelType, placeholder, tooltip, required, disabled, error, hideError, contentPosition, className, ...props }: SelectFieldItemsProps | SelectFieldGroupsProps): JSX.Element;

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
    hideSeparator?: boolean;
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

export declare function Separator({ className, orientation, decorative, ...props }: React_2.ComponentProps<typeof SeparatorPrimitive.Root>): JSX.Element;

declare interface SeparatorItem extends BaseItem {
    type: 'separator';
    value?: never;
    label?: never;
    items?: never;
    onClick?: never;
    selected?: never;
}

export declare function ShadcnCollapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>): JSX.Element;

export declare function ShadcnCollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>): JSX.Element;

export declare function ShadcnCollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>): JSX.Element;

export declare function ShadcnDropdownMenu({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Root>): JSX.Element;

export declare function ShadcnDropdownMenuCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): JSX.Element;

export declare function ShadcnDropdownMenuContent({ className, sideOffset, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Content>): JSX.Element;

export declare function ShadcnDropdownMenuGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Group>): JSX.Element;

export declare function ShadcnDropdownMenuItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): JSX.Element;

export declare function ShadcnDropdownMenuLabel({ className, inset, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function ShadcnDropdownMenuPortal({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Portal>): JSX.Element;

export declare function ShadcnDropdownMenuRadioGroup({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): JSX.Element;

export declare function ShadcnDropdownMenuRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): JSX.Element;

export declare function ShadcnDropdownMenuSeparator({ className, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Separator>): JSX.Element;

export declare function ShadcnDropdownMenuShortcut({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function ShadcnDropdownMenuSub({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Sub>): JSX.Element;

export declare function ShadcnDropdownMenuSubContent({ className, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): JSX.Element;

export declare function ShadcnDropdownMenuSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function ShadcnDropdownMenuTrigger({ ...props }: React_2.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): JSX.Element;

export declare function ShadcnFormLabel({ className, ...props }: React_2.ComponentProps<typeof LabelPrimitive.Root>): JSX.Element;

export declare function ShadcnLabel({ className, ...props }: React_2.ComponentProps<typeof LabelPrimitive.Root>): JSX.Element;

export declare function ShadcnMenubar({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Root>): JSX.Element;

export declare function ShadcnMenubarCheckboxItem({ className, children, checked, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): JSX.Element;

export declare function ShadcnMenubarContent({ className, align, alignOffset, sideOffset, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Content>): JSX.Element;

export declare function ShadcnMenubarGroup({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Group>): JSX.Element;

export declare function ShadcnMenubarItem({ className, inset, variant, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): JSX.Element;

export declare function ShadcnMenubarLabel({ className, inset, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): JSX.Element;

export declare function ShadcnMenubarMenu({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Menu>): JSX.Element;

export declare function ShadcnMenubarPortal({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Portal>): JSX.Element;

export declare function ShadcnMenubarRadioGroup({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.RadioGroup>): JSX.Element;

export declare function ShadcnMenubarRadioItem({ className, children, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.RadioItem>): JSX.Element;

export declare function ShadcnMenubarSeparator({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Separator>): JSX.Element;

export declare function ShadcnMenubarShortcut({ className, ...props }: React_2.ComponentProps<'span'>): JSX.Element;

export declare function ShadcnMenubarSub({ ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Sub>): JSX.Element;

export declare function ShadcnMenubarSubContent({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.SubContent>): JSX.Element;

export declare function ShadcnMenubarSubTrigger({ className, inset, children, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): JSX.Element;

export declare function ShadcnMenubarTrigger({ className, ...props }: React_2.ComponentProps<typeof MenubarPrimitive.Trigger>): JSX.Element;

export declare function ShadcnProgress({ className, value, ...props }: React_2.ComponentProps<typeof ProgressPrimitive.Root>): JSX.Element;

export declare function ShadcnTable({ className, containerClassName, ...props }: React_2.ComponentProps<'table'> & {
    containerClassName?: string;
}): JSX.Element;

export declare function ShadcnTableBody({ className, ...props }: React_2.ComponentProps<'tbody'>): JSX.Element;

export declare function ShadcnTableCaption({ className, ...props }: React_2.ComponentProps<'caption'>): JSX.Element;

export declare function ShadcnTableCell({ className, ...props }: React_2.ComponentProps<'td'>): JSX.Element;

export declare function ShadcnTableFooter({ className, ...props }: React_2.ComponentProps<'tfoot'>): JSX.Element;

export declare function ShadcnTableHead({ className, ...props }: React_2.ComponentProps<'th'>): JSX.Element;

export declare function ShadcnTableHeader({ className, ...props }: React_2.ComponentProps<'thead'>): JSX.Element;

export declare function ShadcnTableRow({ className, ...props }: React_2.ComponentProps<'tr'>): JSX.Element;

export declare function Sheet({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Root>): JSX.Element;

export declare function SheetClose({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Close>): JSX.Element;

export declare function SheetContent({ className, children, side, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
}): JSX.Element;

export declare function SheetDescription({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Description>): JSX.Element;

export declare function SheetFooter({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SheetHeader({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SheetTitle({ className, ...props }: React_2.ComponentProps<typeof DialogPrimitive.Title>): JSX.Element;

export declare function SheetTrigger({ ...props }: React_2.ComponentProps<typeof DialogPrimitive.Trigger>): JSX.Element;

export declare function Sidebar({ side, variant, collapsible, className, children, ...props }: React_2.ComponentProps<'div'> & {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
}): JSX.Element;

export declare function SidebarContent({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

declare type SidebarContextProps = {
    state: 'expanded' | 'collapsed';
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};

export declare function SidebarFooter({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SidebarGroup({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SidebarGroupAction({ className, asChild, ...props }: React_2.ComponentProps<'button'> & {
    asChild?: boolean;
}): JSX.Element;

export declare function SidebarGroupContent({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SidebarGroupLabel({ className, asChild, ...props }: React_2.ComponentProps<'div'> & {
    asChild?: boolean;
}): JSX.Element;

export declare function SidebarHeader({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SidebarInput({ className, ...props }: React_2.ComponentProps<typeof Input>): JSX.Element;

export declare function SidebarInset({ className, ...props }: React_2.ComponentProps<'main'>): JSX.Element;

export declare function SidebarMenu({ className, ...props }: React_2.ComponentProps<'ul'>): JSX.Element;

export declare function SidebarMenuAction({ className, asChild, showOnHover, ...props }: React_2.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
}): JSX.Element;

export declare function SidebarMenuBadge({ className, ...props }: React_2.ComponentProps<'div'>): JSX.Element;

export declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, ...props }: React_2.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React_2.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): JSX.Element;

declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function SidebarMenuItem({ className, ...props }: React_2.ComponentProps<'li'>): JSX.Element;

export declare function SidebarMenuSkeleton({ className, showIcon, ...props }: React_2.ComponentProps<'div'> & {
    showIcon?: boolean;
}): JSX.Element;

export declare function SidebarMenuSub({ className, ...props }: React_2.ComponentProps<'ul'>): JSX.Element;

export declare function SidebarMenuSubButton({ asChild, size, isActive, className, ...props }: React_2.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
}): JSX.Element;

export declare function SidebarMenuSubItem({ className, ...props }: React_2.ComponentProps<'li'>): JSX.Element;

export declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: React_2.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): JSX.Element;

export declare function SidebarRail({ className, ...props }: React_2.ComponentProps<'button'>): JSX.Element;

export declare function SidebarSeparator({ className, ...props }: React_2.ComponentProps<typeof Separator>): JSX.Element;

export declare function SidebarTrigger({ className, onClick, ...props }: React_2.ComponentProps<typeof Button_2>): JSX.Element;

declare interface SingleValueProgressProps extends BaseProgressProps {
    value: number;
    className?: {
        root?: string;
        background?: string;
        indicator?: string;
    };
}

export declare function Skeleton({ className, ...props }: React.ComponentProps<'div'>): JSX.Element;

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
    items?: never;
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
export declare function StepProgress({ id, data, value, max, items, onItemClick, displayOffsetLeft, displayOffsetRight, className, formatter, }: StepProgressProps | StepProgressItemProps): JSX.Element;

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
    formatter?: ({ element, ix, }: {
        element: StepItem;
        ix: number;
    }) => default_3.ReactNode;
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

declare interface SubmenuItem extends BaseItem {
    type?: 'submenu';
    value?: never;
    label: string | React.ReactNode;
    items: Item[];
    onClick?: never;
    selected?: never;
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
export declare function Switch({ id, data, disabled, label, tooltip, checked, onCheckedChange, onBlur, fluid, error, hideError, required, labelLeft, size, className, }: SwitchProps): JSX.Element;

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

/**
 * This function returns a tab content component based on the Shadcn UI prestyled component
 *
 * @param id - The id of the tab content component.
 * @param value - The value of the tab content, which should match the value of the corresponding tab trigger.
 * @param children - The content to be displayed within the tab content area.
 * @param data - Optional data attributes for testing purposes.
 * @param className - Optional class names for styling the tab content.
 * @returns A TabContent component that displays content when its corresponding tab is active.
 */
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
}): JSX.Element;

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
export declare function Table<RowType extends Record<string, string | number | boolean>>({ id, dataAttributes, columns, data, caption, className, forwardedRef, emptyCellText, defaultSortField, defaultSortOrder, }: TableProps<RowType>): JSX.Element;

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
        disabled?: boolean;
        tooltip?: string;
        tooltipDelay?: number;
        data?: {
            cy?: string;
            test?: string;
        };
        className?: {
            trigger?: string;
            tooltip?: string;
        };
    }[];
    className?: {
        root?: string;
        list?: string;
        trigger?: string;
    };
    children: React.ReactNode;
}): JSX.Element;

/**
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export declare function Tag({ id, data, className, label }: TagProps): JSX.Element;

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
export declare function TextareaField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, maxLength, maxLengthUnit, hideMaxLength, required, isTouched, hideError, error, disabled, className, ...props }: TextareaFieldNameProps | TextareaFieldOnChangeProps): JSX.Element;

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
 * @param onEnter - The optional onEnter function is called when the user presses the Enter key in the input field.
 * @param onReset - The optional onReset function adds a cancellation icon to the text field (right side; replacing icons positioned there)
 * @returns Text field component with optional label, tooltip, error message and icon.
 */
export declare function TextField({ id, data, name, field, value, onChange, label, labelType, placeholder, tooltip, required, isTouched, hideError, error, disabled, onPaste, className, icon, iconPosition, onIconClick, onEnter, onReset, ...props }: TextFieldNameProps | TextFieldOnChangeProps): JSX.Element;

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
    onEnter?: (event: default_3.KeyboardEvent<HTMLInputElement>) => void;
    onReset?: () => void;
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

/**
 * The `toast` function is a wrapper around the `sonner` toast library, providing a consistent styling and behavior for success, warning, and error messages.
 *
 * @param message - The message to be displayed in the toast notification. It can be a string or a React node.
 * @param options - Additional options for the toast notification, such as duration, position, and custom class names.
 * @param type - The type of toast notification to display. It can be 'success', 'warning', or 'error'. If not provided, it defaults to a generic toast
 * @returns - A toast notification with the specified message and options, styled according to the type of notification.
 */
export declare function toast({ message, options, type, }: {
    message?: React.ReactNode;
    options?: ExternalToast;
    type?: 'success' | 'warning' | 'error';
}): string | number;

export declare const Toaster: ({ ...props }: ToasterProps) => JSX.Element;

export declare function Toggle({ className, variant, size, ...props }: React_2.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare function ToggleGroup({ className, variant, size, children, ...props }: React_2.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare function ToggleGroupItem({ className, children, variant, size, ...props }: React_2.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>): JSX.Element;

export declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

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

declare function TooltipContent({ className, sideOffset, children, ...props }: React_2.ComponentProps<typeof TooltipPrimitive.Content>): JSX.Element;

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

/**
 * Custom hook to handle arrow key navigation.
 *
 * @param onArrowLeft - Callback for left arrow key press
 * @param onArrowRight - Callback for right arrow key press
 * @param onArrowUp - Callback for up arrow key press
 * @param onArrowDown - Callback for down arrow key press
 */
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
    error?: FieldError;
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
export declare function UserNotification({ id, data, message, type, children, className, }: UserNotificationMessageProps | UserNotificationChildrenProps): JSX.Element;

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

export declare function useSidebar(): SidebarContextProps;

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
export declare function Workflow({ items, onClick, activeIx, twStyles, minimal, disabledFrom, showTooltipSymbols, className, }: WorkflowProps | WorkflowProgressProps): JSX.Element;

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

export declare function WorkflowItem({ item, ix, hasDescription, minimal, activeIx, disabled, tooltip, showTooltipSymbols, onClick, numItems, twStyles, className, }: WorkflowItemProps): JSX.Element;

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

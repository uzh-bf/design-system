import { ValueType, NameType, Payload } from 'recharts/types/component/DefaultTooltipContent';
import { AllowInDimension, AnimationTiming, Coordinate, CartesianViewBox } from 'recharts/types/util/types';
import { ContentType } from 'recharts/types/component/Tooltip';
import { UniqueOption } from 'recharts/types/util/payload/getUniqPayload';
import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode;
        icon?: React.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
declare const ChartContainer: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => import("react/jsx-runtime").JSX.Element | null;
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
declare const ChartTooltipContent: React.ForwardRefExoticComponent<Omit<RechartsPrimitive.DefaultTooltipContentProps< ValueType, NameType> & {
    accessibilityLayer?: boolean | undefined;
    active?: boolean | undefined;
    includeHidden?: boolean | undefined;
    allowEscapeViewBox?: AllowInDimension | undefined;
    animationDuration?: number | undefined;
    animationEasing?: AnimationTiming | undefined;
    content?: ContentType<ValueType, NameType> | undefined;
    coordinate?: Partial< Coordinate> | undefined;
    cursor?: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.SVGProps<SVGElement> | undefined;
    filterNull?: boolean | undefined;
    defaultIndex?: number | undefined;
    isAnimationActive?: boolean | undefined;
    offset?: number | undefined;
    payloadUniqBy?: UniqueOption<Payload<ValueType, NameType>> | undefined;
    position?: Partial< Coordinate> | undefined;
    reverseDirection?: AllowInDimension | undefined;
    shared?: boolean | undefined;
    trigger?: "click" | "hover" | undefined;
    useTranslate3d?: boolean | undefined;
    viewBox?: CartesianViewBox | undefined;
    wrapperStyle?: React.CSSProperties | undefined;
} & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    hideLabel?: boolean | undefined;
    hideIndicator?: boolean | undefined;
    indicator?: "line" | "dashed" | "dot" | undefined;
    nameKey?: string | undefined;
    labelKey?: string | undefined;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ChartLegend: typeof RechartsPrimitive.Legend;
declare const ChartLegendContent: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & Pick<RechartsPrimitive.LegendProps, "verticalAlign" | "payload"> & {
    hideIcon?: boolean | undefined;
    nameKey?: string | undefined;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent, };

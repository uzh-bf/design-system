interface StepBaseProps {
    title: string;
    description?: string;
    tooltip?: string;
    tooltipDisabled?: string;
    progress?: number;
    completed?: boolean;
    [x: string]: unknown;
}
interface StepProps extends StepBaseProps {
    progress?: never;
    completed?: never;
}
interface StepProgressProps extends StepBaseProps {
    progress: number;
    completed?: boolean;
}
interface WorkflowBaseProps {
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
export interface WorkflowProps extends WorkflowBaseProps {
    activeIx: number;
    items: StepProps[];
    onClick: (item: StepProps | StepProgressProps, ix: number) => void;
}
export interface WorkflowProgressProps extends WorkflowBaseProps {
    activeIx?: never;
    items: StepProgressProps[];
    onClick: (item: StepProps | StepProgressProps, ix: number) => void;
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
export declare function Workflow({ items, onClick, activeIx, twStyles, minimal, disabledFrom, showTooltipSymbols, className, }: WorkflowProps | WorkflowProgressProps): import("react/jsx-runtime").JSX.Element;
interface WorkflowItemProps {
    item: StepProps | StepProgressProps;
    onClick: (item: StepProps | StepProgressProps, ix: number) => void;
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
export declare function WorkflowItem({ item, ix, hasDescription, minimal, activeIx, disabled, tooltip, showTooltipSymbols, onClick, numItems, twStyles, className, }: WorkflowItemProps): import("react/jsx-runtime").JSX.Element;
export default Workflow;

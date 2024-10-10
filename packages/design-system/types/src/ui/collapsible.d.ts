import { ForwardRefExoticComponent, RefAttributes } from 'react';
/// <reference types="react" />
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
declare const Collapsible: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleTriggerProps & RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleContentProps & RefAttributes<HTMLDivElement>>;
export { Collapsible, CollapsibleContent, CollapsibleTrigger };

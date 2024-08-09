import { Drawer as DrawerPrimitive } from 'vaul';
import { DialogTriggerProps, DialogPortalProps, DialogCloseProps, DialogOverlayProps, DialogContentProps, DialogTitleProps, DialogDescriptionProps } from '@radix-ui/react-dialog';
import * as React from 'react';
declare const Drawer: {
    ({ shouldScaleBackground, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: React.ForwardRefExoticComponent< DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: React.FC< DialogPortalProps>;
declare const DrawerClose: React.ForwardRefExoticComponent< DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: React.ForwardRefExoticComponent<Omit<Omit< DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React.ForwardRefExoticComponent<Omit<Omit< DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    onAnimationEnd?: ((open: boolean) => void) | undefined;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit< DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit< DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, };

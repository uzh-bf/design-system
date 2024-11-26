import { default as React } from 'react';
export interface ModalProps {
    id?: string;
    data?: {
        cy?: string;
        test?: string;
    };
    dataOverlay?: {
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
    dataNextButton?: {
        cy?: string;
        test?: string;
    };
    dataPrevButton?: {
        cy?: string;
        test?: string;
    };
    className?: {
        overlay?: string;
        content?: string;
        title?: string;
        children?: string;
        onPrev?: string;
        onNext?: string;
    };
    children: React.ReactNode;
    fullScreen?: boolean;
    open: boolean;
    title?: string | React.ReactNode;
    trigger?: React.ReactNode;
    escapeDisabled?: boolean;
    hideCloseButton?: boolean;
    asPortal?: boolean;
    onClose: () => void;
    onNext?: () => void;
    onOpenChange?: () => void;
    onPrev?: () => void;
    onPrimaryAction?: React.ReactNode;
    onSecondaryAction?: React.ReactNode;
}
/**
 * This function returns a pre-styled modal component based on the RadixUI dialog component and the custom theme.
 *
 * @param id - The id of the modal.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param dataOverlay - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the overlay
 * @param dataContent - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the content
 * @param dataCloseButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the close button
 * @param dataNextButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the next button
 * @param dataPrevButton - The object of data attributes that can be used for testing (e.g. data-test or data-cy) for the previous button
 * @param trigger - The optional trigger that opens the modal, if the state is not managed by some parent component already.
 * @param title - The optional title of the modal.
 * @param children - The content of the modal.
 * @param onClose - Function that is called when the modal is closed.
 * @param onPrev - Function that is called when the optional previous button is clicked.
 * @param onNext - Function that is called when the optional next button is clicked.
 * @param open - Indicate whether the modal is open or not. This state is managed outside of the component.
 * @param onOpenChange - Function that is called when the modal is opened or closed.
 * @param fullScreen - Indicate whether the modal should be full screen or not.
 * @param onPrimaryAction - The optional primary action button.
 * @param onSecondaryAction - The optional secondary action button.
 * @param escapeDisabled - Indicate whether the modal should be closed when the escape key is pressed.
 * @param hideCloseButton - Indicate whether the close button should be hidden.
 * @param className - The optional className object allows you to override the default styling.
 * @param asPortal - Whether the contents are rendered in a portal.
 * @returns Modal component
 */
export declare function Modal({ id, data, dataOverlay, dataContent, dataCloseButton, dataNextButton, dataPrevButton, trigger, title, children, onClose, onPrev, onNext, open, onOpenChange, fullScreen, className, onPrimaryAction, onSecondaryAction, escapeDisabled, hideCloseButton, asPortal, }: ModalProps): import("react/jsx-runtime").JSX.Element;
export default Modal;

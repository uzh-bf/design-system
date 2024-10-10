export interface useArrowNavigationProps {
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
}
export declare function useArrowNavigation({ onArrowLeft, onArrowRight, onArrowUp, onArrowDown, }: useArrowNavigationProps): void;
export default useArrowNavigation;

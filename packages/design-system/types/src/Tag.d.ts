export interface TagProps {
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
 * This function returns a pre-styled tag component
 *
 * @param id - The id of the tag.
 * @param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)
 * @param label - The label of the tag.
 * @param className - The optional className object allows you to override the default styling.
 * @returns Tag component
 */
export declare function Tag({ id, data, className, label }: TagProps): import("react/jsx-runtime").JSX.Element;
export default Tag;

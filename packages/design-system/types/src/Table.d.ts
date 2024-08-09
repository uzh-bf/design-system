import { default as React } from 'react';
type BaseRowType = {
    className?: string;
};
export type ColumnType<RowType> = {
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
    }) => string | number | React.ReactElement;
};
export interface TableProps<RowType extends BaseRowType> {
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
    forwardedRef?: React.Ref<any>;
    emptyCellText?: string;
    defaultSortField?: string;
    defaultSortOrder?: 'asc' | 'desc';
}
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
export declare function Table<RowType extends Record<string, string | number | boolean>>({ id, dataAttributes, columns, data, caption, className, forwardedRef, emptyCellText, defaultSortField, defaultSortOrder, }: TableProps<RowType>): import("react/jsx-runtime").JSX.Element;
export default Table;

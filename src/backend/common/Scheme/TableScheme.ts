import { ColumnScheme } from './ColumnScheme';

export interface TableAttributes {
    name: string;
}

export interface TableItems {
    columns: ColumnScheme[];
}

export type TableScheme = {
    '@class': 'Table';
    '@attributes': TableAttributes;
} & TableItems;

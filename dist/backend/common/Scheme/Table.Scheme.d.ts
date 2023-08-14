export interface TableAttributes {
    name: string;
}
export interface TableItems {
    columns: any[];
}
export type TableScheme = {
    '@class': 'Table';
    '@attributes': TableAttributes;
} & TableItems;

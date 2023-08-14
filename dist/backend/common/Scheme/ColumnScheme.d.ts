export interface ColumnAttributes {
    name: string;
    caption: string;
    type: string;
    dbType: string;
    key: string;
    auto: 'true' | 'false';
    nullable: 'true' | 'false';
}
export type ColumnScheme = {
    '@class': 'Column';
    '@attributes': ColumnAttributes;
};

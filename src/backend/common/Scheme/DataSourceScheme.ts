import { KeyColumnScheme } from './KeyColumnScheme';

export interface DataSourceAttributes {
    name: string;
    database: string;
    table: string;
    modelClass: string;
}

export interface DataSourceItems {
    keyColumns: KeyColumnScheme[];
}

export type DataSourceScheme = {
    '@class': 'DataSource' | 'SqlDataSource' | 'NoSqlDataSource';
    '@attributes': DataSourceAttributes;
} & DataSourceItems;

export interface SqlDataSourceAttributes extends DataSourceAttributes {
    singleQuery: string;
    multipleQuery: string;
    countQuery: string;
    limit: string;
}

export interface SqlDataSourceScheme extends DataSourceScheme {
    '@class': 'SqlDataSource';
    '@attributes': SqlDataSourceAttributes;
}

export interface NoSqlDataSourceAttributes extends DataSourceAttributes {
    selectQuery: string;
    countQuery: string;
    limit: string;
}

export interface NoSqlDataSourceScheme extends DataSourceScheme {
    '@class': 'NoSqlDataSource';
    '@attributes': NoSqlDataSourceAttributes;
}

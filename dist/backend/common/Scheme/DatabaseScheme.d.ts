import { ParamScheme } from './ParamScheme';
import { TableScheme } from './TableScheme';
export interface DatabaseAttributes {
    name: string;
    modelClass: string;
}
export interface DatabaseItems {
    params: ParamScheme[];
    tables: TableScheme[];
}
export type DatabaseScheme = {
    '@class': 'MySqlDatabase' | 'PostgreSqlDatabase' | 'MongoDbDatabase';
    '@attributes': DatabaseAttributes;
} & DatabaseItems;

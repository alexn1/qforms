import { ParamScheme } from './ParamScheme';
export interface DatabaseAttributes {
    name: string;
    modelClass: string;
}
export interface DatabaseItems {
    params: ParamScheme[];
    tables: any[];
}
export type DatabaseScheme = {
    '@class': 'MySqlDatabase' | 'PostgreSqlDatabase' | 'MongoDbDatabase';
    '@attributes': DatabaseAttributes;
} & DatabaseItems;

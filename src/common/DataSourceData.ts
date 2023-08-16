import { ModelData } from './ModelData';

export interface DataSourceData extends ModelData {
    database: string;
    table: string;
}

import { RawRow } from '../types';
import { ModelData } from './ModelData';

export interface DataSourceData extends ModelData {
    class: string;
    database: string;
    table: string;

    keyColumns: string[];
    rows: RawRow[];
}

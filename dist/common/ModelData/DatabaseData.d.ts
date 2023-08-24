import { ModelData } from './ModelData';
import { TableData } from './TableData';
export interface DatabaseData extends ModelData {
    tables: TableData[];
}

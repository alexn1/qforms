import { ColumnData } from './ColumnData';
import { ModelData } from './ModelData';
export interface TableData extends ModelData {
    columns: ColumnData[];
}

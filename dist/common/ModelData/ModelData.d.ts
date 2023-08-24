import { ActionData } from './ActionData';
import { DataSourceData } from './DataSourceData';
export interface ModelData {
    name: string;
    dataSources?: DataSourceData[];
    actions?: ActionData[];
}

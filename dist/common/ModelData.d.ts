import { ActionData } from './ActionData';
import { DataSourceData } from './DataSourceData';
export interface ModelData {
    class: string;
    name: string;
    dataSources: DataSourceData[];
    actions: ActionData[];
}

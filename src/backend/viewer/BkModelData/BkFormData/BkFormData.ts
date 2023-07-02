import { BkModelData } from '../BkModelData';

export interface BkFormData extends BkModelData {
    dataSources: any[];
    actions: any[];
    fields: any[];
}

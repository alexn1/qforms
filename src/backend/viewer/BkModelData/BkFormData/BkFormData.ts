import { BkModelScheme } from '../BkModelData';

export interface BkFormScheme extends BkModelScheme {
    dataSources: any[];
    actions: any[];
    fields: any[];
}

import { BkModelScheme } from '../BkModelScheme';

export interface BkFormScheme extends BkModelScheme {
    dataSources: any[];
    actions: any[];
    fields: any[];
}

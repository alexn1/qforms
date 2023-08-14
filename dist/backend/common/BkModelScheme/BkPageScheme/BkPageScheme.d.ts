import { BkModelScheme } from '../BkModelScheme';
export interface BkPageScheme extends BkModelScheme {
    '@attributes': {
        formatVersion: string;
        name: string;
        caption: string;
        cssBlock: string;
        viewClass: string;
        ctrlClass: string;
        modelClass: string;
        formInTab: string;
    };
    dataSources: any[];
    actions: any[];
    forms: any[];
}

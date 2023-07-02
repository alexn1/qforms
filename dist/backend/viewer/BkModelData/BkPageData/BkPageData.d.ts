import { BkModelData } from '../BkModelData';
export interface BkPageData extends BkModelData {
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

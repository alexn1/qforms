import { BkModelData, BkModelAttributes } from '../BkModelData';

export interface BkApplicationAttributes extends BkModelAttributes {
    formatVersion: string;
    caption: string;
    authentication: string;
    user: string;
    password: string;
    lang: string;
    theme: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    modelClass: string;
}

export interface BkApplicationData extends BkModelData {
    '@attributes': BkApplicationAttributes;
    env: Record<string, any>;
    databases: any[];
    dataSources: any[];
    actions: any[];
    pageLinks: any[];
}

import { BkModelScheme, BkModelAttributesScheme } from '../BkModelData';

export interface BkApplicationAttributesScheme extends BkModelAttributesScheme {
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

export interface BkApplicationScheme extends BkModelScheme {
    '@attributes': BkApplicationAttributesScheme;
    env: Record<string, any>;
    databases: any[];
    dataSources: any[];
    actions: any[];
    pageLinks: any[];
}

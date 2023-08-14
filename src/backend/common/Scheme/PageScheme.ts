import { ActionScheme } from './ActionScheme';
import { DataSourceScheme } from './DataSourceScheme';

export interface PageAttributes {
    formatVersion: string;
    name: string;
    caption: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    modelClass: string;
    formInTab: 'true' | 'false';
}

export interface PageItems {
    dataSources: DataSourceScheme[];
    actions: ActionScheme[];
    forms: any[];
}

export type PageScheme = {
    '@class': 'Page';
    '@attributes': PageAttributes;
} & PageItems;

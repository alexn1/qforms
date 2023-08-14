import { ActionScheme } from './ActionScheme';
export interface ApplicationAttributes {
    formatVersion: string;
    name: string;
    caption: string;
    authentication: 'true' | 'false';
    user: string;
    password: string;
    lang: 'en' | 'ru';
    theme: 'standard';
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    modelClass: string;
}
export interface ApplicationItems {
    env: any;
    databases: any[];
    dataSources: any[];
    actions: ActionScheme[];
    pageLinks: any[];
}
export type ApplicationScheme = {
    '@class': 'Application';
    '@attributes': ApplicationAttributes;
} & ApplicationItems;

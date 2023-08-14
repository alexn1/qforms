import { ActionScheme } from './ActionScheme';
import { DatabaseScheme } from './DatabaseScheme';
import { PageLinkScheme } from './PageLinkScheme';

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
    databases: DatabaseScheme[];
    dataSources: any[];
    actions: ActionScheme[];
    pageLinks: PageLinkScheme[];
}

export type ApplicationScheme = {
    '@class': 'Application';
    '@attributes': ApplicationAttributes;
} & ApplicationItems;

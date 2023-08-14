import { BkModelScheme } from '../BkModelScheme';
import { ApplicationAttributes } from '../../Attributes/ApplicationAttributes';

export interface ApplicationItems {
    env: any;
    databases: any[];
    dataSources: any[];
    actions: any[];
    pageLinks: any[];
}

export type BkApplicationScheme = {
    '@class': 'Application';
    '@attributes': ApplicationAttributes;
} & ApplicationItems;

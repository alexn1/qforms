import { ModelData } from './ModelData';

export interface PageData extends ModelData {
    caption: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    newMode: boolean;
    formInTab: string;

    forms: any[];
}

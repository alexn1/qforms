import { ModelData } from './ModelData';
import { FormData } from './FormData';

export interface PageData extends ModelData {
    caption: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    newMode: boolean;
    formInTab: string;

    forms: FormData[];
}

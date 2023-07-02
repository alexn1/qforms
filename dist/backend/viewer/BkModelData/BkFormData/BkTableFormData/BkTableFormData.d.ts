import { BkFormData } from '../BkFormData';
export interface BkTableFormData extends BkFormData {
    '@attributes': {
        name: string;
        caption: string;
        visible: string;
        cssBlock: string;
        viewClass: string;
        ctrlClass: string;
        modelClass: string;
        editMethod: string;
        itemEditPage: string;
        itemCreatePage: string;
        newRowMode: string;
        deleteRowMode: string;
        refreshButton: string;
    };
}

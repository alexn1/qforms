import { BkFormScheme } from '../BkFormData';

export interface BkTableFormScheme extends BkFormScheme {
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

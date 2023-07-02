import { BkFormScheme } from '../BkFormScheme';

export interface BkRowFormScheme extends BkFormScheme {
    '@attributes': {
        name: string;
        caption: string;
        visible: string;
        cssBlock: string;
        viewClass: string;
        ctrlClass: string;
        modelClass: string;
        newMode: string;
        backOnly: string;
        refreshButton: string;
    };
}

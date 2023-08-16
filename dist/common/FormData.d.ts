import { FieldData } from './FieldData';
import { ModelData } from './ModelData';
export interface FormData extends ModelData {
    caption: string;
    visible: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    newRowMode: string;
    refreshButton: string;
    deleteRowMode: string;
    fields: FieldData[];
}

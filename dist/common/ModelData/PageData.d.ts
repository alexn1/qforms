import { ModelData } from './ModelData';
import { FormData } from './FormData';
import { Nullable, Scalar } from '../../types';
export interface PageData extends ModelData {
    caption: string;
    cssBlock: string;
    viewClass: string;
    ctrlClass: string;
    newMode: boolean;
    formInTab: string;
    params: Record<string, Nullable<Scalar>>;
    forms: FormData[];
}

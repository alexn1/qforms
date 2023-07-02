import { BkForm } from '../BkForm';
import { Context } from '../../../../Context';
import { BkRowFormData } from '../../../../viewer/BkModelData/BkFormData/BkRowFormData/BkRowFormData';
export declare class BkRowForm extends BkForm<BkRowFormData> {
    isNewMode(context: Context): boolean;
    fillAttributes(response: any): void;
}

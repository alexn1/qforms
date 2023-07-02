import { BkForm } from '../BkForm';
import { Context } from '../../../../Context';
import { BkRowFormScheme } from '../../../../viewer/BkModelData/BkFormData/BkRowFormData/BkRowFormData';
export declare class BkRowForm extends BkForm<BkRowFormScheme> {
    isNewMode(context: Context): boolean;
    fillAttributes(response: any): void;
}

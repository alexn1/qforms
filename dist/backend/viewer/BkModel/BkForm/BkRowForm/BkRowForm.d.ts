import { BkForm } from '../BkForm';
import { Context } from '../../../../Context';
import { BkRowFormScheme } from '../../../BkModelScheme/BkFormScheme/BkRowFormScheme/BkRowFormScheme';
export declare class BkRowForm extends BkForm<BkRowFormScheme> {
    isNewMode(context: Context): boolean;
    fillAttributes(response: any): void;
}

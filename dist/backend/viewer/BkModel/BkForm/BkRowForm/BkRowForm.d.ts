import { BkForm } from '../BkForm';
import { Context } from '../../../../Context';
import { RowFormScheme } from '../../../../common/Scheme/FormScheme';
export declare class BkRowForm extends BkForm<RowFormScheme> {
    isNewMode(context: Context): boolean;
    fillAttributes(response: any): void;
}

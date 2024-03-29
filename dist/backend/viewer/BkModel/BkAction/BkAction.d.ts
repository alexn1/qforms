import { ActionScheme } from '../../../common/Scheme/ActionScheme';
import { BkModel } from '../BkModel';
import { ActionData } from '../../../../common/ModelData/ActionData';
export declare class BkAction extends BkModel<ActionScheme> {
    fillAttributes(response: ActionData): void;
}

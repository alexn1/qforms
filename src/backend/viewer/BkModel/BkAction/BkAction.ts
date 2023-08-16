import { ActionScheme } from '../../../common/Scheme/ActionScheme';
import { BkModel } from '../BkModel';
import { ActionData } from '../../../../common/ActionData';

export class BkAction extends BkModel<ActionScheme> {
    fillAttributes(response: ActionData): void {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}

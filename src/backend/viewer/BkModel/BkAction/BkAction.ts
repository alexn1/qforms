import { ActionScheme } from '../../../common/Scheme/ActionScheme';
import { BkModel } from '../BkModel';

export class BkAction extends BkModel<ActionScheme> {
    fillAttributes(response: any): void {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}

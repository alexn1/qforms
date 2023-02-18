import { BkModel } from '../BkModel';

export class BkAction extends BkModel {
    /* static async create(data, parent): Promise<Action> {
        return new Action(data, parent);
    } */

    fillAttributes(response: any): void {
        response.name = this.getAttr('name');
        response.caption = this.getAttr('caption');
    }
}

import { BkForm } from '../BkForm';
import { RowFormScheme } from '../../../../common/Scheme/FormScheme';

export class BkTableForm extends BkForm<RowFormScheme> {
    /* static async create(data, parent) {
        return new TableForm(data, parent);
    } */

    // async fill(context) {
    //     debug('TableForm.fill', this.constructor.name, this.getFullName());
    //     return super.fill(context);
    // }

    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.editMethod = this.getAttr('editMethod');
        response.itemEditPage = this.getAttr('itemEditPage');
        response.itemCreatePage = this.getAttr('itemCreatePage');
        response.newRowMode = this.getAttr('newRowMode');
        response.deleteRowMode = this.getAttr('deleteRowMode');
        response.refreshButton = this.getAttr('refreshButton');
    }
}

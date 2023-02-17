import { BkField } from '../Field';

export class BkLinkField extends BkField {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
        response.page = this.getAttr('page');
    }
}

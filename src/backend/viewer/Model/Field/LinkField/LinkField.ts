import { Field } from '../Field';

export class BkLinkField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
    }
}

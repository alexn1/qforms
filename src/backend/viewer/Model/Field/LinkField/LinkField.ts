import { Field } from '../Field';

export class LinkField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.notNull = this.getAttr('notNull');
    }
}

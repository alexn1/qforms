import { Field } from '../Field';

export class ImageField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
    }
}

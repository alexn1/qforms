import { BkField } from '../BkField';

export class BkTextAreaField extends BkField {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull = this.getAttr('notNull');
        response.rows = this.getAttr('rows');
        response.cols = this.getAttr('cols');
        response.validateOnChange = this.getAttr('validateOnChange');
        response.validateOnBlur = this.getAttr('validateOnBlur');
    }
}

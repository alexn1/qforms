import Field from '../Field';

class CheckBoxField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull  = this.getAttr('notNull');
    }
}

export = CheckBoxField;

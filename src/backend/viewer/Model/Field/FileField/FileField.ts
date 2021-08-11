import Field from '../Field';

class FileField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull  = this.getAttr('notNull');
    }
}

export = FileField;

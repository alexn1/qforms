import Field from '../Field';

class DatePickerField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull  = this.getAttr('notNull');
        response.format  = this.getAttr('format');
        if (this.isAttr('timezone')) {
            response.timezone  = this.getAttr('timezone');
        }
        response.placeholder  = this.getAttr('placeholder');
        response.validateOnChange  = this.getAttr('validateOnChange');
        response.validateOnBlur  = this.getAttr('validateOnBlur');
    }
}

export = DatePickerField;

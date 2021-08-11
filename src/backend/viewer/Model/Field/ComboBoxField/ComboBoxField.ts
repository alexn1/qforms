import Field from '../Field';

class ComboBoxField extends Field {
    fillAttributes(response: any): void {
        super.fillAttributes(response);
        response.readOnly = this.getAttr('readOnly');
        response.notNull  = this.getAttr('notNull');
        response.placeholder  = this.getAttr('placeholder');
        response.dataSourceName  = this.getAttr('dataSourceName');
        response.valueColumn  = this.getAttr('valueColumn');
        response.displayColumn  = this.getAttr('displayColumn');

        if (this.isAttr('newRowMode')) {
            response.newRowMode  = this.getAttr('newRowMode');
        }
        if (this.isAttr('itemEditPage')) {
            response.itemEditPage  = this.getAttr('itemEditPage');
        }
        if (this.isAttr('itemCreatePage')) {
            response.itemCreatePage  = this.getAttr('itemCreatePage');
        }
        if (this.isAttr('itemCreateForm')) {
            response.itemCreateForm  = this.getAttr('itemCreateForm');
        }
    }
}

export = ComboBoxField;

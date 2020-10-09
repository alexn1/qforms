'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            value  : undefined,
            changed: false,
            error  : false,
        };
    }
    fill(row) {
        throw new Error('RowFormFieldController.fill not implemented');
    }
    onFieldViewContentCreated = c => {
        // console.log('RowFormFieldController.onFieldViewContentCreated', c);
    }
    onChange2 = value => {
        console.log('RowFormFieldController.onChange2', value);
        this.state.value = value;

        const row = this.model.getForm().getRow();
        // console.log('row:', row);

        this.isUndefined = false;
        const valid = this.isValid();
        this.state.error   = !valid;
        this.state.changed = this.isChanged(row);
        if (valid) {
            const value = this.getValue();
            this.model.setValue(row, value);
        }
        this.parent.onFieldChange({source: this, row, field: this});
    }
    getValueForView() {
        return this.state.value;
    }
    getValue() {
        throw new Error('RowFormFieldController.getValue not implemented');
    }
}

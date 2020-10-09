'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            value  : undefined,
            changed: false,
            error  : false,
            valid  : true
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
        this.isUndefined = false;
        this.state.value = value;

        const row = this.model.getForm().getRow();
        this.validate();
        this.checkForChange(row);

        if (this.isValid()) {
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
    setValue(value) {
        throw new Error('RowFormFieldController.setValue not implemented');
    }
    isChanged() {
        return this.state.changed;
    }
    isValid() {
        return this.state.valid;
    }
    validate() {
        this.state.valid = super.isValid();
        this.state.error = !this.state.valid;
    }
    checkForChange(row) {
        this.state.changed = super.isChanged(row);
    }
    refill(row) {
        const value = this.model.getValue(row);
        this.setValue(value);
        this.validate();
        this.checkForChange(row);
    }

    getPlaceHolder() {
        // console.log('RowFormFieldController.getPlaceHolder', this.model.getFullName());
        const row = this.model.getForm().getRow();
        const value = this.model.getValue(row);
        if (ApplicationController.isInDebugMode()) {
            if (value === undefined) {
                return 'undefined';
            } else if (value === null) {
                return 'null';
            } else if (value === '') {
                return 'empty string';
            }
        }
    }
}

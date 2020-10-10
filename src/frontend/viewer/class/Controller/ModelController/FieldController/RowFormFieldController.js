'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            isUndefined: true,
            value      : null,
            changed    : false,
            error      : false,
            valid      : true
        };
    }
    init() {
        const row = this.getRow();
        const value = this.model.getValue(row);
        this.setValue(value);
        // console.log(this.model.getFullName(), value);
    }
    getRow() {
        return this.model.getForm().getRow();
    }
    fill(row) {
        throw new Error('RowFormFieldController.fill not implemented');
    }
    onFieldViewContentCreated = c => {
        // console.log('RowFormFieldController.onFieldViewContentCreated', c);
    }
    onChange2 = value => {
        console.log('RowFormFieldController.onChange2', value);
        this.state.isUndefined = false;
        this.state.value       = value;
        this.validate();
        this.checkForChange();
        if (this.isValid()) {
            const row = this.getRow();
            const value = this.getValue();
            this.model.setValue(row, value);
        }
        this.parent.onFieldChange({source: this, field: this});
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
    checkForChange() {
        this.state.changed = super.isChanged(this.getRow());
    }
    refill() {
        const value = this.model.getValue(this.getRow());
        this.setValue(value);
        this.validate();
        this.checkForChange();
    }

    getPlaceHolder() {
        // console.log('RowFormFieldController.getPlaceHolder', this.model.getFullName());
        if (ApplicationController.isInDebugMode()) {
            const value = this.getValue();
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

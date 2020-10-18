'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            isUndefined: true,
            value      : null,
            changed    : false,
            error      : null
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
    onFieldViewContentCreate = c => {
        // console.log('RowFormFieldController.onFieldViewContentCreate', c);
    }
    onChange2 = value => {
        // console.log('RowFormFieldController.onChange2', value);
        this.state.isUndefined = false;
        this.state.value       = value;
        this.validate();
        if (this.isValid()) {
            const row = this.getRow();
            const value = this.getValue();
            this.model.setValue(row, value);
        }
        this.updateChanged();
        this.parent.onFieldChange({source: this});
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
        return this.state.error === null;
    }
    validate() {
        this.state.error = this.getError();
    }
    updateChanged() {
        this.state.changed = super.isChanged(this.getRow());
    }
    refill() {
        const value = this.model.getValue(this.getRow());
        this.setValue(value);
        // this.validate();
        this.state.error = null;
        this.updateChanged();
    }

    getPlaceHolder() {
        // console.log('RowFormFieldController.getPlaceHolder', this.model.getFullName());
        if (ApplicationController.isInDebugMode()) {
            try {
                const value = this.getValue();
                if (value === undefined) {
                    return 'undefined';
                } else if (value === null) {
                    return 'null';
                } else if (value === '') {
                    return 'empty string';
                }
            } catch (err) {
            }
        }
    }
    getError() {
        // console.log('FieldController.getError', this.model.getFullName());
        try {
            const value = this.getValue();      // try to get value
            if (this.model.isNotNull() && (value === null || value === undefined)) {
                return `not null`;
            }
        } catch (err) {
            return err.message;
        }
        return null;
    }
    isEditable() {
        return this.parent.state.mode === 'edit' && !this.model.isReadOnly();
    }
}

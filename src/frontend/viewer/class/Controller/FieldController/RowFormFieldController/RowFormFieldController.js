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
    onChange = value => {
        // console.log('RowFormFieldController.onChange', value);
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
        this.state.changed = this.isChanged2(this.getRow());
    }
    refill() {
        // console.log('RowFormFieldController.refill', this.model.getFullName());
        const value = this.model.getValue(this.getRow());
        this.setValue(value);
        this.state.error = null;
        this.updateChanged();
    }

    getPlaceHolder() {
        // console.log('RowFormFieldController.getPlaceHolder', this.model.getFullName());
        if (ApplicationController.isInDebugMode()) {
            try {
                const value = this.getValue();
                if (value === undefined) return 'undefined';
                if (value === null) return 'null';
                if (value === '') return 'empty string';
            } catch (err) {
            }
        }
    }
    getError() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());
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

    isChanged2(row) {
        // console.log('RowFormFieldController.isChanged2', this.model.getFullName());
        if (!row) throw new Error('FieldController: no row');
        try {
            if (this.model.hasColumn()) {
                const dsValue = this.model.getValueFromDataSource(row);
                const fieldValue = this.model.getValueForDataSource(this.getValue());
                if (dsValue !== fieldValue) {
                    console.log(`FIELD CHANGED ${this.model.getFullName()}`, dsValue, fieldValue);
                    return true;
                }
            }
        } catch (err) {
            console.error(`${this.model.getFullName()}: cannot get value: ${err.message}`);
            return true;
        }
        const changed = this.model.isChanged(row);
        if (changed) {
            console.log(`FIELD MODEL CHANGED ${this.model.getFullName()}:`, row[this.model.data.column], this.model.getDataSource().changes.get(row)[this.model.data.column]);
        }
        return changed;
    }
}

'use strict';

class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            // isUndefined: true,
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
    refill() {
        // console.log('RowFormFieldController.refill', this.model.getFullName());
        const value = this.model.getValue(this.getRow());
        this.setValue(value);
        this.state.error = null;
        this.refreshChanged();
    }
    getRow() {
        return this.model.getForm().getRow();
    }
    onChange = viewValue => {
        // console.log('RowFormFieldController.onChange', viewValue);
        // this.state.isUndefined = false;
        // this.state.value       = value;
        try {
            this.setValueFromView(viewValue);
            this.state.error = null;
        } catch (err) {
            console.error(`${this.model.getFullName()}: cannot parse view value: ${err.message}`);
            this.state.error = err.message;
        }
        if (!this.state.error) {
            this.validate();
            if (this.isValid()) {
                this.model.setValue(this.getRow(), this.getValue());
            }
        }
        this.refreshChanged();
        this.parent.onFieldChange({source: this});
    }
    getValueForView() {
        return this.valueToString(this.getValue());
    }
    setValueFromView(viewValue) {
        if (typeof viewValue !== 'string') throw new Error(`${this.model.getFullName()}: viewValue must be string, but got ${typeof viewValue}`);
        const value = this.stringToValue(viewValue);
        this.setValue(value);
    }
    setValue(value) {
        // console.log('RowFormFieldController.setValue', this.model.getFullName(), value);
        this.state.value = value;
    }
    getValue() {
        return this.state.value;
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
    refreshChanged() {
        this.state.changed = this.calcChangedState(this.getRow());
    }
    getPlaceHolder() {
        // console.log('RowFormFieldController.getPlaceHolder', this.model.getFullName());
        if (ApplicationController.isInDebugMode()) {
            // try {
            const value = this.getValue();
            if (value === undefined) return 'undefined';
            if (value === null) return 'null';
            if (value === '') return 'empty string';
            // } catch (err) {
            //     console.error(`${this.model.getFullName()}: getPlaceHolder: ${err.message}`);
            // }
        }
    }
    getError() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());
        // try {
        const value = this.getValue();
        if (this.model.isNotNull() && (value === null || value === undefined)) {
            return 'not null';
        }
        // } catch (err) {
        //     return err.message;
        // }
        return null;
    }
    isEditable() {
        return this.parent.state.mode === 'edit' && !this.model.isReadOnly();
    }

    calcChangedState(row) {
        // console.log('RowFormFieldController.calcChangedState', this.model.getFullName());
        if (!row) throw new Error('FieldController: no row');
        if (!this.isValid()) return true;
        if (this.model.hasColumn()) {
            const fieldRawValue = Field.encodeValue(this.getValue());
            const dsRawValue = this.model.getRawValue(row);
            if (fieldRawValue !== dsRawValue) {
                console.log(`FIELD CHANGED ${this.model.getFullName()}`, dsRawValue, fieldRawValue);
                return true;
            }
        }
        const changed = this.model.isChanged(row);
        if (changed) {
            let original = row[this.model.data.column];
            let modified = this.model.getDataSource().getRowWithChanges(row)[this.model.data.column];
            if (original) original = original.substr(0, 100);
            if (modified) modified = modified.substr(0, 100);
            console.log(`FIELD MODEL CHANGED ${this.model.getFullName()}:`, original, modified);
        }
        return changed;
    }
}

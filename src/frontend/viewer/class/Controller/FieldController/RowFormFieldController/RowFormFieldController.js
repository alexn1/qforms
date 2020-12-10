class RowFormFieldController extends FieldController {
    constructor(model, parent) {
        super(model, parent);
        this.state = {
            value  : null,
            changed: false,
            error  : null
        };
        this.parseError = false;
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
    onChange = async (viewValue, fireEvent = true) => {
        // console.log('RowFormFieldController.onChange', viewValue);
        this.parseError = false;
        this.setError(null);
        try {
            this.setValueFromView(viewValue);
        } catch (err) {
            console.log(`${this.model.getFullName()}: cannot parse view value: ${err.message}`);
            this.parseError = true;
        }

        if (this.model.validateOnChange()) {
            this.validate();
            if (this.isValid()) {
                this.model.setValue(this.getRow(), this.getValue());
            }
        }
        this.refreshChanged();
        if (fireEvent) {
            try {
                this.emit('change', {value: viewValue});
            } catch (err) {
                console.error('unhandled change event error:', this.model.getFullName(), err);
            }
            this.parent.onFieldChange({source: this});
        }
    }
    onBlur = () => {
        // console.log('RowFormFieldController.onBlur', this.model.getFullName());
        if (this.model.validateOnBlur()) {
            console.log('validateOnBlur');
            this.validate();
            if (this.isValid()) {
                this.model.setValue(this.getRow(), this.getValue());
            }
            this.refreshChanged();
            this.parent.onFieldChange({source: this});
        }
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
        // console.log('RowFormFieldController.validate', this.model.getFullName());
        this.state.error = this.getError();
    }
    refreshChanged() {
        this.state.changed = this.calcChangedState(this.getRow());
    }
    getPlaceholder() {
        // console.log('RowFormFieldController.getPlaceholder', this.model.getFullName(), this.model.getPlaceholder());
        if (this.model.getPlaceholder()) return this.model.getPlaceholder();
        if (ApplicationController.isInDebugMode()) {
            const value = this.getValue();
            if (value === undefined) return 'undefined';
            if (value === null) return 'null';
            if (value === '') return 'empty string';
        }
    }
    getError() {
        // console.log('RowFormFieldController.getError', this.model.getFullName());

        // parse validator
        try {
            const viewValue = this.view.getValue();
            // this.setValueFromView(viewValue);
        } catch (err) {
            return `can't parse value: ${err.message}`;
        }

        // null validator
        const value = this.getValue();
        if (this.model.isNotNull() && (value === null || value === undefined)) {
            return 'not null';
        }
        return null;
    }
    isEditable() {
        return this.parent.state.mode === 'edit' && !this.model.isReadOnly();
    }

    calcChangedState(row) {
        // console.log('RowFormFieldController.calcChangedState', this.model.getFullName());
        if (!row) throw new Error('FieldController: no row');
        if (this.parseError) {
            console.log(`FIELD CHANGED ${this.model.getFullName()}: parse error`);
            return true;
        }
        if (!this.isValid()) {
            console.log(`FIELD CHANGED ${this.model.getFullName()}: not valid`);
            return true;
        }
        if (this.model.hasColumn()) {
            const fieldRawValue = Field.encodeValue(this.getValue());
            const dsRawValue = this.model.getRawValue(row);
            if (fieldRawValue !== dsRawValue) {
                console.log(`FIELD CHANGED ${this.model.getFullName()}`, dsRawValue, fieldRawValue);
                return true;
            }
        }
        if (this.model.isChanged(row)) {
            let original = row[this.model.data.column];
            let modified = this.model.getDataSource().getRowWithChanges(row)[this.model.data.column];
            if (original) original = original.substr(0, 100);
            if (modified) modified = modified.substr(0, 100);
            console.log(`FIELD MODEL CHANGED ${this.model.getFullName()}:`, original, modified);
            return true;
        }
        return false;
    }
    setError(error) {
        this.state.error = error;
    }
}

'use strict';
class RowFormTextBoxFieldController extends RowFormFieldController {
    // constructor(model, parent) {
    //     super(model, parent);
    // }
    init() {
        console.log('RowFormTextBoxFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.isUndefined = value === undefined;
        const stringValue = this.valueToString(value);
        this.state.value = stringValue;
    }
    isReadOnly() {
        return this.model.data.readOnly === 'true';
    }
    // deinit(row, view) {
    //     super.deinit(row, view);
    // }
    setStringValue(stringValue, view) {
        throw new Error('not implemented');
    }
    getValue() {
        if (this.isUndefined) return undefined;
        return this.stringToValue(this.state.value);
    }
    getPlaceHolder(value) {
        // console.log('TextBoxFieldController.getPlaceHolder', this.model.getFullName(), value);
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

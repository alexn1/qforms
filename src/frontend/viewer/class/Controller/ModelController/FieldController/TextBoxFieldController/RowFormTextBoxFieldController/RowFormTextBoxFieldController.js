'use strict';
class RowFormTextBoxFieldController extends RowFormFieldController {
    // constructor(model, parent) {
    //     super(model, parent);
    // }
    init() {
        // console.log('RowFormTextBoxFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        console.log(this.model.getFullName(), value);
        this.isUndefined = value === undefined;
        const stringValue = this.valueToString(value);
        this.state.value = stringValue;
    }

    // deinit(row, view) {
    //     super.deinit(row, view);
    // }
    setStringValue(stringValue, view) {
        throw new Error('RowFormTextBoxFieldController.setStringValue not implemented');
    }
    getValue() {
        if (this.isUndefined) return undefined;
        return this.stringToValue(this.state.value);
    }
    setValue(value) {
        this.isUndefined = value === undefined;
        const stringValue = this.valueToString(value);
        this.state.value = stringValue;
    }



}

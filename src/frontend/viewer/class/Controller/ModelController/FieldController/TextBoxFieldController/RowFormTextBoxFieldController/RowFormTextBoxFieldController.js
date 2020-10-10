'use strict';
class RowFormTextBoxFieldController extends RowFormFieldController {
    init() {
        // console.log('RowFormTextBoxFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.setValue(value);
        console.log(this.model.getFullName(), value);
    }
    getValue() {
        if (this.state.isUndefined) return undefined;
        return this.stringToValue(this.state.value);
    }
    setValue(value) {
        this.state.isUndefined = value === undefined;
        this.state.value = this.valueToString(value);
    }
}

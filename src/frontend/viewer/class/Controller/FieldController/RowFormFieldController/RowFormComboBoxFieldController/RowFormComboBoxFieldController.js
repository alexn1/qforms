'use strict';
class RowFormComboBoxFieldController extends RowFormFieldController {
    getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row).toString(),
            title: this.model.getDisplayValue(row).toString()
        }));
    }
    setValue(value) {
        this.state.isUndefined = value === undefined;
        this.state.value = this.valueToString(value);
    }
    getValue() {
        if (this.state.isUndefined) return undefined;
        return this.stringToValue(this.state.value);
    }
}

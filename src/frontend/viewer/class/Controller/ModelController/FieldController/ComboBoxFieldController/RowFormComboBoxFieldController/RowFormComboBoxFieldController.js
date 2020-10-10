class RowFormComboBoxFieldController extends RowFormFieldController {
    init() {
        // console.log('RowFormComboBoxFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.setValue(value);
        console.log(this.model.getFullName(), value);
    }
    getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row),
            title: this.model.getDisplayValue(row)
        }));
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

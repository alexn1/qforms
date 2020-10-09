class RowFormComboBoxFieldController extends RowFormFieldController {
    constructor(model, parent) {
        super(model, parent);
        this.comboBox = null;
    }
    init() {
        // console.log('RowFormComboBoxFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.isUndefined = value === undefined;
        const stringValue = this.valueToString(value);
        this.state.value = stringValue;
    }
    getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row),
            title: this.model.getDisplayValue(row)
        }));
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

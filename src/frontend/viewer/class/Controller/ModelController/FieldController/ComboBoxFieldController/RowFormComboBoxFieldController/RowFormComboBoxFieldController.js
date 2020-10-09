class RowFormComboBoxFieldController extends RowFormFieldController {
    constructor(model, parent) {
        super(model, parent);
        this.comboBox = null;
    }
    init() {
        console.log('RowFormComboBoxFieldController.init', this.model.getFullName());
        const row = this.parent.model.getRow();
        const value = this.model.getValue(row);
        this.isUndefined = value === undefined;
        const stringValue = this.valueToString(value);
        this.state.value = stringValue;
    }
    fill(row) {
        console.log('RowFormComboBoxFieldController.fill', this.model.getFullName(), this.model.getValue(row));
        /*const value = this.model.getValue(row);
        this.isUndefined = value === undefined;
        this.comboBox = ApplicationController.createReactComponent(view, ComboBox, {
            items: this.getItems(),
            value: this.valueToString(value),
            onChange: value => {
                console.log('onChange:', value);
            }
        });*/
    }
    getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row),
            title: this.model.getDisplayValue(row)
        }));
    }
    // getStringValue(view) {
    //     return this.comboBox.getValue();
    // }
}

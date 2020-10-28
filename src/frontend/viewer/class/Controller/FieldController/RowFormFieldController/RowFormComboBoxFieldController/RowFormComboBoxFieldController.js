'use strict';
class RowFormComboBoxFieldController extends RowFormFieldController {
    getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row).toString(),
            title: this.model.getDisplayValue(row).toString()
        }));
    }
    getViewClass() {
        return RowFormComboBoxFieldView;
    }
}

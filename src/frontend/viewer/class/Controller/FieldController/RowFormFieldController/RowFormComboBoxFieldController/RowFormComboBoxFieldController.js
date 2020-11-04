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
    getPlaceholder() {
        if (this.model.getPlaceholder()) return this.model.getPlaceholder();
        return ApplicationController.isInDebugMode() ? '[null]' : null;
    }
}

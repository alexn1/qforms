class RowFormComboBoxFieldController extends RowFormFieldController {
    getItems() {
        return this.getRows().map(row => ({
            value: this.model.getValueValue(row).toString(),
            title: this.model.getDisplayValue(row).toString()
        }));
    }
    getRows() {
        return this.model.getComboBoxDataSource().getRows();
    }
    getViewClass() {
        return RowFormComboBoxFieldView;
    }
    getPlaceholder() {
        if (this.model.getAttr('placeholder')) return this.model.getAttr('placeholder');
        return ApplicationController.isInDebugMode() ? '[null]' : null;
    }
}

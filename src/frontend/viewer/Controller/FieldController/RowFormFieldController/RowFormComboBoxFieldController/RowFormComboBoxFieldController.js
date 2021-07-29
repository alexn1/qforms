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
    onEditButtonClick = async e => {
        console.log('RowFormComboBoxFieldController.onEditButtonClick');
        const itemEditPage = this.getModel().getAttr('itemEditPage');
        const value = this.getValue();
        // console.log('itemEditPage', itemEditPage);
        // console.log('value:', value);
        if (itemEditPage && value) {
            await this.openPage({
                name: itemEditPage,
                key: Helper.encodeValue([value]),
            });
        }
    }
}

window.QForms.RowFormComboBoxFieldController = RowFormComboBoxFieldController;

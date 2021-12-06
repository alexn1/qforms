class TableFormComboBoxFieldController extends TableFormFieldController {

    init() {
        super.init();
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.on('insert', this.onListUpdate);
        dataSource.on('update', this.onListUpdate);
        dataSource.on('delete', this.onListUpdate);
    }

    deinit() {
        const dataSource = this.getModel().getComboBoxDataSource();
        dataSource.off('insert', this.onListUpdate);
        dataSource.off('update', this.onListUpdate);
        dataSource.off('delete', this.onListUpdate);
        super.deinit();
    }

    getViewClass() {
        return super.getViewClass() || TableFormComboBoxFieldView;
    }

    getValueForWidget(row) {
        const value = this.model.getValue(row);
        const rawValue = this.model.valueToRaw(value);
        if (rawValue === undefined || rawValue === 'null') return '';
        const cbRow = this.model.findRowByRawValue(rawValue);
        if (cbRow) {
            return this.valueToString(this.model.getDisplayValue(cbRow));
        }
        return `[no row for id: ${rawValue}]`;
    }

    onListUpdate = async e => {
        // console.log('TableFormComboBoxFieldController.onListUpdate', this.getModel().getFullName());
        this.getForm().invalidate();
        await this.getForm().rerender();
    }

}
window.QForms.TableFormComboBoxFieldController = TableFormComboBoxFieldController;

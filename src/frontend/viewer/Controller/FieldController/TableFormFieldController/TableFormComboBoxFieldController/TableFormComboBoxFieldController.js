class TableFormComboBoxFieldController extends TableFormFieldController {
    getViewClass() {
        return TableFormComboBoxFieldView;
    }
    getValueForView(row) {
        const rawValue = this.model.getRawValue(row);
        if (rawValue === undefined || rawValue === 'null') return '';
        const cbRow = this.model.findRowByRawValue(rawValue);
        if (cbRow) {
            return this.valueToString(this.model.getDisplayValue(cbRow));
        }
        return `[no row for id: ${rawValue}]`;
    }


    /*init() {
        //console.log('TableFormComboBoxFieldController.init: ' + this.model.getFullName());
        super.init();
        if (!this.model.data.dataSourceName) {
            throw new Error(`[${this.model.getFullName()}] no dataSourceName`);
        }
        const dataSource = this.model.getComboBoxDataSource();
        if (!dataSource) {
            throw new Error(`[${this.model.getFullName()}] cannot find data source '${this.model.data.dataSourceName}'`);
        }
        dataSource.on('update', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        dataSource.on('newRow'   , this.listeners.newRow    = this.onNewRow.bind(this));
        dataSource.on('moveRow'  , this.listeners.moveRow   = this.onMoveRow.bind(this));
    }*/

    /*deinit(row, view) {
        //console.log('TableFormComboBoxFieldController.deinit: ' + this.model.getFullName());
        const dataSource = this.model.getComboBoxDataSource();
        dataSource.off('update', this.listeners.rowUpdate);
        dataSource.off('removeRow', this.listeners.removeRow);
        dataSource.off('newRow'   , this.listeners.newRow);
        dataSource.off('moveRow'  , this.listeners.moveRow);
        // ReactDOM.unmountComponentAtNode(view);
        super.deinit();
    }*/

    /*getItems() {
        return this.model.getComboBoxDataSource().getRows().map(row => ({
            value: this.model.getValueValue(row),
            title: this.model.getDisplayValue(row)
        }));
    }*/

    /*getStringValue(view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            return this.comboBox.getValue();
        }
        return super.getStringValue(view);
    }*/

    /*setValue(value, view) {
        // console.log('TableFormComboBoxFieldController.setValue', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            throw new Error('TableFormComboBoxFieldController.setValue not implemented');
        } else if (this.model.getForm().getClassName() === 'TableForm') {
            view.firstElementChild.value = value;
            if (value) {
                const key = JSON.stringify([value]);
                const row = this.model.getComboBoxDataSource().getRow(key);
                if (row) {
                    view.firstElementChild.innerHTML = this.model.getDisplayValue(row);
                } else {
                    view.firstElementChild.innerHTML = '{id: ' + value + '}';
                }
            } else {
                view.firstElementChild.innerHTML = '';
            }
        }
    }*/

    /*_fillSelectOptions(view) {
        const nullOption = document.createElement('option');
        /!*if (this.model.data.notNull === 'true') {
            nullOption.innerHTML = `-- ${this.model.getApp().getText().field.selectValue} --`;
        }*!/
        view.firstElementChild.appendChild(nullOption);
        const rows = this.model.getComboBoxDataSource().getRows();
        for (let i = 0; i < rows.length; i++) {
            this._createOption(view, i);
        }
    }*/

    /*_createOption(view, i) {
        const dataSource = this.model.getComboBoxDataSource();
        const row = dataSource.getRowByIndex(i);
        const key = dataSource.getRowKey(row);
        const option = document.createElement('option');
        option.innerHTML = this.model.getDisplayValue(row);
        option.dbRow     = row;
        option.value     = JSON.parse(key)[0];
        FrontHostApp.insertNewNodeAt(view.firstElementChild, option, i + 1); // at 0 position always null-value
        view.keyToOption[key] = option;
        return option;
    }*/

    /*onRowUpdate(ea) {
        //console.log('TableFormComboBoxFieldController.onRowUpdate');
        //console.log(ea);
        const key = ea.key;
        if (this.model.getForm().getClassName() === 'RowForm') {
            for (const view in this.views.values()) {
                const option = view.keyToOption[key];
                this._refillRow(option);
            }
        }
    }*/

    /*_refillRow(option) {
        option.innerHTML = this.model.getDisplayValue(option.dbRow);
    }*/

    /*onRemoveRow(ea) {
        const key = ea.key;
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                for (const k in this.views) {
                    const view = this.views[k];
                    const option = view.keyToOption[key];
                    view.firstElementChild.removeChild(option);
                    delete view.keyToOption[key];
                }
                break;
        }
    }*/

    /*onNewRow(ea) {
        //console.log('TableFormComboBoxFieldController.onNewRow');
        //console.log(ea);
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                const key = this.model.getForm().getDefaultDataSource().getRowKey(this.model.getForm().row);
                const view = this.views[key];
                this._createOption(view, ea.i);
                break;
        }
    }*/

    /*onMoveRow(ea) {
        const newIndex = ea.newIndex;
        const oldIndex = ea.oldIndex;
        const key      = ea.key;
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                for (const k in this.views) {
                    const view = this.views[k];
                    const option = view.keyToOption[key];
                    FrontHostApp.moveNode(view.firstElementChild, option, oldIndex, newIndex + 1);
                    this._refillRow(option);
                }
                break;
        }
    }*/
}
window.QForms.TableFormComboBoxFieldController = TableFormComboBoxFieldController;

'use strict';

class ComboBoxFieldController extends FieldController {

    // constructor(model, parent) {
    //     super(model, parent);
    // }

    init() {
        //console.log('ComboBoxFieldController.init: ' + this.model.getFullName());
        super.init();
        if (!this.model.data.dataSourceName) {
            throw new Error(`[${this.model.getFullName()}] no dataSourceName`);
        }
        const dataSource = this.model.getComboBoxDataSource();
        if (!dataSource) {
            throw new Error(`[${this.model.getFullName()}] cannot find data source '${this.model.data.dataSourceName}'`);
        }
        dataSource.on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        dataSource.on('newRow', this.listeners.newRow = this.onNewRow.bind(this));
        dataSource.on('moveRow', this.listeners.moveRow = this.onMoveRow.bind(this));
    }

    deinit() {
        //console.log('ComboBoxFieldController.deinit: ' + this.model.getFullName());
        const dataSource = this.model.getComboBoxDataSource();
        dataSource.off('rowUpdate', this.listeners.rowUpdate);
        dataSource.off('removeRow', this.listeners.removeRow);
        dataSource.off('newRow', this.listeners.newRow);
        dataSource.off('moveRow', this.listeners.moveRow);
        super.deinit();
    }

    fill(row, view) {
        const self = this;
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                view.keyToOption = {};
                this._fillSelectOptions(view);
                super.fill(row, view);
                $(view).children().change(function() {
                    self.onChange(view);
                });
                break;
            case 'TableForm':
                super.fill(row, view);
                break;
        }
    }

    getStringValue(view) {
        switch (this.model.getForm().getClassName()) {
            case 'RowForm'  : return view.firstElementChild.value;
            case 'TableForm': return view.firstElementChild.innerHTML;
            default: throw new Error(`unknown form class: ${this.model.getForm().getClassName()}`);
        }
    }


    setValue(value, view) {
        // console.log('ComboBoxFieldController.setValue', this.model.getFullName(), value);
        if (this.model.getForm().getClassName() === 'RowForm') {
            this.isUndefined = value === undefined;
            if (value === null || value === undefined) {
                view.firstElementChild.selectedIndex = 0;
            } else {
                view.firstElementChild.value = value;
            }
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
    }

    _fillSelectOptions(view) {
        const nullOption = document.createElement('option');
        /*if (this.model.data.notNull === 'true') {
            nullOption.innerHTML = `-- ${this.model.getApp().data.text.field.selectValue} --`;
        }*/
        view.firstElementChild.appendChild(nullOption);
        const rows = this.model.getComboBoxDataSource().getRows();
        for (let i = 0; i < rows.length; i++) {
            this._createOption(view, i);
        }
    }

    _createOption(view, i) {
        const dataSource = this.model.getComboBoxDataSource();
        const row = dataSource.getRowByIndex(i);
        const key = dataSource.getRowKey(row);
        const option = document.createElement('option');
        option.innerHTML = this.model.getDisplayValue(row);
        option.dbRow     = row;
        option.value     = JSON.parse(key)[0];
        QForms.insertNewNodeAt(view.firstElementChild, option, i + 1); // at 0 position always null-value
        view.keyToOption[key] = option;
        return option;
    }

    onRowUpdate(ea) {
        //console.log('ComboBoxFieldController.onRowUpdate');
        //console.log(ea);
        const key = ea.key;
        if (this.model.getForm().getClassName() === 'RowForm') {
            for (const view in this.views.values()) {
                const option = view.keyToOption[key];
                this._refillRow(option);
            }
        }
    };

    _refillRow(option) {
        option.innerHTML = this.model.getDisplayValue(option.dbRow);
    }

    onRemoveRow(ea) {
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
    }

    onNewRow(ea) {
        //console.log('ComboBoxFieldController.onNewRow');
        //console.log(ea);
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                const key = this.model.getForm().getDataSource().getRowKey(this.model.getForm().row);
                const view = this.views[key];
                this._createOption(view, ea.i);
                break;
        }
    }

    onMoveRow(ea) {
        const newIndex = ea.newIndex;
        const oldIndex = ea.oldIndex;
        const key      = ea.key;
        switch (this.model.getForm().getClassName()) {
            case 'RowForm':
                for (const k in this.views) {
                    const view = this.views[k];
                    const option = view.keyToOption[key];
                    QForms.moveNode(view.firstElementChild, option, oldIndex, newIndex + 1);
                    this._refillRow(option);
                }
                break;
        }
    }

    // isValid(view) {
    //     console.log('ComboBoxFieldController.isValid', this.model.getFullName());
    //
    //     const value = this.getValue(view);
    //     console.log('combobox:', value);
    //
    //     return true;
    //     /*
    //     let isValid = true;
    //     if (this.model.data.notNull === 'true') {
    //         isValid = view.firstElementChild.selectedIndex !== 0;
    //     }
    //     if (!isValid) {
    //         view.firstElementChild.classList.add('error');
    //     } else {
    //         view.firstElementChild.classList.remove('error');
    //     }
    //     return isValid;*/
    // }

    getValue(view) {
        if (this.model.getForm().getClassName() === 'RowForm') {
            if (this.isUndefined) return undefined;
            if (view.firstElementChild.selectedIndex === 0) return null;
            return super.getValue(view);
        } else if (this.model.getForm().getClassName() === 'TableForm') {
            return super.getValue(view);
        }
        return null;
    }

    // onChange(el) {
    //     console.log('ComboBoxFieldController.onChange', this.model.getFullName());
    //     const view = el.parentNode;
    //
    //     // console.log('selectedIndex', view.firstElementChild.selectedIndex);
    //     // console.log('stringValue:', this.getStringValue(view));
    //     console.log('value:', this.getValue(view));
    // }

}

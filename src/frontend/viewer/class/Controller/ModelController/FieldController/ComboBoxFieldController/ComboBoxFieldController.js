'use strict';

class ComboBoxFieldController extends FieldController {

    constructor(model, parent) {
        super(model, parent);
        this.dataSource = null;
    }

    init() {
        //console.log('ComboBoxFieldController.init: ' + this.model.name);
        super.init();
        this.dataSource = this.model.getDataSource(this.model.data.dataSourceName);
        if (!this.dataSource) {
            throw new Error('[' + this.model.getFullName() + '] cannot find data source \'' + this.model.data.dataSourceName + '\'');
        }
        this.dataSource.on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));
        this.dataSource.on('removeRow', this.listeners.removeRow = this.onRemoveRow.bind(this));
        this.dataSource.on('newRow', this.listeners.newRow = this.onNewRow.bind(this));
        this.dataSource.on('moveRow', this.listeners.moveRow = this.onMoveRow.bind(this));
    }

    deinit() {
        //console.log('ComboBoxFieldController.deinit: ' + this.model.name);
        this.dataSource.off('rowUpdate', this.listeners.rowUpdate);
        this.dataSource.off('removeRow', this.listeners.removeRow);
        this.dataSource.off('newRow', this.listeners.newRow);
        this.dataSource.off('moveRow', this.listeners.moveRow);
        super.deinit();
    }

    fill(row, view) {
        const self = this;
        switch (this.model.form.getClassName()) {
            case 'RowForm':
                view.keyToOption = {};
                this._fillSelectOptions(view);
                super.fill(row, view);
                $(view).children().change(function() {
                    self.onChange(this);
                });
                break;
            case 'TableForm':
                super.fill(row, view);
                break;
        }
    }

    getValue(view) {
        switch (this.model.form.getClassName()) {
            case 'RowForm':
                return (view.firstElementChild.selectedIndex === 0) ? null : view.firstElementChild.value;
            case 'TableForm':
                return view.firstElementChild.value;
        }
    }

    setValue(value, view) {
        switch (this.model.form.getClassName()) {
            case 'RowForm':
                if (value === null) {
                    view.firstElementChild.selectedIndex = 0;
                } else {
                    view.firstElementChild.value = value;
                }
                break;
            case 'TableForm':
                view.firstElementChild.value = value;
                if (value) {
                    const key = JSON.stringify([value]);
                    const row = this.dataSource.getRow(key);
                    if (row) {
                        view.firstElementChild.innerHTML = this.model.getDisplayValue(row);
                    } else {
                        view.firstElementChild.innerHTML = '{id: ' + value + '}';
                    }
                } else {
                    view.firstElementChild.innerHTML = '';
                }
                break;
        }
    }

    _fillSelectOptions(view) {
        const nullOption = document.createElement('option');
        if (this.model.data.notNull === 'true') {
            nullOption.innerHTML = `-- ${this.model.form.page.app.data.text.field.selectValue} --`;
        }
        view.firstElementChild.appendChild(nullOption);
        const rows = this.dataSource.getRows();
        for (let i = 0; i < rows.length; i++) {
            this._createOption(view, i);
        }
    }

    _createOption(view, i) {
        const row = this.dataSource.getRowByIndex(i);
        const key = this.dataSource.getRowKey(row);
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
        //i = ea.i;
        if (this.model.form.getClassName() === 'RowForm') {
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
        switch (this.model.form.getClassName()) {
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
        switch (this.model.form.getClassName()) {
            case 'RowForm':
                const key = this.model.form.dataSource.getRowKey(this.model.form.row);
                const view = this.views[key];
                this._createOption(view, ea.i);
                break;
        }
    }

    onMoveRow(ea) {
        const newIndex = ea.newIndex;
        const oldIndex = ea.oldIndex;
        const key      = ea.key;
        switch (this.model.form.getClassName()) {
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

    // onChange(el) {
    //     const view = el.parentNode;
    //     if (this.isValid(view)) {
    //         this.model.setValue(view.dbRow, this.getValue(view));
    //         this.emit('change', {source: this, view: view, row: view.dbRow, el: el, field: this});
    //     }
    // }

    isValid(view) {
        let isValid = true;
        if (this.model.data.notNull === 'true') {
            isValid = view.firstElementChild.selectedIndex !== 0;
        }
        if (!isValid) {
            view.firstElementChild.classList.add('error');
        } else {
            view.firstElementChild.classList.remove('error');
        }
        return isValid;
    }

}

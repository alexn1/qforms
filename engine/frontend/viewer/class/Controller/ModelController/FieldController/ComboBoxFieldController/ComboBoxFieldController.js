'use strict';

QForms.inherit(ComboBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxFieldController(model, parent) {
    FieldController.call(this, model, parent);
    this.dataSource = null;
    this.eventChange = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.init = function() {
    //console.log('ComboBoxFieldController.prototype.init: ' + this.model.name);
    FieldController.prototype.init.call(this);
    this.dataSource = this.model.getDataSource(this.model.data.dataSourceName);
    if (!this.dataSource) {
        throw new Error('[' + this.model.getFullName() + '] cannot find data source \'' + this.model.data.dataSourceName + '\'');
    }
    this.dataSource.eventRefillRow.subscribe(this, 'onRefillRow');
    this.dataSource.eventRemoveRow.subscribe(this, 'onRemoveRow');
    this.dataSource.eventNewRow.subscribe(this, 'onNewRow');
    this.dataSource.eventMoveRow.subscribe(this, 'onMoveRow');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.deinit = function() {
    //console.log('ComboBoxFieldController.prototype.deinit: ' + this.model.name);
    this.dataSource.eventRefillRow.unsubscribe(this, 'onRefillRow');
    this.dataSource.eventRemoveRow.unsubscribe(this, 'onRemoveRow');
    this.dataSource.eventNewRow.unsubscribe(this, 'onNewRow');
    this.dataSource.eventMoveRow.unsubscribe(this, 'onMoveRow');
    FieldController.prototype.deinit.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.fill = function(row, view) {
    switch (this.model.form.data.class) {
        case 'RowForm':
            view.keyToOption = {};
            this._fillSelectOptions(view);
            ComboBoxFieldController.super_.prototype.fill.call(this, row, view);
            var self = this;
            $(view).children().change(function() {
                self.onChange(this);
            });
            break;
        case 'TableForm':
            ComboBoxFieldController.super_.prototype.fill.call(this, row, view);
            break;
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.getValue = function (view) {
    switch (this.model.form.data.class) {
        case 'RowForm':
            return (view.firstElementChild.selectedIndex === 0) ? null : view.firstElementChild.value;
            break;
        case 'TableForm':
            return view.firstElementChild.value;
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.setValue = function (value, view) {
    switch (this.model.form.data.class) {
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
                var key = JSON.stringify([value]);
                var row = this.dataSource.getRow(key);
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype._fillSelectOptions = function(view) {
    var nullOption = document.createElement('option');
    if (this.model.data.notNull === 'true') {
        nullOption.innerHTML = '-- {selectValue} --'.template({
            selectValue: this.model.form.page.app.data.text.field.selectValue
        });
    }
    view.firstElementChild.appendChild(nullOption);
    var rows = this.dataSource.getRows();
    for (var i=0; i < rows.length; i++) {
        this._createOption(view, i);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype._createOption = function(view, i) {
    var row =  this.dataSource.getRowByIndex(i);
    var key = this.dataSource.getRowKey(row);
    var option = document.createElement('option');
    option.innerHTML = this.model.getDisplayValue(row);
    option.dbRow     = row;
    option.value     = JSON.parse(key)[0];
    QForms.insertNewNodeAt(view.firstElementChild, option, i + 1); // at 0 position always null-value
    view.keyToOption[key] = option;
    return option;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onRefillRow = function(ea) {
    //console.log('ComboBoxFieldController.prototype.onRefillRow');
    //console.log(ea);
    var key = ea.key;
    //i = ea.i;
    switch (this.model.form.data.class) {
        case 'RowForm':
            for (var k in this.views) {
                var view = this.views[k];
                var option = view.keyToOption[key];
                this._refillRow(option);
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype._refillRow = function(option) {
    option.innerHTML = option.dbRow[this.model.data.displayColumn];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onRemoveRow = function(ea) {
    var key = ea.key;
    switch (this.model.form.data.class) {
        case 'RowForm':
            for (var k in this.views) {
                var view = this.views[k];
                var option = view.keyToOption[key];
                view.firstElementChild.removeChild(option);
                delete view.keyToOption[key];
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onNewRow = function(ea) {
    //console.log('ComboBoxFieldController.prototype.onNewRow');
    //console.log(ea);
    switch (this.model.form.data.class) {
        case 'RowForm':
            this._createOption(ea.i);
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onMoveRow = function(ea) {
    var newIndex = ea.newIndex;
    var oldIndex = ea.oldIndex;
    var key      = ea.key;
    switch (this.model.form.data.class) {
        case 'RowForm':
            for (var k in this.views) {
                var view = this.views[k];
                var option = view.keyToOption[key];
                QForms.moveNode(view.firstElementChild, option, oldIndex, newIndex + 1);
                this._refillRow(option);
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onChange = function (el) {
    var view = el.parentNode;
    if (this.isValid(view)) {
        this.model.save(view.dbRow, this.getValue(view));
        // event
        var ea = new QForms.EventArg(this);
        ea.view = view;
        ea.row = view.dbRow;
        ea.el = el;
        ea.field = this;
        this.eventChange.fire(ea);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.isValid = function(view) {
    var isValid = true;
    if (this.model.data.notNull === 'true') {
        isValid = view.firstElementChild.selectedIndex !== 0;
    }
    if (!isValid) {
        view.firstElementChild.classList.add('error');
    } else {
        view.firstElementChild.classList.remove('error');
    }
    return isValid;
};
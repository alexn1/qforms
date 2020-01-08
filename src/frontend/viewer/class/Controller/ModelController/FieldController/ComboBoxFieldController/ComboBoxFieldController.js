'use strict';

QForms.inherits(ComboBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ComboBoxFieldController(model, parent) {
    var self = this;
    FieldController.call(self, model, parent);
    self.dataSource = null;
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.init = function() {
    var self = this;
    //console.log('ComboBoxFieldController.prototype.init: ' + this.model.name);
    FieldController.prototype.init.call(self);
    self.dataSource = self.model.getDataSource(self.model.data.dataSourceName);
    if (!self.dataSource) {
        throw new Error('[' + self.model.getFullName() + '] cannot find data source \'' + self.model.data.dataSourceName + '\'');
    }
    self.dataSource.on('refillRow', self.listeners.refillRow = self.onRefillRow.bind(self));
    self.dataSource.on('removeRow', self.listeners.removeRow = self.onRemoveRow.bind(self));
    self.dataSource.on('newRow', self.listeners.newRow = self.onNewRow.bind(self));
    self.dataSource.on('moveRow', self.listeners.moveRow = self.onMoveRow.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.deinit = function() {
    var self = this;
    //console.log('ComboBoxFieldController.prototype.deinit: ' + this.model.name);
    self.dataSource.off('refillRow', self.listeners.refillRow);
    self.dataSource.off('removeRow', self.listeners.removeRow);
    self.dataSource.off('newRow', self.listeners.newRow);
    self.dataSource.off('moveRow', self.listeners.moveRow);
    FieldController.prototype.deinit.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.fill = function(row, view) {
    var self = this;
    switch (self.model.form.data.class) {
        case 'RowForm':
            view.keyToOption = {};
            self._fillSelectOptions(view);
            ComboBoxFieldController.super_.prototype.fill.call(self, row, view);
            $(view).children().change(function() {
                self.onChange(this);
            });
            break;
        case 'TableForm':
            ComboBoxFieldController.super_.prototype.fill.call(self, row, view);
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.getValue = function (view) {
    var self = this;
    switch (self.model.form.data.class) {
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
    var self = this;
    switch (self.model.form.data.class) {
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
                var row = self.dataSource.getRow(key);
                if (row) {
                    view.firstElementChild.innerHTML = self.model.getDisplayValue(row);
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
    var self = this;
    var nullOption = document.createElement('option');
    if (self.model.data.notNull === 'true') {
        nullOption.innerHTML = '-- {selectValue} --'.template({
            selectValue: self.model.form.page.app.data.text.field.selectValue
        });
    }
    view.firstElementChild.appendChild(nullOption);
    var rows = self.dataSource.getRows();
    for (var i = 0; i < rows.length; i++) {
        self._createOption(view, i);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype._createOption = function(view, i) {
    var self = this;
    var row = self.dataSource.getRowByIndex(i);
    var key = self.dataSource.getRowKey(row);
    var option = document.createElement('option');
    option.innerHTML = self.model.getDisplayValue(row);
    option.dbRow     = row;
    option.value     = JSON.parse(key)[0];
    QForms.insertNewNodeAt(view.firstElementChild, option, i + 1); // at 0 position always null-value
    view.keyToOption[key] = option;
    return option;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onRefillRow = function(ea) {
    var self = this;
    //console.log('ComboBoxFieldController.prototype.onRefillRow');
    //console.log(ea);
    var key = ea.key;
    //i = ea.i;
    switch (self.model.form.data.class) {
        case 'RowForm':
            for (var k in self.views) {
                var view = self.views[k];
                var option = view.keyToOption[key];
                self._refillRow(option);
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype._refillRow = function(option) {
    var self = this;
    option.innerHTML = self.model.getDisplayValue(option.dbRow);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onRemoveRow = function(ea) {
    var self = this;
    var key = ea.key;
    switch (self.model.form.data.class) {
        case 'RowForm':
            for (var k in self.views) {
                var view = self.views[k];
                var option = view.keyToOption[key];
                view.firstElementChild.removeChild(option);
                delete view.keyToOption[key];
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onNewRow = function(ea) {
    var self = this;
    //console.log('ComboBoxFieldController.prototype.onNewRow');
    //console.log(ea);
    switch (self.model.form.data.class) {
        case 'RowForm':
            var key = self.model.form.dataSource.getRowKey(self.model.form.row);
            var view = self.views[key];
            self._createOption(view, ea.i);
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onMoveRow = function(ea) {
    var self = this;
    var newIndex = ea.newIndex;
    var oldIndex = ea.oldIndex;
    var key      = ea.key;
    switch (self.model.form.data.class) {
        case 'RowForm':
            for (var k in self.views) {
                var view = self.views[k];
                var option = view.keyToOption[key];
                QForms.moveNode(view.firstElementChild, option, oldIndex, newIndex + 1);
                self._refillRow(option);
            }
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.onChange = function (el) {
    var self = this;
    var view = el.parentNode;
    if (self.isValid(view)) {
        self.model.save(view.dbRow, self.getValue(view));
        // event
        self.emit('change', {source: self, view: view, row: view.dbRow, el: el, field: self});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ComboBoxFieldController.prototype.isValid = function(view) {
    var self = this;
    var isValid = true;
    if (self.model.data.notNull === 'true') {
        isValid = view.firstElementChild.selectedIndex !== 0;
    }
    if (!isValid) {
        view.firstElementChild.classList.add('error');
    } else {
        view.firstElementChild.classList.remove('error');
    }
    return isValid;
};
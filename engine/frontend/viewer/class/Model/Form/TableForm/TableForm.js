'use strict';

QForms.inherit(TableForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableForm(name, page, data) {
    Form.call(this, name, page, data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// табличная форма обновляется сразу после модификации ячейки таблицы
TableForm.prototype.onDataSourceChanged = function(eventArgs) {
    var dataSource = eventArgs.object;
    if (dataSource.name !== 'default') {
        return;
    }
    this.dataSources.default.update();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.new = function() {
    switch (this.data.newRowMode) {
        case 'oneclick':
            var row = {};
            this.defaultValuesToRow(row);
            this.dataSource.insert(row);
            break;
        case 'editform':
            this.openPage({
                name   : this.data.itemEditPage,
                newMode: true
            });
            break;
        case 'createform':
            this.openPage({
                name   : this.data.itemCreatePage,
                newMode: true
            });
            break;
        case 'oneclick editform':
            var row = {};
            this.defaultValuesToRow(row);
            var self = this;
            this.dataSource.insert(row, function(key) {
                self.openPage({
                    name: self.data.itemEditPage,
                    key : key
                });
            });
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.delete = function(key) {
    this.dataSources.default.delete(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.edit = function(key) {
    //console.log('TableForm.prototype.edit');
    if (!this.data.itemEditPage) {
        throw new Error
    }
    this.openPage({
        name: this.data.itemEditPage,
        key : key
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.frame = function(frame) {
    this.dataSources.default.frame(this.page.params, frame);
};
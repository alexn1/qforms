'use strict';

QForms.inherits(TableForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TableForm(name, page, data) {
    var self = this;
    Form.call(self, name, page, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// table form updated immediately after cell modification
TableForm.prototype.onDataSourceChanged = function(e) {
    var self = this;
    var dataSource = e.source;
    if (dataSource.name !== 'default') {
        return;
    }
    self.dataSources.default.update();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.new = function() {
    var self = this;
    switch (self.data.newRowMode) {
        case 'oneclick':
            var row = {};
            self.defaultValuesToRow(row);
            self.dataSource.insert(row);
            break;
        case 'editform':
            if (!self.data.itemEditPage) {
                throw new Error('[' + self.getFullName() + '] itemEditPage is empty.');
            }
            this.openPage({
                name   : self.data.itemEditPage,
                newMode: true
            });
            break;
        case 'createform':
            if (!self.data.itemCreatePage) {
                throw new Error('[' + self.getFullName() + '] itemCreatePage is empty.');
            }
            self.openPage({
                name   : self.data.itemCreatePage,
                newMode: true
            });
            break;
        case 'oneclick editform':
            if (!self.data.itemEditPage) {
                throw new Error('[' + self.getFullName() + '] itemEditPage is empty.');
            }
            var row = {};
            self.defaultValuesToRow(row);
            self.dataSource.insert(row).then(function (key) {
                self.openPage({
                    name: self.data.itemEditPage,
                    key : key
                });
            });
            break;
        case 'oneclick createform':
            if (!self.data.itemCreatePage) {
                throw new Error('[' + self.getFullName() + '] itemCreatePage is empty.');
            }
            var row = {};
            self.defaultValuesToRow(row);
            self.dataSource.insert(row).then(function (key) {
                self.openPage({
                    name: self.data.itemCreatePage,
                    key : key
                });
            });
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.delete = function(key) {
    var self = this;
    self.dataSources.default.delete(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.edit = function(key) {
    var self = this;
    console.log('TableForm.prototype.edit', self.getFullName());
    if (!self.data.itemEditPage) {
        throw new Error('[' + self.getFullName() + '] itemEditPage is empty.');
    }
    self.openPage({
        name: self.data.itemEditPage,
        key : key
    }).catch(function (err) {
        console.error('edit form error handler:', err.message, err.stack);
        alert(err.message);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.frame = function(frame) {
    var self = this;
    self.dataSources.default.frame(self.page.params, frame);
};
'use strict';

QForms.inherit(TableForm, Form);

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
    this.dataSources.default.update2();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.new = function() {
    switch (this.data.newRowMode) {
        case 'oneclick':
            var row = {};
            this.defaultValuesToRow(row);
            this.dataSource.insert2(row);
            break;
        case 'editform':
            if (!this.data.itemEditPage) {
                throw new Error('[' + this.getFullName() + '] itemEditPage is empty.');
            }
            this.openPage({
                name   : this.data.itemEditPage,
                newMode: true
            });
            break;
        case 'createform':
            if (!this.data.itemCreatePage) {
                throw new Error('[' + this.getFullName() + '] itemCreatePage is empty.');
            }
            this.openPage({
                name   : this.data.itemCreatePage,
                newMode: true
            });
            break;
        case 'oneclick editform':
            if (!this.data.itemEditPage) {
                throw new Error('[' + this.getFullName() + '] itemEditPage is empty.');
            }
            var row = {};
            this.defaultValuesToRow(row);
            var self = this;
            this.dataSource.insert2(row).then(function (key) {
                self.openPage({
                    name: self.data.itemEditPage,
                    key : key
                });
            });
            break;
        case 'oneclick createform':
            if (!this.data.itemCreatePage) {
                throw new Error('[' + this.getFullName() + '] itemCreatePage is empty.');
            }
            var row = {};
            this.defaultValuesToRow(row);
            var self = this;
            this.dataSource.insert2(row).then(function (key) {
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
    this.dataSources.default.delete(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TableForm.prototype.edit = function(key) {
    var self = this;
    console.log('TableForm.prototype.edit', self.getFullName());
    if (!self.data.itemEditPage) {
        throw new Error('[' + self.getFullName() + '] itemEditPage is empty.');
    }
    self.openPage({
        name: this.data.itemEditPage,
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
'use strict';

QForms.inherits(TreeForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeForm(name, page, data) {
    var self = this;
    Form.call(self, name, page, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// tree form is updated immediately after the modification of the table cell
//
TreeForm.prototype.onDataSourceChanged = function(e) {
    var self = this;
    var dataSource = e.source;
    if (dataSource.name !== 'default') {
        return;
    }
    self.dataSources.default.update2();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.edit = function(row) {
    var self = this;
    var key = self.dataSource.getRowKey(row);
    self.openPage({
        name: self.data.itemEditPage,
        key : key
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.delete = function(row) {
    var self = this;
    var key = self.dataSource.getRowKey(row);
    self.dataSources['default'].delete(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.new = function(row) {
    var self = this;
    var key = self.dataSource.getRowKey(row);
    self.openPage({
        name   : self.data.itemEditPage,
        newMode: true,
        params : QForms.keyToParams(key, 'parentKey')
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.newRoot = function() {
    var self = this;
    self.openPage({
        name   : self.data.itemEditPage,
        newMode: true,
        params : {'parentKey':''}
    });
};
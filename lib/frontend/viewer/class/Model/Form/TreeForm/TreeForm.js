'use strict';

QForms.inherit(TreeForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TreeForm(name, page, data) {
    Form.call(this, name, page, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// tree form is updated immediately after the modification of the table cell
//
TreeForm.prototype.onDataSourceChanged = function(eventArgs) {
    var dataSource = eventArgs.object;
    if (dataSource.name !== 'default') {
        return;
    }
    this.dataSources.default.update2();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.edit = function(row) {
    var key = this.dataSource.getRowKey(row);
    this.openPage({
        name:this.data.itemEditPage,
        key:key
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.delete = function(row) {
    var key = this.dataSource.getRowKey(row);
    this.dataSources['default'].delete(key);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.new = function(row) {
    var key = this.dataSource.getRowKey(row);
    this.openPage({
        name:this.data.itemEditPage,
        newMode:true,
        params:QForms.keyToParams(key, 'parentKey')
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TreeForm.prototype.newRoot = function() {
    this.openPage({
        name:this.data.itemEditPage,
        newMode:true,
        params:{'parentKey':''}
    });
};
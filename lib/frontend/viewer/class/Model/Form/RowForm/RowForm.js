'use strict';

QForms.inherit(RowForm, Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowForm(name, page, data) {
    var self = this;
    Form.call(self, name, page, data);
    self.row = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.init = function() {
    var self = this;
    Form.prototype.init.call(this);
    if (this.page.newMode) {
        var row = {};
        this.defaultValuesToRow(row);
        this.dataSource.newRow(row);
        this.row = row;
    } else {
        if (!this.dataSource.data.rows[0]) {
            throw new Error('[' + this.getFullName() + '] no row in RowForm');
        }
        this.row = this.dataSource.data.rows[0];
    }
    // dump row values to page params
    this.fillParams(this.row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.fillParams = function(row) {
    for (var name in this.fields) {
        this.fields[name].valueToParams(row);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceChanged = function(eventArgs) {
    Form.prototype.onDataSourceChanged.call(this, eventArgs);
    var dataSource = eventArgs.source;
    if (dataSource.name === 'default') {
        //this.eventChanged.fire({source: this});
        this.emit('changed', {source: this});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceUpdated = function(eventArgs) {
    var self = this;
    Form.prototype.onDataSourceUpdated.call(this, eventArgs);
    this.fillParams(this.row);
    //this.eventUpdated.fire({source: this});
    self.emit('updated', {source: this});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.getFullName = function() {
    return [this.page.name, this.name].join('.');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.getFieldValue = function(fieldName) {
    return this.fields[fieldName].getValue(this.row);
};
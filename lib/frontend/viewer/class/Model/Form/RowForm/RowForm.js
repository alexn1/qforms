'use strict';

QForms.inherits(RowForm, Form);

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
    if (self.page.newMode) {
        var row = {};
        self.defaultValuesToRow(row);
        self.dataSource.newRow(row);
        self.row = row;
    } else {
        if (!self.dataSource.data.rows[0]) {
            throw new Error('[' + self.getFullName() + '] no row in RowForm');
        }
        self.row = self.dataSource.data.rows[0];
    }
    // dump row values to page params
    self.fillParams(self.row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.fillParams = function(row) {
    var self = this;
    for (var name in self.fields) {
        self.fields[name].valueToParams(row);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceChanged = function(e) {
    var self = this;
    Form.prototype.onDataSourceChanged.call(self, e);
    var dataSource = e.source;
    if (dataSource.name === 'default') {
        //this.eventChanged.fire({source: this});
        self.emit('changed', {source: self});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceUpdated = function(e) {
    var self = this;
    Form.prototype.onDataSourceUpdated.call(self, e);
    self.fillParams(self.row);
    //this.eventUpdated.fire({source: this});
    self.emit('updated', {source: self});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.getFullName = function() {
    var self = this;
    return [self.page.name, self.name].join('.');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.getFieldValue = function(fieldName) {
    var self = this;
    return self.fields[fieldName].getValue(self.row);
};
"use strict"

QForms.inherit(RowForm,Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowForm(name,page,data) {
    Form.call(this,name,page,data);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.init = function() {
    Form.prototype.init.call(this);
    if (this.page.newMode) {
        var row = {};
        this.defaultValuesToRow(row);
        this.dataSource.newRow(row);
    }
    if (!this.dataSource.data.rows[0]) {
        throw new Error('[' + this.getFullName() + '] no row in RowForm');
    }
    // dump row values to page params
    this.fillParams(this.dataSource.data.rows[0]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Form.prototype.fillParams = function(row) {
    for (var name in this.fields) {
        this.fields[name].valueToParams(row);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceChanged = function(eventArgs) {
    Form.prototype.onDataSourceChanged.call(this,eventArgs);
    var dataSource = eventArgs.object;
    if (dataSource.name === "default") {
        this.eventChanged.fire(new QForms.Event(this));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceUpdated = function(eventArgs) {
    Form.prototype.onDataSourceUpdated.call(this,eventArgs);
    this.fillParams(this.dataSource.data.rows[0]);
    this.eventUpdated.fire(new QForms.Event(this));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.getFullName = function() {
    return [this.page.name, this.name].join('.');
};
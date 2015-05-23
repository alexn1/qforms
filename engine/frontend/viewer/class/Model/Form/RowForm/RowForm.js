"use strict"

QForms.inherit(RowForm,Form);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowForm(name,page,data) {
    Form.call(this,name,page,data);
}


////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.init = function() {
    Form.prototype.init.call(this);
    if (this.page.newMode) {
        var row = {};
        this.defaultValuesToRow(row);
        this.dataSource.newRow(row);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceChanged = function(eventArgs) {
    Form.prototype.onDataSourceChanged.call(this,eventArgs);
    var dataSource = eventArgs.object;
    if (dataSource.name === "default") {
        this.eventChanged.fire(new QForms.Event(this));
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowForm.prototype.onDataSourceUpdated = function(eventArgs) {
    Form.prototype.onDataSourceUpdated.call(this,eventArgs);
    this.fillParams(this.dataSource.data.rows[0]);
    this.eventUpdated.fire(new QForms.Event(this));
}
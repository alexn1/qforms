'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
function Field(name, parent, data) {
    this.name   = name;
    this.form   = parent;
    this.data   = data;
    this.parent = parent;
    //this.eventHandlers = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.init = function() {
    /*
    if (this.data.eventHandlers) {
        for (var event in this.data.eventHandlers) {
            var eventHandler = this.data.eventHandlers[event];
            this.eventHandlers[event] = new EventHandler(this,eventHandler);
            this.eventHandlers[event].init();
        }
    }
    */
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.deinit = function() {
    //console.log('Field.prototype.deinit: ' + this.name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.fillDefaultValue = function(row) {
    if (this.data.column !== undefined) {
        var column = this.data.column;
        try {
            var value = eval(this.data.defaultValue);
        } catch (e) {
            throw new Error('[' + this.getFullName() + '] default value error: ' + e.toString());
        }
        if (value === undefined) {
            value = null;
        }
        row[column] = value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.handleEvent = function(event) {
    for (var name in this.eventHandlers) {
        if (this.eventHandlers[name].data.event === event) {
            this.eventHandlers[name].handleEvent();
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.valueToParams = function(row) {
    if (this.data.column !== undefined) {
        var fullName = this.getFullName();
        this.form.page.params[fullName] = row[this.data.column];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.save = function (row,value) {
    this.form.dataSource.setValue(row,this.data.column,value);
    this.valueToParams(row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getValue = function (row) {
    return row[this.data.column];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
Field.prototype.getFullName = function () {
    return [
        this.form.page.name,
        this.form.name,
        this.name
    ].join('.');
};
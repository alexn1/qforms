'use strict';

QForms.inherit(RowFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowFormController(model, view, parent) {
    FormController.call(this, model, view, parent);
    this.row          = null;
    this.key          = null;
    this.fieldViews   = {};
    this.controlViews = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.init = function() {
    var self = this;
    FormController.prototype.init.call(this);
    this.row = this.model.dataSource.getRowByIndex(0);
    this.key = this.model.dataSource.getRowKey(this.row);
    //this.model.dataSource.eventRefillRow.subscribe(this, 'onRefillRow');
    self.model.dataSource.on('refillRow', self.listeners.refillRow = self.onRefillRow.bind(self));
    // row field views
    for (var name in this.model.fields) {
        var selector = '.{page}_{form}_{field}'
            .replace('{page}' , this.model.page.id)
            .replace('{form}' , this.model.name)
            .replace('{field}', name);
        var view = this.view.querySelector(selector);
        if (view === null) {
            continue;
        }
        this.fieldViews[name] = view;
    }
    // row controls views
    for (var name in this.model.controls) {
        var selector = '.{page}_{form}_{control}'
            .replace('{page}'   , this.model.page.id)
            .replace('{form}'   , this.model.name)
            .replace('{control}', name);
        var view = this.view.querySelector(selector);
        if (view === null) {
            continue;
        }
        this.controlViews[name] = view;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.deinit = function() {
    var self = this;
    //this.model.dataSource.eventRefillRow.unsubscribe(this, 'onRefillRow');
    self.model.dataSource.off('refillRow', self.listeners.refillRow);
    FormController.prototype.deinit.call(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.fill = function() {
    FormController.prototype.fill.call(this);
    // fields
    for (var name in this.fields) {
        var view = this.fieldViews[name];
        if (view) {
            this.fields[name].fill(this.row, view);
        }
    }
    // controls
    for (var name in this.controls) {
        var view = this.controlViews[name];
        if (view) {
            this.controls[name].fill(this.row, view);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.onRefillRow = function (ea) {
    //var key = ea.key,i = ea.i;
    for (var name in this.fields) {
        var view = this.fieldViews[name];
        if (view) {
            this.fields[name].refill(this.row, view);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.isValid = function() {
    var isValid = true;
    for (var name in this.fields) {
        var view = this.fieldViews[name];
        if (view) {
            if (!this.fields[name].isValid(view)) {
                isValid = false;
            }
        }
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.getFieldValue = function(fieldName) {
    return this.model.getFieldValue(fieldName);
};
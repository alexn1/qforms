'use strict';

QForms.inherits(RowFormController, FormController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function RowFormController(model, view, parent) {
    var self = this;
    FormController.call(self, model, view, parent);
    self.row          = null;
    self.key          = null;
    self.fieldViews   = {};
    self.controlViews = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.init = function() {
    var self = this;
    FormController.prototype.init.call(this);
    self.row = self.model.dataSource.getRowByIndex(0);
    self.key = self.model.dataSource.getRowKey(self.row);
    //this.model.dataSource.eventRefillRow.subscribe(this, 'onRefillRow');
    self.model.dataSource.on('refillRow', self.listeners.refillRow = self.onRefillRow.bind(self));
    // row field views
    for (var name in self.model.fields) {
        var selector = '.{page}_{form}_{field}'
            .replace('{page}' , self.model.page.id)
            .replace('{form}' , self.model.name)
            .replace('{field}', name);
        var view = self.view.querySelector(selector);
        if (view === null) {
            continue;
        }
        self.fieldViews[name] = view;
    }
    // row controls views
    for (var name in self.model.controls) {
        var selector = '.{page}_{form}_{control}'
            .replace('{page}'   , self.model.page.id)
            .replace('{form}'   , self.model.name)
            .replace('{control}', name);
        var view = self.view.querySelector(selector);
        if (view === null) {
            continue;
        }
        self.controlViews[name] = view;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.deinit = function() {
    var self = this;
    //this.model.dataSource.eventRefillRow.unsubscribe(this, 'onRefillRow');
    self.model.dataSource.off('refillRow', self.listeners.refillRow);
    FormController.prototype.deinit.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.fill = function() {
    var self = this;
    FormController.prototype.fill.call(self);
    // fields
    for (var name in self.fields) {
        var view = self.fieldViews[name];
        if (view) {
            self.fields[name].fill(self.row, view);
        }
    }
    // controls
    for (var name in self.controls) {
        var view = self.controlViews[name];
        if (view) {
            self.controls[name].fill(self.row, view);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.onRefillRow = function (ea) {
    var self = this;
    //var key = ea.key,i = ea.i;
    for (var name in self.fields) {
        var view = self.fieldViews[name];
        if (view) {
            self.fields[name].refill(self.row, view);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.isValid = function() {
    var self = this;
    var isValid = true;
    for (var name in self.fields) {
        var view = self.fieldViews[name];
        if (view) {
            if (!self.fields[name].isValid(view)) {
                isValid = false;
            }
        }
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
RowFormController.prototype.getFieldValue = function(fieldName) {
    var self = this;
    return self.model.getFieldValue(fieldName);
};
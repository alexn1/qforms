'use strict';

QForms.inherits(FieldController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(model, parent) {
    var self = this;
    ModelController.call(self, model);
    self.parent = parent;
    self.form   = parent;
    self.views  = {};    // list of all views that controlled by this field
    self.html   = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.create = function(model, parent) {
    var customClassName = '{page}{form}{field}Controller'
        .replace('{page}' , model.form.page.name)
        .replace('{form}' , model.form.name)
        .replace('{field}', model.name);
    var typeOfCustomClass = 'typeof({customClassName})'.replace('{customClassName}', customClassName);
    var custom =  'new {customClassName}(model, parent)'.replace('{customClassName}', customClassName);
    var general = 'new {class}Controller(model, parent)'.replace('{class}', model.data.class);
    var obj;
    if (model.data.js !== undefined) {
        if (eval(typeOfCustomClass) === 'function') {
            obj = eval(custom);
        } else {
            $.globalEval(model.data.js);
            obj = (eval(typeOfCustomClass) === 'function') ? eval(custom) : eval(general);
        }
    } else {
        obj = eval(general);
    }
    return obj;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.init = function() {
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.deinit = function() {
    var self = this;
    //console.log('FieldController.prototype.deinit: ' + this.model.name);
    self.views = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.renderView = function() {
    var self = this;
    if (self.html === null) {
        self.html = QForms.render(self.model.data.view, {model: self.model});
    }
    return $(self.html).get(0);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.fill = function(row, view) {
    var self = this;
    var key = self.model.form.dataSource.getRowKey(row);
    self.views[key] = view;
    view.dbRow = row;
    var value;
    if (self.model.data.column) {
        value = row[self.model.data.column];
    } else if (self.model.data.value) {
        value = eval(self.model.data.value);
    }
    self.setValue(value, view);
    self.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.refill = function(row, view) {
    var self = this;
    var value;
    if (self.model.data.column) {
        value = row[self.model.data.column];
    } else if (self.model.data.value) {
        value = eval(self.model.data.value);
    }
    self.setValue(value, view);
    self.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getValue = function (view) {
    var self = this;
    switch (self.model.form.data.class) {
        case 'RowForm':
            return view.firstElementChild.value;
            break;
        case 'TableForm':
            return view.firstElementChild.innerHTML;
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.setValue = function (value, view) {
    var self = this;
    switch (self.model.form.data.class) {
        case 'RowForm':
            if (value !== '') {
                view.firstElementChild.value = value;
            }
            break;
        case 'TableForm':
            view.firstElementChild.innerHTML = value;
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.isValid = function(view) {
    var self = this;
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.setViewStyle = function(view, row) {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.beginEdit = function(view) {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.endEdit = function(view) {
    var self = this;
};
'use strict';

QForms.inherit(FormController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormController(model, view, parent) {
    var self = this;
    ModelController.call(self, model);
    self.view     = view;
    self.parent   = parent;
    self.page     = parent;
    self.fields   = {};
    self.controls = {};
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.create = function(model, view, parent) {
    var customClassName = '{page}{form}Controller'
        .replace('{page}', model.page.name)
        .replace('{form}', model.name);
    var typeOfCustomClass = 'typeof({customClassName})'.replace('{customClassName}', customClassName);
    var custom =  'new {customClassName}(model, view, parent)'.replace('{customClassName}', customClassName);
    var general = 'new {class}Controller(model, view, parent)'.replace('{class}', model.data.class);
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
FormController.prototype.init = function() {
    var self = this;
    // fields
    for (var name in self.model.fields) {
        var field = self.model.fields[name];
        self.fields[name] = FieldController.create(field, self);
        self.fields[name].init();
    }
    // controls
    for (var name in self.model.controls) {
        var control = self.model.controls[name];
        self.controls[name] = ControlController.create(control, self);
        self.controls[name].init();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.deinit = function() {
    var self = this;
    //console.log('FormController.prototype.deinit: ' + this.model.name);
    for (var name in self.fields) {
        self.fields[name].deinit();
    }
    for (var name in self.controls) {
        self.controls[name].deinit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.fill = function() {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.isValid = function() {
    var self = this;
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.setRowStyle = function(bodyRow, row) {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getCaption = function() {
    var self = this;
    return self.model.data.caption;
};
'use strict';

QForms.inherit(FormController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FormController(model, view, parent) {
    ModelController.call(this, model);
    this.view     = view;
    this.parent   = parent;
    this.page     = parent;
    this.fields   = {};
    this.controls = {};
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
    // fields
    for (var name in this.model.fields) {
        var field = this.model.fields[name];
        this.fields[name] = FieldController.create(field, this);
        this.fields[name].init();
    }
    // controls
    for (var name in this.model.controls) {
        var control = this.model.controls[name];
        this.controls[name] = ControlController.create(control, this);
        this.controls[name].init();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.deinit = function() {
    //console.log('FormController.prototype.deinit: ' + this.model.name);
    for (var name in this.fields) {
        this.fields[name].deinit();
    }
    for (var name in this.controls) {
        this.controls[name].deinit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.fill = function() {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.isValid = function() {
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.setRowStyle = function(bodyRow, row) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
FormController.prototype.getCaption = function() {
    return this.model.data.caption;
};
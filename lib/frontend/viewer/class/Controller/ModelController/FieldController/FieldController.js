'use strict';

QForms.inherit(FieldController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FieldController(model, parent) {
    ModelController.call(this, model);
    this.parent = parent;
    this.views  = {};    // list of all views that controlled by this field
    this.html   = null;
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
    //console.log('FieldController.prototype.deinit: ' + this.model.name);
    this.views = null;
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
    var key = this.model.form.dataSource.getRowKey(row);
    this.views[key] = view;
    view.dbRow = row;
    this.setValue(row[this.model.data.column], view);
    this.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.refill = function(row, view) {
    this.setValue(row[this.model.data.column], view);
    this.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.getValue = function (view) {
    switch (this.model.form.data.class) {
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
    switch (this.model.form.data.class) {
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
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.setViewStyle = function(view, row) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.beginEdit = function(view) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
FieldController.prototype.endEdit = function(view) {

};
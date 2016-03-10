'use strict';

QForms.inherit(ControlController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(model, parent) {
    ModelController.call(this, model);
    this.parent = parent;
    this.views  = {};    // list of all views that controlled by this control
    //this.html   = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.create = function(model, parent) {
    var general = 'new {class}Controller(model, parent)'.replace('{class}', model.data.class);
    var obj = eval(general);
    return obj;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.init = function() {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.deinit = function() {
    this.views = null;
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.renderView = function() {
    if (this.html === null) {
        this.html = QForms.render(this.model.data.view, {model:this.model});
    }
    return $(this.html).get(0);
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.fill = function(row, view) {
    var key = this.model.form.dataSource.getRowKey(row);
    this.views[key] = view;
    view.dbRow = row;
    this.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.setViewStyle = function(view, row) {

};
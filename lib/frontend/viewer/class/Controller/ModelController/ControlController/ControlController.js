'use strict';

QForms.inherit(ControlController, ModelController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ControlController(model, parent) {
    var self = this;
    ModelController.call(self, model);
    self.parent = parent;
    self.views  = {};    // list of all views that controlled by this control
    //this.html   = null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.create = function(model, parent) {
    var self = this;
    var general = 'new {class}Controller(model, parent)'.replace('{class}', model.data.class);
    var obj = eval(general);
    return obj;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.init = function() {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.deinit = function() {
    var self = this;
    self.views = null;
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
    var self = this;
    var key = self.model.form.dataSource.getRowKey(row);
    self.views[key] = view;
    view.dbRow = row;
    self.setViewStyle(view, row);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ControlController.prototype.setViewStyle = function(view, row) {
    var self = this;
};
QForms.inherit(EmployeeEmployeeidController, LinkFieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function EmployeeEmployeeidController() {
    EmployeeEmployeeidController.super_.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeidController.prototype.init = function() {
    var self = this;
    EmployeeEmployeeidController.super_.prototype.init.call(this);    
    self.on('click', self.listeners.on_click = self.on_click.bind(self));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeidController.prototype.setViewStyle = function(view, row) {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
EmployeeEmployeeidController.prototype.on_click = function(e) {
    var self = this;
    console.log('EmployeeEmployeeidController.prototype.on_click', e);
};
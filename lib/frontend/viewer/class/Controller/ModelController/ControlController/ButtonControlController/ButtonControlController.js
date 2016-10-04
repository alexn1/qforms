'use strict';

QForms.inherits(ButtonControlController, ControlController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlController(model, parent) {
    var self = this;
    ButtonControlController.super_.call(self, model, parent);
    //self.eventClick = new QForms.Event(self);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.prototype.fill = function(row, view) {
    var self = this;
    ButtonControlController.super_.prototype.fill.call(self, row, view);
    if (self.model.form.data.class === 'RowForm') {
        $(view).children().click(function() {
            self._onClick(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.prototype._onClick = function(el) {
    var self = this;
    var view = el.parentNode;
    // event
    //var ea = new QForms.EventArg(this);
    //ea.view    = view;
    //ea.row     = view.dbRow;
    //ea.el      = el;
    //ea.control = this;
    //self.eventClick.fire({source: self, view: view, row: view.dbRow, el: el, control: self});
    self.emit('click', {source: self, view: view, row: view.dbRow, el: el, control: self});
};
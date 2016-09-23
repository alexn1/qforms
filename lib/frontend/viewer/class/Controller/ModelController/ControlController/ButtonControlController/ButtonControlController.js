'use strict';

QForms.inherit(ButtonControlController, ControlController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ButtonControlController(model, parent) {
    ButtonControlController.super_.call(this, model, parent);
    this.eventClick = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.prototype.fill = function(row, view) {
    ButtonControlController.super_.prototype.fill.call(this, row, view);
    if (this.model.form.data.class === 'RowForm') {
        var self = this;
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
    self.eventClick.fire({source: self, view: view, row: view.dbRow, el: el, control: self});
    self.emit('click', {source: self, view: view, row: view.dbRow, el: el, control: self});
};
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
            self.onClick(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ButtonControlController.prototype.onClick = function(el) {
    var view = el.parentNode;
    // event
    //var ea = new QForms.EventArg(this);
    //ea.view    = view;
    //ea.row     = view.dbRow;
    //ea.el      = el;
    //ea.control = this;
    this.eventClick.fire({source: this, view: view, row: view.dbRow, el: el, control: this});
};
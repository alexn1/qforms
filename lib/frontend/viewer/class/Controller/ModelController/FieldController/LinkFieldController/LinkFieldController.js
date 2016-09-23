'use strict';

QForms.inherit(LinkFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkFieldController(model, parent) {
    LinkFieldController.super_.call(this, model, parent);
    this.eventClick = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype.fill = function(row, view) {
    LinkFieldController.super_.prototype.fill.call(this, row, view);
    var self = this;
    $(view).children().click(function() {
        self._onClick(this);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype.getValue = function (view) {
    return view.firstElementChild.innerHTML;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype.setValue = function (value, view) {
    view.firstElementChild.innerHTML = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype._onClick = function (el) {
    var self = this;
    var view = el.parentNode;
    // event
    //var ea = new QForms.EventArg(this);
    //ea.view  = view;
    //ea.row   = view.dbRow;
    //ea.el    = el;
    //ea.field = this;
    self.eventClick.fire({source: self, view: view, row: view.dbRow, el: el, field: self});
    self.emit('click', {source: self, view: view, row: view.dbRow, el: el, field: self});
};
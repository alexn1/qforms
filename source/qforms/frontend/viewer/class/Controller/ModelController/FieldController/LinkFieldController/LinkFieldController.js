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
        self.onClick(this);
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
LinkFieldController.prototype.onClick = function (el) {
    var view = el.parentNode;
    // event
    var ea = new QForms.EventArg(this);
    ea.view  = view;
    ea.row   = view.dbRow;
    ea.el    = el;
    ea.field = this;
    this.eventClick.fire(ea);
};
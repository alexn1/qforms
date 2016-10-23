'use strict';

QForms.inherits(LinkFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkFieldController(model, parent) {
    var self = this;
    LinkFieldController.super_.call(self, model, parent);
    //this.eventClick = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype.fill = function(row, view) {
    var self = this;
    LinkFieldController.super_.prototype.fill.call(self, row, view);
    $(view).children().click(function() {
        self._onClick(this);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype.getValue = function (view) {
    var self = this;
    return view.firstElementChild.innerHTML;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype.setValue = function (value, view) {
    var self = this;
    view.firstElementChild.innerHTML = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LinkFieldController.prototype._onClick = function (el) {
    var self = this;
    var view = el.parentNode;
    // event
    self.emit('click', {source: self, view: view, row: view.dbRow, el: el, field: self});
};
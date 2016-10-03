'use strict';

QForms.inherit(LabelFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelFieldController(model, parent) {
    var self = this;
    LabelFieldController.super_.call(self, model, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
LabelFieldController.prototype.getValue = function (view) {
    var self = this;
    return view.firstElementChild.innerHTML;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
LabelFieldController.prototype.setValue = function (value, view) {
    var self = this;
    view.firstElementChild.innerHTML = value;
};
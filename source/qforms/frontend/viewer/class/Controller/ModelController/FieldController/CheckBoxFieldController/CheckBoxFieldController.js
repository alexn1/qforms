'use strict';

QForms.inherit(CheckBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxFieldController(model, parent) {
    FieldController.call(this, model, parent);
    this.eventChange = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.getValue = function (view) {
    return view.firstElementChild.checked ? 1 : 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.setValue = function (value, view) {
    view.firstElementChild.checked = (value === 1) ? true : false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.fill = function(row, view) {
    CheckBoxFieldController.super_.prototype.fill.call(this, row, view);
    if (this.model.form.data.class === 'RowForm') {
        var self = this;
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.onChange = function (el) {
    var view = el.parentNode;
    if (this.isValid(view)) {
        this.model.save(view.dbRow, this.getValue(view));
        // event
        var ea = new QForms.EventArg(this);
        ea.view  = view;
        ea.row   = view.dbRow;
        ea.el    = el;
        ea.field = this;
        this.eventChange.fire(ea);
    }
};
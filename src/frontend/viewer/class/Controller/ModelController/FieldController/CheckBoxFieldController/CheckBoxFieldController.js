'use strict';

QForms.inherits(CheckBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxFieldController(model, parent) {
    var self = this;
    FieldController.call(self, model, parent);
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.getValue = function (view) {
    var self = this;
    return view.firstElementChild.checked ? 1 : 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.setValue = function (value, view) {
    var self = this;
    view.firstElementChild.checked = (value === 1) ? true : false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.fill = function(row, view) {
    var self = this;
    CheckBoxFieldController.super_.prototype.fill.call(self, row, view);
    if (self.model.form.data.class === 'RowForm') {
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
CheckBoxFieldController.prototype.onChange = function (el) {
    var self = this;
    var view = el.parentNode;
    if (self.isValid(view)) {
        self.model.save(view.dbRow, self.getValue(view));
        // event
        self.emit('change', {source: self, view: view, row: view.dbRow, el: el, field: self});
    }
};
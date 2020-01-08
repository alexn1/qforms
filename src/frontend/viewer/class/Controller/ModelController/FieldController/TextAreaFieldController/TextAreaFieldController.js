'use strict';

QForms.inherits(TextAreaFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaFieldController(model, parent) {
    var self = this;
    FieldController.call(self, model, parent);
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.prototype.fill = function(row, view) {
    var self = this;
    TextAreaFieldController.super_.prototype.fill.call(self, row, view);
    if (self.model.form.data.class === 'RowForm') {
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.prototype.isValid = function(view) {
    var self = this;
    var isValid = true;
    if (self.model.data.notNull === 'true') {
        isValid = view.firstElementChild.value !== undefined && view.firstElementChild.value !== null && view.firstElementChild.value !== '';
    }
    if (!isValid) {
        view.firstElementChild.classList.add('error');
    } else {
        view.firstElementChild.classList.remove('error');
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.prototype.onChange = function (el) {
    var self = this;
    var view = el.parentNode;
    if (self.isValid(view)) {
        self.model.save(view.dbRow, self.getValue(view));
        // event
        self.emit('change', {source: self, view: view, row: view.dbRow, el: el, field: self});
    }
};
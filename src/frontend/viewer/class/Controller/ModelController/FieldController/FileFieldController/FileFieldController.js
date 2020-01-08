'use strict';

QForms.inherits(FileFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileFieldController(model, parent) {
    var self = this;
    FileFieldController.super_.call(self, model, parent);
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.isValid = function(view) {
    var self = this;
    var isValid = true;
    if (self.model.data.notNull === 'true') {
        isValid = view.firstElementChild.files[0];
    }
    if (!isValid) {
        view.firstElementChild.classList.add('error');
    } else {
        view.firstElementChild.classList.remove('error');
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.getValue = function (view) {
    var self = this;
    return view.firstElementChild.files[0];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.setValue = function (value, view) {
    var self = this;
    //view.firstElementChild.files[0] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.fill = function(row, view) {
    var self = this;
    FileFieldController.super_.prototype.fill.call(self, row, view);
    if (self.model.form.data.class === 'RowForm') {
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.onChange = function (el) {
    var self = this;
    var view = el.parentNode;
    //if (this.isValid(view)) {
        self.model.save(view.dbRow, self.getValue(view));
        // event
        self.emit('change', {source: self, view: view, row: view.dbRow, el: el, field: self});
    //}
};
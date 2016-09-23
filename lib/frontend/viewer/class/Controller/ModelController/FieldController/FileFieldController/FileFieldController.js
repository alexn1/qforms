'use strict';

QForms.inherit(FileFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileFieldController(model, parent) {
    FileFieldController.super_.call(this, model, parent);
    this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.isValid = function(view) {
    var isValid = true;
    if (this.model.data.notNull === 'true') {
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
    return view.firstElementChild.files[0];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.setValue = function (value, view) {
    //view.firstElementChild.files[0] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.fill = function(row, view) {
    FileFieldController.super_.prototype.fill.call(this, row, view);
    if (this.model.form.data.class === 'RowForm') {
        var self = this;
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
FileFieldController.prototype.onChange = function (el) {
    var view = el.parentNode;
    //if (this.isValid(view)) {
        this.model.save(view.dbRow, this.getValue(view));
        // event
        //var ea = new QForms.EventArg(this);
        //ea.view  = view;
        //ea.row   = view.dbRow;
        //ea.el    = el;
        //ea.field = this;
        this.eventChange.fire({source: this, view: view, row: view.dbRow, el: el, field: this});
    //}
};
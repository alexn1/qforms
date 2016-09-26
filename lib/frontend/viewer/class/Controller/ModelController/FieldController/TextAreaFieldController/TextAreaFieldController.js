'use strict';

QForms.inherit(TextAreaFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaFieldController(model, parent) {
    var self = this;
    FieldController.call(this, model, parent);
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.prototype.fill = function(row, view) {
    TextAreaFieldController.super_.prototype.fill.call(this, row, view);
    if (this.model.form.data.class === 'RowForm') {
        var self = this;
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextAreaFieldController.prototype.isValid = function(view) {
    var isValid = true;
    if (this.model.data.notNull === 'true') {
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
    if (this.isValid(view)) {
        this.model.save(view.dbRow, this.getValue(view));
        // event
        //var ea = new QForms.EventArg(this);
        //ea.view  = view;
        //ea.row   = view.dbRow;
        //ea.el    = el;
        //ea.field = this;
        //this.eventChange.fire({source: this, view: view, row: view.dbRow, el: el, field: this});
        this.emit('change', {source: this, view: view, row: view.dbRow, el: el, field: this});
    }
};
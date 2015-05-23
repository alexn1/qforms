"use strict"

QForms.inherit(TextBoxFieldController,FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxFieldController(model,parent) {
    TextBoxFieldController.__base__.constructor.call(this,model,parent);
    this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.fill = function(row,view) {
    TextBoxFieldController.__base__.fill.call(this,row,view);
    if (this.model.form.data.class === 'RowForm') {
        var self = this;
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.isValid = function(view) {
    var isValid = true;
    if (this.model.data.notNull === "true") {
        isValid = view.firstElementChild.value !== undefined && view.firstElementChild.value !== null && view.firstElementChild.value !== "";
    }
    if (!isValid) {
        view.firstElementChild.classList.add("error");
    } else {
        view.firstElementChild.classList.remove("error");
    }
    return isValid;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.onChange = function (el) {
    var view = el.parentNode;
    if (this.isValid(view)) {
        this.model.save(view.dbRow,this.getValue(view));
        // event
        var ea = new QForms.EventArg(this);
        ea.view = view;
        ea.row = view.dbRow;
        ea.el = el;
        ea.field = this;
        this.eventChange.fire(ea);
    }
}
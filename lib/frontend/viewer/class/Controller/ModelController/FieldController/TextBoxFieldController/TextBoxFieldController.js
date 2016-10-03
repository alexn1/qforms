'use strict';

QForms.inherit(TextBoxFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxFieldController(model, parent) {
    var self = this;
    TextBoxFieldController.super_.call(self, model, parent);
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.fill = function(row, view) {
    var self = this;
    TextBoxFieldController.super_.prototype.fill.call(self, row, view);
    if (self.model.form.data.class === 'RowForm') {
        $(view).children().change(function() {
            self.onChange(this);
        });
        if (self.model.data.notNull === 'true') {
            view.firstElementChild.placeholder = '-- {fillValue} --'.template({
                fillValue: self.model.form.page.app.data.text.field.fillValue
            });
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.isValid = function(view) {
    var self = this;
    var isValid = true;
    if (self.model.data.notNull === 'true') {
        var value = self.getValue(view);
        isValid = value !== undefined && value !== null && value !== '';
    }
    if (!isValid) {
        view.firstElementChild.classList.add('error');
    } else {
        view.firstElementChild.classList.remove('error');
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.onChange = function (el) {
    var self = this;
    var view = el.parentNode;
    if (self.isValid(view)) {
        self.model.save(view.dbRow, self.getValue(view));

        // event
        //var ea = new QForms.EventArg(this);
        //ea.view  = view;
        //ea.row   = view.dbRow;
        //ea.el    = el;
        //ea.field = this;
        //this.eventChange.fire({source: this, view: view, row: view.dbRow, el: el, field: this});
        self.emit('change', {source: self, view: view, row: view.dbRow, el: el, field: self});
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.beginEdit = function(view) {
    var self = this;
    view.firstElementChild.style.MozUserSelect = 'text';
    view.firstElementChild.contentEditable = true;
    var range = document.createRange();
    range.selectNodeContents(view.firstElementChild);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    view.firstElementChild.focus();
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
TextBoxFieldController.prototype.endEdit = function(view) {
    var self = this;
    view.firstElementChild.style.MozUserSelect = 'none';
    view.firstElementChild.contentEditable = false;
};
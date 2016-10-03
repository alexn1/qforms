'use strict';

QForms.inherit(ImageFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageFieldController(model, parent) {
    var self = this;
    FieldController.call(self, model, parent);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
ImageFieldController.prototype.getValue = function (view) {
    var self = this;
    switch (self.model.form.data.class) {
        case 'RowForm':
            return view.firstElementChild.src;
            break;
        case 'TableForm':
            return view.firstElementChild.innerHTML;
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ImageFieldController.prototype.setValue = function (value, view) {
    var self = this;
    switch (self.model.form.data.class) {
        case 'RowForm':
            if (value !== '') {
                view.firstElementChild.src = self.model.data.defaultValue + value;
            }
            break;
        case 'TableForm':
            if (value !== '') {
                view.firstElementChild.innerHTML = value;
            }
            break;
    }
};
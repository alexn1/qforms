'use strict';

QForms.inherit(ImageFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageFieldController(model, parent) {
    FieldController.call(this, model, parent);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
ImageFieldController.prototype.getValue = function (view) {
    switch (this.model.form.data.class) {
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
    switch (this.model.form.data.class) {
        case 'RowForm':
            if (value !== '') {
                view.firstElementChild.src = this.model.data.defaultValue + value;
            }
            break;
        case 'TableForm':
            if (value !== '') {
                view.firstElementChild.innerHTML = value;
            }
            break;
    }
};
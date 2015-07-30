'use strict';

QForms.inherit(DatePickerFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerFieldController(model, parent) {
    DatePickerFieldController.super_.call(this, model, parent);
    this.eventChange = new QForms.Event(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.fill = function(row, view) {
    DatePickerFieldController.super_.prototype.fill.call(this, row, view);
    if (this.model.form.data.class === 'RowForm') {
        var self = this;
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.isValid = function(view) {
    var isValid = true;
    if (this.model.data.notNull === 'true') {
        isValid = view.firstElementChild.value !== undefined && view.firstElementChild.value !== null && view.firstElementChild.value !== '';
    }
    if (view.firstElementChild.value) {
        if (this.model.form.page.app.data.lang === 'ru') {
            var arr = view.firstElementChild.value.split('.');
            if (arr.length === 3) {
                var day    = parseInt(arr[0]);
                var month  = parseInt(arr[1]);
                var year   = parseInt(arr[2]);
                if (day >= 1 && day <= 31) {
                } else {
                    isValid = false;
                }
                if (month >=1 && month <= 12) {
                } else {
                    isValid = false;
                }
                if (year >=1000 && year <= 9999) {
                } else {
                    isValid = false;
                }
            } else {
                isValid = false;
            }
        }
    }
    if (!isValid) {
        view.firstElementChild.classList.add('error');
    } else {
        view.firstElementChild.classList.remove('error');
    }
    return isValid;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.onChange = function (el) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.setValue = function (value, view) {
    var date = '';
    if (value) {
        if (this.model.form.page.app.data.lang === 'ru') {
            var arr = value.split('-');
            date = [arr[2], arr[1], arr[0]].join('.');
        } else {
            date = value;
        }
    }
    switch (this.model.form.data.class) {
        case 'RowForm':
            view.firstElementChild.value = date;
            break;
        case 'TableForm':
            view.firstElementChild.innerHTML = date;
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.getValue = function (view) {
    switch (this.model.form.data.class) {
        case 'RowForm':
            if (view.firstElementChild.value) {
                var value;
                if (this.model.form.page.app.data.lang === 'ru') {
                    var arr = view.firstElementChild.value.split('.');
                    value = [arr[2], arr[1], arr[0]].join('-');
                } else {
                    value = view.firstElementChild.value;
                }
                return value;
            } else {
                return null;
            }
            break;
        case 'TableForm':
            return view.firstElementChild.innerHTML;
            break;
    }
};
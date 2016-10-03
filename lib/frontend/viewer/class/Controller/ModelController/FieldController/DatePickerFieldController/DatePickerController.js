'use strict';

QForms.inherit(DatePickerFieldController, FieldController);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerFieldController(model, parent) {
    var self = this;
    DatePickerFieldController.super_.call(self, model, parent);
    //this.eventChange = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.fill = function(row, view) {
    var self = this;
    DatePickerFieldController.super_.prototype.fill.call(self, row, view);
    if (self.model.form.data.class === 'RowForm') {
        $(view).children().change(function() {
            self.onChange(this);
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.isValid = function(view) {
    var self = this;
    var isValid = true;
    if (self.model.data.notNull === 'true') {
        isValid = view.firstElementChild.value !== undefined && view.firstElementChild.value !== null && view.firstElementChild.value !== '';
    }
    if (view.firstElementChild.value) {
        if (self.model.form.page.app.data.lang === 'ru') {
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
DatePickerFieldController.prototype.setValue = function (value, view) {
    var self = this;
    var text = value;
    var placeholder = 'YYYY-MM-DD';
    if (self.model.form.page.app.data.lang === 'ru') {
        placeholder = 'ДД.ММ.ГГГГ';
    }
    if (value) {
        if (self.model.form.page.app.data.lang === 'ru') {
            var arr = value.split('-');
            text = [arr[2], arr[1], arr[0]].join('.');
        } else {
            text = value;
        }
    }
    switch (self.model.form.data.class) {
        case 'RowForm':
            view.firstElementChild.value       = text;
            view.firstElementChild.placeholder = placeholder;
            break;
        case 'TableForm':
            view.firstElementChild.innerHTML = text;
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.getValue = function (view) {
    var self = this;
    var text;
    switch (self.model.form.data.class) {
        case 'RowForm':
            text = view.firstElementChild.value;
            break;
        case 'TableForm':
            text = view.firstElementChild.innerHTML;
            break;
    }
    if (text) {
        var value;
        if (self.model.form.page.app.data.lang === 'ru') {
            var arr = text.split('.');
            value = [arr[2], arr[1], arr[0]].join('-');
        } else {
            value = text;
        }
        return value;
    } else {
        return null;
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
DatePickerFieldController.prototype.beginEdit = function(view) {
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
DatePickerFieldController.prototype.endEdit = function(view) {
    var self = this;
    view.firstElementChild.style.MozUserSelect = 'none';
    view.firstElementChild.contentEditable = false;
};
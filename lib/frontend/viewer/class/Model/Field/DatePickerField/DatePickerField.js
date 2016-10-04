'use strict';

QForms.inherit(DatePickerField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}
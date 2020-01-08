'use strict';

QForms.inherits(DatePickerField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function DatePickerField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}
'use strict';

QForms.inherits(TextBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}
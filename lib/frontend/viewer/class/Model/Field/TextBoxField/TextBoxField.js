'use strict';

QForms.inherit(TextBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextBoxField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}
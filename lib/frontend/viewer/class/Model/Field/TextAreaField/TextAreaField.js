'use strict';

QForms.inherit(TextAreaField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function TextAreaField(name, form, data) {
    var self = this;
    TextAreaField.super_.call(self, name, form, data);
}
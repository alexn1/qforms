'use strict';

QForms.inherits(FileField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function FileField(name, form, data) {
    var self = this;
    FileField.super_.call(self, name, form, data);
}
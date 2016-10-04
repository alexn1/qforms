'use strict';

QForms.inherits(ImageField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}
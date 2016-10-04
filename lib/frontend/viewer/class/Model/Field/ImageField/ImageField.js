'use strict';

QForms.inherit(ImageField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function ImageField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}
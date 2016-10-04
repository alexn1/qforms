'use strict';

QForms.inherit(CheckBoxField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function CheckBoxField(name, form, data) {
    var self = this;
    Field.call(self, name, form, data);
}

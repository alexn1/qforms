'use strict';

QForms.inherits(LabelField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LabelField(name, form, data) {
    var self = this;
    LabelField.super_.call(self, name, form, data);
}
'use strict';

QForms.inherits(LinkField, Field);

////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkField(name, form, data) {
    var self = this;
    LinkField.super_.call(self, name, form, data);
}